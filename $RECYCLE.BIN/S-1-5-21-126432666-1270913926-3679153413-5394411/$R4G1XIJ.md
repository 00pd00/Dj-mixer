# Power BI Admin Portal Configuration

**Responsibility: The Customer Azure Admin team is responsible for enabling the required configurations within the Power BI Admin Portal.**

The Power BI Admin Portal allows organizations to configure governance, security, compliance, and performance settings, managing features, access and data protection within their Power BI environment


Permissions Required: You must be a Power BI Admin or Global Administrator in Azure Active Directory to change tenant settings in the Power BI Admin Portal.

**For Siemens users using splm id, steps 1–6 are not required as these configurations have already been applied to the "DISW PowerBI APIaccess" security group.** 


Steps to Enable PowerBI configurations:
Follow these steps to configure your Power BI tenant for service principals and XMLA endpoints

1.  Sign in to Power BI Service:
    Go to: https://app.powerbi.com/

⚠️ Note: Sign in using an account that has Power BI Administrator or Global Administrator rights.


2.  Open the Admin Portal
    Click on the gear icon (⚙️) in the top-right corner.
    Select "Admin portal" from the dropdown.
    ![alt text](PowerBI_Admin_Portal.png)


3.  Navigate to Tenant Settings
    In the left-hand menu of the Admin Portal, click on "Tenant settings."


4.  Locate the Setting
    Scroll or search for the setting: "Service principal can call Fabric public APIs"


5.  Enable the Setting
    Click on the toggle to enable the setting.
    Choose who it applies to:
    - Entire organization
    - Or Specific security groups (recommended)
    After selecting your scope, click "Apply" to save the changes.
    ![alt text](Tenant_settings.png)


6.  Enable XMLA Endpoint Setting:
    In Tenant Settings search for "XMLA endpoint"
    Enable the below setting under Integration Settings:
    "Allow XMLA endpoints and Analyze in Excel with on-premises semantic models"
    Select the scope:
    - Entire organization
    - Specific security groups (recommended)
    
    ![alt text](XMLA_Endpoint_Setting.png)

7.  Adding new users to the DISW PowerBI APIaccess security group

        To add new users to the DISW PowerBI APIaccess security group, you need access to the DISW PowerBI APIaccess group. To request this access, create a ServiceNow ticket through the DISW ServiceNow portal:
    
        For example, at Siemens, the "DISW PowerBI APIaccess" option is already selected in PowerBI Admin Portal. 
        
        FOr adding new users to the "DISW PowerBI APIaccess" security group - ServiceNow ticket is to be created through the DISW ServiceNow portal & will then be assigned to the appropriate team with the necessary permissions to add the required users to the security Group.
        Link to raise ticket: https://diswsiemens.service-now.com/sp?id=sc_cat_item&table=sc_cat_item&sys_id=50be0241c3f72a901b27bc33e40131d1&recordUrl=com.glideapp.servicecatalog_cat_item_view.do%3Fv%3D1&sysparm_id=50be0241c3f72a901b27bc33e40131d1

![alt text](Security_group_access.png)