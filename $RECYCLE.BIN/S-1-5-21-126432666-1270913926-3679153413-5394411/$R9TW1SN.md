# Exporting Admin Data from Teamcenter X Essentials

This guide provides step-by-step instructions to export administrative data of a Tenant in Teamcenter X Essentials, optimized for easy understanding by both end users and technical operators.

---

## Exporting Tenant Admin Data

### Export Site Definition

To export the source site definition data, use the TCX Essentials Teamcenter shell.

#### Steps to Find the Site ID:

1. **Run the below command to generate the siteinfo.properties file**  
   Run the following command, replacing `<tenant_id>`, `<infodba_pwd>` as appropriate:
   ```bash
   sudo su - tcx_user
   . tcc set_context <envid> <env type>
   tcc exec 'mkdir -p tcxlite2tcx/tcxlite; cd tcxlite2tcx/tcxlite; export TC_TENANT=<tenant_id>; export TC_KEEP_SYSTEM_LOG=1; export SITCONS_AUTH_KEY=R3!FSvXS5aybUPTsFk!xd; getsite_info -u=infodba -pf=<infodba_pwd_file> -g=dba'    
   ```

2. **Open the siteinfo.properties in TC_MODEL directory**  
   Run the following command,
   ```bash   
   tcc exec 'cat /apps/tc/TD/model/siteinfo.properties'
   ```
3. **Get the siteid from siteinfo.properties**  
    Get the `siteid` from `siteinfo.properties` and use it as `source_site_id` in the next cmd

#### Steps to export Site definition:
1. **Export Site Definition Data**  
   Run the following command, replacing `<tenant_id>`, `<infodba_pwd>`, and `<source_site_id>` as appropriate:
   ```bash
   tcc exec 'mkdir -p tcxlite2tcx/tcxlite; cd tcxlite2tcx/tcxlite; export TC_TENANT=<tenant_id>; export TC_KEEP_SYSTEM_LOG=1; export SITCONS_AUTH_KEY=R3!FSvXS5aybUPTsFk!xd; tcxml_export -u=infodba -pf=<infodba_pwd_file>  -g=dba -admin_data_xfer -session_options=opt_traverse_ref_org:false  -file=source_pom_imc.xml -input_criteria=POM_imc{site_id=<source_site_id>}' 
   ```
   - Replace the input criteria with your actual Site ID, example: `input_criteria=POM_imc{site_id=-1652966136}`

---

### Export Organization Data

Export organization-related data such as Roles, Groups, Persons, Users, and GroupMembers.

#### Steps:

For all commands below, substitute `<tenant_id>` and `<infodba_pwd>` as required.

- **Export Roles**
  ```bash
  tcc exec 'mkdir -p tcxlite2tcx/tcxlite/source_org; cd tcxlite2tcx/tcxlite/source_org; export TC_TENANT=<tenant_id>; export TC_KEEP_SYSTEM_LOG=1; export SITCONS_AUTH_KEY=R3!FSvXS5aybUPTsFk!xd; tcxml_export  -u=infodba -pf=<infodba_pwd_file> -g=dba -admin_data_xfer -file=source_org_roles.xml -class=Role'
  ```

- **Export Groups**
  ```bash
  tcc exec 'mkdir -p tcxlite2tcx/tcxlite/source_org; cd tcxlite2tcx/tcxlite/source_org; export TC_TENANT=<tenant_id>; export TC_KEEP_SYSTEM_LOG=1; export SITCONS_AUTH_KEY=R3!FSvXS5aybUPTsFk!xd; tcxml_export -u=infodba -pf=<infodba_pwd_file> -g=dba -admin_data_xfer -file=source_org_groups.xml -class=Group'
  ```

- **Export Persons**
  ```bash
  tcc exec 'mkdir -p tcxlite2tcx/tcxlite/source_org; cd tcxlite2tcx/tcxlite/source_org; export TC_TENANT=<tenant_id>; export TC_KEEP_SYSTEM_LOG=1; export SITCONS_AUTH_KEY=R3!FSvXS5aybUPTsFk!xd; tcxml_export -u=infodba -pf=<infodba_pwd_file> -g=dba -admin_data_xfer -file=source_org_persons.xml -class=Person'
  ```

- **Export Users**
  ```bash
  tcc exec 'mkdir -p tcxlite2tcx/tcxlite/source_org; cd tcxlite2tcx/tcxlite/source_org; export TC_TENANT=<tenant_id>; export TC_KEEP_SYSTEM_LOG=1; export SITCONS_AUTH_KEY=R3!FSvXS5aybUPTsFk!xd; tcxml_export -u=infodba -pf=<infodba_pwd_file> -g=dba -admin_data_xfer -file=source_org_users.xml -class=User'
  ```

- **Export Group Members**
  ```bash
  tcc exec 'mkdir -p tcxlite2tcx/tcxlite/source_org; cd tcxlite2tcx/tcxlite/source_org; export TC_TENANT=<tenant_id>; export TC_KEEP_SYSTEM_LOG=1; export SITCONS_AUTH_KEY=R3!FSvXS5aybUPTsFk!xd; tcxml_export  -u=infodba -pf=<infodba_pwd_file> -g=dba -admin_data_xfer -file=source_org_groupmembers.xml -class=GroupMember'
  ```

