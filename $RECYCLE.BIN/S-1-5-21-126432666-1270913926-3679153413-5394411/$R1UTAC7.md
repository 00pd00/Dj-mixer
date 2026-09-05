# Validation Steps for AutoCAD or AutoCAD Electrical Integration

**Applicable Product IDs:** TC30611-XT, TC30618-XT

Follow these steps to validate the AutoCAD or AutoCAD Electrical integration in Teamcenter X using Active Workspace.

---

## Dataset Validation Steps

1. Log in to Active Workspace.
2. Select the **Newstuff** folder from the left-hand pane.
3. Add a new item to the folder:
    - Click `... -> New -> Add`.
      ![Add Content to Newstuff Folder](./image_268.png)
4. In the search box, type `ACAD` to check for available dataset types.
    - If ACAD dataset types are missing, it means the integration for AutoCAD has not been deployed or the server configuration is incomplete. Report this to your administrator for resolution.
5. If the dataset types are available, you may continue to verify proper import and creation:
    - Select **ACADDWG** dataset type.<br/>
      ![Select ACADDWG Dataset Type](./image_269.png)
    - Select or drag and drop a file with the pattern `*.dwg`.
    - Once a file is selected, edit the dataset name, enter a description, and click **Add** to create the dataset.<br/>
      ![Edit and Add Dataset](./image_270.png)
    - Check that the dataset appears under the folder contents.
      - If you encounter errors, this indicates Teamcenter configuration is incomplete. Report this to your administrator before proceeding.

---

## Preference Verification Steps

1. Log in to Active Workspace as a DBA user.
2. Switch to the **DBA role**.
3. Set your workspace as **Active Admin**.<br/>
   ![Set Workspace as Active Admin](./image_271.png)
4. Select the **PREFERENCES** tile.<br/>
   ![Select Preferences Tile](./image_272.png)
5. In the filter, type `TCAA` and press return.
6. Confirm that there are many (more than 100) preferences with the `TCAA` prefix, indicating correct deployment.
