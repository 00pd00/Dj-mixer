# Appendix

## Migrating Additional Object Classes

If you need to migrate objects from classes not covered in the previous sections, follow the steps below. This process ensures that all required objects from Teamcenter X Essentials are successfully migrated to Teamcenter X Standard/Advanced/Premium.

---

### Step 1: Import Closure Rules (If Needed)

If closure rules for certain object classes are not present in Teamcenter X Essentials but are provided by the product team, import these rules into both environments.

**A. Import Closure Rules into Teamcenter X Essentials (Multitenant Shell)**
  ```bash
  tcc exec 'export TC_TENANT=<tenant_id>; export TC_KEEP_SYSTEM_LOG=1; export SITCONS_AUTH_KEY=R3!FSvXS5aybUPTsFk!xd; tcxml_import -u=infodba -pf=<infodba_pwd_file> -g=dba -file=<closure_rule_xml_file> -scope_rules -scope_rules_mode=overwrite'
  ```
- This command imports the closure rules from the provided XML file.

**B. Import Closure Rules into Teamcenter X Standard/Advanced/Premium (SingleTenant Shell)**
  ```bash
  tcc exec 'export TC_KEEP_SYSTEM_LOG=1; export SITCONS_AUTH_KEY=R3!FSvXS5aybUPTsFk!xd; tcxml_import -u=infodba -pf=<infodba_pwd_file> -g=dba -file=<closure_rule_xml_file> -scope_rules -scope_rules_mode=overwrite'
  ```
- This command performs the same import on the target Teamcenter X system.

---

### Step 2: Extract UIDs of Objects to Migrate

Get the unique identifiers (UIDs) for all objects of the target class that are owned by the tenant.

```bash
tcc exec 'mkdir -p tcxlite2tcx/tcxlite/source_data/<class_name>; cd tcxlite2tcx/tcxlite/source_data/<class_name>; export TC_TENANT=<tenant_id>; export TC_KEEP_SYSTEM_LOG=1; export SITCONS_AUTH_KEY=R3!FSvXS5aybUPTsFk!xd; sitcons_accountability_chk -u=infodba -pf=<infodba_pwd_file> -g=dba -class=<class_name> -report=<class_name>.txt'
```
- This command exports the UIDs of all objects of the specified class to a file named `<class_name>.txt`.

> **Note:**  
> For lightweight objects (LWOs), such as `Alert(Fnd0Message)`, append the class name to the UID in the input file (e.g., `UID:Fnd0Message`).<br/>
> ![alt text](image-4.png)

---

### Step 3: Export Object Data From Source

Export the object data from the source (Teamcenter X Essentials) using the extracted UIDs.

```bash
tcc exec 'cd tcxlite2tcx/tcxlite/source_data/<class_name>; export TC_TENANT=<tenant_id>; export TC_KEEP_SYSTEM_LOG=1; export SITCONS_AUTH_KEY=R3!FSvXS5aybUPTsFk!xd; tcxml_export -u=infodba -pf=<infodba_pwd_file> -g=dba -low_level -inputuidfile=<class_name>.txt -file=<class_name>.xml  -xsl=tcxlite2tcx/tcxlite/schema_mapping/TCXE_Cad0Design_VER4NX.xslt'
```
- This exports object data into `<class_name>.xml`.

---

## Step 4: Transferring Data to Target Environment

1. **Copy Exported Files**:
    - From source: `tcxlite2tcx/tcxlite/source_data/<class_name>`
    - To target:   `tcxlite2tcx/tcxlite/source_data/<class_name>`
2. **Set Permissions**:
    - Make sure the files in the target environment have required read and write permissions.
        ```bash
        sudo chmod 755 /administration/admin_work/* --recursive 
        ```    

---

### Step 5: Import Object Data to Target

Import the exported object data to the target environment (Teamcenter X Standard/Advanced/Premium).

```bash
tcc exec 'cd tcxlite2tcx/tcxlite/source_data/<class_name>;export TC_KEEP_SYSTEM_LOG=1;export SITCONS_AUTH_KEY=R3!FSvXS5aybUPTsFk!xd;tcxml_import -u=infodba -pf=<infodba_pwd_file> -g=dba -low_level -file=<class_name>.xml'
```
- This command imports the objects into the target system.

---

### Step 6: Confirm Object Export/Import at Source

Verify that the objects were exported and imported correctly.

```bash
tcc exec 'cd tcxlite2tcx/tcxlite/source_data/<class_name>;export TC_TENANT=<tenant_id>;export TC_KEEP_SYSTEM_LOG=1;export SITCONS_AUTH_KEY=R3!FSvXS5aybUPTsFk!xd;tcxml_confirm_export -u=infodba -pf=<infodba_pwd_file> -g=dba -low_level -file=<class_name>_import_results.txt'
```
- This creates a confirmation report `<class_name>_import_results.txt`.

---

By following these steps, you can migrate any additional object classes not specifically outlined in the main migration process.

## Delete Tenant’s DSS Vault in TCX Essentials

### Purpose

 Teamcenter X Essentials stores file data in a cloud volume, maintained by DSS and referred to as a "vault". After successful transition of Essentials to Teamcenter X Standard/Advanced/Premium, the tenant in Essentials enviornment will be dropped. Then the DSS vault needs to be deleted.


**Prerequisites:**  
- [Obtain vault delete permissions](./000_Prerequisites.md#setting-up-the-sam-operating-account-polices)
- [Run backup_xmlinfo utility](./020_Admin-Data-Migration/000_tcx_essentials_export_admin_data_tenant.md#export-volume-information)

**Arguments:**

- vault-id :  Vault ID of the tenant to be deleted. This information can be obtained from back_xmlinfo utility's output
- Use the `DSS_ACCESS_KEY` and `DSS_SECRET_ACCESS_KEY` of the account where the dss vault to be deleted.
- Depending on production or pre-prod environment, DSS Endpoint URL needs to be update

---
#### DeleteVault Command Syntax

```bash
aws lambda invoke --region us-east-1 \
  --function-name arn:aws:lambda:us-east-1:361500002652:function:tcx_cli:PRD \
  --cli-binary-format raw-in-base64-out \
  --payload '[["<dss-secret-key>","<dss-secret-access-key>","us-east-1.sws.siemens.com"],["dss","DeleteVault","<vault-id>"]]' \
  resultoutputfile-delete-vault.txt
