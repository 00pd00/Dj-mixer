Pre-Req: 

a.Ensure that you have the necessary permissions for the below.(You should be having the Scheduled Patching Contributor role to access the maintenance configuration)

b.Ensure that you have applied the necessary policies for tagging your machines for patch update(Refer to apply required policies section)

c.Machines tagged with Patch:True only will be picked up for patching. VMs will be tagged Patch:True after a successful deploy pipeline run. In the events that the pipeline is not completed VMs are not tagged, an schedule automation will run every Friday evening and pick up existing machine created more than 24 hours ago and tag them with Patch tag so that they are picked in the next subsequent run.

d.If a developer wants to exclude their machine they need to change their patch tag value to false and vice versa.

### Create a maintenance configuration

1. Go to Azure Portal ---> Maintenance Configuration

    ![Image](./image_474.png)

2. Click on Create to create a new maintenance configuration.

    ![Image](./image_475.png)

3. Select a subscription and resource group. The maintenance configuration needs to be created within a particular resource group of a subscription.

4. Enter Name and Region. Select Maintenance scope as Guest(Azure VM's)

    ![Image](./image_476.png)

5. Select the Reboot Setting as per requirement.

6. Click on add schedule. This is to define the schedule during which the maintenance window will run. Click on Save after making the changes.

    ![Image](./image_477.png)

7. Click on Next.

8. Click on Next again and go to Dynamic Scopes.

9. Click on add a dynamic scope.

10. Under subscriptions, select the subscriptions whose resources you want to cover under patching.You can select multiple or all subscriptions from this list.

    ![Image](./image_478.png)

11. The applicable machines would be automatically listed based on the filter. (Note: Those with patch orchestration not set as Customer Managed Schedules will not be supported for patching through the maintenance window)

12. Click on Filter By to further scope down the machines as per customization.

    ![Image](./image_479.png)

13. Add the relevant filters. Please note that the machines in the selected subscriptions would be filtered out according to this criteria and added to the maintenance configuration for updates.

14. Ensure that you select the following values for the tag combination in adddition to the other filter prefernces as per your choice.

    Option: Any
    Name: Patch
    Value: True

This would ensure that only the machines with Patch=True tag is picked up for the maintenance configuration window.

![Image](./image_487.png)

15. Click on OK.

16. Click on Save. The dynamic scope is now saved to the configuration.

17. If there are machines which do not have patch orchestration as Customer Managed schedules in the filtered list, you will be prompted this page.

    ![Image](./image_480.png)

18. Click on the appropriate option accordingly. Click on Save.

19. Click on Next. You will be redirected to the Updates section.

    ![Image](./image_481.png)

20. Click on update classification & KB ID/Package options to configure any specific type of updates in the window , if any. This is only required if you want only specific types of updates to be installed during the window. 

    For ex : In this case, only Security and Critical Updates are configured to be run during the window.

    ![Image](./image_482.png)

21. Proceed to review and create. The maintenance configuration window has now been successfully created.

### Note

The above configuration would ensure that only machines with Patch=True tag are picked up for patching during the maintenance window. If a user needs to exclude their machine from patching, they need to change the value of Patch on the virtual machine from True to False.

Current maintenance configuration schedules running on Teamcenter Management group:

Security and Critical updates: Daily 3am to 6:55am for Linux and Windows VMs

Full System update for Windows Machines: Every 2 weeks on Sundays 10am to 1:55 am

Full System update for Linux Machines: Every 4 weeks on Saturdays 10am to 1:55 am