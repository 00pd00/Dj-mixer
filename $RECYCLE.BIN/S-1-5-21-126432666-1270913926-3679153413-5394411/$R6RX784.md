# Configuration of Users & Groups in Azure Application Registration

**Responsibility: This step is to be performed by Customer Azure Admin team.**


Azure Application Registration's user and group configuration controls app access, enhancing security and streamlining management by restricting sign-in to designated individuals or teams


Once your application is registered in Azure, follow the steps below to configure the required API permissions:

1. Navigate to registered Application:
    - Go to the Azure Portal: https://portal.azure.com
    - Select Microsoft Entra ID in the home page.
    - In left-hand navigation pane under "Manage" section select "Enterprise Applications"
    
    ![alt text](Select_Enterprise_application.png)

    - Select the application that was registered for Power BI Integration.

    ![alt text](Select_Application.png)

2. Go to "Users and groups":
    In the left-hand navigation pane for your selected Enterprise application, click on "Users and groups" under the "Manage" section.

    ![alt text](Navigate_Users_Groups.png)


3. Add User/Group Assignment:
    Click the "+ Add user/group" button at the top below application name

    ![alt text](Click_Add_users_group.png)


4. Select Users or Groups:
    Click on "None Selected" under "Users and groups."
    A new pane will open where you can search for and select individual users or entire security groups from your Azure AD.
    Select the desired users and/or groups, then click the "Select" button at the bottom.

    ![alt text](Steps_to_add_users_groups.png)


5. Assign:
    Finally, click the "Assign" button at the bottom of the "Add Assignment" pane to finalize the configuration.

    ![alt text](Assign.png)




    
    
