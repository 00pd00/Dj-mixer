## Design BOM Alignment Automation Post Installation Steps
**Applicable Product IDs**: TC030781-XT, TC030782-XT, TC030783-XT, TC030784-XT

<!-- TODO: LCS-1293145 - Automate the set preference cookbook instructions in test template -->

## Update PMA0_COPY_PROP_DESIGN_TO_PART_GENERATE preference value

1. Log into Active Workspace as a dba user
2. Switch to Active Admin workspace in the profile
3. Click on Preferences tile in the Home page
4. Find the preference `PMA0_COPY_PROP_DESIGN_TO_PART_GENERATE`
5. Edit the preference and add value `bl_rev_object_name:bl_rev_object_name`
6. Edit the preference and add value `bl_rev_object_desc:bl_rev_object_desc`
7. Edit the preference and add value `bl_ref_designator:bl_ref_designator`
8. Save the preference and validate the values

    ![Image](./image_170_001.png)  

## Update PMA0_COPY_PROP_DESIGN_TO_PART_UPDATE preference value

1. Log into Active Workspace as a dba user
2. Switch to Active Admin workspace in the profile
3. Click on Preferences tile in the Home page
4. Find the preference `PMA0_COPY_PROP_DESIGN_TO_PART_UPDATE`
5. Edit the preference and clear all the values
6. Save the preference

## Update PMA0_COPY_PROP_PART_TO_DESIGN_GENERATE preference value

1. Log into Active Workspace as a dba user
2. Switch to Active Admin workspace in the profile
3. Click on Preferences tile in the Home page
4. Find the preference `PMA0_COPY_PROP_PART_TO_DESIGN_GENERATE`
5. Edit the preference and add value `bl_rev_object_name:bl_rev_object_name`
6. Edit the preference and add value `bl_rev_object_desc:bl_rev_object_desc`
7. Edit the preference and add value `bl_ref_designator:bl_ref_designator`
8. Save the preference and validate the values

    ![Image](./image_170_002.png) 

## Update PMA0_COPY_PROP_PART_TO_DESIGN_UPDATE preference value

1. Log into Active Workspace as a dba user
2. Switch to Active Admin workspace in the profile
3. Click on Preferences tile in the Home page
4. Find the preference `PMA0_COPY_PROP_PART_TO_DESIGN_UPDATE`
5. Edit the preference and clear all the values
6. Save the preference

## Update Pma0_Define_Update_Automation_Behavior preference value

1. Log into Active Workspace as a dba user
2. Switch to Active Admin workspace in the profile
3. Click on Preferences tile in the Home page
4. Find the preference `Pma0_Define_Update_Automation_Behavior`
5. Edit the preference and add value `Skip_Removal_Of_Unaligned_Occurrences`
6. Edit the preference and add value `Skip_Solution_Variant_Update`
7. Edit the preference and add value `Skip_Quantity_And_Variant_Formula_Update`
8. Save the preference and validate the values

    ![Image](./image_170_003.png) 

## Update Fnd0_OccAttrProps_Editable_Post_Release preference value

1. Log into Active Workspace as a dba user
2. Switch to Active Admin workspace in the profile
3. Click on Preferences tile in the Home page
4. Find the preference `Fnd0_OccAttrProps_Editable_Post_Release`
5. Edit the preference and add value `bl_occ_Fnd0OccAlignmentAttrs_fnd0SkipAlignment`
6. Save the preference and validate the values

    ![Image](./image_170_004.png)
