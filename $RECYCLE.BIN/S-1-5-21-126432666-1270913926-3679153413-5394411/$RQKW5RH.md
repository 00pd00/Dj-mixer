

##### Export Custom Roles

###### 1. Navigate to the `scripts` folder:
```bash
   cd scripts
```
###### Management Group-Level Roles

These roles are created once per management group and shared across all subscriptions:

###### 2. Export Lock Management Role

Use the exact role name you found during validation:

```bash
# Use the exact name you copied from the check:
LOCK_MANAGEMENT_ROLE_NAME="<role name copied from 002_Check Management Group Roles>"
echo "export LOCK_MANAGEMENT_ROLE_NAME='$LOCK_MANAGEMENT_ROLE_NAME'" >> ./0_cell_env_vars.sh

LOCK_MANAGEMENT_ROLE_ID=$(az role definition list --query "[?roleName=='$LOCK_MANAGEMENT_ROLE_NAME'].id" -o tsv)
echo "export LOCK_MANAGEMENT_ROLE_ID='$LOCK_MANAGEMENT_ROLE_ID'" >> ./0_cell_env_vars.sh
```

###### 3. Export Backup Operator role

```bash
TENANT_SP_CUSTOM_ROLE_BACKUP_OPERATOR="TcX-TenantSPCustomRole-TenantBackupOperator"
echo "export TENANT_SP_CUSTOM_ROLE_BACKUP_OPERATOR='$TENANT_SP_CUSTOM_ROLE_BACKUP_OPERATOR'" >> ./0_cell_env_vars.sh

TENANT_SP_CUSTOM_ROLE_BACKUP_OPERATOR_GUID=$(az role definition list \
  --query "[?roleName=='$TENANT_SP_CUSTOM_ROLE_BACKUP_OPERATOR'].name" \
  -o tsv)
 
echo "export TENANT_SP_CUSTOM_ROLE_BACKUP_OPERATOR_GUID='$TENANT_SP_CUSTOM_ROLE_BACKUP_OPERATOR_GUID'" >> ./0_cell_env_vars.sh
```

###### 4. Export Tenant Common RG Manager role

```bash
TENANT_SP_CUSTOM_ROLE_TENANT_COMMON_RG_MANAGER="TcX-TenantSPCustomRole-TenantCommonRGManager"
echo "export TENANT_SP_CUSTOM_ROLE_TENANT_COMMON_RG_MANAGER='$TENANT_SP_CUSTOM_ROLE_TENANT_COMMON_RG_MANAGER'" >> ./0_cell_env_vars.sh
 
TENANT_SP_CUSTOM_ROLE_TENANT_COMMON_RG_MANAGER_GUID=$(az role definition list \
  --query "[?roleName=='$TENANT_SP_CUSTOM_ROLE_TENANT_COMMON_RG_MANAGER'].name" \
  -o tsv)
 
echo "export TENANT_SP_CUSTOM_ROLE_TENANT_COMMON_RG_MANAGER_GUID='$TENANT_SP_CUSTOM_ROLE_TENANT_COMMON_RG_MANAGER_GUID'" >> ./0_cell_env_vars.sh
```

###### 5. Export  Tenant Environment Manager role

```bash
TENANT_SP_CUSTOM_ROLE_TENANT_ENV_MANAGER="TcX-TenantSPCustomRole-TenantEnvironmentManager"
echo "export TENANT_SP_CUSTOM_ROLE_TENANT_ENV_MANAGER='$TENANT_SP_CUSTOM_ROLE_TENANT_ENV_MANAGER'" >> ./0_cell_env_vars.sh
 
TENANT_SP_CUSTOM_ROLE_TENANT_ENV_MANAGER_GUID=$(az role definition list \
  --query "[?roleName=='$TENANT_SP_CUSTOM_ROLE_TENANT_ENV_MANAGER'].name" \
  -o tsv)
 
echo "export TENANT_SP_CUSTOM_ROLE_TENANT_ENV_MANAGER_GUID='$TENANT_SP_CUSTOM_ROLE_TENANT_ENV_MANAGER_GUID'" >> ./0_cell_env_vars.sh
```

###### 6. Backup updated scripts

Download the extended `0_cell_env_vars.sh` and `0_cloud_env_vars.sh` from your Cloud Shell for later use:
![Image](./image_89.png)  
