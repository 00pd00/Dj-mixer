
## Workflow: Create Replica Environment

This document details the process for creating a partial replica environment by copying administrative configurations and test data from the production environment. The workflow consists of multiple jobs coordinated by an Ansible process that triggers a Git pipeline to create a fresh replica environment. Since the Git pipeline’s status is not tracked automatically, an approval job is included to validate the environment setup before proceeding.

> **Troubleshooting:**  
> For any pipeline failures, refer to the [Troubleshooting](../080_Troubleshooting/010_Enable%20Diagnostic%20logs%20for%20tcservers.md) section. If re-running the workflow, launch it with the same input parameters and only approve the next job after completing the steps in the Approval Stage.

---

## 1. Launch Workflow

1. **Select the Template:**  
   Navigate to the [Ansible Templates Table](../../010_Tenant%20Onboarding/020_Basic%20Flow/020_Ansible%20Templates%20Table.md) and select the appropriate replica workflow template for either a dry-run or production deployment.  
   
   - `<prefix>`: Either **Dryrun** or **Prod**, based on the environment type.  
   - `<suffix>`: A numeric tag representing the current CTCX release, appended to the job template.

   ![Image](./image_333.png)

2. **Provide Input Parameters:**  
   Enter the required parameters in the survey. Refer to the **Input Parameters for Replica Environment** section below for details. Values for parameters such as `PipelineVersion`, `TcXVersion`, `cli`, and the variable tag match those in the `"<prefix> TcX Container Deploy - Development - <suffix>"` job template and are prepopulated.

3. **Launch the Workflow:**  
   Once all inputs are verified, click **Launch** to initiate the workflow.

   ![Image](./image_334.png)

---

## 2. Input Parameters for Replica Environment

When entering inputs:
- **Do not** include values for `PipelineStage`, `TeamcenterProductIDList`, `AdditionalSoftware` and `TeamcenterPackageIDList` or `QDFileName`.
- Use the same inputs as the source environment, with additional parameters specified below.

| Key                        | Description                                                                                                                                                                                                     | Remarks                                                                                                   |
|----------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------|
| **SourceEnvironment**      | Type of the source environment (e.g., PRD, UAT) used alongside CustomerID to uniquely identify a deployment (`<customerid-environmenttype>`).                                                                   | For a production replica, use 'prd' followed by an environment ID (e.g., prd1, prd2).                       |
| **Environment**            | Type of the target environment (e.g., DEV) used with CustomerID to uniquely identify a deployment (`<customerid-environmenttype>`).                                                                               | Use values such as `dev`, `dev1`, `dev2`, `dev11`, etc.                                                   |
| **PipelineCloud** | Cloud account ID where the target environment will be deployed.                                                                                                                                               | For AWS, this can be the same or a different account ID than the source.                      |
| **CellId**                 | Identifier for the deployment cell; must correspond with an existing configuration file in `tcx-pipeline-variables/variables/cell`.                                                                              | For AWS, this can be the same or a different cell ID than the source.               |
| **TestDataFolder**         | Name of the Teamcenter folder in production that contains data created by test users. Data from this folder is copied to the replica environment.                                                              | For example: TestUserData, TestData, etc.                                                                |
| **MaxWaitTimeForExportImport** | Optional. Maximum wait time in minutes for the test data export/import jobs.                                                                                                                              | Default is 300 minutes (5 hours).                                                                       |
| **dnsSubdomainName** | DNS Subdomain name for the target environment |  |
| **AdminReadAccessRoleArn** | AWS admin read access role for vault obtained from IAM in the deployment AWS account. Highly recommended for secrets control.|         |
| **AdminReadWriteAccessRoleArn** | AWS admin read-write access role for vault obtained from IAM in the deployment AWS account. Highly recommended for secrets control. |  |

## 3. Approval Stage

The Ansible workflow will trigger the Git pipeline to create a fresh partial replica environment as part of the first job however it will not track any manual post deployment steps performed on the environment. Therefore, an approval job is added.

Once the Git pipeline job to create a fresh environment is completed successfully, below are the checkpoints to validate before approving the job-

1. All post deploy manual actions are completed. For example, in case of Dispatcher addon, the deploy scripts need to be executed manually. Perform post deploy actions mentioned in the section- [Post Deploy Operations](../../010_Tenant%20Onboarding/030_Post%20Deploy%20Operations/000_Create%20Admin%20License%20Server.md)

Once the approval is provided only then the remaining jobs to export/import admin configuration and test data will take place.

**Note: Follow the same steps(manual post-deploy activities) before rerunning the workflow in case of any operations failures.**

​​
![Image](./image_335.png)

**NOTE: Once the replica environment is created, it must be treated same as any other deployment for performing any Day N operations.**