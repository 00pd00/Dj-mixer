##### Prerequisites

###### Management Group Requirements

1. **Management Group Existence**: Your subscription must be under the correct management group:
   - To check your current management group, refer [Validate subscription management group](./011_Validate%20subscription%20management%20group.md)
   - Make sure your subscription is placed under the correct management group

2. **Required Management Group Roles**: The following custom roles must exist at the management group level before proceeding:
   - `TcX-LockManagement-Role-{suffix}` - For managing resource locks across the management group
   
   **Validation**: Use [Check Management Group Roles](./012_Check%20Management%20Group%20Roles.md) to verify these roles exist.
   
   **If Missing**: Coordinate with your Management Group Administrator to create them using [Create Management Group Roles](./013_Create%20Management%20Group%20Roles.md).

###### Subscription Access Requirements

Activate your **User Access Administrator** and **Contributor** access to the Admin subscription `YOUR_ADMIN_SUBSCRIPTION_ID` through [PIM](../../../../../../CTCX-Intro/010_Containerized%20TcX%20Architecture%20Overview/020_AZURE/030_Activating%20Roles%20and%20Groups%20via%20PIM.md). Activate your **Application Developer** access to the Entra tenant through [PIM](../../../../../../CTCX-Intro/010_Containerized%20TcX%20Architecture%20Overview/020_AZURE/030_Activating%20Roles%20and%20Groups%20via%20PIM.md).

check if you have `DISW_SUBS_Users_PIM_AppDevelopers` role listed in Privileged Identity Management, it can be requested via a [DISW SNOW ticket](https://diswsiemens.service-now.com/sp?id=sc_cat_item&table=sc_cat_item&sys_id=50be0241c3f72a901b27bc33e40131d1&recordUrl=com.glideapp.servicecatalog_cat_item_view.do%3Fv%3D1&sysparm_id=50be0241c3f72a901b27bc33e40131d1) . Suggested content:
```
Please grant my SPLM user (<SPLM USER ID>) the DISW_SUBS_Users_PIM_AppDevelopers role. I need to create Applications for TcX deployments.Please assign this ticket to the [Azure Cloud Security (DISW-L2)](https://diswsiemens.service-now.com/sys_user_group.do?sys_id=5bfac21597285910544cf4b3f153af6e) group.
```