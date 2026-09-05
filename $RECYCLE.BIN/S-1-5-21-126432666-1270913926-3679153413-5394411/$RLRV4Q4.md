
Steps to login to CorpServer : 

1. Activate your Contributor access by activating the Operator Group assignment on the target `AZURE_SUBSCRIPTION_ID`.

2. Navigate to tcx-tenant-< tenant >-< env-type >-rg

3. Search for CorpServer under resources. 

4. Connect via Bastion 

![Image](./image_373.png)

5. Authentication Type : SSH Private Key from Local File 

   Username : < username >

   Local File : < Follow steps below >

   Retrieve the `<azure user password>` in a file from the tenant vault namespace using the steps below:  

For non-tcx users : 

i. Login to the vault using the tenant namespace.  
      **Vault URL:** (Prod) "https://vault.xcr.gblsvcs01eu.prod.eu-central-1.kaas.sws.siemens.com" / (Non-prod) "https://vaultent.emea1.co.sws.siemens.com/"  
      Provide the tenant-specific namespace during login, e.g., `<tcx-development_ns/storm_playground/release1/prd>`.  

ii. Navigate to the dashboard of the tenant-specific namespace.  

iii. For non tcx-user , Click on `secret/` and navigate to the path: `tcx/automation/servers/keypair`.  
     a. Download the `vm_keypair` by clicking the second (download) icon in the value column. Use this file to login.

![Image](./image_374.png)

iv. For tcx-user , Click on `secret/` and navigate to the path: `tcx/automation/servers/os_users`.  
     a. Download the `tcx_user_password` by clicking the second (download) icon in the value column. Use this file to login.

![Image](./image_375.png)




