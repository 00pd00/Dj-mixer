# Update backup plan tier

## Note

This operation updates the backup tier (for example, from `Standard` to `Gold`). Updating the tier changes snapshot frequency and retention. See [Overview](./010_Overview.md#tier-information) for the tier details.

## Ansible template

Use the same template referenced in [Overview](./010_Overview.md#ansible-template).

## Survey fields

Fields marked with `*` are mandatory.

| # | Field name | Description | Example |
| ---: | --- | --- | --- |
| 1 | Change Reason / Comment | Reason for change | Update backup tier |
| 2 | CustomerID* | Tenant ID of environment | soo118b |
| 3 | Environment* | Environment type ID of the environment | prd33 |
| 4 | Operation* | Operation type to run | Update Backup Tier |
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

- **Success**: The environment backup plan is updated to the requested tier.
- **Failure**: Review the Ansible job output/logs to identify the cause.
