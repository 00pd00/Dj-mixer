# Updating FMS to Remove `tempadminvol` from Teamcenter X

This section explains how to safely remove the `tempadminvol` volume from the File Management System (FMS) configuration in Teamcenter X Standard/Advanced/Premium environments. These instructions help ensure that all file references are updated and that the obsolete volume is cleanly removed from the system.

---

## Prerequisites

Before starting, confirm that all imanfiles previously pointing to `tempadminvol` are now referencing the correct Teamcenter X EFS volume. To check this:

1. Open the Bill of Materials (BOM) structure created in the prerequisites phase.
2. Access the dataset of a standard part present in the BOM structure.
3. Open the dataset and verify that the `namedreference` of the imanfile displays a file size.

If everything looks correct, proceed with the steps below to remove `tempadminvol`.

---

## Get Information on `tempadminvol` Volume

You need to export information about `tempadminvol` from Teamcenter X Standard/Advanced/Premium.

### Steps

1. Access the SingleTenant Teamcenter shell.
2. Run the following command to export `tempadminvol` info as XML:

    ```bash
    tcc exec '
      mkdir -p tcxlite2tcx/tcxlite/target_vol_info3; cd tcxlite2tcx/tcxlite/target_vol_info3; export TC_KEEP_SYSTEM_LOG=1; backup_xmlinfo -u=infodba -pf=<infodba_pwd_file>'
    ```

    - This will create a `backup.xml` file that contains the definitions of Teamcenter volumes at the target system.

3. Open the generated `backup.xml` file and locate information specific to `tempadminvol`:
    - Find and note the `enterpriseId`.
    - Find and note the `volumeUid` for `tempadminvol`.

---

## Update FMS to Remove `tempadminvol`

After ensuring all file references are updated, remove `tempadminvol` from the FSC (File Server Controller) configuration.

### Steps

1. **Stop FMS**

    - Ensure the FMS service is stopped before making configuration changes.

2. **Edit the FMS Master XML File**

    - Locate the FMS master configuration file — typically found at:
      ```
      /<CUSTOMER_ID>/<CUSTOMER_ID>/deploy/component/config/fmsmaster/fsc
      ```
    - Open this XML file in a text editor.

    - Within the `<fsc>` element (which looks like `<fsc id="<fsc_id>" address="<address>" ismaster="true">`), find and remove the volume entry related to `tempadminvol`. It should look like this:

      ```xml
      <volume id="<tempadminvol_uid>" enterpriseid="<enterpriseId>" root="unixpath" priority="0" />
      ```

    - Delete this entire `<volume ... />` line for `tempadminvol`.

3. **Restart FMS**

    - Once changes are saved, restart the FMS service to apply the configuration updates.

---

By following these steps, you will successfully remove the obsolete `tempadminvol` from your Teamcenter X FMS configuration, ensuring your environment is clean and only references in-use volumes.