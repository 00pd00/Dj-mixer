# Tc On-prem to TcX Configuration Checklist 

## Introduction

This document will provide a checklist to deploy a Tc on-prem to TcX Multisite configuration. Target on-prem versions for this document are Tc 14.2 to Tc 2406. Target TcX version of TcX 2506 or TcX2512. It may still be relevant in TcX 2606.

Target audience for section 1 is on-prem configuration, usually by services Team.  
Target audience for section 2 is TcX configuration, usually by Siemens CApS team. 

## On-prem site configuration 

### Planning 

Is VPN required by the customer for their ingress points. Coordinate with Services and CApS. 

### Prerequisites 

Base Teamcenter installed. 
Multisite Integration and Multisite Integration Client applications installed. 
Get TcX site id, WebTier SOA URL, and FSC URL from CApS.
Ex. https://agmsx001prd1.plmcloudsolutions.com/tc
Ex. https://agmsx001prd1.plmcloudsolutions.com/tc/fms/fmsmaster

Get TcX ms proxy user credentials from CApS
Shares on-prem site id, WebTier SOA URL and FSC URL to CApS. 
Shares on-prem symmetric encryption key, jceks file and epassword settings with CApS. 
    If symmetric key and jcek file not yet configured, see  TDoc topic Configuring symmetric keys 
Create local proxy user and share credentials
    Use install -encryptpwf testpass -f=< filename > to store password file in $TC_ROOT/security.
Share local proxy user credentials.  

### Configuration 

Install multisite integration and multisite integration client applications (DC) 
Create TcX site table entry with remote site id and WebTier URL 
    Use RAC organization panel or site_util utility. 
Standard Multisite minimum preferences 

| Preference | Description | Owner |
|----------------|---------|--------------|
| IDSM_permitted_sites| Sites that can access your data via the IDSM server| Existing multi-site preference|
| IDSM_permitted_transfer_sites| Sites that are authorized to transfer ownership of objects owned by the site served by an IDSM server| Existing multi-site preference |
| ODS_site | The default Object Directory Services (ODS) site| Existing multi-site preference |
|ODS_permitted_sites |Sites that can access the Object Directory Services (ODS) database | Existing multi-site preference | 
| ODS_publication_sites | ODS sites which can be published to | Existing multi-site preference 
| ODS_searchable_sites | ODS sites that Teamcenter searches for published remote objects during a remote search | Existing multi-site preference |
| TC_transfer_area | The server directory for temporarily storing data during import and export | Existing multi-site preference 

 
### HTTP Multisite preferences 
| Preference | Description | Owner |
|----------------|---------|--------------|
| TC_SSO_enabled | Enable SSO configuration, set the value to true | http multi-site specific |
| TC_alternate_sso_proxy_table | Lists the remote proxy user authentication credentials by site | http multi-site specific, Created by data_share |
| TC_alternate_sso_client_proxy_table | Server side preference that lists which sites have HTTP Multi-Site access and the authorized proxy user for each site | http multi-site specific |
 
Point TEAMCENTER_SSL_CERT_FILE in profilevars current version of curl cacert.pem file.  
Downloadable from https://curl.se/docs/caextract.html 

### FMS setup 
FMS master multisite import section. It should point to fmsmaster instead of authenticate fsc. 
Requires FMS patch pre 2412. The patch is for defaultloadbalancerimport support and container recognition. 

Example: Note the new defaultloadbalancerimport predicate. 

**Entry Example** 
```
   <fmsworld>
   <multisiteimport siteid="-1653445533">
        <defaultloadbalancerimport fscid="FSC_fmsmaster" fscaddress="https://agmsx001prd1.plmcloudsolutions.com:443/tc/fms/fmsmaster" priority="0"/>
    </multisiteimport>
```

Polarion tracking number of the fixes (only need if on-prem version is pre-2412 release):

    LCS-1254428 - FMS load balancer support in multisite import section for Stellantis  : Fixed in Tc2412. 

    LCS-1256896 - Failed: MultiSite - OnPrem to TcX Validation between 2 sites : Fixed in Tc 2406 – Tc 2506 patched FMS versions.  

AM Rules, allow or disallow ops depending on customer business processes. 

## TcX site 
(multi-site support since 2506.0003 with manual configuration, and pipeline support since 2506.0006) 

### Planning 
If VPN is required, CApS  will coordinate with on-prem Services team. 

### Prerequisites 
Run multisite pipeline config (refer to cookbook) 
Verify multisite integration and multisite integration client applications installed 
Share TcX site id, WebTier URL, FSC URL  
Share TcX ms proxy user credentials. with on-prem team.. 
Get on-prem site id, WebTier URL, FSC URL 
Get on-prem symmetric encryption key, jceks file and epassword settings  

### Configuration (See details in TcX cookbook) 
Create on-prem site table entry 
Standard Multisite Preferences 
TC_alternate_sso_proxy_table   
TC_alternate_sso_client_proxy_table  

TEAMCENTER_SSL_CERT_FILE in profilevars point to version $TC_DATA/multisite 

### FMS 

    1. FMS master multisite import section 
    2. Install DB symmetric key 
    3. Copy on-prem jceks file to fmsmaster and authfsc install fmsmaster keystorealias ticket setting 
    4. fmsmaster key and epassword in fscadmin.properties 
    5. msmaster key and epassword in fsc.
    6. FSC_authenticatingfsc.properties 
    7. AuthFSC keystorealias ticket setting 
    Note: AuthFSC still needs this update even if not used for multisite. 
    8. AuthFSC key and epassword in fscadmin.properties 
    9. AuthFSC key and epassword in fsc.
    10. FSC_authenticatingfsc.properties 
    11. Whitelist fmsmaster ingress at ALB level. Work with VPN team if needed.  
    12. Supported by pipeline operation update_ALB_rules step. 
AM Rules, allow or disallow ops depending on customer business processes. 

## Addendum: Whitelist TcX fmsmaster using ALB 

### Step-by-Step Instructions 
#### Identify the Target ALB 

    1. Go to the EC2 Dashboard in the AWS Management Console. 
    2. Under Load Balancing, click Load Balancers. 
    3. Select the ALB associated with the TcX instance you want to configure. 

#### Create a Listener Rule 

    1. In the ALB details, go to the Listeners tab. 
    2.Choose the listener (HTTPS:443) and click View/edit rules. 
    3. Click the "+" icon to add a new rule. 

#### Configure the Rule to Whitelist an IP 

    Condition:  
        Choose Source IP. 
        Enter the IP address or CIDR block you want to allow (e.g., 203.0.113.5/32). 
    
    Action:  
        Forward to the appropriate target group for your service. 

Ex.  
Rule 10 is the original TcX ALB rule for fmsmaster and others services that allows internal access.  
Rule 9 was added to specifically allow IP address 192.161.1.100/32 to access fmsmaster. In the real world this IP address would be the source IP address of the on-prem system connecting to the fmsmaster FSC.  
TODO: LCS-1319895 for automation of these steps

FOR AWS: 

![Image](./whitelistrules.png)

### For Azure use the following:

#### Step-by-Step Instructions for Azure

    Do a azure search for your tenant information
    ex. tcx-tenant-< replace with your own common tenant id >-common-waf 
    Click on Custom rules to create a new rule

![Image](./AzureCustomRule.png)

    #5 is the original rule, you will need to add rule #4 with allow FMSMaster.#4 was added to specifically allow IP address 192.161.1.100/32 to access fmsmaster. In the real world this IP address would be the source IP address of the on-prem system connecting to the fmsmaster FSC.
 

![Image](./WAF.png)