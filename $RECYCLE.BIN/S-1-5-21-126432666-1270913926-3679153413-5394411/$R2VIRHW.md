### Applicable Product IDs
**Applicable Product IDs:** : TC030226-XT

### SAMAuth Configurations

Refer to the [SAMAuth section of the cookbook](https://ctcx.code.siemens.io/cookbook/docs/2506/Documentation/Tenant%20Onboarding/Enable%20xApps%20Integration%20with%20Teamcenter%20X/SAMAuth%20Application%20registration%20to%20generate%20client_id%20and%20secret%20for%20XApps/) to generate `client_id` and secrets.

1. **Create Client Credential Application**  
   See [Step 3](https://ctcx.code.siemens.io/cookbook/docs/2506/Documentation/Tenant%20Onboarding/Enable%20xApps%20Integration%20with%20Teamcenter%20X/SAMAuth%20Application%20registration%20to%20generate%20client_id%20and%20secret%20for%20XApps/#3-samauth-app-registration-for-client-credentials-grant-type) to create Client Credential Application and share the client credential JSON with the customer for configuration.

2. Create a Teamcenter Service account user. Please refer to [Creation of Teamcenter Service Account User](https://ctcx.code.siemens.io/cookbook/docs/2512/Documentation/Tenant%20Onboarding/Create%20CApS%20users%20in%20Teamcenter/Manual%20Steps%20approach/Creating%20User%20in%20Teamcenter/#create-a-user-in-teamcenter-using-the-make_user-utility).
      
   Run following commands : 
   ```
      sudo su - tcx_user
      . tcc set_context <tenant_id> <environment_type>
      tcc exec 'make_user -u=infodba -pf=$TC_SECURITY_DIR/default_infodba.pwf -g=dba -person=smsv2.user -user=smsv2.user -OSuser=smsv2.user -status=0 -licenselevel=author -group=MyOrg.Engineering -role=Author'
   ```

3. Map the Service Account user created above with the Client Credential Grant id. refer to ([xAppIssueres and xAppUsers](https://ctcx.code.siemens.io/cookbook/docs/Documentation/Tenant%20Onboarding/Enable%20xApps%20Integration%20with%20Teamcenter%20X/XAppIssuers%20and%20XAppUsers)) section to map and whitelist the Client Credential Application.

   Example:
      ```
      XAppUsers
         -  "RSJhxFMbEmcwSojNGjl2Z:smsv2.user"
      ```

4. Share the **SAMAuth token endpoint** with the customer.

   Example:
      ```
      https://samauth.us-east-1.sws.siemens.com/token
      ```

### Additional LDAP Entry 
Refer to the [Creating User in LDAP](https://ctcx.code.siemens.io/cookbook/docs/2512/Documentation/Tenant%20Onboarding/Create%20CApS%20users%20in%20Teamcenter/Manual%20Steps%20approach/Creating%20User%20in%20LDAP/#steps-1) for adding a LDAP entry.

Mapping :

```
dn: cn=smsv2.user,ou=users,ou=system
sn: smsv2.user
cn: smsv2.user
objectClass: top
objectClass: inetOrgPerson
objectClass: person
objectClass: organizationalPerson
uid: smsv2.user
userPassword:: XXXX
```