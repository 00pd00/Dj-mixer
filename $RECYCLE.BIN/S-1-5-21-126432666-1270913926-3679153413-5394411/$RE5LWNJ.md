# Handling Item Import Failures Due to Item ID Conflicts

If some Items failed to import because of Item ID conflicts during the migration process, follow this guide to identify and process only the conflicting Items.

---

## Overview

When Item imports fail due to ID conflicts, the steps below help you identify affected Items, process them separately in batches, and resolve the conflicts for a successful import.

---

## Identifying Item ID Conflicts

1. **Perform this step only after completing all standard item imports.**
2. **Locate Failed Imports**:
    - Search for all `Itemxx_importer.log` files containing the error message:
      > "The instance cannot be saved because it contains at least one attribute that violates a unique attribute rule."
3. **Consolidate Input Files**:
    - For each log file with the conflict error, find the corresponding `Itemxx.txt` input file.
    - Gather all such `Itemxx.txt` files and combine their contents into a single file named `ConflictItems01.txt`.
4. **Handling Large Numbers of Conflicts**:
    - If the list is very large (e.g., thousands of Item UIDs), split `ConflictItems01.txt` into smaller batches such as `ConflictItems01.txt`, `ConflictItems02.txt`, etc.

---

## Batching Conflicting Items

1. **Batch Size**:
   - Divide the consolidated list into batches, suggested at 1,000 UIDs per batch.
   - Name the files sequentially (`ConflictItems01.txt`, `ConflictItems02.txt`, and so on).
2. **Recommendation**:
   - For each batch, complete the export, import, and validation before proceeding to the next batch.

---

## Exporting Conflicting Item Data from Source

1. **In the Multi-Tenant Teamcenter Shell**:
   - For each conflict batch file (e.g., `ConflictItems01.txt`), run:

    ```bash
    tcc exec 'cd tcxlite2tcx/tcxlite/source_data/Items; export TC_TENANT=<tenant_id>; export TC_KEEP_SYSTEM_LOG=1; export SITCONS_AUTH_KEY=R3!FSvXS5aybUPTsFk!xd; tcxml_export -u=infodba -pf=<infodba_pwd_file> -g=dba -low_level -inputuidfile=ConflictItems01.txt -file=ConflictItems01.xml -xsl=tcxlite2tcx/tcxlite/schema_mapping/TCXE_Cad0Design_VER4NX.xslt -force_retraverse'
    ```

   - **Purpose**: Force exports the input Items and their related objects into the XML file.



---

## Transferring Data to Target Environment

1. **Copy Exported Files**:
    - Copy data from the source folder:  
      `tcxlite2tcx/tcxlite/source_data/Items`
    - To the target folder:  
      `tcxlite2tcx/tcxlite/source_data/Items`
2. **Update Permissions**:
    - Ensure read and write permissions on the files in the target environment.

        ```bash
        sudo chmod 755 /administration/admin_work/* --recursive 
        ```
---

## Importing Conflicting Item Data into Target

1. **In the Single-Tenant Teamcenter Shell**, for each batch file (e.g., `ConflictItems01.xml`), run:

    ```bash
    tcc exec 'cd tcxlite2tcx/tcxlite/source_data/Items; export TC_KEEP_SYSTEM_LOG=1; export SITCONS_AUTH_KEY=R3!FSvXS5aybUPTsFk!xd; tcxml_import -u=infodba -pf=<infodba_pwd_file> -g=dba -low_level -session_options=opt_process_conflict_item_id:true -file=ConflictItems01.xml'
    ```

    - **Purpose**: Imports the items and their associated objects, specifically processing the Item ID conflicts.

---

## Validating and Confirming Import

1. **Copy Result Data Back to Source**:
    - Copy data from `tcxlite2tcx/tcxlite/source_data/Items` in the target environment
    - To the same folder in the source environment (TCXEssentials)
2. **Set Permissions**:
    - Update to ensure necessary read/write permissions are in place in the source environment.
        ```bash
        sudo chmod 755 /administration/admin_work/* --recursive 
        ```
3. **Confirm the Export/Import**:
    - In the Multi-Tenant Teamcenter shell, for each batch, run:

      ```bash
      tcc exec 'cd tcxlite2tcx/tcxlite/source_data/Items; export TC_TENANT=<tenant_id>; export TC_KEEP_SYSTEM_LOG=1; export SITCONS_AUTH_KEY=R3!FSvXS5aybUPTsFk!xd; tcxml_confirm_export -u=infodba -pf=<infodba_pwd_file> -g=dba -low_level -file=ConflictItems01_import_results.txt'
      ```

    - **Purpose**: Confirms the items and objects have been exported and imported correctly.

---

## Recommendations

- **Batch Processing**: Always process, import, and validate each batch before proceeding to the next one.
- **Validation**: After each batch import, verify the Items and datasets in Teamcenter X (Standard/Advanced/Premium) by opening datasets and checking their integrity.
- **Continue Only if Successful**: If everything is validated and working as expected, proceed with the next conflict batch.

---

For further help or troubleshooting, contact your Teamcenter administrator or support team.