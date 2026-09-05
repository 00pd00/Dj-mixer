# Steps to add a Redirect URI to Azure Application

**Responsibility: Post-TcX deployment, the Customer Azure Admin Team must configure the Azure application by adding the necessary redirect URI for authentication.**

The Redirect URI is the authorized location where the authentication server sends the user after successful app authorization, preventing unauthorized token delivery. This is essential for the Office Online integration to properly authenticate users.


Step-by-step guide to add a Redirect URI:

1. Log in to Azure Portal:
    If you're not already logged in, go to https://portal.azure.com and sign in using your Azure account credentials.


2. Navigate to Microsoft Entra ID:
    Locate Microsoft Entra ID under Azure services on the homepage or search for it using the search bar. Select Microsoft Entra ID.


3. Access App Registrations:
    Within Microsoft Entra ID, find and click App registrations from the left-hand menu.


4. Select Your Application:
    From the list of registered applications, click on the name of the application you registered as a pre-requisite step & will be used for the integration (e.g., "TcOOSPE", "Teamcenter-Office-SharePoint"). This will take you to its overview page.


5. Navigate to Redirect URI:
    In the Application overview page - navigate to "Redirect URIs" & click on it.


6. Click - Add a Platform:
    Under the "Platform configurations" section, click on + Add a platform
    A new pane will open, asking you to choose a platform. Select the "Web" platform for your application.


7. Add Redirect URI:
    In the "Redirect URIs" field, enter the URL(s) where your application expects to receive authentication responses. You can add multiple URIs.
    
    Construct the required redirect URI using the following format and click on configure:
    `<TcX_BASE_URL>/sd/tcoospe/auth/callback`
    
    Where:
    `<TcX_BASE_URL>` is the URL where TcX is running (e.g., `https://example-tenant.testplmcloudsolutions.com/awc`).
    
    Example: If TcX is running at `https://azdp016-prd.testplmcloudsolutions.com/awc`, the redirect URI would be:
    `https://azdp016-prd.testplmcloudsolutions.com/awc/sd/tcoospe/auth/callback`


8. Add Additional Redirect URIs (if needed):
    
    You may need to add additional redirect URIs for Office Online integration:
    
    a. Office Online Web Viewer callback:
       `<TcX_BASE_URL>/sd/tcoospe/office/viewer/callback`
    
    b. Office Online Editor callback:
       `<TcX_BASE_URL>/sd/tcoospe/office/editor/callback`
    
    Add each URI separately using the same process.


9. Save Configuration:
    After adding all required redirect URIs, click "Save" or "Configure" to apply the changes.


10. Verify Redirect URIs:
    Review the list of redirect URIs to ensure all required endpoints are configured correctly.


Required Redirect URIs Summary:

| Purpose | URI Pattern |
| :------ | :---------- |
| Authentication Callback | `<TcX_BASE_URL>/sd/tcoospe/auth/callback` |
| Office Viewer Callback | `<TcX_BASE_URL>/sd/tcoospe/office/viewer/callback` |
| Office Editor Callback | `<TcX_BASE_URL>/sd/tcoospe/office/editor/callback` |


⚠️ Important Notes:

- Redirect URIs must exactly match those configured in your Azure Application. Mismatched URIs will result in authentication failure.
- Use HTTPS for production environments to ensure secure communication
- Do not include trailing slashes in redirect URIs unless specifically required
- Test each redirect URI after configuration to ensure proper authentication flow


Common Issues:

**Issue:** "Redirect URI mismatch" error during authentication
**Solution:** Verify the redirect URI in Azure exactly matches the callback URL being used by TcOOSPE

**Issue:** Authentication fails with "AADSTS50011" error
**Solution:** Ensure all redirect URIs are configured and saved in Azure App Registration

**Issue:** "Invalid redirect URI" error
**Solution:** Check that the URI format is correct and uses the proper TcX base URL
