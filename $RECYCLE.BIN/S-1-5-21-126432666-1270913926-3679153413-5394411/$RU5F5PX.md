Following section contains Product Integration Documentation information

==========================================================================
These are the steps for Polarion 2512 which are same as Polarion 2410 

1. Enabling the TcX Integration

Applicable Polarion X Version:  2410+
**NOTE:** This cookbook is only for new customers w/ PolarionX 2410 on admin console. Migrating existing Polarion customers requires user migration and more operations with customer alignment.
Applicable Teamcenter X Version (containerized): 2412.0002+

Required Teamcenter components to be installed:
    •	Teamcenter Polarion Direct Integration (PLN1501)
    •	Gateway for Model Management (TC31018-XT)
    •	Requirements Management (TC030101-XT)
    •	Verification Management (optional: only required if customers plans to integrate test cases) (TC030202-XT)

**Pre-requisite:** Customer MUST be using the Admin Console (See **Polarion X 2410 Cookbook - 2.9 Configure Admin Console**); the user ID must be **identical (specifically SAM ID)** for the same user in both Polarion and Teamcenter.  **NOTE:** if the user ID is using an email address this should be changed to use a SAM ID, otherwise this will require approval from Polarion executive management, since this is non-compliant to security protocols. 
**Pre-Requisite:** Ensure that the PolarionX and TeamcenterX SAM Auth Apps are in the same tenant ID.
  1.1 Install the Polarion X side Integration

These steps are described in the Polarion X 2410 Cookbook.
Download the Teamcenter Connector (.zip archive) from https://support.sw.siemens.com/en-US/product/230235217/downloads/additional/Teamcenter%20Connector  (it should be version 2412.0002 or above)
    1.	Stop the Polarion server
    2.	Deploy the content of the .zip archive into the Polarion 'extensions' folder. 
    (Polarion Installation Folder\polarion\extensions\)
    3.	Verify that the folder structure is as followed: 
    Polarion Installation Folder\polarion\extensions\com.teamcenter.direct.integration
    4.	In the same extensions directory:
        1.	Change the permissions of the integration jar files to 777
    5.	Create the following folder: /etc/Siemens/MBSE/bhm folder on the Polarion server 
    6.	Change permissions of the /Siemens/MBSE folder to 777
    7.	Delete the Polarion Installation Folder\data\workspace\.config directory
        1.	NOTE: This directory may hidden from normal views, but it must be deleted.
    8.	Modify the polarion.properties and add the following section:
    9.	Some important values to be added to polarion.properties should be as below:
        1.	TC_SERVER_URL=https:// servername /tc 
        2.	com.siemens.polarion.tc.uri=https:// servername /tc 
        Note: This should point to the TC server gateway URL of TeamcenterX
        3.	TC_SSO_APP_ID=tcxaw
        Note: This should be the Teamcenter App ID in the TcSS configuration
        4.	STAGING_DIR=/opt/polarion/Staging 
        Note: This should be any writable directory on PolarionX server
        5.	AW_URL=https:// servername /awc 
        Note: This should be TeamcenterX Active Workspace URL
        6.	com.siemens.polarion.security.appId=Polarion 
        Note: This value should be same as configured in TcSS for PolarionX app id
        7.	BOOTSTRAP_URLS=https:// YOUR TEAMENTER SERVER : port  
            1.	The port is typically the same as the FMS port (e.g. 4544)
    #===========================================================================
    # Teamcenter Configuration
    # 
    # TC_SERVER_URL        - Defines the default Teamcenter Server URL (Required)
    # AW_URL               - Active Workspace Client URL (Required)
    # ACTIVE_HOST_URI_KEY  - Active Workspace Client hostkey (Optional)
    # STAGING_DIR          - Define the cache and staging directories (Required)
    # BOOTSTRAP_URLS       - FMS Bootstrap URL (Currently Required but will be 
                        - optional once CIS provide support)
    # TEMP_FMS_DIR         - Temporary FMS Directory (Optional) Ex. path of %TEMP% vaiable
    # TC_CLIENT_CACHE      - Use Tc client cache as derby needs to be true
    # IS_TCCS              - Flag to define if TCCS enabled (Optional)
    #===========================================================================
    AW_URL=https://[YOUR ACTIVE WORKSPACE CLIENT URL]:3000
    TC_SERVER_URL=https://[YOUR DEFAULT TEAMCENTER SERVER URL]/tc
    STAGING_DIR=C:\\bhm\\staging

    #===========================================================================
    # SSO Connection Variables
    # ------------------------
    # Set the following variables to define the target Teamcenter SSO server,
    # Application ID and SSO Session flag value.
    #
    # Below Fields are required if SSO enabled.
    #
    # TC_SSO_APP_ID    - Defines the default Teamcenter SSO Application ID.
    #
    #===========================================================================
    TC_SSO_APP_ID=tcxaw

    1.  Verify that the BHM CommonClient.properties file:
        1.	AWC_WEBLOGIC_HOST_URI= https://  YOUR ACTIVE WORKSPACE CLIENT URL : port 
            1.	The port is the AW port (e.g. 3000)
        2.	BOOTSTRAP_URLS=https:// YOUR TEAMENTER SERVER : port 
            1.	The port is typically the same as the FMS port (e.g. 4544)
        3.	NOTE: These values will ONLY be set after a Polarion publish to Teamcenter action. If these values DO NOT get set, then add them manually to the CommonClient.properties file. If this file is updated manually, then Delete the Polarion Installation Folder\data\workspace\.config directory (NOTE: This directory may hidden from normal views, but it must be deleted.) Then restart the Polarion server.
    2.	Pre-Requisite: Ensure that the PolarionX and TeamcenterX SAM Auth Apps are in the same tenant.
    3.	Create an additional NEW Sam Auth Application for the purpose of supporting the Polarion token exchange process:
        1.	 
        2.	App Name: polarionxtokenexchange
        3.	Redirect URIs leave blank
        4.	Application URIS leave blank
        5.	Check Token Exchange Grant in the OAuth2 Grant Type
        6.	Check none in the Resposne Type
    4.	In the other SAM Auth Application for Polarion X
        1.	Add following redirect URI (keep the originals there): 
    	    Polarion Server URL/polarion/refreshToken/reauth
    5.	Modify the authentication.xml (located in /opt/polarion/data/authentication/)  by adding a new section under the  oauth2 id="SAM_Login" default="true"  configuration.

     authentication xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xmlns="http://polarion.com/PolarionAuthentication" 

     oauth2 id="SAM_Login" default="true" 
    (...) REST OF THE AUTHENTICATION FILE STAYS THE SAME
    ADD THIS NEW SECTION BEFORE THE  /oauth2  CLOSING TAG
         tokenExchangeParameters 
         tokenExchangeParametersSetting usedFor="TcAuthentication" 
             tokenUrl -- CAPS -- USE SAME SETTING AS EXISTING  tokenUrl  ABOVE /tokenUrl 
             clientId -- CAPS -- USE THE  clientID  FROM THE TcX TOKEN EXCHANGE APP /clientId 
             clientSecret -- CAPS -- USE THE  clientSecret  FROM THE TcX TOKEN EXCHANGE APP /clientSecret 
             parameter name="audience" -- CAPS -- ADD TcX (Not Token Exchange App) Client ID /parameter 
             parameter name="scope" openid sam_account profile /parameter 
         /tokenExchangeParametersSetting 
         /tokenExchangeParameters 
     /oauth2 
     /authentication 
        a. To aid you in locating where these values are, please refer to these steps:
            1.	Login to TcX corporate server (or web server if it is HA deployment)
            2.	Copy and unzip /siemens/jboss_wildfly/version/standalone/deployments/loginservice.war
            3.	Locate the TcX Client ID in WEB-INF/classes/federation.properties

    1.	Restart Polarion
    2.	Enable the Teamcenter widget for Polarion work items
    Open the scope (project or global) that you want to configure the integration for and enter -  Administration.
    In Navigation, select  Work Items -  Form Configuration.
    Under Form Layouts, click "Edit" beside the Work Item Type you want to configure the integration for.
    Add the following where you want the widget to appear in a Work Item.
     extension id="linkedTeamcenterItems"/ 
    Click Save.
    
    3.	Enable the Teamcenter widget in the LiveDoc Properties and Work Item sidebars
    Open the scope (project or global) that you want to configure the integration for and enter -  Administration.
    In Navigation, select Documents and Pages -  Document Properties Sidebar.
    Add the following where you want the widget to appear in the sidebar.
     extension id="linkedTeamcenterItems"/ 
    Click Save.
    In Navigation, select Documents and Pages -  Work Item Properties Sidebar.
    Add the following where you want the widget to appear in the sidebar.
     extension id="linkedTeamcenterItems"/ 
    Click Save.  
  
