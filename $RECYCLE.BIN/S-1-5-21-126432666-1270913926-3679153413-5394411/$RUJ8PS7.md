# Post Deployment Steps for Teamcenter AI Chat

## Preferences Configuration
---
### 1. Update TC_Microservices_Base_URL Preference

Update the preference `TC_Microservices_Base_URL` with the following value: 
```json
http://service-dispatcher:9090
```


> 💡 This ensures TC Server and indexer will be able to communicate with AI microservices via service dispatcher URL.

![TC_Microservices_Base_URL update](../image_103.png)

---

### 2. Enable File Content Indexing

To enable indexing of file content for Full Text Search, update the preference:



> ✅ This is necessary to get file content while embedding documents.

![file content indexing preference update](../image_104.png)

---

### 3. Verify TC_AI_tenant_id Preference

Ensure the `TC_AI_tenant_id` preference is correctly set in the format:
`<CustomerID>_<Environment>`

> Example: `azskai27_dev`

This value helps identify the specific tenant and environment for TC AI capabilities.

![Screenshot showing TC_AI_tenant_id preference value](../image_105.png)

---

> ℹ️ If any preference is missing or incorrectly set, update them from Active Workspace Client.


## Create Knowledge Base

This section describes the steps to configure a knowledge base(KB) using Saved Search and deploy the Dispatcher Client on a DC machine.

---

### 1. Create Saved Search in Active Workspace (AW)

- Create a saved search in Active Workspace.  
  **Example**: `Standards_Reg`

    ![Saved Search Creation](../image_106.png)

- Add necessary filters to narrow down the results.  
  **Example Filter**: `Name starts with Standards_*`

    ![Saved Search Filter](../image_107.png)

- Save the search using the desired name.  
  **Saved Search Name**: `Standards_Reg`

   ![Saved Search Creation](../image_108.png)

---

### 2. Add Saved Search Name to `TC_AI_knowledge_bases` Preference

Format to use in preference:

`<knowledge base name>:<Saved Search name>;<username>`

- **Knowledge Base Name**: A logical name justifying the kind of documents included.
- **Saved Search Name**: The name of the saved search created in step 1.
- **Username**: The Teamcenter user who created the saved search.

    ![Saved Search Creation](../image_109.png)

> Example:  
> `Standards_Reg:Standards_Reg;infodba`

 Update the `TC_AI_knowledge_bases` preference with this entry.

---

### 3. Add Datasets Matching Saved Search Criteria

- Add datasets that match the saved search criteria you defined earlier (`Standards_Reg`).

    ![Add Datasets Screenshot](../image_110.png)

- You can continue adding more datasets that satisfy the same saved search criteria.

    ![Additional Datasets Screenshot](../image_111.png)

---


<br></br>
***** **Note:** If the dispatcher was installed through automation, [below](https://code.siemens.com/ctcx/cookbook/-/blob/CBUPDATE/versioned_docs/version-2512/Product%20Integration%20Documentation/Teamcenter%20AI%20Chat/040_Tenant%20Post-Deployment%20Steps/020_TC%20AI%20Chat/010_TC%20AI%20Chat.md?ref_type=heads#4-install-dispatcher-client-on-dc-windows-machine) step can be skipped.*****

### 4. Install Dispatcher Client on DC Windows Machine

1. **Login** to the tenant’s Windows Dispatcher machine.

    - For TcX Azure env, go to Azure Portal > `Virtual Machines` service

        VM name is in format `tcx-tenant-<CustomerID>-<Environment>-WindowsServer1-vm`

        search with customer ID to get VMs specific to tenant. for e.g 'ai27'

        ![Dispatcher Windows Machine](../image_125.png)

    - For TcX AWS env, go to AWS portal > `EC2 Instance`

        EC2 Machine name is in format `Siemens-<CustomerID>-<Environment>-WindowsServer1`

        ![Dispatcher Windows Machine](../image_126.png)


2. **Navigate** to: D:\deploy_script\deploy_`<Customer_ID>-<Environment>`.dis-service.dev.tcxservices.com
    ![Deploy Dispatcher](../image_112.png)

3. **Run** the deployment script:

    ```deploy.bat -dcusername=dcadmin -dcpassword=XXXXXXXXXXXX -softwareLocation=D:\Kits```

    ![Deploy Dispatcher](../image_113.png)

    dc password is the password for the dcadmin user. you will find it at path "tcx/teamcenter/common/dc_server" in the tenant's namespace in HC Vault.

    ![Deploy Dispatcher](../image_114.png)

> 📌 Make sure the username and password are correct.

Once the Dispatcher Client is successfully installed, proceed with embedding the knowledge bases into the vector DB.

---

## Embed datasets

### 1. Stop the sync indexer 
Stop sync pod as per instructions in section [Shutdown and restart workloads](https://ctcx.code.siemens.io/cookbook/docs/2506/Documentation/Operations/Day%20N%20Operations/Shutdown%20and%20restart%20workloads) with the workload as "Teamcenter FTS indexer". 

### 2. Embed dataset 
embed dataset file content by running the following indexing utilities using the tcc command as per instructions in section [Executing Teamcenter ITK Utilities in a containerized environment](https://ctcx.code.siemens.io/cookbook/docs/2506/Documentation/Operations/Day%20N%20Operations/Executing%20Teamcenter%20ITK%20Utilities#executing-teamcenter-itk-utilities-in-a-containerized-environment):

To embed the datasets in all available/created KBs, run the following command:

```bash
tcc exec '$TC_ROOT/TcFTSIndexer/bin/runTcFTSIndexer.sh -task=objdata:embed'
```

To embed the datasets that belong to a specific KB, run the following command:

```bash
tcc exec '$TC_ROOT/TcFTSIndexer/bin/runTcFTSIndexer.sh -task=objdata:embed -kbs=\"<enter KB name>\"'
```

To embed the datasets that belong to a specific set of KBs, run the following command:

```bash
tcc exec '$TC_ROOT/TcFTSIndexer/bin/runTcFTSIndexer.sh -task=objdata:embed -kbs=\"<enter KB 1 name>\",\"<enter KB 2 name>\",\"<enter KB 3 name>\"'
```

### 3. Restart the sync indexer pod
 restart sync as per instructions in section [Shutdown and restart workloads](https://ctcx.code.siemens.io/cookbook/docs/2506/Documentation/Operations/Day%20N%20Operations/Shutdown%20and%20restart%20workloads) with the workload as "Teamcenter FTS indexer". 

### 4. Check embedding status of Documents on `Indexer And Search Administration Dashboard` in Active Workspace

- Login to AW client, change workspace to `Active Admin`
- Click on `Indexer And Search Administration Dashboard` Tile

![Tile](../image_147.png)

- In `Teamcenter AI Services` item, you can see embedding status for documents you added in Saved Searches in `Embedding Status` section.

![Embedding Status](../image_145.png)

- You can click on status bar in `Embedding Status` section to see all the documents which got embedded.

![Embedding Status](../image_146.png)

- If want to check embedding status of documents which belongs to specific KB, you can select the KB in filter to the top right in `Embedding Status` section.

![Embedding Status](../image_148.png)


# Use case

## Question and Answers 

Mode – Teamcenter Documents
Asking question on embedded Teamcenter documents.

![Copilot](../image_119.png)

![Copilot](../image_120.png)

## Summarize documents/ In-context QnA
Mode: Currently Open Document (Summarization / in-context QnA)
Open a document and ask question on opened/selected document

![Copilot](../image_121.png)