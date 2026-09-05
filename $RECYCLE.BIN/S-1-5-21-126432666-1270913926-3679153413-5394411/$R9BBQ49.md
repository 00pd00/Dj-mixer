# Validation Steps for SolidWorks or SolidWorks Enterprise Integration

This document provides clear post-deployment and validation instructions for integrating SolidWorks or SolidWorks Enterprise with Teamcenter X. Follow these steps to ensure your integration is correctly configured and operational.

---

## Post-Deployment Steps

### For SolidWorks or SolidWorks Enterprise Integration (Do not use)

**Applicable Product IDs:** TC30607-XT, TC030506-XT, TC7100, TC7101

To support the 2312 Integration release with TCX2412, execute the following command. This is a temporary workaround for PR11067422, which is fixed in the 2406 Integration release. Use this until Integration release 2406 is available.

```sh
preferences_manager -u=infodba -pf=$TC_SECURITY_DIR/default_infodba.pwf -g=dba -mode=import -scope=site -action=OVERRIDE -file=${TC_INSTALL_DIR}/swim/configurations/swimPrefsOverwrite.xml
```

> **Note:**  
> Instructions on running `tcc exec` are detailed in the section [Executing Teamcenter ITK Utilities in a containerized environment](../../020_Operations/030_Day%20N%20Operations/020_Executing%20Teamcenter%20ITK%20Utilities.md#executing-teamcenter-itk-utilities-in-a-containerized-environment).

---

### Additional Steps for SolidWorks Enterprise Only

**Applicable Product IDs:** TC030506-XT

To enable Enterprise capabilities in the SolidWorks Integration client, complete the relevant configuration based on your environment.

#### If `swim.properties` is Managed in Teamcenter (TcX Essentials):

1. Log in as a DBA user.
2. Search for `Item ID = SW2_Properties`.
3. Expand the search results to the dataset and export the `swim.properties` file to your local disk.
4. Open `swim.properties` and ensure it contains the line `iman.enterprise=true` without a `#` at the beginning.

    ![Validate `iman.enterprise=true` in swim.properties](./image_237.png)

5. If the line is missing:
    - Edit the file and add `iman.enterprise=true` at the top.
    - Save the changes.
    - Check out the `SW2_Properties` dataset.
    - Import the updated file back into the dataset.
    - Check in the dataset.

#### If `swim.properties` is Not Managed in Teamcenter (TcX Standard, Advanced, and Premium):

1. On each client system, open the `swim.properties` file  
   (typically located at `C:\Apps\Siemens\Integrations\swim\swim.properties`).
2. Add the following line at the start of the file:

    ```text
    iman.enterprise=true
    ```

    ![Add `iman.enterprise=true` in swim.properties](./image_238.png)

3. Save the file to disk.

---

## Steps in Active Workspace

1. Log in to Active Workspace.
2. Select the **Newstuff** folder from the left side panel.
3. Choose to Add to the folder contents `-> Add`.
   ![Add content in Active Workspace](./image_239.png)
4. Search for SolidWorks dataset types by typing `SolidWorks`.
   - If these types are not listed, the SolidWorks Integration may not be deployed. Notify your administrator to resolve the configuration before continuing.
5. If the dataset types appear, the configuration is correct. For further verification, create a new dataset:
    1. Select the SolidWorks part dataset type.<br/>
        ![Select SolidWorks part dataset type](./image_240.png)
    2. Select or drag-and-drop a file with the extension `*.SLDPart`.
    3. After selecting a file, you can edit the dataset name, add a description, and complete the dataset creation.<br/>
        ![Edit and add dataset](./image_241.png)
    4. Confirm the dataset displays under the folder contents.
        - If errors occur, report them to your administrator to address configuration issues before proceeding.

---

Follow these steps to validate your SolidWorks or SolidWorks Enterprise integration and ensure your system operates as intended.