---

### Export Projects

Export all project data from the source Tenant.

```bash
tcc exec 'mkdir -p tcxlite2tcx/tcxlite/projects; cd tcxlite2tcx/tcxlite/projects; export TC_TENANT=<tenant_id>; export TC_KEEP_SYSTEM_LOG=1; export SITCONS_AUTH_KEY=R3!FSvXS5aybUPTsFk!xd; tcxml_export -u=infodba -pf=<infodba_pwd_file> -g=dba -admin_data_xfer -file=src_tc_projects.xml -class=TC_Project  -session_options=opt_admin_data_full_scope:true,inputCriteria:null,adminDataCategory:Projects,opt_traverse_org_gms:true'
```

---

### Export Preferences

Export user, role, and group level preferences using the following commands. Replace `<tenant_id>` and `<infodba_pwd>` as required.

- **Export User Level Preferences**
  ```bash
  tcc exec 'mkdir -p tcxlite2tcx/tcxlite/source_prefs/users; cd tcxlite2tcx/tcxlite/source_prefs; export TC_TENANT=<tenant_id>; export TC_KEEP_SYSTEM_LOG=1; preferences_manager -u=infodba -pf=<infodba_pwd_file> -g=dba -mode=backup -out_folder=users -u_list'
  ```

- **Export Role Level Preferences**
  ```bash
  tcc exec 'mkdir -p tcxlite2tcx/tcxlite/source_prefs/roles; cd tcxlite2tcx/tcxlite/source_prefs; export TC_TENANT=<tenant_id>; export TC_KEEP_SYSTEM_LOG=1; preferences_manager -u=infodba -pf=<infodba_pwd_file> -g=dba -mode=backup -out_folder=roles -r_list'
  ```

- **Export Group Level Preferences**
  ```bash
  tcc exec 'mkdir -p tcxlite2tcx/tcxlite/source_prefs/groups; cd tcxlite2tcx/tcxlite/source_prefs; export TC_TENANT=<tenant_id>; export TC_KEEP_SYSTEM_LOG=1; preferences_manager -u=infodba -pf=<infodba_pwd_file> -g=dba -mode=backup -out_folder=groups -g_list'
  ```

---

### Export Volume Information

Export Teamcenter volume information in XML format from the source.

```bash
tcc exec 'mkdir -p tcxlite2tcx/tcxlite/source_vol_info; cd tcxlite2tcx/tcxlite/source_vol_info; export TC_TENANT=<tenant_id>; export TC_KEEP_SYSTEM_LOG=1; backup_xmlinfo -u=infodba -pf=<infodba_pwd_file>'
```

This will create an XML with information about Teamcenter volumes.

---

### Backup FMS Master File

To prevent issues with the FMS, always back up your FMS Master file into a migration working directory (not within `<FSC_HOME>`).

#### Steps:

1. **Identify FSC Home Directory**  
   The path will be similar to:
   ```
   /CUSTOMER_ID-{envtype}/{CUSTOMER_ID}-{envtype}/deploy/component/config/fmsmaster/fsc
   ```
   Example:
   ```
   /esst2412-prd/esst2412-prd/deploy/component/config/fmsmaster/fsc
   ```

2. **Create a Backup Folder**

   ```bash
   sudo mkdir -p tcxlite2tcx/tcxlite/source_fsc
   cd tcxlite2tcx/tcxlite/source_fsc
   ```


3. **Copy the FSC Home Contents**
   ```bash
   sudo cp -r /CUSTOMER_ID-{envtype}/{CUSTOMER_ID}-{envtype}/deploy/component/config/fmsmaster .
   ```
   Example:
   ```
   sudo cp -r /esst2412-prd/esst2412-prd/deploy/component/config/fmsmaster .
   ```
---

### Import Closure Rules for Discussions

1. **Download the DiscussionInternalClosureRules.xml**  
   Obtain the file from the artifactory at:  
   [https://artifacts.industrysoftware.automation.siemens.com/artifactory/generic-local/com/siemens/tcxlite/discussion-cr/DiscussionInternalClosureRules.xml](https://artifacts.industrysoftware.automation.siemens.com/artifactory/generic-local/com/siemens/tcxlite/discussion-cr/DiscussionInternalClosureRules.xml)

2. **Copy the File**  
   Place the downloaded file in the required location for import.

3. **Set Permissions**
    - Ensure the necessary read and write permissions on the files
    
        ```bash
        sudo chmod 755 /administration/admin_work/* --recursive 
        ```

4. **Import the Closure Rules**
   ```bash
   tcc exec 'export TC_KEEP_SYSTEM_LOG=1; export TC_TENANT=<tenant_id>; tcxml_import -u=infodba -pf=<infodba_pwd_file> -g=dba -scope_rules -scope_rules_mode=append -file=<file_location>/DiscussionInternalClosureRules.xml'
   ```

This command will import internal closure rules for discussions at the source site.
