# Steps to add a Redirect URI to Azure Application

**Responsibilty: Post-TcX deployment, the Customer Azure Admin Team must configure the Azure application by adding the necessary redirect URI for authentication.**

The Redirect URI is the authorized location where the authentication server sends the user after successful app authorization, preventing unauthorized token delivery.


Step-by-step guide to add a Redirect URI:

1. Log in to Azure Portal:
    If you're not already logged in, go to https://portal.azure.com and sign in using your Azure account credentials.


2. Navigate to Microsoft Entra ID:
    Locate Microsoft Entra ID under Azure services on the homepage or search for it using the search bar. Select Microsoft Entra ID.


3. Access App Registrations:
    Within Microsoft Entra ID, find and click App registrations from the left-hand menu.


4. Select Your Application:
    From the list of registered applications, click on the name of the application you registered as a pre-requisite step & will be used for Integrating with the Power BI (e.g., "MyApp", "TcX-PowerBI Integration"). This will take you to its overview page.


5. Navigate to Redirect URI:
    In the Application overview page - navigate to "Redirect URIs" (as shown in below image) & click on it.

![alt text](Navigate_to_RedirectURIs.png)


6. Click - Add a Platform:
    Under the "Platform configurations" section, click on + Add a platform
    A new pane will open, asking you to choose a platform. Select the "Web" platform for your application:

![alt text](Click_AddPlatform.png)


7. Add Redirect URI:
    In the "Redirect URIs" field, enter the URL(s) where your application expects to receive authentication responses. You can add multiple URIs.
    Construct the required redirect URI using the following format and click on configure:
    `<TcX_BASE_URL>/sd/tcrep/powerbi/getaccesstoken`
    Where:
    `<TcX_BASE_URL>` is the URL where TcX is running (e.g., `https://azdp016-prd.testplmcloudsolutions.com/awc`).
    
    Example: If TcX is running at `http://azdp016-prd.testplmcloudsolutions.com/awc`, the redirect URI would be `http://azdp016-prd.testplmcloudsolutions.com/awc/sd/tcrep/powerbi/getaccesstoken`.

![alt text](Add_Redirect_URI_Configure.png)


⚠️ Important: Redirect URIs must exactly match those configured in your Azure Application. Mismatched URIs will result in authentication failure..
