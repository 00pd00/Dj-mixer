# Saved Searches

This guide explains how to export and import Awp0FullTextSavedSearch objects (Saved Searches) owned by a tenant in a multi-tenant Teamcenter environment. Please follow the steps below for accurate migration.

---

## Overview

Awp0FullTextSavedSearch objects represent saved search definitions for users in Teamcenter. This process covers exporting their UIDs, creating a valid UID file, exporting the objects themselves, copying files, importing on the target environment, and confirming migration.

---

## Exporting Saved Search UIDs

1. **Open the Multi-Tenant Teamcenter Shell.**
2. **Run the following command** (replace placeholders as appropriate):

    ```bash
    tcc exec 'mkdir -p tcxlite2tcx/tcxlite/source_data/fullTextSavedSearch; cd tcxlite2tcx/tcxlite/source_data/fullTextSavedSearch; export TC_TENANT=<tenant_id>; export TC_KEEP_SYSTEM_LOG=1; export SITCONS_AUTH_KEY=R3!FSvXS5aybUPTsFk!xd; sitcons_accountability_chk -u=infodba -pf=<infodba_pwd_file> -g=dba -class=Awp0FullTextSavedSearch -report=fullTextSavedSearchOut.txt'
    ```

    - **Purpose**: Exports UIDs of all Awp0FullTextSavedSearch objects into `fullTextSavedSearchOut.txt`.

---

## Preparing the UID File

1. **Create the Export File:**
   - From `fullTextSavedSearchOut.txt`, extract the relevant UIDs.<br/>
     ![alt text](image-2.png)
2. **Build `fullTextSavedSearch.txt`:**
   - List the UIDs (one per line) in `fullTextSavedSearch.txt`.

    ```
    <uid1>
    <uid2>
    <uid3>
    ```

    ![alt text](image-3.png)

   - This file will act as the input for export.

---

## Exporting Saved Search Data from Source

1. **In the Multi-Tenant Teamcenter Shell, run:**

    ```bash
    tcc exec 'cd tcxlite2tcx/tcxlite/source_data/fullTextSavedSearch; export TC_TENANT=<tenant_id>; export TC_KEEP_SYSTEM_LOG=1; export SITCONS_AUTH_KEY=R3!FSvXS5aybUPTsFk!xd; tcxml_export -u=infodba -pf=<infodba_pwd_file> -g=dba -low_level -inputuidfile=fullTextSavedSearch.txt -file=fullTextSavedSearch.xml -xsl=tcxlite2tcx/tcxlite/schema_mapping/TCXE_Cad0Design_VER4NX.xslt'
    ```

    - **Purpose**: Exports all saved searches listed in the input file into `fullTextSavedSearch.xml`.

---

## Transferring Data to Target Environment

1. **Copy Exported Files:**
    - From source: `tcxlite2tcx/tcxlite/source_data/fullTextSavedSearch`
    - To target:   `tcxlite2tcx/tcxlite/source_data/fullTextSavedSearch`
2. **Set Permissions:**
    - Ensure proper read and write permissions on these files in the target Teamcenter environment.
        ```bash
        sudo chmod 755 /administration/admin_work/* --recursive 
        ```
---

## Importing Saved Search Data into Target

1. **Open the Single-Tenant Teamcenter Shell.**
2. **Run the following command:**

    ```bash
    tcc exec 'cd tcxlite2tcx/tcxlite/source_data/fullTextSavedSearch; export TC_KEEP_SYSTEM_LOG=1; export SITCONS_AUTH_KEY=R3!FSvXS5aybUPTsFk!xd; tcxml_import -u=infodba -pf=<infodba_pwd_file> -g=dba -low_level -file=fullTextSavedSearch.xml'
    ```

    - **Purpose**: Imports all saved searches from the XML file into the target environment.

---

## Validating and Confirming Import

1. **Copy Data Back to Source:**
    - From: `tcxlite2tcx/tcxlite/source_data/fullTextSavedSearch` in the target environment
    - To:   `tcxlite2tcx/tcxlite/source_data/fullTextSavedSearch` in the source environment (TCXEssentials)
2. **Set Permissions:**
    - Make sure read/write permissions are correct in the source environment.
        ```bash
        sudo chmod 755 /administration/admin_work/* --recursive 
        ```    
3. **Confirm the Export/Import:**
    - In the Multi-Tenant Teamcenter Shell, run:

      ```bash
      tcc exec 'cd tcxlite2tcx/tcxlite/source_data/fullTextSavedSearch; export TC_TENANT=<tenant_id>; export TC_KEEP_SYSTEM_LOG=1; export SITCONS_AUTH_KEY=R3!FSvXS5aybUPTsFk!xd; tcxml_confirm_export -u=infodba -pf=<infodba_pwd_file> -g=dba -low_level -file=fullTextSavedSearch_import_results.txt'
      ```

    - **Purpose**: Confirms successful export and import of Awp0FullTextSavedSearch objects.