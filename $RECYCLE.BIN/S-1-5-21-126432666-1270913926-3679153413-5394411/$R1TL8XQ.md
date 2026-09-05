# Orphan Datasets

This guide explains the process of exporting and importing orphan datasets for a tenant in a multi-tenant Teamcenter system. Orphan datasets are datasets without a parent Item. Follow the steps below for efficient and accurate migration.

---

## Overview

Orphan datasets can be migrated by following a series of steps: exporting their UIDs, batching for large datasets, exporting the complete data, migrating files, and importing into the destination.

---

## Exporting Orphan Dataset UIDs

1. **Open the Multi-Tenant Teamcenter Shell.**
2. **Run the following command** (replace placeholders as needed):

    ```bash
    tcc exec 'mkdir -p tcxlite2tcx/tcxlite/source_data/OrphanDataSets; cd tcxlite2tcx/tcxlite/source_data/OrphanDataSets; export TC_KEEP_SYSTEM_LOG=1; export SITCONS_AUTH_KEY=R3!FSvXS5aybUPTsFk!xd; multi_tenant_mgr -query -u=infodba -pf=<infodba_pwd_file> -g=dba <tenant_name> exp_orphan_datasets source_orphan_datasets_uids.txt'
    ```

    - **Purpose**: Exports UIDs of orphan datasets into `source_orphan_datasets_uids.txt`.
    - **Important**: Use the tenant **name** (not tenant ID) for `<tenant_name>`.

---

## Batching Orphan Dataset UIDs

1. **Check the number of datasets in `source_orphan_datasets_uids.txt`.**
2. **Batch the UIDs**:
    - For large numbers of datasets (suggested batch size: 5,000 UIDs), split UIDs into separate files: `OrphanDatasets_01.txt`, `OrphanDatasets_02.txt`, etc.
3. **Recommendation**:
    - After processing each batch, validate the import in the target environment before proceeding with the next batch.

---

## Exporting Orphan Dataset Data

1. **For each batch UID file** (`OrphanDatasets_x.txt`), run in the Multi-Tenant Teamcenter Shell:

    ```bash
    tcc exec 'cd tcxlite2tcx/tcxlite/source_data/OrphanDataSets; export TC_TENANT=<tenant_id>; export TC_KEEP_SYSTEM_LOG=1; export SITCONS_AUTH_KEY=R3!FSvXS5aybUPTsFk!xd; tcxml_export -u=infodba -pf=<infodba_pwd_file> -g=dba -low_level -inputuidfile=OrphanDatasets_x.txt -file=OrphanDatasets_x.xml -xsl=tcxlite2tcx/tcxlite/schema_mapping/TCXE_Cad0Design_VER4NX.xslt'
    ```

    - **Purpose**: Exports the datasets and related objects into the XML file for each batch.

---

## Transferring Data to Target Environment

1. **Copy Exported Files**:
    - From source: `tcxlite2tcx/tcxlite/source_data/OrphanDataSets`
    - To target:   `tcxlite2tcx/tcxlite/source_data/OrphanDataSets`
2. **Set Permissions**:
    - Make sure that read and write permissions are set correctly for these files in the target Teamcenter environment.
        ```bash
        sudo chmod 755 /administration/admin_work/* --recursive 
        ```
---

## Importing Orphan Dataset Data into Target

1. **Open the Single-Tenant Teamcenter Shell.**
2. **For each batch XML file** (`OrphanDatasets_x.xml`), run:

    ```bash
    tcc exec 'cd tcxlite2tcx/tcxlite/source_data/OrphanDataSets; export TC_KEEP_SYSTEM_LOG=1; export SITCONS_AUTH_KEY=R3!FSvXS5aybUPTsFk!xd; tcxml_import -u=infodba -pf=<infodba_pwd_file> -g=dba -low_level -file=OrphanDatasets_x.xml'
    ```

    - **Purpose**: Imports the orphan datasets and their objects from the XML file.

---

## Validating and Confirming Import

1. **Copy Data Back to Source**:
    - From: `tcxlite2tcx/tcxlite/source_data/OrphanDataSets` in the target environment
    - To:   `tcxlite2tcx/tcxlite/source_data/OrphanDataSets` in the source environment (TCXEssentials)
2. **Update Permissions**:
    - Ensure required read and write permissions on these files in the source Teamcenter environment.
        ```bash
        sudo chmod 755 /administration/admin_work/* --recursive 
        ```    
3. **Confirm the Export/Import**:
    - In the Multi-Tenant Teamcenter Shell, run for each batch:

      ```bash
      tcc exec 'cd tcxlite2tcx/tcxlite/source_data/OrphanDataSets; export TC_TENANT=<tenant_id>; export TC_KEEP_SYSTEM_LOG=1; export SITCONS_AUTH_KEY=R3!FSvXS5aybUPTsFk!xd; tcxml_confirm_export -u=infodba -pf=<infodba_pwd_file> -g=dba -low_level -file=OrphanDatasets_x_import_results.txt'
      ```

    - **Purpose**: Confirms the orphan datasets and objects have been exported and imported successfully.
