# 4 Troubleshooting, Guardrails and activities for SoW projects, project specific settings

## 4.1 Project guidelines use case specific

Please note during a SOW project there is a need to configure customer
connectivity and do business logic.

Dependending on the customer specific requirements multiple actions may be
required. Please note these are not part of the AIG product or
onboarding and must be handled during a project. This https://siemens.highspot.com/items/6945179a502acabf2382c95d#1. presentation 
shows the guardrails and guidelines which must be fullfilled during a SoW / Consulting project.

Additional Information are stated in this chapter. 

## 4.1.1

All content transferred between Dev / lower environment to productive environments must go through a secure storage where content is checked

### 4.1.1 Connectivity

Please see architecture diagrams in Chapter 1 about connectivity options that
are allowed. Please note AIG does not own these components.

### 4.1.2 Business configuration GS

It is expected that during a SOW, TCL Mappings and Pipelines are created.
It is required that all GS contain the same business configuration
(Pipelines, TCL Mapping) - not the same technical configuration (e.g.
exposed services or servers).

### 4.1.3 Export GS

It is assumed that all GS instances have connectivity to external systems (secured
according the connectivity guidelines).

### 4.1.4 Import case multiple GS

It is assumed that only one GS is allowed for import. Even if all GS instances
have the same business configuration only one GS is allowed to have API
opened to the outside. Only one GS has Endpoints exposed to external
systems. For the case of mTLS an additional Loadbalancer must be
integrated. 

### 4.1.5 Which DC Packages are allowed to be installed

During a project there are additional AIG packages that are allowed to
be installed, as using templates or specific use cases can only be
determined during a project.

Aspects that can be installed in a Development environment.

\- e.g. T4ST or T4EA (SIM/SIF) starter packages

\- Pipeline Designer only in Dev Environments

\- Simplified logging (2406+) and Job Handling in AW (2506+)


### 4.1.6 TcX Advanced Guardrails

The latest guardrails for TcX Advanced can be found in https://siemens.highspot.com/items/6945179a502acabf2382c95d#1. These are important for Service projects. 

For this cookbook the impact is activities in Chapter 4 are not relevant for TcX Advanced and others like

- no additional infrastructure like VPN or mTLS
- no open ports for external systems
- no PLMXML, no SOAP, only HTTPS
- only Workflow based transfers
- only T4ST(S4S) and SIF/SIM starter packagages are allowed to be installed


### 4.2 Troubleshooting / Known issues / Need To Know during operations 

