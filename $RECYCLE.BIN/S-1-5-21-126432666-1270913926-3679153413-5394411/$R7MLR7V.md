
#### On-board Teamcenter X Operating Users

1. Following steps need to be executed to add a user to operating sam account if not added already. And this user credential will be referenced for tcxadmin creation in LDAP.  
2. Create SAM users in this SAM account.
    - Login to SAM console using:  Sam console Login 
    - Add user to this account.
    ![Image](./image_93.png)

        Click the + button to display Create User form
        ![Image](./image_94.png)
        Fill in the email address of the the Siemens managed employee to add. Then click Create User.
    - Add the user to the Administrator group. This allows access to admin-level API to administer other users. 
        ![Image](./image_95.png)

        Note: This Administrator group is created by default when a new SAM account is created and should have the following policy.
        ![Image](./image_96.png)



- Add AdminConsoleAccessProviderPolicy policy too if not added already. This is needed so users in Administrator group can login to SamAuth console.
- Once created, verify that the newly created user can login to this SAM Account via the SAM Console using the user's personal WebKey credential.

**Note:**
This user's userId and email will be needed in section [Pipeline > Tenant Onboarding > Pre-Reqs > Customer input](../../../../010_Tenant%20Onboarding/010_Pre-Reqs/020_Ansible%20Template%20Input/000_Ansible%20Template%20Input.md):  for parameters "DefaultUserSamId", "TcXAdminEmail".
