# Content Management and Content Management S1000D Deployment and Post Installation Steps

**Applicable Product IDs:** TC010201-XT,TC010203-XT

> **NOTE: This document covers both AWS and Azure.**

TC010201-XT Content Management and TC010203-XT Content Management S1000D are two different applications. 

- Content Management is a pre-requisite of Content Management S1000D. 
- Content Management S1000D is an A&D specific application, and is not applicable to other industries.

Both applications need to be validated.

## **1. Deploy via PID**

The Statement of Work (SOW) contains the schema(s) the customer will use to create their technical publications.

Install the PID below corresponding to schema(s) the customer needs.

| Product ID/SKU   | REQUIRED PACKAGES                           | OPTIONAL PACKAGES         |
|------------------|---------------------------------------------|--------------------------|
| TC010201-XT      | contmgmtbase, cmsBasePublishTool_translator | contmgmtdita             |
| TC010203-XT      | contmgmts1000d, cmsBasePublishTool_translator | contmgmts1000d40         |  

> **Note:** Specify optional packages based on customer request.  
> The CApS team must ensure that any optional packages deployed for a tenant are included during updates or maintenance.

## **2.	Enable the ContMgmtPublish translator** 

The ContMgmtPublish translator is used to render Content Management content to an output file format defined by a publishing tool, such as PDF or HTML. The translator then stores the output file in Teamcenter.

> **Note:** Specific translators may be required to handle the specific document schemas supported in the templates you installed in step 1.

**For all template translators, including DITA**

Use Deployment Center to install the translator or manually edit the translator.xml file to enable the translator. 

The following is an example of how to edit the translator.xml file to enable the translator.

1. Open the `translator.xml` file from the `Dispatcher_Root\Module\conf` directory.

1. Set the `isactive` attribute to `true` to activate this translator.
   > **Note:** By default, this attribute is set to `false`.

1. Open the `contmgmtpublish.bat` (Windows) or `contmgmtpublish.sh` (Linux) file from the `Dispatcher_Root\Module\Translators\translator_name` directory and edit the `CHANGE_ME` tags.

1. For more information about `CHANGE_ME` tags, see the .bat file for the translator.

**For DITA Template translator**

1. Install the DITA OT if your customer is using DITA schemas.
   > **NOTE:** Version dependencies will change based on Teamcenter version in the following install instructions

1. Modify the `Dispatcher_Root\Module\Translators\contmgmtpublish\config\contmgmtpublish_config.properties` file to change the `JDK_HOME` variable to the JDK installation directory.

1. To use an older version of the DITA Open Toolkit, copy the older version of DITA OT to the `Dispatcher_Root\Module\Translators\contmgmtpublish\lib` folder.

1. Set the path for `DITA_ANT_HOME` in the
`Dispatcher_Root\Module\Translators\contmgmtpublish\config\contmgmtpublish_config.properties` file. The path must be set to the Ant directory in the DITA OT.

## **3.	Set preferences required for Content Management** 

The following Teamcenter preferences are required for Content Management. 

- `AE_dataset_id_usage`:  This preference must be set to `OFF` for Content Management to function properly.
- `PLMXML_put_objects_in_newstuff_on_import`:  This preference should be created and set to `TRUE`. It is necessary to place imported objects, such as administration data, in a folder with the same name as the imported XML file under the Newstuff folder. If this preference is not created and set, you must search for the imported data. Because there is a significant amount of content, you’ll want it to be organized automatically.
- `Multiple_revise_dialog_visible`:  To enable users to edit the names of new topic revisions using the Multiple Object Revise dialog box, this preference must be set to `TRUE`.
- (For customers using the Oxygen integration)`ctm0EnableOxygenIntegration`: This preference should be set to `TRUE` to activate the `Open in Oxygen` command in Active Workspace.
- (For customers using the XMetaL integration)`ctm0EnableXMetaLIntegration`: This preference should be set to `TRUE` to activate the `Open in XMetaL` command in Active Workspace.

## **4. Upload Custom Admin Data**

If the customer has specified in the SOW that they need to use custom admin data, then upload their custom admin data to a folder that is accessible by the command-line interface (CLI) for AWS or Azure.

## **5. Import Admin Data**

Run this command to install the Content Management base admin data, which is needed on all Content Management systems:
- Base admin data

   ```bash
   tcc exec 'cd <TC_ROOT>/contmgmtbase_data/data/admin;plmxml_import -u=infodba -pf=$TC_SECURITY_DIR/default_infodba.pwf -g=dba -xml_file=contmgmtbase_admindata.xml -transfermode=ctm0_ContMgmtImportAdmin -import_mode=overwrite -log=contmgmtbase_admindata.log'
   ```

