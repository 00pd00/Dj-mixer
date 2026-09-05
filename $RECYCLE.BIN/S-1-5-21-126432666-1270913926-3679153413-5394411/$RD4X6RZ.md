This document explains how to enable applications administration(Preferences, Workflow Designer, Projects, XRT Editor, Query Builder, Table Configuration) for the Self-Admin group.

---
### 1. Grant DBA privilege to Self-Admin group
Perform below steps to enable DBA privilege to the Self-Admin group:
- Login to the Active Workspace as a DBA group user.
- Switch workspace to Active Admin.

    ![Active Admin](images/1_Active_Admin.png)
- Launch 'People' tool from the application launcher.

    ![People](images/2_People.png)
- Expand the Organization tree, click on Self Admin Group under MyOrg.

    ![Self Admin](images/3_Self_Admin.png)
- Edit the group's properties.
- Set DBA privilege value as '1'

    ![Privilege](images/4_Privilege.png)
- Save the edits.

---
### 2. Update preference value Table_configurator_admin_delegates
Perform below steps to grant administration access to Self-Admin
- Login to the Active Workspace as a DBA group user.
- Launch 'Preferences' tool from the application launcher.

    ![Preferences](images/5_Preferences.png)
- Search for preference 'Table_configurator_admin_delegates'.

    ![Preference Definition](images/6_Preference_Definition.png)
- Add value - Group:"Self Admin Group.MyOrg" to the preference.

    ![Preference Value](images/7_Preference_Value.png)

- Save the edits.
