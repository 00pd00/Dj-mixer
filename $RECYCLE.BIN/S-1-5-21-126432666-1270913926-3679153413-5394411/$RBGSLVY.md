**Tenant create fails with UserErrorOperationNotAllowedOnBackupInstanceInProtectionError**  

**Issue Description**:

Whenever Pipeline fails in tenant-create/tenant-destroy stage with error UserErrorOperationNotAllowedOnBackupInstanceInProtectionError as shown in the below screenshot, go to Azure portal check the backup instance of bootstrap resource group. 

![Image](./image_453.png) 

**Work Around:**  

1. Login to Azure portal.  

2. Scroll to your cell bootstrap resource group (rg) , the name of the bootstrap rg would be "tcx-bootstrap-\<admin-cell-id\>-rg" 

3. Under resources , search and click on the Backup vault 

![Image](./image_454.png) 

4. Navigate to Backup instances under the Manage dropdown of resource Backup vault. 

![Image](./image_455.png) 

5. Check if Protection status shows any error, 

If yes, then you need to check whether the vaulted backup containers list matches with your cell bootstrap storage account container.

    a. Click on the value of Vaulted backup containers as highlighted in the below snippet, it would shows the list of Vaulted backup container.

        ![Image](./image_456.png)

    b. Check whether your tenant storage account container exists or not by using Filter by name as search box

        ![Image](./image_457.png) 
    
    c. If your tenant container is not found in bootstrap storage account then you need to create it manually.

        i. Go to your cell bootstrap rg . The name of the bootstrap rg would be "tcx-bootstrap-\<admin-cell-id\>-rg" 
        
        ii. Click on the storage account resource . The name of storage account would be "tcxboot\<bootstrap_infix\>sa\<first_3_char_of_azure_subscription_id\>" 

        ![Image](./image_458.png)

        iii. Scroll to Containers and Click on Add container

        ![Image](./image_459.png) 

        iv. Enter your tenant storage container name in the following naming convention "\<tenant-id\>-storage-container" and click on Create

        ![Image](./image_460.png) 

    d. After the tenant container creation you need go back to backup instance and check the option of Fix protection error is visible in the top menu bar as highlighted in the below snippet, Click on it. 

![Image](./image_461.png)

6. Make sure the "Protection status" indicates "Protection configured" as highlighted in the below snippet.

![Image](./image_462.png) 

7. Finally , go to gitlab pipeline and re-run/retry the tenant create stage from gitlab.