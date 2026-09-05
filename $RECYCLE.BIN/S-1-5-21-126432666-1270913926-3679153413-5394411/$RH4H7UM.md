# Deployment & Installation details

## Pre-Requisite for the App Deployment 

The following prerequisites must be met before deploying the **Teamcenter for Microsoft Teams**:

1. **MS Teams Tenant ID** : A unique identifier for the Microsoft Teams tenant must be available.
2. **MS Teams Admin Email** : A valid Microsoft Teams administrator email address is required.
3. **OpenAIOptIn**: Configurable value Open AI Tellme feature.
4. **ProblemReportFieldsDescription** : Multiple objects schema configuration for the application.
5. **SITE_ID** : Configurable value to uniquely identify the Teamcenter Site.
6. **SITE_DISPLAY_NAME**: Configurable value for Teamcenter site display name.
7. **MS Teams Tenant must be onboarded** : The Microsoft Teams Tenant must be onboarded before starting the deployment. 

# Deployment Steps: 

## Configuration for Teamcenter Teams Broker App Deployment
The Product Id for *Teamcenter for Microsoft Teams* application is **TC10104-XT**.

This product needs the presence of **TcBrokerInput** in the input Json. This is an object type input having the following structure: 

| **Parameter Name** | **Type** | **Description** |
|----------|----------|----------|
| TCTEAMSOpenAIOptin | Boolean | Configuration to enable/disable Open AI Tellme feature (*true/false*). This **_`OpenAIOptIn`_** value will be provided by the customer during the **Pre-Flight stage**. |
| TCTEAMSAdministratorEmail | Email | Administrator Email for Teamcenter Teams Broker Microservice for the tenant. This **_`AdministratorEmail`_** value will be provided by customers during the **Pre-Flight stage**. |
| TCTEAMSStamp | String | Enter the architecture stamp to be used. Specify the architecture stamp value as '__*default*__'. | 
| TCTEAMSProblemReportType | String | Enter a String value to specify the type for the problem report to be displayed on the Application. Specify the problem report type value as __*“ProblemReport”*__. |
| TCTEAMSProblemReportFieldDetails | String | Stringified JSON has the schema of multiple objects to be used in the app. It should be enclosed with a single quote __*(‘’)*__ only. This **_`ProblemReportFieldsDescription`_** value will be provided by customers during the **Pre-Flight stage**. |
| TCTEAMSTimeOutForPictures | Int | Specify the time out interval in minutes for an image to download in seconds. The default is __*5*__. |
| TCTEAMSApplicationId | String | Teamcenter Teams Application ID. Specify its value as __*TeamcenterTeamsApplication”*__. |
| TCTEAMSAccessKeyForNotification | SecretString | Access Key for Notifications. This will be generated during the onboarding script. Copy the value of field **“sharedAccessKey”** from **worflow-onboading-package.json** output file. |
| TCTEAMSConfigSyncEventHubConnection | SecretString | The connection string to the Event Hub, with send only connection string created at the "**configsync**" event hub level.  This will be generated during the onboarding script. Copy the value of the field **“configSyncTopicConnectionString”** from **broker-onboading-package.json** output file. |
| TCTEAMSResponsesEventHubConnectionString | SecretString | The connection string to the Event Hub, with send only connection string created at the "**responses**" event hub level. This will be generated during the onboarding script. Copy the value of the field **“responseTopicConnectionString”** from **broker-onboading-package.json** output file. |
| TCTEAMSCommandsEventHubConnectionString | SecretString | The connection string to the Event Hub, with listen only connection string created at the "**commands**" event hub level. This will be generated during the onboarding script. Copy the value of the field **“commandTopicConnectionString”** from **broker-onboading-package.json** output file. |
| TCTEAMSCommandsEventHubCheckpointStoreSasURL | SecretString | Connection URL for blob storage containers where checkpoints for commands Event Hub from TcBroker should be stored. This will be generated during the onboarding script. This will be generated during the onboarding script. Copy the value of the field **“checkpointStorageConnectionString”** from **broker-onboading-package.json** output file. |
| TCTEAMSTenantId | String | Tenant Id of the onboarded customer. This **_`Tenant ID`_** value will be provided by customers during the **Pre-Flight stage**. |
| TCTEAMSSiteId | String | Unique identifier for Teamcenter Site. This **_`SITE_ID`_** value will be provided by customers during the **Pre-Flight stage**. |
| TCTEAMSSiteDisplayName | String | Teamcenter site display name. This **_`SITE_DISPLAY_NAME`_** value will be provided by customers during the **Pre-Flight stage**. |

Below is a sample example of the configuration with dummy values:

