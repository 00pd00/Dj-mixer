import requests
import json
import re # <--- IMPORTANT: Ensure 're' is imported at the top!

# --- Red Hat Security API Helper Functions ---
def get_redhat_cve_details(cve_id):
    """
    Fetches details for a given CVE ID from the Red Hat Security Data API.
    Returns a dictionary with CVE details or None if an error occurs.
    """
    base_url = f"https://access.redhat.com/hydra/rest/securitydata/cve/{cve_id}.json"

    try:
        response = requests.get(base_url)
        response.raise_for_status()  # Raise an HTTPError for bad responses (4xx or 5xx)
        data = response.json()
        return data
    except requests.exceptions.RequestException as e:
        # It's common for Red Hat not to have data for every CVE, especially if it
        # doesn't affect their products. A 404 is not necessarily an error in our logic.
        if response.status_code == 404:
            # print(f"Red Hat has no specific data for {cve_id} (404 Not Found).") # Optional debug
            return None # Return None to indicate no data found
        else:
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
    severity = redhat_cve_data.get('severity', 'N/A')
    public_date = redhat_cve_data.get('public_date', 'N/A')

    print(f"  Severity: {severity}")
    print(f"  Public Date: {public_date}")

    # Affected products and versions
    affected_products = redhat_cve_data.get('affected_products', [])
    if affected_products:
        print("  Affected Red Hat Products:")
        for product in affected_products:
            print(f"    - {product}")
    else:
        print("  Affected Red Hat Products: None listed directly.")

    # Fixed advisories (RHSAs) are key for fix information
    advisories = redhat_cve_data.get('advisories', {})
    if advisories:
        print("  Red Hat Advisories (Fixes/Updates):")
        for advisory_type, advisory_list in advisories.items():
            for advisory_id in advisory_list:
                # Constructing the full URL for the advisory
                advisory_url = f"https://access.redhat.com/errata/{advisory_id}"
                print(f"    - {advisory_id} ({advisory_type}): {advisory_url}")
    else:
        print("  Red Hat Advisories: No advisories found (may not be fixed yet or not applicable).")
    print("  -----------------------------")
# --- End Red Hat Security API Helper Functions ---

# --- Example Usage ---
if __name__ == "__main__":
    # Example CVEs (some likely to be in Red Hat, some not)
    cve_list_to_check = [
        "CVE-2024-24919", # Example CVE, might or might not be in Red Hat's database
        "CVE-2023-4911",  # Example CVE for glibc, likely in Red Hat
        "CVE-2021-3156",  # Example CVE for sudo, likely in Red Hat
        "CVE-2025-12345"  # A hypothetical future CVE
    ]

    for cve_id in cve_list_to_check:
        redhat_data = get_redhat_cve_details(cve_id)
        print_redhat_cve_info(redhat_data, cve_id) # Pass cve_id to print function

    print("\n" + "=" * 60 + "\n")

    # How you might integrate this after getting CVEs from Polarion:
    print("--- Simulating integration with Polarion CVEs ---")
    cve_string_from_polarion = "CVE-2023-4911,CVE-2021-3156,CVE-2025-12345,CVE-2024-24919" # Example from Polarion
    if cve_string_from_polarion and cve_string_from_polarion != "N/A":
        cve_ids_from_polarion = re.findall(r'CVE-\d{4}-\d+', cve_string_from_polarion)
        if cve_ids_from_polarion:
            print("\n" + "#" * 60)
            print("  Red Hat Check Results for Polarion CVEs:")
            print("#" * 60)
            for cve_id in cve_ids_from_polarion:
                redhat_data = get_redhat_cve_details(cve_id)
                print_redhat_cve_info(redhat_data, cve_id) # Pass cve_id here too
        else:
            print("\nNo valid CVE IDs found in the provided string from Polarion.")
    else:
        print("\nNo CVEs provided in the string from Polarion for Red Hat check.")