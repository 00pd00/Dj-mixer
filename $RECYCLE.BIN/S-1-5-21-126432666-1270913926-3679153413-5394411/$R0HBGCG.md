# Validation Steps for CATIA V5 Integration

**Applicable Product IDs:** TC30605-XT, TC530605-XT

These steps help you validate the CATIA V5 integration in Teamcenter X using Active Workspace. By this stage, all necessary data-model and server configurations should be deployed to support out-of-the-box (OOTB) operation.

---

## Validation Steps

1. Log in to Active Workspace.
2. Select the **Newstuff** folder from the left-hand pane.
3. Add a new item to the folder:
    - Click `... -> New -> Add`.
      ![Add Content to Newstuff Folder](./image_273.png)
4. Type `CAT` in the search field to check available CATIA dataset types.
    - If CATIA dataset types are missing, the integration for CATIA has not been deployed or the configuration is incomplete. Report this to your administrator for further action.
    - If dataset types appear, proceed to further validation.
5. Select **CATPart** dataset type.
    ![Select CATPart Dataset Type](./image_274.png)
6. Select or drag and drop a file with the pattern `*.CATPart`.
7. Once you have selected a file, you can edit the dataset name, add a description, and click **Add** to create the dataset.<br/>
    ![Edit and Add Dataset](./image_275.png)
8. Confirm the dataset appears under the folder contents.
    - If errors occur, this signals incomplete Teamcenter configuration. Report to your administrator before proceeding.

---

## Teamcenter Integration for CATIA V5 (TC30605-XT & TC530605-XT) - Issues

> If you encounter any issues during these steps, review your configuration or contact your administrator for further troubleshooting and resolution.