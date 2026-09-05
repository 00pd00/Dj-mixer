# TC032020-XT: SWI Tests

## Overview
Tests for Service Technician Access functionality including Service Work Instructions (SWI).

## Prerequisites
- Login to Active Workspace
- Access to Explorer functionality

## Test Procedure

### Phase 1: Part Structure Creation

#### Step 1: Access Explorer
1. Login to Active Workspace
2. Go to Explorer/Folder Tile

![Explorer Access](../media/image14.png)

#### Step 2: Create New Part
1. Click on New >> Add

![New Add](../media/image15.png)

2. Select "Part" in the Type list
3. Fill name field and click on "Add"

![Part Creation](../media/image16.png)

#### Step 3: Open Part and Add Children
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

### Phase 2: Service Plan Creation

#### Step 4: Verify Create Service Plan Command
1. Select Pump
2. Verify that 'Create Service plan' command is visible

![Create Service Plan Command](../media/image23.png)

3. Verify command has proper icon and tooltip

![Command Tooltip](../media/image24.png)

#### Step 5: Create Service Plan
1. Click on the "Create Service plan" command
2. New popup for Creating Service Plan should be visible

![Service Plan Popup](../media/image25.png)

3. Verify mandatory fields (ID, Revision, Name) with auto-populated values
4. Fill the Name field
5. Fill description field (verify 240 character limit)
6. Verify Create button is enabled only when mandatory fields are filled

![Service Plan Form](../media/image26.png)

7. Click on "Create" button

#### Step 6: Verify Service Plan Creation
Service plan should open in new task view with success message.

**Transaction Time**: 20 seconds (from Create click to page load)

![Success Message](../media/image27.png)

#### Step 7: Verify Service Plan Interface
Verify the service plan page layout:
- Left side: SBOM (Pump)
- Middle section: Service plan
- Right side: Secondary work area with tabs (3D, Overview, Attachment)
- Bottom section: Parts, Tools and Skills, and Notices tabs

![Service Plan Interface](../media/image28.png)

### Phase 3: Service Work Instructions

#### Step 8: Add Group Command
1. Select the service plan
2. Click on "Add group" Command
3. Verify two additional commands for creating allowed child types

![Add Group Commands](../media/image43.png)

#### Step 9: Create Service Container
1. Click on "Service Container"
2. Fill required details in the popup
3. Click on "Add"

**Transaction Time**: 5 seconds

![Service Container](../media/image44.png)

#### Step 10: Add Service Requirement
1. Select Service container
2. Click on Add >> Service Requirement

![Service Requirement](../media/image45.png)

3. Fill Name and Requirement Type in the popup
4. Click on "Add"

**Transaction Time**: 5 seconds

![Service Requirement Form](../media/image46.png)

#### Step 11-12: Create Work Cards
1. Select Service Requirement
2. Click on Add >> Workcard

![Add Workcard](../media/image47.png)

3. Fill Name and click on "Add More"

**Transaction Time**: 5 seconds

![Workcard Form](../media/image48.png)

4. Give another name and click on "Add"

**Transaction Time**: 5 seconds

#### Step 13-14: Access Work Instructions
1. Select Service Requirement
2. Verify "Show work instruction" command is visible

![Show Work Instruction](../media/image49.png)

3. Click on "Show work instruction" command
4. Verify new work instruction page opens

**Transaction Time**: 10 seconds

![Work Instruction Page](../media/image50.png)

## Expected Results
- Part structure created successfully
- Service plan created with proper hierarchy and interface
- Service containers and requirements added successfully
- Work cards created and linked properly
- Work instruction interface accessible and functional
- All transaction times within expected limits
