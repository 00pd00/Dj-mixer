# Ansible Templates Table

Access the appropriate Ansible Tower using the links below:

- **Dev Tower** — [Ansible Dev](http://ansible-dev.cloud.teamcenter.com/#/)
- **Dryrun Tower** — [Ansible TCX Dryrun](https://capsautomationcontroller-test.plmcloudsolutions.com/)
- **Prod Tower** — [Ansible TCX Prod](https://ansible-tcx-prod.plmcloudsolutions.com/#/)

## Running Templates

1. Go to the tower URL for your environment.
2. Navigate to **Templates**.
3. Search for the template name as listed in the table below.

> **Note:** The `<latest release tag>` is provided by the DeployOps team during handoff. The current tag is `4.0.0`.

| Use Case                                   | Dev Tower: Template Name (with Link) | Dryrun Tower: Template Name                 | Prod/UAT Tower: Template Name                 |
|---------------------------------------------|---------------------------------------|---------------------------------------------|------------------------------------------------|
| TcX Deployment Template                     | [Dev.TcX.Deployment-5.0.0](https://ansible-dev.cloud.teamcenter.com/#/templates/job_template/6246/details) | TcX.Deployment-5.0.0                | TcX.Deployment-4.0.0                      |
| TcX Replica Environment Template            | [Dev.TcX.ReplicaEnv.CreateReplicaEnvironment-5.0.0](https://ansible-dev.cloud.teamcenter.com/#/templates/workflow_job_template/6265/details) | TcX.ReplicaEnv.CreateReplicaEnvironment-5.0.0 | TcX.ReplicaEnv.CreateReplicaEnvironment-4.0.0 |
| TcX Full Clone Replica Template             | [Dev.TcX.ReplicaFullClone.CreateReplicaEnvironment-5.0.0](https://ansible-dev.cloud.teamcenter.com/#/templates/workflow_job_template/6267/details) | TcX.ReplicaFullClone.CreateReplicaEnvironment-5.0.0 | TcX.ReplicaFullClone.CreateReplicaEnvironment-4.0.0 |
| Shutdown and Restart Template               | [Dev.TcX.Operations.ShutdownRestart.Workflow-5.0.0](https://ansible-dev.cloud.teamcenter.com/#/templates/workflow_job_template/6263/details) | TcX.Operations.ShutdownRestart.Workflow-5.0.0 | TcX.Operations.ShutdownRestart.Workflow-4.0.0    |
| Operation Run Command (Password Maintenance) Template | [Dev.TcX.Operations.RunCommands-5.0.0](https://ansible-dev.cloud.teamcenter.com/#/templates/job_template/6254/details) | TcX.Operations.RunCommands-5.0.0     | TcX.Operations.RunCommands-4.0.0              |
| Operation TcX Backup/Retention Template     | [Dev.TcX.Operations.Backup-5.0.0](https://ansible-dev.cloud.teamcenter.com/#/templates/job_template/6249/details) | TcX.Operations.Backup-5.0.0          | TcX.Operations.Backup-4.0.0                   |
| Operation TcX Fetch Backup Sets Template    | [Dev.TcX.Operations.FetchBackupSets-5.0.0](https://ansible-dev.cloud.teamcenter.com/#/templates/job_template/6251/details) | TcX.Operations.FetchBackupSets-5.0.0 | TcX.Operations.FetchBackupSets-4.0.0           |
| Operation TcX Restore Template              | [Dev.TcX.Operations.Restore-5.0.0](https://ansible-dev.cloud.teamcenter.com/#/templates/job_template/6242/details) | TcX.Operations.Restore-5.0.0         | TcX.Operations.Restore-4.0.0                   |
| Operation TcX Pre-Destroy Template          | [Dev.TcX.Operations.RunCommands-5.0.0](https://ansible-dev.cloud.teamcenter.com/#/templates/job_template/6254/details) |  TcX.Operations.RunCommands-5.0.0    | TcX.Operations.RunCommands-4.0.0   |
| Operation TcX Azure Backup Template         | [TcX.Dev.Operations.Backup-3.0.0 Azure](https://ansible-dev.cloud.teamcenter.com/#/templates/job_template/5419/details) |                                             |                                                    |
| CTCx Blue-Green Upgrade Template            | [Dev.TcX.blueGreen.CTCX.Upgrade.WT](https://ansible-dev.cloud.teamcenter.com/#/templates/workflow_job_template/5870/details) |    Dev.TcX.blueGreen.CTCX.Upgrade.WT   |    Dev.TcX.blueGreen.CTCX.Upgrade.WT    |
