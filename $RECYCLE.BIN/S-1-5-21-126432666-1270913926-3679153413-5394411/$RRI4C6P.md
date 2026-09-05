## PreviewService Translator Post-Install Tasks

**Applicable Product IDs:** There is no product ID  
**Applicable Platforms:** AWS, AZURE

### Overview

After deploying the PreviewService Translator, you need to perform post-install configuration tasks to set up the required Teamcenter preferences and workflow process templates. The `<TC_ROOT>\install\tcx2saas\tools\tcx2saas_previewservice_install.bat` command is used to:

- Install Teamcenter preferences required for PreviewService
- Import the workflow process template for validating PreviewService translations

> **Notes:**
> - This is applicable for all TcX Standard, TcX Advanced and TcX Premium.
> - All scripts and steps below are shown running on Windows on the dispatcher machine.
> - The screenshots are for illustration purposes only and may not match your specific Teamcenter version.

---

## Importing PreviewService Translator Pre-requisites

**Prerequisites:**
- PreviewService installation completed as described in "Translators Installation"
- Access to the Dispatcher Windows machine
- Teamcenter administrator credentials

**Steps:**

1. Open a command prompt **as Windows administrator**

   ![Open Command Prompt as Administrator](./previewservice_106_cmd_admin.png)

2. Navigate to `<TC_ROOT>\tc_menu` and run `tc_TCXconfig1.bat`

   ![Run tc_TCXconfig1.bat](./previewservice_107_tc_menu.png)

3. Navigate to the `<TC_ROOT>\install\tcx2saas\tools` directory and run:

   ```batch
   tcx2saas_previewservice_install.bat <install user password>
   ```

   ![Run tcx2saas_previewservice_install.bat](./previewservice_108_install.png)

4. Verify the installation completed successfully by checking the output for any errors

---

## RAC PreviewServices Translation Test

This test will convert an Excel and Word document into PDFs to validate the PreviewService translator.

**Prerequisites:**
- Dispatcher Installation completed
- PreviewServices Installation as described in "Translators Installation"
- PreviewServices Configuration as described in "Post-install PreviewService Translator Set-up"

### Prepare Test Files

1. Locate the directory where the Teamcenter X collateral zip file is extracted (for example: `C:\temp\tcx_collateral`)

2. Copy the file `dispatcher\validate_previewservice_workflow.xml`

### Import Validation Workflow

1. Log into **RAC** as `dcproxy` or another user with DBA access

2. On the bottom-left toolbar, select **Workflow Designer**

   ![Select Workflow Designer](./previewservice_87_workflow_designer.png)

3. In the top-left toolbar, select **Tools → Import**

4. In the pop-up, select the following options:
   - **Import File**: select the `validate_previewservice_workflow.xml` that is contained within the `previewservices_verification_artifacts.zip`

   ![Import Workflow XML](./previewservice_88_import_workflow.png)

5. Click **OK**

### Create Test Item

1. Navigate to **Home**

2. In the top-left toolbar, select **File → New → Item…**

   ![Create New Item](./previewservice_89_new_item.png)

3. Select **Item** as the Business Object Type

4. Select **Next >**

   ![Select Item Type](./previewservice_90_item_type.png)

5. Click **Assign** for ID

6. Click **Assign** for Revision

7. Label the part with an appropriate Name such as `test_part`

8. Select **Finish and Close**

   ![Item Details](./previewservice_91_item_details.png)

9. Drag and Drop your example Word and Excel files onto the item revision of the part, select **OK** when prompted

   ![Drag and Drop Files](./previewservice_92_drag_drop.png)

   ![Attach Files](./previewservice_93_attach_files.png)

---

### Option 1: Manually Translating

1. Select the documents and go to **Translation → Translate**

2. Be sure that **previewservice** is selected for the Service

   ![Select PreviewService](./previewservice_74_select_service.png)

3. Click **Finish**

4. On the top-left toolbar, select **Translation → Administrator Console - ALL**

   ![Open Administrator Console](./previewservice_75_admin_console.png)

5. The Dispatcher Request Administration Console will open
   - This should display the created PreviewService request
   - If it does not, select the **Magnifying Glass** on the top-left toolbar to refresh

6. Wait for the task to be marked as **COMPLETE**
   - If there is an issue with Dispatcher or the translator, the job will remain in an **INITIAL** state for an extended period of time or will be marked as being in a **TERMINAL** state

