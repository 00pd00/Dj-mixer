### Applicable Product IDs
**Applicable Product IDs:** : TC31158-XT, TC31168-XT, TC31141-XT, TC31140-XT, TC030401-XT 

### SAMAuth Configurations

Refer to the [SAMAuth section of the cookbook](https://ctcx.code.siemens.io/cookbook/docs/2506/Documentation/Tenant%20Onboarding/Enable%20xApps%20Integration%20with%20Teamcenter%20X/SAMAuth%20Application%20registration%20to%20generate%20client_id%20and%20secret%20for%20XApps/) to generate `client_id` and secrets.

1. **Create Client Credential Application**  
   See [Step 3](https://ctcx.code.siemens.io/cookbook/docs/2506/Documentation/Tenant%20Onboarding/Enable%20xApps%20Integration%20with%20Teamcenter%20X/SAMAuth%20Application%20registration%20to%20generate%20client_id%20and%20secret%20for%20XApps/#3-samauth-app-registration-for-client-credentials-grant-type) to create Client Credential Application and share the client credential JSON with the customer for configuration.

2. Create a Teamcenter Service account user. Please refer to [Creation of Teamcenter Service Account User](https://ctcx.code.siemens.io/cookbook/docs/2512/Documentation/Tenant%20Onboarding/Create%20CApS%20users%20in%20Teamcenter/Manual%20Steps%20approach/Creating%20User%20in%20Teamcenter/#create-a-user-in-teamcenter-using-the-make_user-utility).

   Run following commands : 
   ```
      sudo su - tcx_user
      . tcc set_context <tenant_id> <environment_type>
      tcc exec 'make_user -u=infodba -pf=$TC_SECURITY_DIR/default_infodba.pwf -g=dba -person=eda_test.user -user=eda_test.user -OSuser=eda_test.user -status=0 -licenselevel=author -group=MyOrg.Engineering -role=Author'
   ```

3. Refer to the [Creating User in LDAP](https://ctcx.code.siemens.io/cookbook/docs/2512/Documentation/Tenant%20Onboarding/Create%20CApS%20users%20in%20Teamcenter/Manual%20Steps%20approach/Creating%20User%20in%20LDAP/#steps-1) for adding a LDAP entry. Use the 

Example Mapping :
```
dn: cn=eda_test.user,ou=users,ou=system
changetype: add
sn: eda_test.user
cn: eda_test.user
objectClass: top
objectClass: inetOrgPerson
objectClass: person
objectClass: organizationalPerson
uid: eda_test.user
userPassword:: <pswd>

dn: cn=eda_test.user,ou=users,ou=system
changetype: modify
replace: userPassword
userPassword: <pswd>
```

4. Map the Service Account user created above with the Client Credential Grant id. refer to ([xAppIssueres and xAppUsers](https://ctcx.code.siemens.io/cookbook/docs/Documentation/Tenant%20Onboarding/Enable%20xApps%20Integration%20with%20Teamcenter%20X/XAppIssuers%20and%20XAppUsers)) section to map and whitelist the Client Credential Application.
   
   Example:
      ```
      XAppUsers
         -  "RSJhxFMbEmcwSojNGjl2Z:eda_test.user"
      ```

5. Share the **SAMAuth token endpoint** with the customer securely using **Secure Mail or Secufex**.

   Example:
      ```
      https://samauth.us-east-1.sws.siemens.com/token
      ```

---

### Creating Classification Hierarchy (Optional)

> **Optional:**  
> If the customer has selected the classification product (TC030401-XT), their classification hierarchy needs to be imported.

To import the classification hierarchy into Teamcenter:

1. Switch to the correct user and set the environment context:
    ```bash
    sudo su - tcx_user
    . tcc set_context <customer-ID> <envType> <userID>
    ```
2. Import the customer's PLMXML classification file:
    ```bash
    tcc exec 'plmxml_import -u=infodba -pf=$TC_SECURITY_DIR/<infodba-password-filename> -g=dba -xml_file=PLMXML_file_path -transfermode=incremental_import -import_mode=overwrite'
    ```
    > The PLMXML file should be provided by the customer and then imported.

For internal validation, you can download and import this file: <a href="/cookbook/xml/RNTD-PLMXMLClassification.xml" download>RNTD-PLMXMLClassification</a>.

Check the value of the preference **CLS_is_presentation_hierarchy_active**:
- `true`: Enables work with the presentation classification hierarchy.
- `false`: Enables work with the traditional classification class hierarchy.

Ensure that this preference is set to `false`.