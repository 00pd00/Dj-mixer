# Configuration of API Permissions in Azure Application Registration

**Responsibility: This step is to be performed by Customer Azure Admin team.**

API permissions are vital for security, explicitly controlling an application's data access and actions within services like Microsoft Graph and Power BI for secure interaction.


Once your application is registered in Azure Active Directory, follow the steps below to configure the required API permissions:


1. Open Your Registered Application:
    - Go to the Azure Portal: https://portal.azure.com
    - Navigate to Microsoft Entra ID → App registrations
    - (Images to follow above steps already available in "Azure Application Registration" steps)
    - Search your application name in the search box (see below image)
    - Select your registered application from the list
    

2. Go to API Permissions:
    - On selecting the application - in the left-hand menu of your app's overview page, under Manage click on API permissions

    ![alt text](API_Permission.png)

    
3. Click on "+ Add a permission":
    - Choose "Power BI Service" 
    - Under Power BI Service
        - Select Delegated permissions
        - Select the below listed permissions & click on "Add permissions" as shown in below image::
        1. "Dataset.ReadWrite.All"
        2. "Report.ReadWrite.All"
        3. "Workspace.ReadWrite.All"
        4. "Capacity.ReadWrite.All"
        
    
    ![alt text](Microsoft_PowerBI_service_API.png)


4. Grant Admin Consent:
    ⚠️ Note: Only Azure AD administrators (such as Global Administrator or Privileged Role Administrator) can grant admin consent for application permissions or for delegated permissions that require admin approval.

    If you do not have access to a Global Administrator or Privileged Role Administrator account, please follow the internal process established within your organization.

        For example, at Siemens, a ticket can be created through DISW ServiceNow. The ticket will then be assigned to the appropriate team with the necessary Global Admin role to grant the required access.
        
        Link to raise ticket: https://diswsiemens.service-now.com/sp?id=sc_cat_item&table=sc_cat_item&sys_id=50be0241c3f72a901b27bc33e40131d1&recordUrl=com.glideapp.servicecatalog_cat_item_view.do%3Fv%3D1&sysparm_id=50be0241c3f72a901b27bc33e40131d1

    ![alt text](ServiceNow_ticket-Admin_consent.png)


    In case you have Global Administrator or Privileged Role – follow below step to grant consent:    
    - After adding the above-mentioned API permissions, click "Grant admin consent" (shown in below image) to approve the permissions on behalf of the entire organization.
    - Click on "Yes" when prompted to confirm the grant action.

    - After adding the above mentioned API permissions, click "Grant admin consent" (shown in below image) to approve the permissions on behalf of the entire organization.
    - Click on "Yes" when prompted to confirm the grant action.

   
The image below shows the state after granting all the API permissions: 

![alt text](API_Permissions_Granted_State.png)