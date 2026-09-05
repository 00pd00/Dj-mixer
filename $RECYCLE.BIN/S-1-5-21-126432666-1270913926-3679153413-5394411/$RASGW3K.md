# TC031201-XT: As-Built Tests

## Overview
Tests for As Built Management functionality including as-built structure creation.

## Prerequisites
- Login to Active Workspace
- Access to Explorer functionality

## Test Procedure

### Step 1: Access Explorer
1. Login to Active Workspace
2. Open Explorer

![Explorer](../media/image14.png)

### Step 2: Create Part Structure
1. Click on New >> Add

![New Add](../media/image15.png)

2. Select "Part" in the Type list
3. Fill name field and click on "Add"

![Part Creation](../media/image16.png)

4. Select Pump and click on "Open"

![Open Part](../media/image17.png)

5. Select "Content" Tab

![Content Tab](../media/image18.png)

6. Click on Add >> Child

![Add Child](../media/image19.png)

7. Click on "Pin" on the panel

![Pin Panel](../media/image20.png)

8. Create multiple child parts by filling names and clicking "Add"

![Child Parts](../media/image21.png)
![Multiple Children](../media/image22.png)

### Step 3: Create As-Built Structure
1. Select Pump
2. Go to New and select "Create As-Built Structure"

![Create As-Built](../media/image40.png)

3. Fill in the Manufacturing ID field
4. Click on "Create" Button

![As-Built Form](../media/image41.png)

### Step 4: Verify As-Built Structure
1. Verify As-Built structure is generated and visible

**Transaction Time**: 20 seconds (from Create click to page load)

2. Verify "As-Built Revision" field is True in the overview tab

![As-Built Structure](../media/image42.png)

## Expected Results
- Part structure created successfully
- As-Built structure created within expected transaction time
- As-Built Revision property set to "true" in overview tab
- Structure properly displays in the interface
