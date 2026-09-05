## Pipeline Automation Details

### Pipeline Automation
This section describes how to deploy the Multisite HTTP configuration using the CAPA input. Find the CAPA input details below.

#### Information Gathering

To complete  the automation you will need to gather information for your install. 

#### Configuration information supplied about on-prem systems to CApS**

| Information |	Location |
|------------|---------|
| Proxy User Credentials | Teamcenter Vault - Secrets | 
| Site ID and Site Name	| Use site_util utility with -list |
| WebTier SOA URL|  |	
| FSC URL |  |	
| Symmetric encryption key, jceks file and epassword |


#### Configuration information supplied about TcX system to on-prem team

| Information |	Location |
|------------|---------|
| TcX Site ID and Site Name | Use site_util utility with -list |
| WebTier URL |  | 	
| FSC fmsmaster URL | 	|
| TcX proxy user credentials |  | 	

#### Ansible and GitLab set up
You will need to make sure you can do the following: 
Open Ansible Tower and have access to the Templates. You will also need to have gitlab key and vault key. Please refer to the Tools SetUp section of the cookbook and the Ansible Template Input sections for information. Refer to these areas for detailed descriptions.

#### Vault 
In order to save the passwords for the proxy user, you will need to add this information into the vault. Please 

#### Process
The idea behind this is that you will run an automation script first that will install TcX, then you will rerun it in maintenance mode to add the MultiSite parts to the installation. Once the first install runs you will need to gather the information about the installed site. This will allow you to use the information to then add it to the Multisite install to connect both sides together. 

### Pipeline Install
Once you have this information, you will need to log into ansible. You will now need to select Templates and search for Dev.TcX.Deployment-1.0 
 
Select it and it will bring up the details page
 
From here you will select launch, and you will get this screen.
 
From here, enter your GitLab Personal Key and your vault Token Key

**Example**
```
 Vault Token:
        abc.AESIB3ffKhh< REPLACE ME >Z3SGZNVkNseFFrazB

GitLab Personal token:
    PLGL-US-X< REPLACE ME >KRV-
```
Then you will add the customer input for your environment. When you are finished hit launch. 

Entry Information: You will need to enter a company ID and company name and environment name. You will also need the Admin Email information from the customer.

#### Sample CAPA Input:
```
    Description: Pipeline Run
    CustomerID: famsx001
    Company: famsx001
    Environment: prd1
    dnsSubdomainName: famsx001prd1
    TcxCliRequirement: teamcenterx==4.0.51
    TcXAdminEmail: tcxtest.siemens@gmail.com
    NotificationEmailId: stacy.reid@siemens.com
    PipelineStage: deploy
    TeamcenterProductIDList:
        - TC7003-XT
        - TC7030-XT
        - TC10408-XT
    CellId: depops-preprod05-us-east-1
    SamAuthAccountID: < REPLACE ME >
    SamAuthUserAccessKey: < REPLACE ME >
    SamAuthUserSecretAccessKey: < REPLACE ME >
    DSSAccountID: < REPLACE ME >
    DSSUserID: < REPLACE ME >
    DSSUserAccessKey: < REPLACE ME >
    DSSUserSecretAccessKey: < REPLACE ME >
    DefaultUserSamId: < REPLACE ME >
    Enable_SSO: true
    FeatureHighAvailableDeployment: false
    IstioMeshGatewayNamespace: istio-xcr
    IstioMeshTlsSecret: tls-secret
    ProcessTarget: "0700 5, 1800 3"
    ProcessMax: 10
    ProcessWarm: 3  
    SMTPPassword: < REPLACE ME >
    SMTPUserName: < REPLACE ME >
    PipelineCloud: "906956190433"
    EnterpriseCloudAccountId: '5003< REPLACE ME >610'
    DeployDispatcher: true
    TenantSamAccountId: < REPLACE ME >
    PipelineVersion: main
    PipelineVariableVersion: main
    TcXVersion: br.2512.0000
    IstioMeshTlsSecret: tls-secret
    ProcessTarget: "0700 5, 1800 3"
    ProcessMax: 10
    ProcessWarm: 3
    SMTPPassword: < REPLACE ME >
    SMTPUserName: < REPLACE ME >
    PipelineCloud: "906956190433"
    EnterpriseCloudAccountId: '500< REPLACE ME >810'
    DeployDispatcher: true
    TenantSamAccountId: < REPLACE ME >
    PipelineVersion: main
    PipelineVariableVersion: main
    TcXVersion: br.2606.0000
    PipelineRolesVersion: multisiteEnableODS
    PipelineExternalRolesVersion: main
```

You will need to repeat this for Site2 if you are doing a TcX to TcX configuration. If you are using an onPrem to TcX configuration, you will only do this for the TcX side. 

### MultiSite Install
Once this is completed you will need to repeat this to add the MultiSite Configuration. 
You will need to gather the information for your other site (onPrem or other TcX site) You will also need the fsc authentication information. If you are doing this for your site1, you will need site 2’s information, for example, and add this to the MultiSite section. 

**important notes**


Multiple Sites - 

If you are creating installs for more than two sites, you will need to register your site information for your additional sites into the vault secrets. Please see the vault section of the cookbook for details. Here is what it looks like as an example.

![Image](./Secrets.png)

Symmetric Keys - 

Symmetric key must be the same in all sites. You need to update the site 2 key with site 1's key information but don't change site 1's key. First you will need to update the key in vault secrets and then, before you run the MultiSite Install be sure to add the informaiton in the input under the TcMultisiteFMSSymmetricKey section. The key will look like this in the vault. 

