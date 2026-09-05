# TCX Usage Reports

This guide explains how to set up and configure the Usage Reporting Lambda, which provides detailed usage information for file storage and database storage. The lambda accesses CloudWatch metrics to report on RDS and FSx usage within customer accounts. For accurate reporting, a specific IAM role must be created in each customer account to allow the lambda function to read these metrics.

---

## Customer Onboarding

### Generate Report Admin Key

Before you can generate usage reports, you need to set up administrative credentials. This section explains how to use the `SetupServiceUser` Lambda API to generate the necessary service user credentials.

#### Prerequisites

- **AWS CLI**: Must be installed and configured with valid credentials using `aws configure`.
  - On Linux, AWS CLI is usually pre-installed.
  - You may also use a session token (`aws sts assume-role`) if needed.
- **Lambda Access**: Your AWS account must have access to  
  `arn:aws:lambda:us-east-1:361500002652:function:tcx_cli:PRD`.  
  Contact the CApS team to request access if necessary.
- **Tenant SAM Account Credentials**: You need the `SAM_ACCESS_KEY` and `SAM_SECRET_ACCESS_KEY` for the tenant.

#### Procedure (Customer Environments)

1. Open your terminal (Linux) or Command Prompt (Windows).
2. Use the following command to invoke the lambda function and generate the report admin key:

   **Linux:**
   ```bash
   aws lambda invoke --region us-east-1 --function-name arn:aws:lambda:us-east-1:361500002652:function:tcx_cli:PRD --cli-binary-format raw-in-base64-out --payload '[["<SAM_ACCESS_KEY>","<SAM_SECRET_ACCESS_KEY>","us-east-1.sws.siemens.com"],["SetupServiceUser","<SAM_ACCOUNT_ID>","TcXReportAdminPolicy","TcXReportAdminAccessPolicy.json","TcXReportAdminGroup","TcXReportAdminUser"]]' outputfile.txt
   ```

   **Windows:**
   ```bash
   aws lambda invoke --region us-east-1 --function-name arn:aws:lambda:us-east-1:361500002652:function:tcx_cli:PRD --cli-binary-format raw-in-base64-out --payload "[[\"<SAM_ACCESS_KEY>\",\"<SAM_SECRET_ACCESS_KEY>\",\"us-east-1.sws.siemens.com\"],[\"SetupServiceUser\",\"<SAM_ACCOUNT_ID>\",\"TcXReportAdminPolicy\",\"TcXReportAdminAccessPolicy.json\",\"TcXReportAdminGroup\",\"TcXReportAdminUser\"]]" outputfile.txt
   ```

#### Procedure (Dry-run Environments)

For dry-run environments, use unique names (with a `<dryrun_id>`) for Policy, Group, and User.

- **Linux:**
  ```bash
  aws lambda invoke --region us-east-1 --function-name arn:aws:lambda:us-east-1:361500002652:function:tcx_cli:PRD --cli-binary-format raw-in-base64-out --payload '[["<SAM_ACCESS_KEY>","<SAM_SECRET_ACCESS_KEY>","us-east-1.sws.siemens.com"],["SetupServiceUser","<SAM_ACCOUNT_ID>","<dryrun_id>_TcXReportAdminPolicy","TcXReportAdminAccessPolicy.json","<dryrun_id>_TcXReportAdminGroup","<dryrun_id>_TcXReportAdminUser"]]' outputfile.txt
  ```

- **Windows:**
  ```bash
  aws lambda invoke --region us-east-1 --function-name arn:aws:lambda:us-east-1:361500002652:function:tcx_cli:PRD --cli-binary-format raw-in-base64-out --payload "[[\"<SAM_ACCESS_KEY>\",\"<SAM_SECRET_ACCESS_KEY>\",\"us-east-1.sws.siemens.com\"],[\"SetupServiceUser\",\"<SAM_ACCOUNT_ID>\",\"<dryrun_id>_TcXReportAdminPolicy\",\"TcXReportAdminAccessPolicy.json\",\"<dryrun_id>_TcXReportAdminGroup\",\"<dryrun_id>_TcXReportAdminUser\"]]" outputfile.txt
  ```

#### Result

If the process succeeds, you will receive output similar to:

```json
{
    "userGUID": "5e50c29f1375.......2379fc36",
    "accessKey": {
        "objectGUID": "fdca5....................65f",
        "secretAccessKey": "B/j.........................+TfYcNzow="
    }
}
```

