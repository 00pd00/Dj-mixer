# Deactivate Tenant in Teamcenter X Essentials

After completing the transition setup, you must deactivate the Teamcenter X Essentials tenant that was moved to Teamcenter X Standard/Advanced/Premium. Follow the steps below to safely deactivate and, if required, remove the tenant's data from the Essentials environment.

---

## Step 1: Deactivate the Tenant

1. Run the following command to deactivate the tenant in Teamcenter X Essentials:
    ```bash
    tcc exec 'mt_deactivate_tenant.sh <infodba password> <Tenant Name>'
    ```

---

## Step 2: Drop the Tenant (Optional)

- Before removing the tenant, review and confirm that all necessary business processes have been completed and that it is safe to delete the tenant's data.

2. Once ready, use the following command to drop (delete) the tenant:
    ```bash
    tcc exec 'mt_drop_tenant.sh <infodba password> <Tenant Name>'
    ```

---

These steps ensure the deactivated tenant and its data are handled safely and according to your organization’s transition policies.