The SOW will list the schema(s) the customer will use. Import the corresponding admin data for each schema used by the customer.
 
| **Schema**          | Admin Data
|---------------------|------------------------------------
| Custom              | Admin data to be supplied by customer/service team
| Docbook             | contmgmtdita_admindata.xml
| DITA 1.1            | contmgmtdita_admindata.xml
| DITA 1.2            | contmgmtdita12_admindata.xml
| DITA 1.3            | contmgmtdita13_admindata.xml
| S1000D v2.2 or 2.3  | contmgmts1000d_admin.plmxml
| S1000D v4.0.1       | contmgmts1000d_40_admin.plmxml
| S1000D v4.1         | contmgmts1000d_41_admin.plmxml
| S1000D v4.2         | contmgmts1000d_42_admin.plmxml
| S1000D v5.0         | contmgmts1000d_50_admin.plmxml

Run the following command(s) corresponding the needed schema(s):

- Custom admin data

   ```bash
   tcc exec 'cd <directory containing the custom admin data>;plmxml_import -u=infodba -pf=$TC_SECURITY_DIR/default_infodba.pwf -g=dba -xml_file=<custom schema XML file> -transfermode=ctm0_ContMgmtImportAdmin -import_mode=overwrite -log=custom_admindata.log'
   ```

- Docbook admin data

   ```bash
   tcc exec 'cd <TC_ROOT>/contmgmtdita_data/data/admin;plmxml_import -u=infodba -pf=$TC_SECURITY_DIR/default_infodba.pwf -g=dba -xml_file=contmgmtdita_admindata.xml -transfermode=ctm0_ContMgmtImportAdmin -import_mode=overwrite -log=contmgmtdita_admindata.log'
   ```

- DITA 1.1 admin data

   ```bash
   tcc exec 'cd <TC_ROOT>/contmgmtdita_data/data/admin;plmxml_import -u=infodba -pf=$TC_SECURITY_DIR/default_infodba.pwf -g=dba -xml_file=contmgmtdita_admindata.xml -transfermode=ctm0_ContMgmtImportAdmin -import_mode=overwrite -log=contmgmtdita_admindata.log'
   ```

- DITA 1.2 admin data

   ```bash
   tcc exec 'cd <TC_ROOT>/contmgmtdita_data/data/admin;plmxml_import -u=infodba -pf=$TC_SECURITY_DIR/default_infodba.pwf -g=dba -xml_file=contmgmtdita12_admindata.xml -transfermode=ctm0_ContMgmtImportAdmin -import_mode=overwrite -log=contmgmtdita12_admindata.log'
   ```

- DITA 1.3 admin data

   ```bash
   tcc exec 'cd <TC_ROOT>/contmgmtdita_data/data/admin;plmxml_import -u=infodba -pf=$TC_SECURITY_DIR/default_infodba.pwf -g=dba -xml_file=contmgmtdita13_admindata.xml -transfermode=ctm0_ContMgmtImportAdmin -import_mode=overwrite -log=contmgmtdita13_admindata.log'
   ```

- S1000D 2.2 and 2.3 admin data

   ```bash
   tcc exec 'cd <TC_ROOT>/contmgmts1000d_data/data/admin;plmxml_import -u=infodba -pf=$TC_SECURITY_DIR/default_infodba.pwf -g=dba -xml_file=contmgmts1000d_admin.plmxml -transfermode=ctm0_ContMgmtImportAdmin -import_mode=overwrite -log=contmgmts1000d_admin.log'
   ```
   
- S1000D 4.0.1 admin data

   ```bash
   tcc exec 'cd <TC_ROOT>/contmgmts1000d40_data/data/admin;plmxml_import -u=infodba -pf=$TC_SECURITY_DIR/default_infodba.pwf -g=dba -xml_file=contmgmts1000d_40_admin.plmxml -transfermode=ctm0_ContMgmtImportAdmin -import_mode=overwrite -log=contmgmts1000d_40_admin.log'
   ```

- S1000D 4.1 admin data

   ```bash
   tcc exec 'cd <TC_ROOT>/contmgmts1000d40_data/data/admin;plmxml_import -u=infodba -pf=$TC_SECURITY_DIR/default_infodba.pwf -g=dba -xml_file=contmgmts1000d_41_admin.plmxml -transfermode=ctm0_ContMgmtImportAdmin -import_mode=overwrite -log=contmgmts1000d_41_admin.log'
   ```

