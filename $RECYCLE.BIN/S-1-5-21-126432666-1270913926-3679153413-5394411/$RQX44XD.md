# Manual externalized DB restore

This document serves as a comprehensive, step-by-step guide for Siemens employees on how to restore a SQL Managed Instance (MI) database from a backup. It is designed to walk users through the entire process, from initial setup to final verification and configuration.

## Steps to Restore Database

> **Note**: The following steps should be repeated for all databases present in the SQL Managed Instance (SQLMI) to ensure a complete restore of the environment.

### 1. Login to Dispatcher Server
- Open **SQL Server Management Studio**.

![Image](./image395.png)

### 2. Locate the Database
- Locate the database you want to restore (e.g., `tcdb`).
- Right-click on the database.
- Navigate to **Tasks** → **Restore**.

![Image](./image410.png)

![Image](./image411.png)

![Image](./image412.png)

### 3. Azure Authentication

1. **Sign In**:
   - You will be redirected to a browser to sign in to Azure using your SPLM credentials.
   - Complete the sign-in process.

   ![Image](./image413.png)

   ![Image](./image414.png)

2. **Authentication Complete**:
   - Once authenticated, return to SQL Server Management Studio.

   ![Image](./image415.png)

### 4. Storage Account Selection

1. **Select Storage Account**:
   - A wizard will appear where you can select the storage account (e.g., `tcxt<tenant-id><env-id>rsa<first-3-char-of subscription-id>`).

   ![Image](./image416.png)

2. **Select Blob Container**:
   - Choose the appropriate Blob container (e.g., `tcx-tenant-<tenant-id>-<env-id>-sqlmi-backup-container`).

   ![Image](./image417.png)

3. **Create Credentials**:
   - Click **Create Credentials** and then **OK**.

### 5. Backup File Selection

1. **Change Backup File Tier**:
   - Before proceeding, change the backup file **tier** from `cold` to `hot`. For detailed steps, refer to [Changing Backup File Tier](../070_Automated%20Backup%20and%20Restore%20of%20TcX%20environment/070_3_SQLMI%20Adhoc%20Backup%20Steps.md#4-validate-the-backup-of-the-database-in-the-restore-storage-account-rsa)

   ![Image](./image418.png)

2. **Locate Backup File**:
   - Expand **Containers** and select the desired backup file.

   ![Image](./image419.png)

3. **Select Backup Device**:
   - Choose the backup device for the restore process.

   ![Image](./image420.png)

### 6. Database Configuration

1. **Rename the Database**:
   - Change the name of the restored database (e.g., `TCXDB_restored_v1`).
   - **Note**: This is crucial to avoid conflicts with existing database names.

   ![Image](./image421.png)

2. **Verify Restoration**:
   - Ensure the database is restored successfully.

   ![Image](./image422.png)

### 6. Database Renaming

1. **Rename Original Database**:
   - Rename the original database (e.g., `TCXDB`) to `TCXDB-original`.

2. **Rename Restored Database**:
   - Rename the restored database (e.g., `TCXDB_restored_v1`) to `TCXDB`.

### 7. Verification

1. **Azure Portal**:
   - Go to the Azure portal.
   - Locate the SQL MI instance (e.g., `tcx-tenant-<tenant-id>-<env-id>-sqlmi`).

2. **Check Databases**:
   - Verify the new database objects under the SQL MI instance.

   ![Image](./image423.png)

### 8. Configure Retention Policy

1. **Select Database**:
   - Select the restored database (e.g., `TCXDB`).

2. **Retention Policies**:
   - Go to **Retention Policies** and configure them to match the previous configuration.

![Image](./image424.png)

## Notes

- Ensure the backup file tier is set to `hot` before proceeding with the restore.
- Always verify the restored database and rename it appropriately to avoid conflicts.
- Retention policies should be configured to ensure compliance with organizational requirements.
