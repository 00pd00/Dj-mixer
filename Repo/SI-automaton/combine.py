import requests
import json
import re

# --- NVD Helper Functions (No change needed here) ---
def get_cve_details_from_nvd(cve_id):
    """
    Fetches details for a given CVE ID from the NVD API.
    Returns a dictionary with CVE details or None if an error occurs.
    """
    base_url = "https://services.nvd.nist.gov/rest/json/cves/2.0"
    params = {'cveId': cve_id}

    try:
        response = requests.get(base_url, params=params)
        response.raise_for_status() # Raise an HTTPError for bad responses (4xx or 5xx)
        data = response.json()

        if data and 'vulnerabilities' in data and data['vulnerabilities']:
            return data['vulnerabilities'][0]['cve']
        else:
            return None

    except requests.exceptions.RequestException as e:
        # NVD might return 404 for reserved or very new CVEs not yet processed
        if response.status_code == 404:
            return None
        print(f"Error fetching NVD data for {cve_id}: {e}")
        return None
    except json.JSONDecodeError as e:
        print(f"Error decoding NVD JSON response for {cve_id}: {e}")
        return None

def print_nvd_cve_info(cve_data, cve_id_queried):
    """
    Prints concise NVD CVE information: ID, Status, CVSS Base Score, and Reference URLs.
    """
    print(f"\n  --- NVD Summary for {cve_id_queried} ---")

    if not cve_data:
        print("  NVD Info: Not available or error fetching.")
        print("  -----------------------------")
        return

    cve_id = cve_data.get('id', 'N/A')
    status = cve_data.get('vulnStatus', 'N/A')

    # Get CVSS Base Score
    cvss_score_str = "N/A"
    metrics = cve_data.get('metrics', {})
    if 'cvssMetricV31' in metrics and metrics['cvssMetricV31']:
        cvss_v3 = metrics['cvssMetricV31'][0]['cvssData']
        cvss_score_str = f"{cvss_v3.get('baseScore', 'N/A')} (v3.1)"
    elif 'cvssMetricV2' in metrics and metrics['cvssMetricV2']:
        cvss_v2 = metrics['cvssMetricV2'][0]['cvssData']
        cvss_score_str = f"{cvss_v2.get('baseScore', 'N/A')} (v2.0)"

    print(f"  Status: {status}")
    print(f"  CVSS Base Score: {cvss_score_str}")

    references = cve_data.get('references', [])
    if references:
        print("  References (URLs for fix info):")
        for ref in references:
            print(f"    - {ref.get('url', 'N/A')}")
    else:
        print("  References: No public URLs for fix information.")
    print("  -----------------------------")
# --- End NVD Helper Functions ---

# --- Red Hat Security API Helper Functions ---
def get_redhat_cve_details(cve_id):
    """
    Fetches details for a given CVE ID from the Red Hat Security Data API.
    Returns a dictionary with CVE details or None if an error occurs.
    """
    base_url = f"https://access.redhat.com/hydra/rest/securitydata/cve/{cve_id}.json"

    try:
        response = requests.get(base_url)
        response.raise_for_status()
        data = response.json()
        return data
    except requests.exceptions.RequestException as e:
        if response.status_code == 404:
            return None
        print(f"Error fetching Red Hat data for {cve_id}: {e}")
        return None
    except json.JSONDecodeError as e:
        print(f"Error decoding Red Hat JSON response for {cve_id}: {e}")
        return None

