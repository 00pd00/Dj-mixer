# Discussions

This guide walks you through exporting and importing Discussions (Ac0Conversation objects) owned by a tenant in Teamcenter. Each step is provided for clarity and completeness. Follow the instructions carefully for successful data migration.

---

## Overview

Discussions in Teamcenter are stored as Ac0Conversation lightweight objects (LWOs). The process includes exporting, preparing UID files, moving data, and confirming successful import.

---

## Exporting Discussion UIDs

1. **Open the Multi-Tenant Teamcenter Shell.**
2. **Run the following command** (replace placeholders as appropriate):

    ```bash
    tcc exec 'mkdir -p tcxlite2tcx/tcxlite/source_data/discussions; cd tcxlite2tcx/tcxlite/source_data/discussions; export TC_TENANT=<tenant_id>; export TC_KEEP_SYSTEM_LOG=1; export SITCONS_AUTH_KEY=R3!FSvXS5aybUPTsFk!xd; sitcons_accountability_chk -u=infodba -pf=<infodba_pwd_file> -g=dba -class=Ac0Conversation -report=discussions.txt'
    ```

    - **Purpose**: Exports UIDs of all `Discussions` (Ac0Conversation objects) into `discussions.txt`.

---

## Preparing the UID File for Lightweight Objects

- Since `Ac0Conversation` is a Lightweight Object (LWO), you must **append `:Ac0Conversation` to each UID** in your `discussions.txt` file.
- Example:

    ```
    <uid1>:Ac0Conversation
    <uid2>:Ac0Conversation
    <uid3>:Ac0Conversation
    ```

    ![alt text](image.png)

- **This format is required for exporting and importing discussions.**

---

## Exporting Discussion Data from Source

1. **In the Multi-Tenant Teamcenter Shell, run:**

    ```bash
    tcc exec 'cd tcxlite2tcx/tcxlite/source_data/discussions; export TC_TENANT=<tenant_id>; export TC_KEEP_SYSTEM_LOG=1; export SITCONS_AUTH_KEY=R3!FSvXS5aybUPTsFk!xd; tcxml_export -u=infodba -pf=<infodba_pwd_file> -g=dba -low_level -inputuidfile=discussions.txt -file=discussions.xml -xsl=tcxlite2tcx/tcxlite/schema_mapping/TCXE_Cad0Design_VER4NX.xslt'
    ```

    - **Purpose**: Exports all discussions (using UID file) into `discussions.xml`.

---

## Transferring Data to Target Environment

1. **Copy Exported Files:**
    - From source: `tcxlite2tcx/tcxlite/source_data/discussions`
    - To target:   `tcxlite2tcx/tcxlite/source_data/discussions`
2. **Set Permissions:**
    - Ensure all files have the required read and write permissions in the target Teamcenter environment.
        ```bash
        sudo chmod 755 /administration/admin_work/* --recursive 
        ```
---

## Importing Discussion Data into Target

1. **Open the Single-Tenant Teamcenter Shell.**
2. **Run the following command:**

    ```bash
    tcc exec 'cd tcxlite2tcx/tcxlite/source_data/discussions; export TC_KEEP_SYSTEM_LOG=1; export SITCONS_AUTH_KEY=R3!FSvXS5aybUPTsFk!xd; tcxml_import -u=infodba -pf=<infodba_pwd_file> -g=dba -low_level -file=discussions.xml'
    ```

    - **Purpose**: Imports all Discussions from the XML file.

---

## Validating and Confirming Import

1. **Copy Data Back to Source:**
    - From: `tcxlite2tcx/tcxlite/source_data/discussions` in the target environment
    - To:   `tcxlite2tcx/tcxlite/source_data/discussions` in the source environment (TCXEssentials)
2. **Set Permissions:**
    - Grant correct read/write permissions on these files in the source environment.
        ```bash
        sudo chmod 755 /administration/admin_work/* --recursive 
        ```    
3. **In the Multi-Tenant Teamcenter Shell, verify and confirm:**

    ```bash
    tcc exec 'cd tcxlite2tcx/tcxlite/source_data/discussions; export TC_TENANT=<tenant_id>; export TC_KEEP_SYSTEM_LOG=1; export SITCONS_AUTH_KEY=R3!FSvXS5aybUPTsFk!xd; tcxml_confirm_export -u=infodba -pf=<infodba_pwd_file> -g=dba -low_level -file=discussions_import_results.txt'
    ```

    - **Purpose**: Confirms successful export and import of discussion objects.

---

## Recommendations

- **Ensure UID Format**: Double-check that all UIDs in `discussions.txt` are correctly formatted as `<uid>:Ac0Conversation`.
- **Validation**: After import, verify that discussions are accessible and complete in the target environment.
- **Continue**: Proceed with the process only after all validations are successful.