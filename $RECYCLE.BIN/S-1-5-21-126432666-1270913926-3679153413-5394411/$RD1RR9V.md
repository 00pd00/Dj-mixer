# Importing Tenant Admin Data into Teamcenter X Standard/Advanced/Premium

This guide explains how to import administrative data—including closure rules, site info, organizations, projects, and preferences—from a tenant environment into Teamcenter X Standard, Advanced, or Premium.

---

## Import Tenant Admin Data

### Import Closure Rules for Discussions

Follow these steps to import closure rules required for discussions:

1. **Download the Closure Rules File**  
   Get `DiscussionInternalClosureRules.xml` from:  
   [https://artifacts.industrysoftware.automation.siemens.com/artifactory/generic-local/com/siemens/tcxlite/discussion-cr/DiscussionInternalClosureRules.xml](https://artifacts.industrysoftware.automation.siemens.com/artifactory/generic-local/com/siemens/tcxlite/discussion-cr/DiscussionInternalClosureRules.xml)

2. **Copy the File**  
   Place the file in the import location on your server.

3. **Import the Closure Rules**  
   Run this command, replacing `<infodba_pwd>` and `<file_location>` as required:
   ```bash
   tcc exec 'export TC_KEEP_SYSTEM_LOG=1; tcxml_import -u=infodba -pf=<infodba_pwd_file> -g=dba -scope_rules -scope_rules_mode=append -file=<file_location>/DiscussionInternalClosureRules.xml'
   ```
   This imports internal closure rules for discussions at the target site.

---

### Import Site Info

#### In multitenant Teamcenter shell

1. **Transfer Data**  
   Copy the contents of the `tcxlite2tcx/tcxlite` folder from the target (Standard/Advanced/Premium) to the source (Essentials).

2. **Set Permissions**  
   Assign required read/write permissions on these files in the source (Essentials).

3. **Import the Target Site into Source**  
   Run the following command in the source shell, replacing `<tenant_id>`, `<infodba_pwd>` as needed:
   ```bash
   tcc exec 'export TC_TENANT=<tenant_id>; export TC_KEEP_SYSTEM_LOG=1; export SITCONS_AUTH_KEY=R3!FSvXS5aybUPTsFk!xd; tcxml_import -u=infodba -pf=<infodba_pwd_file> -g=dba -admin_data_xfer -file=tcxlite2tcx/tcxlite/target_pom_imc.xml'
   ```
   This creates the target site in Source (Essentials).

#### In SingleTenant Teamcenter shell

1. **Transfer Data**  
   Copy the contents of `tcxlite2tcx/tcxlite` from the source (Essentials) to the target (Standard/Advanced/Premium).

2. **Set Permissions**  
   Assign required read/write permissions on these files in the target system.

3. **Import the Source Site into Target**  
   Run the following command, updating `<infodba_pwd>`:
   ```bash
   tcc exec 'export TC_KEEP_SYSTEM_LOG=1; export SITCONS_AUTH_KEY=R3!FSvXS5aybUPTsFk!xd; tcxml_import -u=infodba -pf=<infodba_pwd_file> -g=dba -admin_data_xfer -file=tcxlite2tcx/tcxlite/source_pom_imc.xml'
   ```
   This imports the source site into the Target (Standard/Advanced/Premium).

---

### Import Organization Data

In the target Teamcenter shell (Standard/Advanced/Premium), import organizational data from the source (Essentials) by running the following commands. Replace `<infodba_pwd>` as needed.

- **Import Roles**
  ```bash
  tcc exec 'export TC_KEEP_SYSTEM_LOG=1; export SITCONS_AUTH_KEY=R3!FSvXS5aybUPTsFk!xd; tcxml_import -u=infodba -pf=<infodba_pwd_file> -g=dba -admin_data_xfer -file=tcxlite2tcx/tcxlite/source_org/source_org_roles.xml'
  ```

- **Import Persons**
  ```bash
  tcc exec 'export TC_KEEP_SYSTEM_LOG=1; export SITCONS_AUTH_KEY=R3!FSvXS5aybUPTsFk!xd; tcxml_import -u=infodba -pf=<infodba_pwd_file> -g=dba -admin_data_xfer -file=tcxlite2tcx/tcxlite/source_org/source_org_persons.xml'
  ```

- **Import Groups**
  ```bash
  tcc exec 'export TC_KEEP_SYSTEM_LOG=1; export SITCONS_AUTH_KEY=R3!FSvXS5aybUPTsFk!xd; tcxml_import -u=infodba -pf=<infodba_pwd_file> -g=dba -admin_data_xfer -file=tcxlite2tcx/tcxlite/source_org/source_org_groups.xml'
  ```

- **Import Users**
  ```bash
  tcc exec 'export TC_KEEP_SYSTEM_LOG=1; export SITCONS_AUTH_KEY=R3!FSvXS5aybUPTsFk!xd; tcxml_import -u=infodba -pf=<infodba_pwd_file> -g=dba -admin_data_xfer -file=tcxlite2tcx/tcxlite/source_org/source_org_users.xml'
  ```

- **Import Group Members**
  ```bash
  tcc exec 'export TC_KEEP_SYSTEM_LOG=1; export SITCONS_AUTH_KEY=R3!FSvXS5aybUPTsFk!xd; tcxml_import -u=infodba -pf=<infodba_pwd_file> -g=dba -admin_data_xfer -file=tcxlite2tcx/tcxlite/source_org/source_org_groupmembers.xml'
  ```

> **Note:**  
> Ensure user accounts from Essentials are mapped in LDAP so that users can log in to Teamcenter X Standard/Advanced/Premium.

---

### Import Projects

Import project data into the target (Standard/Advanced/Premium) system. Replace `<infodba_pwd>` as necessary.

```bash
tcc exec 'cd tcxlite2tcx/tcxlite/projects; export TC_KEEP_SYSTEM_LOG=1; export SITCONS_AUTH_KEY=R3!FSvXS5aybUPTsFk!xd; tcxml_import -admin_data_xfer -u=infodba -pf=<infodba_pwd_file> -g=dba -file=src_tc_projects.xml -optionset=AdminDataImportDefault -session_options=opt_admin_data_import_mode:source_everywhere,opt_generate_xml_log:true,opt_admin_sync_deleted_objects:true,opt_log_file_path:tc_Projects_import.log'
```

This command logs the import in `tc_Projects_import.log`.

---

### Import Preferences

First, compare and segregate preferences between source (Essentials) and target (Standard/Advanced/Premium) at the User, Role, and Group levels. Identify which preferences should be overridden or merged, then import them as needed. Run these commands in the SingleTenant Teamcenter shell, updating values such as `<infodba_pwd>`, `<group-name>`, `<role-name>`, `<role-name_uid>`, and `<userid>` accordingly.

- **Import Group Preferences**
  ```bash
  tcc exec 'export TC_KEEP_SYSTEM_LOG=1; preferences_manager -u=infodba -pf=<infodba_pwd_file> -g=dba -mode=import -scope=GROUP -target=<group-name> -file=tcxlite2tcx/tcxlite/source_prefs/groups/<PreferenceBackup_xyz>/Group/<group-name>.xml -action=OVERRIDE'
  ```
  Run this command for every group.

- **Import Role Preferences**
  ```bash
  tcc exec 'export TC_KEEP_SYSTEM_LOG=1; preferences_manager -u=infodba -pf=<infodba_pwd_file> -g=dba -mode=import -scope=ROLE -target=<role-name> -file=tcxlite2tcx/tcxlite/source_prefs/roles/<PreferenceBackup_xyz>/Role/<role-name_uid>.xml -action=OVERRIDE'
  ```
  Run this command for every role.

- **Import User Preferences**
  ```bash
  tcc exec 'export TC_KEEP_SYSTEM_LOG=1; preferences_manager -u=infodba -pf=<infodba_pwd_file> -g=dba -mode=import -scope=USER -target=<userid> -file=tcxlite2tcx/tcxlite/source_prefs/users/<PreferenceBackup_xyz>/User/<userid>.xml -action=OVERRIDE'
  ```
  Run this command for every user.