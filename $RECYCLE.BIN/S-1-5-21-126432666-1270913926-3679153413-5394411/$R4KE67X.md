# Upload Latest DC Status

## 1. Description
This operation `upload_dc_status` uploads the generated quick_deploy.xml file with timestamp in the tenant repo each time on trigger. The quick_deploy.xml file holds the list of components which are installed by the DC server for the environment.

## 2. Pre Requisites
- Ansible Tower access 
    - **Dev Tower** — [Ansible Dev](http://ansible-dev.cloud.teamcenter.com/#/)
    - **Dryrun Tower** — [Ansible TCX Dryrun](https://capsautomationcontroller-test.plmcloudsolutions.com/)
    - **Prod Tower** — [Ansible TCX Prod](https://ansible-tcx-prod.plmcloudsolutions.com/#/)
- An already deployed cTcX envronment with dc linux ec2 in runnng state.

## 3. Operation Execution Details
#### 3.0.1. Prapare input for operations.
- The operation is executed using the RunCommands template in Ansible Tower. The following customer inputs are required to execute the workflow:

    | Parameter | Value | Example |
    |-----------------|-------|------------|
    | CustomerID | CustomerID | dispat01 |
    | Description | Description for information | Push dc status to tenant repo | 
    | Environment | The type of environment deployed. | prd |
    | PipelineVersion | The deployment pipeline version (from tcx-pipeline-tenant) | main |
    | PipelineVariableVersion| The pipeline variables version (from tcx-pipeline-variable) |main|
    | TcXVersion | The version of TcX to be used for operation.<br /> This value refers to the tag of the tc-version-manifests project in gitlab. | br.2606.0000 |
    | PipelineStage | The stage of the pipeline to run: operations | operations |
    | OperationsAction | Action to perform | upload_dc_status |

- For example, the customer input will look like:
    ```yaml
    Description: push dc status to tenant repo
    CustomerID: dispat01
    Environment: prd
    CellId: depops-preprod05-us-east-1
    TcXVersion: main
    PipelineVariableVersion: main
    PipelineVersion: main
    TcxCliRequirement: teamcenterx==4.0.25.rc07
    PipelineStage: operations
    OperationsAction: upload_dc_status
    ```
    
#### 3.0.2. Initiate the workflow
- Use RunCommands Template to perform operation. Please refer [Ansible Templates Table](../../Tenant%20Onboarding/Basic%20Flow/Ansible%20Templates%20Table)

- In Survey, provide the [Customer Input created in above step](#1-prepare-input-for-operations-pipeline), GITLAB PAT token, and Vault Token.

![Image](./image_358.png)

- Click on 'Next -> Launch' to initiate the upload_latest_dc_status operation.
- A new operation pipeline will be created in gitlab which will execute the upload_latest_dc_status operation.

<br/>

## 4. Verification of the Output
- Open [Gitlab](https://gitlab.industrysoftware.automation.siemens.com/) and search for your tenant reposiotry (`<CustomerID>-<Evironment>`)
- Browse to the loaction `deploy_script\dc_installation_status` and view the latest `quick_deploy_<timestamp>` file.
- The file would contain list on components and their deployment status, with masked passwords and secrets.

![Image](./dc_quick_deploy_status.png)









