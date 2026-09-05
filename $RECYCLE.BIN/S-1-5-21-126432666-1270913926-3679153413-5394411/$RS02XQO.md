## LDAP configuration for additional admin users to be added (Optional - Needed only for SSO)

### Prerequisite:
- SSO is enabled for the tenant deployment.
- Admin user to be configured already exists in Teamcenter.
- LDAP password should be fetched from the tenant-specific Vault Namespace. This will be needed for LDAP command execution.

### Steps for configuring additional admin users in LDAP:
1. **Log in to the CorpServer machine in the tenant resources as `tcx_user`.**

2. **Set context for adminutils as given below:**
    ```bash
    . tcc set_context <tenantId> <envType> <OS user_id of the logged-in user>
    ```
    Example:
    ```bash
    . tcc set_context prd tcx_user
    ```
3. Create a Teamcenter user if it does not exits:
    ```bash
    tcc exec 'make_user -u=infodba -pf=$TC_SECURITY_DIR/default_infodba.pwf -g=dba -user=<adminUser> -password=<adminUserPassword> -group=<adminUserGroupName> -person=<adminUsername>'
    ```

4. **Create a file `newadmin_user.ldif` in the current working directory (pointed to by `ADMIN_WORK` env variable) with the following contents:**
    ```ldif
    dn: cn=<adminuser>,ou=users,ou=system
    changetype: add
    sn: <adminuser>
    cn: <adminuser>
    objectClass: top
    objectClass: inetOrgPerson
    objectClass: person
    objectClass: organizationalPerson
    uid: <adminuser>
    userPassword:: anVuaw==

    dn: cn=<adminuser>,ou=users,ou=system
    changetype: modify
    replace: userPassword
    userPassword: <adminuserpwd>
    ```
    - Replace the placeholders `<adminuser>` and `<adminuserpwd>` in the `newadmin_user.ldif` file with appropriate values.

5. **Execute the following `tcc` command:**
    ```bash
    tcc exec "tcxldapcli -a ldapmodify -h tc-ldap -p 10389 -D 'uid=admin,ou=system' -f /administration/admin_work/newadmin_user.ldif"
    ```

6. **Verify the configuration by executing the following `tcc` command:**
    ```bash
    tcc exec "tcxldapcli -a ldapsearch -h tc-ldap -p 10389 -D 'uid=admin,ou=system -b 'ou=users,ou=system' -F '(objectclass=*)'"
    ```

7. **Check the command output:**
    - The output should display all configured users in LDAP.
