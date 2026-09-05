# Validation Steps for EDA Altium Integration

**Applicable Product IDs:** TC31022-XT

Follow these steps to validate the EDA Altium integration in Teamcenter X using Active Workspace.

---

## Validation Steps

1. Log in to Active Workspace.
2. Select the **Newstuff** folder from the left-hand pane.
3. Add a new item to the folder:
    - Click `... -> Add`.
      ![Add Content to Newstuff Folder](./image_259.png)
4. In the search field, type `EDA Altium` to check for available dataset types.
    - If EDA Altium dataset types are missing, it indicates that EDA Gateway has not been deployed or the server configuration is incomplete. Please report this to your administrator for resolution.
5. If the dataset types are available, you may proceed to confirm full functionality by creating a dataset:
    - Select **EDA Altium Board Design** dataset type.<br/>
      ![Select EDA Altium Board Design Type](./image_260.png)
    - Select or drag and drop a file (any file type, as the pattern allows `*.*`).
    - After selecting a file, edit the dataset name, add a description, and click **Add** to create the dataset.<br/>
      ![Edit and Add Dataset](./image_261.png)
    - The new dataset should appear under the folder contents.
      - If you encounter errors, this means that the Teamcenter configuration is incomplete. Report this to your administrator for further action.
