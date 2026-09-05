# Items

This guide explains how to export and import Items in a multi-tenant Teamcenter environment. Follow each step carefully to ensure accurate data migration between tenants.

## Overview

These instructions guide you through exporting Item UIDs from a source tenant, migrating them in batches, and importing into a target tenant using Teamcenter commands.

- **Items**: Objects managed in Teamcenter.
- **Tenant**: Logical partition in multi-tenant Teamcenter.
- **TCXLite**: Deployment context.
- **infodba**: Administrative user.
- **multi_tenant_mgr**: Utility for managing multi-tenant operations.
- **tcxml_export/import/confirm_export**: Teamcenter utilities for data migration.

---

## Exporting Item UIDs from Source (Multi-Tenant)

1. **Open Multi-Tenant Teamcenter Shell**.
2. **Run the command below** (replace placeholders as noted):

    ```bash
    tcc exec 'mkdir -p tcxlite2tcx/tcxlite/source_data/Items; cd tcxlite2tcx/tcxlite/source_data/Items; export TC_KEEP_SYSTEM_LOG=1; export SITCONS_AUTH_KEY=R3!FSvXS5aybUPTsFk!xd; multi_tenant_mgr -query -u=infodba -pf=<infodba_pwd_file> -g=dba <tenant_name> exp_items source_items_uids.txt'
    ```

    - **Purpose**: This command exports UIDs of Items belonging to the tenant into `source_items_uids.txt`.
    - *Important*: Use the tenant **name** (not the tenant ID) in `<tenant_name>`.

---

## Batching Item UIDs

1. **Check the number of UIDs in `source_items_uids.txt`.**
2. **Batch the UIDs**:
    - Divide UIDs into batches (suggested: 1,000 UIDs per batch).
    - Save each batch into separate files: `Item01.txt`, `Item02.txt`, and so on.

3. **Recommendation**:  
   After processing each batch, validate the migration in the target tenant before continuing with the next batch.

---

## Exporting Item Data from Source

1. **For each UID batch file** (`Item01.txt`, etc.), run in the Multi-Tenant Teamcenter shell:

    ```bash
    tcc exec 'cd tcxlite2tcx/tcxlite/source_data/Items; export TC_TENANT=<tenant_id>; export TC_KEEP_SYSTEM_LOG=1; export SITCONS_AUTH_KEY=R3!FSvXS5aybUPTsFk!xd; tcxml_export -u=infodba -pf=<infodba_pwd_file> -g=dba -low_level -inputuidfile=Item01.txt -file=Item01.xml -xsl=tcxlite2tcx/tcxlite/schema_mapping/TCXE_Cad0Design_VER4NX.xslt'
    ```

    - **Purpose**: This command exports Items and their associated objects into XML files (e.g., `Item01.xml`).

---

## Transferring Exported Data to Target (Single-Tenant)

1. **Copy Exported Files**:
    - From source: `tcxlite2tcx/tcxlite/source_data/Items`
    - To target:   `tcxlite2tcx/tcxlite/source_data/Items`
2. **Set Permissions**:
    - Ensure the necessary read and write permissions on these files in the target environment.
    
        ```bash
        sudo chmod 755 /administration/admin_work/* --recursive 
        ```

---

## Importing Item Data into Target

1. **Open Single-Tenant Teamcenter Shell.**
2. **For each batch XML file** (e.g., `Item01.xml`), run:

    ```bash
    tcc exec 'cd tcxlite2tcx/tcxlite/source_data/Items; export TC_KEEP_SYSTEM_LOG=1; export SITCONS_AUTH_KEY=R3!FSvXS5aybUPTsFk!xd; tcxml_import -u=infodba -pf=<infodba_pwd_file> -g=dba -low_level -file=Item01.xml'
    ```

    - **Purpose**: Imports the Items and their objects from the XML file into the target environment.

---

## Validating and Confirming Import

1. **Copy Data Back to Source**:
    - From: `tcxlite2tcx/tcxlite/source_data/Items` in the target
    - To:   `tcxlite2tcx/tcxlite/source_data/Items` in the source (TCXEssentials)
2. **Set Permissions**:
    - Give required read/write permissions in the source environment.
    
        ```bash
        sudo chmod 755 /administration/admin_work/* --recursive 
        ```

3. **Confirm the Export/Import**:
    - In Multi-Tenant Teamcenter shell, run:

      ```bash
      tcc exec 'cd tcxlite2tcx/tcxlite/source_data/Items; export TC_TENANT=<tenant_id>; export TC_KEEP_SYSTEM_LOG=1; export SITCONS_AUTH_KEY=R3!FSvXS5aybUPTsFk!xd; tcxml_confirm_export -u=infodba -pf=<infodba_pwd_file> -g=dba -low_level -file=Item01_import_results.txt'
      ```

    - **Purpose**: Confirms that Items and objects were correctly exported and imported.

---

## Notes and Recommendations

- The `multi_tenant_mgr` utility is currently available for **TC14.3** at `\\svi6s025\shared_patches\TcXLite_multi_tenant_mgr\lnx_tc14.3.0.6.20231030`.
- Information such as **checked out status is not exported** by design. Please **check in all items before export**.
- It is recommended to:
    - Execute and validate each batch before starting the next.
    - Verify Item and dataset access in Teamcenter X (Standard/Advanced/Premium) after each batch.

---

If you encounter issues or require further clarification, contact your Teamcenter administrator or support team.