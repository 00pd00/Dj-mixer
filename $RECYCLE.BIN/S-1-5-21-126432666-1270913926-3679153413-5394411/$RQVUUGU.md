# TcX Resource Management (MRL)  

**Product ID:** TCM055011-XT  

---

The installation of Tc X PM is automated as much as possible. Only two steps are needed.  

## Update AW Timeout Setting  
There is one configuration file that needs to be modified manually to adjust the timeout value.  
- Edit file /\<tenant id-environment type\>/\<tenant id-environment type\>/deploy/component/helm/teamcenter/charts/gateway/config/**config.json**  
- Search for text **httpRequestResponse** in **timeout** block  
- Change value to 4000000  
   ```json
   "timeout": {
       "httpRequestResponse": 4000000,
       "autoLogout": "2m"
   }
   ```
- Restart the gateway:  
- Go to the ArgoCD tenant Teamcenter application and delete the gateway pod  
![Screenshot](Timeout1.png)  
- The gateway pod restarts automatically  
- The change is reflected in the tenant repo in GitLab  
![Screenshot](Timeout2.png)  


## Restart Indexer  
- Login to DC Server Linux EC2 machine as tcx_user  
- Set context for tcc CLI by running following command: (Substitute appropriate values for **tenantID** and **environmentType** parameters).  
   ```bash
   tcc set_context <tenantID> <environmentType> tcx_user
   ```
<<<<<<< HEAD
- Stop sync pod as per instructions in section [Shutdown and restart workloads](../../../Documentation/Operations/Day%20N%20Operations/Shutdown%20and%20restart%20workloads) with the workload as "Teamcenter FTS Indexer".  
=======
- Stop sync pod as per instructions in section [Shutdown and restart workloads](../../../Documentation/020_Operations/030_Day%20N%20Operations/030_Shutdown%20and%20restart%20workloads.md) with the workload as "Teamcenter FTS Indexer".  
>>>>>>> 5b273bd918e440478bbe59cecea6d04bb2fd3480
- Execute the following commands:  
  Note: Make sure that \$\{TC_USER_PASSWD_FILE\} points to the password file of this environment  
  - tcc exec 'echo 4 Y Y Y | $TC_ROOT/TcFTSIndexer/bin/runTcFTSIndexer -task=objdata:clear'
  - tcc exec '$TC_ROOT/bin/manage_model_files              -u=infodba -pf=\$\{TC_USER_PASSWD_FILE\} -g=dba -syncToDb'
  - tcc exec '$TC_ROOT/bin/bmide_generatetcplmxmlschema.sh -u=infodba -pf=\$\{TC_USER_PASSWD_FILE\} -g=dba'
  - tcc exec '$TC_ROOT/bin/bmide_setupknowledgebase.sh     -u=infodba -pf=\$\{TC_USER_PASSWD_FILE\} -g=dba -regen=false'
  - tcc exec '$TC_ROOT/bin/bmide_modeltool.sh              -u=infodba -pf=\$\{TC_USER_PASSWD_FILE\} -g=dba -tool=all -mode=install -target_dir=$TC_DATA -model_file=$TC_DATA/model/model.xml'
  - tcc exec '$TC_ROOT/bin/bmide_modeltool.sh              -u=infodba -pf=\$\{TC_USER_PASSWD_FILE\} -g=dba -tool=all -mode=upgrade -target_dir=$TC_DATA'
  - tcc exec '$TC_ROOT/solr-8.11.1/TcSchemaToSolrSchemaTransform $TC_DATA/ftsi/solr_schema_files'
  - tcc exec '$TC_ROOT/bin/awindexerutil                   -u=infodba -pf=\$\{TC_USER_PASSWD_FILE\} -g=dba -refresh -classification'
  - tcc exec '$TC_ROOT/TcFTSIndexer/bin/runTcFTSIndexer -task=objdata:index'
<<<<<<< HEAD
- Start sync pod as per instructions in section [Shutdown and restart workloads](../../../Documentation/Operations/Day%20N%20Operations/Shutdown%20and%20restart%20workloads) with the workload as "Teamcenter FTS Indexer".  
=======
- Start sync pod as per instructions in section [Shutdown and restart workloads](../../../Documentation/020_Operations/030_Day%20N%20Operations/030_Shutdown%20and%20restart%20workloads.md) with the workload as "Teamcenter FTS Indexer".  
>>>>>>> 5b273bd918e440478bbe59cecea6d04bb2fd3480



<!--
I have tested in TcX 2506 Base. The pref is already set correctly. No manual action needed anymore.
## Adjust Preference "CLS_is_presentation_hierarchy_active"
- Set preference **CLS_is_presentation_hierarchy_active** on **Site** level to value **true**.
- If this preference does not yet exist, create it.
-->