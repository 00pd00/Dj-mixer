# User Folders

This guide explains how to export user folder information from a multi-tenant Teamcenter environment and update the corresponding data in a single-tenant environment. Follow these steps to ensure user folders are migrated accurately.

---

## Overview

User folders are personal data containers assigned to each Teamcenter user. This guide details how to extract, clean, transfer, and update user folder information between environments.

---

## Exporting User Folders Information from Source

1. **Open the Multi-Tenant Teamcenter Shell.**
2. **Run the following command** (replace placeholders as required):

    ```bash
    tcc exec 'mkdir -p tcxlite2tcx/tcxlite/source_data/UserFolders; cd tcxlite2tcx/tcxlite/source_data/UserFolders; export TC_TENANT=<tenant_id>; export TC_KEEP_SYSTEM_LOG=1; export SITCONS_AUTH_KEY=R3!FSvXS5aybUPTsFk!xd; sitcons_user_folders -u=infodba -pf=<infodba_pwd_file> -g=dba -mode=extract -report=source_user_folders.txt'
    ```

    - **Purpose**: Extracts user folder information and saves it to `source_user_folders.txt`.

---

## Preparing the User Folders Report

1. **Edit the `source_user_folders.txt` file:**
    - Remove any lines that contain user folder information related to the `infodba` user. (These lines can be identified by `#UserID` being `infodba`).

---

## Transferring Data to Target Environment

1. **Copy Exported Files:**
    - From source: `tcxlite2tcx/tcxlite/source_data/UserFolders`
    - To target:   `tcxlite2tcx/tcxlite/source_data/UserFolders`
2. **Set Permissions:**
    - Ensure all files in the target environment have appropriate read and write permissions.
        ```bash
        sudo chmod 755 /administration/admin_work/* --recursive 
        ```    

---

## Updating User Folders in Target

1. **Open the Single-Tenant Teamcenter Shell.**
2. **Run the following command** (replace placeholders as needed):

    ```bash
    tcc exec 'cd tcxlite2tcx/tcxlite/source_data/UserFolders; export TC_TENANT=<tenant_id>; export TC_KEEP_SYSTEM_LOG=1; export SITCONS_AUTH_KEY=R3!FSvXS5aybUPTsFk!xd; sitcons_user_folders -u=infodba -pf=<infodba_pwd_file> -g=dba -mode=update -inputfile=source_user_folders.txt'
    ```

    - **Purpose**: Updates user folders in the target Teamcenter system using the prepared file.