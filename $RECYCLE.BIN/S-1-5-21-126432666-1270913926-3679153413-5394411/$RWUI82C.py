import unittest
from unittest.mock import patch, mock_open, MagicMock
import json
import os
import sys

# Add the script's directory to the Python path to allow importing reviewer
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

import reviewer

class TestReviewerScript(unittest.TestCase):

    def setUp(self):
        """Set up a mock configuration for all tests."""
        self.mock_config = {
            "groups": {
                "admins": {
                    "members": ["@admin1", "@admin2"],
                    "description": "Global admins"
                },
                "team-a": {
                    "members": ["@userA", "@userB"],
                    "description": "Team A"
                },
                "team-b": {
                    "members": ["@userC"],
                    "description": "Team B"
                },
                 "review-heads": {
                    "members": ["@head1"],
                    "description": "Review Heads"
                }
            },
            "fallback_reviewers": ["group:admins"],
            "global_reviewers": ["group:review-heads"],
            "path_rules": [
                {
                    "path": "docs/specific/feature/**",
                    "reviewers": ["@specific_owner", "group:team-a"],
                    "description": "Specific feature docs"
                },
                {
                    "path": "docs/general/**",
                    "reviewers": ["group:team-b"],
                    "description": "General docs"
                },
                {
                    "path": "src/code.py",
                    "reviewers": ["@coder1"],
                    "description": "Main source file"
                }
            ],
            "options": {
                "allow_local_overrides": True
            }
        }

    @patch('builtins.open', new_callable=mock_open, read_data=json.dumps({}))
    @patch('os.path.exists', return_value=True)
    def test_load_centralized_config_exists(self, mock_exists, mock_file):
        """Test loading an existing and valid config file."""
        with patch('json.load', return_value=self.mock_config) as mock_json_load:
            config = reviewer.load_centralized_config()
            self.assertIsNotNone(config)
            self.assertEqual(config, self.mock_config)
            mock_file.assert_called_with(unittest.mock.ANY, "r")

    @patch('os.path.exists', return_value=False)
    def test_load_centralized_config_not_exists(self, mock_exists):
        """Test loading when the config file does not exist."""
        config = reviewer.load_centralized_config()
        self.assertIsNone(config)

    @patch('builtins.open', new_callable=mock_open, read_data="invalid json")
    @patch('os.path.exists', return_value=True)
    def test_load_centralized_config_invalid_json(self, mock_exists, mock_file):
        """Test loading a config file with invalid JSON content."""
        config = reviewer.load_centralized_config()
        self.assertIsNone(config)

    def test_expand_groups(self):
        """Test the expansion of reviewer groups."""
        # Test expanding a single group
        reviewers = ["group:team-a"]
        expanded, groups_info = reviewer.expand_groups(self.mock_config, reviewers)
        self.assertEqual(expanded, {"@userA", "@userB"})
        self.assertIn("team-a", groups_info)

        # Test a mix of groups and individual users
        reviewers = ["@individual", "group:team-b"]
        expanded, _ = reviewer.expand_groups(self.mock_config, reviewers)
        self.assertEqual(expanded, {"@individual", "@userC"})

        # Test with a non-existent group
        reviewers = ["group:non-existent"]
        expanded, _ = reviewer.expand_groups(self.mock_config, reviewers)
        self.assertEqual(expanded, set())

        # Test with no reviewers
        expanded, _ = reviewer.expand_groups(self.mock_config, [])
        self.assertEqual(expanded, set())

    def test_match_path_rules(self):
        """Test matching file paths against the defined rules."""
        # Test a specific match
        rule = reviewer.match_path_rules("docs/specific/feature/file.md", self.mock_config)
        self.assertIsNotNone(rule)
        self.assertEqual(rule['description'], "Specific feature docs")

        # Test a more general match
        rule = reviewer.match_path_rules("docs/general/another.md", self.mock_config)
        self.assertIsNotNone(rule)
        self.assertEqual(rule['description'], "General docs")

        # Test no match
        rule = reviewer.match_path_rules("other/folder/file.txt", self.mock_config)
        self.assertIsNone(rule)

        # Test most specific rule is chosen
        self.mock_config['path_rules'].append({
            "path": "docs/specific/**",
            "reviewers": ["group:admins"],
            "description": "Less specific"
        })
        rule = reviewer.match_path_rules("docs/specific/feature/file.md", self.mock_config)
        self.assertEqual(rule['description'], "Specific feature docs")

    def test_get_reviewers_from_centralized_config(self):
        """Test getting reviewers based on file paths from the config."""
        # Test a path that matches a rule
        reviewers, desc, _ = reviewer.get_reviewers_from_centralized_config("docs/specific/feature/file.md", self.mock_config)
        self.assertEqual(reviewers, {"@specific_owner", "@userA", "@userB"})
        self.assertEqual(desc, "Specific feature docs")

        # Test a path that falls back to default reviewers
        reviewers, desc, _ = reviewer.get_reviewers_from_centralized_config("unmatched/file.txt", self.mock_config)
        self.assertEqual(reviewers, {"@admin1", "@admin2"})
        self.assertEqual(desc, "Fallback reviewers")

        # Test with no matching rule and no fallback
        config_no_fallback = self.mock_config.copy()
        del config_no_fallback["fallback_reviewers"]
        reviewers, _, _ = reviewer.get_reviewers_from_centralized_config("unmatched/file.txt", config_no_fallback)
        self.assertEqual(reviewers, set())

    @patch('reviewer.load_centralized_config')
    @patch('reviewer.find_reviewers_recursively', return_value=(set(), None))
    def test_collect_reviewers_by_path_first_notification(self, mock_find_recursively, mock_load_config):
        """Test collecting reviewers for the first MR notification."""
        mock_load_config.return_value = self.mock_config
        changed_files = ["docs/general/file1.md", "src/code.py", "unmatched/file.txt"]
        
        path_reviewers = reviewer.collect_reviewers_by_path(changed_files, is_first_notification=True)

        # 3 paths should be found: general docs, source file, and fallback
        self.assertEqual(len(path_reviewers), 3)
        
        # Check reviewers for 'General docs'
        general_docs_info = path_reviewers["centralized:General docs"]
        self.assertEqual(general_docs_info["reviewers"], {"@userC", "@head1"}) # team-b + global
        self.assertIn("docs/general/file1.md", general_docs_info["files"])

        # Check reviewers for 'Main source file'
        source_file_info = path_reviewers["centralized:Main source file"]
        self.assertEqual(source_file_info["reviewers"], {"@coder1", "@head1"}) # coder1 + global
        self.assertIn("src/code.py", source_file_info["files"])

        # Check reviewers for fallback
        fallback_info = path_reviewers["centralized:Fallback reviewers"]
        self.assertEqual(fallback_info["reviewers"], {"@admin1", "@admin2", "@head1"}) # admins + global
        self.assertIn("unmatched/file.txt", fallback_info["files"])

    @patch('reviewer.load_centralized_config')
    @patch('reviewer.find_reviewers_recursively', return_value=(set(), None))
    def test_collect_reviewers_by_path_subsequent_notification(self, mock_find_recursively, mock_load_config):
        """Test that subsequent notifications only include global reviewers."""
        mock_load_config.return_value = self.mock_config
        changed_files = ["docs/general/file1.md", "src/code.py"]
        
        path_reviewers = reviewer.collect_reviewers_by_path(changed_files, is_first_notification=False)

        # Only global reviewers should be notified
        general_docs_info = path_reviewers["centralized:General docs"]
        self.assertEqual(general_docs_info["reviewers"], {"@head1"}) # Only global

        source_file_info = path_reviewers["centralized:Main source file"]
        self.assertEqual(source_file_info["reviewers"], {"@head1"}) # Only global

    def test_format_mr_comment(self):
        """Test the formatting of the final MR comment."""
        path_reviewers = {
            "centralized:Component A": {
                "files": ["file1.md", "file2.md"],
                "reviewers": {"@userA", "@userB"},
                "groups": {"team-a": {"description": "Team A"}}
            },
            "centralized:Component B": {
                "files": ["file3.py"],
                "reviewers": {"@userA", "@userC"},
                "groups": {"team-b": {"description": "Team B"}}
            }
        }
        changed_files = ["file1.md", "file2.md", "file3.py", "unassigned.txt"]
        
        comment = reviewer.format_mr_comment(path_reviewers, changed_files)

        # Check for key sections and reviewers
        self.assertIn("# 📋 Review Request", comment)
        self.assertIn("### 🔍 **@userA**", comment)
        self.assertIn("### 🔍 **@userB**", comment)
        self.assertIn("### 🔍 **@userC**", comment)
        
        # Check that components are listed under the correct reviewer
        self.assertTrue(comment.find("`Component A`") < comment.find("### 🔍 **@userC**"))
        
        # Check for unassigned files section
        self.assertIn("## ⚠️ Files Without Assigned Reviewers", comment)
        self.assertIn("- ❗ `unassigned.txt`", comment)

    def test_format_mr_comment_no_reviewers(self):
        """Test comment formatting when no reviewers are found."""
        comment = reviewer.format_mr_comment({}, [])
        self.assertEqual(comment, "**Notice:** *No reviewers found for the changed files.*")

if __name__ == '__main__':
    unittest.main(argv=['first-arg-is-ignored'], exit=False)
