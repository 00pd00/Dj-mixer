import os
import json
import sys
import requests
import git
from collections import defaultdict

# --- Constants ---

EXCLUDE_PATTERNS = [
    ".git-reviewers.json",
    "Table of Contents",
]


def should_exclude_file(file_path: str) -> bool:
    """Check if a file should be excluded from review assignment."""
    return any(pattern in file_path for pattern in EXCLUDE_PATTERNS)


def find_reviewers_recursively(file_path):
    """
    Recursively search for reviewers in .git-reviewers.json up to root.
    If reviewers are found at a folder, do NOT look in parent folders.
    """
    dir_path = os.path.dirname(os.path.abspath(file_path))
    checked_dirs = set()
    while True:
        if dir_path in checked_dirs:
            break
        checked_dirs.add(dir_path)
        reviewers_path = os.path.join(dir_path, ".git-reviewers.json")
        if os.path.isfile(reviewers_path):
            with open(reviewers_path, "r") as f:
                data = json.load(f)
                reviewers = set(data.get("reviewers", []))
                if reviewers:
                    return reviewers, dir_path
        parent = os.path.dirname(dir_path)
        if parent == dir_path:
            break
        dir_path = parent
    return set(), None


def get_all_reviewers_for_files(file_paths: list) -> dict:
    """
    Get reviewers grouped by their assigned files.
    """
    reviewer_files = {}
    
    for file_path in file_paths:
        reviewers, _ = find_reviewers_recursively(file_path)
        for reviewer in reviewers:
            if reviewer not in reviewer_files:
                reviewer_files[reviewer] = []
            reviewer_files[reviewer].append(file_path)
    
    return reviewer_files

def get_mr_info(project_id, mr_iid, token, api_url):
    """Get merge request information including branch and existing comments."""
    url = f"{api_url}/projects/{project_id}/merge_requests/{mr_iid}"
    headers = {"PRIVATE-TOKEN": token}
    resp = requests.get(url, headers=headers)
    resp.raise_for_status()
    data = resp.json()
    return {
        "source_branch": data["source_branch"],
        "created_at": data["created_at"],
        "updated_at": data["updated_at"],
        "author": data["author"]["username"]
    }


def check_if_update(project_id, mr_iid, token, api_url):
    """Check if this is an update (not first run) by looking for existing bot comments."""
    url = f"{api_url}/projects/{project_id}/merge_requests/{mr_iid}/notes"
    headers = {"PRIVATE-TOKEN": token}
    resp = requests.get(url, headers=headers)
    resp.raise_for_status()
    notes = resp.json()
    
    # Check if we've already posted a review request comment
    for note in notes:
        if "📋 Review Request" in note.get("body", ""):
            return True
    return False


def get_changed_files(source_branch, only_latest_commit=False):
    """Get changed files between master and MR branch using GitPython.
    
    Args:
        source_branch: The source branch name
        only_latest_commit: If True, only get files changed in the latest commit
    """
    repo = git.Repo(os.getcwd(), search_parent_directories=True)
    
    try:
        repo.git.fetch('--all')
        print("Fetched latest branches")
    except Exception as e:
        print(f"Warning: Failed to fetch: {str(e)}")
    
    if only_latest_commit:
        # Get files changed in the latest commit only
        try:
            diff = repo.git.diff('HEAD~1', name_only=True)
            print("Getting files from latest commit only (incremental update)")
        except git.exc.GitCommandError:
            # Fallback to all changes if HEAD~1 doesn't exist
            diff = repo.git.diff(f'origin/master..origin/{source_branch}', name_only=True)
            print("Fallback: Getting all changed files")
    else:
        # Get all files changed in the MR
        try:
            diff = repo.git.diff(f'origin/master..origin/{source_branch}', name_only=True)
        except git.exc.GitCommandError:
            diff = repo.git.diff(f'master..{source_branch}', name_only=True)
        print("Getting all files changed in MR")
    
    # Filter out excluded files
    changed = [
        line.strip() 
        for line in diff.splitlines() 
        if line.strip() and not should_exclude_file(line.strip())
    ]
    
    print("Changed files:")
    for f in changed:
        print(f"  - {f}")
    return changed


def format_mr_comment(reviewer_files: dict, changed_files: list, is_update: bool = False) -> str:
    """Format the MR comment with reviewer assignments."""
    
    if not reviewer_files:
        return "**Notice:** *No reviewers found for the changed files.*"

    # Main headers
    header = "# 🔄 Review Request - Update" if is_update else "# 📋 Review Request"
    intro = "*New changes have been pushed. Please review the updated files.*" if is_update else ""
    
    comment = [
        header,
        intro,
        "",
        "## 👥 Reviews by Assignee",
        "",
        "---"
    ]

    # Process each reviewer and their files (WITHOUT @mention)
    for reviewer, files in sorted(reviewer_files.items()):
        comment.extend([
            f"### 🔍 **{reviewer}** *(Required)*",
            "",
            "📑 **Modified Files:**",
            ""
        ])
        comment.extend(f"- 📄 `{file}`" for file in sorted(files))
        comment.extend(["", "---", ""])

    # Process files without reviewers
    files_with_reviewers = set()
    for files in reviewer_files.values():
        files_with_reviewers.update(files)
    
    files_without_reviewers = set(changed_files) - files_with_reviewers

    if files_without_reviewers:
        comment.extend([
            "## ⚠️ Files Without Assigned Reviewers",
            "",
            "*The following files need reviewer assignment:*",
            ""
        ])
        comment.extend(f"- ❗ `{file}`" for file in sorted(files_without_reviewers))
        comment.append("\n*Please assign appropriate reviewers to these files.*")

    # Footer
    footer_note = "*Note: Please review the latest changes.*" if is_update else "*Note: Please ensure to review the changes thoroughly.*"
    comment.extend([
        "",
        "---",
        "",
        footer_note,
        "\n*Reviewers have been notified automatically via GitLab TODO system.*"
    ])

    return "\n".join(comment)


