---
slug: /Documentation/Operations/Offboarding-TcRA-Customer
---

# Offboarding a Teamcenter Reporting and Analytics (TcRA) TcX Customer

This guide provides easy-to-follow instructions for offboarding a TcRA-TcX customer by exportingTcRA entities using command line Utility.

---

## Overview

- **Pre-requisites** Access to TcRA Server EC2 instance
- **Tool:** Command-Line Utility
- **Goal:** Export all the exportable entities from TcRA server for customer offboarding

---

## Export TcRA Data Using the Command-Line Utility

If you have the necessary credentials and details from the customer, you can extract TcRA data using the command-line utility.

### Steps

**A. License**

If the TcRA license is **already expired** then follow below steps otherwise skip this step.
     
  1.  Procure new temporary license for limited validity (e.g. 7 days).
      
      Refer cookbook section **'Request TcRA License'**
      e.g. [Teamcenter Reporting And Analytics ver. 2506 (siemens.com)](https://ctcx.code.siemens.io/cookbook/docs/2506/Product%20Integration%20Documentation/Teamcenter%20Reporting%20and%20Analytics/Licensing/Procure_license)

   2. Install procured temporary license.

      Refer cookbook section **'Maintenance And Administration Instructions > 5. Update TcRA license file'**
      e.g. [Teamcenter Reporting And Analytics ver. 2506 (siemens.com)](https://ctcx.code.siemens.io/cookbook/docs/2506/Product%20Integration%20Documentation/Teamcenter%20Reporting%20and%20Analytics/Maintenance%20And%20Administration%20Instructions/Maintenance%20And%20Administration%20Instructions/)

---

**B. User Access and Details**

   1. Obtain OS user **'ra_user'** credentials of the TcRA Server EC2 instance  (refer TcRA cookbook section 'TcRA Secret Name' for Key **'ra-user-pwd'**).

      e.g. [Teamcenter Reporting And Analytics ver. 2506 (siemens.com)](https://ctcx.code.siemens.io/cookbook/docs/2506/Product%20Integration%20Documentation/Teamcenter%20Reporting%20and%20Analytics/Installation/Automation/Automation%20Output/)

   2. TcRA Infra-structure User (CApS Admin User - 'tcxadmin') access is required to login TcRA.

   3. Identify TcRA Customer Admin User (**login id only**).

      For details how customer admin user was on-boarded to TcRA refer cookbook section **'TcRA Admin Console Updates > 6. On-board TcRA Customer Application Admin'**.
      
      e.g. [Teamcenter Reporting And Analytics ver. 2506 (siemens.com)](https://ctcx.code.siemens.io/cookbook/docs/2506/Product%20Integration%20Documentation/Teamcenter%20Reporting%20and%20Analytics/Post%20Deployment%20Steps/TcRA%20Admin%20Console%20Updates/TcRA%20Admin%20Console%20Updates/)

---

**C. Download TcRA Client Secrets**

   1. Login to the TcRA Admin Console as the infra-structure admin (tcxadmin). 

       **TcRA Admin Console URL**  
      `https://<DNSSubDomain>.<DNSHostName>/TcRA/AdminConsole`

   2. Navigate to `Server Configuration` → `Properties`
       ![App_Properties](images/1_Select_Properties.png)

   3. Navigate to `Application Security` → `Application Management` and click on **Create**
       ![Create_Secrets](images/2_Create_TcRA_login_app.png)

   4. Provide details as below
       - Application Name : Export_TcRA_Data   (Any other value will also work).
       - Grant type : Select 'CLIENT_CREDENTIALS' , 'IMPERSONATE' , 'REFRESH_TOKEN'  only

![Provide_details](images/3_Select_Details.png)

   5. Click 'Users' tab and select the **customer admin user** from the list ('Login Id' identified at Step B.3)
      e.g. 'Customer_Admin_User_ID'
       
![Customer_admin_details](images/4_Select_Customer_Admin_User.png)

   6. Click 'Roles' tab and select **'EQUBE_ADMIN'** 

![Role_details](images/5_Select_Admin_Role.png)

   7. Click **'Save'** it will auto download **TcRA Secrets JSON** file as shown below

![download_secrets](images/6_Save_downloaded_TcRA_secrets.png)
  
   8. Open the downloaded json file in notepad to note **CLIENT_ID** and **CLIENT_SECRET** values. e.g. file contents will look like below.

   ![downloaded_secrets](images/7_JSON_file_contents.png)
   
---

**D. Execute Export Utility**

   1. Login to the TcRA Server EC2 machine using the `ra_user` user **only**.

   2. Change directory to `/siemens/TcRA_consumables/export_data_automation`

   3. Edit file **'export-data-parameters.json'** and provide paramters values as below :

      1. **site-name-url** : This is application URL of TcRA.
                              `https://<DNSSubDomain>.<DNSHostName>/TcRA`

      2. **user-id** : TcRA Customer Admin User (Refer Step B.3)

      3. **client-id** : TcRA secrets (Refer Step C.8)
      
      4. **client-secret** : TcRA secrets (Refer Step C.8)

      Save updated file. (Refer below sample json file)

      ![JSON.Properties](images/8_parameters_json_file.png)

   4. Execute export data utility 
   
```bash
     sh export-data.sh
```
   Refer below sample utility execution screenshot

   ![success_execution](images/9_Executed_script_success.png)
     

   5. Upon successful utility execution, Locate the exported files (ZIPs).

      Change directory to `/siemens/TcRA_consumables/export_data_automation`

      ![success_execution](images/10_output_files.png)

      
The export process has been completed successfully.

Please copy the following files and share them with the customer:
   - ALL.zip
   - Report.zip

**E. Offboard TcRA AWS infra-structure**

 To Delete/offboard TcRA AWS infra-structure for TcRA ver.2506 refer 

[Delete / off-board TcRA AWS infra-structure](https://ctcx.code.siemens.io/cookbook/docs/2506/Product%20Integration%20Documentation/Teamcenter%20Reporting%20and%20Analytics/Maintenance%20And%20Administration%20Instructions/Offboard%20TcRA%20Infra)

