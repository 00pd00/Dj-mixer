##### 3. Create IAM Roles Required for Usage and Billing Report Lambdas (Once Per Account)

Terraform code to create IAM roles required for usage and billing report lambdas for a given account is available in the repository **[TcX-Deploy / tcx-pipeline-account · GitLab](https://gitlab.industrysoftware.automation.siemens.com/tcx-deploy/tcx-pipeline-account)**.

Follow these steps to create the required roles via pipeline automation:

1. Open the **[TcX-Deploy / tcx-pipeline-account · GitLab](https://gitlab.industrysoftware.automation.siemens.com/tcx-deploy/tcx-pipeline-account)** in your browser.
2. Click on **Pipelines** under the build section and then click **Create New Pipeline** (highlighted in yellow).
    ![Image](./image_77.png)

3. Enter the details as shown below:
    ![Image](./image_78.png)

    - **Stage**: `createreportingrole`
    - **Cloud ID**: AWS account ID to which peering is to be performed (e.g., `716278087597`)
    - **Root Namespace**: Vault root namespace (e.g., `tcx-development/storm_playground`)
    - **Git Username**: Your Git username
    - **Git Password**: Your Git token

4. Click **Run**. After successful execution of the pipeline, note the following details displayed in the run output:
    ![Image](./image_79.png)

    - **TCX_BillReporting Role Default ARN**: `arn:aws:iam::361500002652:role/reporting-lambda-app-stack-lambdadeploymen-BRTRole-1B2PQVXUITCFK`
    - **TCX_UsageReporting Default ARN**: `arn:aws:iam::361500002652:role/TcxReportingLambdaRole`

5. If the pipeline fails with the message:
    ```
    Error: creating IAM Role (TCX_BillReportingRole): operation error IAM: CreateRole, https response error StatusCode: 409, RequestID: c06d636a-40d4-4528-8a28-7388e30489f2, EntityAlreadyExists: Role with name TCX_BillReportingRole already exists
    ```
    Delete the role from the AWS console and run the pipeline again.
    ![Image](./image_80.png)

6. **Optional**: If the billing report lambda and usage report lambda roles are modified or the account is changed, update the values under the variable repository for the cloud ID used. For example, if the cloud ID is `716278087597`, update the file **[716278087597.yml](https://gitlab.industrysoftware.automation.siemens.com/tcx-deploy/tcx-pipeline-variables/-/blob/main/variables/cloud/716278087597.yml?ref_type=heads)** and add these variables with the required ARNs and account ID (on the main branch):
    ![Image](./image_81.png)

    - `GLBL_USAGE_REPORT_LAMBDA_ARN`: `<ARN of the role of USAGE LAMBDA REPORT hosted in the management plane>`
    - `GLBL_USAGE_REPORT_LAMBDA_ACCOUNT_ID`: `<Account ID of the AWS account where the USAGE LAMBDA REPORT is hosted>`

    Then run the pipeline as mentioned in steps 3 and 4 above.

---