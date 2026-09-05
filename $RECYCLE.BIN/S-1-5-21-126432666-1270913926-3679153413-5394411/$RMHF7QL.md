
## Enabling ActAsRole for Teamcenter X Customer SAM Accounts

This guide provides step-by-step instructions to enable the ActAsRole permission for Teamcenter X Customer SAM accounts to generate SAMAuth and DSS credentials. Designed for technical operators and support teams, it ensures compliance and minimizes risk during customer onboarding.


### Overview

Every time you sign up a new Teamcenter X customer, you must perform the ActAsRole enablement for their SAM account.  
> **Note:** The Customer SAM account is a _restricted external_ account (Siemens external) and does **not** have access to development consoles, such as the SAM console.

### Prerequisites

Before proceeding, ensure you have these identifiers:

- **Admin (Provider/Operating) SAM Account ID:**  
  Existing CAPS or GSSC SAM account. (CAPS maintains a unique Admin SAM account for each region.)
- **Customer ECA ID**
- **Customer SAM Account ID**

#### Required Admin SAM Account Attributes

- Owner/Administrator: CAPS/RV/Segment user
- Access: SAMAuth / SAM console
- Status: Production
- Permissions:  
  - ActAsRole enabled  
    > **Validation:** If not enabled, open an access ticket.

#### Required Customer SAM Account Attributes

- Linked to ECA
- Owner/Administrator: Tenant user
- Access: **No** SAMAuth / **No** SAM console
- Status: Production
- Permissions:  
  - ActAsRole enabled  
  - DSS_APIs_For_CloneVault enabled  
  - ProviderRoleFor[AdminAccountName]-TcX role  

- **Access to generate SAMAuth and DSS keys:**

    ```json
    {
        "rules": [
            {
                "effect": "Permit",
                "actions": ["sam:*"],
                "resources": ["*"]
            }
        ]
    }
    ```
---

### Step-by-Step Procedure

 1. Enable ActAsRole Permissions for SAM Accounts
 2. Set Up ActAsRole from Admin SAM to Customer SAM
 3. Generate Credentials (SAMAuth & DSS Key) <br/>
   ![High-Level Steps](./image_137.png) 

---

### Enabling SAM Accounts for ActAsRole Permissions

This section outlines how to request ActAsRole enablement on Admin and Customer SAM accounts, ensuring proper permissions and account setup for Teamcenter X operations.

- **Admin SAM Account:**  
  Managed by Siemens teams such as CAPS, Development, or PV. Authorized users of this account will act on the Customer SAM account on behalf of Teamcenter X customers.

- **Customer SAM Account:**  
  Owned by external customers.

The FDS team will configure both accounts for ActAsRole functionality upon your request.

#### Step-by-Step Instructions

