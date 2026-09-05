# Operation

## Prepare Input

### Input Parameters

Prepare Input needed to run automation.

CustomerID, CellId, Environment and PipelineCloud can be taken from tenant.yml file from tenant repo. Open tenant repo in gitlab. Navigate to `customer-information/tenant.yml`

| Key | Description |
|---|---|
| `CustomerID` | In tenant.yml, search `TENANT_ID` |
| `Environment` | In tenant.yml, search `GLBL_TENANT_ENV` |
| `Description` | Description of the job, example: triad setup  |
| `CellId` | In tenant.yml, search `CELL_ID` |
| `PipelineCloud` | In tenant.yml, search `CLOUD_ID` |
| `StreamId` | Configuration file for loading parameters. Supported values: [dev, dryrun, internal, customer]. |
| `PipelineVariableVersion` | This is provided during handoff |
| `PipelineVersion` | This is provided during handoff |
| `TcXVersion` | This is provided during handoff |
| `TcxCliRequirement` | This is provided during handoff |
| `PipelineStage` | operations |
| `OperationsAction` | triad_license_setup |
| `OperationsPayload` |  It has two fields LicenseFilePath and ActionMode |
| `LicenseFilePath` | For AWS, S3 URI which you copied in Pre-requisites section |
| `ActionMode` | Give value "deploy" |


### Sample Input

```yaml
CustomerID: triad37
Environment: prd
Description: triad license setup automation
CellId: depops-preprod05-us-east-1
StreamId: dev
PipelineCloud: '906956190433'
PipelineVariableVersion: main
PipelineVersion: 'main'
TcXVersion: 'br.2606.0000'
TcxCliRequirement: teamcenterx==5.0.12
PipelineStage: operations
OperationsAction: triad_license_setup
OperationsPayload:
  LicenseFilePath: s3://tcx-us-east-1-prd-triad37/triad-license-file/triad_2606.txt
  ActionMode: deploy
```

## Trigger automation

Refer [Ansible Templates Table](../../../../../Documentation/Tenant%20Onboarding/Basic%20Flow/Ansible%20Templates%20Table)

Open template corresponding to "Operation Run Command" in ansible tower. 

Paste customer input and Gitlab PAT.

![alt text](image-8.png)


Then Launch the job
![alt text](image-7.png)


Operation Pipeline will be triggered. Once it's successful, your triad license setup is ready.

![triad-license-setup-pipeline](image-9.png)

You can verify the extra EC2 instances created by automation operation pipeline by logging in to AWS Management Console.

Example: ![triad-setup-EC2s](image-10.png)