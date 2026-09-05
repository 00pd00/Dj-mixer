# TC032026-XT: Service Plan Tests

## Overview
Tests for Service Planner functionality including service plan creation and management.

## Prerequisites
- Login to Active Workspace
- Access to Explorer/Folder functionality

## Test Procedure

### Step 1: Access Explorer
1. Login to Active Workspace
2. Go to Explorer/Folder Tile

![Explorer Access](../media/image14.png)

### Step 2: Create New Part
1. Click on New >> Add

![New Add](../media/image15.png)

2. Select "Part" in the Type list
3. Fill name field and click on "Add"

![Part Creation](../media/image16.png)

### Step 3: Open Part and Add Children
1. Select Pump and click on "Open"

![Open Part](../media/image17.png)

2. Select "Content" Tab

![Content Tab](../media/image18.png)

3. Click on Add >> Child

![Add Child](../media/image19.png)

4. Click on "Pin" on the panel

![Pin Panel](../media/image20.png)

5. Fill the name of child parts and click "Add" multiple times to create several child parts

![Add Child Parts](../media/image21.png)
![Multiple Children](../media/image22.png)

### Step 4: Verify Create Service Plan Command
1. Select Pump
2. Verify that 'Create Service plan' command is visible

![Create Service Plan Command](../media/image23.png)

3. Verify command has proper icon and tooltip

![Command Tooltip](../media/image24.png)

### Step 5: Create Service Plan
1. Click on the "Create Service plan" command
2. New popup for Creating Service Plan should be visible

![Service Plan Popup](../media/image25.png)

3. Verify mandatory fields (ID, Revision, Name) with auto-populated values
4. Fill the Name field
5. Fill description field (verify 240 character limit)
6. Verify Create button is enabled only when mandatory fields are filled

![Service Plan Form](../media/image26.png)

7. Click on "Create" button

### Step 6: Verify Service Plan Creation
Service plan should open in new task view with success message.

**Transaction Time**: 20 seconds (from Create click to page load)

![Success Message](../media/image27.png)

### Step 7: Verify Service Plan Interface
Verify the service plan page layout:
- Left side: SBOM (Pump)
- Middle section: Service plan
- Right side: Secondary work area with tabs (3D, Overview, Attachment)
- Bottom section: Parts, Tools and Skills, and Notices tabs

![Service Plan Interface](../media/image28.png)

## Expected Results
- Part structure created successfully
- Service plan command visible with proper tooltip
- Service plan created within expected transaction time
- Service plan interface displays all required sections
