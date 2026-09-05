# Prerequisites for Manual externalized DB Backup and Restore

### 1. Login to the Windows VM
- Open the Azure Portal.
- Locate the resource group: `tcx-tenant-<tenant-id>-<env-type>-rg`.
- Find the Windows VM: `tcx-tenant-<tenant-id>-<env-id>-WindowsServer1-vm`.
- Click **Connect** > **Bastion**.
- Use the credentials:
    - **Username:** `tcx_user`
    - **Password:** Retrieve from Vault: `tcx/automation/servers/os_users/tcx_user_password`.
- Click **Connect** to access the VM.

### 2. Install SQL Server Management Studio (SSMS)
- Download SQL Server Management Studio (SSMS) from the official Microsoft website: [Download SSMS](https://go.microsoft.com/fwlink/?linkid=2257624&clcid=0x409).
- Once the download is complete, locate the installer file (e.g., `SSMS-Setup-ENU.exe`) in your downloads folder.
- Double-click the installer to launch the setup wizard.
- Follow these steps in the setup wizard:
    1. On the **Welcome** screen, click **Install**.
    2. Review and accept the license terms, then click **Next**.
    3. Choose the installation location or leave it as the default, then click **Install**.
   
   ![Image](./image393.png)

- Wait for the installation process to complete. This may take a few minutes.
- Once the installation is finished, click **Close** to exit the setup wizard.
- Verify the installation by launching SSMS from the Start Menu or by searching for "SQL Server Management Studio."

![Image](./image394.png)

- Confirm that SSMS opens successfully and is ready for use.

### 3. Login to SSMS
- Launch SSMS on the Windows VM.
- In the **Connect to Server** dialog:
    - **Server type:** Database Engine
    - **Server name:** `<SQLMI Server Name>` (e.g., `tcx-tenant-<tenant-id>-<env-id>-sqlmi.database.windows.net`).
    - **Authentication:** SQL Server Authentication.
    - **Login:** `<DB Username>` (e.g., `dbuser`).
    - **Password:** Retrieve from Vault: `tcx/teamcenter/rds/dbpassword`.
- Click **Connect**.

![Image](./image_391.png)

**Notes:**
- The `server name` is labeled as 'host' in the image below.
- The database `username` is the 'Managed Instance Admin'.
- Ensure correct server and credentials configuration.

![Image](./image_392.png)
