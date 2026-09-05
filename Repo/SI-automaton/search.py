from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
from rapidfuzz import fuzz
import re

def clean_version_text(li_tag):
    """
    Cleanly extract version range text from a <li> tag.
    Output: e.g. 'affected from 8.0 before 8.0.26'
    """
    parts = []
    status_span = li_tag.find("span", recursive=False)
    if status_span:
        inner_spans = status_span.find_all("span", recursive=False)
        for span in inner_spans:
            text = span.get_text(strip=True)
            if text:
                parts.append(text)

    result = " ".join(parts)
    result = re.sub(r'(.+?)\s+\1', r'\1', result).strip()
    return result

def is_version_in_range(version, from_ver, before_ver):
    """
    Returns True if from_ver <= version < before_ver
    Handles versions like '8.0' and '8.0.26'
    """
    try:
        def parse_version(v):
            return tuple(int(x) for x in v.strip().split("."))

        v = parse_version(version)
        f = parse_version(from_ver)
        b = parse_version(before_ver)

        max_len = max(len(v), len(f), len(b))
        v = v + (0,) * (max_len - len(v))
        f = f + (0,) * (max_len - len(f))
        b = b + (0,) * (max_len - len(b))

        return f <= v < b
    except Exception:
        return False

def get_cve_section(cve_id, search_product, library_version=None, fuzzy_threshold=50):
    url = f"https://www.cve.org/CVERecord?id={cve_id}"

    print(f"\n🔍 Fetching CVE details for : {cve_id}")
    print(f"🎯 Searching for product    : {search_product}")
    if library_version:
        print(f"📌 Library version          : {library_version}")
    print("=" * 60)

    # -------------------------------------------------------
    # STEP 1: Launch Selenium (Headless Chrome)
    # -------------------------------------------------------
    options = Options()
    options.add_argument("--headless")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument(
        "user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/120.0.0.0 Safari/537.36"
    )

    driver = webdriver.Chrome(options=options)
    driver.get(url)

    # -------------------------------------------------------
    # STEP 2: Wait Until Product Status Section is Loaded
    # -------------------------------------------------------
    try:
        WebDriverWait(driver, 20).until(
            EC.presence_of_element_located((By.ID, "cve-product-status-container"))
        )
    except Exception as e:
        print(f"⚠️  Timeout waiting for page: {e}")

    page_source = driver.page_source
    driver.quit()

    # -------------------------------------------------------
    # STEP 3: Parse with BeautifulSoup
    # -------------------------------------------------------
    soup = BeautifulSoup(page_source, "html.parser")

    # -------------------------------------------------------
    # STEP 4: Extract Product Status Section
    # -------------------------------------------------------
    product_status_div = soup.find("div", {"id": "cve-product-status-container"})

    if not product_status_div:
        print("❌ Product Status section not found.")
        return False

    # -------------------------------------------------------
    # STEP 5: Collect ALL Product Rows with Their Info
    # -------------------------------------------------------
    product_rows = product_status_div.find_all("div", {"id": "cve-vendor-product-platforms"})

    all_products = []

    for row in product_rows:
        row_data = {
            "vendor": "N/A",
            "product": "N/A",
            "platforms": "N/A",
            "default_status": "N/A",
            "affected_versions": [],
            "raw_row": row
        }

        headings = row.find_all("p", class_="cve-product-status-heading")
        for heading in headings:
            label = heading.get_text(strip=True).lower()
            value = heading.find_next_sibling("p")
            val_text = value.get_text(strip=True) if value else "N/A"

            if "vendor" in label:
                row_data["vendor"] = val_text
            elif "product" in label:
                row_data["product"] = val_text
            elif "platform" in label:
                row_data["platforms"] = val_text

        # Default Status
        default_status_div = row.find("div", {"id": "cve-version-default-status"})
        if default_status_div:
            row_data["default_status"] = default_status_div.get_text(strip=True)

        # Affected Versions - clean extraction
        affected_div = row.find("div", {"id": "affected"})
        if affected_div:
            version_items = affected_div.find_all("li")
            for item in version_items:
                raw_text = item.get_text(separator=" ", strip=True)

                match = re.search(
                    r'(affected|unaffected)\s+from\s+([\d.]+)\s+before\s+([\d.]+)',
                    raw_text,
                    re.IGNORECASE
                )
                if match:
                    status = match.group(1)
                    from_v = match.group(2)
                    before_v = match.group(3)
                    clean_text = f"{status} from {from_v} before {before_v}"
                else:
                    clean_text = re.sub(r'\s+', ' ', raw_text).strip()

                row_data["affected_versions"].append(clean_text)

        all_products.append(row_data)

    # -------------------------------------------------------
    # STEP 6: Smart Fuzzy Match - Product Name + Version
    # -------------------------------------------------------
    best_match = None
    best_score = 0

    major_version = None
    if library_version:
        version_parts = library_version.split(".")
        if len(version_parts) >= 2:
            major_version = f"{version_parts[0]}.{version_parts[1]}"

    print("🔎 Scanning products...\n")

    for product_data in all_products:
        product_name = product_data["product"]

        # ✅ Only print product name - no scores
        print(f"  • {product_name}")

        # Fuzzy name match score
        name_score = fuzz.partial_ratio(
            search_product.lower(),
            product_name.lower()
        )

        # Version boost/penalty based on version number in product name
        version_boost = 0
        if major_version:
            if re.search(r'\b' + re.escape(major_version) + r'\b', product_name):
                # Product name contains the correct major version → boost
                version_boost += 30
            else:
                # Product name contains a different version number → penalize
                if re.search(r'\b\d+\.\d+\b', product_name):
                    version_boost -= 40

        # Extra boost if library version falls within an affected range
        if library_version:
            for ver_entry in product_data["affected_versions"]:
                ver_match = re.search(
                    r'from\s+([\d.]+)\s+before\s+([\d.]+)',
                    ver_entry,
                    re.IGNORECASE
                )
                if ver_match:
                    from_v = ver_match.group(1)
                    before_v = ver_match.group(2)
                    if is_version_in_range(library_version, from_v, before_v):
                        version_boost += 20

        total_score = name_score + version_boost

        if total_score > best_score:
            best_score = total_score
            best_match = product_data

    # -------------------------------------------------------
    # STEP 7: Print Best Matched Result
    # -------------------------------------------------------
    print("\n" + "=" * 60)
    print("📦 BEST MATCHED PRODUCT STATUS")
    print("=" * 60)

    if best_match and best_score >= fuzzy_threshold:
        print(f"  Vendor             : {best_match['vendor']}")
        print(f"  Product            : {best_match['product']}")

        if best_match["platforms"] != "N/A":
            print(f"  Platforms          : {best_match['platforms']}")

        print(f"\n  {best_match['default_status']}")

        result_versions = []
        if best_match["affected_versions"]:
            print(f"\n  Affected Versions:")
            for ver in best_match["affected_versions"]:
                print(f"    • {ver}")
                in_range = False
                if library_version:
                    ver_match = re.search(
                        r'from\s+([\d.]+)\s+before\s+([\d.]+)',
                        ver, re.IGNORECASE
                    )
                    if ver_match:
                        if is_version_in_range(library_version, ver_match.group(1), ver_match.group(2)):
                            in_range = True
                            print(f"      ⚠️  Library version {library_version} "
                                  f"falls in this affected range!")
                result_versions.append({"text": ver, "in_range": in_range})
        else:
            print("\n  Affected Versions  : N/A")

        print("\n" + "=" * 60)
        print("✅ Extraction Complete!")

        # If no affected versions found, treat as no result
        if not result_versions:
            return None
        return {"affected_versions": result_versions, "library_version": library_version}

    else:
        print(f"  ❌ No confident match found for '{search_product}'.")
        print(f"  💡 Best score was {round(best_score, 1)} (threshold: {fuzzy_threshold}).")
        print("  💡 Try adjusting the product name or lowering the fuzzy threshold.")
        print("\n" + "=" * 60)
        print("✅ Extraction Complete!")
        return None

# -------------------------------------------------------
# ▶ ENTRY POINT
# -------------------------------------------------------
if __name__ == "__main__":
    cve_id          = "CVE-2026-33116"
    search_product  = "ASP.NET Core Runtime"
    library_version = "8.0.10"
    get_cve_section(cve_id, search_product, library_version)