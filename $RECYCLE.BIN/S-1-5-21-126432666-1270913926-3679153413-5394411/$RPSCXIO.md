### Post Deploy Validation Medical Device X3 & X5

**_Product IDs:_**

- TC032031-XT - PLM for Medical Devices X3
- TC032034-XT - PLM for Medical Devices X5

Please use TCX 2506.0003 or later for these products.

For X5, following are prerequisite product IDs

- TC030101-XT - Requirements Manager User
- TC030202-XT - Teamcenter Test and Verification Management

**_Prerequisites for smoke test cases:_**

**1. Column Configurations Changes**

:::note
This step is only required if you are **upgrading** from **TC2412 or an older release**.
:::

Legacy column definitions and preferences are no longer supported.
If you have legacy TC preferences for column configuration, please upgrade to the current TC preferences.

**Legacy preferences** that are no longer supported and should be removed:

- AvaMedbase_ColumnWidth_TCMDS
- AvaMedbase_ColumnWidth_Checker
- AvaMedbase_ColumnWidth_Submission
- AvaMedbase_WizardColumnConfiguration
- AvaMedbase_CheckerColumnConfiguration
- AvaMedbase_SubmissionColumnConfiguration

Note: If any of these preferences are still in AWC_StartupPreferences, they should be removed from there as well.

**Current preferences**:

- Avf2_Columns_Defined
- Avf2_Columns_Wizard
- Avf2_Columns_Checker
- Avf2_Columns_Collection
- AvaMedbase_ReplaceConfigurationSrv
- AvaMedbase_ReplaceColumnConfiguration (RAC only)
- AvaMedbase_ReplaceConfiguration (RAC only)

As part of this change, old column configurations are no longer supported:

| Old column definition | New column definition |
| --- | --- |
| avf:occurrence | Avf2:occurrence |
| avf:object | Avf2:object |
| avf:avf2Name | Avf2:name |
| avf:avf2Subtype | Avf2:subType |
| avf:type | Avf2:type |
| avf:state | Avf2:state |
| avf:avf2Slots | Avf2:slots |
| avf:owner | Avf2:owner |
| avf:group | Avf2:group |
| avf:avf2StartDate | Avf2:startDate |
| avf:avf2EndDate | Avf2:endDate |
| avf:avf2Active | Avf2:active |
| avf:duedays | Avf2:dueDays |
| avf:requisites | Avf2:requisites |
| avf:final | Avf2:final |
| avf:sync | Avf2:sync |
| avf:schedule | Avf2:schedule |

**2. Run the following commands on corporate server to import sample classes required for DHF creation.**

```
sudo su - tcx_user

. tcc set_context <CustomerID> <Environment>

tcc exec 'export BYPASS_RULES=ON'

tcc exec 'plmxml_import -u=tcxadmin -pf=$TC_SECURITY_DIR/tcxadmin.pwf -g=dba -xml_file=$TC_ROOT/install/avamedbase/configuration/configuration_import.xml -import_mode=overwrite'

tcc exec 'plmxml_import -u=tcxadmin -pf=$TC_SECURITY_DIR/tcxadmin.pwf -g=dba -xml_file=$TC_ROOT/install/avamedbase/doc_mgmt_templates/doc_mgmt_templates.xml -import_mode=overwrite'

tcc exec 'export BYPASS_RULES='

```

**Smoke Tests**

- **Create DHF object**

1. Login to Teamcenter environment and navigate to Explorer.
2. Click … -> New -> Add to create object. Select DHF in type filter list.

   ![Image](./image_160_001.png)
3. Enter name, description and select class A for DHF classification. Create the object and open it.

   ![Image](./image_160_002.png)
4. Navigate to TC MDS page. Validate that various phases are visible as per below image.

   ![Image](./image_160_003.png)
5. Select phase **User Needs**.
   Click … -> Edit -> Edit Phase Duration.

   ![Image](./image_160_004.png)
6. Set duration as 30 days and save. Validate that the colour of all phases changes to blue.

   ![Image](./image_160_005.png)

- **Create Record and submit for Review**
  1. Select phase **User Needs.**
     Select **General Information and Introduction** row from the table and click on **Add to** button over the table.
  2. Select **Record** as type and enter details and set Record type as **General Information and Introduction** and click on Add button.

     ![Image](./image_160_006.png)
  3. Validate the record gets added and the state changes to **Working**.
  4. Submit the record to **Record Release** workflow.

     ![Image](./image_160_007.png)
  5. Go to inbox, perform **Select Reviewer** task to add necessary reviewer.
  6. Login as Reviewer and perform **Review** task. Ensure that re-authentication is prompted to approve the record. Subsequently, complete the **Release** tasks in similar manner.
  7. Validate the status of record on TC MDS page of DHF.

     ![Image](./image_160_008.png)