##### Manually Run Automation Runbook

## Prerequisites

- Permissions for the automation account are approved as per [Configure Automation Account Permissions](./030_Configure%20Automation%20Account%20Permissions.md)

## Steps to Manually Run the Runbook

### 1. Navigate to Your Resource Group

1. In the global search box at Azure console, search for "resource groups" and select "Resource Groups" service
2. In the search box, search for your admin resource group
3. Find and click on your admin resource group (e.g., `tcx-admin-<CELL_ID>-rg`)

   ![Image](./image_92.png)

### 2. Locate the Automation Account

1. In the resource group overview, look for the resource with type "Automation Account"
2. You can also use the search box within the resource group to search for "Automation account"
3. Click on the Automation Account  to open it

   ![Image](./image_93.png)

### 3. Access the Runbook

1. In the Automation Account blade, navigate to the left menu
2. Under "Process Automation", click on **Runbooks**
3. Find and click on the runbook named: `tcx-image-management-image-copy-runbook`

   ![Image](./image_95.png)

### 3. Start the Runbook

1. In the runbook overview page, click the **Start** button at the top
2. A "Start Runbook" dialog will appear
3. Click **OK** to start the execution

   ![Image](./image_96.png)

### 4. Monitor the Execution

1. You will be redirected to the job execution page
2. Monitor the **Status** - it should show "Running" initially

   ![Image](./image_97.png)

3. To view job output, click the **Output** tab to see execution results
4. Wait for the status to change to "Completed"

   ![Image](./image_98.png)
