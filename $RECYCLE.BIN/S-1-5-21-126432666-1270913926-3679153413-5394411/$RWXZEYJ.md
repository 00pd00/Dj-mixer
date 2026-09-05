Classification admin data includes Key LOV, Property, Class, and Node definitions. There are two major activities for a classification administrator:

1. Creating or updating classification definitions
    * Interactively create or update definitions using Classification Application Manager in Active Workspace.
    * Import definitions exported from another Teamcenter instance in PLMXML or JSON format.
        * Import by using "Classification Manager" in Active Workspace.
        * Import by using command-line utilities such as PLMXML Import or clsutility.
2. Configuring classification definitions for Solr indexing and the search pipeline. This requires running **bmide_modeltool**.

This document describes how to perform the above activities by using command-line utilities.

# Prerequisites

1. Connect to the AWS EC2 Linux instance of the target environment using the **tcx_user** account
    ```bash
	sudo su - tcx_user
	```
2. Set Teamcenter context
    ```bash
    .  tcc set_context <Customer-ID> <EnvType>
	```
For instructions on running ITK utilities, please refer to 
- [Day N Operations Prerequisites](../../020_Operations/030_Day%20N%20Operations/010_Prerequisites.md)​​
- [Executing Teamcenter ITK Utilities](../../020_Operations/030_Day%20N%20Operations/020_Executing%20Teamcenter%20ITK%20Utilities.md)

# Importing classification definitions

1. Upload the files containing classifiation defintions either in plmxml or json format to S3 bucket that is accessible by the target environment. The resulting S3 object URI must follow the format shown below:
    ```bash
    s3://<S3 URI ACCESIBLE BY THE TARGET ENVIRONMENT>/<definition files to be imported>
	```
2. Copy the file from S3 Bucket location to /administration/admin_work on the Linux Server EC2 instance using S3 copy command
    ```bash
    aws s3 cp s3://<S3 URI ACCESIBLE BY THE TARGET ENVIRONMENT>/<definition files to be imported> /administration/admin_work/<definition files to be imported>

## Importing Basic Classification Definitions
1. Classification definitions in PLMXML format can be imported by using the plmxml_import utility.

    ```bash 
    tcc exec '$TC_ROOT/bin/plmxml_import -u=infodba -pf=$TC_SECURITY_DIR/<infodba-password-filename> -g=dba -xml_file=<plmxml file path> -import_mode=overwrite -transfermode=incremental_import -log=<log file path>'
    ```
2. If PLMXML file imported above does not include Search Index View definitions for imported classes, Teamcenter provides a utility to create them. Execute the following command to create a search index view.

    ```bash 
    tcc exec '$TC_ROOT/bin/smlutility -create_indexing_views -u=infodba -p=$TC_SECURITY_DIR/<infodba-password-filename> -g=dba -reportfile=<log file path> -listIds=<Top Level Class Ids separated by comma>  -recursive'
    ```

## Advanced Classification Definitions

Advanced classification supports JSON-based export and import. Definitions can be provided in one file or in multiple files.

    ```bash 
    tcc exec '$TC_ROOT/bin/clsutility -u=infodba -pf=$TC_SECURITY_DIR/<infodba-password-filename> -g=dba -create -keylov_definitions -request=<KeyLOV definition json file> -output=<output log file>'
    tcc exec '$TC_ROOT/bin/clsutility -u=infodba -pf=$TC_SECURITY_DIR/<infodba-password-filename> -g=dba -create -property_definitions -request=<property definition json file> -output=<output log file>'
    tcc exec '$TC_ROOT/bin/clsutility -u=infodba -pf=$TC_SECURITY_DIR/<infodba-password-filename> -g=dba -create -class_definitions -request=<class definition json file> -output=<output log file>'
    tcc exec '$TC_ROOT/bin/clsutility -u=infodba -pf=$TC_SECURITY_DIR/<infodba-password-filename> -g=dba -create -node_definitions -request=<node definition json file> -output=<output log file>'
    ```
# Configuration for Solr indexing and search pipeline

Once classification definitions (basic and advanced) are created or updated by using Active Workspace or command-line utilities, execute the following command to configure the new or updated definitions for Solr indexing and the search pipeline.

    ```bash 
    tcc exec '$TC_ROOT/bin/bmide_modeltool.sh -u=infodba -pf=$TC_SECURITY_DIR/<infodba-password-filename> -g=dba -tool=tc_solr_schema_gen -mode=upgrade -target_dir=$TC_DATA'
    ```
For more information about indexing classification data, see [About Indexing Classification Data](https://internal.docs.sw.siemens.com/en-US/doc/282219420/PL20250520748650994.class_aw/xid1755823).

**Support Contacts:**

Contact support team `lalit.solanki@siemens.com` or `danila.agaibia@siemens.com`.


