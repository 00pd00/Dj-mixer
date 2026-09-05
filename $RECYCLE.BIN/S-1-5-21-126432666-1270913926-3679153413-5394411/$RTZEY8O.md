# EPMTasks

This guide details how to export and import EPM (Engineering Process Management) Tasks for a tenant in a multi-tenant Teamcenter environment. EPM Tasks are workflow elements such as jobs and activities. Follow each step for smooth data migration.

---

## Overview

EPM Tasks, which may include jobs and workflow data, are exported, batched, transferred, and imported using structured steps to ensure data consistency and integrity.

---

## Exporting EPM Task UIDs

1. **Open the Multi-Tenant Teamcenter Shell.**
2. **Run the following command** (replace placeholders as needed):

    ```bash
    tcc exec 'mkdir -p tcxlite2tcx/tcxlite/source_data/EPMTasks; cd tcxlite2tcx/tcxlite/source_data/EPMTasks; export TC_KEEP_SYSTEM_LOG=1; export SITCONS_AUTH_KEY=R3!FSvXS5aybUPTsFk!xd; multi_tenant_mgr -query -u=infodba -pf=<infodba_pwd_file> -g=dba <tenant_name> exp_epm_tasks source_epmtasks_uids.txt'
    ```

    - **Purpose**: Exports UIDs of all EPM Tasks for the tenant into `source_epmtasks_uids.txt`.
    - **Important**: Use the tenant **name** (not tenant ID) for `<tenant_name>`.

---

## Batching EPM Task UIDs

1. **Review** the number of EPM Task UIDs in `source_epmtasks_uids.txt`.
2. **Batch the UIDs as needed**:
    - For large lists (suggested: 1,000 UIDs per batch), split into files: `EPMTask_01.txt`, `EPMTask_02.txt`, etc.
3. **Recommendation**:
    - Complete export, import, and validation for each batch before continuing with the next.

---

## Exporting EPM Task Data from Source

1. **For each EPM Task batch file** (`EPMTask_x.txt`), run in the Multi-Tenant Teamcenter Shell:

    ```bash
    tcc exec 'cd tcxlite2tcx/tcxlite/source_data/EPMTasks; export TC_TENANT=<tenant_id>; export TC_KEEP_SYSTEM_LOG=1; export SITCONS_AUTH_KEY=R3!FSvXS5aybUPTsFk!xd; tcxml_export -u=infodba -pf=<infodba_pwd_file> -g=dba -low_level -inputuidfile=EPMTask_x.txt -file=EPMTask_x.xml -xsl=tcxlite2tcx/tcxlite/schema_mapping/TCXE_Cad0Design_VER4NX.xslt'
    ```

    - **Purpose**: Exports the batch of EPM Tasks and their objects to XML.   

---

## Transferring Data to Target Environment

1. **Copy Exported Files**:
    - From source: `tcxlite2tcx/tcxlite/source_data/EPMTasks`
    - To target:   `tcxlite2tcx/tcxlite/source_data/EPMTasks`
2. **Set Permissions**:
    - Make sure required read and write permissions are set for these files in the target Teamcenter environment.
        ```bash
        sudo chmod 755 /administration/admin_work/* --recursive 
        ```
---

## Importing EPM Task Data into Target

1. **Open the Single-Tenant Teamcenter Shell.**
2. **For each batch XML file** (`EPMTask_x.xml`), run:

    ```bash
    tcc exec 'cd tcxlite2tcx/tcxlite/source_data/EPMTasks; export TC_KEEP_SYSTEM_LOG=1; export SITCONS_AUTH_KEY=R3!FSvXS5aybUPTsFk!xd; tcxml_import -u=infodba -pf=<infodba_pwd_file> -g=dba -low_level -file=EPMTask_x.xml'
    ```

    - **Purpose**: Imports the EPM Tasks and their objects from the XML file.

---

## Validating and Confirming Import

1. **Copy Data Back to Source**:
    - From: `tcxlite2tcx/tcxlite/source_data/EPMTasks` in the target environment
    - To:   `tcxlite2tcx/tcxlite/source_data/EPMTasks` in the source environment (TCXEssentials)
2. **Set Permissions**:
    - Ensure required read/write permissions on these files in the source environment.
        ```bash
        sudo chmod 755 /administration/admin_work/* --recursive 
        ```    
3. **Confirm the Export/Import**:
    - In the Multi-Tenant Teamcenter Shell, for each batch, run:

      ```bash
      tcc exec 'cd tcxlite2tcx/tcxlite/source_data/EPMTasks; export TC_TENANT=<tenant_id>; export TC_KEEP_SYSTEM_LOG=1; export SITCONS_AUTH_KEY=R3!FSvXS5aybUPTsFk!xd; tcxml_confirm_export -u=infodba -pf=<infodba_pwd_file> -g=dba -low_level -file=EPMTask_x_import_results.txt'
      ```

    - **Purpose**: Confirms EPM Tasks and objects have been exported and imported successfully.
