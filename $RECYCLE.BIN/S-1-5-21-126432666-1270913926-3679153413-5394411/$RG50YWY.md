# 2. Installation of Active Integration Gateway

## 2.1 List of packages and ID
Please make sure that the AIG kits on the S3 Bucket are the official packages. Use this table to compare KITS and in S3 Buckets - they are AWS specific. 


|  PackageNo     	  |Name   	                                                | Version   	                            |CheckSumCompare |Comment           	                    |
|---	              |---	                                                    |---	                                              |---	           |---                                     |
|  1   |  Active_Integration_Gateway_FOSS_tc2606_2606_Linux_x86_64.zip  	    |- |-     |FOSS Linux               | 
|  2   |  Active_Integration_Gateway_FOSS_tc2606_2606_win64.zip 	            |- |-     |FOSS Win                 | 
|  3   |  Active_Integration_Gateway_Foundation_tc2606_2606_Linux_x86_64.zip  |- |-      |Foundation Linux         | 
|  4   |  Active_Integration_Gateway_Foundation_tc2606_2606_win64.zip         |- |-      |Foundation Win           | 
|  5   |  Active_Integration_Gateway_S4S_tc2606_2606_Linux_x86_64.zip         |- |-      |S4S Linux Tc             |  
|  6   |  Active_Integration_Gateway_S4S_tc2606_2606_win64.zip         	      |- |-      |S4S Win Tc               |  
|  7   |  Active_Integration_Gateway_S4S_tc2606_Feature_2606_Linux_x86_64.zip |- |-  	  |S4S Linux Linux          | 
|  8   |  Active_Integration_Gateway_S4S_tc2606_Feature_2606_win64.zip        |- |-      |S4S Feature Linux        | 
|  9   |  Active_Integration_Gateway_T4EA_tc2606_2606_Linux_x86_64.zip        |- |-      |S4S Feature Win          | 
|  10  |  Active_Integration_Gateway_T4EA_tc2606_2606_win64.zip         	    |- |-      |T4EA           	        | 
|  11  |  Active_Integration_Gateway_T4EA_tc2606_Feature_2606_Linux_x86_64.zip|- |-      |T4EA           	        | 
|  12  |  Active_Integration_Gateway_T4EA_tc2606_Feature_2606_win64.zip       |- |-      |T4EA             	      | 
|  13  |  Active_Integration_Gateway_T4O_tc2606_2606_Linux_x86_64.zip         |- |-      |T4O           	          | 
|  14  |  Active_Integration_Gateway_T4O_tc2606_2606_win64.zip         	      |- |-      |T4O           	          | 
|  15  |  Active_Integration_Gateway_T4O_tc2606_Feature_2606_Linux_x86_64.zip |- |-      |T4O             	        |
|  16  |  Active_Integration_Gateway_T4O_tc2606_Feature_2606_win64.zip        |- |-      |T4O             	        | 
|  17  |  Active_Integration_Gateway_tc2606_Feature_2606_Linux_x86_64.zip     |- |-      |Tc2xxx Feature Lin       |  
|  18  |  Active_Integration_Gateway_tc2606_Feature_2606_win64.zip         	  |- |-      |Tc2xxx Feature WIN       |
|  19  |  Active_Integration_Gateway_X4GS_tc2606_2606_Linux_x86_64.zip        |- |-      |X4GS Linux               |  
|  20  |  Active_Integration_Gateway_X4GS_tc2606_2606_win64.zip         	    |- |-      |X4GS Win                 | 
|  21  |  aig-datadog-2606.tar         	                                      |-|-     |datadog scripts(AWS/AZURE) | 
|  22  |  aig2606-setup.tar.gz         	                                      |- |-   	  |AIG AWS scripts            |
|  23  |  aig2606-stack-setup.tar.gz         	                                |- |-  	  |AIG AWS stack scripts      | 
|  24  |  aig2606-azure-setup.zip         	                                  |- |- 	  |AIG Azure scripts            | 
|  25  |  aig2606-azure-stack-setup.zip                                       |- |-	    |AIG Azure Stack creation     | 

