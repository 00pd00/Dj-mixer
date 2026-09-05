# Folders

This guide explains how to export and import Folder objects owned by a tenant in a multi-tenant Teamcenter system. Carefully follow each step for a smooth migration process.

---

## Overview

The folders owned by a specific tenant can be exported, batched, moved, and imported using these systematic steps. Always validate each batch before continuing.

---

## Exporting Folder UIDs

1. **Open the Multi-Tenant Teamcenter Shell.**
2. **Run the following command** (replace placeholders as appropriate):

    ```bash
    tcc exec 'mkdir -p tcxlite2tcx/tcxlite/source_data/Folders; cd tcxlite2tcx/tcxlite/source_data/Folders; export TC_KEEP_SYSTEM_LOG=1; export SITCONS_AUTH_KEY=R3!FSvXS5aybUPTsFk!xd; multi_tenant_mgr -query -u=infodba -pf=<infodba_pwd_file> -g=dba <tenant_name> exp_folders source_folders_uids.txt'
    ```

    - **Purpose**: Exports UIDs of all folders owned by the tenant into `source_folders_uids.txt`.
    - **Important**: Use the tenant **name** (not the tenant ID) for `<tenant_name>`.

---

## Batching Folder UIDs

1. **Review** the number of folder UIDs in `source_folders_uids.txt`.
2. **Batch as needed**:
    - For large lists (suggested: 10,000 UIDs per batch), split into files: `Folders01.txt`, `Folders02.txt`, etc.
3. **Recommendation**:
    - Complete export, import, and validation for each batch before proceeding.

---

## Exporting Folder Data from Source

1. **For each folder batch file** (`Folders01.txt`), run in the Multi-Tenant Teamcenter Shell:

    ```bash
    tcc exec 'cd tcxlite2tcx/tcxlite/source_data/Folders; export TC_TENANT=<tenant_id>; export TC_KEEP_SYSTEM_LOG=1; export SITCONS_AUTH_KEY=R3!FSvXS5aybUPTsFk!xd; tcxml_export -u=infodba -pf=<infodba_pwd_file> -g=dba -low_level -inputuidfile=Folders01.txt -file=Folders01.xml -xsl=tcxlite2tcx/tcxlite/schema_mapping/TCXE_Cad0Design_VER4NX.xslt'
    ```

    - **Purpose**: Exports all folders in the batch to an XML file.

---

## Transferring Data to Target Environment

1. **Copy Exported Files**:
    - From source: `tcxlite2tcx/tcxlite/source_data/Folders`
    - To target:   `tcxlite2tcx/tcxlite/source_data/Folders`
2. **Set Permissions**:
    - Make sure the files in the target environment have required read and write permissions.
        ```bash
        sudo chmod 755 /administration/admin_work/* --recursive 
        ```
---

## Importing Folder Data into Target

1. **Open the Single-Tenant Teamcenter Shell.**
2. **For each batch XML file** (`Folders01.xml`), run:

    ```bash
    tcc exec 'cd tcxlite2tcx/tcxlite/source_data/Folders; export TC_KEEP_SYSTEM_LOG=1; export SITCONS_AUTH_KEY=R3!FSvXS5aybUPTsFk!xd; tcxml_import -u=infodba -pf=<infodba_pwd_file> -g=dba -low_level -file=Folders01.xml'
    ```

    - **Purpose**: Imports the folders from the XML file.

---

## Validating and Confirming Import

1. **Copy Data Back to Source**:
    - From: `tcxlite2tcx/tcxlite/source_data/Folders` in the target environment
    - To:   `tcxlite2tcx/tcxlite/source_data/Folders` in the source environment (TCXEssentials)
2. **Set Permissions**:
    - Ensure proper read/write permissions in the source environment.
        ```bash
        sudo chmod 755 /administration/admin_work/* --recursive 
        ```
3. **Confirm the Export/Import**:
    - In the Multi-Tenant Teamcenter Shell, for each batch, run:

      ```bash
      tcc exec 'cd tcxlite2tcx/tcxlite/source_data/Folders; export TC_TENANT=<tenant_id>; export TC_KEEP_SYSTEM_LOG=1; export SITCONS_AUTH_KEY=R3!FSvXS5aybUPTsFk!xd; tcxml_confirm_export -u=infodba -pf=<infodba_pwd_file> -g=dba -low_level -file=Folders01_import_results.txt'
      ```

    - **Purpose**: Confirms the folder data was successfully exported and imported.
