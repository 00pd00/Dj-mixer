### Critical Note: Manual LDAP Data Export Required During Upgrades
The LDAP upgrade process typically involves exporting user data from the existing server and reimporting it into the new environment. To address the significant risk of data loss and ensure user data integrity, it is **critical to perform a manual export of the LDAP user data from the old server** _prior_ to commencing the upgrade and any cleanup activities. This essential proactive step establishes a robust backup, enabling full recovery should the automated export process encounter issues.

#### Exporting the LDAP users data
- Login as `tcx_user`  
  **_Command:_ `sudo su - tcx_user`**  
- Set the context:  
  ```bash
  . tcc set_context <tenantId> <envType>
  ```
- Ensure the current directory is `/administration/admin_work`.  
  **_Command:_ cd /administration/admin_work**   

- Get the LDAP password.  
  **LDAP password path from Valult:** `tcx/automation/tcss`  

- Export the LDAP data into a file (Use LDAP Password in place of 'ldap_password' in below command.)  
  If you are upgrading from 2506 or onward release use this command  
  ```bash
  tcc exec "tcxldapcli -a ldapsearch -D 'uid=admin,ou=system' -b 'ou=users,ou=system' -F 'objectclass=*' | tee /administration/admin_work/ldap_userdata_backup.ldif"
  ```
  If you are upgrading from releases older than 2506 then use this command  
  ```bash
  tcc exec "ldapsearch -x -h tc-ldap -p 10389 -D 'uid=admin,ou=system' -w <ldap_password> -b 'ou=users,ou=system' -F 'objectclass=*' | tee /administration/admin_work/ldap_userdata_backup.ldif"
  ```
