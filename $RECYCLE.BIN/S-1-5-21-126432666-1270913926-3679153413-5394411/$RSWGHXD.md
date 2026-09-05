# Validate Azure Backups

## Log in to Azure Portal and Navigate to Tenant Resource Group
1. Log in to the [Azure Portal](https://portal.azure.com).
2. Navigate to the appropriate **Resource Group**: `tcx-tenant-<tenantid>-<env>-rg`.

## 1. Validate Blob storage backup in Backup Vault
1. Go to **Backup Vault**: `tcx-tenant-<tenantid>-<env>-bvault`.
2. Navigate to the **Backup jobs** under the **Monitoring + reporting** section and filter by **Datasource type == Azure Blobs (Azure Storage)**.
3. Verify the **Last Backup Status** and ensure the backup is recent and successful.
![Image](./image_386.png)

## 2. Validate File Share backup in Recovery Services Vault (RSVault)
1. Go to **Recovery Services Vault** (`tcx-tenant-<tenantid>-<env>-rsvault`) where the file share backup is configured.
2. Navigate to **Backup jobs** under the **Monitoring** section and filter by **Item type = Azure Storage**.
3. Check the **Last Backup Status** and ensure the file share backup is successful.
![Image](./image_387.png)

## 3. Validate Virtual Machine (VM) backup in Recovery Services Vault
1. Go to **Recovery Services Vault** (`tcx-tenant-<tenantid>-<env>-rsvault`) where the VM backup is configured.
2. Navigate to **Backup jobs** under the **Monitoring** section and filter by **Item type = Azure Virtual Machine**.
3. Verify the **Last Backup Status** and ensure the VM backup is successful.
![Image](./image_388.png)

## 4. Check SQL Managed Instance (SQLMI) Backups
1. Open the **SQL Managed Instance** (`tcx-tenant-<tenantid>-<env>-sqlmi`) where the database backups are set up.
2. Go to the **Backups** section under **Data management** in the menu.
3. Look through the list of databases and confirm that all the expected databases are listed.
![Image](./image_389.png)
