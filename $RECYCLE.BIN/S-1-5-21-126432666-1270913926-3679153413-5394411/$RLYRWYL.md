
##### Validate Subscription Quota

1. Open a Bash Cloud Shell in Azure.

    Validate that the Subscription has the correct quota id:

    ```bash
    az account set -s [subscription_id]
    az account subscription show --id $(az account show --query id -o tsv)
    ```

    Expected sample output:

    ```bash
    {
        "authorizationSource": "RoleBased",
        "displayName": "NonProd 46 - TcXonAz Preprod MCA",
        "id": "/subscriptions/888b0468-c8c4-4e39-915f-9f9fcc38040a",
        "state": "Enabled",
        "subscriptionId": "888b0468-c8c4-4e39-915f-9f9fcc38040a",
        "subscriptionPolicies": {
            "locationPlacementId": "Public_2014-09-01",
            "quotaId": "EnterpriseAgreement_2014-09-01",
            "spendingLimit": "Off"
        }
    }
    ```

    If the 'quotaId' in the output is not "EnterpriseAgreement_2014-09-01", raise a snow ticket [link](https://diswsiemens.service-now.com/sp?id=sc_cat_item&table=sc_cat_item&sys_id=ac92488bdb2051507571c3440596191b&searchTerm=Azure%20Subscription). Refer below details for adding details to the ticket: 
         
    | Argument | Value |
    | ------ | ------ |
    |  Requested for      |    &lt;&lt; Example : Mehta , Aishwarya &gt;&gt;    |
    |  Requested by       |    &lt;&lt; Example : Mehta, Aishwarya &gt;&gt;    |
    | Group/Project Name  |   &lt;&lt; Your Group/ team name &gt;&gt;      |
    | Group/Project Description | This ticket is a follow-up on <br/> Ticket Number: &lt;Ticket number of the subscription request raised using [this](../../../../../../CTCX-Intro/000_Introduction%20and%20Scope/002_AZURE/000_Request%20an%20Azure%20Subscription.md#request-an-azure-subscription) form &gt;.<br/> A wrong Quota ID has been assigned to the subscription. <br/>Subscription ID : &lt; Subscription ID &gt; <br/>The subscription must be assigned to the "TcX MCA Azure Credits" contract. And QuotaID set as EnterpriseAgreement_2014-09-01    |
    | SaaS Product |     TeamcenterX   |  
    | UPMX Application ID |   APM0414533      |
    | Account Type  |  For Dev: Test/Dev <br/> For Prod Env:"Production" <br/> For UAT Env: "PreProduction" |
    | Product Owner (PO) |   Darbha, Anantha (DI SW PLM LCS PRM F&PE CLS)   |
    | Product & Solution Security Officer (PSSO) |      Dominique, Laura (DI SW PLM LCS DEVOPS PSSO)    |
    | Product & Solution Security Expert (PSSE) |   Collar, Ben (DI SW PLM LCS CF)    |
    | Cost Center  |     &lt;&lt; Your cost centre &gt;&gt;       |
    | ARE Number   |   &lt;&lt; Your ARE number &gt;&gt;         |
    | Account Administrator 1 Name (owner role) |  &lt;&lt; Admins for your subscription &gt;&gt;     |   
    | Account Administrator 2 Name (owner role)  |  &lt;&lt; Admins for your subscription &gt;&gt;    |
    | Watch List  |   taylor.ford@siemens.com;benjamin.justus@siemens.com;todd.sanders@siemens.com      |

---

2. Validate the limits set for critical resources:

    **Note** : 
   - In the commands below, replace `<region>` with the Azure region you are using (for example, eastus).
    - Please update the quotas to higher limits based on actual usage. The values provided here are only initial starting numbers.
    

    | Resource | Provider | Expected Limit | Azure CLI Command to Check Limit |
    |----------|----------|----------------|----------------------------------|
    | Total Regional VCores | Microsoft.Compute | 1000 | `az vm list-usage --location <region> --query "[?name.value=='cores'].limit"` |
    | VCore for Premium Series Memory Optimized SQL Managed Instance | Microsoft.Sql | 1500 | `az sql list-usages --location <region> --query "[?name=='VCoreQuota'].limit \| [0]"` |
    | Subnet for Premium Series Memory Optimized SQL Managed Instance | Microsoft.Sql | 100 | `az sql list-usages --location <region> --query "[?name=='SubnetQuota'].limit \| [0]"` |
    | Route Tables | Microsoft.Network | 200 | `az network list-usages --location <region> --query "[?name.value=='RouteTables'].limit"` |
    | NetApp AccountsPerSubscription | Microsoft.NetApp | 60 | `az netappfiles quota-limit list --location <region> -o table 2>/dev/null ` |
    | NetApp totalTiBsPerSubscription | Microsoft.NetApp | 100 | `az netappfiles quota-limit list --location <region> -o table 2>/dev/null ` |
    | Standard MS Family vCPUs | Microsoft.Quota | 1000 | `az quota show --scope "/subscriptions/$(az account show --query id -o tsv)/providers/Microsoft.Compute/locations/eastus" --resource-name StandardMSFamily --query "properties.limit.value" -o tsv` |
  
    If any of the above limits do not match expected limit, raise a support request with Microsoft.

###### Steps to Increase the limit

1. Sign in to the Azure Portal.
    - Go to https://portal.azure.com and sign in with your SPLM account.
2. Activate your membership in the entra group `[subscription name]-Provisioners`, through [PIM](../../../../../../CTCX-Intro/010_Containerized%20TcX%20Architecture%20Overview/020_AZURE/030_Activating%20Roles%20and%20Groups%20via%20PIM.md)
3. Navigate to your Subscription.
4. On the left sidebar, click on "Support + Troubleshooting".
5.Search for "Limit of Resource"
    - Select "Service and subscription limits (quotas)" then click "Next" and click on "create a new support request".
    ![alt text](image-10.png)

###### 1. Total Regional VCores:
   
1. Follow the 1st and 2nd and 3rd steps from [Steps to Increase the limit](#steps-to-increase-the-limit) then Open Usage + Quotas:
    - Under the "Settings" section, click on "Usage + Quotas".
2. Search for Total Regional vCPUs:
        - Select Total Regional vCPUs for your region.
3. Click on Request Adjustment:    
        
    ![alt text](image.png)	 
4. Set New vCore Limit and click on submit:
        - Enter the desired vCore limit (e.g., 1000).

    ![alt text](image-1.png)

###### 2. VCore for Premium Series Memory Optimized SQL Managed Instance" and "Subnet for Premium Series Memory Optimized SQL Managed Instance".

1.  Follow the all steps from [Steps to Increase the limit](#steps-to-increase-the-limit) then Provide Details for the Request and Click "Next":
    - Issue Type: Select "Quota".
    - Subscription: Choose the subscription for which you want to increase the vCore and subnet limits.
    - Quota Type: Choose SQL Database Managed Instance.
2. Click on "Enter details", select your region, set the new limit, then click on "Save and Continue", click "Next" and create the request.
        
    ![alt text](image-3.png)

###### 3. Route Tables 
    
1. Follow all the steps outlined in "vCore for Premium Series Memory Optimized SQL Managed Instance," choose "Quota Type = Networking" and provide the details as shown in the image and create request.

    ![alt text](image-5.png)
    
###### 4. NetApp AccountsPerSubscription

**Note**:Increase limit based on subscription usage.
1. Follow the steps from [Steps to Increase the limit](#steps-to-increase-the-limit) then Provide Details for the Request and Click "Next":
    - Issue Type: Service and subscription limits (quotas)
    - Subscription: Choose the subscription 
    - Quota Type: Storage: Azure NetApp Files limits
2. Click on enter details, Set the new limit, then click on "Save and Continue",click "Next" and create the request
        
    ![alt text](image-9.png)

###### 5. NetApp TotalTiBsPerSubscription

**Note**:Increase limit based on subscription usage
    
1. Follow the steps from [Steps to Increase the limit](#steps-to-increase-the-limit) then Provide Details for the Request and Click "Next":
    - Issue Type: Service and subscription limits (quotas)
    - Subscription: Choose the subscription 
    - Quota Type: Storage: Azure NetApp Files limits
2. Click on enter details, Set the new limit, then click on "Save and Continue",click "Next" and create the request
        ![alt text](image-11.png)

###### 7. Standard MS Family vCPUs:
   
1. Follow the 1st and 2nd and 3rd steps from [Steps to Increase the limit](#steps-to-increase-the-limit) then Open Usage + Quotas:
    - Under the "Settings" section, click on "Usage + Quotas".
2. Search for "Standard MS Family vCPUs" 
    - Select Standard MS Family vCPUs for your region.
3. Click on Request Adjustment:   
    
    ![alt text](image-12.png)	

4.	Set New Limit and click on submit:
    - Enter the desired Standard MS Family vCPUs limit (e.g., 100).

    ![alt text](image-13.png)
    