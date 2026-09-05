## Configure For SolidEdge X Support

### Create SEEC Expand Structure Expedite Preference

1. Login to the TCX environment through AW as a dba user
2. Navigate to the "Preferences" page
3. Ensure that "Site" level is selected under Organization"
4. Select New > New Preference
5. Define a new preference with the following configuration:
 - Name: SEEC_ExpandStructure_Expedite
 - Product Area: Integration.SEEC
 - Description: SEEC Expand Structure Expedite Preference
 - Protection Scope: User
 - Type: Integer
 - Values: 1
6. Select Add
![Image](./image_421.png)


### Update SEEC_Foreign_Datasets Preference

1. Login to the TCX environment through AW as a dba user
2. Navigate to the "Preferences" page
3. Ensure that "Site" level is selected under Organization"
4. Search for **SEEC_Foreign_Datasets**
5. Select "Edit"
6. Double click the "FALSE" value and change to "TRUE".**Do not modify the second preference value**
7. Select "Save"

**Before**

![Image](./image_422.png)


**After**

![Image](./image_423.png)

### Update SEEC_Default_Item_Type Preference

1. Login to the TCX environment through AW as a dba user
2. Navigate to the "Preferences" page
3. Ensure that "Site" level is selected under Organization"
4. Search for "SEEC_Default_Item_Type"
5. Select "Edit"
6. Set "Cad0Design" as its value

![Image](./image_423_1.png)

​​
​​
​​
