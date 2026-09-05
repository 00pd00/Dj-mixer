##### Create Management Group Roles

###### Prerequisites

1. **Management Group Permissions**: You must have one of the following at the management group level:
   - **"Owner"** role assignment, OR
   - **RBAC + User Access Administrator (UAA)** role combination

2. **Scripts Access**: Obtain the scripts from the TcX Cell Subscription Provisioner who is setting up the cell.

**Important**: If you don't have the required management group permissions, open a [**SNOW Ticket: Modify Azure Admin Account**](https://diswsiemens.service-now.com/sp?id=sc_cat_item&sys_id=648f4bc71bd3dc106384a796bd4bcbce). Be sure to select the SPLM Tenant.


###### Setup Scripts

1. Get the `scripts.tar.gz` file from the TcX Cell Subscription Provisioner

2. Open a Bash Cloud Shell in Azure. Upload `scripts.tar.gz`.

   ![Image](./020_Prepare%20the%20scripts%20to%20be%20executed/image_84.png)

3. Extract and setup the scripts:

    ```bash
    tar -xzvf scripts.tar.gz
    dos2unix scripts/*.sh
    chmod +x scripts/*.sh
    cd scripts
    ```

4. Set the required environment variables:

    ```bash
    source ./0_cell_env_vars.sh
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
- Note the value of `LOCK_MANAGEMENT_ROLE_NAME` to use it at a follow-up page [Create and Export Custom Roles.md](040_Create%20and%20Export%20Custom%20Roles.md) section for appropriate env.

**Examples of suffix**: `dev`, `prod`, `MgmtGrp-Teamcenter`

###### 2. Custom Role for Backup Operator

The following steps create a custom role combining Backup Contributor and permissions to read soft-deleted KeyVault instances. Run `8_create_custom_role_tenant_sp_backup_operator.sh`:

```bash
TENANT_SP_CUSTOM_ROLE_BACKUP_OPERATOR="TcX-TenantSPCustomRole-TenantBackupOperator"
./8_create_custom_role_tenant_sp_backup_operator.sh $MANAGEMENT_GROUP_ID $TENANT_SP_CUSTOM_ROLE_BACKUP_OPERATOR
```

###### 3. Custom Role for Tenant Common RG Manager

The following steps create a custom role combining Reader, Network Contributor, Storage Account Contributor, and Storage Account Key Operator Service Role permissions. Run `10_create_custom_role_tenant_sp_tenant_common_rg_manager.sh`:

```bash
TENANT_SP_CUSTOM_ROLE_TENANT_COMMON_RG_MANAGER="TcX-TenantSPCustomRole-TenantCommonRGManager"
./10_create_custom_role_tenant_sp_tenant_common_rg_manager.sh $MANAGEMENT_GROUP_ID $TENANT_SP_CUSTOM_ROLE_TENANT_COMMON_RG_MANAGER
```

###### 4. Custom Role for Tenant Environment Manager

The following steps create a custom role combining Contributor, RBAC Admin, and Key Vault permissions to manage tenant resource groups. Run `11_create_custom_role_tenant_sp_tenant_env_manager.sh`:

```bash
TENANT_SP_CUSTOM_ROLE_TENANT_ENV_MANAGER="TcX-TenantSPCustomRole-TenantEnvironmentManager"
./11_create_custom_role_tenant_sp_tenant_env_manager.sh $MANAGEMENT_GROUP_ID $TENANT_SP_CUSTOM_ROLE_TENANT_ENV_MANAGER
```


###### Provide Role Information Back

After creating the missing roles, provide the **exact role names** back to the TcX Cell Subscription Provisioner.

**Note**: Management group-level roles are created once and shared across all subscriptions in the management group, so they only need to be created once per management group.