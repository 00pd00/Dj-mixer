## Transition Steps

### Shutdown the TcX Containerized Deployment

1. Refer to the instructions under [Stopping and Restarting TcX Containerized Deployment](../Documentation/Operations/Day%20N%20Operations/Shutdown%20and%20restart%20workloads).
2. When prompted, select the workload as **"Teamcenter deployment for applying updates"** from the dropdown.

---

### Update the Product Tier for TcX Environment

This step runs a new DeployOps pipeline for the tenant.

1. Review the [Ansible Playbook Execution](../Documentation/Tenant%20Onboarding/Basic%20Flow/Ansible%20playbook%20execution) documentation for more details.
2. Before running the pipeline, complete the [Customer Input](../Documentation/Tenant%20Onboarding/Pre-Reqs/Ansible%20Template%20Input/Ansible%20Template%20Input) section in the Ansible template.
3. Specify the correct **Product ID(s)** as the value for the `TeamcenterProductIDList` field in the customer input.
4. After entering the product IDs, execute the Ansible template.

For choosing the correct target Product Tier ID(s), see the details below.

#### Update Environment from TcX Advanced to TcX Premium

- Refer to the Product ID list and Software/Integration Versions : `Tenant Onboarding > Pre-Reqs > Ansible Template Input > Ansible Template Input Guide > Product ID List & Software Integration Versions` for TcX Premium product ID details.
- Based on customer requirements and entitlements, select and specify the appropriate product IDs in `TeamcenterProductIDList`.

---

### Restart the TcX Containerized Deployment

1. Follow the steps provided in [Stopping and Restarting TcX Containerized Deployment](../Documentation/Operations/Day%20N%20Operations/Shutdown%20and%20restart%20workloads).

---

### Link Environment to New Product Tier in Xcelerator Admin Console

1. Enable access to the new product tier for the customer.
2. Follow the instructions in [Enable Teamcenter X Product Access in Xcelerator Admin Console for Customer](../Documentation/Tenant%20Onboarding/Enable%20Xcelerator%20Admin%20Console%20for%20Teamcenter%20X/Enable%20Xcelerator%20Admin%20Console%20for%20Teamcenter%20X).

---

### Migrate Users from Old Tier to New Tier

After access to the new product tier is enabled, migrate users from the source tier to the target tier.

#### Migration Steps

