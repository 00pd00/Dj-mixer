This document explains how to disable applications administration(Preferences, Workflow Designer, Projects, XRT Editor, Query Builder, Table Configuration) for the Self-Admin group.

---
### 1. Revoke DBA privilege to Self-Admin group
Perform below steps to disable DBA privilege to the Self-Admin group:
- Login to the Active Workspace as a DBA group user.
- Switch workspace to Active Admin.

    ![Active Admin](images/1_Active_Admin.png)
- Launch 'People' tool from the application launcher.

    ![People](images/2_People.png)
- Expand the Organization tree, click on Self Admin Group under MyOrg.

    ![Self Admin](images/9_Self_Admin_DBA_Privilege.png)
- Edit the group's properties.
- Set DBA privilege value as '0'

    ![Privilege](images/8_Revoke_Privilege.png)
- Save the edits.

---
### 2. Update preference value Table_configurator_admin_delegates
Perform below steps to revoke administration access from Self-Admin
- Login to the Active Workspace as a DBA group user.
- Launch 'Preferences' tool from the application launcher.

    ![Preferences](images/5_Preferences.png)
- Search for preference 'Table_configurator_admin_delegates'.

    ![Preference Definition](images/10_Self_Admin_Preference_Value.png)
- Remove value - Group:"Self Admin Group.MyOrg" to the preference.

    ![Preference Value](images/7_Preference_Value.png)

- Save the edits.
