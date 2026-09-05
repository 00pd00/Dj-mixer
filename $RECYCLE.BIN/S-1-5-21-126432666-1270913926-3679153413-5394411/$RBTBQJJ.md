## Post Deploy   Configuration Instructions

### Deploying IDF file on the TcX server

The end of the installation process of SMW will display a pop-up dialog indicating that specific additional operations must be performed on the associated Teamcenter server.
Specific Integration Definition Files (IDF) must be deployed on the Teamcenter server for SMW to work properly.

The IDF to deploy is located in the installation folder of SMW within the "IDF" folder. This folder contains subfolders depending on the target version of Teamcenter the IDF needs to be deployed on.

NOTE: File a service ticket to update the Teamcenter X server with the new IDF. 

Replace the IDF within the Dataset: SYSML_BHM_INT_DEF_FILE
Make sure the dataset name remains unchanged after file upload
Alternate:
```
import_file -u=infodba -p=pw_infodba -g=dba -f=<IDF path + Name>  -d=SYSML_BHM_INT_DEF_FILE -ref=Text -type=Text -de=r
```

### Configuring System Modeling Workbench

Connecting SMW to Teamcenter requires additional configuration. This can be manually configured by the user through the SMW UI (refer to the SMW User Guide for details) but default values can also be provided through properties files to avoid this additional user step.

To achieve this, a file named fr.obeo.plm.teamcenter.preferences.prefs must be added in the SMW installation folder '[_installation_folder_]\capella\configuration\.settings'.
This file should look like the following (the keys before the equal sign '=' must be left as is, the values after the equal sign must be set according to the Teamcenter configuration):

sysml.staging.directory = C:\Apps\teamcenter\staging

Transport = tccs

End users can also create this file so that they don't have to set the preferences in every workspace they use in SMW.


