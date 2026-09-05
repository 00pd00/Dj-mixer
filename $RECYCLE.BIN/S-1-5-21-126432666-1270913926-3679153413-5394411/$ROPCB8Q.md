# API Permissions for Azure Application

**Responsibility: The customer's Azure administrator should perform this step.**

API permissions are vital for security, explicitly controlling an application's data access and actions within services like Microsoft Graph, SharePoint Embedded, and Office Online for secure interaction.

The TcOOSPE integration requires specific API permissions to access SharePoint Embedded containers and Office Online services.


Step-by-step guide to configure API permissions:

1. Modify the App Manifest:

    Update the App Manifest to include the required API permissions:

    a. Navigate to your App Registration in Azure portal
    b. Go to **Manifest** in the left menu
    c. Replace the `requiredResourceAccess` block (starting around line 72) with the following:

    ```json
    "requiredResourceAccess": [
    	{
    		"resourceAppId": "00000003-0000-0ff1-ce00-000000000000",
    		"resourceAccess": [
    			{
    				"id": "4d114b1a-3649-4764-9dfb-be1e236ff371",
    				"type": "Scope"
    			},
    			{
    				"id": "19766c1b-905b-43af-8756-06526ab42875",
    				"type": "Role"
    			}
    		]
    	},
    	{
    		"resourceAppId": "00000003-0000-0000-c000-000000000000",
    		"resourceAccess": [
    			{
    				"id": "085ca537-6565-41c2-aca7-db852babc212",
    				"type": "Scope"
    			},
    			{
    				"id": "40dc41bc-0f7e-42ff-89bd-d9516947e474",
    				"type": "Role"
    			},
    			{
    				"id": "e1fe6dd8-ba31-4d61-89e7-88639da4683d",
    				"type": "Scope"
    			}
    		]
    	}
    ],
    ```

    d. Click **Save** to apply the changes


2. Navigate to API Permissions:
    In your registered application page, select API permissions from the left-hand menu.


3. Click "Add a permission":
    Click the + Add a permission button.


4. Select Microsoft APIs:
    In the "Request API permissions" pane, select Microsoft APIs.


5. Add Microsoft Graph Permissions:
    - Choose "Microsoft Graph"
    - Select "Delegated permissions"
    - Search for and add the following permissions:
        - Files.ReadWrite.All
        - Sites.ReadWrite.All
        - User.Read
        - offline_access
    - Click "Add permissions"


6. Add SharePoint Permissions:
    - Click "+ Add a permission" again
    - Choose "SharePoint"
    - Under SharePoint, select "Delegated permissions"
    - Add the following permissions:
        - AllSites.FullControl
        - MyFiles.Write
    - Click "Add permissions"


7. Add Office 365 Management APIs (if available):
    - Click "+ Add a permission" again
    - Choose "APIs my organization uses"
    - Search for "Office 365 Management APIs"
    - Select "Delegated permissions"
    - Add required permissions for Office Online integration
    - Click "Add permissions"


8. Grant Admin Consent:
    After adding all permissions, click the "Grant admin consent for [Your Organization]" button.
    
    ⚠️ Important: Admin consent is required for the application to function properly. Without admin consent, users will be prompted to consent individually, which may not work for all scenarios.


9. Verify Permissions:
    Ensure all permissions show a green checkmark under the "Status" column indicating they have been granted.


Required Permissions Summary:

| API | Permission | Type | Purpose |
| :--- | :--------- | :--- | :------ |
| Microsoft Graph | Files.ReadWrite.All | Delegated | Access and modify files in SharePoint Embedded |
| Microsoft Graph | Sites.ReadWrite.All | Delegated | Access SharePoint sites and containers |
| Microsoft Graph | User.Read | Delegated | Read user profile information |
| Microsoft Graph | offline_access | Delegated | Maintain access to data |
| SharePoint | AllSites.FullControl | Delegated | Full control of SharePoint sites |
| SharePoint | MyFiles.Write | Delegated | Write access to user files |
