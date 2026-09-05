
After the T4SUST feature is installed, create below configurations to integrate with LCA provider. 

- Preference configuration 

Below preference will be added in Teamcenter during installation of Sustainability feature. To enable ‘Calculate Impact’ command in AWC , privileged user needs to adjust below preferences.
  - Login to the TCX environment through AW as a dba privileged user. 
  - Open preferences and search the preferences mentioned in below table
  - Ensure Object types are up to date with correct values in preference

```
| Preference                  | Value                     | Description                                                                                             |
|-----------------------------|---------------------------|---------------------------------------------------------------------------------------------------------|
| AllowedTypes_Sustainability | Teamcenter Object types   | ‘Calculate Impacts’ command will be available for the Part and Design types which are mentioned in this preference value list. |
```

Prerequisite: 
- LCA provider tenant is created and accessible 
- LCA Provider shares the following details
  - Get base URL for LCA provider service endpoint (host details)
  - Get client_id
  - Get client Secret code  

- Setup communication channel to integrate with LCA provider 
    - Log into Admin UI GS of first GS (import GS) with AIG Admin portal 
    - Navigate to Communication channel -`>` Configuration
    - Define new communication channel by providing Name, Description, communication type and endpoint url 
    - Test the channel using Test communication feature in AIG 
    - Save and restart required services

   ![Image](./image_4.png)



   ![Image](./image_5.png)



- Create the job agent
    - Click Menu -`>` Configuration
    - Select Job Agent and Click + button
      ![Image](./CreateJobAgent.png)
    - Select setting or keep default as follows and Apply
      ![Image](./CreationWindow.png)
    - Click on Tick as follows
      ![Image](./ClickTick.png)  


- oAuth setup

It is basically server to server communication, therefore make sure AIG has network access to oAuth provider.
  - Open AIG Admin portal and login using administrative account
  - Click Menu -`>` Script
  - Navigate to oAuth connection configuration ("Manage OAuth2 outbound connections for EA systems")
  - Provide appropriate connection parameters like Name, Application ID, Application secrete 

    ![Image](./image_7.png)

- Database Connection Alias and Test
    - Open AIG Admin portal and login using administrative account
    - Click Menu -`>` Script
    - Select "Tc database connection test"
    - Enter valid parameter as follows
    ![Image](./DatabaseConnection.png)
    
- Deploy Mapping

   - Copy sd files as follows - 
   - Copy from - gs_root\var\template\sim\mmap\sim_mapping_config --> gs_root\var\mmap\sim_mapping_config
   - Copy from gs_root\var\template\t4x\mmap\t4x_mapping_config% --> gs_root\var\mmap\t4x_mapping_config 
   - Open AIG Admin GS portal and Select Script "Generate mapping and mapping deployment"
   - Run script with follow parameter and Restart GS

   ![Image](./GenerateMapping.png)

- Alias creation - connection details and configuration

  ![Image](./AliasSetupForT4SUST.png)



- Update Configuration after Alias is defined, make entry into 
  - Locate configuration file under 
```bash
%<gs_root>\var\mmap\t4sust_mapping_config\t4sust_mapping_config.sd%
``` 
  - Add entry of defined Alias in the previous step
  - Save file, generate mapping and deploy 

    ![Image](./image_9.png)

 - Run the script "SEMANTIC INTEGRATION MODEL GENERATION SCRIPT" as follows
   - Select 'Semantic Integration Model API Version' as 2.1 and Run the script
   ![Image](./image_10.png)
   - Select 'Semantic Integration Model API Version' as 2.2 and Run the script
   ![Image](./image_11.png)
   - Restart the GS