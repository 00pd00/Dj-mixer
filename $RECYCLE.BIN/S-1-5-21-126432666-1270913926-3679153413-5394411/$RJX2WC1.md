
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
    | Group/Project Description | This ticket is a follow-up on <br/> Ticket Number: &lt;Ticket number of the subscription request raised using this&gt; [form](../../../../../../CTCX-Intro/000_Introduction%20and%20Scope/002_AZURE/000_Request%20an%20Azure%20Subscription.md#request-an-azure-subscription).<br/> A wrong Quota ID has been assigned to the subscription. <br/>Subscription ID : &lt; Subscription ID &gt; <br/>The subscription must be assigned to the "TcX MCA Azure Credits" contract. And QuotaID set as EnterpriseAgreement_2014-09-01    |
    | SaaS Product |     TeamcenterX   |  
    | UPMX Application ID |   APM0414533      |
    | Account Type  |  For Dev: Test/Dev <br/> For Prod Env:"Production" <br/> For UAT Env: "PreProduction"    |
    | Product Owner (PO) |   Darbha, Anantha (DI SW PLM LCS PRM F&PE CLS)   |
    | Product & Solution Security Officer (PSSO) |      Dominique, Laura (DI SW PLM LCS DEVOPS PSSO)    |
    | Product & Solution Security Expert (PSSE) |   Collar, Ben (DI SW PLM LCS CF)    |
    | Cost Center  |     &lt;&lt; Your cost centre &gt;&gt;       |
    | ARE Number   |   &lt;&lt; Your ARE number &gt;&gt;         |
    | Account Administrator 1 Name (owner role) |  &lt;&lt; Admins for your subscription &gt;&gt;     |   
    | Account Administrator 2 Name (owner role)  |  &lt;&lt; Admins for your subscription &gt;&gt;    |
    | Watch List  |   taylor.ford@siemens.com;benjamin.justus@siemens.com;todd.sanders@siemens.com      |
