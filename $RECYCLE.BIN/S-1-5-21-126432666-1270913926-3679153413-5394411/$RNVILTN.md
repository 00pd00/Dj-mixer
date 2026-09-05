# Fetch backupsets

## Note

This operation fetches existing backupsets for an environment.

## Ansible template

Use the same template referenced in [Overview](./010_Overview.md#ansible-template).

## Survey fields

Fields marked with `*` are mandatory.

| # | Field name | Description | Example |
| ---: | --- | --- | --- |
| 1 | Change Reason / Comment | Reason for change | Fetch backupsets |
| 2 | CustomerID* | Tenant ID of environment | soo118b |
| 3 | Environment* | Environment type ID of the environment | prd33 |
| 4 | Operation* | Operation type to run | Fetch Backup |
| 5 | PipelineVersion* | Pipeline version name | main |
| 6 | TcxCliRequirement | TcX CLI requirement | teamcenterx==6.0.0.rc55 |
| 7 | Stream ID* | Stream id to use | dev / dryrun / customer |
| 8 | Backup Tier* | Tier used for retention settings | std / silver / gold |
| 9 | Pause Until - Days | Not required | default |
| 10 | Pause Until - Hours | Not required | default |
| 11 | Enter Your GitLab PAT* | GitLab PAT token | PLxxxxx |

## Run

After filling the survey, launch the template.

## Outcome

- **Success**: Existing list of backupsets is returned in the job output.
- **Failure**: Review the Ansible job output/logs to identify the cause.
