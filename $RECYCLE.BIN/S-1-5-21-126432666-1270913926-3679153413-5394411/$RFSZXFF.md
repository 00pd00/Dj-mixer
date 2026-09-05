> ℹ️ This step is only relevant to AP-SOUTHEAST-2 regions in AWS Deployments

## Prerequisites
- Access to the Vault UI and the appropriate permissions to edit secrets engines and roles.
- Know the target tenant namespace (for example: `tenant-id` / `prd`). 

## Steps
1. Open the Vault UI in your browser:  
   `https://vaultent.emea1.co.sws.siemens.com/ui/vault/dashboard?namespace=tcx-development_ns%2Fstorm_playground`
2. Switch to the tenant namespace level (e.g. `{"tenant-id"/"prd"}`).
3. From the left navigation bar, select **Secrets Engines**. ![Secret Engine Navigation](./image150.png) 
4. Locate and open the `aws/` secrets engine. ![AWS/ navigation](./image151.png) 
5. Find the Bedrock role and select the dropdown, then choose **Edit**. ![Bedrock Role Navigation](./image152.png) 
6. In the **Policy Document** , update the `Resource` value to: **"arn:aws:bedrock:ap-southeast-2:390403874633:inference-profile/*"**  ![Policy Document](./image153.png) 