Verification: 
- The revision and versions are available on AIG machine - go into following folder /siemens/aig/apps/gs1/gs and open the .sig file which should match the Signature.
- SHA256 checksums: check in AWS S3 Bucket UI each file has a the mentioned SHA256 signature 
- SHA256 checksums:on AWS EC2 or cloudshell - you can use command sha256sum to verify kits and automation files  : 

```
- sha256sum <file> | awk '{print $1}' | xxd -r -p | base64

```


## 2.2 Relation TcX Pipeline and AIG automation

When AIG launched in the cloud, there was no option to be part of the TcX Pipeline. Therefore the automation is separate. The pictures below show the relation between Pipeline and AIG automation

## AWS 

![Image](./AIG_aws_deployment_infra_automation.png)

## Azure 

![Image](./AIG_azure_automation.png)

## 2.3 Preparation / execution of TC Pipeline for AIG

Please execute Ansible Tower Job and edit Teamcenter ProductID List
according to the AIG products you want to incorporate according to the
ProductIDs.
Make sure that all other prerequisites from chapter 1 are fullfilled.


## 2.4 Preparation to execute AIG automation

###  Preparation AWS - copy files from DC server to other sources

#### Missing Infra yaml due changes in TcX Pipeline

- **Uploading Infra.yaml from GITLAB to S3 Bucket**

