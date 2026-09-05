# Teamcenter Integration for Cadence Allegro

**Applicable Product IDs:** TC31020-XT

Follow these steps to validate the Cadence Allegro or System Capture integration in Teamcenter X using Active Workspace.

---

## Validation Steps

1. Log in to Active Workspace.
2. Select the **Newstuff** folder from the left-hand pane.
3. Add a new item to the folder:
    - Click `...-> Add`.
      ![Add Content to Newstuff Folder](./image_262.png)
4. In the search field, type `EDA cadence` to view the available dataset types.
    - If EDA Cadence dataset types are missing, this indicates that the EDA Gateway has not been deployed or the server configuration is incomplete. Report this to the administrator for resolution.
5. If the dataset types appear, continue with the following steps to confirm full functionality:
    - Select the **EDA Cadence Board Design** dataset type.<br/>
      ![Select EDA Cadence Board Design Type](./image_263.png)
    - Select or drag and drop a file (any file type, pattern allows `*.*`).
    - Once a file is selected, edit the dataset name, optionally enter a description, and click **Add** to create the dataset.<br/>
      ![Edit and Add Dataset](./image_264.png)
    - The created dataset should display under the folder contents.
      - If errors occur, the Teamcenter configuration is incomplete. Report this to your administrator before proceeding.
