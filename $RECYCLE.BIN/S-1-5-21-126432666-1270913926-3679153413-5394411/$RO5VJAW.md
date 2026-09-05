## Executing Teamcenter ITK Utilities in a containerized environment

Running admin utilities and/or scripts using "tcc" command 

This section provides details on how to set context for a specific tenant and run required admin utilities or scripts.

- Administrator needs to login to Corp Server as `tcx_user` in tenant resources where DC server and `tcc` command are installed.  
- Administrator would first set the tenant context using `tcc set_context` command as explained below.  

```bash
sudo su - tcx_user
. tcc set_context <tenantID> <envtype>
```

**Example:**

```bash
. tcc set_context tcxlite9 prd
```

The `set_context` command will switch to the working directory pointed by the `ADMIN_WORK` environment variable.  
If the admin utility to be executed needs any input file, script file, etc., the administrator needs to create/copy input files, script files, etc., to the working directory (represented by `$ADMIN_WORK`). Admin can use the Linux `cp` command to copy the files from anywhere in the machine to the working directory.  

Administrator would then execute the utility using the `tcc exec` command. Please refer to the examples below for more details.  

```bash
tcc exec '<admin-util-cmd-with-args>'
```

**Examples:**

1. **Run `list_users` admin utility**   
    ```bash
    tcc exec 'list_users -u=infodba -pf=$TC_SECURITY_DIR/<infodba-password-filename> -g=dba'
    ```

2. **Run `preferences_manager` (with input and output file) utility to create/modify preferences**  
    ```bash
    tcc exec 'preferences_manager -u=infodba -pf=$TC_SECURITY_DIR/<infodba-password-filename> -mode=export -scope=SITE -file=export_preferences.txt -out_file=preferences_out.xml'
    ```

3. **Run shell script `import_data.sh`**  
    ```bash
    tcc exec 'TcDLA_20170713_220331_ED_data/data/20170713_220331_ED/import_data.sh'
    ```

When specifying the password file for ITK commands, use `$TC_SECURITY_DIR` to reference the directory which has the password files.  

When a utility/script is executed using the `tcc exec` command, a Datadog URL for the logs associated with the executed utility/script is displayed in the console. Open the link to view the associated console output and the log statements.  

**Note:** If your environment is in the Dev/Pre-Prod cluster and not enabled for log indexing, change the filter to "Live" to view logs.  

**Example Image:**  
![Image](./image_337.png)
