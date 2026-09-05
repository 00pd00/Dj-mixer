### Single-Tenant Backup and Restore

#### Prerequisites

- **Access to Amazon RDS Console**  
    A CApS admin will need access to the customer’s corresponding database instance through Amazon RDS.

- **Access to AWS EC2**  
    Backup and restore commands will be executed through the corresponding environment’s EC2 Instance.

- **Database Snapshot**  
    A [database snapshot](https://aws.amazon.com/blogs/database/amazon-rds-snapshot-restore-and-recovery-demystified/) (manual or automated) must be taken of the entire database on which the customer’s tenant is hosted. This snapshot represents the point in time at which the target tenant’s data will be restored back to.  
    Existing snapshots of a DB instance are located at **AWS > Amazon RDS > Snapshots**.  
    Additional information for creating and managing Amazon RDS snapshots can be found [here](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_WorkingWithAutomatedBackups.html) or by navigating to **AWS > Documentation > Amazon RDS > User Guide > Backing up and Restoring a DB Instance**.

- **Access to Vault**  
    XCR Vault access is required to obtain the `Remote-pwd` value utilized by the multi-tenant management scripts.

#### Restoring a Database from a Database Snapshot

1. Navigate to **AWS > Amazon RDS > Snapshots** and select the snapshot that will be used for restoration.
2. In the top right corner, select the **Actions** panel and click the **Restore snapshot** button.
3. Update the following fields in the Restore snapshot form:
     - **DB instance identifier**: Use a name that follows the same naming schema as the main database, including an identifier indicating it is for backup and restore.
     - **Instance configuration**: Use the same configuration as the main database.
     - **Existing VPC Security Groups**: Select the existing "Database Server Security Group" corresponding to the environment.  
         ![Image](../image_412.png)
4. Click the **Restore DB Cluster** button to begin the restoration process.  
     Additional information for restoring a DB snapshot is available [here](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_RestoreFromSnapshot.html).

> **Note**: Do not perform any subsequent steps until the restored database (backup database) has been successfully created and is running.

#### Configure Outbound and Inbound Rules

> **Prerequisite**: If you are upgrading a Teamcenter X Essentials environment, remove any custom inbound/outbound rules introduced by a single-tenant backup and restore procedure.

1. Identify the CIDR block assigned to the main database:
     - Navigate to **RDS > Main Database Cluster > Writer Instance > Connectivity & Security > VPC**.  
         ![Image](../image_413.png)
     - Copy both IPv4 CIDR Ranges from the "IPV4 CIDR" column.  
         ![Image](../image_414.png)

2. Add **Inbound Rules** for PostgreSQL:
     - Navigate to **RDS > Main Database Cluster > Writer Instance > Connectivity & Security > VPC Security Groups**.
     - Select the **DatabaseServer-SecurityGroup**.
     - Click **Edit Inbound Rules** and add the following:
         - **Type**: PostgreSQL (port 5432)
         - **Source**: Custom (enter each CIDR range)
         - (Optional) Add a description for each rule.  
             ![Image](../image_415.png)

3. Add **Outbound Rules** for PostgreSQL:
     - In the same security group, click **Outbound Rules** and then **Edit Outbound Rules**.
     - Add the following:
         - **Type**: PostgreSQL
         - **Destination**: Custom (enter each CIDR range)
         - (Optional) Add a description for each rule.  
             ![Image](../image_416.png)

#### Establish a Connection With the Backup Database

1. Obtain the following argument values:
     - **Remote-db-name**: Found at **RDS > Backup Database Writer Instance > Configuration > DB name**.  
         ![Image](../image_417.png)
     - **Remote-IP**: Ping the endpoint value found at **RDS > Backup Database Writer Instance > Connectivity & Security > Endpoint** to obtain the IP address.  
         ![Image](../image_418.png)
     - **Remote-usr**: The master username of the database (typically `dbuser`), found at **RDS > Backup Database Regional Cluster > Configuration > Master Username**.
     - **Remote-pwd**: Found in the environment's Vault at **tcx/teamcenter/rds** under `dbpassword`.

2. In the environment's EC2, navigate to the `admin_work` folder by setting the appropriate context:
     ```bash
     . tcc set_context <namespace> prd
     ```

3. Execute the following command to establish a connection with the backup DB:
     ```bash
     tcc exec 'multi_tenant_mgr -restore_connect -u=infodba -pf=$TC_SECURITY_DIR/default_infodba.pwf -g=dba <remote-db-name> <remote-IP> <remote-usr> <remote-pwd>'
     ```

4. Test the connection:
     ```bash
     tcc exec 'multi_tenant_mgr -restore_connect -u=infodba -pf=$TC_SECURITY_DIR/default_infodba.pwf -g=dba'
     ```
     Ensure the correct `remote-ip` is listed in the output.  
     ![Image](../image_419.png)

#### Perform Single-Tenant Data Restoration

1. Navigate to the `admin_work` folder in EC2:
     ```bash
     . tcc set_context <namespace> prd
     ```

2. Execute the following commands in order:
     - Deactivate the tenant:
         ```bash
         tcc exec 'mt_deactivate_tenant.sh <infodba password> <tenant name>'
         ```
     - Perform a restore dry run:
         ```bash
         tcc exec 'mt_restore_dry_run.sh <infodba password> <tenant name> <remote-db-name>'
         ```
     - Restore tenant-specific data:
         ```bash
         tcc exec 'mt_restore_tenant.sh <infodba password> <tenant name> <remote-db-name>'
         ```
     - Reactivate the tenant:
         ```bash
         tcc exec 'mt_activate_tenant.sh <infodba password> <tenant name>'
         ```

> **Note**: Upon reactivating the tenant, the target tenant’s data will be restored to the point captured in the snapshot.

#### Terminate Connection with the Backup Database

1. Disconnect from the backup database:
     ```bash
     tcc exec 'multi_tenant_mgr -restore_disconnect -u=infodba -pf=$TC_SECURITY_DIR/default_infodba.pwf -g=dba <remote-db-name>'
     ```

#### Delete Backup Database from RDS

1. After completing and validating the Single-Tenant Backup & Restore process, delete the backup database to avoid incurring AWS costs.  
     ![Image](../image_420.png)

     Refer to the [AWS Documentation](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_DeleteInstance.html) for instructions on deleting a DB instance.

