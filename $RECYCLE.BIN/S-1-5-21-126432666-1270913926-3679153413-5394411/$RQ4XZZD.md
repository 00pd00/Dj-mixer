# Multi-Reviewer Setup Guide

## Overview
This project uses an automated reviewer assignment system to work around GitLab's free tier limitation of one reviewer per merge request.

## How It Works

1. **Automated Detection**: When a merge request is created, the CI pipeline automatically detects changed files
2. **Reviewer Lookup**: The system uses a centralized Python configuration ([reviewer_config.py](scripts/reviewer_config.py)) to match file paths to reviewers
3. **Comment Generation**: A formatted comment is posted to the MR tagging all relevant reviewers
4. **Notifications**: All tagged reviewers receive notifications through GitLab's @mention system

## Architecture

### Code-Based Configuration ✨ NEW!

The reviewer system now uses **centralized Python configuration** instead of scattered JSON files:

- **[reviewer_config.py](scripts/reviewer_config.py)** - Single source of truth for all reviewer mappings
- **[reviewer_v2.py](scripts/reviewer_v2.py)** - Updated script that uses the Python configuration
- **[test_reviewer_config.py](scripts/test_reviewer_config.py)** - Test utility to validate assignments

**Benefits:**
- ✅ Single file to maintain (no more 114+ scattered JSON files)
- ✅ Version controlled and easy to review changes
- ✅ Supports pattern matching and complex logic
- ✅ Type hints and documentation
- ✅ Testable locally before committing

## Setup Requirements

### 1. GitLab Access Token
Create a project or personal access token with the following scopes:
- `api`
- `write_repository`

**Add to GitLab CI/CD Variables:**
- Key: `REVIEW_ASSISTANT_TOKEN`
- Value: (your token)
- Masked: ✓

### 2. Update Reviewer Mappings

Edit [scripts/reviewer_config.py](scripts/reviewer_config.py) to add or modify reviewer assignments:

```python
REVIEWER_MAPPINGS = {
    # Root level default
    "": ["yuvraj.chaudhari", "shantanu.joshi"],
    
    # Specific path mappings (longest match wins)
    "docs/Documentation/020_Operations/045_Upgrading an existing Deployment": ["upadhyay.saurabh"],
    "docs/CTCX-Intro": ["donny-thomas.daniel"],
    
    # Can use partial paths for entire sections
    "docs/Documentation/000_Cell-Setup": ["shantanu.joshi", "yuvraj.chaudhari"],
}
```

