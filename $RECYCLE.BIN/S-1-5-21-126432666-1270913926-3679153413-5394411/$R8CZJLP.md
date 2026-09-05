## Post-Deployment Validation Steps for Supplier Connect

### 1. Prerequisite Steps from Partner Connect Validation:
*   Follow from [Step 1](../Partner%20Connect%20Deployment/Partner%20Connect%20Validation#1-prepare-your-users) to [Step 11](../Partner%20Connect%20Deployment/Partner%20Connect%20Validation#11-select-the-supplier-user) on OEM Sponsor Site.
*   Follow from [Step 1](../Partner%20Connect%20Deployment/Partner%20Connect%20Validation#1-prepare-your-users) to [Step 6](../Partner%20Connect%20Deployment/Partner%20Connect%20Validation#6-update-supplier-user-properties) on OEM Supplier Site.

### 2. On OEM Sponsor Site:
*   Login to Active Workspace using your sponsor user account.
*   Navigate to the "Folders" page.
*   Click on the "Add" command.

    ![Image](./image_522.png)

*   Select the Type as "Item".
*   Give the Name as "Supplier Connect Test Item".
*   Click the "Add" button.

    ![Image](./image_523.png)

*   Select the created Item and click on "More Commands > Share > Share with Suppliers".

    ![Image](./image_524.png)

*   Share with Supplier command panel gets open.
*   Give the Name as "Supplier Connect Exchange", in Access Level for Suppliers select "Write" and click on Add Supplier command.

    ![Image](./image_525.png)

*   Select the Supplier Company Contact the you have created, click Add.

    ![Image](./image_526.png)

*   Click on Share button.

    ![Image](./image_527.png)

*   Since the share is async process you will be notified in the alerts if the share is completed successfully or not.
*   Click on Alerts and check if Share with Supplier Site completed successfully or not.

    ![Image](./image_528.png)


### 3. On OEM Supplier SIte:
*   Login to Active Workspace using your supplier user account.

    ![Image](./image_529.png)

*   Navigate to Inbox.
*   Select the received Review Shared Data task and navigate to Attachments section.
*   Open the Data Exchange which is inside Replica Proposed Target table.

    ![Image](./image_530.png)

*   Select the Item in Data You Can Modify table and click on Checkout command.

    ![Image](./image_531.png)

*   Open the selected Item and navigate to Content tab.
*   Click on Add > Child.

    ![Image](./image_532.png)

*   Give Name as "Supplier Added Child" and click Add.

    ![Image](./image_533.png)

*   Navigate back to Data Exchange.
*   Select the Item in Data You Can Modify table and click on Checkin command.

    ![Image](./image_534.png)

*   Checkin is async process wait for few seconds, click on alerts and verify checkin is completed notification is there.

    ![Image](./image_535.png)

*   In comment section give a comment as "Added child Item please verify" and click on Submit Response button.

    ![Image](./image_536.png)

*   Response Submit is async process wiat for few seconds, click on alerts and verify response submitted notification is there.

    ![Image](./image_537.png)

*   Refresh the page and check if response status has been changes to "Submitted".

    ![Image](./image_538.png)

### 4. On OEM Sponsor Site:
*   Login to Active Workspace using your sponsor user account.
*   Navigate to Inbox.
*   Select the received Review Supplier Response task and navigate to Attachments section.
*   Open the Response which is inside Replica Proposed Target table.

    ![Image](./image_539.png)

*   Verify the Supplier Added Child Item is there inside the Structure table.

    ![Image](./image_540.png)

*   Navigate back to the Inbox task.
*   Add comment and "Looks good" and click on Approve.

    ![Image](./image_541.png)

### 5. On OEM Supplier Site:
*   Refresh the Data Exchange page and verify the response status is Approved inside Responses Table.

    ![Image](./image_542.png)