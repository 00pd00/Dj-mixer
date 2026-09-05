# Exporting Admin Data from Teamcenter X Standard/Advanced/Premium

This guide describes how to export administrative data from Teamcenter X Standard, Advanced, or Premium. It covers essential export processes for site definitions, preferences, and volume information. Follow each section for step-by-step instructions.

---

## Export Admin Data

### Export Site Definition

To export the target site definition data, use the SingleTenant Teamcenter shell.

#### Steps to find the Site ID:

1. **Run the below command to get the TC site id**  
   Run the following command, replacing `<tenant_id>`, `<infodba_pwd>` as appropriate:
   ```bash
   sudo su - tcx_user
   . tcc set_context <envid> <env type>
   tcc exec 'mkdir -p tcxlite2tcx/tcxlite; cd tcxlite2tcx/tcxlite; export TC_KEEP_SYSTEM_LOG=1; export SITCONS_AUTH_KEY=R3!FSvXS5aybUPTsFk!xd; getsite_info -u=infodba -pf=<infodba_pwd_file> -g=dba'    
   ```

2. **Open the siteinfo.properties in TC_MODEL directory**  
   Run the following command,
   ```bash   
   tcc exec 'cat /apps/tc/TD/model/siteinfo.properties'
   ```
3. **Get the siteid from siteinfo.properties**  
    Get the `siteid` from `siteinfo.properties` and use it as `target_site_id` in the next cmd

#### Steps to export Site definition:
1. **Export Site Definition Data**  
   Execute the following command, replacing `<infodba_pwd>` and `<target_site_id>` with your actual values:
   ```bash
   tcc exec 'cd tcxlite2tcx/tcxlite; export TC_KEEP_SYSTEM_LOG=1; export SITCONS_AUTH_KEY=R3!FSvXS5aybUPTsFk!xd; tcxml_export -u=infodba -pf=<infodba_pwd_file> -g=dba -admin_data_xfer -session_options=opt_traverse_ref_org:false -file=target_pom_imc.xml -input_criteria=POM_imc{site_id=<target_site_id>}'
   ```
   - For example, if your Site ID is `-1128771463`, your input criteria will be:
     `input_criteria=POM_imc{site_id=-1128771463}`

---

### Export Preferences

It is important to back up preferences from Teamcenter X Standard/Advanced/Premium. Perform these steps in the SingleTenant Teamcenter shell. Replace `<infodba_pwd>` with your password.

- **Export Site Level Preferences**
  ```bash
  tcc exec 'mkdir -p tcxlite2tcx/tcxlite/target_prefs/site; cd tcxlite2tcx/tcxlite/target_prefs/site; export TC_KEEP_SYSTEM_LOG=1; preferences_manager -u=infodba -pf=<infodba_pwd_file> -g=dba -mode=export -scope=site -out_file=target_site_prefs.xml'
  ```

- **Export User Level Preferences**
  ```bash
  tcc exec 'mkdir -p tcxlite2tcx/tcxlite/target_prefs/users; cd tcxlite2tcx/tcxlite/target_prefs; export TC_KEEP_SYSTEM_LOG=1; preferences_manager -u=infodba -pf=<infodba_pwd_file> -g=dba -mode=backup -out_folder=./users -u_list'
  ```

- **Export Role Level Preferences**
  ```bash
  tcc exec 'mkdir -p tcxlite2tcx/tcxlite/target_prefs/roles; cd tcxlite2tcx/tcxlite/target_prefs; export TC_KEEP_SYSTEM_LOG=1; preferences_manager -u=infodba -pf=<infodba_pwd_file> -g=dba -mode=backup -out_folder=./roles -r_list'
  ```

- **Export Group Level Preferences**
  ```bash
  tcc exec 'mkdir -p tcxlite2tcx/tcxlite/target_prefs/groups; cd tcxlite2tcx/tcxlite/target_prefs; export TC_KEEP_SYSTEM_LOG=1; preferences_manager -u=infodba -pf=<infodba_pwd_file> -g=dba -mode=backup -out_folder=./groups -g_list'
  ```

---

### Export Volume Information

To back up volume information, use the following command in the SingleTenant Teamcenter shell. Replace `<infodba_pwd>` with your password.

```bash
tcc exec 'mkdir -p tcxlite2tcx/tcxlite/target_vol_info; cd tcxlite2tcx/tcxlite/target_vol_info; export TC_KEEP_SYSTEM_LOG=1; backup_xmlinfo -u=infodba -pf=<infodba_pwd_file>'
```

This command creates an XML file with all Teamcenter volumes defined at the target.