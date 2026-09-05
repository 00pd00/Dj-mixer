
This section shows the steps required to be performed to restore a containerized TcX environment to an older recovery point.

**WARNING:** Restoration of resources is a critical operation and it is recommended to ensure you have appropriate backups in place before proceeding with these steps. It is also recommended to take a fresh backup before restoring the environment.

## Get Backup Set Id for Restoration

1. Login to Ansible Tower
Open a web browser and navigate to the Ansible Tower URL.
Log in with your Ansible Tower credentials.
2. Access the Job Template
For Operation TcX Fetch backup sets Template link please refer [Ansible Templates Table](../../../Documentation/010_Tenant%20Onboarding/020_Basic%20Flow/020_Ansible%20Templates%20Table.md) 
3. Launch the Job Template
Click the Launch button.
4. Fill the inputs

- ​**​customer_id:** `< Customer Id>`  (Note: If the customer ID is numeric only, enclose it in single quotes, e.g., `'12345'`).

- **environment_type:** Enter the environment type as prd, uat, etc. (Note: If the environment_type includes a postfix, such as prd012, treat '012' as the environment_id and provide it in the environment_id field below.) 

- **environment_id:** Enter the environment id (keep it '' if environment_id is not present)


- **stream_id:** Enter the stream ID as dev/customer/dryrun/internal
Click Next to proceed.

Enter the **GitLab Personal access token** (For prod tower enter **VAULT TOKEN** as well) and click on Next.

6. Confirm and Launch
Review the summary page to ensure all settings and survey responses are correct.
Click Launch to start the job template.
7. Get Backup Set Id
After ansible job is successful you will get a list of backup sets and their decsription in the output
Copy the appropriate BackupSetId that you want to restore from.
![Image](./image_377.png)


​​
## Backed up Items that will be restored

AWS Resources :
* License/DC Server EC2 instance
* Dispatcher Server EC2 instance (only for environments with Dispatcher)
* EFS non-IP DATA file system
* EFS IP DATA file system
* RDS DB cluster

Azure Resources :
* DC Server VM
* Dispatcher Server VM (applicable for environments with Dispatcher)
* Azure file share for non-IP DATA file system
* Azure file share for IP DATA file system
* Azure blob storage for tenant storage account
* SQL MI databases


Tenant Git Repository: Latest Commit Id of Tenant Repo

![Image](./image_378.png)


Tenant Secrets in Vault
![Image](./image_379.png)


​​
​​
​​
## Restore AWS & Azure resources using Ansible Trigger

Keep the Backup Set Id handy which you have got from step:   

[Get Backup Set Id for Restoration](../../../Documentation/Operations/Automated%20Backup%20and%20Restore%20of%20TcX%20environment/Restore%20TcX%20environment#get-backup-set-id-for-restoration)

Modify below input parameters 
```yaml
CustomerID: <Your Customer Id> (If the customer ID is numeric only, enclose it in single quotes, e.g., '12345')
Description: Ctcx Restoration 
CellId: <Customer Cell Id> 
StreamId: <Stream Id> 
Environment: < Customer Environment Type> 
PipelineStage: operations 
PipelineVariableVersion: <pipeline_variable_version> 
PipelineCloud: <Customer Cloud Account Id> 
PipelineVersion: <pipeline_version> 
OperationsAction: restore 
BackupSetId: <Your Backup Set Id> 
TcXVersion: <tcx_version> 
TcxCliRequirement: teamcenterx==<tcx-cli version>
```
Azure Sample Inputs:
```yaml
CustomerID: aztest01 
Description: Ctcx Restoration 
CellId: azm-eaus-tcx-preprod47-dev-006
StreamId: dev 
Environment: prd
PipelineStage: operations 
PipelineVariableVersion: main
PipelineCloud: '0ef62f60' 
PipelineVersion: main
OperationsAction: restore 
BackupSetId: prd_aztest01_27052025_073522
TcXVersion: br.2506.0000
TcxCliRequirement: teamcenterx==<tcx-cli version>
```
AWS Sample Inputs:
```yaml
CustomerID: awtest01 
Description: Ctcx Restoration 
CellId: infinity-preprod32-us-east-1
StreamId: dev 
Environment: prd
PipelineStage: operations 
PipelineVariableVersion: main
PipelineCloud: '102655104297'
PipelineVersion: main
OperationsAction: restore 
BackupSetId: prd_awtest01_27052025_073522
TcXVersion: br.2506.0000
TcxCliRequirement: teamcenterx==<tcx-cli version>
```
Navigate to Operation TcX restore Template link which can be found in - [Ansible Templates Table](../../010_Tenant%20Onboarding/020_Basic%20Flow/020_Ansible%20Templates%20Table.md) 
Click the Launch button.
A survey window will appear. Fill in the survey with appropriate values:
CUSTOMER INPUT JSON: Add the above input parameters with the modified values in point 2.
GITLAB PAT: Personal access Token of GitLab.
Click on Next to proceed.
Review the summary page to ensure all settings and survey responses are correct.
Click Launch to start the job template.

### TcX environment Shutdown

To shutdown an existing containerized TcX environment,
Login to Ansible Tower.
For Shutdown and Restart Template link please refer [Ansible Templates Table](../../Tenant%20Onboarding/Basic%20Flow/Ansible%20Templates%20Table)  
Launch the template by specifying the values as described in the [Initiate the workflow](../Day%20N%20Operations/Shutdown%20and%20restart%20workloads#initiate-the-workflow). This will shutdown the required workloads.
Refer - [Shutdown and restart workloads](../030_Day%20N%20Operations/030_Shutdown%20and%20restart%20workloads.md)

**Workload:** Complete Teamcenter deployment

**Action:** Shutdown

### TcX environment Restart

To restart an existing containerized TcX environment,
Login to Ansible Tower.
Launch the template by specifying the values as described in the [Initiate the workflow](../Day%20N%20Operations/Shutdown%20and%20restart%20workloads#initiate-the-workflow).This time chose Action as 'Restart' to start workloads.
Refer - [Shutdown and restart workloads](../030_Day%20N%20Operations/030_Shutdown%20and%20restart%20workloads.md)

**Workload:** Complete Teamcenter deployment

**Action:** Restart

### Restart License Server

After a successful restore operation, the license server must be restarted to ensure proper functionality.

1. **Access the License Server**
   - Log in to the DC server or Linux EC2 instance that hosts the license server
   
2. **Restart the License Service**
   - Execute the following commands to restart the `saltd` service:
   ```bash
   sudo su
   systemctl restart saltd
   ```
   
3. **Verify Service Status** (Optional)
   - To confirm the service has restarted successfully, run:
   ```bash
   systemctl status saltd
   ```

**Note:** Ensure that all dependent steps are properly configured before restarting the license server to avoid any issues.
