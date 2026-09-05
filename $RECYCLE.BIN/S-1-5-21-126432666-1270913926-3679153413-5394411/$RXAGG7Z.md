# Resize Infrastructure Operation

## 1. Description
This Operation automates the process of resizing compute (VM) and database instances based on user-defined t-shirt sizes. Users can resize compute instances, database instances, or both in a single operation.
This operation is supported from 2512.2602 and 2606+.

## 2. Pre-requisites
- Access to [Ansible tower](https://ansible-tcx-prod.plmcloudsolutions.com/)
- The deployment must be **Variable VM infra** based deployment.
   - Currently **Variable VM infra** is supported only for **AWS** deployments (available from 2512+).
- The deployment must be **PID based deployment** not **Static QD based deployment**.
- This operation must be performed in a maintenance window as it requires system downtime.
- During the resize operation, the tenant deployment will undergo a **complete shutdown** before the resizing is applied. The deployment will be **restarted automatically** once the resizing is complete.

## 3. Operation Preparation Details

#### 3.0.1. Identify the MachineIDs of the VMs to be resized
- The required information about the current VM boxes for a cTcX deployment can be retrieved from the respective tenant repo.
    - In the tenant repo, open file `<Tenant-Repo>/customer-information/pipeline-output.md`

- In pipeline-output.md file, the VM details are listed in tabular format in **AWS Details** section as shown below:
    - Here, user gets an overview of the products installed on various VMs along with their current usage.

    ![AWS Details](./image_380.png)

    - `Note the MachineIDs and current instance types of the VMs to be resized. This information will be required while executing the workflow.`
    - Users can resize single or multiple VMs at a time. Each machine can be individually resized using MachineID.

#### 3.0.2. Identify the target t-shirt size

The cTcX pipeline supports a set of cloud-agnostic t-shirt sizes for both compute and database instances. Users must choose values within the permitted range defined below.

**Compute (VM) T-Shirt Sizes**

*CorpServer (Compute Optimized)*

| T-Shirt Size | AWS Instance Type | Specs |
|:------------:|:-----------------:|:-----:|
| Small | c7i.xlarge | 4 vCPU, 8 GB |
| Medium | c7i.2xlarge | 8 vCPU, 16 GB |
| Large | c7i.4xlarge | 16 vCPU, 32 GB |
| XLarge | c7i.8xlarge | 32 vCPU, 64 GB |
| 2XLarge | c7i.12xlarge | 48 vCPU, 96 GB |
| 3XLarge | c7i.16xlarge | 64 vCPU, 128 GB |
| 4XLarge | c7i.24xlarge | 96 vCPU, 192 GB |

*WindowsServer1 (General Purpose)*

| T-Shirt Size | AWS Instance Type | Specs |
|:------------:|:-----------------:|:-----:|
| Small | m7i.xlarge | 4 vCPU, 16 GB |
| Medium | m7i.2xlarge | 8 vCPU, 32 GB |
| Large | m7i.4xlarge | 16 vCPU, 64 GB |
| XLarge | m7i.8xlarge | 32 vCPU, 128 GB |
| 2XLarge | m7i.12xlarge | 48 vCPU, 192 GB |
| 3XLarge | m7i.16xlarge | 64 vCPU, 256 GB |
| 4XLarge | m7i.24xlarge | 96 vCPU, 384 GB |

**Database T-Shirt Sizes**

*Aurora PostgreSQL*

| T-Shirt Size | AWS Instance Type | Specs |
|:------------:|:-----------------:|:-----:|
| Small | db.r7g.large | 2 vCPU, 16 GB |
| Medium | db.r7g.xlarge | 4 vCPU, 32 GB |
| Large | db.r7g.2xlarge | 8 vCPU, 64 GB |
| XLarge | db.r7g.4xlarge | 16 vCPU, 128 GB |
| 2XLarge | db.r7g.8xlarge | 32 vCPU, 256 GB |

*Oracle RDS*

| T-Shirt Size | AWS Instance Type | Specs |
|:------------:|:-----------------:|:-----:|
| Small | db.r5.large | 2 vCPU, 16 GB |
| Medium | db.r5.xlarge | 4 vCPU, 32 GB |
| Large | db.r5.2xlarge | 8 vCPU, 64 GB |
| XLarge | db.r5.4xlarge | 16 vCPU, 128 GB (max for Standard engine) |
| 2XLarge | db.r5.8xlarge | May require Enterprise engine |

> **Note:** Before selecting a t-shirt size, ensure that all Availability Zones in the target region support the corresponding instance type. This is especially important for larger instance types which may have more limited AZ availability. You can verify instance type availability in your region using the tools mentioned in this article: [AWS EC2 Instance Discovery](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-discovery.html).

#### 3.0.3. Prepare the ResizeInfrastructurePayload

After identifying the MachineIDs and target t-shirt sizes, construct the `ResizeInfrastructurePayload`. Users can provide both compute and database sections, or just one of them.

**Resizing both compute and database:**
```yaml
ResizeInfrastructurePayload:
  compute:
    <MachineID1>:
      tshirt_size: <TargetTShirtSize>
    <MachineID2>:
      tshirt_size: <TargetTShirtSize>
  database:
    tshirt_size: <TargetTShirtSize>
```

**Resizing compute only:**
```yaml
ResizeInfrastructurePayload:
  compute:
    <MachineID1>:
      tshirt_size: <TargetTShirtSize>
```

**Resizing database only:**
```yaml
ResizeInfrastructurePayload:
  database:
    tshirt_size: <TargetTShirtSize>
```

For example, if you want to resize:
- WindowsServer1 to XLarge
- CorpServer to XLarge
- Database to XLarge

the payload looks like:
```yaml
ResizeInfrastructurePayload:
  compute:
    WindowsServer1:
      tshirt_size: XLarge
    CorpServer:
      tshirt_size: XLarge
  database:
    tshirt_size: XLarge
```

## 4. Operation Execution Details

#### 4.0.1. Prepare input for Operations Pipeline
- The operation is executed using the RunCommands template in Ansible Tower. The following customer inputs are required to execute the workflow:

    | Parameter | Value | Example |
    |-----------|-------|---------|
    | CustomerID | CustomerID (Note: If the customer ID is numeric only, <br/>enclose it in single quotes, e.g., `'12345'`). | t4c2e7b1 |
    | Description | Description for information | Resize infrastructure - compute and database |
    | Environment | The type of environment deployed. | prd |
    | TcXVersion | The version of TcX to be used for operation.<br /> This value refers to the tag of the tc-version-manifests project in gitlab. | br.2606.0000 |
    | PipelineStage | The stage of the pipeline to run: operations | operations |
    | OperationsAction | Action to perform | resize_infrastructure |
    | TcxCliRequirement | The tcx CLI version requirement. | teamcenterx==6.0.10 |
    | ResizeInfrastructurePayload | The payload containing compute and/or database <br /> t-shirt size configuration. This is a YAML formatted string. | See [section 3.0.3 above](#303-prepare-the-resizeinfrastructurepayload) |

- For example, the customer input will look like:
    ```yaml
    CustomerID: t4c2e7b1
    Description: Resize infrastructure - compute and database
    Environment: prd
    PipelineStage: operations
    OperationsAction: resize_infrastructure
    TcXVersion: br.2606.0000
    TcxCliRequirement: teamcenterx==6.0.10
    ResizeInfrastructurePayload:
      compute:
        WindowsServer1:
          tshirt_size: XLarge
        CorpServer:
          tshirt_size: XLarge
      database:
        tshirt_size: XLarge
    ```

#### 4.0.2. Initiate the workflow
- Use RunCommands Template to perform operation. Please refer [Ansible Templates Table](../../010_Tenant%20Onboarding/020_Basic%20Flow/020_Ansible%20Templates%20Table.md)

- In Survey, provide the [Customer Input created in above step](#401-prepare-input-for-operations-pipeline), GITLAB PAT token, and Vault Token.

- Click on 'Next -> Launch' to initiate the resize infrastructure operation.
- A new operation pipeline will be created in gitlab which will execute the resize operation on the specified compute and/or database instances.

#### 4.0.3. Review the validation summary
- Once the operation pipeline validates the input, it prints a summary of the changes to be made in the Ansible playbook output. Review this summary carefully to verify that the correct VMs and/or database are being resized to the expected target instance types.

- **Example: Database-only resize**
    ```
    ============================================================
    RESIZE INFRASTRUCTURE - VALIDATION COMPLETE
    ============================================================
    Tenant ID     : t4c2e7b1
    Cloud Provider: aws

    COMPUTE: No changes (not requested)

    DATABASE:
      Type          : PostgreSQL
      Old Class     : db.r5.large
      New Class     : db.r5.xlarge (T-shirt: Medium)
    ============================================================
    ```

- **Example: Compute and database resize**
    ```
    ============================================================
    RESIZE INFRASTRUCTURE - VALIDATION COMPLETE
    ============================================================
    Tenant ID     : t4c2e7b1
    Cloud Provider: aws

    COMPUTE:
      WindowsServer1: m7i.xlarge → m7i.8xlarge (T-shirt: XLarge, Usage: TCX_GPVM.8xlarge)
      CorpServer: c7i.2xlarge → c7i.8xlarge (T-shirt: XLarge, Usage: TCX_COVM.8xlarge)

    DATABASE:
      Type          : PostgreSQL
      Old Class     : db.r7g.xlarge
      New Class     : db.r5.4xlarge (T-shirt: XLarge)
    ============================================================
    ```

<br />

## 5. Verification on completion

#### 5.0.1. Verify compute (VM) resize via AWS Console
- Login to AWS console and navigate to EC2 dashboard.
- In the **EC2 dashboard**, navigate to **Instances** section.
- Filter the instances using CustomerID and verify if the required VMs are resized to target instance types.

#### 5.0.2. Verify database resize via AWS Console
- Login to AWS console and navigate to the **RDS** dashboard.
- In the **RDS dashboard**, navigate to **Databases** section.
- Filter the database instances using CustomerID and verify if the database instance class has been updated to the target instance type.

<br />

## 6. Troubleshooting
### 6.1. Common gitlab operations pipeline errors
| Error Message | Cause | Resolution |
|---------------|-------|------------|
| Unexpected templating type error occurred on (`{{ lookup(''file'', ''/srv/tenant/customer-information/machine_components_map.json'', errors=''ignore'') \| from_json }}`): the JSON object must be str, bytes or bytearray, not NoneType. the JSON object must be str, bytes or bytearray, not NoneType | The deployment on which the operation is being performed is not a Variable VM infra based deployment. | Verify that the deployment is a Variable VM infra based deployment. This operation is supported only for Variable VM infra based deployments. |
| Instance type '&lt;desired_instance_type&gt;' for machine ID '&lt;desired_machine_id&gt;' is not supported. | The requested instance type is not supported by cTcX. | Choose a different t-shirt size that is supported as provided in [section 3.0.2 above](#302-identify-the-target-t-shirt-size). |
| No machines need resizing. All requested machines are already at the requested instance types. | Provided target t-shirt sizes for all specified instances are the same as the current sizes. | Verify the t-shirt sizes provided in ResizeInfrastructurePayload. Choose different target sizes based on [step 3.0.1 above](#301-identify-the-machineids-of-the-vms-to-be-resized). |
| Operation not supported: Static QD based deployment detected. | The deployment on which the operation is being performed is a Static QD based deployment. | This operation is not supported for Static QD based deployments. Only PID based deployments are supported. |
| Machine ID '&lt;target_machine_id&gt;' not found in machine component map. | One or more specified MachineIDs in the ResizeInfrastructurePayload does not exist in the deployment. | Verify the MachineIDs provided in ResizeInfrastructurePayload. Ensure that the MachineIDs exist in the deployment. Refer [step 3.0.1 above](#301-identify-the-machineids-of-the-vms-to-be-resized). |

### 6.2. Common ansible operations job errors
| Error Message | Cause | Resolution |
|---------------|-------|------------|
| 'ResizeInfrastructurePayload' is mandatory for action 'resize_infrastructure' | The ResizeInfrastructurePayload parameter is missing in the survey input. | Provide the ResizeInfrastructurePayload parameter with the required compute and/or database t-shirt size configuration in the survey input. Refer [step 4.0.1 above](#401-prepare-input-for-operations-pipeline). |
