## Manual User Creation in Teamcenter, SAM, and LDAP

This section provides step-by-step instructions for creating a user in Teamcenter using the `make_user` utility, manually adding the user in SAM, and creating the user in LDAP using the `ldapadd` command. These tasks enable the user to log in to the designated Teamcenter environment.

> **Note:** Execute server-side commands on the corp server of the target tenant. Always replace placeholder values with actual entries specific to your environment.

---

### Parameters

| Parameter           | Description                                                                           |
|---------------------|---------------------------------------------------------------------------------------|
| `<tenant_id>`       | Customer ID of the tenant                                                             |
| `<environment_type>`| Tenant environment type (e.g., prod, uat, dev, etc.)                                 |
| `<infodba_password>`| Obtain from vault path `teamcenter/common/users/infodba_password`                    |
| `<ldap_password>`   | Obtain from vault path `tcx/automation/tcss/ldap_password`                            |
| `<person_name>`     | Name of the person object to be created                                               |
| `<user_name>`       | User name for the new Teamcenter user object                                          |
| `<os_user>`         | Operating system user name                                                            |
| `<user_email>`      | Email address for the new user                                                        |
| `<sam_user_id>`     | User's SAM GUID, as shown in the SAM console or service org  ui                       |
| `<customer_eca>`    | Customer ECA for SAM 2.0                                                              |
| `<service_org_eca>` | Service organization ECA for SAM 2.0                                                  |
