### Pre-Destroy Action for Azure Tenants

**Overview**

This document explains how to check for and remove Azure Backup Restore Points and Restore Point Collections (RPCs) that can block a tenant destroy operation.

**Prerequisites**

- You have Contributor access to the subscription/resource group in Azure Portal.


**Manual Azure Portal Steps**

1.  **Log in to the Azure Portal**
2.  **Activate PIM roles**
    - Activate the necessary PIM elevation so you have the required permissions to remove backup resources.
3.  **Locate the Backup resource group and backup artifacts**
    - After PIM activation, locate backup resources :
      - **Backup resource group:** usually `AzureBackupRG_<region>_1`. ![Image](./image_373.png)
4.  **Open the Restore Point Collection (RPC)**
    - Click the RPC resource entry for the tenant.
    - Open the "Restore points" blade to list contained restore points.
    - ![Image](./image_374.png)
5.  **Delete Restore Points**
    - Select all restore points and delete them. This must be done before deleting the RPC itself.
    - Confirm deletion and wait for operations to complete.
    - ![Image](./image_375.png)
6.  **Delete the Restore Point Collection**
    - After restore points are removed, return to the RPC overview and delete the collection.
    - ![Image](./image_376.png)
7.  **Repeat for additional Restore Point Collections**
    - If the resource group contains more than one Restore Point Collection for the tenant, repeat steps 4–6 for each collection: delete all restore points inside the collection, then delete the collection itself.
8.  **Re-trigger the Destroy Pipeline**
    - Once manual deletions are done, run the destroy pipeline for the tenant and verify it completes successfully.
    - ![Image](./image_377.png)
    - ![Image](./image_378.png)