def print_redhat_cve_info(redhat_cve_data, cve_id_queried):
    """
    Prints concise Red Hat CVE information: ID, severity, affected products, and fixed advisories.
    Takes cve_id_queried as an argument to always show the original CVE ID.
    """
    print(f"\n  --- Red Hat Details for {cve_id_queried} ---")

    if not redhat_cve_data:
        print("  Red Hat Info: No specific data found for this CVE in Red Hat's database.")
        print("  -----------------------------")
        return

    # If data is found, proceed with printing details
    severity = redhat_cve_data.get('threat_severity', 'N/A')
    if severity == 'N/A': # Fallback to CVSS scores if threat_severity is not directly available
        cvss3_data = redhat_cve_data.get('cvss3', {})
        if cvss3_data and cvss3_data.get('cvss3_base_score'):
            severity = f"CVSS3: {cvss3_data['cvss3_base_score']}"
        else:
            cvss2_data = redhat_cve_data.get('cvss2', {})
            if cvss2_data and cvss2_data.get('cvss2_base_score'):
                severity = f"CVSS2: {cvss2_data['cvss2_base_score']}"

    public_date = redhat_cve_data.get('public_date', 'N/A')

    print(f"  Severity: {severity}")
    print(f"  Public Date: {public_date}")

    affected_packages = redhat_cve_data.get('affected_packages', [])
    if affected_packages:
        print("  Affected Red Hat Packages/Products:")
        for pkg in affected_packages:
            if isinstance(pkg, dict):
                print(f"    - {pkg.get('package_name', 'N/A')} ({pkg.get('product_name', 'N/A')})")
            else:
                print(f"    - {pkg}")
    else:
        affected_products_list = redhat_cve_data.get('affected_products', [])
        if affected_products_list:
            print("  Affected Red Hat Products (General):")
            for product in affected_products_list:
                print(f"    - {product}")
        else:
            print("  Affected Red Hat Products: None listed directly.")

    advisories = redhat_cve_data.get('advisories', {})
    if advisories:
        print("  Red Hat Advisories (Fixes/Updates):")
        for advisory_type, advisory_list in advisories.items():
            for advisory_id in advisory_list:
                advisory_url = f"https://access.redhat.com/errata/{advisory_id}"
                print(f"    - {advisory_id} ({advisory_type}): {advisory_url}")
    else:
        bugzillas = redhat_cve_data.get('bugzilla', [])

        # Filter out the placeholder strings if they are the only content
        # Common placeholder strings often seen when data is empty or malformed
        placeholder_strings = {"description", "id", "url"}
        actual_bugzillas = [
            bug for bug in bugzillas
            if isinstance(bug, dict) or (isinstance(bug, str) and bug not in placeholder_strings)
        ]

        if actual_bugzillas:
            print("  Related Red Hat Bugzilla Entries (Potential Fix Info):")
            for bug in actual_bugzillas:
                if isinstance(bug, dict):
                    bug_id = bug.get('id', 'N/A')
                    bug_url = bug.get('url', 'N/A')
                    print(f"    - Bugzilla ID {bug_id}: {bug_url}")
                elif isinstance(bug, str):
                    print(f"    - {bug}")
                else:
                    print(f"    - Unexpected Bugzilla entry type: {type(bug)} - {bug}")
        else:
            print("  Red Hat Advisories: No advisories or Bugzilla entries found (may not be fixed yet or not applicable).")
            # Add a specific message if we filtered out placeholders
            if bugzillas and all(isinstance(b, str) and b in placeholder_strings for b in bugzillas):
                print("    (Note: Bugzilla data appears to be placeholder information.)")
    print("  -----------------------------")
# --- End Red Hat Security API Helper Functions ---

# --- Main Logic to Check CVEs (No change needed here) ---
def check_cve_with_fallback(cve_id):
    """
    Checks a CVE first with Red Hat's API, then falls back to NVD if no Red Hat data is found.
    """
    print(f"\n===== Checking CVE: {cve_id} =====")

    # 1. Try Red Hat's API first
    redhat_data = get_redhat_cve_details(cve_id)
    if redhat_data:
        print("  Found Red Hat specific data. Displaying Red Hat details:")
        print_redhat_cve_info(redhat_data, cve_id)
    else:
        print("  No specific Red Hat data found. Falling back to NVD.")
        # 2. If no Red Hat data, try NVD
        nvd_data = get_cve_details_from_nvd(cve_id)
        if nvd_data:
            print_nvd_cve_info(nvd_data, cve_id)
        else:
            print(f"  No data found from Red Hat or NVD for {cve_id}. It might be reserved, invalid, or very new.")
            print("  -----------------------------")
    print(f"===== End CVE: {cve_id} =====")

# --- User Input and Execution (No change needed here) ---
if __name__ == "__main__":
    print("Welcome to the Combined CVE Checker!")
    print("This tool fetches vulnerability details from Red Hat (if applicable) and NVD.")

    cve_input_string = input("\nPlease enter CVE IDs separated by commas (e.g., CVE-2023-4911,CVE-2021-3156): ")

    if cve_input_string:
        # Use regex to find all valid CVE patterns in the input string
        cve_ids_to_check = re.findall(r'CVE-\d{4}-\d+', cve_input_string)

        if cve_ids_to_check:
            print("\n" + "#" * 80)
            print("  Starting Combined Vulnerability Check:")
            print("#" * 80)
            for cve_id in cve_ids_to_check:
                check_cve_with_fallback(cve_id)
            print("\n" + "#" * 80)
            print("  Combined Vulnerability Check Complete.")
            print("#" * 80)
        else:
            print("\nNo valid CVE IDs found in your input. Please ensure they follow the format CVE-YYYY-NNNN.")
    else:
        print("\nNo CVEs provided. Exiting.")