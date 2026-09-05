# Attribute Mapping to Custom Item type
TcX Essentials includes predefined attribute mapping definitions for CAD Design Revision. However, during the transition with Personalization, the CAD Design Item type will be replaced with a Custom Item type. This change means that attribute mappings will not function for Custom Item types or any new Item types that customer wishes to use in the target environment. To ensure attribute mappings continue to work for custom types, follow the steps outlined below to extend the Attribute Mappings for the Custom Item types in the Target environment. This will guarantee that attribute mappings remain effective for custom types as well.

## Sample attribute mapping files

Download the sample attribute mapping zip file from artifactory from the following location: https://artifacts.industrysoftware.automation.siemens.com/artifactory/generic-local/com/siemens/tcx_essentials/2506_0003/attribute_mapping_sample_ver02.zip 

This zip file contains CAD tool specific mappings. Content of the zip file is shown below\
   ![alt text](image-10.png)

Please refer to `Sample_txl0tcxlite_attr_mappings_NX.txt` file. It contains attribute mapping to custom type `VER4NX` and the custom attributes starting with `ver4_`. The procedure to map is the same for other CAD tools.

## Steps to import Custom Attribute Mapping
1. Connect to the environment's AWS EC2 instance as tcx_user
2. Set context:  `.  tcc set_context customerID prd`
3. Create the new attribute mapping file under '/administration/admin_work' location
4. Execute the following command to backup the existing mappings for reference\
    `tcc exec 'export_attr_mappings -u=tcxadmin -pf=$TC_SECURITY_DIR/tcxadmin.pwf -g=dba -file=$ADMIN_WORK/txl1tcxlite_attr_mappings_backup.txt'`
5. Execute the following command to append new mappings:\
    `tcc exec 'import_attr_mappings -u=tcxadmin -pf=$TC_SECURITY_DIR/tcxadmin.pwf -g=dba -file=$ADMIN_WORK/<newly mapped attribute file> -append'`
