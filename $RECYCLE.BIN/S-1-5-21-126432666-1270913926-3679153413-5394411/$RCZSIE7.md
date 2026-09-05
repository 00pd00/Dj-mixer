# Manual VM Backups

## Documentation Overview
This documentation is intended to provide a clear, step-by-step process for manually backing up Azure Virtual Machines. It ensures that critical Teamcenter environments can be safely backed up ad-hoc, especially for milestone events or before significant changes.

### 1. Access the Azure Portal
- Log in to the Azure Portal using your SPLM credentials.
- Locate the resource group: `tcx-tenant-<tenant-id>-<env-type>-rg`.
- Go to the **Virtual Machines** section within the resource group.
    - Example of a Corporate Server name: `tcx-tenant-<tenant-id>-<env-type>-CorpServer-vm`.
    - Example of a Dispatcher Server name: `tcx-tenant-<tenant-id>-<env-type>-WindowsServer1-vm`.
- Select the specific Virtual Machine (VM) you want to back up.

![Image](./image425.png)

### 2. Initialize Backup
- Navigate to the **Backup** under **Backups + disaster recovery** section.
- Click **Backup now**.

![Image](./image426.png)

![Image](./image427.png)

### 3. Configure Backup Settings
- Set the retention period according to your needs.

![Image](./image428.png)

### 4. Monitor Backup Progress
- Track the backup progress by clicking **View jobs**.

![Image](./image429.png)

![Image](./image430.png)

![Image](./image434.png)

### 5. Verify Backup Completion
- Once complete, the backup will be listed in the VM's backup section.

![Image](./image431.png)

## Important Notes
- Repeat this process for every VM in your resource group.
- Document the date and time of each manual backup to ensure accurate tracking of backup history, facilitate troubleshooting, and provide a clear recovery point in case of data loss or system failure.