1. Create the ticket on [FDS One help center](https://fdsone.atlassian.net/servicedesk/customer/portal/28/group/36/create/112) 
2. Fill the form with below details (Refer below image):
    - Summary: "Need Permission to use ActAsRole for TcX+TcShare Production ECA  ( `<Customer ECA Id>` )"
    - Description:
        ```
        Please enable below Production ECA for “ActAsRole” and provide SAM account ID of the same:

            ECA ID: “<ECA Id>”

            Name of the provider role to attach: “ProviderRoleForCAPS-TcX”

            Admin Account ID: “<SAMConsole account ID of account CAPSAdmin>”

            Admin account Name: “CAPSAdmin” 
        ```
    - Segment: "DI SW LCS"
    - Client Services: "Teamcenter X"
    - Product Name: "Other"

    ![FDS One form](./image_138.png) 

3. Validate the form one again for the correct details.  
4. Finally click "Send" to create the ticket

#### Issue Templates

##### Scenario 1: No Existing Provider Role

If the Admin SAM account does not already have a Customer SAM account (Provider Role is absent):

- **Issue Title:**  
  `Please create a new provider role for TCX and enable ECA for ActAsRole for (<Customer ECA ID>)`
- **Description Example:**
    ```json
    Please enable ActAsRole with the following accounts:
    Admin SAM Account ID: [Admin-SAM-account-ID]
    Provider Role Name: ProviderRoleFor[AdminAccountName]-TcX
    Provider Permission:
    {
        "rules": [
            {
                "effect": "Permit",
                "actions": ["sam:*"],
                "resources": ["*"]
            }
        ]
    }
    Customer ECA ID: [Tenant-ECA-ID]
    Customer SAM account ID: [Tenant-SAM-account-ID]
    Please also attach DSS_APIs_For_CloneVault policy to the Customer SAM account
    ```

##### Scenario 2: Existing Provider Role

If the Admin SAM account already has an associated Customer SAM account (Provider Role exists):

- **Issue Title:**  
  `Please enable ECA for ActAsRole for (<Customer ECA ID>)`
- **Description Example:**
    ```
    Please enable ActAsRole with the following accounts:
    Customer ECA ID: [Customer-ECA-ID]
    Customer SAM account ID: [Customer-SAM-account-ID]
    Please also attach DSS_APIs_For_CloneVault policy to the Customer SAM account
    ```

#### Example Values

| Value                         | Example                                           |
|-------------------------------|--------------------------------------------------|
| `[Admin-SAM-account-ID]`      | `956f052036eb43dd8d64807fdb03e597`               |
| `Provider Role Name`          | `ProviderRoleForSOO-TcX`                         |
| `[Customer-ECA-ID]`           | `100243882`                                      |
| `[Customer-SAM-account-ID]`   | `1666f46736e44ab9b69a6b206e33d2ec`               |

#### What to Expect Next

- Wait for the XF team to configure permissions and respond in your issue thread.
- This process typically takes **2–3 business days**.

> **Note:**  
> To expedite your request, email `krishn.mishra@siemens.com` or `sheikh.ahmed@siemens.com` with issue details.

---

### Setup the ActAsRole for the Admin SAM account to the Customer SAM account

#### Generating CAPS User Access Keys (Admin SAM Account)

Follow these steps to create access credentials for the CAPS user.

##### Steps

1. **Log in to SAM Console**  
   - Use the service account (e.g., _pre-prod_ for trials, _prod_ for customer use).
   - Account Name: `CAPSAdmin`
   - If you lack access, request credentials from Admins: **Sayali Patki** or **Kshitij Shripat**.
   - **Production URL:** [SAM Console](https://samconsole.us-east-1.sws.siemens.com/)

   ![Login Screen](./image_140.png)

2. **Generate Credentials**
   - Create an access key and secret access key for your user account.
   - Record these credentials for use in later steps.

   ![Key Generation Steps](./image_141.png)

3. **Download Credentials**
   - Upon generation, a popup will prompt you to download your `accessKeyID` and `SecretAccessKey`.

   ![Access Key Download Prompt](./image_142.png)

   > **Note:** Keep these credentials confidential. You’ll use them in the next section.

#### Generating Temporary Provider Role Credentials (Customer SAM Account)

This section walks through generating temporary credentials using Postman.

##### Steps

1. **Install Postman**
   - Download from [Postman](https://www.postman.com/).
   - Complete installation and launch the application.

2. **Download Required Files**
   - Get Postman collection and environment files:  
     [Download Link](https://artifacts.industrysoftware.automation.siemens.com/ui/native/generic-local/com/siemens/tcx/dc_quick_deploy/asynch/Adoc_collab_with_TCShare/)

3. **Import Postman Collection**
   - Add `TcShareRegistration.postman_collection.json` into Postman.
   - If drag-and-drop fails, sign in with your Postman account.

   ![Import Collection Dialog](./image_143.png)

   After import, your workspace should look as follows:

   ![Imported Collection View](./image_144.png)

4. **Import Environment**
   - Go to Postman's Environment section and click **Import**.
   - Select `TcShareRegistration.postman_environment.json`.
   - After importing, confirm a new environment named `EnvTcShare` is created.

   ![Import Environment Dialog](./image_145.png)

   - Update `CHANGE_ME` fields in the environment using the following reference table:

   | Variable            | Description                                                                                                                        |
   |---------------------|------------------------------------------------------------------------------------------------------------------------------------|
   | accessKeyId         | [Refer to CAPS user key generation above](#1-generating-caps-user-access-keys-admin-sam-account)                                   |
   | secretAccessKey     | [Refer to CAPS user key generation above](#1-generating-caps-user-access-keys-admin-sam-account)                                   |
   | samEndpoint         | https://sam.us-east-1.sws.siemens.com                                                                                              |
   | appConfigEndpoint   | https://samauth.us-east-1.sws.siemens.com                                                                                          |
   | authorization       | Auto-populated                                                                                                                     |
   | customerAccountId   | Obtain from XF team                                                                                                                |
   | appId               | To be provided later                                                                                                               |
   | templateId          | To be provided later                                                                                                               |

   ![Environment Variable Editing](./image_146.png)

   > **Troubleshooting:**  
   Refer to [API Reference](http://civ6w178:3000/services/sam/Developer_API_Reference/role/actAsRole.html) if you encounter issues during setup.

5. **Run `GetActAsRoleInfo` Script**
   - In your imported collection, select the **GetActAsRoleInfo** request.

   ![GetActAsRoleInfo Script Selected](./image_147.png)

   - **Set Request Parameters:**
     - **Headers Tab:** Confirm required headers are present.<br/>
       ![Headers Tab](./image_148.png)
     - **Body Tab:** Add the following payload:

       ```json
       {
         "actorName": "[AdminAccountName]-user-role",
         "actDuration": 120
       }
       ```
       - Replace `[AdminAccountName]-user-role` (e.g., use `CAPS-user-role`).

     - Update the URL to match your environment (e.g., `ProviderRoleForCAPS-TcX`).
     - Set `actDuration` to 120 minutes to allow adequate time for credential generation.

   - **Send the Request**
     - Click **Send** to trigger the script.

   > **Validation Step:**  
   Ensure the request returns a `200 OK` response and the encrypted string is populated in the environment field.

   > **Troubleshooting:**  
   If you receive a `401` error, run **setup s3-HMAC script** from your collection.  
   ![setup s3-HMAC Script Example](./image_150.png)

6. **Re-run `GetActAsRoleInfo` Script**
   - Execute the script again.
   - Confirm the script returns `accessKeyId` and `secretAccessKey`.

   > Use `accessKeyId` as `SAM_ACCESS_KEY` and `secretAccessKey` as `SAM_SECRET_ACCESS_KEY` in subsequent configuration steps.

---

### Generate SAMAuth, DSS, and SAM service user keys

#### CLI lambda usage (using aws-cli 2.1.27)

- Use the `SAM_ACCESS_KEY` and `SAM_SECRET_ACCESS_KEY` values from the previous step.  
- Use the `SAM_ACCOUNT_ID` obtained earlier (Customer SAM account ID).  

Run the following commands to verify the credentials and retrieve SAM account details and DSS details. These credentials will be used in the `customer_input.json` file to trigger the installation pipeline.  

**Get SAM Account Info:**  
- **Linux:**  
  ```bash
  aws lambda invoke --region us-east-1 --function-name arn:aws:lambda:us-east-1:361500002652:function:tcx_cli:PRD --cli-binary-format raw-in-base64-out --payload '[["<SAM_ACCESS_KEY>","<SAM_SECRET_ACCESS_KEY>","us-east-1.sws.siemens.com"],["sam","GetAccountInfo","<SAM_ACCOUNT_ID>"]]' outputfile.txt
  ```
- **Windows:**  
  ```bash
  aws lambda invoke --region us-east-1 --function-name arn:aws:lambda:us-east-1:361500002652:function:tcx_cli:PRD --cli-binary-format raw-in-base64-out --payload "[[\"<SAM_ACCESS_KEY>\",\"<SAM_SECRET_ACCESS_KEY>\",\"us-east-1.sws.siemens.com\"],[\"sam\",\"GetAccountInfo\",\"<SAM_ACCOUNT_ID>\"]]" outputfile.txt
  ```

**List DSS Vaults:**  
- **Linux:**  
  ```bash
  aws lambda invoke --region us-east-1 --function-name arn:aws:lambda:us-east-1:361500002652:function:tcx_cli:PRD --cli-binary-format raw-in-base64-out --payload '[["<SAM_ACCESS_KEY>","<SAM_SECRET_ACCESS_KEY>","us-east-1.sws.siemens.com"],["dss","ListVaults"]]' outputfile.txt
  ```
- **Windows:**  
  ```bash
  aws lambda invoke --region us-east-1 --function-name arn:aws:lambda:us-east-1:361500002652:function:tcx_cli:PRD --cli-binary-format raw-in-base64-out --payload "[[\"<SAM_ACCESS_KEY>\",\"<SAM_SECRET_ACCESS_KEY>\",\"us-east-1.sws.siemens.com\"],[\"dss\",\"ListVaults\"]]" outputfile.txt
  ```
---

### Adding a Service User to Access the SAMAuth Service in Teamcenter X Customer SAM Account

> **Note:** Ignore this section if you are provisioning a SAM 2.0-based TcX environment. This service user is not required for pipeline input.

This guide will help you add a dedicated Service User—an automated, non-human account—so your Teamcenter X environment can securely use the SAMAuth service. Service Users are designed for machine-to-machine communication, enabling reliable integrations and service operations.

#### Step-by-Step Instructions

##### Generate the Service User and Access Keys

To register the SAMAuth app in the customer SAM account, you will create a Service User and generate its access credentials.

1. **Launch the SetupServiceUser API**
   - This API manages the creation of the Service User and its access keys.

2. **Input Credentials**
   - Use your customer SAM account credentials:
     - **SAM Access Key**
     - **SAM Secret Access Key**

3. **Specify the Policy File**
   - The CLI command requires a JSON policy file name.
   - **Always use:** `TcXSamAuthAccessPolicy.json`
  
##### Validation Steps

After running the command:

- **Check for Success Message** confirming Service User creation.
- **Validate Access Keys** by registering the SAMAuth application.
- **Review Resources** to ensure the new user, group, and policy exist in the customer SAM account.
- **Confirm Policy Assignment** for `TcXSamAuthAccessPolicy.json` to the created user/group.

If you see an error about existing user, group, or policy names:

> :warning: **Warning:**  
> Provide unique names for the Service User, policy, or group, then re-run the CLI command.

- **For tenant environments:**  
  
**Linux**
```
aws lambda invoke --region us-east-1 --function-name arn:aws:lambda:us-east-1:361500002652:function:tcx_cli:PRD --cli-binary-format raw-in-base64-out --payload '[["<SAM_ACCESS_KEY>","<SAM_SECRET_ACCESS_KEY>","us-east-1.sws.siemens.com"],["SetupServiceUser","<SAM_ACCOUNT_ID>","TcXSamAuthPolicy","TcXSamAuthAccessPolicy.json","TcXSamAuthGroup","TcXSamAuthUser"]]' outputfile.txt
```
**Windows**
```
aws lambda invoke --region us-east-1 --function-name arn:aws:lambda:us-east-1:361500002652:function:tcx_cli:PRD --cli-binary-format raw-in-base64-out --payload "[[\"<SAM_ACCESS_KEY>\",\"<SAM_SECRET_ACCESS_KEY>\",\"us-east-1.sws.siemens.com\"],[\"SetupServiceUser\",\"<SAM_ACCOUNT_ID>\",\"TcXSamAuthPolicy\",\"TcXSamAuthAccessPolicy.json\",\"TcXSamAuthGroup\",\"TcXSamAuthUser\"]]" outputfile.txt
```
- **For dry-run environments:**

Use different names for Policy, Group and user for different dry run environments.
Linux
```
aws lambda invoke --region us-east-1 --function-name arn:aws:lambda:us-east-1:361500002652:function:tcx_cli:PRD --cli-binary-format raw-in-base64-out --payload '[["<SAM_ACCESS_KEY>","<SAM_SECRET_ACCESS_KEY>","us-east-1.sws.siemens.com"],["SetupServiceUser","<SAM_ACCOUNT_ID>","<dryrun_id>_TcXSamAuthPolicy","TcXSamAuthAccessPolicy.json","<dryrun_id>_TcXSamAuthGroup","<dryrun_id>_TcXSamAuthUser"]]' outputfile.txt
```

Windows
```
aws lambda invoke --region us-east-1 --function-name arn:aws:lambda:us-east-1:361500002652:function:tcx_cli:PRD --cli-binary-format raw-in-base64-out --payload "[[\"<SAM_ACCESS_KEY>\",\"<SAM_SECRET_ACCESS_KEY>\",\"us-east-1.sws.siemens.com\"],[\"SetupServiceUser\",\"<SAM_ACCOUNT_ID>\",\"<dryrun_id>_TcXSamAuthPolicy\",\"TcXSamAuthAccessPolicy.json\",\"<dryrun_id>_TcXSamAuthGroup\",\"<dryrun_id>_TcXSamAuthUser\"]]" outputfile.txt
```

If installed correct, it should return output like the following.
```json
{
  "userGUID" : "5e50c29f13754e66a995ff332379fc36",
  "accessKey" : {
    "objectGUID" : "fdca5aa2e7ea45a8af1f797345ac265f",
    "secretAccessKey" : "B/jpfo+HRJXcShaROAj31FQ6bFk2jf9KMO+TfYcNzow="
  }
}
```

#### Required Values for Tenant Stack Deployment

Please keep the highlighted values below handy. You will need them for tenant stack deployments.

##### Value Reference Table

| **Value to Copy**        | **Description**                                                                                                  | **Parameter in Customer Input JSON File**   |
|--------------------------|------------------------------------------------------------------------------------------------------------------|---------------------------------------------|
| **tenant-sam-account-id** | The Account ID for the SAM Customer (tenant) that contains the SamAuth Service user. You can find this above and in your email. | `SamAuthAccountID`                          |
| **userGUID**              | The user ID for the SamAuth Service user. This user is created using the `Cli SetupServiceUser` command.         |                                             |
| **objectGUID**            | The account access key of the SamAuth Service user for the SAM Customer (tenant) account.                        | `SamAuthUserAccessKey`                      |
| **secretAccessKey**       | The secret access key for the SamAuth Service user in the SAM Customer (tenant) account.                         | `SamAuthUserSecretAccessKey`                |

---

### Adding a Service User for Dataset Storage Service (DSS) Access in Teamcenter X Customer SAM Account

> **Note:** Ignore the DSS section if you are using Azure or provisioning a SAM 2.0-based TcX environment. This service user is not required for pipeline input.

If the `ListVaults` Lambda function (described above) is not working, it may be because the service user has not been set up for DSS access. Follow the steps below to configure a user for DSS.

#### Prerequisites

- Ensure the CLI is configured correctly.
- Verify that the `sam:getAccountInfo` API returns the correct customer account. (Refer to the **"CLI Lambda Invocation"** example section for guidance.)

#### Steps to Add a Service User for DSS

1. **Generate the DSS Service User and Access Key**  
   Use the `SetupDSS` API to create a new DSS service user and generate its access key.

2. **Use Customer SAM Account Credentials**  
   When accessing DSS, provide your customer SAM account credentials:
   - **SAM access key**
   - **SAM secret access key**
  
**For customer environments:**

**Linux**
```
aws lambda invoke --region us-east-1 --function-name arn:aws:lambda:us-east-1:361500002652:function:tcx_cli:PRD --cli-binary-format raw-in-base64-out --payload '[["<SAM_ACCESS_KEY>","<SAM_SECRET_ACCESS_KEY>","us-east-1.sws.siemens.com"],["SetupDSS","<SAM_ACCOUNT_ID>","TcXVaultAdminPolicy","TcXVaultAdminGroup","TcXVaultAdminUser"]]' outputfile.txt
```
**Windows**
```
aws lambda invoke --region us-east-1 --function-name arn:aws:lambda:us-east-1:361500002652:function:tcx_cli:PRD --cli-binary-format raw-in-base64-out --payload "[[\"<SAM_ACCESS_KEY>\",\"<SAM_SECRET_ACCESS_KEY>\",\"us-east-1.sws.siemens.com\"],[\"SetupDSS\",\"<SAM_ACCOUNT_ID>\",\"TcXVaultAdminPolicy\",\"TcXVaultAdminGroup\",\"TcXVaultAdminUser\"]]" outputfile.txt
```

**For dry-run environments:**

Use different names for Policy, Group and user for different dry run environments.

**Linux**
```
aws lambda invoke --region us-east-1 --function-name arn:aws:lambda:us-east-1:361500002652:function:tcx_cli:PRD --cli-binary-format raw-in-base64-out --payload '[["<SAM_ACCESS_KEY>","<SAM_SECRET_ACCESS_KEY>","us-east-1.sws.siemens.com"],["SetupDSS","<SAM_ACCOUNT_ID>","<dryrun_id>_TcXVaultAdminPolicy","<dryrun_id>_TcXVaultAdminGroup","<dryrun_id>_TcXVaultAdminUser"]]' outputfile.txt
```

**Windows**
```
aws lambda invoke --region us-east-1 --function-name arn:aws:lambda:us-east-1:361500002652:function:tcx_cli:PRD --cli-binary-format raw-in-base64-out --payload "[[\"<SAM_ACCESS_KEY>\",\"<SAM_SECRET_ACCESS_KEY>\",\"us-east-1.sws.siemens.com\"],[\"SetupDSS\",\"<SAM_ACCOUNT_ID>\",\"<dryrun_id>_TcXVaultAdminPolicy\",\"<dryrun_id>_TcXVaultAdminGroup\",\"<dryrun_id>_TcXVaultAdminUser\"]]" outputfile.txt
```

If installed correct, it should return output like the following.
```json
{
  "userGUID" : "5e50c29f13754e66a995ff332379fc36",
  "accessKey" : {
    "objectGUID" : "fdca5aa2e7ea45a8af1f797345ac265f",
    "secretAccessKey" : "B/jpfo+HRJXcShaROAj31FQ6bFk2jf9KMO+TfYcNzow="
  }
}
```
#### Important Values Needed for Customer Deployment Input JSON

This document provides essential values and their descriptions required when preparing your customer deployment input JSON file. Keep these values handy for a seamless deployment process.

| **Value to Copy**              | **Description**                                                                                   | **Parameter in Customer Input JSON File**        |
| ------------------------------ | ----------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| `customer-sam-account-id`      | The SAM Customer Account ID for your cloud Data Storage Service where Teamcenter volume is stored. This value can also be found in your email. | `DSSAccountID`                                  |
| `userGUID`                     | The user ID for the DSS service user. This user is created using the `CI-SetupDSS` command.     | `DSSUserID`                                     |
| `objectGUID`                   | The SAM Customer Account Access Key for the Data Storage Service user.                          | `DSSUserAccessKey`                              |
| `secretAccessKey`              | The SAM Customer Account Secret Access Key for the Data Storage Service user.                   | `DSSUserSecretAccessKey`                        |

---

### Add Service User for SAM API Access in Teamcenter X Customer SAM Account

This guide outlines how to add a Service User for accessing SAM APIs, enabling you to manage users with the Self-Administration feature in your Teamcenter X Customer SAM account.

> **Note:**  
> If the `GetAccountInfo` Lambda function does not work, your user may not have the correct credentials. Follow the steps below to obtain the necessary credentials.

#### Steps to Add a SelfAdmin Service User

1. **Generate the SelfAdmin Service User and Access Key**
    - Use the `SetupServiceUser` API to create a service user for Self-Administration.

2. **Provide Authentication Details**
    - Use your **Customer SAM Account credentials** for both the SAM Access Key and SAM Secret Access Key.

3. **Use the Correct Policy File**
    - The CLI command requires a JSON policy file as a parameter.
    - For creating the SelfAdmin service user, **always use** the file named `TcXSelfAdminAccessPolicy.json`.
    - **Do not modify** this parameter value.

**For customer environments:**

**Linux**
```
aws lambda invoke --region us-east-1 --function-name arn:aws:lambda:us-east-1:361500002652:function:tcx_cli:PRD --cli-binary-format raw-in-base64-out --payload '[["<SAM_ACCESS_KEY>","<SAM_SECRET_ACCESS_KEY>","us-east-1.sws.siemens.com"],["SetupServiceUser","<SAM_ACCOUNT_ID>","TcXSelfAdminPolicy","TcXSelfAdminAccessPolicy.json","TcXSelfAdminGroup","TcXSelfAdminUser"]]' outputfile.txt
```

**Windows**
```
aws lambda invoke --region us-east-1 --function-name arn:aws:lambda:us-east-1:361500002652:function:tcx_cli:PRD --cli-binary-format raw-in-base64-out --payload "[[\"<SAM_ACCESS_KEY>\",\"<SAM_SECRET_ACCESS_KEY>\",\"us-east-1.sws.siemens.com\"],[\"SetupServiceUser\",\"<SAM_ACCOUNT_ID>\",\"TcXSelfAdminPolicy\",\"TcXSelfAdminAccessPolicy.json\",\"TcXSelfAdminGroup\",\"TcXSelfAdminUser\"]]" outputfile.txt
```

**For dry-run environments:**

Use different names for Policy, Group and user for different dry run environments.

**Linux**
```
aws lambda invoke --region us-east-1 --function-name arn:aws:lambda:us-east-1:361500002652:function:tcx_cli:PRD --cli-binary-format raw-in-base64-out --payload '[["<SAM_ACCESS_KEY>","<SAM_SECRET_ACCESS_KEY>","us-east-1.sws.siemens.com"],["SetupServiceUser","<SAM_ACCOUNT_ID>","<dryrun_id>_TcXSelfAdminPolicy","TcXSelfAdminAccessPolicy.json","<dryrun_id>_TcXSelfAdminGroup","<dryrun_id>_TcXSelfAdminUser"]]' outputfile.txt
```

**Windows**
```
aws lambda invoke --region us-east-1 --function-name arn:aws:lambda:us-east-1:361500002652:function:tcx_cli:PRD --cli-binary-format raw-in-base64-out --payload "[[\"<SAM_ACCESS_KEY>\",\"<SAM_SECRET_ACCESS_KEY>\",\"us-east-1.sws.siemens.com\"],[\"SetupServiceUser\",\"<SAM_ACCOUNT_ID>\",\"<dryrun_id>_TcXSelfAdminPolicy\",\"TcXSelfAdminAccessPolicy.json\",\"<dryrun_id>_TcXSelfAdminGroup\",\"<dryrun_id>_TcXSelfAdminUser\"]]" outputfile.txt
```

If installed correctly, it should return output like the following:

```json
{
    "userGUID": "5e50c29f13754e66a995ff332379fc36",
    "accessKey": {
        "objectGUID": "fdca5aa2e7ea45a8af1f797345ac265f",
        "secretAccessKey": "B/jpfo+HRJXcShaROAj31FQ6bFk2jf9KMO+TfYcNzow="
    }
}
```
#### Reference Values for Customer Deployments

Please keep the following values available. You will need them when preparing the customer deployments input JSON file.

| Value to Copy           | Description                                                                                         | JSON Parameter Name            |
|------------------------ |----------------------------------------------------------------------------------------------------|-------------------------------|
| `customer-sam-account-id` | The SAM Customer Account ID associated with the SelfAdmin Service user. Obtain this from the provided value and related email. | `TenantSamAccountID`          |
| `userGUID`              | The user ID for the SelfAdmin service user. This user is created using the `CLI SetupServiceUser` command. | -                             |
| `objectGUID`            | The SAM Customer Account Access Key for the SelfAdmin Service user.                                  | `TenantSamAccessKey`          |
| `secretAccessKey`       | The SAM Customer Account Secret Access Key for the SelfAdmin Service user. 

---

### Generate client credentials for Teamcenter Xcelerator Proxy (TXP) and Cloud Scheduler

**Note:**
- The client credentials for Teamcenter Xcelerator Proxy (TXP) and Cloud Scheduler must be generated irrespective of whether you are provisioning a SAM 1.0 or SAM 2.0 based TcX environment.
- This section is applicable to TcX Essentials/Standard/Advanced deployments only.

#### Prerequisites

- Ensure that the CLI is configured correctly.
- Ensure that you are using the backing SAM 1.0 account credentials to generate the Teamcenter Xcelerator Proxy (TXP) and Cloud Scheduler client credentials.
- Verify that the `sam:GetAccountInfo` API returns the correct customer account (refer to the [CLI lambda usage (using aws-cli 2.1.27)](#cli-lambda-usage-using-aws-cli-2127) for guidance).

#### Steps to generate client credentials for Teamcenter Xcelerator Proxy (TXP)

1. **Generate the client credentials**  
   Use the `SetupTXP` API to set up the SAM Auth app for TXP and generate client credentials for it. This setup is necessary to be able to invoke Xcelerator services from Teamcenter using a technical user.

   Invoke the CLI command by passing in the necessary arguments as outlined below:
   - Specify your backing SAM 1.0 account credentials:
     - SAM access key
     - SAM secret access key
   - Specify the SAM Auth global host: `us-east-1.sws.siemens.com`
   - For the `SetupTXP` API:
     - Specify the customer account ID.
  
**For customer environments:**

**Linux**
```
aws lambda invoke --region us-east-1 --function-name arn:aws:lambda:us-east-1:361500002652:function:tcx_cli:PRD --cli-binary-format raw-in-base64-out --payload '[["<SAM_ACCESS_KEY>","<SAM_SECRET_ACCESS_KEY>","us-east-1.sws.siemens.com"],["SetupTXP","<SAM_ACCOUNT_ID>"]]' outputfile.txt
```

**Windows**
```
aws lambda invoke --region us-east-1 --function-name arn:aws:lambda:us-east-1:361500002652:function:tcx_cli:PRD --cli-binary-format raw-in-base64-out --payload "[[\"<SAM_ACCESS_KEY>\",\"<SAM_SECRET_ACCESS_KEY>\",\"us-east-1.sws.siemens.com\"],[\"SetupTXP\",\"<SAM_ACCOUNT_ID>\"]]" outputfile.txt
```

**For dry-run environments:**

The instructions are the same as those for customer environments.

If the command executed successfully, it should return the output as shown below.

```json
{
    "Tech_User_Auth_Client" : {
        "client_id" : "<txp-client-id>",
        "client_secret" : "<txp-client-secret>"
    }
}
```

Record the above values as they will be needed when preparing the customer deployments input JSON file.

##### Reference Values for Customer Deployments

| **Value to Copy** | **Description** | **Parameter in Customer Input JSON File** |
| - | - | - |
| `client_id` | The client ID for the TXP app that was generated above. This client ID needs to be added in the customer input JSON file as follows:<br/>TXPClientId: "\<txp-client-id\>" | `TXPClientId` |
| `client_secret` | The client secret for the TXP app that was generated above. This client ID needs to be added in the customer input JSON file as follows:<br/>TXPClientSecret: "\<txp-client-secret\>" | `TXPClientSecret` |

#### Steps to generate client credentials for Cloud Scheduler

1. **Generate the client credentials**  
   Use the `SetupCloudSchedulerIssuer` API to set up the SAM Auth app for Cloud Scheduler and generate client credentials for it. This setup is necessary to be able to invoke Teamcenter SOAs in the tenant from the Cloud Scheduler translation job processors using client credential grant flow.

   Invoke the CLI command by passing in the necessary arguments as outlined below:
   - Specify your backing SAM 1.0 account credentials:
     - SAM access key
     - SAM secret access key
   - Specify the regional host for the Scheduler service. Please refer to the following table to pick the correct regional Scheduler host.

      **Note:** It is imperative that you pick the correct regional scheduler host corresponding to the region where the tenant is deployed. Failing to do so will result in Cloud Scheduler translation job failures.

      | **Region where tenant is deployed** | **Corresponding Scheduler service host** |
      | - | - |
      | us-east-1 | us-east-1 |
      | eu-central-1 | eu-central-1 |
      | ap-northeast-1<br/>ap-northeast-2<br/>ap-south-1<br/>ap-southeast-1<br/>ap-southeast-2 | ap-northeast-1 |

   - For the `SetupCloudSchedulerIssuer` API:
     - Specify the SAM Auth global host: `us-east-1.sws.siemens.com`
     - Specify the TXP client ID and client secret that was generated in the [previous](#steps-to-generate-client-credentials-for-teamcenter-xcelerator-proxy-txp) step.
  
**For customer environments:**

**Linux**
```
aws lambda invoke --region us-east-1 --function-name arn:aws:lambda:us-east-1:361500002652:function:tcx_cli:PRD --cli-binary-format raw-in-base64-out --payload '[["<SAM_ACCESS_KEY>","<SAM_SECRET_ACCESS_KEY>","<Regional_Scheduler_Host>"],["SetupCloudSchedulerIssuer","us-east-1.sws.siemens.com","<txp-client-id>","<txp-client-secret>"]]' outputfile.txt
```

**Windows**
```
aws lambda invoke --region us-east-1 --function-name arn:aws:lambda:us-east-1:361500002652:function:tcx_cli:PRD --cli-binary-format raw-in-base64-out --payload "[[\"<SAM_ACCESS_KEY>\",\"<SAM_SECRET_ACCESS_KEY>\",\"<Regional_Scheduler_Host>\"],[\"SetupCloudSchedulerIssuer\",\"us-east-1.sws.siemens.com\",\"<txp-client-id>\",\"<txp-client-secret>\"]]" outputfile.txt
```

**For dry-run environments:**

The instructions are the same as those for customer environments.

If the command executed successfully, it should return the output as shown below.

```json
{
    "CloudSchedulerIssuerClientId" : "<cloud-scheduler-issuer-client-id>"
}
```

Record the above value as it will be needed when preparing the customer deployments input JSON file.

##### Reference Values for Customer Deployments

| **Value to Copy** | **Description** | **Parameter in Customer Input JSON File** |
| - | - | - |
| `CloudSchedulerIssuerClientId` | The client ID for the Cloud Scheduler app that was generated above. This client ID needs to be added in the customer input JSON file as follows:<br/>XAppIssuers:<br/>&nbsp;&nbsp;"\<cloud-scheduler-issuer-client-id\>"<br/>XAppUsers:<br/>&nbsp;&nbsp;"\<cloud-scheduler-issuer-client-id\>:dcproxy" | `XAppIssuers`<br/>`XAppUsers` |

---

### Configuration setup for Tenant SAM Account for specific Products

| **No.** | **Product ID** | **Product Name** | **Value/Reference** |
|---------|--------|-----------------|---------------------|
|1. | TC030406-XT | Teamcenter AI Chat | [Tenant SAM account configuration](../../../Product%20Integration%20Documentation/Teamcenter%20AI%20Chat/Tenant%20Onboarding/UTS%20Role%20Assignment#configure-tcx-ai-chat-and-visual-part-search-monitoring-for-customer-tenant) |
