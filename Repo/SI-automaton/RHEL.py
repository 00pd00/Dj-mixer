from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup

def get_redhat_cve_and_errata(cve_id, search_product, search_component, library_version=None):
    print(f"\n🔍 Fetching Red Hat CVE details for : {cve_id}")
    print(f"🎯 Searching for Product            : {search_product}")
    print(f"🔩 Searching for Component          : {search_component}")
    if library_version:
        print(f"📌 Library Version                  : {library_version}")
    print("=" * 70)

    driver = create_driver()
    base_url = f"https://access.redhat.com/security/cve/{cve_id.lower()}"
    driver.get(f"{base_url}#cve-affected-packages")

    try:
        WebDriverWait(driver, 25).until(
            EC.presence_of_element_located(
                (By.CSS_SELECTOR, "div.affected-packages-content")
            )
        )
    except Exception as e:
        print(f"⚠️  Timeout waiting for CVE page: {e}")
        driver.quit()
        return

    soup = BeautifulSoup(driver.page_source, "html.parser")
    total_pages = detect_total_pages(soup)
    print(f"📄 Total pages detected : {total_pages}\n")

    matched_row = None

    for page_num in range(1, total_pages + 1):
        print(f"  🔎 Scanning page {page_num}/{total_pages}...")
        page_url = f"{base_url}#{page_num}"
        driver.get(page_url)

        try:
            WebDriverWait(driver, 20).until(
                EC.presence_of_element_located(
                    (By.CSS_SELECTOR, "tbody.packages-tbody")
                )
            )
        except Exception:
            print(f"    ⚠️  Could not load page {page_num}, skipping.")
            continue

        page_soup = BeautifulSoup(driver.page_source, "html.parser")
        matched_row = extract_matching_row(page_soup, search_product, search_component, library_version)

        if matched_row:
            print(f"  ✅ Match found on page {page_num}!\n")
            break

    driver.quit()

    print("\n" + "=" * 70)
    print("📦 MATCHED CVE ENTRY")
    print("=" * 70)

    if not matched_row:
        print(f"  ❌ No entry found matching:")
        print(f"     Product   → '{search_product}'")
        print(f"     Component → '{search_component}'")
        print("\n" + "=" * 70)
        return None

    column_order = [
        "Products / Services",
        "Components",
        "State",
        "Justification",
        "Errata",
        "Release Date"
    ]
    for col in column_order:
        val = matched_row.get(col, "N/A")
        print(f"  {col:<25} : {val}")

    if "_version_note" in matched_row:
        print(f"\n  ⚠️  {matched_row['_version_note']}")

    print("=" * 70)

    errata_id = matched_row.get("Errata", "").strip()

    if not errata_id or errata_id == "N/A":
        print("\n  ⚠️  No Errata ID found. Skipping errata lookup.")
        print("=" * 70)
        return None

    print(f"\n🔗 Errata ID found : {errata_id}")
    print(f"🌐 Fetching Errata page...\n")

    errata_packages = get_errata_packages(errata_id)

    print("\n" + "=" * 70)
    print(f"📋 ERRATA SRPM PACKAGE : {errata_id}")   # ← PACKAGE singular
    print("=" * 70)

    first_srpm = None
    if errata_packages:
        for platform, sections in errata_packages.items():
            srpm_list = sections.get("SRPM", [])
            if srpm_list:
                first_srpm = srpm_list[0][0]          # ← name only, no checksum
                print(f"\n  📦 {first_srpm}")
                break                                  # ← first platform only
    else:
        print("  ❌ Could not retrieve errata package details.")

    print("\n" + "=" * 70)
    print("✅ Extraction Complete!")
    return {"errata_id": errata_id, "srpm_package": first_srpm}

def get_errata_packages(errata_id):
    url = f"https://access.redhat.com/errata/{errata_id}"
    # print(f"  📡 Loading : {url}")

    driver = create_driver()
    driver.get(url)

    try:
        WebDriverWait(driver, 25).until(
            EC.presence_of_element_located(
                (By.CSS_SELECTOR, "div#packages table.files")
            )
        )
        print("  ✅ Errata page loaded.\n")
    except Exception as e:
        print(f"  ⚠️  Timeout waiting for errata page: {e}")

    soup = BeautifulSoup(driver.page_source, "html.parser")
    driver.quit()

    packages_div = soup.find("div", {"id": "packages"})
    if not packages_div:
        print("  ❌ Packages section not found on errata page.")
        return None

    result = {}
    elements = packages_div.find_all(["h2", "table"])
    current_platform = None

    for element in elements:
        if element.name == "h2":
            current_platform = element.get_text(strip=True)
            result[current_platform] = {}

        elif element.name == "table" and current_platform:
            current_section = None
            rows = element.find_all("tr")

            for row in rows:
                th = row.find("th")
                if th:
                    current_section = th.get_text(strip=True)
                    if current_section not in result[current_platform]:
                        result[current_platform][current_section] = []
                    continue

                name_td     = row.find("td", class_="name")
                checksum_td = row.find("td", class_="checksum")

                if name_td and checksum_td and current_section:
                    pkg_name = name_td.get_text(strip=True)
                    checksum = checksum_td.get_text(strip=True)
                    result[current_platform][current_section].append(
                        (pkg_name, checksum)
                    )

    return result if result else None

def create_driver():
    options = Options()
    options.add_argument("--headless")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument(
        "user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/120.0.0.0 Safari/537.36"
    )
    return webdriver.Chrome(options=options)

def detect_total_pages(soup):
    try:
        pagination_ol = soup.find("ol", {"data-v-e59e5ad1": True})
        if pagination_ol:
            pages = pagination_ol.find_all("li")
            return len(pages)
    except Exception:
        pass
    return 1

def extract_matching_row(soup, search_product, search_component, library_version=None):
    tbody = soup.find("tbody", class_="packages-tbody")
    if not tbody:
        return None

    rows = tbody.find_all("tr", class_="packages-tr")

    for row in rows:
        cells = row.find_all("td", class_="packages-td")

        row_dict = {}
        for cell in cells:
            label = cell.get("data-label", "").strip()
            value = cell.get_text(strip=True)
            row_dict[label] = value

        product_val   = row_dict.get("Products / Services", "")
        component_val = row_dict.get("Components", "")

        # Use prefix match for product: "Red Hat Enterprise Linux 9.6" matches "Red Hat Enterprise Linux 9"
        name_match = (product_val.lower().startswith(search_product.lower()) or
                      search_product.lower().startswith(product_val.lower())) and \
                     search_component.lower() in component_val.lower()

        if not name_match:
            continue

        # If library_version provided, also verify it appears in the component field
        # (e.g. component cell may show "glib2-2.56.4" or just "glib2")
        if library_version and library_version.lower() not in ("n/a", "all versions", ""):
            major_version = ".".join(library_version.split(".")[:2])
            if major_version not in component_val:
                # Still return the row but flag it
                row_dict["_version_note"] = (
                    f"Note: library version {library_version} not confirmed in component field."
                )

        return row_dict

    return None

if __name__ == "__main__":
    cve_id           = "CVE-2024-34397"
    search_product   = "Red Hat Enterprise Linux 8"
    search_component = "glib2"
    get_redhat_cve_and_errata(cve_id, search_product, search_component)