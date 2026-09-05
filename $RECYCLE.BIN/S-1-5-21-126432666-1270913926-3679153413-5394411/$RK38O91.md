# Application Registration in Azure Active Directory (Mandatory Pre-requisite)

**Responsibility: The customer's Azure administrator should perform this step. Once completed, the outcome must be shared with the Siemens CApS team.**

Azure application registration is a mandatory prerequisite before initiating the provisioning of any new environment. 

Azure application registration provides your application with a unique identity (client credentials) in Azure Active Directory, enabling secure authentication and controlled access to Azure services. It generates the Enterprise App Name, Tenant ID, Client ID, and Client Secret, which are required for pipeline execution


Prerequisites to Register an Application in Azure Active Directory:

a. Azure AD Access:
    You must have access to an Azure AD tenant.
    Typically, this means being a member of an Azure subscription with Azure AD.

b. User Role or Permissions:
    To register an app, you must have one of the following directory roles:

| Role                        | Description                                                    |
| :-------------------------- | :------------------------------------------------------------- |
| Application Administrator   | Can create and manage all aspects of app registrations and enterprise apps. |
| Cloud Application Administrator | Similar to Application Admin, but more limited.         |
| Global Administrator        | Has full access, including app registrations.                  |
| Privileged Role Administrator | Can manage role assignments including application roles.    |

Below is step by step guide to register an application in Azure portal:

1.  Log in to Azure Portal:
    Go to https://portal.azure.com and sign in using your Azure account credentials.


2.  Navigate to Microsoft Entra ID:
    After logging in, locate Microsoft Entra ID under Azure services on the homepage or search for it using the search bar. Select Microsoft Entra ID.

    ![alt text](Azure_Portal_HomePage.png)


3.  Access App Registrations:
    Within Microsoft Entra ID, find and click App registrations from the left-hand menu:
    From the Overview page, expand the Manage section. Click on App registrations.
    (Note: The exact menu path may vary slightly based on portal updates).

    ![alt text](Access_App_Registrations.png)


4.  Click on "New Registration":
    At the top of the page, click the Add button.
    From the dropdown, select App Registration to start registering a new application.

    ![alt text](New_Registration.png)


5.  Fill in the application details & Click Register:
    Name: Enter a name for your application. This can be any meaningful identifier that helps you recognize the purpose of the app.
    (e.g., "MyApp", "TcX-PowerBI Integration").

    Supported account types: Choose who can use the app:
    - Single tenant "only accounts in your organization" (recommended)

    ⚠️ The Redirect URI must be added after the deployment of the TcX-Power BI Integration solution. For detailed steps on how to add the Redirect URI, refer to the "Post Deployment Configurations" section

    After filling in the details, click the Register button.

    ![alt text](Fill_Application_Details.png)


6.  Client Credentials (Enterprise App Name, Client ID, Tenant ID, Client Secret):
    Following above steps the application will be registered & it will open the details of application (Enterprise App Name/Display Name, Client ID, Tenant ID, Client secret) as shown in below image:

    ![alt text](Azure_Application_Details.png)

    Client Secret will be generated using further steps.
    Meanwhile note the Enterprise App Name/Display Name, Client ID & Tenant ID.

    These client credentials will be used further as input to the pipelines for TcX Integration.

    Below mentioned details to be shared to CApS team:
        a. Enterprise App Name/Display Name
        b. Client Secret
        c. Client ID
        d. Tenant ID


7.  Generate Client Secret:
    In the application page, go to Certificates & secrets on the left menu.
    Under Client Secrets click New client secret
    Provide a description (e.g., "MyApp Secret").
    For Expires, select the maximum validity period available (usually 24 months or Custom if allowed).
    Click Add.

    ![alt text](Client_Secret.png)

Important: Copy the generated secret value immediately — it won’t be shown again.


8.  Configure API Permissions:
    For detailed step-by-step instructions refer next page.