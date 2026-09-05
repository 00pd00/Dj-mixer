
### Fixing LDAP entries in essentials 14.3 deployment

Fixing LDAP entries in essentials 14.3 deployment: (Execute the below command on the 14.3 environment)  
In the 14.3 environment, `sn` and `cn` of users added by the admin console are base64 encoded.  

- Login as `tcx_user`
  **_Command:_ `sudo su - tcx_user`**  
- Set the context:  
  ```bash
  . tcc set_context <tenantId> <envType>
  ```
- Ensure the current directory is `/administration/admin_work`.
  **_Command:_ cd /administration/admin_work**   
- Download the utility script from `tcx-release-management-<dev/preprod/prod>` bucket:  
  - `Utility/ldap_data_fix_util/data_fix_ldap.sh` 
    _Command:_ `aws s3 cp s3://tcx-release-management-dev/Utility/ldap_data_fix_util/data_fix_ldap.sh .` 
  - `Utility/ldap_data_fix_util/ldap_data_fix.py`
    _Command:_ `aws s3 cp s3://tcx-release-management-dev/Utility/ldap_data_fix_util/ldap_data_fix.py .`  
- Change the permission of `data_fix_ldap.sh` to `755`:  
  ```bash
  chmod 755 data_fix_ldap.sh
  ```
- Execute `data_fix_ldap.sh`:  
  ```bash
  ./data_fix_ldap.sh
  ```
- Enter the LDAP password.
  **LDAP password path from Valult:** `tcx/automation/tcss`  
- After successful execution, entries will be fixed.  
- Refer to `exported_user.ldif` for a backup of existing LDAP entries.  

    ![Image](./image_376.png)