Context this was a necessary workaround due a breaking change, see
defect [LCS-1135198 - only accessible if you have access in Polarion] 
(https://mypolarion.industrysoftware.automation.siemens.com/polarion/#/project/Teamcenter/workitem?id=LCS-1135198)

1.  Log in to GitLab using the provided link: [Projects ·
    GitLab](https://gitlab.industrysoftware.automation.siemens.com/)

2.  Navigate to the Tenant Repo/helm_charts/ - E.g.:
    agtest05-prd/helm_charts/

3.  Download the 'infra.yaml' this file by clicking on the 'Download'
    button (see screenshots)
    ![Image](./image3.png)
    ![Image](./image4.png)  
    
4.  In AWS S3 console, search for the S3 bucket using the Tenant ID.
    E.g.:  tcx-us-east-1-prd-agtest05

5.  Inside the bucket, click on “customer-information/”

6.  Upload the “infra.yaml” at this location. (see screenshot)
    ![Image](./image5.png)       
    
    - Upload deploy-script from DC Server to Tenant S3 bucket

#### Copying missing DC artefacts to S3 bucket

1.  Access to DC Server via AWS console.

2.  Access to Tenant S3 bucket on AWS console.  

    1.  Login into DC Server on AWS console:  
        Navigate to below location:  
        /siemens/DeploymentCenter/repository/deploy_scripts/prd-\<tenantID\>/install/prd\_-\<tenantID\>  
        **E.g.:**
        /siemens/DeploymentCenter/repository/deploy_scripts/prd-agtest17/install/prd_agtest17

    2.  <u>Upload the kit from DC Server to Tenant S3 bucket</u>:  
        Kits to upload:
         deploy\_\<tenantID\>.aig-service.prd.tcxservices.com.zip  
        **E.g.:** deploy_agtest17.aig-service.prd.tcxservices.com.zip  
        Location to
        upload: s3://tcx-us-east-1-prd-\<tenantID\>/deploy_script  
        **E.g.:**           
        s3://tcx-us-east-1-prd-agtest17/deploy_script  
        Command to copy: /usr/local/bin/aws s3 cp
        deploy\_\<tenantID\>.aig-service.prd.tcxservices.com.zip
        s3://tcx-us-east-1-prd-\<tenantID\>/deploy_script  
        **E.g.:** /usr/local/bin/aws s3 cp
        deploy_agtest17.aig-service.prd.tcxservices.com.zip
        s3://tcx-us-east-1-prd-agtest17/deploy_script
        ![Image](./image6.png)        

    3.  In Tenant S3 bucket, cross-check that the kit is available:
        ![Image](./image7.png)         
             

### (Azure) preparation

**Prerequisites**

- User should ensure that base TCX pipeline is already installed and running.
- User should have access to the DC machine and be able to log in via CyberArk.

 **Preparation**

1. (CAPS) Login to DC server Via CyberArk.

   (Developers) Login to DC server via Azure Bastion.

2. Switch user to tcx_user.

  - sudo su - tcx_user
  - cd /home/tcx_user

3. Download the aig stack script from azure admin blob storage container.
  - az login --identity
  - Execute below command, please refer to Table 1 : blob download configurable options to fill the values 
    
    az storage blob download --account-name \<admin_storage_account_name\> --container-name \<kits_container_name\> --name teamcenter_add_on/active_integration_gateway/aig2606-azure-stack-setup.zip  --  file aig2606-azure-stack-setup.zip --auth-mode login

4. un-compress the downloaded aig automation file, make them executable, and change the directory.
  - unzip aig2606-azure-stack-setup.zip.
  - chmod -R 755 /home/tcx_user/aig2606-azure-stack-setup.
  - cd aig2606-azure-stack-setup.

5. Edit the aig-stack-parameters.json with all the required values. Please refer to Table 2 : aig-stack-parameters.json configurable options to fill the values.
  - Location: \data\aig-stack-parameters.json.

## 2.5 AIG stack creation

<!--This section starts with the AIG stack creation - at the end AIG servers and components are up and running and you only have to install AIG on the new servers. 
The description of the configuration files you can find at the end.-->
This section describes the AIG stack creation, execution of the AIG server and components, description of the configuration files, installation of AIG on the new servers. 

### (Azure) AIG stack creation 
After completing the preparation steps, perform the following steps to create the AIG stack:

1. (CAPS) Login to DC Server Via CyberArk.

   (Developers) Login to DC server via Azure Bastion.

2. Set the following Environment variables in DC server:

   **Note :** The following examples are provided for reference purposes only. These are not the actual values and will differ across environments. Ensure that environment specific Vault address, token, and namespace details are configured before setting the variables. 
  - export VAULT_ADDR="&lt;VAULT_ADDR&gt;".

    **E.g:** export VAULT_ADDR="https://vaultent.emea1.co.sws.siemens.com"
  - export VAULT_TOKEN="&lt;VAULT_TOKEN&gt;".
  - export VAULT_NAMESPACE="&lt;VAULT_NAMESPACE&gt;".

    **E.g:** export VAULT_NAMESPACE="tcx-development_ns/storm_playground" 

3. Run the script with the below command: 
  - ./manage_aig_stack.sh install \<tcx_user_password\>


### (AWS) AIG Stack Creation
<!--Example summary on each chapter what to do summarized.-->

Summary of commands in this chapter - for instructions, details and explanation read this chapter (Please exchange \<KitsReleaseBucketName\> variable with your current value e.g. tcx-release-management-pre-production-eu-central-1 -  and \<CustomerEnvBucketName\> variable with correct S3 Bucket for customer): 
``` bash
1. Make sure that you have a profile set up for further actions in AWS CloudShell.

2. Start AWS CloudShell and execute the following commands to download the relevant scripts:

#inside of AWS CloudShell 
## download the AIG automation script
3. aws s3 cp s3://<KitsReleaseBucketName>/teamcenter_add_on/active_integration_gateway/aig2606-stack-setup.tar.gz . 

## un-compress downloaded AIG automation package
4. tar -xvzf aig2606-stack-setup.tar.gz

## change to the extracted aig folder 
5. cd aig

## edit aig-stack configuration file (details can be found in the sizing table and the documentation in the next chapter)
6. nano data/aig-stack.json

## edit aig stack parameters information (details can be found in the next chapter)
7. nano data/aig-stack-parameters.json

## install AIG stack from aig directory
### take the defined tcx_user password from the tc pipeline vault 
./manage_aig_stack --install=<tcx_user_password>

!!!DO not log into this machine before cloud formation script is finished see next comments!!! 
## wait until the machine is reading to be used for deployment, this can take a couple of minutes.  
## You also can validate that in the AWS EC2 instance view by checking the following values for the host ### Instance State should be "running" ### Status Check should be "3/3 checks passed"

```

### Descriptions of config files and meaning

#### Azure

Table 1: blob download configurable options

| **Variable to be filled by CAPS** | **Value** | **Description** |
|----|----|----|
| admin storage account name | e.g : tcxadmin0002sa888 | admin storage account name : This should be set to the name of the admin storage account where the kits containers reside. This value can be obtained from the cloud file in the variable repo.|
| kits container name | e.g : tcx-release-management-dev | kits conatiner name : This should be set to the name of the container where the software kits are released. For example, it could be tcx-release-management-production or tcx-release-management-dev, depending on whether you're working in a production or dev environment. This value can be obtained from the cloud file in the variable repo. |

Table 2: aig-stack-parameters.json configurable options

| Variable to be filled by CAPS | Value | Description |
|:-------------|:--------------|:--------------|
| Bootstrap resource group          | e.g. tcx-bootstrap-azm-eaus-tcx-dh-preprod50-rg          | Bootstrap resource group: This should be set to the name of the bootstrap resource group where the bootsrap storage account exists. You can get this value from Azure portal or cell file in variable repo. For example, it could be tcx-bootstrap-azm-eaus-tcx-dh-preprod50-rg.        |
| Bootstrap storage account           | e. g. tcxboot0005sa     | Bootstrap Storage account name :  This should be set to the bootstrap storage account name where the storage container file resides to read the state file. You can get this value from Azure portal or cell file in variable repo.  |
| shared_resource_group_name           | e.g. tcx-cell-azm-eaus-tcx-dh-preprod50-shared-rg          | shared resource group: This should be set to the name of the shared resource group  This value can be obtained from the cell file in the variable repo. For example, it could be tcx-cell-azm-eaus-tcx-dh-preprod50-shared-rg.
| admin_resource_group_name          | e.g. tcx-admin-0002-rg     | admin resource group name : This should be set to the name of the admin resource group name where the kits containers are reside. This value can be obtained from the cloud file in the variable repo.
| admin_storage_account             | e.g. tcxadmin0002sa888      | admin storage account name : This should be set to the name of the admin storage account where the kits containers are reside. This value can be obtained from the cloud file in the variable repo.
| admin_gallery           | e.g. tcx_admin_0002_gal            | admin gallery : This should be set to the name of the admin gallery where the VM images reside. This value can be obtained from the cloud file in the variable repo.
| ARM_SUBSCRIPTION_ID           | e.g. aue0a8f6-khgg-5e51-8gtr-lq1y4hcf5kh2          | ARM SUBSCRIPTION ID : This should be set to the tenant subscription id. This value can be obtained from the cloud file in the variable repo.
| ADMIN_SUBSCRIPTION_ID         | e.g. 907h0256-g6g7-f536-916h-8m8jee88030b          | ADMIN SUBSCRIPTION ID : This should be set to admin subscription id. This value can be obtained from the cloud file in the variable repo.
| INSTANCE_TYPE          | e. g. "Standard_F8s_v2"           | The instance type that is needed for this specific customer. You should derive this from the information that was given by your customer success team and from Tables from Chapter sizing. |
| ARM_TENANT_ID          | e.g. "6k5cg02b-65f6-40b2-8frt-d9d9gf4532"| TENANT ID is specific for subscription. You can get this value from Azure portal, Azure Portal -> Azure Active Directory ->Overview -> Tenant ID. You can also get this value from Cloud file from variable repo.| 
| mgmtplane_cidr_range          |  e.g . 10.149.26.0/23           | mgmtplane_cidr_range : This should be set to the management plane address prefix value from the cell file to create the inbound rules in AIG server.You can get this value from cell file in variable repo.|
| engine_role_policy       |  e.g . "pre-created"           | engine_role_policy : This should be set to the GLBL_AZ_ENGINE_ROLE_POLICY value from the cell file to create the AIG SP. If the variable is not present in the cell file, the input should be left empty.|


#### AWS

Table 1: aig-stack-parameters.json configurable options
| Variable to be filled by CAPS | Value | Description |
|:-------------|:--------------|:--------------|
| KitsReleaseBucketName           | e.g. tcx-release-management-pre-production for pre production or tcx-release-management-pre-production-eu-central-1 for pre production-eu-central           | KitsReleaseBucketName: This should be set to the name of the bucket where the software kits are released. For example, it could be tcx-release-management-production or tcx-release-management-pre-production, depending on whether you're working in a production or pre-production environment. If you work in a different region than us-east / default, you have to add it here.         |
| CustomerEnvBucketName           | e. g. tcx-us-east-1-prd-tcxaig05 as example         | Has to be set to customer s3 Bucket for each environment.  Here, you should specify the name of the customer-specific bucket. This is where your customer's environment-related data and configurations are stored. The naming scheme is tcx-\<region\>-\<prd\|uat\>-\<customerID\>. |

Table 2: aig-stack json configurable options

| Variable to be filled by CAPS | Value | Description |
|:-------------|:--------------|:--------------|
|INSTANCE_TYPE |e. g. "c5a.4xlarge" |The instance type that is needed for this specific customer. You should derive this from the information that was given by your customer success team and from Tables from Chapter sizing.  |
|CORPORATE_SERVER_ID |e.g. "i-089f68b34500493e7"|Corporate Server ID --> meant here is the DC server   |
|JavaKitLocation|third_party_binaries/lnx64/JDK/17.0.12.7.1/amazon-corretto-17.0.12.7.1-linux-x64.tar.gz"|Java Version to be used - please do not change  |

### (AWS) Details & Troubleshooting

After a successful installation of the AIG stack, you see the following
messages in the cloud shell.

![Image](./image11.png)

In case of an error, please consult the CloudFormation log for further
details, in most cases reason is missing user privileges.

![Image](./image12.png)

## 2.5 Install AIG 

This chapter describes the steps that you take to install and initialize AIG components.

###  Access AIG machine, prepare libraries, solve different schema S3 

Before you start with the deployment of the AIG runtime environment, make
sure that the AIG Hybrid VM/EC2 machine setup is completed by checking
the "Status check" entry for the host it should be ***3/3 checks
passed*.**

```bash

Summary of commands in this chapter 
- for instructions, details and explanation read this chapter

- Case AWS:  Please exchange <KitsReleaseBucketName> variable with your current value e.g.  tcx-release-management-pre-production-eu-central-1 -  and <CustomerEnvBucketName> variable with correct S3 Bucket for
customer
- Case Azure: Please exchange <admin_storage_account_name> variable with correct admin storage account name and <Container> variable
with your correct value e.g. tcx-release-management-dev

# Note: If the dc package for AIG is already in required format, then skip this step. Required format is "deploy_<customerID>.aig-service.<EnvType>.tcxservices.com.zip"
1.  (Only needed if not correct format) Renaming and Uploading the Deploy Zip File.

Steps:
  1.1. Go to deploy zip location in s3 (AWS).

  1.2. Upload the deploy script to file share to access it from script (only Azure).
    - (CAPS) Login into DC server via CyberArk.
      (Developers) Login into DC server via Azure Bastion.
    - Navigate to below Location.
      /siemens/DeploymentCenter/repository/deploy_scripts/prd-<tenant-id>/install/prd_<tenant-id>/
    - Copy the aig deploy script to file share using below command.
      cp deploy_<tenant-id>.aig-service.prd.tcxservices.com.zip /<tenant-id>-prd/

#  files that follow this pattern must be renamed: 
  1.3. Select file --> Actions --> Rename object (or other action to rename file)
    - deploy_<customerID>-<EnvType>.aig-service.<EnvType>.tcxservices.com.zip rename this file to "deploy_<customerID>.aig-service.<EnvType>.tcxservices.com.zip"

# login to aig ec2/VM machine 
2. (AWS) Access created, AIG EC2 instance (Siemens-<customerId>-prd-AIG) machine via Session Manager and download automation.
2. (Azure - CAPS) Access AIG vm machine via CyberArk. 
   (Azure - Developers) Login to AIG server via Azure Bastion. To access the server through bastion, retrieve the AIG keypair from the Vault at the specified path.
   "Secrets/secret/tcx/teamcenter/active_integration_server"
  
# change to bash shell 
  - bash

# change to tcx_user and enter tcx_user password 
  -  sudo su - tcx_user

# install lunixODBC, libnsl and libaio +  WORKAROUND AI-7754 postgres gone from Rhel 9
  - (AWS) sudo dnf install -y unixODBC libnsl libaio openldap-compat compat-openssl11 libatomic-11.5.0-11.el9 
  - (Azure) sudo dnf install -y msodbcsql18 unixODBC-devel libnsl libaio

# change to tcx_user home directory 
  - cd ~

```
### (Azure only) Hostname adaption
```

# Retrieve the Hostname 

- hostname 

 Copy the output, this will be needed in the next steps.

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
  save file with below 

  ![Image](./image14.png)

  ```
  # download the aig-setup from azure admin storage blob container

  - az login --identity
  - Execute below command, please refer Table 1 : blob download configurable options to fill the values

    az storage blob download --account-name <admin_storage_account_name> --container-name <container_name>  --name teamcenter_add_on/active_integration_gateway/aig2606-azure-setup.zip  --file aig2606-azure-setup.zip --auth-mode login

  # un-compress donloaded aig-setup package 
    - unzip aig2606-azure-setup.zip

  # change to aig folder name 
    - mv aig2606-azure-setup /home/tcx_user/aig

  # make them executable
    - chmod -R 755 /home/tcx_user/aig

  # change to aig folder 
    - cd ~/aig 

 ```
### (AWS only) download setup utilities

```
(only AWS)

  # download the aig-setup from \<KitsReleaseBucketName>\
    - aws s3 cp s3://<KitsReleaseBucketName>/teamcenter_add_on/active_integration_gateway/aig2606-setup.tar.gz . 

  # un-compress donloaded aig-setup package 
  # mkdir aig #workaround will be gone with patch
    - tar -xvzf aig2606-setup.tar.gz #... setup_are will be gone with patch

  # change to aig folder
    - cd ~/aig

(/only AWS)

```

###  DC install of AIG and verify successful installation

```

3. Install AIG and Teamcenter Runtime Environment 

# Use the defined dcadmin password for the customer as an input parameter.
# This step may take up to 10 minutes.
# In rare cases, a deadlock can occur due to a DC challenge. If this happens, please follow the troubleshooting guide here:
# https://ctcx.code.siemens.io/cookbook/docs/2606/Documentation/Operations/Troubleshooting/Utility%20Delay%20Due%20to%20Dead%20Processes/#utilities-taking-too-long-to-complete-due-to-lot-of-dead-processes (adapt please your version)

  - ./manage_aig_install --dcinstall=<dcadminPassword>

## check if the following output is shown without errors:
  Status: Deploy Script Execution Successful !!!
  Install Teamcenter and AIG ... finish

4. Initialize AIG components 

# This sets up the configuration for all AIG components.
## If the script hangs for 2–3 minutes, stop it with Ctrl+C and continue with the steps below. In most cases, AIG will work after completing all steps.

  - ./manage_aig_install --init

5. Register AIG Components as a Service

  - sudo ./manage_aig_install --serviceinstall

6. Start the AIG Service

  - sudo systemctl start aig.service

## Workaround - Troubleshooting   if service is not starting (please file a PR)

  - (optional Troubleshooting) cd /home/tcx_user/aig
  - (optional Troubleshooting) ./aig start 

## Workaround for March 26 Kit (will go away with later kits) to have Tc Connectivity working
- please contact development for steps to get this working (those steps won't be included in this cookbook as this is expected to go away with next kits)


7. Run installation verification

# This scripts validates if AIG is correctly set up and can connect to TC - please check the result detailed if there are any error!

  - ./manage_aig_install --testinst --passphrase=aig_bootstrap_password --infodbapw=infodbapw

  # examplary output:
    >> Connection Test BGS is OK
    >> BGS installation verification check is OK
    >> found 1 GS instances
    >> Connection Test GS #1 is OK
    >> GS #1 installation verification check is OK
    --> Each GS shows that ITK connectivity can be used

    Result:  ready to start customer project
```