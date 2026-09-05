# Multi-Reviewer Setup Guide

## Overview
This project uses an automated reviewer assignment system to work around GitLab's free tier limitation of one reviewer per merge request.

## How It Works

1. **Automated Detection**: When a merge request is created, the CI pipeline automatically detects changed files
2. **Reviewer Lookup**: The system finds `.git-reviewers.json` files in the directory hierarchy
3. **Comment Generation**: A formatted comment is posted to the MR tagging all relevant reviewers
4. **Notifications**: All tagged reviewers receive notifications through GitLab's @mention system

## Setup Requirements

### 1. GitLab Access Token
Create a project or personal access token with the following scopes:
- `api`
- `write_repository`

**Add to GitLab CI/CD Variables:**
- Key: `REVIEW_ASSISTANT_TOKEN`
- Value: (your token)
- Masked: ✓

### 2. Reviewer Files Structure

Place `.git-reviewers.json` files in directories to assign reviewers:

```json
{
  "reviewers": ["username1", "username2", "username3"]
}
```

**Important**: 
- Use GitLab usernames WITHOUT the `@` symbol
- The script will automatically mention them in comments
- Files inherit reviewers from parent directories

### 3. CI/CD Pipeline

The `assign-reviewers` job in [.gitlab-ci.yml](cookbook/.gitlab-ci.yml) runs automatically on merge requests:

```yaml
assign-reviewers:
  image: python:3.10
  stage: build
  before_script:
    - git fetch --all
    - pip install requests gitpython 
  script:
    - python scripts/reviewer.py 
  rules:
    - if: $CI_MERGE_REQUEST_IID && $CI_MERGE_REQUEST_TITLE !~ /^(Draft:)/
      when: always
    - if: $CI_MERGE_REQUEST_IID && $CI_MERGE_REQUEST_TITLE =~ /^(Draft:)/
      when: manual
```

## Current Setup Status

✅ **114 reviewer files** configured across the project  
✅ **CI pipeline** configured and ready  
✅ **Reviewer script** ([scripts/reviewer.py](scripts/reviewer.py))  
✅ **All usernames fixed** (@ symbols removed)

## Next Steps

1. **Add the token** to GitLab CI/CD variables (if not already done)
2. **Test with a merge request** to see the automated comment
3. **Update reviewer mappings** in `.git-reviewers.json` files as needed

## Maintenance

- **Update reviewers**: Edit the `.git-reviewers.json` files in relevant directories
- **View current mappings**: See [Section Reviewers Mapping.md](docs/Community/Section%20Reviewers%20Mapping.md)
- **Exclude files**: The script automatically excludes "Table of Contents" paths

## Troubleshooting

If reviewers aren't being tagged:
1. Check that `REVIEW_ASSISTANT_TOKEN` is set in CI/CD variables
2. Verify usernames in `.git-reviewers.json` match GitLab usernames
3. Review the CI job logs for the `assign-reviewers` stage
