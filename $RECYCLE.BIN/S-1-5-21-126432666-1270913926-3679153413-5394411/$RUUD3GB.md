# Validation steps for successful deployment of Integration:

For the 2606 release, Power BI reports will be created using the existing Power BI templates available in the Teamcenter template library.

Pre-requisites for validating the deployment:
- Complete all the pre-requisites & Post deployment configurations.

- Ensure that the Dispatcher is up and running.

- Ensure that Item Revisions are available and either associated with the user or correspond to the filters applied in the filter pane during report creation in the TcX environment. If none of the items are available, create a few (~4-5) Item Revisions before generating the Power BI report.


- In Power BI reports, Teamcenter links are provided to enable users to directly navigate to the corresponding Teamcenter object/item. To ensure the link functions correctly, update the `Crf_report_aw_object_url` preference in the TcX configuration with the appropriate URL format as shown below.

Update the preference `Crf_report_aw_object_url` with the following value: 
```json
http://<TcX_BASE_URL>/#/com.siemens.splm.clientfx.tcui.xrt.showObject?uid=
```
The image below is for reference purposes only and TcX_Base_Url may vary depending on the environment.

![alt text](Preference_configuration.PNG)


Steps to Verify the Deployment:

1. Login to TcX environment.

2. Once logged in, go to the Reports tab, as shown in the image below:

![alt text](Reports_tab.png)


3. Go to "Templates" tab as shown in below image:

![alt text](Templates_tab.png)


4. In the search bar, type "All Item" and click Open once "All Item Revisions Report" appears in the search results.

![alt text](Search_ReportTemplate.png)


5. On the right side of the page, you will see the “Generate Report” tab. Under this tab, a warning message will appear stating “Login to Power BI” as shown in below image. Click the Login button:

![alt text](Login_to_PowerBI.png)


7. After clicking Login, a pop-up will appear asking for credentials.
- Enter your Entra ID credentials (splm credentials) which should already be added to the Azure Enterprise Application.

![alt text](Login_Popup.png)


5. In the Reports Filter, under the "Name" field, enter "*" (asterisk) to select all items, or specify the name of the item for which you want to generate the report. Apply any additional filters as needed to refine the results.

**Note: Ensure that items exist corresponding to the filters applied in the filters pane while creating the report. If none of the items are available, create a few (~4-5) Item Revisions before generating the Power BI report.**


8. Scroll down and check whether the Power BI template (in this case, "All_Item_Rev_Default.pbix") is available under the "PowerBI Template" option. Ensure that the checkbox labeled "Run in Background" is selected, then click "Generate."

![alt text](PowerBI_template.png)


9. After clicking Generate, you will receive the following notification confirming the report generation:

![alt text](Notification.png)


10. Once Power BI report is generated, user will be notified in alerts as shown below. 

![alt text](Alerts.png)


11. Click the link in the alert notification. This will navigate you to the generated Power BI report (the visual display may differ based on the data):

![alt text](PowerBI_Report.png)


12. Validation Complete.



