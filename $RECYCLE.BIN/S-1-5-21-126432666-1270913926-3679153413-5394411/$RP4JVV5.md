# Post-Deployment Steps for AutoCAD or AutoCAD Electrical Integration

**Applicable Product IDs:** TC30611-XT, TC30618-XT, TC7100, TC7101

This guide provides step-by-step instructions for configuring and enabling AutoCAD or AutoCAD Electrical integration with Teamcenter X using Active Workspace.

---

## Configure Supported Object Types for AutoCAD Integration

1. Log in to Active Workspace (AWC).
2. Switch your workspace to **Admin**.
3. Click on the **Preferences** tile.
4. Click the three dots (`...`) and select **New -> New Preference**.
5. Enter the following details in the respective fields:
    - **Name:** `AWC_TCAA_OpenSupportedTypes`
    - **Product Area:** General
    - **Description:** Define the types of objects that can be opened in AutoCAD through the Active Workspace Client.
    - **Protection Scope:** Site
    - **Environment:** Not Selected
    - **Type:** String
    - **Multiple Values:** Yes
    - **Values:** `Item, ItemRevision, Awb0SavedBookmark, Awb0ProductContextInfo, ACADDWG, ACADTMPL, ACD2_ACADEPRJ`
6. Save the preference.  
   ![Save Supported Object Types Preference](./image_251.png)

---

## Enable Hosted Active Workspace on AutoCAD or AutoCAD Electrical Client

1. Log in to Active Workspace (AWC).
2. Switch your workspace to **Admin**.
3. Click on the **Preferences** tile.
4. Click the three dots (`...`) and select **New -> New Preference**.
5. Enter the following details:
    - **Name:** `ActiveWorkspaceHosting.TCAA.URL`
    - **Product Area:** General
    - **Description:** Enables Active Workspace in Hosted mode on the AutoCAD Client.
    - **Protection Scope:** Site
    - **Environment:** Not Selected
    - **Type:** String
    - **Multiple Values:** No
    - **Value:** `<Environment AWC URL>` (for example: `https://titans28.testplmcloudsolutions.com/awc`)
6. Save the preference.  
   ![Save Hosted Workspace URL Preference](./image_252.png)


