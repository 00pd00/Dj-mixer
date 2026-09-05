# Schema Migration

### Note: This step is required when migrating from a previous release to 2606 or higher release. From 2606, there are changes in the underlying VectorDB index schema. This step is necessary to migrate data already embedded in previous releases (which will be old schema) to the new schema

## Prerequisites:
* Teamcenter upgrade via DC is complete
* The tenant was earlier using Teamcenter AI services ( TC AI Chat)


## Migration steps

### 1. Install Dispatcher Client on DC Windows Machine

1. **Login** to the tenant’s Windows Dispatcher machine.

    - For TcX Azure env, go to Azure Portal > `Virtual Machines` service

        VM name is in format `tcx-tenant-<CustomerID>-<Environment>-WindowsServer1-vm`

        search with customer ID to get VMs specific to tenant. for e.g 'ai27'

        ![Dispatcher Windows Machine](../050_Tenant%20Post-Deployment%20Steps/image_125.png)

    - For TcX AWS env, go to AWS portal > `EC2 Instance`

        EC2 Machine name is in format `Siemens-<CustomerID>-<Environment>-WindowsServer1`

        ![Dispatcher Windows Machine](../050_Tenant%20Post-Deployment%20Steps/image_126.png)


2. **Navigate** to: D:\deploy_script\deploy_`<Customer_ID>-<Environment>`.dis-service.dev.tcxservices.com
    ![Deploy Dispatcher](../050_Tenant%20Post-Deployment%20Steps/image_112.png)

3. **Run** the deployment script:

    ```deploy.bat -dcusername=dcadmin -dcpassword=XXXXXXXXXXXX -softwareLocation=D:\Kits```

    ![Deploy Dispatcher](../050_Tenant%20Post-Deployment%20Steps/image_113.png)

    dc password is the password for the dcadmin user. you will find it at path "tcx/teamcenter/common/dc_server" in the tenant's namespace in HC Vault.

    ![Deploy Dispatcher](../050_Tenant%20Post-Deployment%20Steps/image_114.png)

> 📌 Make sure the username and password are correct.

Once the Dispatcher Client is successfully installed, proceed with the migration. 

### 2. Stop the sync indexer 
Stop sync pod as per instructions in section [Shutdown and restart workloads](https://ctcx.code.siemens.io/cookbook/docs/2506/Documentation/Operations/Day%20N%20Operations/Shutdown%20and%20restart%20workloads) with the workload as "Teamcenter FTS indexer". 

### 3. Start data migration
start the data migration by running the following indexing utilities using the tcc command as per instructions in section [Executing Teamcenter ITK Utilities in a containerized environment](https://ctcx.code.siemens.io/cookbook/docs/2506/Documentation/Operations/Day%20N%20Operations/Executing%20Teamcenter%20ITK%20Utilities#executing-teamcenter-itk-utilities-in-a-containerized-environment):

```bash
tcc exec '$TC_ROOT/TcFTSIndexer/bin/runTcFTSIndexer.sh -task=objdata:update_embeddings'
```

This flow will migrate data from old index to new index in VectorDB. 

*Note: This flow is a long running flow. The time taken to complete this flow will depend on the number of number of objects embedded previously (in past release) and the type of deployment (Azure, AWS or self-managed). The flow exection can take upto 5-6 hours migrating large data.*


### 4. Check if migration is complete

At the end of the previous command, the logs will show the number of entries present before migration and entries present after migration. If they both are equal, then the migration is complete. If there is mismatch, run previous step (Step 3) again.

### 5. Restart the sync indexer pod
 Restart sync as per instructions in section [Shutdown and restart workloads](https://ctcx.code.siemens.io/cookbook/docs/2506/Documentation/Operations/Day%20N%20Operations/Shutdown%20and%20restart%20workloads) with the workload as "Teamcenter FTS indexer". 

