## Steps to Enable Oracle Data Guard on Oracle HA Deployment

This section outlines the steps required to trigger the automated Oracle Data Guard management operation, which configures Data Guard on Oracle HA deployments.

**Note:** This operation is only applicable for TcX environments deployed with the following inputs:
- **TcDatabaseType**: Oracle
- **FeatureHighAvailableDeployment**: True

## Trigger the oracle_dataguard_management Action

#### 1. Log in to Ansible Tower:
Open a web browser and navigate to the Ansible Tower URL. Log in with your Ansible Tower credentials.

#### 2. Access the Job Template:
Refer to the [Ansible Templates Table](../../020_Basic%20Flow/020_Ansible%20Templates%20Table.md) for the "Operation Run command template".

#### 3. Launch the Job Template:
Click the **Launch** button.

#### 4. Fill in the following inputs:

- **CustomerID:** `<CustomerID>` (Note: If the customer ID is numeric only, enclose it in single quotes, e.g., `'12345'`)
- **Description:** `Data Guard Operation for TcX deployment`
- **CellId:** `<CellId>`
- **Environment:** `<Environment>` (e.g., prd, uat, dev)
- **PipelineStage:** `operations`
- **PipelineCloud:** `<PipelineCloud>`
- **OperationsAction:** `oracle_dataguard_management`
- **StreamId:** `<StreamId>` (e.g., dev)
- **PipelineVersion:** `<pipeline_version>` (e.g., main)
- **TcXVersion:** `<tcx_version>` (e.g., br.2506.0006)
- **TcxCliRequirement:** `teamcenterx==<tcx-cli version>` (e.g., teamcenterx==5.0.7)
- **PipelineVariableVersion:** `<pipeline_variable_version>` (e.g., main)
- **OperationsPayload:**
    - **EnableDataguard: true**

**Azure Sample Inputs:**
```yaml
CustomerID: aztest01
Description: Data Guard Operation for TcX deployment
CellId: azm-gewc-tcx-preprod33-002
Environment: prd
PipelineStage: operations
PipelineCloud: 'f8138736'
OperationsAction: oracle_dataguard_management
StreamId: dev
PipelineVersion: br.4.3.0-az
TcXVersion: br.2506.0006
TcxCliRequirement: 'teamcenterx==5.0.7'
PipelineVariableVersion: main
OperationsPayload:
  EnableDataguard: true
```

##### 5. Verification Steps After Successful Operations Pipeline:
  - Connect to the Oracle Server by following the steps in [Login to VM](../../../020_Operations/030_Day%20N%20Operations/200_Login%20to%20CorpServer.md). Instead of searching for CorpServer, search for **OracleDB1** and connect using the SSH key.
  - Execute the following commands:
      - Switch to oracle user: `sudo su - oracle`
      - Connect to Data Guard Manager CLI: `dgmgrl /`
      - To view the status of the Oracle Data Guard setup, run: `SHOW CONFIGURATION;`
      - **Example Output:**
          ```yaml
          DGMGRL> SHOW CONFIGURATION;

          Configuration - tcxdb_dg

            Protection Mode: MaxAvailability
            Members:
            TCXDB  - Primary database
              TCXDB2 - (*) Physical standby database 

          Fast-Start Failover: Enabled in Zero Data Loss Mode

          Configuration Status:
          SUCCESS   (status updated 21 seconds ago)
          ```
      - **Example VM Screenshot:**
        ![alt text](image_001.png)
