# Users & Groups Configuration in Azure

**Responsibility: The customer's Azure administrator should perform this step.**

To enable users to access the TcOOSPE integration, they must be assigned to the Azure application. This ensures that only authorized users can authenticate and use the integration.


Step-by-step guide to add users and groups:

1. Navigate to Enterprise Applications:
    In the Azure Portal, go to Microsoft Entra ID.
    Click on Enterprise applications from the left-hand menu.


2. Select Your Application:
    From the list of enterprise applications, find and click on the application you registered for TcOOSPE integration.


3. Navigate to Users and Groups:
    In the application overview page, select Users and groups from the left-hand menu.


4. Click "Add user/group":
    Click the + Add user/group button at the top.


5. Select Users or Groups:
    Under Users:
    - Click on "None Selected"
    - Search for and select the users who should have access to the TcOOSPE integration
    - Click "Select"

    Under Groups (if using groups):
    - Click on "None Selected" under Groups
    - Search for and select the appropriate security groups
    - Click "Select"


6. Assign Role (if applicable):
    If your application has defined roles, select the appropriate role.
    Otherwise, the default access role will be used.


7. Click "Assign":
    Click the Assign button to complete the assignment.


8. Verify Assignment:
    The assigned users and groups should now appear in the Users and groups list.


Best Practices:

- Use Security Groups: Instead of adding individual users, create Azure AD security groups and assign the groups to the application. This simplifies user management.
- Regular Review: Periodically review the assigned users and groups to ensure only authorized personnel have access.
- Conditional Access: Consider implementing conditional access policies for additional security (e.g., require MFA, restrict access by location).


⚠️ Note: Users not assigned to the application will receive an error when attempting to authenticate with the TcOOSPE integration.
