
### Create LDAP users at the target environments

***At the source environment,***\
Get `SAM_USER_ID`, `SAM_EMAIL` and `<TeamcenterUserID>` at the source environment for the tenant that is being migrated.

***At the target environment,***\
1. Log in to the EC2 machine in the tenant VPC as `tcx_user`.

2. Set context for `adminutils` as given below:
    ```bash
    . tcc set_context <tenantId> <envType> <OS user_id of the logged-in user>
    ```
    Example:
    ```bash
    . tcc set_context 12345 prd tcx_user
    ```

3. Map the Teamcenter user to the SAM user in LDAP:
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
      uid: <TeamcenterUserID>
      ```
    - Update the placeholders `SAM_USER_ID`, `SAM_EMAIL` and `<TeamcenterUserID>` in the `username.ldif` file with appropriate values.There needs to be one entry for each users in the tenant

4. Execute the following `tcc` command to update LDAP with the above information to enable SSO login for the users:
    ```bash
    tcc exec 'ldapmodify -x -h tc-ldap -p 10389 -D \"uid=admin,ou=system\" -w <ldap_password_vault> -a -f username.ldif'
    ```
---
