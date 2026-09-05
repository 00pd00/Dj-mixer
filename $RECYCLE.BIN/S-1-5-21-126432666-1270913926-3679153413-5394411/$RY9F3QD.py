import requests
import json
import re

# --- NVD Helper Functions (Concise Output) ---
def get_cve_details_from_nvd(cve_id):
    """
    Fetches details for a given CVE ID from the NVD API.
    Returns a dictionary with CVE details or None if an error occurs.
    """
    base_url = "https://services.nvd.nist.gov/rest/json/cves/2.0"
    params = {'cveId': cve_id}

    try:
        response = requests.get(base_url, params=params)
        response.raise_for_status()
        data = response.json()

        if data and 'vulnerabilities' in data and data['vulnerabilities']:
            return data['vulnerabilities'][0]['cve']
        else:
            return None

    except requests.exceptions.RequestException as e:
        print(f"Error fetching NVD data for {cve_id}: {e}")
        return None
    except json.JSONDecodeError as e:
        print(f"Error decoding NVD JSON response for {cve_id}: {e}")
        return None

def print_nvd_cve_info(cve_data):
    """
    Prints concise NVD CVE information: ID, Status, CVSS Base Score, and Reference URLs.
    """
    if not cve_data:
        print("  NVD Info: Not available or error fetching.")
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

    print(f"\n  --- NVD Summary for {cve_id} ---")
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

# --- Example Usage (How you might use these functions in your script) ---
if __name__ == "__main__":
    print("--- Checking a single CVE ---")
    single_cve_id = "CVE-2023-2825" # A published CVE for demonstration
    nvd_data = get_cve_details_from_nvd(single_cve_id)
    print_nvd_cve_info(nvd_data)

    print("\n" + "=" * 60 + "\n")

    print("--- Checking multiple CVEs from a string (including RESERVED ones) ---")
    cve_string_from_source = "CVE-2025-15366,CVE-2025-15367,CVE-2026-1299,CVE-2023-2825,CVE-2024-24919"

    if cve_string_from_source and cve_string_from_source != "N/A":
        cve_ids = re.findall(r'CVE-\d{4}-\d+', cve_string_from_source)
        if cve_ids:
            print("\n" + "#" * 60)
            print("  NVD Check Results:")
            print("#" * 60)
            for cve_id in cve_ids:
                nvd_cve_data = get_cve_details_from_nvd(cve_id)
                print_nvd_cve_info(nvd_cve_data)
        else:
            print("\nNo valid CVE IDs found in the provided string.")
    else:
        print("\nNo CVEs provided in the string for NVD check.")