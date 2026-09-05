## LDAP configuration for additional non-admin users to be added (Optional - Needed only for NON-PROD)

### Prerequisite:
- SSO is enabled for the tenant deployment.
- User to be configured should not be existing in the Teamcenter environment.
- LDAP password should be fetched from the tenant-specific Vault Namespace. This will be needed for LDAP command execution.

### Steps to create a user in SAM console:
1. Login to SAM console using [SAM Console](https://samconsole.us-east-1.sws.siemens.com/).
    ![SAM Console Login](./image_341.png)

2. Add the user to this account. Click the `+` button to display the **Create User** form.
    ![Create User Form](./image_342.png)

3. Fill in the email address of the Siemens-managed employee to add. Then click **Create User**.

4. Once created, verify if the newly created user can log in to this SAM Account via SAM Console using their WebKey credential.

5. Click on the user in the user list to get the required details for LDAP entry in the steps below. You will need the `userId` and `Email` for LDAP mapping to enable SSO login for the newly created user.
    ![User Details](./image_343.png)

### Capture the SAM user ID and email details:
Example:
- **User Id (SAM_USER_ID):** 13cc8664e67849a7959ec734575036d4
- **Email (SAM_EMAIL):** vikram.rakhe@siemens.com

---

### Steps to configure additional admin users in LDAP:
1. Log in to the CorpServer machine in the tenant resources as `tcx_user`.

2. Set the context for `adminutils` as given below:
    ```bash
    . tcc set_context <tenantId> <envType> <OS user_id of the logged-in user>
    ```
    Example:
    ```bash
    . tcc set_context 12345 prd tcx_user
    ```

3. Create a Teamcenter user:
    ```bash
    tcc exec 'make_user -u=infodba -pf=$TC_SECURITY_DIR/default_infodba.pwf -g=dba -user=<newTcxUsername> -password=<newTcxUserPassword> -group=<newTcxUserGroupName> -person=<newTcxUsername>'
    ```

4. Map the Teamcenter user to the SAM user in LDAP:
    - Create a file `username.ldif` in the current working directory (pointed to by `ADMIN_WORK` env variable) with the following contents:
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
    - Replace the placeholders `<newTcxUsername>` and `<newTcxUserPassword>` in the `username.ldif` file with appropriate values.

5. Execute the following `tcc` command to update LDAP with the above information to enable SSO login for the newly created user:
    ```bash
    tcc exec "tcxldapcli -a ldapmodify -h tc-ldap -p 10389 -D 'uid=admin,ou=system' -f username.ldif"
    ```

6. Verify that the above steps executed properly and the LDAP entry for the newly created user is present in LDAP:
    ```bash
    tcc exec "tcxldapcli -a ldapsearch -h tc-ldap -p 10389 -D 'uid=admin,ou=system' -b 'ou=users,ou=system' -F '(objectclass=*)'"
    ```

---
Now you can log in to Teamcenter using the newly created user via SSO.