def get_user_id(username, token, api_url):
    """Get GitLab user ID from username."""
    url = f"{api_url}/users?username={username}"
    headers = {"PRIVATE-TOKEN": token}
    try:
        resp = requests.get(url, headers=headers)
        resp.raise_for_status()
        users = resp.json()
        if users:
            return users[0]['id']
    except Exception as e:
        print(f"Warning: Could not get user ID for {username}: {e}")
    return None


def create_todo_for_reviewer(project_id, mr_iid, user_id, token, api_url):
    """Create a TODO item for a user, which triggers notification without @mention."""
    url = f"{api_url}/projects/{project_id}/merge_requests/{mr_iid}/todo"
    headers = {"PRIVATE-TOKEN": token, "SUDO": str(user_id)}
    try:
        resp = requests.post(url, headers=headers)
        if resp.status_code in [200, 201, 304]:
            return True
        print(f"Warning: Could not create TODO for user {user_id}: {resp.status_code}")
    except Exception as e:
        print(f"Warning: Error creating TODO for user {user_id}: {e}")
    return False


def notify_reviewers_via_api(project_id, mr_iid, reviewer_usernames, token, api_url):
    """Notify reviewers by creating TODO items via API (no @mention needed)."""
    notified_count = 0
    for username in reviewer_usernames:
        user_id = get_user_id(username, token, api_url)
        if user_id:
            if create_todo_for_reviewer(project_id, mr_iid, user_id, token, api_url):
                print(f"  ✅ Created TODO for @{username} (ID: {user_id})")
                notified_count += 1
            else:
                print(f"  ⚠️  Failed to create TODO for @{username}")
        else:
            print(f"  ⚠️  Could not find user @{username}")
    return notified_count


def post_gitlab_comment(project_id, mr_iid, comment, token, api_url):
    """Post a comment to the GitLab merge request."""
    url = f"{api_url}/projects/{project_id}/merge_requests/{mr_iid}/notes"
    headers = {"PRIVATE-TOKEN": token}
    resp = requests.post(url, headers=headers, json={"body": comment})
    resp.raise_for_status()


if __name__ == "__main__":
    DEFAULT_API_URL = "https://code.siemens.com/api/v4"
    PROJECT_ID = "453191"
    TOKEN = os.environ.get("REVIEW_ASSISTANT_TOKEN")
    mr_iid = sys.argv[1] if len(sys.argv) > 1 else os.environ.get("CI_MERGE_REQUEST_IID")

    if not (PROJECT_ID and mr_iid and TOKEN):
        print("Missing CI_PROJECT_ID, CI_MERGE_REQUEST_IID, or TOKEN. Skipping API call.")
        sys.exit(1)

    # Get MR info and check if this is an update
    mr_info = get_mr_info(PROJECT_ID, mr_iid, TOKEN, DEFAULT_API_URL)
    is_update = check_if_update(PROJECT_ID, mr_iid, TOKEN, DEFAULT_API_URL)
    
    source_branch = mr_info["source_branch"]
    print(f"Source branch for MR {mr_iid}: {source_branch}")
    print(f"MR Status: {'UPDATE - Notifying reviewers for changed files only' if is_update else 'NEW - First notification'}")

    # For updates, only get files changed in the latest push
    # For new MRs, get all changed files
    changed_files = get_changed_files(source_branch, only_latest_commit=is_update)
    
    if not changed_files:
        print("No files changed (or only excluded files). Skipping notification.")
        sys.exit(0)
    
    # Use centralized configuration - only notify reviewers for files that actually changed
    reviewer_files = get_all_reviewers_for_files(changed_files)
    
    if not reviewer_files:
        print("No reviewers assigned to the changed files. Skipping notification.")
        sys.exit(0)
    
    comment = format_mr_comment(reviewer_files, changed_files, is_update)
    print("\n" + "="*80)
    print("COMMENT TO BE POSTED:")
    print("="*80)
    print(comment)
    print("="*80 + "\n")
    
    affected_reviewers = list(reviewer_files.keys())
    print(f"Reviewers to be notified: {', '.join(affected_reviewers)}")
    
    # Post the informational comment (without @mentions)
    post_gitlab_comment(PROJECT_ID, mr_iid, comment, TOKEN, DEFAULT_API_URL)
    print("✅ Comment posted successfully!")
    
    # Notify reviewers via GitLab TODO API (triggers notifications WITHOUT @mentions)
    print("\nCreating TODO items for reviewers...")
    notified_count = notify_reviewers_via_api(PROJECT_ID, mr_iid, affected_reviewers, TOKEN, DEFAULT_API_URL)
    
    status = "notified for their updated files" if is_update else "notified"
    print(f"\n✅ Notification complete! {notified_count}/{len(affected_reviewers)} reviewer(s) {status}.")
