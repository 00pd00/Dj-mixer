# Overview

Automated backup takes backups of resources like RDS, EFS, EBS, FSx, Hashicorp Vault secrets (auth methods, policies) of the corresponding tenant environment namespace and tenant-repo in Git.

## Ansible template

Use this Ansible template for all backup operations:

[Dev.TcX.Operations.CentralizedBackup-5.0.0](https://ansible-dev.cloud.teamcenter.com/#/templates/job_template/6711/details)

## Tier information

| Support measure | Standard | Silver | Gold |
| --- | --- | --- | --- |
| Business Continuity Window (RTO) | < 24 hours | < 24 hours | < 2 hours |
| Data Backup (RPO) | < 24 hours | < 12 hours | < 2 hours |
| Data retention | Daily for 2 weeks<br/>Monthly for 3 months | Daily for 30 days<br/>Monthly for 6 months | Daily for 30 days<br/>Monthly for 1 year |

**RTO (Recovery Time Objective)**: Disaster impacting a single availability zone allowing Cloud Services to be stood up or switched to a secondary availability zone.

**RPO (Recovery Point Objective)**: Frequency of data backup. Where applicable, backups are performed across multiple availability zones in a single region.
