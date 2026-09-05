## Workflow: Create Full Clone Replica Environment
## 1. Overview

This document details how to create a full clone replica environment using four jobs: **CreateBackup**, **CreateCrossAccountRole**, **CreateEnv** and **DeleteCrossAccountRole**.

- **CreateBackup** – Captures the state of the environment you wish to replicate.
- **CreateCrossAccountRole** - Creates a role in the source account to share backups to target account.
- **CreateEnv** – Uses the backup from the previous job to set up a new replica environment.
- **DeleteCrossAccountRole** - Deletes the role created in the source environment once replica creation is successful.

This workflow supports both dry-run and production deployments designed for both end users and technical operators.

---

## 2. Pre-requisites

Before starting, ensure that:
- The source environment is active.
- Deployment Center (DC) services are running.  
  For guidance on starting DC services, see: [Commands to Start and Stop DC Services on Linux](../030_Day%20N%20Operations/110_Stop%20DC%20Services.md#commands-to-start-and-stop-dc-services-on-linux).
- The necessary workflow and job templates are set up in Ansible Tower as described in [Pre-Requisites and Assumptions](../../000_Cell-Setup/000_Automation%20Prerequisites/070_Tools%20Setup/030_Ansible%20Tower.md#pre-requisites-and-assumptions).

**Critical:**  
Before triggering the replica workflow, confirm the SAM account used for DSS has the `DSS_APIs_For_CloneVault` policy attached. This account-level policy cannot be validated through the SAM console. Contact the FDS team to verify its activation.

**For SAM 1.0:**

- Ensure the Customer SAM account has `DSS_APIs_For_CloneVault` attached before initiating the workflow.
- For more details, refer to: [Enable ActAsRole for Teamcenter X Customer SAM Account to generate SAMAuth and DSS credentials](../../010_Tenant%20Onboarding/010_Pre-Reqs/010_Configure%20Customer%20SAM%20Account.md)

**For SAM 2.0:**

:::note
This step does not apply to preprod. For preprod, the policy is attached automatically through the deployment pipeline.
:::

Create the ticket on [FDS One help center](https://fdsone.atlassian.net/servicedesk/customer/portal/28/group/36/create/112) and fill the form with below details:

**Summary:** "Attach DSS_APIs_For_CloneVault policy to the Customer ECA/SAM account ( `<Customer ECA Id>` )"

**Description:**

```text
Please attach DSS_APIs_For_CloneVault policy to the Customer ECA/SAM account

Customer ECA ID: [Tenant-ECA-ID]
Customer SAM account ID: [Tenant-SAM-account-ID]
DSS endpoint Region: (region in which the TcX Deployment is being done)
```

---

## 3. Launching the Workflow

### 3.1 Selecting the Template

1. Navigate to the **Full Clone Replica** template using the [Ansible Templates Table](../../010_Tenant%20Onboarding/020_Basic%20Flow/020_Ansible%20Templates%20Table.md).
2. Choose the appropriate version:
   - **Dry-run:** For testing purposes.
   - **Production:** For live deployments.

   *Note:* Fields such as `PipelineVersion`, `TcXVersion`, `cli`, and `Pipeline Variables Version` are prepopulated. They correspond to the values in the `<prefix> TcX Container Deploy - Development - <suffix>` job template, where:
   - `<prefix>` is either **Dryrun** or **Prod**.
   - `<suffix>` is a number related to the current CTCX release.

![Image](./image_330.png)

### 3.2 Running the Workflow

1. Provide all required input parameter values as prompted.
2. Once verified, click **Launch** to start the workflow.

---

## 4. Input Parameters for Replica Full Clone Environment

When entering inputs:
- Replica Full Clone is supported only within the same SAM version—i.e., from SAM 1.0 to SAM 1.0 and from SAM 2.0 to SAM 2.0. Cross-version replication (SAM 1.0 to SAM 2.0 or SAM 2.0 to SAM 1.0) is not supported.
- **Do not** include values for `PipelineStage`, `TeamcenterProductIDList`, `AdditionalSoftware` and `TeamcenterPackageIDList` or `QDFileName`.
- If the replica is of SAM 2.0 then **do not** include values for `DSSAccountID` , `DSSUserAccessKey`, `DSSUserSecretAccessKey`, `DSSUserID`, `SamAuthAccountID`, `SamAuthUserAccessKey`, `SamAuthUserSecretAccessKey`.
- Use the same inputs as the source environment, with additional parameters specified below.

### 4.1 Environment-Specific Parameters

| **Key**               | **Description**                                                                                                                                                           | **Remarks**                                                                                                                |
|-----------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------|
| SourceEnvironmentType | The type of your source environment (e.g., PRD, UAT). This value, combined with the customer ID, uniquely identifies a deployment (formatted as `[customerid-environmenttype]`). | Valid values: `prd` for production or `uat` for user acceptance testing.                                                   |
| SourceEnvironmentID   | (Optional) A unique identifier used during the provisioning of the source deployment.                                                                                   | Skip if no Environment ID exists. For example, if the source was provisioned with ID `01`, enter `01`.                     |
| Environment           | The target environment type (e.g., DEV).                                                                                                                                | Use valid values like `dev` followed by two digits (e.g., `dev1`, `dev2`, `dev11`).                                        |
| PipelineCloud | AWS account ID/Azure subscription ID where replica would be created. | For AWS, this can be the same or a different account ID than the source. <!-- For Azure, it must be the same subscription ID as the source. --> |
| CellId | Cell where replica would be created. | For AWS, this can be the same or a different cell ID than the source. <!-- For Azure, it must be the same cell ID as the source. --> **Note**: When providing a different Cell ID, make sure it is associated with same region as source environment. For example, if source environment is in the region 'us-east-1', then replica should also be created in 'us-east-1' |
| dnsSubdomainName | DNS Subdomain name for the target environment |  |

**In case of replica for sam 2.0 source environment provide below extra parameters**
| **Key** | **Description** | **Remarks** |
| ------ | ------ |------- |
|    SamVersion  | Sam version to use    |    Valid values are '1.0' or '2.0' if the replica is created from '2.0' environment, then value should be '2.0'    |
|    Sam2Input    |    Additional payload to include sam2 specific properties.<br />This is a YAML formatted string.<br /> Sam2Input:<br  />&nbsp;&nbsp;&nbsp;TcxDeploymentTctuClientId: tcxdeploy techuser client id <br />&nbsp;&nbsp;&nbsp;TcxDeploymentTctuClientSecret:&nbsp;tcxdeploy techuser client secret   |     Sam2Input:<br  />&nbsp;&nbsp;&nbsp;TcxDeploymentTctuClientId: '500xxx3-tcxprxxx-admintechuser-20260xxx' <br /> &nbsp;&nbsp;&nbsp;TcxDeploymentTctuClientSecret: 8KwVyyyVnmCxxxFVb   | 

### 4.2 Additional Inputs

| Input | Description | AWS | <!-- Azure --> |
|-------|-------------|-----|--------------|
| AWS_ACCESS_KEY_ID | AWS access key of the account where source ENV is present | **Mandatory** | <!-- **Leave empty** --> |
| AWS_SECRET_ACCESS_KEY | AWS secret access key of the account where source ENV is present | **Mandatory** | <!-- **Leave empty** --> |
| AWS_SESSION_TOKEN | AWS session token of the account where source ENV is present | **Mandatory** | <!-- **Leave empty** --> |
| GITLAB_PAT | Personal Access Token of GitLab | **Mandatory** | <!-- **Mandatory** --> |
| VAULT_TOKEN | Token of Hashicorp Vault. For backup, the ROOT TOKEN is required. The pipeline token (customer_inputs) will not work for this case. See Root Token in [Tools Setup](../../000_Cell-Setup/000_Automation%20Prerequisites/070_Tools%20Setup/000_Vault%20Setup.md) | **Mandatory** | <!-- **Mandatory** --> |

For further input details, refer to [Ansible Template Input](../../010_Tenant%20Onboarding/010_Pre-Reqs/020_Ansible%20Template%20Input/000_Ansible%20Template%20Input.md).

---

## 5. Troubleshooting

For any pipeline failures, refer to the [Troubleshooting](../080_Troubleshooting/010_Enable%20Diagnostic%20logs%20for%20tcservers.md) section. 

- **Backup or Environment Setup Failures:**  
  - Confirm the source environment is accessible.
  - Ensure DC services are operational in the source environment.
  - Validate that the SAM account policy `DSS_APIs_For_CloneVault` is active. *(SAM 1.0 only)*

Once the pipeline is successful after following troubleshooting steps, the IAM role created in the account for accessing source deployment resources must be cleaned up, follow below steps to clean up the IAM role. These steps should be followed in case the replica full clone workflow fails in the pipeline execution stage.

**Note:** Below section to delete the IAM role is only applicable for AWS deployments.

#### 5.0.1. Prepare input for Operations Pipeline
- The operation is executed using the RunCommands template in Ansible Tower. The following customer inputs are required to execute the workflow:

    | Parameter | Value | Example |
    |-----------------|-------|------------|
    | CustomerID | CustomerID | deploy123 |
    | Description | Description for information | Delete source account access role | 
    | Environment | The type of your source environment | prd/prd01/prd02 |
    | TcXVersion | The version of TcX to be used for operation.<br /> This value refers to the tag of the tc-version-manifests project in gitlab. | br.2512.0000 |
    | PipelineStage | The stage of the pipeline to run: operations | operations |
    | PipelineVersion | The branch name from the tcx-pipeline-tenant repo ( accepts only Branch/Tag ) | br.5.0.0 |
    | OperationsAction | Action to perform - cross_account_access_role | cross_account_access_role |
    | OperationsPayload | Additional paylod with information to delete the IAM role <br /> This is a YAML formatted string. <br /> TargetEnvironment: Target environment Type <br />  AccessRoleState: To create/delete the IAM role <br /> TargetCloudId: AWS account ID where replica environment is deployed. | OperationsPayload:<br />&nbsp;&nbsp;&nbsp;&nbsp;TargetEnvironment:&nbsp;dev01<br />&nbsp;&nbsp;&nbsp;&nbsp;AccessRoleState:&nbsp;delete<br />&nbsp;&nbsp;&nbsp;&nbsp;TargetCloudId:&nbsp;1234567890 |

- For example, the customer input will look like:
    ```yaml
    CustomerID: tenant01
    Description: Delete source environment access role
    Environment: prd
    TcXVersion: br.2512.0000
    PipelineStage: operations
    PipelineVersion: br.5.0.0
    OperationsAction: cross_account_access_role 
    OperationsPayload:
      TargetEnvironment: dev01
      AccessRoleState: delete
      TargetCloudId: "1234567890"
    ```

#### 5.0.2. Initiate the job
- Use RunCommands Template to perform operation. Please refer [Ansible Templates Table](../../010_Tenant%20Onboarding/020_Basic%20Flow/020_Ansible%20Templates%20Table.md)

- In Survey, provide the [Customer Input created in above step](#1-prepare-input-for-operations-pipeline), GITLAB PAT token, and Vault Token.
- Click on 'Next -> Launch' to initiate the delete IAM role operation.
- A new operation pipeline will be created in gitlab which will execute the operation and the IAM role would be deleted.

For additional assistance, consult the troubleshooting documentation or contact technical support.