# Hashicorp Vault access for operator users

​​**Note: - The steps in this section are not mandatory, they are to be used only to access secrets in Hashicorp Vault**
​​
Secrets need to be accessed from the vault for day n operations like password rotation, reading passwords for ldap or more secrets.

​​
For this we have created 2 roles through the automation with read and read/write access to vault. The roles has to be accessed accordingly for read or read/write operations.

## AWS: 
These roles can be only assumed by the admin AWS IAM role (Which are mentioned in the input parameters with the variable "AdminReadAccessRoleArn" for read access  or "AdminReadWriteAccessRoleArn" for read/write access).

## Azure: 
1. **Request Access** 
    - **Dev**: Send a [request](https://teams.microsoft.com/l/entity/7c316234-ded0-4f95-8a83-8453d0876592/approvals/?context=%7B%22subEntityId%22%3A%220M8KTZX7YZETRG5VY3JJBJG21PFCTEXE71WSBN2FNQDB8BGMJQANMW6MGKME50JP9YZMKEMBYA5W5N0%3A%3AshareLink%3A%22%7D) to be added to the `TcX DeployOps Provisioners` group for Dev setup. 
    - **DryRun/Prod**: Send a request to be added to the `TcX DeployOps Provisioners` group as per your group owners. 
    
2. **Activate Provisioner Role**  
    - Log in to the Azure Portal using the SPLM tenant.  
    - Activate the PIM roles corresponding to your setup type:  
        - **Dev**: Activate the `Provisioner` role (e.g., `TcX DeployOps Provisioners`).  
        - **DryRun/Prod**: Activate the `[subscription-name]-TenantSP-Readers` role.

3. **Access Vault UI**
    - Open the Vault UI:  
      - **Dev**: https://vaultent.emea1.co.sws.siemens.com/ 
      - **Prod**: https://vault.xcr.gblsvcs01eu.prod.eu-central-1.kaas.sws.siemens.com
    - Enter the namespace:  
      - **Dev**: `tcx-development_ns/storm_playground`  
      - **Prod**: `caps-tcx-production_ns`  
    - Set the login method to `OIDC`.

4. **Add Role Name**  
    - Use the role name format: `VaultOperatorReadTenantSPAccessRole-<sub-id-prefix>-<env-tenant-id>` (e.g., `VaultOperatorReadTenantSPAccessRole-0ef-tcxagt08`).

5. **Log In to Vault UI**  
    - In the pop-up, log in using the SPLM tenant to access the Vault UI.

6. **Access CLI**  
    - Click the CLI icon in the top-left corner of the Vault UI.
    ![Image](./image_457.png)

7. **Retrieve Credentials**  
    - Execute the following command:  
      ```bash
      vault read <azure-secret-engine>/creds/<tenant-id>-<environment>-service-principal
      ```  
      ![Image](./image_458.png)
    - This will provide the `Client ID` and `Client Secret`.

You now have the Tenant SP credentials.