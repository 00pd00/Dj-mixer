import re
import requests
from search import get_cve_section
from RHEL import get_redhat_cve_and_errata, get_errata_packages
from si_sbom import check as sbom_check

# ── Configuration ──────────────────────────────────────────
POLARION_URL = "https://mypolarion.industrysoftware.automation.siemens.com/polarion"
BEARER_TOKEN = "eyJraWQiOiIyNTM0YWNkNi05MjdhMTZlNi01YmU2NzliNC1mM2NiMDE5MiIsInR5cCI6IkpXVCIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJ6MDA1Njk2diIsImlkIjoiNzY4MmY4MGQtMGE5NDJmMjctMTQwOGM1Y2EtZDJiODIzYWIiLCJleHAiOjE3Nzk0NzQ2MDAsImlhdCI6MTc3NTgwOTc4N30.j4QnJFdtk6BCSEvpAHG2OCRVEYFDlWyustcuPGv5o7vw4iAtbyqBuYQtG8sVR_ndUyGn3_cnlD0pyQ7xUkSMUSll6ikYodInWKEfbEZJrHsOah2vXi7ySgvtzGmOB0_tcOLeB9QM5mPj3fXyh2by8_1svFWQ-PTqPfH16d1CysR433_5PrcY4A0vT8I09AD-mytMm6WWfVrFckRT3u-2_-0ZuQ8UgDw0BBm7fTyxZfa99oL1rtgWl8ou_oWZh1OotrA9mQqhXhEWUzBYntf_xEvZ_L2GspKhfimdNihsv7QYQudrejT5Ipqv2I0A_TRUbvQftfTg9-POwHnZ2WNM-A"
PROJECT_ID   = "Teamcenter"
# ───────────────────────────────────────────────────────────

headers = {
    "Authorization": f"Bearer {BEARER_TOKEN}",
    "Accept":        "application/json"
}


