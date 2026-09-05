# IAM Credentials Updation in Hashicorp Vault

1. Log into Hashicorp Vault UI [Vault UI Log In](https://ctcx.code.siemens.io/cookbook/docs/2506/Documentation/Cell-Setup/Automation%20Prerequisites/Tools%20Setup/Vault%20Setup/)
2. Switch to the tenant namespace level (e.g. `{"tenant-id"/"prd"}`).
3. Navigate to the following secrets location - `tcx/automation/tcaichat` ![TC AI Chat Secrets](../image_501.png)
4. Update the following secrets with the new IAM Credentials (Unencrypted) `tc_aichat_iam_user_access_key` and  `tc_aichat_iam_user_secret_access_key` by clicking on **Create new version** ![Create new version](../image_502.png)
5. Update the keys as shown in the image, then click on Save. ![Save Updated Keys](../image_503.png)
6. Navigate to the following secrets location - `Teamcenter/QnA` 
7. Update the secrets `secret key` and `access key` by repeating previous steps. ![Update QnA secrets](../image_504.png)

<!-- TODO: Polrion item id - LCS-1279894 https://mypolarion.industrysoftware.automation.siemens.com/polarion/redirect/project/Teamcenter/workitem?id=LCS-1279894 -->