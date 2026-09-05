## Add the User to LDAP

After adding the user to SAM and Teamcenter, follow these steps to add the user in LDAP.

### Prerequisites

- **SSO** is enabled for the tenant deployment.
- The admin user to be configured already exists in Teamcenter.
- Retrieve the LDAP password from your tenant-specific Vault Namespace for LDAP command execution.

---

### Steps

### Steps:


1. Log in to the CorpServer as `tcx_user`

Note : Follow these steps for Azure [Login to CorpServer](../../../020_Operations/030_Day%20N%20Operations/240_Login%20to%20CorpServer.md)

2. Set the context for admin utilities:

    ```bash
    . tcc set_context <tenantId> <envType> <OS user_id of the logged-in user>
    ```
    - **Example:**  
      ```bash
      . tcc set_context prd tcx_user
      ```

3. Create a file named `new_user.ldif` in your current working directory (accessed via the `ADMIN_WORK` environment variable) and populate it with the following content:

    ```ldif
    dn: cn=<SAM_USER_ID>,ou=users,ou=system
    changetype: add
    sn: <SAM_EMAIL>
    cn: <SAM_USER_ID>
    objectClass: top
    objectClass: inetOrgPerson
    objectClass: person
    objectClass: organizationalPerson
    uid: <newTcxUsername>
    userPassword:: anVuaw==

    dn: cn=<SAM_USER_ID>,ou=users,ou=system
    changetype: modify
    replace: userPassword
    userPassword: <newTcxUserPassword>
    ```

    Replace the placeholders as follows:
    - `<SAM_USER_ID>`: user ID captured when creating the user in SAM or Service org account.
    - `<SAM_EMAIL>`: email captured from the SAM account.
    - `<newTcxUsername>`: value used as `user_name` when creating the Teamcenter user.
    - `<newTcxUserPassword>`: desired password for the new Teamcenter user.

4. Execute the following command to apply the changes in LDAP:

    ```bash
    tcc exec "tcxldapcli -a ldapmodify -h tc-ldap -p 10389 -D 'uid=admin,ou=system' -f /administration/admin_work/new_user.ldif"
    ```

5. Verify the user configuration by running:

    ```bash
    tcc exec "tcxldapcli -a ldapsearch -h tc-ldap -p 10389 -D 'uid=admin,ou=system' -b 'ou=users,ou=system' -F '(objectclass=*)'"
    ```

    The command output should enumerate all configured users in LDAP.

---

After completing all three steps (SAM, Teamcenter, LDAP), the user will be able to log in to **AWC** with DBA access.