def process_work_item(work_item_id):
    """Fetch CVE details for a work item, run search + RHEL lookup, post comment."""

    # ── Fetch Work Item ─────────────────────────────────────────
    url = (
        f"{POLARION_URL}/rest/v1/projects/{PROJECT_ID}"
        f"/workitems/{work_item_id}"
        f"?fields[workitems]=id,title,type,status,severity,priority,"
        f"dueDate,created,updated,cve,cvssScore,library,libraryVersion"
    )

    response = requests.get(url, headers=headers)
    response.raise_for_status()

    attrs = response.json()["data"]["attributes"]

    # ── Extract Fields ──────────────────────────────────────────
    work_item_id_val    = attrs.get("id",             "N/A")
    title               = attrs.get("title",          "N/A")
    wi_type             = attrs.get("type",           "N/A")
    status              = attrs.get("status",         "N/A")
    severity            = attrs.get("severity",       "N/A")
    priority            = attrs.get("priority",       "N/A")
    due_date            = attrs.get("dueDate",        "N/A")
    cve                 = attrs.get("cve",            "N/A")
    cvss_score          = attrs.get("cvssScore",      "N/A")
    third_party_library = attrs.get("library",        "N/A")
    library_version     = attrs.get("libraryVersion", "N/A")

    # ── Print Results ───────────────────────────────────────────
    print("=" * 60)
    print(f"  Work Item          : {work_item_id_val}")
    print(f"  Type               : {wi_type}")
    print(f"  Status             : {status}")
    print(f"  Severity           : {severity}")
    print(f"  Priority           : {priority}")
    print(f"  Due Date           : {due_date}")
    print(f"  CVE                : {cve}")
    print(f"  CVSS Score         : {cvss_score}")
    print(f"  Third Party Library: {third_party_library}")
    print(f"  Library Version    : {library_version}")
    print("=" * 60)
    print(f"\n  Title: {title}\n")

    # ── Run search.py for the latest CVE found ─────────────────
    if cve and cve != "N/A":
        cve_list = [c.strip() for c in cve.split(",") if c.strip()]

        def cve_sort_key(cve_str):
            parts = cve_str.upper().replace("CVE-", "").split("-")
            try:
                return (int(parts[0]), int(parts[1]))
            except (IndexError, ValueError):
                return (0, 0)

        sorted_cves = sorted(cve_list, key=cve_sort_key, reverse=True)

        # Extract component and RHEL product once (shared across CVE attempts)
        if "package:" in third_party_library.lower():
            component = third_party_library.split(":")[-1].strip()
        else:
            component = third_party_library.strip()

        version_match = re.search(r'\b(\d+\.\d+)\b', third_party_library)
        if not version_match:
            version_match = re.search(r'\b(\d+\.\d+)\b', title)
        rhel_version  = version_match.group(1) if version_match else ""
        rhel_product  = f"Red Hat Enterprise Linux {rhel_version}".strip()

        # ── Try CVEs in order: latest first, then 2nd latest if no results ──
        for attempt, cve_id in enumerate(sorted_cves[:2], start=1):
            if attempt == 1:
                print(f"  Latest CVE: {cve_id}\n")
            else:
                print(f"\n  No results found for latest CVE. Trying 2nd latest: {cve_id}\n")

            search_result = get_cve_section(cve_id, third_party_library, library_version)

            print("\n🔄 Running Red Hat advisory lookup...\n")
            rhel_result = get_redhat_cve_and_errata(cve_id, rhel_product, component, library_version)

            # If either returned results, stop here
            if search_result or rhel_result:
                break

        # ── Fallback: direct errata lookup if no results from any CVE ────
        if not search_result and not rhel_result:
            errata_match = re.search(r'((?:RHSA|RLSA)-\d{4}:\d+)', title, re.IGNORECASE)
            if errata_match:
                errata_id = errata_match.group(1)
                print(f"\n  No CVE results found. Trying direct errata lookup: {errata_id}\n")
                errata_packages = get_errata_packages(errata_id)
                print("=" * 70)
                print(f"  ERRATA SRPM PACKAGE : {errata_id}")
                print("=" * 70)
                if errata_packages:
                    for platform, sections in errata_packages.items():
                        srpm_list = sections.get("SRPM", [])
                        if srpm_list:
                            print(f"\n  {platform}")
                            print(f"  {'─' * 65}")
                            for pkg_name, checksum in srpm_list:
                                print(f"    {pkg_name}")
                            break
                else:
                    print("  Could not retrieve errata package details.")
                print("=" * 70)

    else:
        print("  No CVE found for this work item. Skipping.")

    # ── SI SBOM check (runs last, after all CVE lookups) ───────
    SBOM_APP_PATTERN = re.compile(
        r'Blackduck\s*-\s*(Siemens\s+Teamcenter(?:\s+[A-Za-z][\w\-]*)*)\s+(\d+[\d.]+)(?:\s+-)',
        re.IGNORECASE
    )
    sbom_match = SBOM_APP_PATTERN.search(title)
    if not sbom_match:
        sbom_match = re.search(
            r'(Siemens\s+Teamcenter(?:\s+[A-Za-z][\w\-]*)*)\s+(\d+[\d.]+)(?:\s+-)',
            title, re.IGNORECASE
        )
    if sbom_match:
        app_name    = sbom_match.group(1).strip()
        app_version = sbom_match.group(2).strip()

        if "package:" in third_party_library.lower():
            lib_name = third_party_library.split(":")[-1].strip()
        else:
            lib_name = third_party_library.strip()
        lib_name = re.split(r'\s+\d', lib_name)[0].strip()

        print("-" * 60)
        print(f"  SBOM Check")
        print(f"  App Name   : {app_name}")
        print(f"  App Version: {app_version}")
        print(f"  Library    : {lib_name}")
        print("-" * 60)
        try:
            sbom_result = sbom_check(
                app_name=app_name,
                lib_name=lib_name,
                app_version=app_version,
                lib_version=library_version if library_version not in ("N/A", "All Versions", "") else None
            )
            print(f"  Verdict    : {sbom_result['verdict']}")
            found_versions = [c.get('version') for c in sbom_result['found']]
            if found_versions:
                print(f"  Found ver. : {', '.join(str(v) for v in found_versions)}")
        except Exception as e:
            print(f"  SBOM result: {e}")
        print("-" * 60)
    else:
        print("-" * 60)
        print(f"  SBOM Check : Could not parse app name/version from title.")
        print(f"  Title      : {title}")
        print("-" * 60)


if __name__ == "__main__":
    work_item_id = input("Enter Work Item ID (e.g. LCS-1334071): ").strip()
    process_work_item(work_item_id)