##### Create Management Group Roles

###### Prerequisites

1. **Management Group Permissions**: You must have one of the following at the management group level:
   - **"Owner"** role assignment, OR
   - **RBAC + User Access Administrator (UAA)** role combination

2. **Scripts Access**: Obtain the scripts from the TcX Admin Subscription Provisioner who is setting up the admin subscription.

**Important**: If you don't have the required management group permissions, open a [**CSO Jira Ticket**](https://siemensomneo.atlassian.net/servicedesk/customer/portals).

###### Setup Scripts

1. Get the `scripts.tar.gz` file from the TcX Admin Subscription Provisioner

2. Open a Bash Cloud Shell in Azure. Upload `scripts.tar.gz`.

   ![Image](./image_84.png)

3. Extract and setup the scripts:

    ```bash
    tar -xzvf scripts.tar.gz
    dos2unix scripts/*.sh
    chmod +x scripts/*.sh
    cd scripts
    ```

4. Set the required environment variables:

    ```bash
    source ./0_admin_env_vars.sh
    source ./0_cloud_env_vars.sh
    ```

###### Create Management Group Roles

###### 1. Create Lock Management Role

This role provides the least required privileges to manage resource locks across the management group.

```bash
ROLE_SUFFIX="PROVIDE UNIQUE ROLE NAME SUFFIX"
LOCK_MANAGEMENT_ROLE_NAME="TcX-LockManagement-Role-${ROLE_SUFFIX}"
./2_create_custom_role_lock_management_at_mgmt_group.sh $MANAGEMENT_GROUP_ID $LOCK_MANAGEMENT_ROLE_NAME
```

**Examples of suffix**: `dev`, `prod`, `MgmtGrp-Teamcenter`

###### Provide Role Information Back

After creating the missing roles, provide the **exact role names** back to the TcX Admin Subscription Provisioner.

**Note**: Management group-level roles are created once and shared across all subscriptions in the management group, so they only need to be created once per management group.