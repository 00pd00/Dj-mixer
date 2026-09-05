## Destroy failing due to DES issue 

**Issue:** 

The destroy pipeline may fail if Azure Restore Points (RPs) or Restore Point Collections (RPCs) have a dependency lock on the DES (Disk Encryption Set) resource, preventing its deletion. Terraform fails to delete the Disk Encryption Set because VM restore points and their collections still reference the DES.

**Error Message:**

- Error: deleting Disk Encryption Set: DES deletion failed because restore points are still referencing this resource

![error](./../../image_500.png)

### Root Cause

- VM restore points and restore point collections maintain references to the Disk Encryption Set
- The destroy pipeline handles cleanup of restore points automatically
- However, intermittently restore points may be in a **failed state**, which can cause issues during the deletion process
- Terraform cannot proceed with DES deletion while these references exist

![Failed Restore Points](./../../image_502.png)

### Resolution

 **Retry the destroy pipeline**. The destroy stage will attempt to clean up the restore points again, and on subsequent runs, the failed restore points are typically resolved by Azure's backend processes.
