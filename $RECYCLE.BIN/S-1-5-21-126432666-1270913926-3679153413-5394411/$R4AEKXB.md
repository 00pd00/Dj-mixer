# TC032021-XT: Service Engineering Tests

## Overview
Tests for Service Engineer functionality including SBOM management and service BOM alignment.

## Prerequisites
- Login to Active Workspace
- Ensure "Service Engineer" role is properly configured
- Select "SBOM Management" workspace

## Test Procedure

### Step 1: Access SBOM Management Workspace
1. Login to Active Workspace.
2. Verify you are in "Service Engineer" Role.
3. Select Workspace as "SBOM Management".

    If multiple workspace are not assigned to logged in user then user will not view Workspace section. In this case, no need to select Workspace, default workspace "SBOM Management" is already assigned.

    ![SBOM Management Workspace](../media/image4.png)
    
    View when multiple workspace are not assigned:
        
    ![No Workspace View](../media/image51.png)

### Step 2: Create New Work Package
1. Click on "Create Work package" tile

![New Work Package](../media/image5.png)

2. Fill the work package name details in the dialog box
3. Click on "Create"

**Transaction Time**: 5 seconds

![Work Package Creation](../media/image6.png)

### Step 3: Work Package Landing Page
User should land on the work package page.

**Transaction Time**: 15 seconds

![Work Package Page](../media/image7.png)

### Step 4: Add Source BOM
1. Click on "Add source BOM" button

![Add Source BOM](../media/image8.png)

2. Add an Engineering BOM/MBOM from the add product dialog box

**Transaction Time**: 5 seconds

![Add Product Dialog](../media/image9.png)

### Step 5: Add Service BOM
1. Once source BOM is added, click on "Add" command to add service BOM

![Add Service BOM](../media/image10.png)

2. Use any of the two available methods to add service BOM

**Transaction Time**: 5 seconds

![Service BOM Methods](../media/image11.png)

### Step 6: Access Service BOM Management
1. Once both BOMs are added, click on "Manage Service BOM" page

![Manage Service BOM](../media/image12.png)

### Step 7: Verify BOM Alignment Page
User should see the Source BOM — Service BOM alignment page.

**Transaction Time**: 30 seconds (from Step 6 click to page load)

![BOM Alignment](../media/image13.png)

## Expected Results
- Work package created successfully
- Source BOM and Service BOM added
- BOM alignment page displays correctly
- All transaction times are within expected limits
