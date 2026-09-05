# Validation Steps for CATIA V6 Integration

**Applicable Product IDs:** TC630605-XT

These steps help you validate the CATIA V6 integration in Teamcenter X using Active Workspace. By this point, all necessary data-model and server configurations should support out-of-the-box (OOTB) operation for integration clients.

---

## Validation Steps

1. Log in to Active Workspace.
2. Browse to the **Newstuff** folder.
    ![Open Newstuff Folder](./image_276.png)

3. Choose to **Add** to the folder contents.
4. In the search field, type `3DX` to check for the CATIA V6 dataset type.
    - If the dataset type is missing, the integration for CATIA has not been deployed or the server configuration is incomplete. Report this to your administrator to resolve the issue.
    - If the dataset type appears, you may proceed with further validation by creating a dataset.

    ![Check 3DX Dataset Type](./image_277.png)

5. Select or drag and drop a file with the pattern `*.3dxml`.
6. Once a file is selected, you can edit the dataset name, enter a description, and click **Add** to create the dataset.<br/>
    ![Edit and Add Dataset](./image_278.png)

7. Verify that the dataset appears under the folder contents.
    - If any errors occur, it indicates that the Teamcenter configuration is incomplete. Report this to your administrator for further action.
