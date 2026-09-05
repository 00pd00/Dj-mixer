## Unable to delete Restore Point Collection with failed provisioned state

### Error Example

RPC shows a failed state in the Azure portal:

![Image](./image_553.png)



When trying to delete the RPC manually **the following error occurs**:  

**Provisioned State Error:**

![Image](./image_554.png)

![Image](./image_555.png)

**Workaround:**

#### Step 1: Revoke Access for Disk Restore Points

**Pre-requisites:**

1. **Login to Azure Portal and Activate Role:**
   - Navigate to the [Azure Portal](https://portal.azure.com)
   - Activate the required contributor role using Privileged Identity Management (PIM) if necessary
   - Ensure you have appropriate permissions to manage Restore Point Collections

2. **[Install Azure CLI](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest)**

3. **Login to Azure CLI and Get Access Token:**
   ```bash
   tenantId="<Azure_AD_Tenant_ID>"
   az login --tenant ${tenantId}
   ```
   Complete on screen login instruction. 


   ```bash
   subscriptionId="<Subscription_ID>"
   az account set --subscription ${subscriptionId}
   az account get-access-token --resource https://management.azure.com
   ```
   - Copy the `accessToken` value from the output
   - Set it as the `token` variable for the curl commands below

**Note:** The following curl commands require Azure authentication (Bearer token) to execute successfully.

**Command Template:**
```bash
token="<Access_token>"
subscriptionId="<Subscription_ID>"
resourceGroupName="<Resource_Group_Name>"
restorePointCollectionName="<Restore_Point_Collection_Name>"
vmRestorePointName="<VM_Restore_Point_Name>"
diskRestorePointName="<Disk_Restore_Point_Name>"
curl -X POST -H "Content-Length: 0" -H "Authorization: Bearer ${token}" https://management.azure.com/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.Compute/restorePointCollections/${restorePointCollectionName}/restorePoints/${vmRestorePointName}/diskRestorePoints/${diskRestorePointName}/endGetAccess?api-version=2025-01-02
```

**Example for OS Disk:**
```bash
curl -X POST -H "Content-Length: 0" -H "Authorization: Bearer ${token}" https://management.azure.com/subscriptions/f8138736-0d05-474f-951e-2f3b180c7d50/resourceGroups/AzureBackupRG_germanywestcentral_1/providers/Microsoft.Compute/restorePointCollections/AzureBackup_tcx-tenant-td1a7418-prd-CorpServer-vm_7522207648058777007/restorePoints/AzureBackup_20251202_120415/diskRestorePoints/tcx-tenant-td1a7418-prd-CorpServer-osdisk_bc058311-bc6c-4e82-9bc9-9f0cb10ad4da/endGetAccess?api-version=2025-01-02
```

**Example for Data Disk:**
```bash
curl -X POST -H "Content-Length: 0" -H "Authorization: Bearer ${token}" https://management.azure.com/subscriptions/f8138736-0d05-474f-951e-2f3b180c7d50/resourceGroups/AzureBackupRG_germanywestcentral_1/providers/Microsoft.Compute/restorePointCollections/AzureBackup_tcx-tenant-td1a7418-prd-CorpServer-vm_7522207648058777007/restorePoints/AzureBackup_20251202_120415/diskRestorePoints/tcx-tenant-td1a7418-prd-CorpServer-disk_bc7cc59f-5677-4dd3-a3e6-9f2a84e17bc3/endGetAccess?api-version=2025-01-02
```

**Important:** Revoke access for all disks (OS and data disks) that were attached to the VM by executing the command for each disk. Monitor the Azure Activity Log to ensure the operation status shows `Succeeded` before proceeding to the next step.

#### Step 2: Delete the Restore Point Collection

After successfully revoking access for all disks, delete the restore point collection:

**Command:**
```bash
token="<Access_token>"
subscriptionId="<Subscription_ID>"
resourceGroupName="<Resource_Group_Name>"
restorePointCollectionName="<Restore_Point_Collection_Name>"
curl -X DELETE  -H "Authorization: Bearer ${token}" https://management.azure.com/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.Compute/restorePointCollections/${restorePointCollectionName}?api-version=2025-04-01
```

**Example:**
```bash
curl -X DELETE -H "Authorization: Bearer ${token}" https://management.azure.com/subscriptions/f8138736-0d05-474f-951e-2f3b180c7d50/resourceGroups/AzureBackupRG_germanywestcentral_1/providers/Microsoft.Compute/restorePointCollections/AzureBackup_tcx-tenant-td1a7418-prd-CorpServer-vm_7522207648058777007?api-version=2025-04-01
```

#### Step 3: Retrigger Destroy Pipeline

Once the Restore Point Collection is successfully deleted, re-trigger the destroy pipeline.

### How to Find Resource Information

If you need to identify the resource IDs for your specific case:

1. Extract the information from the error message:
   - **Subscription ID**: Found in the resource path
   - **Backup Resource Group**: Usually follows the pattern `AzureBackupRG_<region>_<zone>`
   - **Restore Point Collection Name**: Found in the error message
   - **Restore Point Name**: Found in the error message
   - **Disk Restore Point Name**: Found in the error message

2. Navigate to the Azure Portal:
   - Go to **Resource Groups**
   - Find the backup resource group (e.g., `AzureBackupRG_germanywestcentral_1`)
   - Locate the Restore Point Collection resource
  - Open the Restore Point Collection and go to the **Restore Points** section
  - Select each Restore Point to find the associated Disk Restore Points

![Image](./image_558.png)

   - Click on `virtual machine metadata` under settings.
   - Look for all `diskRestorePoint` and scroll right to find names of Disk Restore Point

![Image](./image_559.png)

![Image](./image_560.png)

### Reference Documentation

- [Microsoft Docs: Disk Restore Point - Revoke Access](https://learn.microsoft.com/en-us/rest/api/compute/disk-restore-point/revoke-access?view=rest-compute-2025-04-01&tabs=HTTP)
- [Microsoft Docs: Restore Point Collections - Delete](https://learn.microsoft.com/en-us/rest/api/compute/restore-point-collections/delete?view=rest-compute-2025-04-01&tabs=HTTP)
