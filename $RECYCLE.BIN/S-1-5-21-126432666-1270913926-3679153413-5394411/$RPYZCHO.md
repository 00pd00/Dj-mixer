# UX Preference Setup

This guide describes how to update your Teamcenter X environment’s workspace, column configuration, and preferences to maintain the same user experience as Teamcenter X Essentials.

---

## Download Transition Scripts

1. Download the transition scripts for upgrading from Teamcenter X Essentials to Teamcenter X Standard/Advanced/Premium:
    - [TCXLITE_2_TCX_SCRIPTS_v003.zip](https://artifacts.industrysoftware.automation.siemens.com/artifactory/generic-local/com/siemens/tcxlite/TCXLITE_2_TCX_SCRIPTS/TCXLITE_2_TCX_SCRIPTS_v003.zip)

---

## Run Transition Scripts

Follow these steps to execute the transition scripts:

1. **Connect to the AWS EC2 instance** as `tcx_user`.
2. **Create a folder** where you want to place the scripts. For example:
    ```bash
    mkdir -p /administration/admin_work/transition
    ```
    If you create a different folder, update the path in `tcxlite_2_tcx_setup.sh`.
3. **Upload** `TCXLITE_2_TCX_SCRIPTS_v003.zip` to `/administration/admin_work/transition`.
4. **Unzip** the archive:
    ```bash
    sudo unzip TCXLITE_2_TCX_SCRIPTS_v003.zip
    ```
5. **Change ownership** of the extracted files:
    ```bash
    sudo chown -R tcx_user:root /administration/admin_work/transition
    ```
6. **Grant execute permission** to the setup script:
    ```bash
    sudo chmod "+x" /administration/admin_work/transition/tcxlite_2_tcx_setup.sh
    ```
7. **Set the context** for your customer environment:
    ```bash
    . tcc set_context <customerID> prd
    ```
8. **Run the setup script** with the appropriate options for your environment:
    ```bash
    tcc exec '/administration/admin_work/transition/tcxlite_2_tcx_setup.sh -u=infodba [-p=password|-pf=PasswordFile] -g=dba -cad=<CAD Tool. Valid value: NX|SOLIDEDGE|SOLIDWORKS>'
    ```

---

## Update Search Prefilter Preference

Update the prefilter preference in your Teamcenter X environment to align with Teamcenter X Essentials:

1. Locate the `AW_FullTextSearch_TypeCategories` preference in Teamcenter X.
2. Locate the preference value entry beginning with `EBOM Designs:` If it already contains the value `Cad0DesignRevision`, remove it as illustrated in the image below.<br/>
   ![alt text](image-2.png)
3. Add `Designs:Cad0DesignRevision` as a new value entry to enable the "Designs:" prefilter.<br/>
   ![alt text](image-3.png)

---

By following these steps, you ensure your Teamcenter X environment maintains a consistent and familiar user experience after the transition.