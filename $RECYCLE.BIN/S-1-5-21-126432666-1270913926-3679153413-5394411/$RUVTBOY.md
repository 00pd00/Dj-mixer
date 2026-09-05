# AWS Account Integration with Datadog

Follow these steps to connect your AWS account to Datadog. This process ensures seamless data flow and monitoring capabilities.

## 1. Choose the Correct AWS Account File

Select the AWS account file based on your environment type:

| **Environment Type** | **Repository Location** | **AWS Account File Path** |
| -------------------- | ---------------------- | ------------------------ |
| Development          | [Repository: dev](https://gitlab.industrysoftware.automation.siemens.com/cloud-operations/sre/segments/lcs/tcx-container-based/-/tree/main/dev?ref_type=heads) | [aws_accounts.json (dev)](https://gitlab.industrysoftware.automation.siemens.com/cloud-operations/sre/segments/lcs/tcx-container-based/-/blob/main/dev/cloud_integrations/aws_accounts.json?ref_type=heads) |
| Production           | [Repository: prod](https://gitlab.industrysoftware.automation.siemens.com/cloud-operations/sre/segments/lcs/tcx-container-based/-/tree/main/dev/cloud_integrations?ref_type=heads) | [aws_accounts.json (prod)](https://gitlab.industrysoftware.automation.siemens.com/cloud-operations/sre/segments/lcs/tcx-container-based/-/blob/main/prod/cloud_integrations/aws_accounts.json?ref_type=heads) |

## 2. Update the AWS Account File

1. **Check for Your AWS Account:**
   - Review the relevant `aws_accounts.json` file.
   - If your AWS account is already listed, proceed to customer onboarding.
   - Check if [AWS cccounts already onboarded to Datadog](https://pillar0-siemens.datadoghq.com/integrations?category=AWS&integrationId=amazon-web-services)
  

2. **Add Your AWS Account (If Not Present):**
   - Insert your AWS account details in the appropriate JSON file.
   - Make necessary changes in your AWS account following the instructions under the **IAM Role and Policy on AWS** section [here](https://developer.internal.siemens.com/fds/p0/sre/observability/onboarding/cloud_integrations.html).

## 3. Getting Help

If assistance is needed during the AWS integration process or to request documentation changes:

1. **Submit a Support Request:**
   - Navigate to the [FDS Service Desk](https://fdsone.atlassian.net/servicedesk/customer/portal/11).
   - Create a new ticket describing the issue or request.

2. **Contact the Support Team:**
   - For additional information about the support team and contact options, visit the [FDS SRE Contact Page](https://developer.internal.siemens.com/fds/p0/sre/contact_us/index.html).

### Sample Service Desk Ticket

Below is an example of how to structure a support ticket:

![Sample Service Desk Ticket](./image_099.png)