Keep the following values for future steps:

| Value to Copy       | Description                                                | Parameter Name (Key)              |
|---------------------|-----------------------------------------------------------|-----------------------------------|
| objectGUID          | Access key ID of the Report Admin Service user            | `ACCESS_KEY_ID_<region>`          |
| secretAccessKey     | Secret access key of the Report Admin Service user        | `SECRET_ACCESS_KEY_ID_<region>`   |

---

### Configure Parameter Store

AWS Parameter Store is used to store service user credentials and URLs for each tenant. The Report Lambda will call Zeus DSS/UTS APIs using these details to obtain usage data for DSS Vaults.

#### Steps

1. For each tenant, create parameters in AWS Systems Manager (SSM) Parameter Store using the format below:

   | Parameter Name |
   | -------------- |
   | `/siemens/zeus-lambda/<customer_id>/ACCESS_KEY_ID_<region>` |
   | `/siemens/zeus-lambda/<customer_id>/SECRET_ACCESS_KEY_ID_<region>` |
   | `/siemens/zeus-lambda/<customer_id>/DSS_URL_<region>` |
   | `/siemens/zeus-lambda/<customer_id>/UAS_URL_<region>` |

   Replace `<customer_id>` and `<region>` with the appropriate values.

2. Example entry, with `customer_id` as `tcx148us`:

   | Parameter Name                                         | Value                                         |
   |--------------------------------------------------------|-----------------------------------------------|
   | /siemens/zeus-lambda/tcx148us/ACCESS_KEY_ID_us-east-1  | Access key id for DSS service user, us-east-1 |
   | /siemens/zeus-lambda/tcx148us/SECRET_ACCESS_KEY_ID_us-east-1 | Secret access key for DSS user, us-east-1     |
   | /siemens/zeus-lambda/tcx148us/DSS_URL_us-east-1        | https://dss.us-east-1.sws.siemens.com         |
   | /siemens/zeus-lambda/tcx148us/UAS_URL_us-east-1        | https://uas.us-east-1.sws.siemens.com         |
   | /siemens/zeus-lambda/tcx148us/ACCESS_KEY_ID_eu-central-1  | Access key id, eu-central-1 region            |
   | /siemens/zeus-lambda/tcx148us/SECRET_ACCESS_KEY_ID_eu-central-1 | Secret key, eu-central-1 region           |
   | /siemens/zeus-lambda/tcx148us/DSS_URL_eu-central-1     | https://dss.eu-1.sws.siemens.com              |
   | /siemens/zeus-lambda/tcx148us/UAS_URL_eu-central-1     | https://uas.eu-1.sws.siemens.com              |

**Note:** Repeat these steps for every supported region.

---

### Prepare `deployments_sample.json`

This file contains deployment and tenant mapping data. Use the `deployments_sample.json` included in `report-lambda-<version>.zip` as a template.

#### Steps

1. Create a JSON file with the following structure:

   ```json
   {
       "account_id": "CHANGE_ME",
       "company": "CHANGE_ME",
       "customer_id": "CHANGE_ME",
       "deployment_status": "COMPLETE",
       "plpaas_region": "CHANGE_ME"
   }
   ```

   | Parameter         | Description                                                                                |
   |-------------------|--------------------------------------------------------------------------------------------|
   | account_id        | Tenant AWS account ID, or use `"Null"` if deployed in Azure                               |
   | company           | Customer name as specified during deployment                                               |
   | customer_id       | Customer ID as specified during deployment (also found in XCR and AWS resource tags)       |
   | plpaas_region     | Region where the customer stack is deployed; applies to DSS and AWS regions as well        |
   | deployment_status | Must be `"COMPLETE"`. Other values will exclude this deployment from the usage report      |

2. **Example:** `deployments_sample.json` for one environment:

   ```json
   [
       {
           "account_id": "906956190433",
           "company": "361_SISW",
           "customer_id": "1159297a",
           "deployment_status": "COMPLETE",
           "plpaas_region": "eu-central-1"
       }
   ]
   ```

3. Upload the completed JSON file to the S3 bucket created during the initial deployment of the TcX Usage Report Lambda.  
   Ensure the file name matches the value of the `DEPLOYMENTS_JSON_FILE` environment variable.

---

### Validation

TBD (To Be Defined)
