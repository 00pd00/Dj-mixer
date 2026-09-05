### Description
This operation automates the rotation of SAM2.0 credentials which has default expiry of 1 year and securely stores them in the tenant's vault. The operation is designed to enhance security by regularly updating credentials.
This operation will take around 15-20 mins to complete the credentials rotation.


#### Initiate the workflow

1. Use RunCommands Template to perform operation. Please refer [Ansible Templates Table](../../../010_Tenant%20Onboarding/020_Basic%20Flow/020_Ansible%20Templates%20Table.md)
​​
2. In Survey Provide the Customer Input (see below), GITLAB PAT token and Vault Token 
 
![Image](./image_505.png)

​​
3. Click on 'Launch' to initiate the workflow.


​​
#### Customer Inputs
​​
   | Parameter | Value | Sample |
|-----------------|-------|------------|
| CustomerID | CustomerID | put0001 |
| Description | Description for information | Rotating sam2.0 creds using operation | 
| CellId | Mention cell ID which used for deployment | depops-preprod05-us-east-1 |
| PipelineCloud | The account where the target environment will be deployed  | 906956190433 |
| Environment | The type of environment deployed. | prd |
| TcXVersion | The version of TcX that will be deployed. This value refers to the tag of the tc-version-manifests project in gitlab. | br.2506.0000 |
| OperationsAction | Action to perform : rotate_sam2.0_secrets | rotate_sam2.0_secrets |
| TcxCliRequirement | Required verion of tcx-cli repo. | teamcenterx==4.0.17.rc3 | 
| PipelineVersion | The branch name from the tcx-pipeline-tenant repo  | main | 
| PipelineStage | The stage of the pipeline to run: operations | operation | 

