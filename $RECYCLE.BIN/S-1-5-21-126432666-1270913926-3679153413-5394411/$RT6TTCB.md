# Alerts

This guide provides step-by-step instructions to export and import Alerts (Fnd0Message lightweight objects) owned by a tenant in a multi-tenant Teamcenter system. Follow the procedure below to ensure a smooth and successful data migration.

---

## Overview

Alerts in Teamcenter are stored as Fnd0Message lightweight objects (LWOs). The migration process involves exporting UIDs, ensuring proper formatting, exporting data, copying files, importing into the target, and confirming the process.

---

## Exporting Alert UIDs

1. **Open the Multi-Tenant Teamcenter Shell.**
2. **Run the following command** (replace placeholders as appropriate):

    ```bash
    tcc exec 'mkdir -p tcxlite2tcx/tcxlite/source_data/Alerts; cd tcxlite2tcx/tcxlite/source_data/Alerts; export TC_TENANT=<tenant_id>; export TC_KEEP_SYSTEM_LOG=1; export SITCONS_AUTH_KEY=R3!FSvXS5aybUPTsFk!xd; sitcons_accountability_chk -u=infodba -pf=<infodba_pwd_file> -g=dba -class=Fnd0Message -report=alerts.txt'
    ```

    - **Purpose**: Exports UIDs of all Alerts (Fnd0Message objects) to `alerts.txt`.

---

## Preparing the UID File for Lightweight Objects

- Since **Fnd0Message** is a Lightweight Object (LWO), append `:Fnd0Message` to each UID in your `alerts.txt` file.
- Example UID file content:

    ```
    <uid1>:Fnd0Message
    <uid2>:Fnd0Message
    <uid3>:Fnd0Message
    ```

    ![alt text](image-1.png)

- This format is required for both exporting and importing Alerts.

---

## Exporting Alert Data from Source

1. **In the Multi-Tenant Teamcenter Shell, run:**

    ```bash
    tcc exec 'cd tcxlite2tcx/tcxlite/source_data/Alerts; export TC_TENANT=<tenant_id>; export TC_KEEP_SYSTEM_LOG=1; export SITCONS_AUTH_KEY=R3!FSvXS5aybUPTsFk!xd; tcxml_export -u=infodba -pf=<infodba_pwd_file> -g=dba -low_level -inputuidfile=alerts.txt -file=alerts.xml -xsl=tcxlite2tcx/tcxlite/schema_mapping/TCXE_Cad0Design_VER4NX.xslt'
    ```

    - **Purpose**: Exports all Alerts using the UID file into `alerts.xml`.

---

## Transferring Data to Target Environment

1. **Copy Exported Files:**
    - From source: `tcxlite2tcx/tcxlite/source_data/Alerts`
    - To target:   `tcxlite2tcx/tcxlite/source_data/Alerts`
2. **Set Permissions:**
    - Ensure read and write permissions are set for the files in the target Teamcenter environment.
        ```bash
        sudo chmod 755 /administration/admin_work/* --recursive 
        ```
---

## Importing Alert Data into Target

1. **Open the Single-Tenant Teamcenter Shell.**
2. **Run the following command:**

    ```bash
    tcc exec 'cd tcxlite2tcx/tcxlite/source_data/Alerts; export TC_KEEP_SYSTEM_LOG=1; export SITCONS_AUTH_KEY=R3!FSvXS5aybUPTsFk!xd; tcxml_import -u=infodba -pf=<infodba_pwd_file> -g=dba -low_level -file=alerts.xml'
    ```

    - **Purpose**: Imports all Alerts from the XML file.

---

## Validating and Confirming Import

1. **Copy Data Back to Source:**
    - From: `tcxlite2tcx/tcxlite/source_data/Alerts` in the target environment
    - To:   `tcxlite2tcx/tcxlite/source_data/Alerts` in the source environment (TCXEssentials)
2. **Set Permissions:**
    - Make sure the correct read/write permissions are applied in the source environment.
        ```bash
        sudo chmod 755 /administration/admin_work/* --recursive 
        ```    
3. **In the Multi-Tenant Teamcenter Shell, verify and confirm:**

    ```bash
    tcc exec 'cd tcxlite2tcx/tcxlite/source_data/Alerts; export TC_TENANT=<tenant_id>; export TC_KEEP_SYSTEM_LOG=1; export SITCONS_AUTH_KEY=R3!FSvXS5aybUPTsFk!xd; tcxml_confirm_export -u=infodba -pf=<infodba_pwd_file> -g=dba -low_level -file=alerts_import_results.txt'
    ```

    - **Purpose**: Confirms the successful export and import of Alert objects.

---

## Recommendations

- **Ensure UID Format**: Confirm that each UID in `alerts.txt` is formatted as `<uid>:Fnd0Message`.
- **Validation**: After import, verify that Alerts are present and accurate in the target environment.
- **Continue Only When Successful**: Only proceed after all validations are complete.
