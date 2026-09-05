##### Create Custom Roles

###### Management Group-Level Roles

These roles are created once per management group and shared across all subscriptions:

###### 1. Export Lock Management Role

Use the exact role name you found during validation:

```bash
# Use the exact name you copied from the check:
LOCK_MANAGEMENT_ROLE_NAME="<role name copied from 012_Check Management Group Roles>"
echo "export LOCK_MANAGEMENT_ROLE_NAME='$LOCK_MANAGEMENT_ROLE_NAME'" >> ./0_admin_env_vars.sh

LOCK_MANAGEMENT_ROLE_ID=$(az role definition list --query "[?roleName=='$LOCK_MANAGEMENT_ROLE_NAME'].id" -o tsv)
echo "export LOCK_MANAGEMENT_ROLE_ID='$LOCK_MANAGEMENT_ROLE_ID'" >> ./0_admin_env_vars.sh
```

###### Subscription-Level Roles

These roles must be created for each subscription individually:
###### 1. Custom Role for Admin Reader

1. Create the custom role combining Compute Gallery Image Reader, Storage Blob Data Reader built-in roles and minimal permissions required to send emails. 

    ```bash
    ROLE_SUFFIX="PROVIDE UNIQUE ROLE NAME SUFFIX"
    TENANT_SP_CUSTOM_ROLE_ADMIN_READER="TcX-TenantSPCustomRole-AdminReader-${ROLE_SUFFIX}"
    ./6_create_custom_role_tenant_sp_admin_reader.sh $AZURE_SUBSCRIPTION_ID $TENANT_SP_CUSTOM_ROLE_ADMIN_READER
    ```

2. Update the value of `TENANT_SP_CUSTOM_ROLE_ADMIN_READER_ID` on [0_cloud_env_vars.sh](../040_Setup%20Cell%20Subscription/020_Prepare%20the%20scripts%20to%20be%20executed/010_Variable%20Reference%20Guide/010_cloud_env_vars.sh.md) section for appropriate env.


###### 2. Custom Role for Admin Key Vault RBAC Reader

1. Create the custom role combining Key Vault Reader and RBAC permissions for admin Key Vault management.

    ```bash
    ROLE_SUFFIX="PROVIDE UNIQUE ROLE NAME SUFFIX"
    TENANT_SP_CUSTOM_ROLE_ADMIN_KEYVAULT_RBAC_READER="TcX-TenantSPCustomRole-AdminKeyVaultRBACReader-${ROLE_SUFFIX}"
    ./6_create_custom_role_tenant_sp_admin_keyvault_rbac_reader.sh $AZURE_SUBSCRIPTION_ID $TENANT_SP_CUSTOM_ROLE_ADMIN_KEYVAULT_RBAC_READER
    ```

2. Update the value of `TENANT_SP_CUSTOM_ROLE_ADMIN_KEYVAULT_RBAC_READER_ID` on [0_cloud_env_vars.sh](../040_Setup%20Cell%20Subscription/020_Prepare%20the%20scripts%20to%20be%20executed/010_Variable%20Reference%20Guide/010_cloud_env_vars.sh.md) section for appropriate env.
###### 4. Backup updated scripts

Download the extended `0_admin_env_vars.sh` from your Cloud Shell for later use:

![Image](./image_89.png)
