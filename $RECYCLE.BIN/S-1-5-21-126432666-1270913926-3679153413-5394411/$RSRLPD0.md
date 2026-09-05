# Teamcenter Integration for Cadence Orcad

**Applicable Product IDs:** TC31021-XT

Follow these steps to validate the Cadence Orcad integration in Teamcenter X using Active Workspace.

---

## Validation Steps

1. Log in to Active Workspace.
2. Select the **Newstuff** folder from the left-hand pane.
3. Add a new item to the folder:
    - Click `... -> Add`.
      ![Add Content to Newstuff Folder](./image_265.png)
4. In the search field, type `EDA orcad` to check the available dataset types.
    - If EDA Orcad dataset types are not listed, the EDA Gateway has not been deployed or the server configuration is incomplete. Please report this to your administrator for resolution.
5. If the dataset types appear, proceed to confirm full functionality by creating a dataset:
    - Select **EDA Orcad Board Design** dataset type.<br/>
      ![Select EDA Orcad Board Design Type](./image_266.png)
    - Select or drag and drop a file (any file type, pattern allows `*.*`).
    - After selecting a file, edit the dataset name, enter a description, and click **Add** to create the dataset.<br/>
      ![Edit and Add Dataset](./image_267.png)
    - Ensure the dataset appears under the folder contents.
      - If any errors occur, the Teamcenter configuration is incomplete. Please report to the administrator before proceeding.