**Rules:**
- Uses **longest prefix matching** - more specific paths override general ones
- Path separators are normalized (`/` or `\` both work)
- Usernames are WITHOUT the `@` symbol (script adds it automatically)

### 3. Test Your Configuration Locally

Before committing changes, test the reviewer assignments:

```bash
# Test with sample files
py scripts/test_reviewer_config.py

# Test a specific file path
py scripts/test_reviewer_config.py "docs/Documentation/020_Operations/test.md"
```

### 4. CI/CD Pipeline

The `assign-reviewers` job in [.gitlab-ci.yml](.gitlab-ci.yml) runs automatically on merge requests:

```yaml
assign-reviewers:
  image: python:3.10
  stage: build
  before_script:
    - git fetch --all
    - pip install requests gitpython 
  script:
    - python scripts/reviewer_v2.py 
  rules:
    - if: $CI_MERGE_REQUEST_IID && $CI_MERGE_REQUEST_TITLE !~ /^(Draft:)/
      when: always
    - if: $CI_MERGE_REQUEST_IID && $CI_MERGE_REQUEST_TITLE =~ /^(Draft:)/
      when: manual
```

## Current Setup Status

✅ **Centralized configuration** in [reviewer_config.py](scripts/reviewer_config.py)  
✅ **CI pipeline** configured and ready  
✅ **Updated reviewer script** ([scripts/reviewer_v2.py](scripts/reviewer_v2.py))  
✅ **Test utility** included ([scripts/test_reviewer_config.py](scripts/test_reviewer_config.py))  
✅ **Legacy JSON files** still present (can be removed after validation)

## Usage Examples

### Adding a New Reviewer Mapping

Edit `scripts/reviewer_config.py`:

```python
REVIEWER_MAPPINGS = {
    # ... existing mappings ...
    
    # Add new section
    "docs/Documentation/NewSection": ["new.reviewer", "another.reviewer"],
}
```

### Testing Your Changes

```bash
# Test the specific path you added
py scripts/test_reviewer_config.py "docs/Documentation/NewSection/file.md"

# Run full test suite
py scripts/test_reviewer_config.py
```

### Understanding Reviewer Assignment

The system uses **longest prefix matching**:

```python
# Example configuration:
REVIEWER_MAPPINGS = {
    "docs/Documentation": ["reviewer1", "reviewer2"],           # General
    "docs/Documentation/020_Operations": ["reviewer3"],          # More specific
    "docs/Documentation/020_Operations/045_Upgrading": ["reviewer4"],  # Most specific
}

# File: docs/Documentation/020_Operations/045_Upgrading/upgrade.md
# Assigned to: reviewer4 (longest match wins)

# File: docs/Documentation/020_Operations/test.md
# Assigned to: reviewer3

# File: docs/Documentation/other/file.md
# Assigned to: reviewer1, reviewer2
```

## Migration from JSON Files

If you want to remove the old `.git-reviewers.json` files:

```powershell
# After validating the new system works, remove old JSON files
Get-ChildItem -Path . -Recurse -Filter ".git-reviewers.json" | Remove-Item

# Keep the old reviewer.py as backup
Rename-Item scripts/reviewer.py scripts/reviewer_legacy.py
```

## Maintenance

- **Update reviewers**: Edit `scripts/reviewer_config.py`
- **View current mappings**: Check [Section Reviewers Mapping.md](docs/Community/Section%20Reviewers%20Mapping.md)
- **Exclude patterns**: Update `EXCLUDE_PATTERNS` in `reviewer_config.py`
- **Test changes**: Run `py scripts/test_reviewer_config.py` before committing

## Troubleshooting

### Reviewers aren't being tagged

1. **Check token**: Verify `REVIEW_ASSISTANT_TOKEN` is set in CI/CD variables
2. **Check usernames**: Ensure usernames in `reviewer_config.py` match GitLab usernames (without `@`)
3. **Check logs**: Review the CI job logs for the `assign-reviewers` stage
4. **Test locally**: Run `py scripts/test_reviewer_config.py <filepath>` to verify mappings

### No reviewers assigned for a file

1. **Check path**: Verify the file path matches patterns in `REVIEWER_MAPPINGS`
2. **Check exclusions**: Make sure the file isn't in `EXCLUDE_PATTERNS`
3. **Add mapping**: If no match exists, add a new entry to `REVIEWER_MAPPINGS`

### Wrong reviewers assigned

1. **Check precedence**: More specific paths override general ones (longest match wins)
2. **Test the path**: Run `py scripts/test_reviewer_config.py <filepath>` to see which pattern matches
3. **Adjust mappings**: Update the path patterns in `reviewer_config.py`

## Advanced Configuration

### Adding Custom Logic

You can extend `reviewer_config.py` with custom logic:

```python
def get_reviewers_for_file(file_path: str) -> set:
    """Custom logic example."""
    reviewers = set()
    
    # Example: Different reviewers for different file types
    if file_path.endswith('.py'):
        reviewers.add('python.expert')
    elif file_path.endswith('.md'):
        reviewers.add('doc.writer')
    
    # Still use pattern matching as fallback
    pattern_reviewers = _get_reviewers_from_patterns(file_path)
    reviewers.update(pattern_reviewers)
    
    return reviewers
```

### Environment-Specific Configuration

Use environment variables for different environments:

```python
import os

ENV = os.getenv('ENVIRONMENT', 'production')

if ENV == 'development':
    REVIEWER_MAPPINGS = {...}  # Dev reviewers
else:
    REVIEWER_MAPPINGS = {...}  # Production reviewers
```