1. Log in to the [Xcelerator Admin Console](https://cloud.sw.siemens.com/).
2. Select the old product tier and open the **Assigned Users** tab to list users.<br/>
   ![alt text](image.png)
3. For each user from the source tier:
     - Select the new product tier and open the **Assigned Users** tab.
     - Click the **Assign Users** button.
     - In the Assign User dialog, enter the user's email, environment, and other required details. Click **Assign**.<br/>
       ![alt text](image-1.png)
4. User migration is now complete.

---

### Expire the Old Product Tier

Once users are transitioned, disable customer access to the old tier.

1. Create an issue in the [FDS Forum](https://code.siemens.com/xf/xf-forum/-/issues) requesting the expiry of the old product tier for the given ECA.

---

### 7. Manually Enable TCX Premium Features

#### Overview

The transition from the Standard (STD) or Advanced (ADV) tier to Premium is performed as an in-place upgrade. During this process, the TCX STD/ADV environment is reconfigured accordingly.

Key actions during the upgrade:

- The `workspaces` array and `defaultWorkspace` attributes in the `kit.json` file are updated.
- Active Workspace is rebuilt to apply these changes.
- Workspace settings are used to control the visibility of commands and access within the environment.

**Workspace Mapping:**

- The imported workspace mapping XML sets:
    - The Standard/Advanced workspace as the default for the following groups:
        - Author
        - Consumer
        - Viewer
        - Designer
    - The Standard/Advanced workspace as an additional workspace for:
        - DBA group
    - Self Admin workspace as the default for the:
        - Self Admin role

**Preferences XML Import:**

- Certain preferences are overridden to configure the Premium environment:
    - `AWC_DefaultCreateTypes`: Limits the types visible in the "Add Object" dropdown in Active Workspace.
    - `AWC_Default_Workspace`: Defines the default workspace used after logging in to Active Workspace.
    - `AW_FullTextSearch_TypeCategories`: Configures type categories for full-text search.
    - `SiteTimeZone` is set to New York to enable successful schedule creation.
    - Summary rendering in XRTs becomes workspace-based.

- Some preferences are merged as part of the transition:
    - `AWC_StartupPreferences`
    - `ICS_classifiable_types` (only for TCX Advanced)
    - `AWC_XYZ_OpenSupportedTypes` (SEEC, SWIM)
    - `AWC_XYZ_ShowObjectDatasetTypes` (SEEC, SWIM)

**Module Installation:**

- The original TCX STD/ADV installation already includes many base modules that are also part of the TCX Premium tier (such as foundation, aws2, tcx2saas, tcxsimplified, document management, requirements management, etc.).
- These base modules are not reinstalled during the upgrade.
- Only those modules present in the Premium tier but missing in the STD/ADV installation are added.
- After the tier upgrade, the default workspace, preferences, and `kit.json` for Active Workspace remain unchanged.

#### Execution Tasks

##### Rebuild Active Workspace

Follow the steps below based on your current product tier:

- Login to DC Server Linux EC2 machine as tcx_user 
- Switch to tcx_user:
  
  ```bash
  sudo su tcx_user
  ```

- Set context for tcc CLI by running following command: (Substitute appropriate values for **tenantID** and **EnvType** parameters).

   ```bash
   . tcc set_context <tenantID> <EnvType> tcx_user
   ```

- Navigate to the solution directory located at “/`<tenantID>`-`<EnvType>`/`<tenantID>`-`<EnvType>`/deploy/aws2/stage/src/solution” 
    ```

- Ensure `kit.json` and `kit_backup.json` files are present.

**If transitioning from TCX Standard to TCX Premium:**

- Rename files:

    ```
    mv kit.json kit_tcx_std.json
    mv kit_backup.json kit.json
    ```

- Edit `kit.json` and add `"TcXStandardAuthorWorkspace"` to the workspaces array:

    ```json
    "workspaces": [
        "TCAWWorkspace",
        "TcAuthorWorkspace",
        "TcConsumerWorkspace",
        "TcActiveAdminWorkspace",
        "TcActiveArchitectWorkspace",
        "ConsumerWorkspace",
        "SelfAdminWS",
        "TcXStandardAuthorWorkspace"
    ]
    ```

- Ensure the `defaultWorkspace` attribute is set to `"TCAWWorkspace"`.

**If transitioning from TCX Advanced to TCX Premium:**

- Rename files:

    ```
    mv kit.json kit_tcx_std.json
    mv kit_backup.json kit.json
    ```

- Edit `kit.json` and add `"TcXAdvancedAuthorWorkspace"` to the workspaces array:

    ```json
    "workspaces": [
        "TCAWWorkspace",
        "TcAuthorWorkspace",
        "TcConsumerWorkspace",
        "TcActiveAdminWorkspace",
        "TcActiveArchitectWorkspace",
        "ConsumerWorkspace",
        "SelfAdminWS",
        "TcXAdvancedAuthorWorkspace"
    ]
    ```

- Ensure the `defaultWorkspace` attribute is set to `"TCAWWorkspace"`.

- Rebuild Active Workspace Client: [Build AW client artifacts (awbuild)](../Documentation/Operations/Day%20N%20Operations/Build%20AW%20client%20artifacts%20awbuild)


---

##### Import Preferences and Workspace Definitions

- Navigate to the directory located at “/`<tenant_D>`-`<EnvType>`/`<tenant_D>`-`<EnvType>`/teamcenter/tc_data”

- Create the folliwing folders under tc_data
    
    ```bash
    mkidr Transition_Files
    mkidr Transition_Files/preferences
    mkidr Transition_Files/workspaces
    ```

- Create following XML files

   ```bash
   touch Transition_Files/preferences/tcx_prem_preferences_merge.xml
   touch Transition_Files/preferences/tcx_prem_preferences_override.xml

   touch Transition_Files/workspaces/tcx_advanced_workspace_unset.xml
   touch Transition_Files/workspaces/tcx_standard_workspace_unset.xml
   touch Transition_Files/workspaces/tcx_prem_workspaces.xml
   ```

- Edit Transition_Files/preferences/tcx_prem_preferences_merge.xml and add the following content and save.

   ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <preferences version="10.0">
    <category name="Active Workspace">
        <category_description>No description available for this category.</category_description>
        <preference name="AWC_DefaultCreateTypes" type="String" array="true" disabled="false" protectionScope="Site" envEnabled="false">
        <preference_description>Define the types to be displayed in the "Create" dialog in the Active Workspace Client (AWC). Valid values are types internal names. All subtypes associated to a provided type will also be displayed.</preference_description>
        <context name="Teamcenter">
            <value>Item</value>
        </context>
        </preference>
    </category>
    </preferences>
   ```
- Verify the contents are saved by executing following command

   ```bash
      cat Transition_Files/preferences/tcx_prem_preferences_merge.xml
   ```

- Edit Transition_Files/preferences/tcx_prem_preferences_override.xml and add the following content and save.

   ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <preferences version="10.0">
    <category name="Active Workspace">
        <category_description>No description available for this category.</category_description>
        <preference name="AWC_Default_Workspace" type="String" array="false" disabled="false" protectionScope="System" envEnabled="false">
        <preference_description>Defines default workspace for Active Workspace Client (AWC). This value is used when a default workspace for a group/role is not explicitly defined.</preference_description>
        <context name="Teamcenter">
            <value>TCAWWorkspace</value>
        </context>
        </preference>
    </category>
    </preferences>
   ```
- Verify the contents are saved by executing following command

   ```bash
      cat Transition_Files/preferences/tcx_prem_preferences_override.xml
   ```

- Edit Transition_Files/workspaces/tcx_advanced_workspace_unset.xml and add the following content and save.

   ```xml
    <?xml version="1.0" encoding="UTF-8" standalone="no" ?>
    <Import>
        <Workspace id="TcXAdvancedAuthorWorkspace">
            <WorkspaceMapping default="true" group="" role="Author"/>
            <WorkspaceMapping default="true" group="" role="Consumer"/>
            <WorkspaceMapping default="true" group="" role="Viewer"/>
            <WorkspaceMapping default="true" group="" role="Designer"/>
        </Workspace>
    </Import>
   ```
- Verify the contents are saved by executing following command

   ```bash
      cat Transition_Files/workspaces/tcx_advanced_workspace_unset.xml
   ```

- Edit Transition_Files/workspaces/tcx_standard_workspace_unset.xml and add the following content and save.

   ```xml
    <?xml version="1.0" encoding="UTF-8" standalone="no" ?>
    <Import>
        <Workspace id="TcXStandardAuthorWorkspace">
            <WorkspaceMapping default="true" group="" role="Author"/>
            <WorkspaceMapping default="true" group="" role="Consumer"/>
            <WorkspaceMapping default="true" group="" role="Viewer"/>
            <WorkspaceMapping default="true" group="" role="Designer"/>
        </Workspace>
    </Import>
   ```
- Verify the contents are saved by executing following command

   ```bash
      cat Transition_Files/workspaces/tcx_standard_workspace_unset.xml
   ```

- Edit Transition_Files/workspaces/tcx_prem_workspaces.xml and add the following content and save.

   ```xml
    <?xml version="1.0" encoding="UTF-8" standalone="no" ?>
    <Import>
        <Workspace id="TcAuthorWorkspace">
            <WorkspaceMapping default="true" group="" role="Author"/>
            <WorkspaceMapping default="true" group="" role="Designer"/>
            <WorkspaceMapping default="true" group="" role="Manager"/>
            <WorkspaceMapping default="true" group="" role="Checker"/>
            <WorkspaceMapping default="true" group="" role="Translator"/>
            <WorkspaceMapping default="true" group="" role="Test"/>
            <WorkspaceMapping group="" role="DBA"/>
        </Workspace>
        <Workspace id="TcConsumerWorkspace">
            <WorkspaceMapping default="true" group="" role="Consumer"/>
            <WorkspaceMapping default="true" group="" role="Viewer"/>
            <WorkspaceMapping group="" role="DBA"/>
        </Workspace>
    </Import>
   ```

- Verify the contents are saved by executing following command

   ```bash
      cat Transition_Files/workspaces/tcx_prem_workspaces.xml
   ```

- Set context for tcc CLI by running following command: (Substitute appropriate values for **tenantID** and **EnvType** parameters).

   ```bash
   . tcc set_context <tenantID> <EnvType> tcx_user
   ``` 

- For **TCX Standard**, execute the following commands from `tcc cli`:

    ```
    tcc exec 'preferences_manager -u=infodba -pf=$TC_SECURITY_DIR/<infodba-password-filename> -mode=import -scope=SITE -file=$TC_DATA/Transition_Files/preferences/tcx_prem_preferences_merge.xml -action=MERGE'

    tcc exec 'preferences_manager -u=infodba -pf=$TC_SECURITY_DIR/<infodba-password-filename> -mode=import -scope=SITE -file=$TC_DATA/Transition_Files/preferences/tcx_prem_preferences_override.xml -action=OVERRIDE'

    tcc exec 'import_wsconfig -u=infodba -pf=$TC_SECURITY_DIR/<infodba-password-filename> -g=dba -file=$TC_DATA/Transition_Files/workspaces/tcx_standard_workspace_unset.xml -action=delete'
     
    tcc exec 'import_wsconfig -u=infodba -pf=$TC_SECURITY_DIR/<infodba-password-filename> -g=dba -file=$TC_DATA/Transition_Files/workspaces/tcx_prem_workspaces.xml'
    ```

- For **TCX Advanced**, execute the following commands from `tcc cli`:

    ```
    tcc exec 'preferences_manager -u=infodba -pf=$TC_SECURITY_DIR/<infodba-password-filename> -mode=import -scope=SITE -file=$TC_DATA/Transition_Files/preferences/tcx_prem_preferences_merge.xml -action=MERGE'

    tcc exec 'preferences_manager -u=infodba -pf=$TC_SECURITY_DIR/<infodba-password-filename> -mode=import -scope=SITE -file=$TC_DATA/Transition_Files/preferences/tcx_prem_preferences_override.xml -action=OVERRIDE'

    tcc exec 'import_wsconfig -u=infodba -pf=$TC_SECURITY_DIR/<infodba-password-filename> -g=dba -file=$TC_DATA/Transition_Files/workspaces/tcx_advanced_workspace_unset.xml -action=delete'
     
    tcc exec 'import_wsconfig -u=infodba -pf=$TC_SECURITY_DIR/<infodba-password-filename> -g=dba -file=$TC_DATA/Transition_Files/workspaces/tcx_prem_workspaces.xml'
    ```

- Check the logs to ensure the import was successful.

---

#### Verify Premium Features

1. Log in to Active Workspace with the `Engineering.MyOrg` group and `Author` role.
2. Confirm the Premium landing page (tiles or new landing page) appears upon login.
3. Click **Explorer**.
4. Click **Add** and check the available object types.
5. Run **TCX Premium ATDDs** on the transitioned VM to complete validation.