### Description
This operation automates the rotation of GitLab Project access tokens and securely stores them in the tenant's vault. The operation is designed to enhance security by regularly updating access credentials.


#### Initiate the workflow

1. Use RunCommands Template to perform operation. Please refer [Ansible Templates Table](../../010_Tenant%20Onboarding/020_Basic%20Flow/020_Ansible%20Templates%20Table.md)
​​
2. In Survey Provide the [Customer Input](./190_GitOps%20File%20Agent%20Access%20Token%20Rotation.md#customer-inputs), GITLAB PAT token and Vault Token 
 
![Image](./image_358.png)

​​
3. Click on 'Launch' to initiate the workflow.


​​
#### Customer Inputs
​​
   | Parameter | Value | Sample |
|-----------------|-------|------------|
| CustomerID | CustomerID | put0001 |
| Description | Description for information | Rotating access token using operation | 
| CellId | Mention cell ID which used for deployment | depops-preprod05-us-east-1 |
| PipelineCloud | The account where the target environment will be deployed  | 906956190433 |
| Environment | The type of environment deployed. | prd |
| TcXVersion | The version of TcX that will be deployed. This value refers to the tag of the tc-version-manifests project in gitlab. | br.2506.0000 |
| OperationsAction | Action to perform : gitlab_token_rotate | gitlab_token_rotate |
| TcxCliRequirement | Required verion of tcx-cli repo. | teamcenterx==4.0.17.rc3 | 
| PipelineVersion | The branch name from the tcx-pipeline-tenant repo  | main | 
| PipelineStage | The stage of the pipeline to run: operations | operation | 
| StreamId | Configuration file for loading parameters. Supported values: [dev, dryrun, internal, customer] | customer | 
