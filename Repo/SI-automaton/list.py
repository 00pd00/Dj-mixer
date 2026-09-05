import requests
from urllib.parse import urlparse, parse_qs, unquote
import textwrap
from cve import process_work_item

# ── Configuration ──────────────────────────────────────────
POLARION_URL = "https://mypolarion.industrysoftware.automation.siemens.com/polarion"
BEARER_TOKEN = "eyJraWQiOiIyNTM0YWNkNi05MjdhMTZlNi01YmU2NzliNC1mM2NiMDE5MiIsInR5cCI6IkpXVCIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJ6MDA1Njk2diIsImlkIjoiNzY4MmY4MGQtMGE5NDJmMjctMTQwOGM1Y2EtZDJiODIzYWIiLCJleHAiOjE3Nzk0NzQ2MDAsImlhdCI6MTc3NTgwOTc4N30.j4QnJFdtk6BCSEvpAHG2OCRVEYFDlWyustcuPGv5o7vw4iAtbyqBuYQtG8sVR_ndUyGn3_cnlD0pyQ7xUkSMUSll6ikYodInWKEfbEZJrHsOah2vXi7ySgvtzGmOB0_tcOLeB9QM5mPj3fXyh2by8_1svFWQ-PTqPfH16d1CysR433_5PrcY4A0vT8I09AD-mytMm6WWfVrFckRT3u-2_-0ZuQ8UgDw0BBm7fTyxZfa99oL1rtgWl8ou_oWZh1OotrA9mQqhXhEWUzBYntf_xEvZ_L2GspKhfimdNihsv7QYQudrejT5Ipqv2I0A_TRUbvQftfTg9-POwHnZ2WNM-A"
# ───────────────────────────────────────────────────────────

headers = {
    "Authorization": f"Bearer {BEARER_TOKEN}",
    "Accept":        "application/json"
}

def parse_polarion_link(link):
    parsed   = urlparse(link)
    fragment = parsed.fragment

    if "?" in fragment:
        frag_path, frag_query = fragment.split("?", 1)
    else:
        frag_path, frag_query = fragment, ""

    parts      = frag_path.strip("/").split("/")
    project_id = parts[1] if len(parts) > 1 else None

    query_params = parse_qs(frag_query)
    query        = unquote(query_params.get("query", [""])[0])

    # ── Format 1: type in path  → /workitems/securityIssue?query=...
    # ── Format 2: type in query → /workitems?query=type:securityIssue AND ...
    if len(parts) > 3 and parts[3] not in ("", "workitems"):
        work_item_type = parts[3]
    else:
        work_item_type = None
        for token in query.split():
            if token.lower().startswith("type:"):
                work_item_type = token.split(":", 1)[1]
                break

    return project_id, work_item_type, query

def fetch_work_items(project_id, work_item_type, query):
    url = f"{POLARION_URL}/rest/v1/projects/{project_id}/workitems"

    # Only prepend type: if it's NOT already present in the query
    if work_item_type and f"type:{work_item_type}" not in query:
        full_query = f"type:{work_item_type} AND {query}" if query else f"type:{work_item_type}"
    else:
        full_query = query

    all_items = []
    page      = 1

    while True:
        params = {
            "fields[workitems]": "id,title",
            "query":             full_query,
            "page[size]":        "100",
            "page[number]":      str(page)
        }

        response = requests.get(url, headers=headers, params=params)

        if response.status_code != 200:
            print(f"  ❌ Failed! Status: {response.status_code}")
            print(response.text)
            break

        data      = response.json()
        items     = data.get("data", [])
        all_items.extend(items)

        total_count = data.get("meta", {}).get("totalCount", len(all_items))

        if len(all_items) >= total_count:
            break

        page += 1

    return all_items

def clean_title(title):
    """Decode HTML entities in title."""
    return title.replace("&lt;", "<").replace("&gt;", ">").replace("&amp;", "&")

def display_work_items(items):
    if not items:
        print("\n  ⚠️  No work items found.")
        return

    TITLE_WIDTH = 80

    print()
    print(f"  ╔══════════════════════════════════════════════════════════════════════════════════════════════════╗")
    print(f"  ║  📋  Found {len(items)} work item(s)                                                                      ║")
    print(f"  ╚══════════════════════════════════════════════════════════════════════════════════════════════════╝")
    print()

    for i, item in enumerate(items, start=1):
        raw_id  = item.get("id", "N/A")
        item_id = raw_id.split("/")[-1] if "/" in raw_id else raw_id
        title   = clean_title(item.get("attributes", {}).get("title", "N/A"))

        wrapped = textwrap.wrap(title, width=TITLE_WIDTH)

        print(f"  ┌─ #{i} {'─' * 90}")
        print(f"  │  🔹 ID    : {item_id}")
        print(f"  │  📝 Title : {wrapped[0]}")
        for line in wrapped[1:]:
            print(f"  │           {line}")
        print(f"  └{'─' * 94}")
        print()

def main():
    print()
    print("  ╔══════════════════════════════════════════════════════╗")
    print("  ║        🔗  Polarion Work Item Fetcher                ║")
    print("  ╚══════════════════════════════════════════════════════╝")
    print()

    link = input("  Paste your Polarion link: ").strip()
    print()

    project_id, work_item_type, query = parse_polarion_link(link)

    print(f"  ✅ Project  : {project_id}")
    print(f"  ✅ Type     : {work_item_type}")
    print(f"  ✅ Query    : {query}")
    print(f"\n  🔄 Fetching...\n")

    items = fetch_work_items(project_id, work_item_type, query)
    display_work_items(items)

    if items:
        processed = []
        print("  Processing each work item through CVE analysis...\n")
        for item in items:
            raw_id  = item.get("id", "")
            item_id = raw_id.split("/")[-1] if "/" in raw_id else raw_id
            title   = item.get("attributes", {}).get("title", "N/A")
            print(f"\n{'=' * 60}")
            print(f"  Processing: {item_id}")
            print(f"{'=' * 60}")
            process_work_item(item_id)
            processed.append((item_id, clean_title(title)))

        print(f"\n{'=' * 60}")
        print(f"  Summary: {len(processed)} work item(s) processed")
        print(f"{'=' * 60}")
        for idx, (wid, wtitle) in enumerate(processed, start=1):
            print(f"  {idx:>3}. {wid}  —  {wtitle}")
        print(f"{'=' * 60}\n")

    print("  Done!\n")

if __name__ == "__main__":
    main()