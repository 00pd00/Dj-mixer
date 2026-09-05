# Post-Installation License Management for Teamcenter X Tenant

After completing the installation pipeline, follow these steps to manage licensing for your Teamcenter X (TcX) tenant.

**Important**:  
During the provisioning request for a TcX tenant, CApS receives a temporary license used throughout the provisioning process. Once provisioning is complete, CApS requests a final license for the tenant or customer based on the order and deploys it. See [How to Request a Teamcenter X Cloud License for Production Deployment](020_Teamcenter%20X%20Cloud%20License%20for%20Production%20deployment.md#how-to-request-a-teamcenter-x-cloud-license-for-production-deployment) for details.

## Cloud Licensing Overview

The cloud license file is shared across multiple deployments for the same customer, including development (dev), production (prd), and user acceptance testing (uat) environments.

Store the license file at a designated common location:

- **AWS:**  
  S3 bucket named `tcx-tenantbucket-[region]-[CustomerID]-[AWS_Account_Number]`  
    - *Example*: `tcx-tenantbucket-us-east-1-ctcxenv1-906956190433`
- **Azure:**  
  Storage Account named `tcx-[CustomerID]-common-container`  
    - *Example*: `tcx-neh2514-common-container`
    - For uploading to Azure tenant common storage, follow these steps: [Upload file to common SA](015_Upload%20License%20file%20to%20common%20SA.md#Upload-license-file-to-Common-Storage-account)

---

## Step 1: Obtain an Existing License File from Tenant Common Storage

Go to your common storage location according to your cloud provider:

- **AWS:** S3 bucket `tcx-tenantbucket-[region]-[CustomerID]-[AWS_Account_Number]`
- **Azure:** Storage Account `tcx-[CustomerID]-common-container`

If a cloud license has already been generated for the tenant, you will find it in the Tenant Common Storage.  
(*Example location for AWS*: `tcx-tenantbucket-[region]-[CustomerID]-[AWS_Account_Number]`)

If you need to request a new license file, refer to [How to Request a Teamcenter X Cloud License](030_Teamcenter%20X%20Cloud%20License.md#how-to-request-a-teamcenter-x-cloud-license).  
**Note:** Request a new license file only once per customer unless the license count changes.

---

## Step 2: Verify the License File Validity

Check that the license file is still valid.  
Review the expiration date for each individual license entry in the file.  
The screenshot below displays a sample license file with an expiration date of “20-sep-2024”.

![Sample Cloud License File](./image_324.png)  
**Figure 1**: A sample Cloud License File showing a license expiration date.

---

## Obtaining a New Cloud License File

If the tenant does not already have a valid cloud license file, follow the instructions in the next section to obtain one.
