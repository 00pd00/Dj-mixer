## Configure Admin License Server for Teamcenter X Operating Users

Administrative tasks in TcX are managed by CApS users. If these users are also registered on the customer's license server, it reduces the available licenses for customers. To prevent operational users from utilizing licenses, they are linked to the Admin License server instead.

Run the `make_user admin` utility to associate the Admin License Server to specified Teamcenter X operating users, using the `tcc` command as per instructions specified in section [Executing Teamcenter ITK Utilities in a containerized environment](./Executing%20Teamcenter%20ITK%20Utilities#executing-teamcenter-itk-utilities-in-a-containerized-environment). The specific command to be executed is given below:

```bash
tcc exec 'make_user -u=infodba -pf=<path-to-infodba-password-file> -g=dba -user=<TcX-operating-user-id> -licenseserver=<admin-license-server-name> -update'
```

### Templatized Values in the Command

- `<path-to-infodba-password-file>` = `$TC_SECURITY_DIR/default_infodba.pwf`
- `<TcX-operating-user-id>`: Please refer [Creating User in Teamcenter](../../010_Tenant%20Onboarding/070_Create%20CApS%20users%20in%20Teamcenter/010_Automation%20approach/010_Automated%20Script%20approach.md)

- `<admin-license-server-name>`: Please refer  [Create Admin License Server Object for Teamcenter X Operating Users](../../../Documentation/Tenant%20Onboarding/Post%20Deploy%20Operations/Create%20Admin%20License%20Server#create-admin-license-server-object-for-teamcenter-x-operating-users)