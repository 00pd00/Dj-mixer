## How to Recover from tc-ldap pod crash in running environment

This is the scenario when the `tc-ldap` pod crashes or degrades in the running environment and is unable to start the service.

### Pre-condition:
1. The running environment is accessible, and users can log in or generate users in the environment.
2. The environment has a backup policy in place to take regular backups of the EFS volume for the tenant.
3. Backups can be extracted to recover individual files.

In case of user-data or index-data corruption in this running environment, check the logs to confirm the issue. Once confirmed, follow the instructions below to recover the data.

---

### To extract a single file from an Amazon EFS backup using AWS Backup

1. Log in to AWS.
2. Go to the AWS Backup service.
3. Select **Vaults** under **My account** on the AWS Backup panel.
4. Search for and open `<env_type>-<tenant_id>-BackupVault`.
    ![Image](./image_394.png)

5. Identify the `IP_DATA` snapshot (Resource Name – `Siemens-<customer_id>-<env>-efs1`) from the list and click on it.
    ![Image](./image_395.png)

6. On the top-right corner, click on the **Actions** dropdown and select the **Restore** option.
    ![Image](./image_396.png)

7. Choose the following restore options:
    - **Restore Type**: Item-level restore

         *Item path* is `/<tenant-id>-<envtype>-ipdata/<tenant-id>-<envtype>-ipdata/ipdata/ldap/<ldapversiondir>/openldap/data`
    - **Restore Location**: Restore to directory in source file system
    - **Restore Role**: Default
    - **Protected Resource Tags**: Unselect
8. Click the **Restore backup** button.

---

### Restore the `openldap/data` directory

1. Connect to the License/DC Server:
    ```bash
    sudo su -
    ```

2. Navigate to the directory:
    ```
    /<tenant-id>-<envtype>-ipdata/<tenant-id>-<envtype>-ipdata/ipdata/ldap/<versionnodirectory>/openldap/
    ```

3. Rename the original `openldap/data` directory:
    ```bash
    sudo mv data data.bkp.{timestamp}
    ```

4. Restore the extracted `openldap\data` directory:
    ```bash
    cp -r /<tenant-id>-<envtype>-ipdata/aws-backup-restore_{Timestamp}/<tenant-id>-<envtype>-ipdata/ipdata/ldap/<versionnodirectory>/openldap/data /<tenant-id>-<envtype>-ipdata/<tenant-id>-<envtype>-ipdata/ipdata/ldap/<versionnodirectory>/openldap/data
    ```

5. Shutdown/Restart the complete environment using the Ansible workflow and check the `tc-ldap` pod logs.

**Note**: Backup will only restore data up to the last backup point. Data created between the backup time and crash time must be recreated manually.

---

### Restore IP DATA EFS

1. Get the `IP_DATA` snapshot ID from the backup set.
2. Go to the AWS Backup Vault on the AWS Console.
3. Navigate to the tenant-specific backup vault.
4. Identify the `IP_DATA` snapshot (Resource Name – `Siemens-<customer_id>-<env>-efs1`) from the list and click on it.
5. On the top-right corner, click the **Restore** button.
6. Choose the following restore options:
    - **Restore Type**: Full restore
    - **Restore Location**: Restore to directory in source file system
    - **Restore Role**: Default
    - **Protected Resource Tags**: Unselect
    ![Image](./image_400.png)
    ![Image](./image_401.png)

7. Click the **Restore backup** button.

---

### Restore the EFS Data

1. Connect to the License/DC Server:
    ```bash
    sudo su -
    ```

2. Navigate to:
    ```
    /<customer_id>-<env_type>-ipdata
    ```

3. Take a backup of the folder by renaming it:
    ```bash
    mv p2506274-prd-ipdata p2506274-prd-ipdata-org-bkp
    ```

4. Restore the `p2506274-prd-ipdata` folder from the backup:
    ```bash
    cp -r /p2506274-prd-ipdata/aws-backup-restore_2025-03-28T14-13-02-250589632Z/p2506274-prd-ipdata /p2506274-prd-ipdata/
    ```

5. After the backup, delete the `aws-backup-restore_*` folder.

**Note**: EFS restore requires the EC2 instance to be restarted. Restart the EC2 instance at this point.
