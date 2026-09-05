# TC032023-XT: Service Events Tests

## Overview
Tests for Service Asset Management functionality including as-maintained structures and service events.

## Prerequisites
- Login to Active Workspace
- Access to Explorer functionality

## Test Procedure

### Phase 1: Physical Location Setup

#### Step 1: Create Physical Location
1. Login to Active Workspace
2. Open Explorer

![Explorer](../media/image14.png)

3. Click on New >> Add

![New Add](../media/image15.png)

4. Select "Physical location" from Type
5. Fill Location Name and Location Type
6. Click on "Add" button

**Transaction Time**: 5 seconds

![Physical Location](../media/image29.png)

#### Step 2: Set Preferred Location
1. Select Physical Location
2. Go to "Manage" and select "Set Preferred Location"

**Transaction Time**: 5 seconds

![Set Preferred Location](../media/image30.png)

3. Verify success message is populated

![Success Message](../media/image31.png)

### Phase 2: Part Structure Creation

#### Step 3: Create Part Structure
1. Go to Explorer again

![Explorer](../media/image32.png)

2. Click on New >> Add

![New Add](../media/image15.png)

3. Select "Part" in the Type list
4. Fill name field and click on "Add"

![Part Creation](../media/image16.png)

5. Select Pump and click on "Open"

![Open Part](../media/image17.png)

6. Select "Content" Tab

![Content Tab](../media/image18.png)

7. Click on Add >> Child

![Add Child](../media/image19.png)

8. Click on "Pin" on the panel

![Pin Panel](../media/image20.png)

9. Fill the name of the child part and click on "Add"

![Add Child Parts](../media/image21.png)

10. Give another name and again click on "Add"

11. Similarly, again give another name and click on "Add"

![Multiple Children](../media/image22.png)

### Phase 3: As-Maintained Structure

#### Step 4: Create As-Maintained Structure
1. Select Pump
2. Go to New and select "Create As maintained Structure"

![Create As-Maintained](../media/image33.png)

3. Fill required information and click on "Create"

![As-Maintained Form](../media/image34.png)

4. Verify As-maintained structure is generated and visible

**Transaction Time**: 30 seconds

![As-Maintained Structure](../media/image35.png)

### Phase 4: Service Events

#### Step 5: Access Service Events
1. Open "Service Events" tab

![Service Events Tab](../media/image36.png)

2. Verify "Add Service Event" command is visible

![Add Service Event](../media/image37.png)

3. Verify command tooltip: "Create a new Service Event against a Physical part"

#### Step 6: Create Service Event
1. Click on "Add Service Event" command
2. Verify panel opens for Service event creation
3. Verify mandatory fields (Name field for TC 13 onwards)

![Service Event Form](../media/image38.png)
![Service Event Properties](../media/image39.png)

4. Fill all required fields
5. Click on "Create" button

**Transaction Time**: 5 seconds

6. Verify Service Event is created and visible in the Service event table

## Expected Results
- Physical location created and set as preferred
- As-maintained structure created successfully with "As-Built Revision" property as false
- Service Events tab accessible with proper commands
- Service Event created and displayed in table
- All transaction times within expected limits
