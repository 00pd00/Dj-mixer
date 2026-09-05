# Manual externalized DB backup steps

### 1. Steps to Create Ad-Hoc Backup

> **Note**: The following steps should be repeated for all databases present in the SQL Managed Instance (SQLMI) to ensure a complete backup of the environment.

1. **Login to Dispatcher Server**:
   - Open **SQL Server Management Studio**.

![Image](./image395.png)

2. **Locate the Database**:
   - Locate `tcxdb` (or the database you want to back up).
   - Right-click on the database.
   - Select **Tasks** → **Backup**.

![Image](./image396.png)

![Image](./image397.png)

### 2. Container Setup

> **Note**: The following steps for adding the container should only be done the first time a backup is taken for the database.

1. **Add a New Container**:
   - Click **Add**.
   - For the first-time backup, click **New Container**.

![Image](./image398.png)

2. **Authentication Steps**:
   - Click **Sign In**.
   - Complete the sign-in process.

![Image](./image399.png)

![Image](./image400.png)

![Image](./image409.png)

### 3. Storage Configuration

1. **Select Backup Storage**:
   - Return to SQL Server Management Studio.
   - Select the **Storage Account** (e.g., `tcxt<tenant-id><env-id>rsa<first-3-char-of subscription-id>`) for backup storage.

![Image](./image401.png)

2. **Select Storage Container**:
   - Choose the appropriate **Storage Container** (e.g., `tcx-tenant-<tenant-id>-<env-id>-sqlmi-backup-container`).

![Image](./image402.png)

3. **Create Credential**:
   - Click **Create Credential** and then **OK**.

![Image](./image403.png)

4. **Confirm Settings**:
   - Verify the settings and proceed.

![Image](./image404.png)

![Image](./image405.png)

![Image](./image406.png)

### 4. Validate the backup of the database in the Restore Storage Account (RSA)

#### Important Note:
After validating the backup, it is highly recommended to **disable public access** to the storage account to enhance security. This ensures that the storage account is only accessible through private endpoints or specific network rules.

#### 1. Steps to Enable Public Access (IP) for Storage Account:
1. Navigate to the Azure Portal and locate the **Storage Account** (e.g., `tcxt<tenant-id><env-id>rsa<first-3-char-of subscription-id>`) associated with the backup.
2. Go to the **Networking** section under **Security + networking** section of the storage account.
3. Click on **Manage** under Public network access.

![Image](./image455.png)

4. Click on 
  - Public network access = **Enable** 
  - Public network access scope = **Enabled from selected network**
  - IPv4 Addresses = **+ Add your client IPv4 address** to add your public IP
5. Save the changes to clicking on **Save**

![Image](./image456.png)

#### 2. Steps to Validate Backup from Restore Container:
1. Go to the **Containers** section under **Data storage** section of the storage account.
2. Navigate to the `tcx-tenant-<tenant-id>-<env-id>-sqlmi-backup-container` container.

![Image](./image457.png)

3. Locate the backup file(s) within the container.

![Image](./image458.png)

4. **Change Access Tier**:
- Change the **Access Tier** to `cold`.

![Image](./image408.png)

#### 3. Steps to Disable Public Access (IP) for Storage Account:
1. Go to the **Networking** section under **Security + networking** section of the storage account.
2. Click on **Manage** under Public network access.

![Image](./image459.png)

3. Click on Public network access = **Disable** 
4. Save the changes to disable public access.

![Image](./image460.png)

5. Confirm that the storage account is now restricted to its original access configuration.
