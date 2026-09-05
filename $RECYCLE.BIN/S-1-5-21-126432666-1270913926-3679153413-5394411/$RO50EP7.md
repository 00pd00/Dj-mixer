# Naming Rules

This guide explains how to export and import Naming Rules (NameFields) from a multi-tenant Teamcenter environment. Naming Rules define the naming conventions used for objects in Teamcenter.

---

## Overview

Naming Rules migration involves retrieving NameField UIDs from the source tenant, exporting them using PLMXML, and importing them into the target environment. Follow each step carefully to ensure accurate migration.

- **Source Environment**: TCX Essentials (Multi-Tenant Teamcenter)
- **Target Environment**: Teamcenter X Standard/Advanced/Premium (Single-Tenant Teamcenter)
- **NameFields**: Objects that define naming conventions in Teamcenter.
- **Tenant**: Logical partition in multi-tenant Teamcenter.
- **PLMXML**: Product Lifecycle Management XML format for data exchange.
- **infodba**: Administrative user.
- **multi_tenant_mgr**: Utility for managing multi-tenant operations.

---

## Steps

The migration process consists of the following main steps:

1. **Retrieve NameField UIDs** from the source tenant
2. **Validate** that UIDs exist before proceeding
3. **Export NameField Data** using PLMXML format
4. **Import NameField Data** into the target environment
5. **Validate and Confirm** successful migration

---

## Retrieving NameField UIDs from Source (Multi-Tenant)

1. **Open Multi-Tenant Teamcenter Shell.**
2. **Run the following command** (replace placeholders as needed):

    ```bash
    tcc exec 'mkdir -p tcxlite2tcx/tcxlite/source_data/nf; cd tcxlite2tcx/tcxlite/source_data/nf; export TC_KEEP_SYSTEM_LOG=1; export SITCONS_AUTH_KEY=R3!FSvXS5aybUPTsFk!xd; multi_tenant_mgr -query -u=infodba -pf=<infodba_pwd_file> -g=dba <tenant_name> nameFields nameFields_uids.xml'
    ```

    - **Purpose**: Exports UIDs of nameFields belonging to the tenant into `nameFields_uids.xml`.
    - **Important**: Use the tenant **name** (not tenant ID) for `<tenant_name>`.

---

## Validating NameField UIDs

1. **Check the output file `nameFields_uids.xml`** to verify if any UIDs are present.
2. **If UIDs exist**: Proceed to the next step to export the corresponding NameFields using PLMXML.
3. **If no UIDs found**: No NameFields are configured for this tenant; migration is not required.

---

## Exporting NameField Data from Source

1. **If UIDs are present**, run the following command in the Multi-Tenant Teamcenter Shell:

    ```bash
    tcc exec 'plmxml_export -u=infodba -p=pw_infodba -g=dba -input_file=nameFields_uids.xml -xml_file=NF_plmxml_outfile.xml -log=NF_plmxml_log.log'
    ```

    - **Purpose**: Exports nameFields using PLMXML format into `NF_plmxml_outfile.xml`.
    - **Log File**: Check `NF_plmxml_log.log` for any export issues or confirmation.

---

## Transferring Data to Target Environment (Single-Tenant)

1. **Copy the exported file**:
    - **From**: `tcxlite2tcx/tcxlite/source_data/nf/NF_plmxml_outfile.xml` (source TCX Essentials)
    - **To**: `tcxlite2tcx/tcxlite/source_data/nf/` (target Teamcenter X Standard/Advanced/Premium)

2. **Set Permissions**:
    - Ensure the necessary read and write permissions on these files in the target environment.
        ```bash
        sudo chmod 755 /administration/admin_work/* --recursive 
        ```
---

## Importing NameField Data into Target Environment (Single-Tenant)

1. **Open Single-Tenant Teamcenter Shell.**
2. **Run the import command**:

    ```bash
    tcc exec 'plmxml_import -u=infodba -p=pw_infodba -g=dba -transfermode=incremental_import -import_mode=overwrite -xml_file=NF_plmxml_outfile.xml -TcxMTMode=on'
    ```

    - **Purpose**: Imports the NameFields from the PLMXML file into the target environment.
    - **Transfer Mode**: `incremental_import` - adds new objects and updates existing ones.
    - **Import Mode**: `overwrite` - replaces existing objects with imported data.
    - **TcxMTMode**: Enables multi-tenant mode during import.

---

## Validation and Confirmation

1. **Verify Import Success**:
    - Check the import logs for any errors or warnings.
    - Confirm that the naming rules are properly configured in the target environment.

2. **Test Naming Rules**:
    - Create test objects to verify that the naming conventions are working as expected.
    - Ensure that the naming patterns match those from the source environment.

---

## Notes and Recommendations

- **Backup**: Always create a backup of the target environment before importing naming rules.
- **Testing**: Test the naming rules thoroughly in a non-production environment before applying to production.
- **Validation**: After migration, validate that all naming conventions work correctly with your specific Teamcenter configuration.