7. Once complete, your translation output (PDF in this example) should be under the same item revision
   - Be sure to refresh the item revision by right clicking it and selecting **Refresh** or selecting it and hitting **F5**

   ![Translation Complete](./previewservice_76_translation_complete.png)

---

### Option 2: Using validate_previewservices Workflow

1. Go to **File → New → Workflow Process**

   ![New Workflow Process](./previewservice_77_new_workflow.png)

2. Select **validate_previewservices** as the ProcessTemplate and select the part with your documents attached

   ![Select Workflow Template](./previewservice_78_select_template.png)

3. Click **OK**

4. On the top-left toolbar, select **Translation → Administrator Console - ALL**

   ![Open Administrator Console](./previewservice_79_admin_console.png)

5. The Dispatcher Request Administration Console will open
   - This should display the created PreviewService request
   - If it does not, select the **Magnifying Glass** on the top-left toolbar to refresh

6. Wait for the task to be marked as **COMPLETE**
   - If there is an issue with Dispatcher or the translator, the job will remain in an **INITIAL** state for an extended period of time or will be marked as being in a **TERMINAL** state

7. Once complete, your translation output (PDF in this example) should be under the same item revision
   - Be sure to refresh the item revision by right clicking it and selecting **Refresh** or selecting it and hitting **F5**

   ![Workflow Translation Complete](./previewservice_80_workflow_complete.png)

---

## Removing validate_previewservices Workflow

After using the `validate_previewservices` workflow to validate that everything is installed correctly, remove it so that customers are not left with a validation workflow in their list.

### Step 1: Run Cleanup Script

1. Open a command prompt **as Windows administrator**

   ![Open Command Prompt as Administrator](./previewservice_81_cmd_admin.png)

2. Navigate to `<TC_ROOT>\tc_menu` and run `tc_TCXconfig1.bat`

   ![Run tc_TCXconfig1.bat](./previewservice_82_tc_menu.png)

3. Navigate to the `<TC_ROOT>\install\tcx2saas\tools` directory and run:

   ```batch
   tcx2saas_previewservice_cleanup.bat
   ```

   This will remove the previewservice workflow xml from the tools directory.

### Step 2: Remove Workflow from Teamcenter

You can use either RAC or Active Workspace for this step. The following example uses Active Workspace.

1. Login to **Active Workspace** with an account with Admin/dba access

2. Click on the **Workflow Designer** Tile

   ![Workflow Designer Tile](./previewservice_83_aw_workflow_tile.png)

3. Navigate down to the **validate_previewservices** workflow on the left

   ![Navigate to Workflow](./previewservice_84_navigate_workflow.png)

4. Click on it, go to the **Edit Pencil** on the right, click that, and select **Delete**

   ![Delete Workflow](./previewservice_85_delete_workflow.png)

5. Click on the **Delete** button in the confirmation pop-up

   ![Confirm Delete](./previewservice_86_confirm_delete.png)

**All Done!**

---

## Troubleshooting

### tcx2saas_previewservice_install.bat fails

1. Verify Teamcenter server is running and accessible
2. Check the username has administrative privileges
3. Verify the password is correct

### Translation request remains in INITIAL state

1. Verify Dispatcher services are running (Scheduler, Module, DispatcherClient)
2. Check Dispatcher logs for errors
3. Verify Microsoft Office is installed and licensed

### Translation request in TERMINAL state

1. Check Dispatcher logs for specific error messages
2. Verify the input file format is supported
3. Verify Microsoft Office applications can open the file manually
4. Check available disk space on the Dispatcher machine

### Preview not displaying in Active Workspace

1. Verify the translation completed successfully in Dispatcher Monitor
2. Check that the FMS (File Management System) is accessible
3. Clear browser cache and refresh the page
4. Check Active Workspace server logs for errors

---

## Related Documentation

- [Preview Service and Render Management Translator Setup](./045_Preview%20Service%20and%20Render%20Management%20Translator%20Setup.md)
- [Microsoft Office Installation](./030_Microsoft%20Office%20Installation.md)
- [Teamcenter Visualization Installation](./040_Teamcenter%20Visualization%20Installation.md)
- [Troubleshoot Dispatcher Translator Failures](./170_Troubleshoot%20Dispatcher%20Translator%20Failures.md)
