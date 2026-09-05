# Manual File Shares Restore

## Documentation Overview
This documentation provides a step-by-step guide for restoring an Azure File Share from a backup using the Azure Portal. It includes detailed instructions and placeholders for visual aids to assist users in the process.

### Steps to Restore a File Shares

1. **Access Azure Portal**
    - Login to Azure Portal using your SPLM credentials
    - Locate the resource group: `tcx-tenant-<tenant-id>-<env-type>-rg`.
    - Find the File Shares Storage Account: `tcxt<tenant-id><env-id>fsa<first-3-char-of-subscription-id>`.
    - Locate and select your storage account

        ![alt text](image442.png)
    - Navigate to "Data storage" section, choose **File Shares** and select any of the file share to initiate the restore

        ![alt text](image443.png)

2. **Initialize Restore**
    
    - Navigate to "Operations" section and select **Backup**

        ![alt text](image444.png)

    - Click **Restore Share** option

        ![alt text](image450.png)     

3. **Select Restore Point**

    - Choose the appropriate **restore point** from the list.
        
        ![alt text](image451.png)
        
    - For "restore destination" choose **Original location** and "In case of Conflicts" choose **Overwrite Existing**

        ![alt text](image452.png)
   
    - Click on **Restore** button

4. **Monitor Restore Job Progress**
    
    - The restore job will be triggered.
    - Track its progress by clicking **View Jobs**.

        ![alt text](image447.png)
      
        ![alt text](image453.png)

5. **Verify Restore Completion**
    
    - Once complete, the restore will be listed in the File Shares backup section

        ![alt text](image454.png)