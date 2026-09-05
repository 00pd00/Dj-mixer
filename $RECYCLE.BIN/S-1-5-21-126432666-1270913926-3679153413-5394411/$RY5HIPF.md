## Perform Essentials Post-Deploy Steps

After completing [Upgrading an existing Deployment](../045_Upgrading%20an%20existing%20Deployment/000_Upgrading%20an%20existing%20Deployment.md), the following post-deploy steps will also need to be completed. These steps are specific to Essentials and are required to ensure proper functionality:

- [Update License File](../090_Optional%20Product%20Integrations/010_Teamcenter%20X%20Essentials/010_Post-Steps.md#update-license-file)
- [FSC Scalability and number of Replicas](../080_Troubleshooting/055_Memory%20Bottlenecks%20in%20FMS%20with%20Concurrent%20Users.md#fsc-scalability-and-number-of-replicas)
- [Disabling FMS Virus Scan](../080_Troubleshooting/290_Disabling%20FMS%20Virus%20Scan.md)
- [Generate Client Meta Cache for RAC CAD Client to Work in Non-English Locale](../../010_Tenant%20Onboarding/030_Post%20Deploy%20Operations/160_Rich-Client%20Installation.md)

### Update SAMAuth App in SAMAuth Console (only if new scopes/permissions are needed)

1. Login to SAMAuth Console [Production](https://samauthconsole.us-east-1.sws.siemens.com/) or [Pre-prod](https://samauthconsole.preprod.teamcenterwebservices.com/). Make sure you have access as admin to the TCX environment's ECA
2. Select the SAMAuth app whose scopes or permisions is to be modified and click on the Edit (Pencil) button.
3. In the Summary page, select the Permissions tab. This will take you to the Permissions tab showing the table PERMISSION REQUIRED BY THIS APP. If the expected  permissions are already shown, do not need to proceed any further.
4. In the Permission page, select the Add (+) button.  This will take you to the popup page. It will take few seconds for it to fetch all available permissions. Select the new scopes or permissions to add, and hit Save. It should take you back to the Permissions tab showing the table PERMISSION REQUIRED BY THIS APP with the new permissions added but with Unapproved status. Select the Permissions tab to save and submit the updated app.
5. In the Summary page, click on the Save and then Submit to start the approval process.
6. Open an [FDS ticket](https://fdsone.atlassian.net/servicedesk/customer/portal/302) to request the approval.  Provide your appId (from the SAMAuth URL like: `/app/<appId>` ), and your ECA. NOTE: Unless the app is approved with new scopes, the new scopes will not be active. 

#### Addition and approval of required scopes

For these SKUs the below SAM Auth scopes are required to be added and approved using the [steps above](#update-samauth-app-in-samauth-console-only-if-new-scopespermissions-are-needed).  Scopes are to be added to the Tcss SAM Auth application.

* sam_account
* samauth.ten
* profile
* read:apikey
* samauth.skey 
* sws.lcs.cs.r
* sws.lcs.cs.home.con.w
* sws.lcs.cs.home.all
* sws.lcs.cs.proj.all

Screenshot below shows list of added scopes.  There may be additional scopes if another product required scopes as well.  Scopes will show status as "Unapproved" until the app is approved by FDS.

![SAM Auth Console Permissions Screenshot](../image-5.png)
