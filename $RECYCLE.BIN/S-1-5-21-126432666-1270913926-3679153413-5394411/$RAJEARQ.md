# On-demand backup

## Prerequisites

1. Ensure the environment is healthy(AWS resources[especially RDS], Pods).

## Ansible template

Use the same template referenced in [Overview](./010_Overview.md#ansible-template).

## Survey fields

Fields marked with `*` are mandatory.

| # | Field name | Description | Example |
| ---: | --- | --- | --- |
| 1 | Change Reason / Comment | Reason for change | Running backup operation (on-demand) |
| 2 | CustomerID* | Tenant ID of environment | soo118b |
| 3 | Environment* | Environment type ID of the environment | prd33 |
| 4 | Operation* | Operation type to run | On-demand Backup |
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

- **Success**: Snapshots are created in the customer backup vault and the backupset is stored in BackupSets. You can fetch it using the **Fetch backupsets** operation.
- **Failure**: Review the Ansible job output/logs to identify the cause.

---

## Troubleshooting

If the backup operation fails with a **timeout error** after ~5 hours of execution, refer to the [Backup Operation Failed with Timeout Error](../../080_Troubleshooting/320_Backup%20Operation%20Failed%20with%20Timeout%20Error.md) troubleshooting guide for resolution steps.
