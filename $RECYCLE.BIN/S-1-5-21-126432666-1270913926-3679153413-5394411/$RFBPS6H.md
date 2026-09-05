## Post-Deployment Validation Steps for Partner Connect

### 1. Prepare Your Users:
*   Assuming two users are created where one acts as Sponsor User and another as Supplier User.

### 2. Access Active Workspace as Administrator:
*   Log in to Active Workspace using your administrative user account (your "self admin user" details).
*   From the Active Workspace homepage, click on the "People" tile to navigate to the Organization page.

    ![Image](./image_01.png)

### 3. Configure the Sponsor's Group and Role:
*   Within the MyOrg group, create a subgroup named "Engineering" (if it doesn't already exist).

    ![Image](./image_02.png)
    ![Image](./image_03.png)

*   To this "Engineering" group, add the "VendorAdmin" role.

    ![Image](./image_04.png)
    ![Image](./image_479.png)

*   Add your SponsorUser to the "VendorAdmin" role within the "Engineering" group.

    ![Image](./image_480.png)
    ![Image](./image_06.png)

### 4. Update Sponsor User Properties:
*   Locate and edit the properties of your SponsorUser.
*   Change their default group to "Engineering".
*   Save the user details.

    ![Image](./image_482.png)

*   Crucially, remove the SponsorUser from the "Viewer" group to ensure proper access control.

    ![Image](./image_08.png)

### 5. Configure the Supplier's Groups and Role:
*   Within the MyOrg group, create a subgroup named "External" with security set to External.

    ![Image](./image_02.png)
    ![Image](./image_09.png)

*   Inside the "External" group, create another subgroup named "Digital Engineering" with security set to External.

    ![Image](./image_10.png)
    ![Image](./image_11.png)

*   To the "Digital Engineering" group, create and add a role called "External Designer".

    ![Image](./image_12.png)

*   Add your SupplierUser to the "External Designer" role within the "Digital Engineering" group.

    ![Image](./image_13.png)
    ![Image](./image_14.png)

### 6. Update Supplier User Properties:
*   Locate and edit the properties of your SupplierUser.
*   Change their default group to "Digital Engineering".
*   Save the user details.

    ![Image](./image_15.png)

*   Remove the SupplierUser from the "Viewer" group.

    ![Image](./image_16.png)

### 7. Switch to Sponsor User Account:
*   Log out of Active Workspace from your administrative account.
*   Log in to Active Workspace using the SponsorUser credentials.

    ![Image](./image_481.png)

### 8. Create a New Vendor:
*   Navigate to the "Folders" page.
*   Click on "More Commands" > "New" > "Create Vendor".

    ![Image](./image_18.png)

### 9. Define Vendor Details:
*   In the "Create Vendor" panel, set the Name to "Digital Engineering".
*   In the "Contact" section, click the "Add" button.

    ![Image](./image_19.png)

*   Fill in the First Name and Last Name of your SupplierUser.
*   Click "Add" (to add the contact) and then "Add Vendor" (to finalize vendor creation).

    ![Image](./image_20.png)
    ![Image](./image_21.png)

### 10. Add Partner User to Vendor:
*   Open the newly created "Digital Engineering" Vendor object.
*   In the "Company Contacts" section, select the contact you just added.
*   Click on "More Commands" > "Manage" > "Add Partner User".

    ![Image](./image_22.png)

### 11. Select the Supplier User:
*   Search for your SupplierUser, select them from the results, and then click the "Add" button to confirm.

    ![Image](./image_23.png)

### 12. Initiate Partner Contract Creation:
*   Navigate to the "Partner Contracts" tab.
*   Click on the "Add" command.

    ![Image](./image_24.png)

### 13. Specify Partner Contract Details:
*   Set the Name as "Test Contract".
*   Set the Start Date as the current date.
*   Set the End Date as two weeks from the current date.
*   Select the Contact that you previously created.
*   Click "Add".

    ![Image](./image_25.png)

### 14. Complete the Partner Contract Task:
*   Select the newly created "Test Contract".
*   Click on "More Commands" > "Manage" > "Complete task".

    ![Image](./image_26.png)

### 15. Approve the Contract:
*   In the comment field, type "approving".
*   Click the "Approve" Button.

    ![Image](./image_27.png)

### 16. Create a Test Item:
*   Navigate back to the "Folders" page.
*   Click on the "Add" command.

    ![Image](./image_28.png)

*   Select the Type as "Item".
*   Give the Name as "Partner Connect Test Item".
*   Click the "Add" button.

    ![Image](./image_29.png)

### 17. Add Child 1 to the Test Item:
*   Open the newly created "Partner Connect Test Item" revision.
*   Switch to the "Content" tab.
*   Click on "Add" > "Child command".

    ![Image](./image_30.png)

### 18. Name Child 1:
*   Give the Name as "Child 1 of Partner Connect Item".
*   Click the "Add" button.

    ![Image](./image_31.png)

### 19. Add Child 2 to the Test Item:
*   Re-select the "Partner Connect Test Item".
*   Click on "Add" > "Child command".

    ![Image](./image_32.png)

### 20. Name Child 2:
*   Give the Name as "Child 2 of Partner Connect Item".
*   Click the "Add" button.

    ![Image](./image_33.png)

### 21. Assign Partner to the Parent Item:
*   With the "Partner Connect Test Item" selected, navigate to the "Partners" tab in the secondary work area.
*   Click on the "Add Partner Command".

    ![Image](./image_34.png)

### 22. Select Vendor and Contract:
*   Select the Vendor as "Digital Engineering".
*   Select the Partner Contract as "Test Contract".
*   Click the "Add" button.

    ![Image](./image_35.png)
    ![Image](./image_36.png)

### 23. Assign Partner to Child 1:
*   Similarly, open "Child 1 of Partner Connect Item".
*   Navigate to its "Partners" tab in the secondary work area.
*   Click on the "Add Partner Command".

    ![Image](./image_37.png)

*   Select the Vendor as "Digital Engineering" and the Partner Contract as "Test Contract".
*   Click the "Add" button.

    ![Image](./image_35.png)
    ![Image](./image_36.png)

### 24. Prepare for Supplier Validation:
*   Copy the Item ID of the "Partner Connect Test Item".

    ![Image](./image_38.png)

*   Log out of the SponsorUser session.

### 25. Login as Supplier User:
*   Log in to Active Workspace using your SupplierUser credentials.

    ![Image](./image_39.png)

### 26. Search for the Item:
*   Go to the "Advanced Search Page".

    ![Image](./image_40.png)

*   Paste the copied Item ID into the search field.
*   Click the "Search" button.

### 27. Open the Item Revision:
*   Select the found Item.
*   Open its Item Revision.

    ![Image](./image_41.png)

### 28. Verify Content Visibility:
*   Navigate to the "Content" tab.
*   Verify that the SupplierUser can see "Partner Connect Test Item" and "Child 1 of Partner Connect Item".
*   Crucially, observe that "Child 2 of Partner Connect Item" is not visible. This confirms the expected behavior, as the Partner Contract was intentionally not assigned to "Child 2 of Partner Connect Item".

    ![Image](./image_42.png)