![Image](./symmetrickey.png)

### Sample Input 
```
    Description: Pipeline Run
    CustomerID: famsx001
    Company: famsx001
    Environment: prd1
    dnsSubdomainName: famsx001prd1
    TcxCliRequirement: teamcenterx==4.0.51
    TcXAdminEmail: tcxtest.siemens@gmail.com
    NotificationEmailId: stacy.reid@siemens.com
    PipelineStage: deploy
    TeamcenterProductIDList:
        - TC7003-XT
        - TC7030-XT
        - TC10408-XT
    CellId: depops-preprod05-us-east-1
    SamAuthAccountID: < REPLACE ME >
    SamAuthUserAccessKey: < REPLACE ME >
    SamAuthUserSecretAccessKey: < REPLACE ME >
    DSSAccountID: < REPLACE ME >
    DSSUserID: < REPLACE ME >
    DSSUserAccessKey: < REPLACE ME >
    DSSUserSecretAccessKey: < REPLACE ME >
    DefaultUserSamId: < REPLACE ME >
    Enable_SSO: true
    FeatureHighAvailableDeployment: false
    IstioMeshGatewayNamespace: istio-xcr
    IstioMeshTlsSecret: tls-secret
    ProcessTarget: "0700 5, 1800 3"
    ProcessMax: 10
    ProcessWarm: 3
    SMTPPassword: < REPLACE ME >
    SMTPUserName: < REPLACE ME >
    PipelineCloud: "906956190433"
    EnterpriseCloudAccountId: '5000< REPLACE ME >10'
    DeployDispatcher: true
    TenantSamAccountId: < REPLACE ME >
    PipelineVersion: main
    PipelineVariableVersion: main
    TcXVersion: br.2512.0000
    IstioMeshTlsSecret: tls-secret
    ProcessTarget: "0700 5, 1800 3"
    ProcessMax: 10
    ProcessWarm: 3
    SMTPPassword: < REPLACE ME >
    SMTPUserName: < REPLACE ME >
    PipelineCloud: "906956190433"
    EnterpriseCloudAccountId: '50< REPLACE ME >810'
    DeployDispatcher: true
    TenantSamAccountId: < REPLACE ME >
    PipelineVersion: main
    PipelineVariableVersion: main
    TcXVersion: br.2606.0000
    PipelineRolesVersion: multisiteEnableODS
    PipelineExternalRolesVersion: main
    TcMultisiteInput:
        TcMultisiteSiteCreateModify: ms_createSite
        TcMultisiteRemoteSiteName: site2
        TcMultisiteRemoteSiteID: -1648106290
        TcMultisiteRemoteSiteUrl: https://tmmsx001prd1.testplmcloudsolutions.com/tc
        TcMultisiteProxyUser: msproxy
        TcMultisiteProxyRole: DBA
        TcMultisiteProxyGroup: dba
        TcMultisiteLocalProxyUser: msproxy
        TcMultisiteLocalProxyRole: DBA
        TcMultisiteLocalProxyGroup: dba
        TcMultisiteProxyUserPWDFile: /apps/tc/security/site2_msproxy.pwf
        TcMultisiteProxyUserPWD: < REPLACE ME >
        TcMultisiteCheckoutSiteName: site2
        TcMultisiteODSSite: site2
        TcMultisiteTransferArea: /tmp
        TcMultisiteRemoteFscID: FSC_authenticatingfsctmmsx001prd1
        TcMultisiteRemoteFscURL: https://tmmsx001prd1.testplmcloudsolutions.com:443/tc/fms/authenticatingfsc
        TcMultisiteFMSSymmetricKey: < REPLACE ME >
        TcMultisiteUpdateLocalSiteAsODS: y
```

#### Install Wrap-Up

**Change Site Names**

Once you complete this you will need to change the site names so that they are more identifiable to the customer. You will need to do this on both sites for all of the site names. For example, if one site is in Canada and the other site is in Germany, you can name each site Canada and the other Germany rather than Site1 and Site2.
Using your commandline tool you will run the site_util to update the Site Names of both site1 and site 2.

In EC2 – Command prompt from tc-adminutil  use the three dots and select exec shell
sudo su - tcx_user
. tcc set_context cutcx001 prd1

Record Site Information from Both Sites

Run on both sites and record the results:

tcc exec 'site_util -u=infodba -pf=/apps/tc/security/default_infodba.pwf -g=dba -f=list'
This will display the site table entries.
Note: The Site ID is immutable and is a unique identifier.

**Example of Results:**

| Site Name | Site ID | AWS Env Name | Public URL |
|----------------|---------|--------------|------------|
| IMC---1689205668 | -1689205668 | mulst620 | https://mulst620.testplmcloudsolutions.com |
| IMC--1689205701 | -1689205701 | mulst621 | https://mulst621.testplmcloudsolutions.com |

Do this for both sites on both site 1 and site 2. So on Site 1 change the site names of both site 1 and 2 and on Site 2 change the site names of both site 1 and site 2. 

**Example:**

tcc exec ‘site_util -u=infodba -pf=/apps/tc/security/default_infodba.pwf -g=dba -f=modify -site_id=-1689205668 -site_name=site1 

**Validate your install**

Once this is complete, we suggest you check that your FSC and tcadmin pods are restarted correctly. If not, restart your pods. Then, log into each site and verify the connection. Use the Checking for success section of this document to guide you.
