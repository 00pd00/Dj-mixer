## Install Default Tool Integration

**Note:- These steps are applicable for TcX Premium only**

1. Refer to the section - Executing Teamcenter ITK Utilities in a containerized environment from the cTcX CookBook 2512

2. Run the following admin utility to import the tool configurations:

    ```bash
    tcc exec 'cae_migrate_tool_configuration -u=infodba -pf=$TC_SECURITY_DIR/<infodba-password-filename> -g=dba -mode=IMPORT -folder=$TC_DATA/tcsim/example_configs/SimulationTool -item_id=SIMTOOL000001 -rev=A'
    ```

3. Run the following admin utility to import the other configurations:

    ```bash
    tcc exec 'cae_migrate_configurations -u=infodba -pf=$TC_SECURITY_DIR/<infodba-password-filename> -g=dba -mode=import -owning_user=infodba -owning_group=dba -xml_file_path=$TC_DATA/tcsim/example_configs/CAEPackage/Package.xml'
    tcc exec 'cae_migrate_configurations -u=infodba -pf=$TC_SECURITY_DIR/<infodba-password-filename> -g=dba -mode=import -owning_user=infodba -owning_group=dba -xml_file_path=$TC_DATA/tcsim/example_configs/AnalysisDashboard/ADB.xml'
    tcc exec 'cae_migrate_configurations -u=infodba -pf=$TC_SECURITY_DIR/<infodba-password-filename> -g=dba -mode=import -owning_user=infodba -owning_group=dba -xml_file_path=$TC_DATA/tcsim/example_configs/ModelDashboard/MDB.xml'
    ```

4. Run the following admin utility to import the Structure Map configurations:

    ```bash
    tcc exec 'cae_manage_datamap_definition -u=infodba -pf=$TC_SECURITY_DIR/<infodba-password-filename> -g=dba -datamap_file_path=$TC_DATA/datamapping.xml -nodexml_file_path=$TC_DATA/NodeXMLConfig.xml -configure_propertyset'
    tcc exec 'plmxml_import -u=infodba -pf=$TC_SECURITY_DIR/<infodba-password-filename> -g=dba -xml_file=$TC_DATA/tcsim/example_configs/StructureMap/SM_Skip_Subassemblies_A_2.xml -transfermode=incremental_import'
    tcc exec 'plmxml_import -u=infodba -pf=$TC_SECURITY_DIR/<infodba-password-filename> -g=dba -xml_file=$TC_DATA/tcsim/example_configs/StructureMap/SM_Recycle_Models_A_2.xml -transfermode=incremental_import'
    tcc exec 'plmxml_import -u=infodba -pf=$TC_SECURITY_DIR/<infodba-password-filename> -g=dba -xml_file=$TC_DATA/tcsim/example_configs/StructureMap/SM_Reuse_Models_A_2.xml -transfermode=incremental_import'
    tcc exec 'plmxml_import -u=infodba -pf=$TC_SECURITY_DIR/<infodba-password-filename> -g=dba -xml_file=$TC_DATA/tcsim/example_configs/StructureMap/SM_Reuse_And_Recycle_A_2.xml -transfermode=incremental_import'
    tcc exec 'plmxml_import -u=infodba -pf=$TC_SECURITY_DIR/<infodba-password-filename> -g=dba -xml_file=$TC_DATA/tcsim/example_configs/StructureMap/SM_Skip_Subassemblies_Reuse_And_Recyle_A_2.xml -transfermode=incremental_import'
    ```

5. Run the following admin utility to import the Derivative Rule configurations:

    ```bash
    tcc exec 'cae_migrate_configurations -u=infodba -pf=$TC_SECURITY_DIR/<infodba-password-filename> -g=dba -mode=import -owning_user=infodba -owning_group=dba -xml_file_path=$TC_DATA/tcsim/example_configs/DerivativeRules/DR.xml'
    tcc exec 'cae_migrate_configurations -u=infodba -pf=$TC_SECURITY_DIR/<infodba-password-filename> -g=dba -mode=import -owning_user=infodba -owning_group=dba -xml_file_path=$TC_DATA/tcsim/example_configs/DerivativeRules/VR.xml'
    ```

6. Run the following admin utility to import the File Upload Rule configurations:

    ```bash
    tcc exec 'cae_migrate_configurations -u=infodba -pf=$TC_SECURITY_DIR/<infodba-password-filename> -g=dba -mode=import -owning_user=infodba -owning_group=dba -xml_file_path=$TC_DATA/tcsim/example_configs/FileUploadRules/FUR.xml'
    ```

7. Run the following admin utility to import the Workflow configurations:

    ```bash
    tcc exec 'plmxml_import -u=infodba -pf=$TC_SECURITY_DIR/<infodba-password-filename> -g=dba -xml_file=$TC_DATA/tcsim/example_configs/CAEWorkflows/WF-CAE-MDOAnalysis-Extract-Study-Info.xml -transfermode=workflow_template_overwrite'
    tcc exec 'plmxml_import -u=infodba -pf=$TC_SECURITY_DIR/<infodba-password-filename> -g=dba -xml_file=$TC_DATA/tcsim/example_configs/CAEWorkflows/WF_CAE_Delete_1D_Model_in_Git.xml -transfermode=workflow_template_overwrite'
    tcc exec 'plmxml_import -u=infodba -pf=$TC_SECURITY_DIR/<infodba-password-filename> -g=dba -xml_file=$TC_DATA/tcsim/example_configs/CAEWorkflows/WF_CAE_Launch_NXNastran.xml -transfermode=workflow_template_overwrite'
    tcc exec 'plmxml_import -u=infodba -pf=$TC_SECURITY_DIR/<infodba-password-filename> -g=dba -xml_file=$TC_DATA/tcsim/example_configs/CAEWorkflows/WF_CAE_Publish_1D_Model_from_Git.xml -transfermode=workflow_template_overwrite'
    tcc exec 'plmxml_import -u=infodba -pf=$TC_SECURITY_DIR/<infodba-password-filename> -g=dba -xml_file=$TC_DATA/tcsim/example_configs/CAEWorkflows/WF_CAE_Request_Analysis.xml -transfermode=workflow_template_overwrite'
    tcc exec 'plmxml_import -u=infodba -pf=$TC_SECURITY_DIR/<infodba-password-filename> -g=dba -xml_file=$TC_DATA/tcsim/example_configs/CAEWorkflows/WF_CAE_Review_and_Publish_1D_Model_from_Git.xml -transfermode=workflow_template_overwrite'
    tcc exec 'plmxml_import -u=infodba -pf=$TC_SECURITY_DIR/<infodba-password-filename> -g=dba -xml_file=$TC_DATA/tcsim/example_configs/CAEWorkflows/WF_CAE_Update_1D_Model_Attributes_in_Git.xml -transfermode=workflow_template_overwrite'
    ```

These commands will import the configurations (CAE Packages, Simulation Dashboards, and Structure Map) related to the simulation tools.
