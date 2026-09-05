
#### Setup Cell Subscription

This task is performed by TcX Cell Subscription Provisioner (see [Entra Personas](../../../../../../CTCX-Intro/010_Containerized%20TcX%20Architecture%20Overview/020_AZURE/020_Setup%20Azure%20and%20Entra%20Groups%20and%20Roles.md))

###### Subscription Access Requirements

1. Activate your membership in the entra group `[subscription name]-Provisioners`, which grants "**User Access Administrator** and **Contributor** access to the Cell subscription `AZURE_SUBSCRIPTION_ID` through [PIM](../../../../../../CTCX-Intro/010_Containerized%20TcX%20Architecture%20Overview/020_AZURE/030_Activating%20Roles%20and%20Groups%20via%20PIM.md)
2. Activate your **Application Developer** access to the Entra tenant through [PIM](../../../../../../CTCX-Intro/010_Containerized%20TcX%20Architecture%20Overview/020_AZURE/030_Activating%20Roles%20and%20Groups%20via%20PIM.md).

check if you have `DISW_SUBS_Users_PIM_AppDevelopers` role listed in Privileged Identity Management, it can be requested via a [DISW SNOW ticket](https://diswsiemens.service-now.com/sp?id=sc_cat_item&table=sc_cat_item&sys_id=50be0241c3f72a901b27bc33e40131d1&recordUrl=com.glideapp.servicecatalog_cat_item_view.do%3Fv%3D1&sysparm_id=50be0241c3f72a901b27bc33e40131d1) . Suggested content:
```
Please grant my SPLM user (<SPLM USER ID>) the DISW_SUBS_Users_PIM_AppDevelopers role. I need to create Applications for TcX deployments.Please assign this ticket to the [Azure Cloud Security (DISW-L2)](https://diswsiemens.service-now.com/sys_user_group.do?sys_id=5bfac21597285910544cf4b3f153af6e) group.
```