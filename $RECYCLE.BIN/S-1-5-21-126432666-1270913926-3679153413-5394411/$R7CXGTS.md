### Pre-Req: 

Ensure that you have the necessary permissions for the below.(preferably an RBAC role which give you Azure Update Manager permissions, UAA and Contributor rle for the subscription or MG)

### Create a azure workbook to see the patch results:

1. Go to Azure Portal --> Azure Update Manager home page. Under Monitoring tab go to Reports.

    ![Image](./image_488.png)

    
2. Click on Workbooks. 

    ![Image](./image_489.png)


3. Click on New.

    ![Image](./image_490.png)


4. Click on Add and select Add Query

    ![Image](./image_491.png)


5. Put the below mentioned query in workspace 

```kql
arg('').patchinstallationresources
| where type in~ ("microsoft.compute/virtualmachines/patchinstallationresults", "microsoft.hybridcompute/machines/patchinstallationresults", "microsoft.compute/virtualmachines")
| where properties.status =~ "Succeeded" // "CompletedWithWarnings" and other statuses can also be considered
| where properties.lastModifiedDateTime > ago(7d)
| extend machineName = tostring(split(id, '/', 8))
| where properties.maintenanceRunId contains "$Maintenance_configuration_name"
| parse id with vmResourceId "/patchInstallationResults" *
| parse machineName with VM_name
| parse subscriptionId with Subscription
| parse properties.status with vmStatus
| parse resourceGroup with resourcegroup
| parse properties.lastModifiedDateTime with Date_and_Time
| project  VM_name, Subscription, vmStatus, Date_and_Time, resourcegroup
| distinct  VM_name, Subscription, vmStatus, Date_and_Time, resourcegroup
```

  Change properties.status =~ to "Succeeded" or "Failed" based on which status you need.
  Replace $Maintenance_configuration_name with the Maintenance configuration you need.
  If required add additional filters based on subscription , resource group etc.

6. Put the below mentioned values:
    
    Data Source: Logs (Analytics)

    Resource Type: Log Analytics

    Log analytics workspace: Name of your Log analytics worlsapce where query will run

    Time Range: As required

    Visualization: Set by query

    Add all the Advanced setting details as required


    ![Image](./image_492.png)


7. Click on Run query. Once you get the query results click on Done Editing and then Save.While Saving give the title and location for workbook. Your Workbook will be saved.


### Create Logic App to generate mails for Patch reports

1.  Go to Azure Portal --> Azure Logic Apps home page.

    ![Image](./image_493.png)


2.  Click on Add and select prefered hosting plan.

    ![Image](./image_494.png)


3.  Enter the required details for the logic app and create the app.

    ![Image](./image_495.png)


4.  Open the created Logic App and go to workflows.

    ![Image](./image_496.png)


5.  Click on Add

    ![Image](./image_497.png)


6.  Give the workflow a meaningful name and select Stateful in the state type and create the workflow.

7.  Open the created workflow and Go to Designer.Click on trigger in Designer space.

    ![Image](./image_498.png)


8.  Search for Recurrence. Select the below shown option.

    ![Image](./image_499.png)


9.  Add the details and schedule for receiving the mails and save.

    ![Image](./image_500.png)


10. Click on '+' sign to add next step.

    ![Image](./image_501.png)


11. Search for 'Run Query and list results' under azure monitor logs.

    ![Image](./image_502.png)


12. Provide the details for workspace where the query will run and provide the query mentioned during workbook creation. Save it.

    ![Image](./image_503.png)


13. Add more run query and list results blocks to get results for different scenarios.


14. Add an action to Create CSV table of the results from the query. select Create CSV Table from Data operations.

    ![Image](./image_504.png)


15. Provide details as mentioned below.
  
    From: Select value from Dynamic content for the run query and list results
    For Columns select values which we require in csv file

    ![Image](./image_505.png)


16. Add Compose tab to get total number of machines for each query. Provide details as below.

    ![Image](./image_506.png)

17. Add 'Initialize variables' action. Initialize empty string variables to hold successful , failed and other results.

    ![Image](./image_510.png)


18. Add 'For each' loop for results of every run query output. In the loop run 'Append a string variable' action and append query output to the respective variables initialized in previous step.

    ![Image](./image_511.png)

19. Add Compose tab to generate html report. Write a html and css code in compose action to have a html response generated.

    ![Image](./image_512.png)


20. Add 'Send an email (V2)' from Office 365 outlook(Before this step we can add conditions based on query results on when we want the email with the report using 'Conditions')

    ![Image](./image_507.png)
    

    ![Image](./image_508.png)


21. Configure the details for the mail as required. Add csv table and html report generated in attachments. You can also add link for the workbook created in mail body.

    ![Image](./image_509.png)


19. Save the workflow.

20. You can create various workflows under a logic app.

21. The workflow will trigger at the scheduled time and send mails accordingly. Make sure your roles and access are active during the trigger time.

