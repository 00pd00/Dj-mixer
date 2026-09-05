## Deploying IDF file on the TcX server

Specific Integration Definition Files (IDF) must be deployed on the Teamcenter X server for “Teamcenter integration for Rhapsody v2412” to work properly.

The IDF to deploy is located in the installation folder of “Teamcenter integration for Rhapsody v2412” in `IDF/2406` or `IDF/2412` depending on the target version of Teamcenter.

> **Note:** File a service ticket to update the Teamcenter X server with the new IDF.

The `RHAPSODY_BHMIntegrationDefinition.xml` shipped along with the installable must be imported on the Teamcenter server using the command below:

```
import_file -u= -p= -g=dba -f= -d=RHAPSODY _BHM_INT_DEF_FILE -ref=Text -type=Text -de=r
```

Replace the IDF within the Dataset: `RHAPSODY_BHMIntegrationDefinition`  
Make sure the dataset name remains unchanged after file upload.

Alternatively:

```
import_file -u=infodba -p=pw_infodba -g=dba -f=<IDF path + Name>  -d= RHAPSODY_BHMIntegrationDefinition -ref=Text -type=Text -de=r
```

To use Teamcenter integration for Rhapsody v2412, the user has to update the default mapping file to the one provided in the installation kit. These steps need to be performed if a custom mapping file has been defined in your organization.
