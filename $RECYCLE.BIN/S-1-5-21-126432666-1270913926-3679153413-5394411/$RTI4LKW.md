# Code-Based vs JSON-Based Reviewer Configuration

## Comparison

| Aspect | JSON Files (`.git-reviewers.json`) | Python Code (`reviewer_config.py`) |
|--------|-----------------------------------|-----------------------------------|
| **Number of files** | 114+ scattered files | 1 centralized file |
| **Maintenance** | Edit multiple JSON files | Edit single Python file |
| **Version control** | Hard to track changes across files | Easy to see all changes in one diff |
| **Testing** | Need MR or CI to test | Can test locally instantly |
| **Pattern matching** | Directory-based only | Can add custom logic, regex, etc. |
| **Validation** | Manual | Python syntax checking + tests |
| **Documentation** | Comments in JSON | Docstrings, type hints, comments |
| **Complexity** | Simple path hierarchy | Can handle complex logic |
| **Migration** | Need to update 114 files | Update one mapping dict |

## Example Comparison

### JSON Approach (Old)

**File**: `docs/Documentation/020_Operations/.git-reviewers.json`
```json
{
  "reviewers": ["shantanu.joshi", "yuvraj.chaudhari"]
}
```

**File**: `docs/Documentation/020_Operations/045_Upgrading/.git-reviewers.json`
```json
{
  "reviewers": ["upadhyay.saurabh"]
}
```

**Issues:**
- Need to create/maintain multiple files
- Hard to see all reviewers at once
- No validation until CI runs
- Inheritance is implicit

### Python Approach (New)

**File**: `scripts/reviewer_config.py`
```python
REVIEWER_MAPPINGS = {
    "docs/Documentation/020_Operations": ["shantanu.joshi", "yuvraj.chaudhari"],
    "docs/Documentation/020_Operations/045_Upgrading": ["upadhyay.saurabh"],
}
```

**Benefits:**
- All mappings in one place
- Can see entire structure at once
- Validate with `py scripts/test_reviewer_config.py`
- Explicit longest-match logic
- Can add custom logic easily

## Migration Path

### Option 1: Gradual Migration
Keep both systems running, gradually move mappings to Python:
1. Both `reviewer.py` and `reviewer_v2.py` coexist
2. Test new Python config alongside JSON
3. Switch CI to use `reviewer_v2.py` when confident
4. Remove JSON files

### Option 2: Full Migration (Recommended)
Switch entirely to Python configuration:
1. ✅ Create `reviewer_config.py` with all mappings
2. ✅ Create `reviewer_v2.py` to use Python config
3. ✅ Update CI to use `reviewer_v2.py`
4. Test with a few MRs
5. Remove old `.git-reviewers.json` files
6. Archive `reviewer.py` as `reviewer_legacy.py`

## Testing Before Full Switch

```bash
# Test Python config matches current behavior
py scripts/test_reviewer_config.py

# Test specific file that changed
py scripts/test_reviewer_config.py "docs/Documentation/020_Operations/045_Upgrading/file.md"

# Create a test MR to verify CI integration
git checkout -b test/reviewer-config-validation
git commit --allow-empty -m "test: Validate new reviewer configuration"
git push origin test/reviewer-config-validation
# Create MR and check the comment
```

## Performance

Both approaches have similar performance:
- **JSON**: Read multiple small files from disk
- **Python**: Load one module with dict lookup

In practice, the Python approach is slightly faster because:
- No disk I/O during lookup
- Dictionary lookups are O(1)
- No JSON parsing overhead

## Future Enhancements

With Python configuration, you can easily add:

### 1. Pattern Matching
```python
import re

def get_reviewers_for_file(file_path: str) -> set:
    # Regex patterns
    if re.match(r'docs/.*\.py$', file_path):
        return {'python.expert'}
```

### 2. Team-Based Assignment
```python
TEAMS = {
    'operations': ['deepesh.jain', 'mridul.maheshwari'],
    'devops': ['sarang.deshpande'],
}

REVIEWER_MAPPINGS = {
    "docs/Documentation/020_Operations": TEAMS['operations'],
    "docs/Documentation/020_Operations/100_DevOps": TEAMS['devops'],
}
```

### 3. Round-Robin Assignment
```python
import datetime

ROTATION = {
    'week1': ['reviewer1', 'reviewer2'],
    'week2': ['reviewer3', 'reviewer4'],
}

def get_weekly_reviewers():
    week = datetime.datetime.now().isocalendar()[1] % 2
    return ROTATION[f'week{week+1}']
```

### 4. File Type Specific
```python
REVIEWER_BY_TYPE = {
    '.py': ['python.expert'],
    '.js': ['javascript.expert'],
    '.md': ['doc.writer'],
}
```

## Recommendation

**Switch to the Python-based configuration** because:
1. ✅ Easier to maintain (1 file vs 114)
2. ✅ Easier to review changes (one diff)
3. ✅ Can test locally before committing
4. ✅ More flexible for future enhancements
5. ✅ Better documentation with type hints
6. ✅ Version control friendly

The JSON approach works, but doesn't scale well as the project grows.