**TcBrokerInput**:  
> **TCTEAMSOpenAIOptin**: true  
> **TCTEAMSAdministratorEmail**: test@abc.onmicrosoft.com  
> **TCTEAMSStamp**: default  
> **TCTEAMSProblemReportType**: "ProblemReport"  
> **TCTEAMSProblemReportFieldDetails**: `'[{"ProblemReport": {"object_desc":"write a description of the problem.","object_name":"write a brief summary of the issue"}},{"CustomObject":{"object_desc":"write a description of the problem.","object_name":"write a brief summary of the issue","start_date":"Identify the start date."}}]'`  
> **TCTEAMSTimeOutForPictures**: 5  
> **TCTEAMSApplicationId**: "TeamcenterTeamsBackendLocalhost"  
> **TCTEAMSAccessKeyForNotification**: "dummy_shared_access_key”  
> **TCTEAMSConfigSyncEventHubConnectionString**: "dummy_configsync_connection_string"  
> **TCTEAMSResponsesEventHubConnectionString**: "dummy_response_connection_string"  
> **TCTEAMSCommandsEventHubConnectionString**: "dummy_command_connection_string"  
> **TCTEAMSCommandsEventHubCheckpointStoreSasURL**: "dummy_checkpoint_connection_url"  
> **TCTEAMSTenantId**: "38d7653h-c4d8-2y65-s569-265rt8794f35"  
> **TCTEAMSSiteId**: "tcx123"  
> **TCTEAMSSiteDisplayName**: "Teamcenter 123"  


## Validation of successful deployment

To validate the deployment is successful and component service is up and running you can verify the content of the control plane manager database. The content should match with the configurations provided during the deployment run.

**Steps**:

1. Navigate to Azure Portal (https://portal.azure.com) and login with SPLM user account (e.g. user_id@splm.siemens.com).
2. Go to the resource group **rg-teamsapp-prod-b3dc**.
3. Open the Storage Account called **stctrlteamsappprodbq**.
4. Navigate to the table called **controlplaneDB**.
5. Find the entry where **PartitionKey** matches the onboarded Tenant ID. Open the entry by double-clicking the row.
6. Verify the following parameters are configured correctly on the panel opened:
> - Value of the field _OpenAIOptIn_ should match with the value provided for _TCTEAMSOpenAIOptin_ field during deployment.
> - Value of the field _ProblemReportFieldsDescription_ should match with the value provided for _TCTEAMSProblemReportFieldDetails_ field during deployment.
> - Value of the field _ProblemReportType_ should match with the value provided for _TCTEAMSProblemReportType_ field during deployment i.e. _ProblemReport_ . 
> - Value of the field _TimeoutImagesUploadDownload_ should match with the value provided for _TCTEAMSTimeOutForPictures_ field during deployment.

![Image](./005_img_validation_1.png)
7. Click on __*Cancel*__ button to close the panel.


# Post Deployment Steps: 

After the successful deployment of the application, we need to run the onboarding script again to update the __*TARGET_XAPP_CLIENTID*__ configurations for that tenant. 

To update the __TARGET_XAPP_CLIENTID__ we need to first get its value from the SAM auth console. 

## Fetching TARGET_XAPP_CLIENTID from TcX Vault 

1. Login to TcX vault for the deployed account. 
![Image](./003_img_vault_login.png)
2. Go to the secret path as __*Secrets -> secret -> tcx -> automation -> tcss -> samauthcreds*__
3. Copy the value of the __*client_id*__ key to be used in next step as **Target xAPP Client Id**. 
![Image](./004_img_vault_client_id.png)
4. Share the value of the client Id with the customer using SecuFx. 


## Create Preference in Active Workspace for Notification 

Create the following preferences in the active workspace using the information provided in the table: 

| Sl. No | Name | Product Area | Description | Protection Scope | Environment | Type | Multiple Values | Values |  
|---|---|---|---|---|---|---|---|---|
| 1 | TC_Event_Hub_AccessKeyName  | Active Workspace | Name of the access key field for the notification EventHub.  | Site  | Disabled  | String | No | Copy the value of the field __*“sharedAccessKeyName”*__ from **worflow-onboading-package.json** output file. |
| 2 | TC_Event_Hub_Namespace  | Active Workspace | Name of the EventHub namespace field for the notification.  | Site  | Disabled  | String | No | Copy the value of the field __*“namespace”*__ from the **worflow-onboading-package.json** output file. |
| 3 | TC_Event_Hub_Path  | Active Workspace | Path of the EventHub for the notification.  | Site  | Disabled  | String | No | Copy the value of the field __*“entityPath”*__ from **worflow-onboading-package.json** output file. |