#### 4.2.1 Challenges during maintenance mode of TcX Pipeline 2412
For the problem that Pipeline runs in maintenancen mode and configuration is overridden when additional components are installed via DC cp [AI-7381 - CApS_RV: AWS-AIG 2412/2506: Running pipeline in maintenance mode with additional PIDs overrides the AIG configurations.](https://mypolarion.industrysoftware.automation.siemens.com/polarion/redirect/project/Active_Integration/workitem?id=AI-7381)

Please do the following steps:

- Preparation AIG is fully stopped : sudo systemctl stop aig.service

**Below are the steps which need to repeat on each GS on AIG EC2 (up to 8 times):**

- connect via AWS Sessionmanager to AWS EC2
- change user to tc_xuser
- Go to the following files on each GS

/siemens/aig/vapps/gs1/gs/var/install/skip_changes.tcl 

/siemens/aig/vapps/gs2/gs/var/install/skip_changes.tcl 

....

/siemens/aig/vapps/gs8/gs/var/install/skip_changes.tcl 

Add to every file on each GS the following command: 

 lappend skipCheck "etc/*"

![Image](./image57.jpeg)

Rerun DC Deploy script afterwards.

According to CAPS the following steps must be redone:

Before running the pipeline for cTcX, make sure AIG service has stopped by command: *sudo systemctl stop aig.service*.

The following steps need to followed again:

1. AIG Infrastructure automation preparation & installation -> Needed
2. (AWS) AIG Stack Creation -> Not needed
3. Install AIG components
4. Renaming and Uploading the Deploy Zip File -> Needed
5. Resolving Hostname Issues on AIG EC2 Machine -> Not Needed
6. Download the aig-setup from \<KitsReleaseBucketName \-\> Not Needed
7. Follow the workaround and then start the installation of AIG and the corresponding Teamcenter runtime environment -> Needed
8. Initialize AIG components -> Needed
9. Register AIG components as service -> Needed
10. Start the AIG service -> Needed
11. Run installation verification -> Needed

#### 4.2.2 Execution/change of DC artefacts (even unrelated to AIG)
If you make changes related to the Teamcenter in DC or via Pipeline, you must also run a QD deploy script execution on the AIG server (or any other server with DC). 
The following servers are typically affected:
* AIG EC2
* Dispatcher
* Rich Client Server
* ... 

This is not a bug—it’s by design of DC. AIG uses its own Teamcenter server on its EC2 instance, so you always need to do the following steps:

1. Copy deploy scripts from DC server to S3 bucket like in chapter 2 described "2.5.2 Upload deploy-script from DC Server to Tenant S3 bucket".

2. Login and go to /home/tcx_user/aig - use tcx_user password & download the latest QD scripts from the S3 bucket onto the AIG EC2 machine. 

3. Download the latest QD scripts from the S3 bucket onto the AIG EC2 machine or any other machine in used:
  - bash
  - sudo su - tcx_user
  - cd /home/tcx_user/aig/data
  - execute .//apply_post_changes.sh --env-type ENVTYPE --tenant-id TENANTID --dcadmin-password DCADMINPW
          - examples for ENVTYPE= e.g. prd; TENANT = e.g. dhwaig15 

### For Azure
    
  **Prerequisites**

  - Copy deploy scripts from DC server to Deploy file share like in chapter 2 described "2.5.1 Upload the deploy script to file share to access it from script (only Azure )

  **steps**
  - bash 
  - sudo su - tcx_user 
  - cd /home/tcx_user/aig/data
  - Set the below environment variables

  **Note**: The following examples are provided for reference purposes only. These are not actual values and will differ across environments. Ensure that environment specific Vault address, token, and namespace details are configured before setting the variables. 
  - export VAULT_ADDR="&lt;VAULR_ADDR&gt;" 

    **E.g:** export VAULT_ADDR="https://vaultent.emea1.co.sws.siemens.com"
  - export VAULT_TOKEN="&lt;VAULT_TOKEN&gt;" 
  - export VAULT_NAMESPACE="&lt;VAULT_NAMESPACE&gt;/&lt;tenant_id&gt;/&lt;env_type&gt;"

    **E.g:** export VAULT_NAMESPACE="tcx-development_ns/storm_playground/dhzaigt6/prd"

  **Note**: Get the aig_bootstrap_password from Vault (path : secret/tcx/teamcenter/active_integration) 

  - execute .//apply_post_changes.sh --env-type ENVTYPE --tenant-id TENANTID --dcadmin-password DCADMINPWD --passphrase aig_bootstrap_password

         - examples for ENVTYPE= e.g. prd; TENANT = e.g. dhwaig15
 
  Check that installations is correctly run

  ![Image](./Successful_installation.png)
  

### End Azure

if you encounter no errors, you are good to proceed (please not that on other EC2s you might need this too).

For other Servers like dispatcher, you have to execute the DC scripts. For non-official servers like with Rich Client, you have to manually add AIG files there please note - as Rich Client & dispatcher are out of scope of this installation and AIG - no detailed instructions are made here. 

#### 4.2.3 After reboot / shutdown AIG won't start anymore

In some cases it can happen that the mounting is not correctly applied after a restart/reboot. 

This results in a corrupted AIG GS  & BGS folder structure. 

An indicator for this is that you can't start AIG service afterwards; and one potential error would be (if you start aig via ./aig start in home/aig folder) ![alt text](image-2.png)

As an alternative check go with tcx_user to /siemens/aig/

execute ll vapps

- check if e.g. all GS 1-8 folders are here

execute ll vdb
- check if e.g. folder pool is there

execute ll vlog

- local, stdio, sys and tmp plus keys are there

compare with this screenshot:

![AIG correct folder structure](aig_must_folder_structure.png)

To fix this:
- Stop all AIG services

- Go to home folder
  cd ~

- Download latest aig automation from s3 e.g. 

  aws s3 cp s3://tcx-release-management-dev/teamcenter_add_on/active_integration_gateway/aig2606-setup.tar.gz .

- unzip

  tar -xvzf aig2606-setup.tar.gz

- Go to correct folder to reapply scripts

  cd aig
  sudo ./repair_mounts.sh

- Start AIG services and execute the installation verification script

#### 4.2.3.4 Problems with DC if Hostname conventions are not followed

In the past, there were some cases where hostname conventions were not followed (e.g. UAT machines). To enable still a correct working solution, you can use this workaround for UAT:

 change to bash shell
 ```
- bash

 # change to tcx_user and enter tcx_user password 

- sudo su - tcx_user

 # Retrieve the Hostname 

- hostname 

 Copy the output, as this will be needed in the next steps.

 Get the IP Address 
 Example: ping -4 ctcxpd14-aig-uat01 
 take IP address from this

```

![alt text](image13.png)

```
 # Execute following commands:
- ping -4 <hostname>

# Prepare the entry for the hosts file
# <IP Address> <sub domain name>.aig-service.<environment id>.tcxservices.com
# Example: 10.254.52.100 ctcxpd14.aig-service.uat01.tcxservices.com

# Update the /etc/hosts file and add the name from the deploy file except the deploy_  ..... .zip 
# e.g. deploy_dhwaig11.aig-service.prd.tcxservices.com.zip -> dhwaig11.aig-service.prd.tcxservices.com
sudo nano /etc/hosts

# edit host file with above line and save that file
```
Save file

![Image](./image14.png)

#### 4.2.3.5 How to check if Tc server can reach AIG

In general, communication from tcserver to any other service outside of the Kubernetes cluster can be tested using curl command. In case of AIG, it would be 

```
- curl -Iv http://<AIG-machine-ip-address>:<port>/
# or 
- curl -Iv http://<AIG-machine-ip-address>:<port>/<url-path-to-GS/BGS>
```

 Simplified connect to Tc Server container; and curl AIG GS 1-8 (see chapter below for ports)



### 4.2.4 General - access & portmanagement

Access to AIG UIs and entities is restricted for **only** Siemens Employees!! During a Statement of Work, you as CAPS must edit customer specific configuration - to access our UIs in the case where there is no dispatcher you have to request access via Cyberark Webapp. 

These Links must be made accessible and registered with a Cyberark app (please note according to your sizing - not all 8 GS UIS are available):

| **What** | **URL** | **Comment** |
|----|----|----|
| Admin UI BGS URL        | https//\<AIG_DNS_NAME\>:11320 | // Accessible via windows machine or CyberArk |
| Admin UI GS  1 URL      | https//\<AIG_DNS_NAME\>:11321 | // Accessible via windows machine or CyberArk & **Import GS** |
| Admin UI GS 2 URL       | https//\<AIG_DNS_NAME\>:11322 | // Accessible via windows machine or CyberArk |
| Admin UI GS 3 URL       | https//\<AIG_DNS_NAME\>:11323 | // Accessible via windows machine or CyberArk |
| Admin UI GS 4 URL       | https//\<AIG_DNS_NAME\>:11324 | // Accessible via windows machine or CyberArk |
| Admin UI GS 5 URL       | https//\<AIG_DNS_NAME\>:11325 | // Accessible via windows machine or CyberArk |
| Admin UI GS 6 URL       | https//\<AIG_DNS_NAME\>:11326 | // Accessible via windows machine or CyberArk |
| Admin UI GS 7 URL       | https//\<AIG_DNS_NAME\>:11327 | // Accessible via windows machine or CyberArk |
| Admin UI GS 8 URL       | https//\<AIG_DNS_NAME\>:11328 | // Accessible via windows machine or CyberArk |
| Import GS (1)           |      https//\<AIG_DNS_NAME\>:11301      |     
| WebDV                   | 11400                                 | only internal
| default app port        | 11300                                 | only internal fyi 
| log server              | 13000                                 | only internal fyi
| T4ST import GS 1-8      | https//\<AIG_DNS_NAME\>:11401-11408   | only first GS active 
| T4EA SIF  GS  1-8        https//\<AIG_DNS_NAME\>:11411-11418    | only first GS active
| Sustainability GS 1-8   | https//\<AIG_DNS_NAME\>:11451-11458   | only first GS active
| Datadog BGS             | localhost:11500                       | DataDog Monitor
| DataDog GS1             | localhost:11501                       | DataDog Monitor
| DataDog GS2             | localhost:11502                        | DataDog Monitor
| DataDog GS3             | localhost:11503                       | DataDog Monitor
| DataDog GS 4            | localhost:11504                       | DataDog Monitor
| DataDog GS 5            | localhost:11505                       | DataDog Monitor
| DataDog GS 6            | localhost:11506                       | DataDog Monitor
| DataDoG GS 7            | localhost:11507                       | DataDog Monitor
| DartaDog GS 8           | localhost:11508                       | DataDog Monitor

## 4.2.5 AIG passwords & rotation

AIG moved from AWS secret manager to (TC) Vault in 2606 - you can now see the same Secrets in Vault. 

![alt text](image-3.png)


- aig_bootstrap_password - is simplified the root password of AIG - it is only changeable with a hard reset (reinstallation) - all data will be lost. 
- tc_aig_communication_password - no rotation currrently supported
- tc_aig_communication_uuid: this is not a secret - no need to rotate that

Other secrets:

During projects user in AIG can and/or must be created - all passwords of these new created users can be changed manually (this is customer specific- therefore not part of cookbook); Secret Rotation should be aligned with customer and service - Description how to do what should be aligned with service and customers. As Reference our standard documentation how to change passwords

- See here for a manual on how to do that: https://docs.sw.siemens.com/en-US/doc/281683587/PL20240711692098715.T4EA_sc.xid1340292/xid1402405?audience=external&pk_vid=477fd7c1d5e6bd4c612a5929ce30dc951765821550212b01


![alt text](image-4.png)

- Please note changing those passwords can have effects that transfers and connectivity from and to external system do not work anymore. Changing passwords is always needed to be aligned with all downstream systems & customers; a general solution is not possible as the used users are project and customer specific

## 4.3 mTLS setup (AWS)

mTLS can be set up for specific products which can provide HTTP
endpoints

|   |  |
|-----------------------------------------------|------------|
| Teamcenter Gateway Extension Package (T4EA)   | TC10317-XT |
| Teamcenter Gateway for Enterprise Apps (T4EA) | TC10318-XT |
| Teamcenter Integration for SAP S/4HANA        | TC10320-XT |

**What is not in the scope of this document:**

- Active Integration Gateway (AIG) calling external system endpoints. 
  This does not require a mTLS solution, but it would be possible to
  access an mTLS with ALB by customer - AIG could handle access without
  additional infrastructure -\> e.g. AIG GS using 2-way TLS to access
  external systems HTTPS endpoints or ALB in customer network in front
  of AIG.

## 4.3.1 Architecture

The integration leverages an Application Load Balancer (ALB) with mutual
Transport Layer Security (mTLS) certificate authentication to ensure
secure communication between the systems. Additionally, IP whitelisting
is implemented at the network level to restrict access exclusively to
external system’s outbound IP address. Furthermore, the AIG functions
are hosted on a dedicated AIG server instance with bound functions and a
specific user account for enhanced security. <br /> 
![Image](./image29.png)

 High Level Diagram of involved components.

- Component: External system

  - Consumes HTTPS/REST endpoints exposed by AIG GS.

  - Operates within customers secure network environment.

- Component: Application Load Balancer (ALB)

  - Handles mTLS authentication.

  - Efficiently distributes network traffic.

- Component: AIG GS server

  - Provides endpoints for imports and manages a dedicated user account.

  - Executes business logic.

- Component: Teamcenter

  - Provides endpoints for imports and manages a dedicated user account.

  - Executes business logic.

### 4.3.2 Flow handling of certificates 

![Image](./image30.png)

Figure 2 : Overview with certificate handling.

Important for this solution is the key understanding of certificate handling and mTLS. A server certificate for the AWS ALB will be created in this process but the client certificates must be provided by the customer.

What kind of certificates must the customer provide:

- Valid certificate authority from Customer (issuing CA) – This one will be later imported into Truststore.

- Customer client certificate based signed by Certificate Authority (e.g. client.crt)  - Must reside at client customer.

- Customer client key (e.g. client.key) – Must reside at client
  customer.

Additionally, the customer must provide the IP or IP ranges which must
have access, for example x.x.x.x/32

### 4.3.3 Architecture details - Mutual TLS (mTLS) Certificate Authentication

- **Purpose**: Ensures that both client and server authenticate each
  other, establishing a secure communication channel.

- **Implementation**: The ALB manages and validates certificates before
  allowing any traffic to reach the AIG GS server.  
    
  ![Image](./image31.png)

### 4.3.4 Architecture details - IP Whitelisting

- **Purpose:** Restricts network access to only allow traffic from the external system’s specific outbound IP address.

- **Implementation**: Configured using network security groups or
  firewall settings at the cloud provider (e.g., AWS) associated with
  the ALB.

- **Network Security**: Uses IP whitelisting to permit inbound traffic
  only from the approved external system IP address.  
    
  ![Image](./image32.png)

  Figure 3 : Illustration Configuration Network Access

  <!-- aditya completed till here -->

### 4.3.5 Architecture details: Dedicated server instance and user account AIG platform

- **Isolation:** Hosting functions on a dedicated server prevents
  interference from other processes and improves security.

- **Dedicated Server Instance (port 10222)**: AIG functions run on a
  separate server to isolate processing and enhance performance.

- **Access control:** A specific user account with limited permissions
  ensures that access is restricted to only what is necessary for
  operation.

- **Dedicated User Account:** Functions are executed using a dedicated user
  account for better access control and security.

Create the user account on the BGS server

Location of ALB and BGS server are shown in the following diagram:  
![Image](./image33.png)

### 4.3.6 Setup - Step by Step (for reference - in addition to CAPS manuals)

#### 4.3.6.1 Setting Up the Application Load Balancer (ALB) with mTLS on AWS 

Link to official documentation from Amazon:
[AWS Documentation](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/mutual-authentication.html)

1.       **Create an ALB** in AWS and configure a listener for HTTPS
traffic.

2.       **Configure DNS record** to resolve the DNS name of the ALB
created.

3.       **Create a trust store** resource and **upload your certificate
authority** (CA) bundle.

4.       **Configure mTLS Authentication** by specifying the trust store
on the ALB listener rules.

#### 4.3.6.2 Create ALB step-by-step.

Please note the UI can change but the configuration should stay the same
– Further you must adapt the logic to your customer specific case –
align with CAPS network security and latest TRA aspects to configure the
correct setup – This guide should only help in find the right place –
but the complete configuration will always be customer specific

1.  Go to AWS selecting Application Load balancer for HTTPS.  
    ![Image](./image34.png)

**Basic Configuration**

![Image](./image35.png)

*Key aspects to be selected:*

-          Internet-facing: selected

-          IPv4: selected

**Network Mapping**

![Image](./image36.png)

Key aspects to be selected:

-          VPC - select the VPC in which AIG EC2 is located

-          Subnets – select two subnets related to VPC

**Security groups**

![Image](./image37.png)

Key aspects to be selected:

·         Use the security group of the AIG EC2 instance or create a new one.

![Image](./image38.png)

*Key aspects*

·         Use the security group of the AIG EC2 instance, or create a
new one.

·         Edit the security group to add an inbound rule for HTTPS (port
443).

·         Restrict the allowed IP range to only the customer’s specified
outbound IP addresses, following the principle of least privilege. Go
back to ALB config.

**Listeners and routing**

![Image](./image39.png)

Key aspects:

-          Protocol: ALWAYS HTTPS!!! & Port 443 Port

-          Target group: Create new target group.

Switch to Target group creation

![Image](./image40.png)

![Image](./image41.png)

Key aspects:

- Instances: select instances

- Target group name: select appropriate

-          Protocol: HTTP & Port 10222

-          VPC: select VPC of AIG EC2 which was previously selected

-          Protocol version: HTTP1.

Create Target Group.

![Image](./image42.png)

*Key Aspects:*

·         Register targets – use AIG ec2.

Go back to ALB listener settings – refresh and select the new target group as default action.

**Secure Listener Settings**

![Image](./image43.png)

![Image](./image44.png)

Key aspects

- Security Policy – select the recommended.

- Certificate source: from ACM – request new certificate.

- Certificate (from ACM) -

- Mutual authentication (mTLS) – select it.

  - Verify with trust store : means that ALB checks certificate of
    client.

- S3 Bucket: take the S3 bucket for customers (depending on your
  environment e.g. UAT).

  - What to do there - upload certificate from customer as described in
    Chapter 2.

- Client certificate handling: do now allow expired client certificates.

- Advertise trust store CA subject names:

  - Off

#### 4.3.6.3 AIG configuration service

Log into Admin UI GS of first GS (import GS) with https://\<AIG_DNS_NAME\>:11321 via CyberArk  
![Image](./image45.png)

![Image](./image46.png)

![Image](./image47.png)

Go to edit function binding.

![Image](./image48.png)

Important – Here you select PXML::perfticker always for testing AND the service which is developed in a SOW and intended to be used outside (This will be communicated by the project team).  

- Select

![Image](./image49.png)

- Restart after safe.

#### 4.3.6.4 AIG configuration - create AIG user account

1.  **Create a Specific User Account** with limited permissions required for function execution.  
    Log in to BGS Admin UI  
    Add a user with role user. This user will be later on user for the webservice communication. 
    ![Image](./image50.png)

2.  Add password & user in AWS secret manager.

### 4.3.7 Testing / Validation

- Make sure that AIG EC2 is up 2 running and services as well

  - Go to AIG EC2 shell with tcx_user

  - Curl

- Check that Health checks are ok : “curl -v -u wsuser1:<em>password</em>
  [http://localhost:10222/pxml/perfticker] (http://localhost:10222/pxml/perfticker) 

- If response ok AIG EC2 is up & running and service is available + user
  is there

- AWS health check of target group ok (can take a while)

**Test certificate works (from client of customer with the exact Ip
range )**

  1.  Use client e.g. Postman with client certificate and specific client
      key and use wsuser1 and password.

  2.  Call http://\<DNS_record – right public hosted zone
      record\>:443/pxml/perfticker.

  3.  Check if response looks similar like screenshot.  
      ![Image](./image51.png)

**Test not reachable via other Ips**

- Ping endpoint from device outside of CIDR range.

- Should not be OK.

**Test not reachable without certificate**

- Ping endpoint from device within CIDR range but without certificate

- Should not be ok

##  4.4 Job Handling (2506) and Logging in AW

First Logging in Active Workspace is an optional Feature available since
AIG 2406 - This has to be set up project specific to gain all the
advantage - as it is bound to configuration during SOW.

In the following a generic Installation is described which provides standard functionality

**Prerequisites:**

You have "dba" or "Self Admin" rights in Active Workspace

### 4.4.1 Job Handling in AW 

- Log into EC2 of AIG.

- Copy pipelines and step Definitions from one gs to all available GS. (Depending on installation}

- <!--Copy pipelines and step Definitions from one gs to all available GS (up
  2 8 depending on installation-->

  - cp -r /siemens/aig/apps/gs1/gs/var/template/t4x/pipelines
    /siemens/aig/apps/gs1/gs/var/conf
  - cp -r /siemens/aig/apps/gs1/gs/var/template/t4x/stepDefinitions 
    /siemens/aig/apps/gs1/gs/var/conf

  - repeat 

    - cp -r /siemens/aig/apps/gs1/gs/var/template/t4x/pipelines
      /siemens/aig/apps/gs2/gs/var/conf
    - cp -r /siemens/aig/apps/gs1/gs/var/template/t4x/stepDefinitions 
    /siemens/aig/apps/gs2/gs/var/conf

    - cp -r /siemens/aig/apps/gs1/gs/var/template/t4x/pipelines
      /siemens/aig/apps/gs3/gs/var/conf
    - cp -r /siemens/aig/apps/gs1/gs/var/template/t4x/stepDefinitions 
    /siemens/aig/apps/gs3/gs/var/conf

    - ...

    - cp -r /siemens/aig/apps/gs1/gs/var/template/t4x/pipelines
      /siemens/aig/apps/gs8/gs/var/conf
    - cp -r /siemens/aig/apps/gs1/gs/var/template/t4x/stepDefinitions 
    /siemens/aig/apps/gs8/gs/var/conf

- then enable following server instances in each GS; go to Admin Ui and Service insances for each GS and click the following Proxies

![alt text](image-6.png)

- Stop AIG like shown in previous chapter

- Start AIG like shown in previous chapter

Check if you see under Advanced Search AIG job Pool – Jobs

![Image](./image52.png)

Important - it won't show anything if there are no jobs

### 4.4.2 Workflow Logging in AW 

Step 1:

- log into EC2 of AIG (login as tcx_user)

  Go to path:

-  cd /siemens/Teamcenter_2606/tc_root/tc_menu/

- execute:

- ./tc_prd-agtest18.sh

- install_xml_stylesheet_datasets -u=infodba -p=password -g=dba

- input=\$TC_INSTALL_DIR/t4ea/stylesheets/import_aig_logviewer_stylesheets.txt
- filepath=\$TC_INSTALL_DIR/t4ea/stylesheets


*** Troubleshoot - if this step is not working; try to login as infodba ***

# Verify how 

Step 1:

Go To DC / Linux server

- login with tcx_user

Go to directory:

- cd agtest18-prd/agtest18-prd/deploy/component/config/microservices/gateway/

- vi config.json

- check that "urlPrefix" : "/awc" is included as shown in this screenshot  
  ![Image](./image53.png)


Step 2:

Go to AW (with dba rights)

  - Go to Advanced query

  - After the installation you can find the following two additional
    sub-rendering style sheets: AW_AIG_WorkflowLog_page_subrendering and
    AW_AIG_TransactonLog_page_subrendering

  - Now it is possible to include the imported
    AW_AIG_WorkflowLog_page_subrendering style-sheets to your existing
    style-sheets. This is done by adding the following line in the
    Awp0EPMTaskSummary style-sheet: \<inject type="dataset"
    src="AW_AIG_WorkflowLog_page_subrendering"/\> If needed, it also could
    be added to the corresponding specific TaskSummary style-sheet of the
    specific task views

  - Go to Advanced Search

  - Select Dataset...

  - Search for AW_AIG\* as shown in the screenshot - select
    AW_AIG_WorkflowLog_page_subrendering

  - Change the src value to reflect the urlPrefix value in the
    config.json of the Active Workspace Gateway. 

  -   \<page title="Active Integration Log Channel View"\>  
          \<htmlPanel enableresize="true"
    `src="/awc/webdv?sbase=/awc/tc;tcobj={{selected.uid}};product=wflog"`
    /\>

  ![Image](./image54.png)

Go to Advanced Search

  - Select dataset...

  - Search for Awp0EPMTaskSummary as shown in the screenshot - select Awp0EPMTaskSummary

  - Add (if not there already)  
    \<inject type="dataset"
    src="AW_AIG_WorkflowLog_page_subrendering"/\>  
    ![Image](./image55.png)

Go to Advanced Search

  - Select Dataset...

Search for Awp0ItemRevSummary

  - Add dataset as shown in the screenshot

  \<inject type="dataset" src="AW_AIG_TransactonLog_page_subrendering"/\>

![Image](./image56.png)

Please note item is only as example here - depending on the used objects
this logging can be adjusted

Further information: 

[Teamcenter Gateway for SAP Business Suite - Basic Configuration
Guide](https://docs.sw.siemens.com/en-US/doc/281683587/PL20250320470624806.T4S_sc.xid1362995/dwj1731504883128) - Self-Service
AIG Logging in Active Workspace

[Teamcenter Gateway for SAP Business Suite - Basic Configuration
Guide](https://docs.sw.siemens.com/en-US/doc/281683587/PL20250320470624806.T4S_sc.xid1362995/fpa4971415514743) -
Self-service AIG Jobs In Active Workspace



## 4.7. Access AIG UIs via Dispatcher (Siemens internal only - not for production usage)

Besides Cyberark you could also use the Dispatcher machine to access AIG UIS.

For this you have to edit the security groups:
- Add one additional outbound rule to  Dispatcher (WindowsServer) that it is allowed to communicate only AIG EC2 IP adress
- and the Inbound Rules of AIG machine that it only allows inbound access from Dispatcher machine IP
- both rules should cover 11300-11328 Port Ranges for HTTP 


See those screenshots as examples:

![alt text](screenshot-20260108-094307-98.png)

![alt text](screenshot-20260108-094307-97.png)
