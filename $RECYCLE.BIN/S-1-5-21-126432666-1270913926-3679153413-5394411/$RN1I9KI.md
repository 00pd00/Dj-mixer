## Teamcenter Dispatcher Integration with CatiaV5ToJtDirect Translator

**Applicable Product IDs:** VS22196-XT

---

### Introduction

This guide details the deployment of the Teamcenter Integration for CATIA (TcIC) CATIA V5 JT translation service (`SIEMENS.catiav5tojtdirect`), dispatcher client, and module—without Preview Post Action—on the same machine, using the Siemens Bi-Directional JT translator.

> **Note:**  
> Installation of Translation Solutions must be performed using a `dba` user. If not, preferences will not be imported into Teamcenter during the installation.

---

### Pre-requisites

Before deployment and configuration of the `catiav5tojtdirect` translation service, the following components must be installed and verified as operational:

- **4-Tier Dispatcher deployment** is operational (for example, validate using the `tozipfile` service).
- **Siemens Bi-Directional JT translator for CATIA V5 (VS22196)** is installed in a version that supports your CATIA releases.
    - Downloads are available at [Support Center - Downloads](https://support.sw.siemens.com/).
    - Review translator documentation to confirm CATIA versions supported.  
      At present, version 19.1 supports CATIA V5-6R2024 (R34).
    - During installation, DO NOT select "Allow Validation Properties from CATIA V5":
        - This option requires CATIA software and licenses during translation, not available on Teamcenter X at the dispatcher server.
        - If deployed, check the `catiatojt.config` in the translator installation root `\etc` and ensure:
          ```plaintext
          Translate_ValPropsFromCATIASession = false
          ```
    - Test the translator with a command-line translation:
        1. Copy a `CATPart` (e.g., `TOOL_SHANK.CATPart` from the cookbook) to a read/write directory.
        2. Start a command shell and navigate to that directory.
        3. In another window, locate `jt_catiav5.exe` in the translator installation root.
        4. Drag `jt_catiav5.exe` into the command shell, add a space, enter the CATPart file name, and press `<Enter>`.
        5. Confirm JT file creation. For issues, contact GTAC.
- **Teamcenter Integration for CATIA (TC30605)** server DC package is deployed to support CATIA datasets and client deployments.
    - CAPs are familiar with deployment steps.
- **Licensing** for all required software is available.

---

### Deployment of `SIEMENS.catiav5tojtdirect` Using InstallAnywhere

To install the `SIEMENS.catiav5tojtdirect` Translation Solution with InstallAnywhere (Deployment Center is another method; not detailed here):

> **Note:**  
> The latest Integration release may be, for example, 2412. Select a version matching your Teamcenter Server and Client (main, maintenance, or patch, such as 2406.1001). Kits are available for different Teamcenter binary series; download the one matching your deployment.  
> [Download CATIA Integration releases](https://support.sw.siemens.com/).  
> Example file: `Teamcenter_Integration_for_CATIAV5_2412.0000.0000_Tc2312_WIN64.exe.zip`.

During the install, examine error/warning messages and check installation logs upon completion.

1. Double-click the Integration InstallAnywhere executable (e.g., `Teamcenter_Integration_for_CATIAV5_2412.0000.0000_Tc2312_WIN64.exe`).
2. Choose the installation language and click **OK**.
3. Review the InstallAnywhere Introduction, then click **Next**.
4. Select **Translation Solutions**, then click **Next**.
5. Choose **CATIA V5 JT Translation service**, then click **Next**.
6. Select Dispatcher components to update on this machine, then click **Next**:
    - Choose both **Dispatcher Client** and **Dispatcher Server**.
    - Do not select Preview post-action.
    - Update the connection configuration as prompted.
7. Enter the Teamcenter Server root location, then click **Next**.
8. Enter the Dispatcher Root location, then click **Next**.
    - Ensure the path already contains:
        - `DispatcherClient` (for Client installation)
        - `Module` (for Server installation)
    - Complete connection information, then click **Next**.<br/>
    ![Dispatcher Root Connection](./image_221.png)
    > **Note:** Host URL must be the 4-Tier format: `http://server:port/app-name` (e.g., `http://192.168.25.19:8080/tc`).
9. Enter the path to the Teamcenter FMS installation, then click **Next**.
10. Enter the Teamcenter administrative username and password, then click **Next**.
11. Enter the Teamcenter data path, then click **Next**.
12. Review the pre-installation summary and click **Install**.
13. If errors are reported, review them and close the installer.
    - The logs directory will be displayed; check logs for details if errors occurred.

---

### Post-Installation Steps

#### Check the `config.properties` File

1. Locate the `config.properties` file for the Module component (`\Module\Translators\catiav5tojtdirect\config.properties`).
2. Verify and update these settings:
    - `DB_Host`: The Teamcenter 4-Tier server address (`http://server:port/app-name`).
    - `user.username`: Username dedicated for translations.
    - `user.password`: Password for the dedicated translation user.
    - `user.group`: Optional, defaults are typically sufficient.
    - `user.role`: Optional, defaults are typically sufficient.

> **Note:**  
> The `DB_Host` entry determines connection type.  
> Example: `DB_Host=http://192.168.25.19:8080/tc`.

---

#### Modify the `convert_catiav5tojt` Script (Dispatcher Server/Module)

The `convert_catiav5tojtdirect` script defaults to run the Siemens Bi-Directional JT Translator. Only the path to the translator installation root (`TS_INST`) needs editing.

- Edit the `convert_catiav5tojt` script in `\Module\translators\catiav5tojtdirect`.
    - Update the `TS_INST` variable to the translator installation root directory.

---

#### Preferences

Preferences are mostly imported during installation, but not all and single-value preferences are not updated. Confirm/adjust these settings to support `catiav5tojtdirect`:

- `COMMONcatiatojt_ets_ds_types` includes `CATPart` (and optionally, `CATProduct`).
- `CATIA_ETS_catiav5tojtdirect_available=true`
- `ETS.TRANSLATORS.SIEMENS` includes `catiav5tojtdirect`
- `ETS.DATASETTYPES.SIEMENS.CATIAV5TOJTDIRECT` includes `CATPart` (and optionally, `CATProduct`)
- `CATIA_ETS_translation_services` includes `CATIA_translation_service_name`
- `CATIA_translation_service_name=SIEMENS.catiav5tojtdirect`

> **Note:**  
> By default, `CATParts` and `CATProducts` are translated. Without assembly-level PMI, JT for `CATProducts` may be empty.  
> To disable translation, remove `CATProduct` from preferences. For specialized needs (like `CATShape`), contact GTAC.

---

### Verifications and Validation

#### Dispatcher Client

Ensure the following have been deployed on the Dispatcher Client machine:

1. The `Cat2DCTransJT.jar` has been copied to the `\DispatcherClient\lib` directory.  
2. `Cat2DCTransJT` has been added to the import line of `\DispatcherClient\conf\Service.properties`.  
3. The `cat2transjt_env.xml` has been copied to `\DispatcherClient\install`, and the preferences listed in this file have been successfully imported into Teamcenter using the Teamcenter `preferences_manager` utility.  Refer to the Preferences section  
The following ACL must be defined to permit dcproxy to process JT datasets  
1. As a dba user, Open the Access Manager Application using RAC2.  
2. Choose Has Class (POM_application_object) from the left pane  
3. If Has Class (DispatcherRequest) does not exist (see images)  
 - In the right pane:
     - Conditions should be: Has Class
     - Select Value DispatcherRequest
     - Choose ACL Name DispatcherRequest
     - Choose the 'yellow star' to create the ACL
     - Add User dcproxy granting Write and Delete
     - Add the ACL  

![Image](./image_338.png)  
![Image](./image_337.png)  
4. Choose Has Class (Dataset) from the left pane  
In the right pane:
- Condition should be: Has Class
- Value should be: Dataset
- Enter ACL name catav5tojtdirect
- Choose 'yellow star' to create the ACL
- Choose Add to enter access rights
- Add User dcproxy granting Write and Delete
- Add the ACL<br/>
![Image](./image_339.png)  
![Image](./image_340.png)  

---

#### Dispatcher Module

Deploy the following on the Dispatcher Module machine:

1. Ensure `\Module\Translators\catiav5tojtdirect` exists and contains:
    - `Cat2DSTransJT.jar`
    - `catiav5tojtdirect.bat` (or `.sh`)
    - `convert_catiav5tojt.bat` (or `.sh`)
    - `config.properties`
2. Update `\Module\conf\translator.xml`; add the `catiav5tojtdirect` service.
3. Confirm `\Module\Translators\cat2common\soa_lib` contains required Teamcenter SOA client libraries.

---

#### Testing the `SIEMENS.catiav5tojtdirect` Service

1. If needed, create a `CATPart` dataset under an `ItemRevision` (e.g., `TOOL_SHANK.CATPart` from the cookbook).
   ![TOOL_SHANK.CATPart Example](./image_226.png)
2. In Rich Client (with Dispatcher client/admin deployed):
    - Select the `CATPart` Dataset.
    - Choose **Translation | Translate**.
    - Select the `catiav5tojtdirect` translation service.
    - Click **Finish**.
3. Monitor translation progress using **Translation | Administration Console**:
    - The operation should eventually reach `COMPLETE`.  
      If it enters `TERMINAL`, initiate troubleshooting with GTAC.
4. Validate successful translation by viewing the JT:
    - Select the `DirectModel` dataset and open the **Viewer** tab in RAC (or use 3D in AW).

> Ideally, test also by saving a CATPart or CATProduct (with CATParts) from the Teamcenter Integration for CATIA with JT creation enabled in SaveManager.

---

#### Configure Integration JT Creation During Save to Teamcenter (from CATIA)

- Enable using the preference:  
  `CATIA_createJT_option=true`

> **Note:**  
> Validation with Teamcenter Integration for CATIA (TC30605) requires a client deployment, which is beyond this guide's scope.  
> For client validation support, contact Product Validation or the Product Manager.