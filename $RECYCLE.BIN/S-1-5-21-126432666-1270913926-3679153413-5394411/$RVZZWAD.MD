


##### Request update transit gateway IAM Role in TcX Cell Administrative Service Account

**Note:** These steps are to be performed by the Deploy Ops team, so just send an email to the Deploy Ops team to whitelist your account.  

Drop an email to the Deploy Ops team as mentioned below:  

| Field | Value |
|-------|--------|
| To | deployops.tc.lcs.disw@internal.siemens.com |
| cc | yuvraj.chaudhari@siemens.com; pravin.magdum@siemens.com |
| Mail Subject | TCX: Requesting update transit gateway IAM role in TcX Cell Administrative Service Account |
| Mail Body | Requesting to update transit gateway IAM role in TcX Cell Administrative Service Account: "arn:aws:iam::[Account ID]:root" |

Where `<Account ID>` is the TcX Tenant Administrative Account where the customer is being deployed.

Here are the steps for Deploy Ops to update the Transit Gateway IAM role in the TcX Cell Administrative Service Account:  
1. Sign into the AWS Management Console of the TcX Cell Administrative Account.  
2. In the navigation pane of the console, choose **Roles** and then search for the role: `tcx-container-deploy-ops-CSC-CIRole`.  
3. Choose the role and click on **Trust Relationship**.  
4. Click on **Edit the trust policy**. Find the statement like below.  

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "AWS": [
                    "arn:aws:iam::906956190433:root",
                    "arn:aws:iam::482926177591:root",
                    "arn:aws:iam::<YourTenantAWSAccount>:root"
                ]
            },
            "Action": "sts:AssumeRole",
            "Condition": {
                "StringEquals": {
                    "sts:ExternalId": "CellAccountForTGW"
                }
            }
        }
    ]
}
```
5. Update the Principal list by replacing the placeholder `<YourTenantAWSAccount>` with the Account ID of your TcX Tenant AWS Account.  
6. Resolve any security warnings, errors, or general warnings generated during policy validation, and then choose **Update Policy**.