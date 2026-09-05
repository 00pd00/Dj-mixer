# Post-Deployment and Validation Steps for Inventor Integration

**Applicable Product IDs:** TC30609-XT, TC7100, TC7101

Follow these instructions to configure and validate your Inventor integration with Teamcenter X using Active Workspace.

---

## Configure Supported Object Types for Inventor Integration

1. Log in to Active Workspace (AWC).
2. Switch workspace to **Admin**.
3. Click the **Preferences** tile.
4. Click the three dots (`...`) and select **New -> New Preference**.
5. Enter the following details:
    - **Name:** `AWC_TCAI_OpenSupportedTypes`
    - **Product Area:** General
    - **Description:** Define the types of objects that can be opened in Inventor through the Active Workspace Client.
    - **Protection Scope:** Site
    - **Environment:** Not Selected
    - **Type:** String
    - **Multiple Values:** Yes
    - **Values:** `Item, ItemRevision, Awb0SavedBookmark, Awb0ProductContextInfo, AIPart, AIAssebmly, AIDrawing, AIPresentation`
6. Save the preference.  
   ![Save Inventor Supported Types Preference](./image_253.png)

---

## Enable Hosted Active Workspace on Inventor Client

1. Log in to Active Workspace (AWC).
2. Switch workspace to **Admin**.
3. Click the **Preferences** tile.
4. Click the three dots (`...`) and select **New -> New Preference**.
5. Enter the following details:
    - **Name:** `ActiveWorkspaceHosting.TCAI.URL`
    - **Product Area:** General
    - **Description:** Enables Active Workspace in Hosted mode on Inventor Client.
    - **Protection Scope:** Site
    - **Environment:** Not Selected
    - **Type:** String
    - **Multiple Values:** No
    - **Value:** `<Environment AWC URL>` (for example: `https://titans28.testplmcloudsolutions.com/awc`)
6. Save the preference.  
   ![Save Hosted Workspace Preference](./image_254.png)

---

## Validation Steps

Once these configurations are complete, the necessary data-model and server contributions should support out-of-the-box (OOTB) operation of Inventor integration clients. Follow these steps to validate your setup:

### Validate Dataset Types and Operations

1. Log in to Active Workspace.
2. Browse to the **Newstuff** folder.
    - Click **Add** to add new content to the folder.
    - Type `AI` in the search to check for Inventor dataset types.
        - If dataset types are missing, the Inventor integration has not been deployed or the server configuration is incomplete. Please report this to your administrator.
    - If the dataset types appear, continue with the following steps to verify import and dataset creation:
        1. Select the **AIPart** dataset type.<br/>
           ![Select AIPart Dataset Type](./image_255.png)
        2. Select or drag-and-drop a file with the pattern `*.ipt`.
        3. Once a file is selected, edit the dataset name, add a description, and choose **Add** to create the dataset.<br/>
           ![Add Inventor Dataset](./image_256.png)
        4. Verify that the newly created dataset is listed under the folder contents.
            - If you encounter errors, the Teamcenter configuration may be incomplete; report this to the administrator.

### Verify Preferences Configuration

1. Log in to Active Workspace as a DBA user.
2. Switch your workspace to the **DBA role**.
3. Set your workspace as **Active Admin**.<br/>
   ![Set Workspace as Active Admin](./image_257.png)
4. Select the **PREFERENCES** tile.<br/>
   ![Select Preferences Tile](./image_258.png)
5. In the filter box, type `TCAI` and press return.
6. Confirm that you see many (over 100) preferences with the `TCAI` prefix, confirming the proper deployment.