**NOTES:**
    •	PolX and TcX users must be the same.
    •	Every Polarion X customer that will use the integration will have to be on Admin Console.
    •	User IDs in PolX and TcX must be the same… and Polarion X will be configured to use sws.samauth.ten.user 
    •	Check the Polarion Monitor for any Job failures within this integration
  2 Polarion Teamcenter Direct Integration post-install steps
  2.1 Register PolarionX sign out URI in SAMAuth console
To ensure the logout works from PolarionX; add the TcSS logout URI https:// polarionxserver /polarion/login/tcssLogout (e.g. https://polxdr002.plmcloudsolutions.com/polarion/login/tcssLogout ) for the PolarionX instance as below. Ensure that the Polarion server name is correctly captured in the URI.
  
  2.2 Update the Integration Mapping file
NOTE: For HA environment; execute these steps on all the corporate servers.
    1.	Download the mapping file from [https://artifacts.industrysoftware.automation.siemens.com/ui/native/generic-local/com/siemens/tcx/tcx_solutions/polX/POLARION_BHMIntegrationDefinition.xml] and save it to a temporary location e.g. /tmp/PolX/POLARION_BHMIntegrationDefinition.xml.
    2.	Run below command on Teamcenter Command Prompt. Provide the correct full path to the POLARION_BHMIntegrationDefinition.xml file. Use the Teamcenter installation user e.g. infodba for executing this command.
import_file -u= userid  -p= password  -g=dba -f=/tmp/PolX/POLARION_BHMIntegrationDefinition.xml -d=POLARION_BHM_INT_DEF_FILE -ref=Text -type=Text -de=r
  2.3 ALB Configuration Details (Must be completed for TcX 2412)
Please refer to section 5.5.12 for the Teamcenter Integration for PolarionX of the TcX 2412 CookBook for more details. 
 cTcX CookBook 2412 DO NOT USE ([https://mypolarion.industrysoftware.automation.siemens.com/polarion/#/project/Teamcenter/wiki/Project%20Storm/cTcX%20CookBook%202412])
This integration configuration steps required only if PolarionX is deployed in separate VPC than TcX tenant specific VPC on AWS.
  2.4 Architecture Diagram(s)
  
See TCX Extended - SAM SAMAuth IdP Cookbooks for more details on IDPs, TcX with SAM.

Refer this Link for Images : [https://mypolarion.industrysoftware.automation.siemens.com/polarion/#/project/Teamcenter/workitem?id=LCS-1269887]
