##### Configure Automation Account Permissions

After the admin pipeline has successfully deployed the Automation Account, you need to configure permissions for cross-subscription image copying.

## Prerequisites

- Admin pipeline must be completed successfully

## Steps to Configure Permissions

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

### 3. Get the System-Assigned Identity Object ID

1. In the Automation Account blade, navigate to the left menu
2. Under "Account Settings", click on **Identity**
3. Ensure you are on the "System assigned" tab
4. copy the **Object ID** displayed under "System assigned identity"

    ![Image](./image_94.png)

### 4. Share Object ID with Azure Architects

1. Send an email to Azure architects at: [tc.azure.deployops.architects.disw@siemens.com](mailto:tc.azure.deployops.architects.disw@siemens.com)
2. Provide them with the following information:
   - **Object ID**: `{copied-object-id-from-step-3}`
   - **Required Role**: `Reader`
   - **Purpose**: Cross-subscription image copying for automated image management

**Example Role Assignment Request:**
```
Subject: Reader Role Assignment Request for Automation Account

Hi Azure Architects,

Please assign Reader role on the Admin image gallery tcx_admin_0002_gal in subscription 888b0468-c8c4-4e39-915f-9f9fcc38040a to the following Automation Account for cross-subscription image copying:

Object ID: `{copied-object-id-from-step-3}`
Required Role: Reader
Purpose: Automated image copying from validated source gallery to production/uat admin subscription [subscription name/id]


Thank you,
<Your Name>
```

## Verification

After the Azure architects have completed the role assignment:

1. The automation runbook will be able to access and read images from the source gallery
2. Scheduled image copying will work automatically
3. You can test the permissions by [manually running the automation runbook](./040_Manually%20Run%20Automation%20Runbook.md)
