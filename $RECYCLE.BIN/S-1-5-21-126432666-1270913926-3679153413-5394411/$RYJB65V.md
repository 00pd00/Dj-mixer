# Validation and Post-Deployment Steps for Creo Integration 

**Applicable Product IDs:** TC30606-XT, TC7100, TC7101

This guide provides the necessary post-deployment actions and validation steps for Creo Integration with Teamcenter X. Follow these instructions to configure and verify your environment.

---

## Post-Deployment Steps for Creo Integration(Do not use)

To ensure compatibility with the current integration release, execute the following command. This serves as a workaround for PR11067422 until the 2406 Integration release is supported.

```sh
preferences_manager -u=infodba -pf=$TC_SECURITY_DIR/default_infodba.pwf -g=dba -mode=import -scope=site -action=OVERRIDE -file=${TC_INSTALL_DIR}/ipem/configurations/ipemPrefsOverwrite.xml
```

> **Note:**  
> For details on running `tcc exec`, refer to [Executing Teamcenter ITK Utilities in a containerized environment](../../020_Operations/030_Day%20N%20Operations/020_Executing%20Teamcenter%20ITK%20Utilities.md#executing-teamcenter-itk-utilities-in-a-containerized-environment).

---

## Enable Hosted Active Workspace on Creo Client

1. Log in to Active Workspace (AWC).
2. Switch your workspace to **Admin**.
3. Click on the **Preferences** tile.
4. Search for `ActiveWorkspaceHosting.Pro2.URL` and click **Edit**.
5. Enter the environment AWC URL in the **Values** field (for example, `https://titans28.testplmcloudsolutions.com/awc`).
6. Save the preference.  
   ![Save Hosted Workspace Preference](./image_247.png)

---

## Validation and Additional Steps in Active Workspace

1. Log in to Active Workspace.
2. Click the **FOLDERS** tile.
3. Select the **Newstuff** folder from the left-hand pane.
4. Choose to add to the folder by selecting `-> Add`.  
   ![Add Content to Newstuff Folder](./image_248.png)
5. In the search, type `Creo` to check the availability of dataset types.
   - If you do not see Creo dataset types, the Creo Integration has not been deployed. Report this to your administrator for resolution.
6. If dataset types are available, you may continue to confirm correct import and creation:
    1. Choose the Creo part dataset type.<br/>
        ![Select Creo Part Dataset Type](./image_249.png)
    2. Select or drag and drop a file with the pattern `*.prt`.
    3. Edit the dataset name, add a description, and click to add the dataset.<br/>
        ![Edit and Add Creo Dataset](./image_250.png)
    4. Check that the new dataset displays under the folder contents.
        - If errors occur, report these to your administrator for further investigation.

---

Following these steps helps ensure your Creo integration is configured correctly, allowing you to fully utilize Teamcenter X capabilities.
