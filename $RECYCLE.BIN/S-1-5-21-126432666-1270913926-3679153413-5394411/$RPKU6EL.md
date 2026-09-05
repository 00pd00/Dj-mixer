# Ownership Change Procedure

After successfully exporting and importing data between systems, update the ownership of migrated objects to reflect the target environment. This involves extracting, transferring, performing, and confirming ownership changes using Teamcenter commands.

---

## Steps to Change Ownership

### 1. Extract Ownership From Source (Multitenant Teamcenter Shell)

1. Open a shell in the multitenant Teamcenter environment (source).
2. Run the following command to extract the ownership of objects moved to the target:

    ```bash
    tcc exec 'mkdir -p tcxlite2tcx/tcxlite/source_data/OwnershipChange; cd tcxlite2tcx/tcxlite/source_data/OwnershipChange; export TC_TENANT=<tenant_id>; export TC_KEEP_SYSTEM_LOG=1; export SITCONS_AUTH_KEY=R3!FSvXS5aybUPTsFk!xd; tcxml_xfer_ownership -u=infodba -pf=<infodba_pwd_file> -g=dba -action=extract -report=source_ownership_extract.txt -change_ownership_to=<target_site_id>'
    ```

    - This command creates a report (`source_ownership_extract.txt`) of the objects' ownership to be changed.

---

### 2. Copy Ownership Data to Target (SingleTenant Teamcenter Shell)

1. Copy the contents of the folder `tcxlite2tcx/tcxlite/source_data/OwnershipChange` from the **source** (TCX Essentials) to the **target** (Teamcenter X Standard/Advanced/Premium).
2. On the **target**, ensure these files have the necessary read and write permissions.

---

### 3. Perform Ownership Change at Target

1. Open a shell in the target (SingleTenant Teamcenter environment).
2. Run the following command to perform the actual ownership update:

    ```bash
    tcc exec 'cd tcxlite2tcx/tcxlite/source_data/OwnershipChange; export TC_TENANT=<tenant_id>; export TC_KEEP_SYSTEM_LOG=1; export SITCONS_AUTH_KEY=R3!FSvXS5aybUPTsFk!xd; tcxml_xfer_ownership -u=infodba -pf=<infodba_pwd_file> -g=dba -action=perform -inputfile=source_ownership_extract.txt -file=target_ownership_transfer_status.txt'
    ```

    - This command updates the ownership on the **target** and logs the status in `target_ownership_transfer_status.txt`.

---

### 4. Copy Status Data Back to Source

1. Copy the contents of the folder `tcxlite2tcx/tcxlite/source_data/OwnershipChange` from the **target** back to the **source** (TCX Essentials).
2. On the **source**, grant the required read and write permissions on these files.

---

### 5. Confirm Ownership Change at Source (Multitenant Teamcenter Shell)

1. In the source environment, run the command below to confirm that the ownership has been updated:

    ```bash
    tcc exec 'cd tcxlite2tcx/tcxlite/source_data/OwnershipChange; export TC_KEEP_SYSTEM_LOG=1; export SITCONS_AUTH_KEY=R3!FSvXS5aybUPTsFk!xd; tcxml_xfer_ownership -u=infodba -pf=<infodba_pwd_file> -g=dba -action=update_status -inputfile=target_ownership_transfer_status.txt -report=ownership_transfer_update_status.txt -change_ownership_to=<target_site_id>'
    ```

    - This command creates a final report (`ownership_transfer_update_status.txt`) confirming successful ownership changes in the source environment.

---

## Summary of Command Usage

| Step    | Shell Location | Description                                | Key Command                                                         |
|---------|---------------|--------------------------------------------|---------------------------------------------------------------------|
| Step 1  | Source        | Extract ownership report                   | `tcxml_xfer_ownership -action=extract ...`                          |
| Step 2  | Target        | Perform ownership change with extracted data| `tcxml_xfer_ownership -action=perform ...`                          |
| Step 3  | Source        | Confirm and update ownership status        | `tcxml_xfer_ownership -action=update_status ...`                    |

---

## Notes

- Replace `<tenant_id>`, `<infodba_pwd>`, and `<target_site_id>` with your actual environment values.
- Always ensure file permissions are set correctly after transferring data between systems to avoid permission issues.
- For troubleshooting or audit purposes, review the generated `.txt` files in each step.



### 6. Detach the mapping transformer to Transfermode

## Source Site

Use the below command to detach the schema mapping transformer to Transfermode

```bash
tcc exec 'cd tcxlite2tcx/tcxlite/schema_mapping; export TC_KEEP_SYSTEM_LOG=1; export SITCONS_AUTH_KEY=R3!FSvXS5aybUPTsFk!xd; plmxml_tm_edit_xsl -u=infodba -pf=<infodba_pwd_file> -g=dba -action=detach -transfermode=<the transfermode name attached to the default TransferOptionSet for export> -xsl_file=<mapping_transformer_rule_file_name>'
```


Refer to the section [Datamodel Schema Mapping](011_data_model_schema_mapping.md#attach-the-mapping-transformer-to-transfermode) to get the xsl file name attached to the transfer mode


*Example:*

tcc exec 'cd tcxlite2tcx/tcxlite/schema_mapping; export TC_KEEP_SYSTEM_LOG=1; export SITCONS_AUTH_KEY=R3!FSvXS5aybUPTsFk!xd; plmxml_tm_edit_xsl -u=infodba -pf=$TC_SECURITY_DIR/default_infodba.pwf -g=dba -action=detach -transfermode=SiteConsolidationDefaultTM -xsl_file=cad_design_mapping_V2.csv'


- **Purpose**: This command detaches the schema mapping transformer to the transfer mode

---
