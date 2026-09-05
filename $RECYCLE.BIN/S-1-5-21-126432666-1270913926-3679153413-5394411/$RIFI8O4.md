# Create Scheduler to renew certificate using Ansible Tower

Below are the steps to create Scheduler -

1. Use the Operation TcX Restore Template from list of [Ansible Templates Table](../../020_Basic%20Flow/020_Ansible%20Templates%20Table.md)
2. Click on Schedules-> Add
3. Give Following details for Scheduler
    -	Name
    -	Description
    -	Start date and Time
    -	Local time zone
    -	Repeat Frequency
4. Click on Prompt
5. Give Customer Input Json:

Modify below input parameters:
```yaml
CellId: <cell-id>
CustomerID: <tenant-id>
Description: <description>
Environment: <environment>
OperationsAction: renew_ssl_cert
PipelineCloud: <customer_cloud_account_id>
PipelineStage: operations
PipelineVariableVersion: <pipeline_variable_version>
PipelineVersion: <pipeline_version>
StreamId: <stream-id>
TcXVersion: <tcx_version>
TcxCliRequirement: <tcx_cli_requirement>
```

Azure Sample Inputs:
```yaml
CellId: azm-eaus-tcx-preprod47-dev-005
CustomerID: azsh044
Description: renew ssl cert
Environment: prd
OperationsAction: renew_ssl_cert
PipelineCloud: '109407706'
PipelineStage: operations
PipelineVariableVersion: main
PipelineVersion: feature/azure-deployops/LCS-1218367-cron-job
StreamId: dev
TcXVersion: br.2506.0000
TcxCliRequirement: teamcenterx==3.0.3.9.rc1
```

6. Add Gitlab PAT
7. Click on Next
8. Click on Save

This operation will take approx 40-45 min to complete.

**Note:** Azure Application Gateway automatically updates certificates stored in Azure Key Vault. Gateway instances poll the Key Vault every 4 hours for a new certificate version.