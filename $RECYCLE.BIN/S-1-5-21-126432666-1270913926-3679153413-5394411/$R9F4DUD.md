### Pre-Req: 

a. Ensure that you have the necessary permissions for the below.(preferably an RBAC role which give you Azure Update Manager permissions)

b. Follow the steps if you want to perform an assessment and patch a virtual machine inside an Azure subscription.

### Assessment of a VM:

1. Go to Azure Portal --> Azure Update Manager home page.

    ![Image](./image_460.png)

2. Click on Check for Updates.

    ![Image](./image_461.png)

3. Select the resource you want to update and then click on Check for Updates.

    ![Image](./image_462.png)

4. You should be able to see a notification stating that the assessment of the machine in progress.

    ![Image](./image_463.png)

5. Once your assessment in completed, you should be able to see a notification for the same in the portal too.

    ![Image](./image_464.png)

6. Navigate to Azure Update Manager --> History

    ![Image](./image_465.png)

7. The run history of Update Manager is displayed. Filter out the assessment result selecting Group By Operation Type.

    ![Image](./image_466.png)

8. Check the operation type as Manual Assessment. You should be able to see your machine listed in the run.

    ![Image](./image_467.png)


9. Click on the machine to view the assessment results. You should also be able to check the last assessed time.

    ![Image](./image_468.png)


### Installing Manual Updates:

1. Go to Azure Portal --> Azure Update Manager home page.

    ![Image](./image_460.png)

2. Click on One Time Update. You should get a pop-up . Click on add machines.

    ![Image](./image_469.png)

3. Select the machine/machines you want to manually update. Once done, click on add.

    ![Image](./image_470.png)

4. Click on Next 

5. You should be now on the Properties page. Select the update classification or KB/ID package option if there are any specific category of updates or specific softwares that you want to install.

For ex: Here only security and critical updates have been selected for the Linux machines.
Click on Save.

![Image](./image_471.png)

6. Only that many number of updates should now be applicable for installation on your machine. Click on Next.

7. Select the Reboot option and the update window as per your choice. Recommended is to use reboot if required for Reboot option.

    ![Image](./image_472.png)

8. Click on Next --> Install. 

9. The installation starts and once completed, the results can be tracked from Azure Update Manager --> History.

    ![Image](./image_473.png)