- S1000D 4.2 admin data

   ```bash
   tcc exec 'cd <TC_ROOT>/contmgmts1000d40_data/data/admin;plmxml_import -u=infodba -pf=$TC_SECURITY_DIR/default_infodba.pwf -g=dba -xml_file=contmgmts1000d_42_admin.plmxml -transfermode=ctm0_ContMgmtImportAdmin -import_mode=overwrite -log=contmgmts1000d_42_admin.log'
   ```

- S1000D 5.0 admin data

   ```bash
   tcc exec 'cd <TC_ROOT>/contmgmts1000d40_data/data/admin;plmxml_import -u=infodba -pf=$TC_SECURITY_DIR/default_infodba.pwf -g=dba -xml_file=contmgmts1000d_50_admin.plmxml -transfermode=ctm0_ContMgmtImportAdmin -import_mode=overwrite -log=contmgmts1000d_50_admin.log'
   ```


## **6.	Install XML authoring integration to Teamcenter X Content Management/S1000D** 

This application manages XML topics and numerous formats of referenced graphics.  To author and edit these topics, the customer will install an XML authoring application on their local client.

The four applications we provide integrations to are:

- Oxygen XML Author
- Oxygen XML Editor
- XMetaL Author
- XMetaL Editor

The Oxygen application can be downloaded from https://www.oxygenxml.com/ and installed using a trial license.

The XMetaL application can be downloaded from https://xmetal.com/ and installed using a trial license.

Both Oxygen and XMetaL, along with their plug-ins integrations (which can be downloaded from the Siemens Software Center), need to be installed on the client machine for validation as documented in the following section.

> **NOTE:** Please install only a version of Oxygen or XMetaL that is supported by the version of Teamcenter being used. The "Teamcenter Integrations Availability Matrix" lists the versions of Oxygen and XMetaL that are supported by different versions of Teamcenter. The latest matrix can be found in the Siemens Support Center here: https://support.sw.siemens.com/en-US/product/282219420/download/PL20200617155641511.



## **7.	Validating the Content Management/S1000D installation** 

Basic validation includes confirming that the right content objects are available to the user, and that content can be edited and published.

**Assumption:**  You have the Oxygen and XMetaL XML authoring applications installed along with their plug-in integrations (see previous section).

**DITA Validation** 

1. Create a DITA map.  Fill in the values below and click `Create`.

    ![Create a DITA map](./image_190_001.png)

1. Create a child topic. Fill in the values below and click `Add`.

    ![Create a child topic 1](./image_190_002.png)

    ![Create a child topic 2](./image_190_003.png)

1. Import a graphic. Add Content à Image. Fill in the values below and click `Import`.

    ![Import a graphic](./image_190_004.png) 

1. Edit the content.

    1. Select the topic and note the version.

    1. Choose Edit -> Open in XMetaL or Oxygen.

        ![Open in XMetaL or Oxygen](./image_190_005.png)

    1. In the resulting topic insert a para tag and type some text.

        ![Insert topic](./image_190_006.png)

    1. Reference a graphic

        ![Open in XMetaL or Oxygen](./image_190_007.png)

        ![Image](./image_190_008.png)

    1. Save the file back to Teamcenter by clicking the upper right X in the Oxygen window, to close the app.

    1. Confirm the Save in the resulting dialog.

        ![Confirm the Save](./image_190_009.png)

    1. Validate the version change on the topic. 

1. Publish the topic. 
    1. Select the topic and choose Share à Publish content. 

    1. Select the values shown below and click Publish.

        ![Publish content 1](./image_190_010.png)

        ![Publish content 2](./image_190_011.png)

    1. Validate the resulting content is available in the publications table on the topic stylesheet. 

        ![Validate](./image_190_012.png)

**S1000D Validation** 

1.  Create SNS root node

    ![ Create SNS root node](./image_190_013.png)

1.  Create DATA MODULE from SNS 

    ![Create DATA MODULE 1](./image_190_014.png)

    ![Create DATA MODULE 2](./image_190_015.png)

    ![Create DATA MODULE 3](./image_190_016.png)

    ![Create DATA MODULE 4](./image_190_017.png)

    ![Create DATA MODULE 5](./image_190_018.png)

1.  Create pubModule 

    ![Create pubModule 1](./image_190_019.png)

    ![Create pubModule 2](./image_190_020.png)

> **NOTE:** It is not possible to validate Content Management installation without importing content. However, you should not put this content in the production system for customers. If full testing is required, the Content Management PD team can provide sample data sets for import.