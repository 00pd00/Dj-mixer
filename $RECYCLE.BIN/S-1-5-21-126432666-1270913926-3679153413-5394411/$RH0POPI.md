
# 3. Post Deploy or operational activities 

## 3.1 DataDog Installation/Configuration 

**Initial Setup: Datadog API Key and Installation**

Before installing the Datadog agent, you need to obtain an API key
(DD_API_KEY) to authenticate against the Datadog server. You can find
the Datadog API key on the Datadog dashboard or refer to the pillar0
website for more details
[Request Datadog](https://developer.internal.siemens.com/fds/p0/fds_one/user-access-request.html#datadog-access-request).

Once you have the API key, install the Datadog agent on the AIG Hybrid
system using the following commands:

```bash
Summary of commands in this chapter - for instructions, details and explanation read this chapter 
(Please exchange <KitsReleaseBucketName> variable with your current value e.g. tcx-release-management-pre-production-eu-central-1 -  and <CustomerEnvBucketName> variable with correct S3 Bucket for customer):

This guide walks you through installing and configuring the Datadog Agent on the AIG (C2) instance for monitoring the BGS and GS components.

1. Log Into the AIG (C2) Instance.

2. Download and Extract the AIG Datadog Automation Package into tcx_user home dir as tcx_user.

(AWS)
  
  - cd ~
  - aws s3 cp s3://<KitsReleaseBucketName>/teamcenter_add_on/active_integration_gateway/aig2606-datadog.tar.gz .

(/AWS)

(Azure)
  - az login --identity

  - az storage blob download --account-name <admin_storage_account_name> --container-name <kits_container_name> --name teamcenter_add_on/active_integration_gateway/aig-datadog-2606..tar --file aig2606-datadog.tar.gz --auth-mode login

(/Azure)

  - tar -xvzf aig-datadog-<version>.tar.gz

After extraction, you should see the following files (execute ls -al):
    bgs_check.yml
    datadog.yml
    gs_check.yml
    install_configure_datadog.sh

3. Make sure AIG Components are up and running.

  Make sure the AIG BGS and all relevant GS instances (e.g., GS1–GSn) are installed and actively running.

4. Run the Datadog Setup Script.

export DD_API_KEY=<key> 
./install_configure_datadog.sh \
  --env <env> \
  --env-name <env-name> \ 
  --customer <customer> \
  --gs-count <n> \
  --version <version> 
#### explanation
--env: Environment type
--env-name: e.g., us-east-1
--customer: Customer name 
--gs-count: Number of GS instances up and running (e.g., 4)
--version: AIG version (e.g., 2412, or 2506)

You must see the following success messages:

```
![Image](./image16.png)

```bash

5. Verify agent status.

  - sudo service datadog-agent status
  - You must see the service is up and running:

```

![Image](./image17.png)

```bash

6. Troubleshooting

For detailed logs and error messages (Ctrl+C to stop):

  - sudo tail -f /var/log/datadog/agent.log

After that everything should be ready to set up customer specific monitors, SLOs
```

## 3.2 Shutting down / restart of AIG components 

```bash

Summary of commands in this chapter - for instructions, details and explanation read this chapter execute on AIG instance sessions manager

  - sudo systemctl stop aig.service

  - sudo systemctl start aig.service

## case shutdown and reboot 

  - sudo systemctl stop aig.service

  - sudo systemctl start aig.service

```

## 3.3 Cleanup & destroy AIG environment 

### AWS 


```bash

Important: Execute cleanup & destroy of AIG before you purge the TcX environment and the corporate servers.

execute in  AWS CloudShell

- #CloudShell
  ## download the AIG automation script
    - aws s3 cp s3://<KitsReleaseBucketName>/teamcenter_add_on/active_integration_gateway/aig2606-stack-setup.tar.gz .

  ## un-compress downloaded AIG automation package
    - tar -xvzf aig2606-stack-setup.tar.gz

  ## change to the extracted aig folder
    - cd aig

  ## edit aig-stack configuration file  (see installation chapter)
    - nano data/aig-stack.json

  ## edit aig stack parameters information (see installation chapter for details)
    - nano data/aig-stack-parameters.json

- ## delete the AIG infrastructure stack - check AWS CLoudformation stacks for the corresponding stack
    -  ./manage_aig_stack --delete=<stackname> //e.g. aig-dhwaig11-prd-2610251534
```

![Image](./image18.png)

Figure 4 : Example of a stack name in AWS CloudShell


### Azure

**Prerequisites**

Perform the preparation steps in section (Azure) Preparation in chapter **Installation of Active Integration Gateway**.

Take the following steps to delete the AIG stack:

1. (CAPS) Login to DC Server Via CyberArk.

   (Developers) Login to DC server via Azure Bastion

2. Set below four Environment variables: 

**Note :** The following examples are provided for reference purposes only. These are not actual values and will differ across environments. Ensure that environment specific Vault address, token, and namespace details are configured before setting the variables. 
  - export VAULT_ADDR="&lt;VAULT_ADDR&gt;" 

    **E.g:** export VAULT_ADDR="https://vaultent.emea1.co.sws.siemens.com"
  - export VAULT_TOKEN="&lt;vault_token&gt;" 
  - export VAULT_NAMESPACE="&lt;vault_namespace&gt;"
  
    **E.g:** export VAULT_NAMESPACE="tcx-development_ns/storm_playground" 

3. Run the script with below command: 

    - ./manage_aig_stack delete  

4. After script execution, go to the tenant resource group in Azure Portal and verify whether the AIG managed disks have been deleted. If any AIG managed disks still exists, manually delete the AIG managed disks from the Azure portal.

![Image](./delete_disks.png)

## 3.4 (AWS) Prepare access for CAPS for Admin UI on GS and BGS 

To establish connectivity between AIG env and CyberArk, create TGW peering using below Ansible template.

- Template Name: “TGW-resource-share-mgmt-to-customer (Please do not modify any settings)”

Link: [Ansible Tower \| TGW-resource-share-mgmt-to-customer (Please do
not modify any settings)
(teamcenter.com)](https://ansible-dev.cloud.teamcenter.com/#/templates/job_template/93?template_search=page_size:20;order_by:name;type:workflow_job_template,job_template)

Add Inbound Rules for AIG EC2 that Cyberark can access AIG EC2

- Select the machine on which AIG services are running.  Ex: Siemens-agtest04-prd-AIG
- Select the “Security” tab
- Click on “Security Groups”  
  ![Image](./image20.png)

- Under “Inbound rules”, click on “Edit Inbound rules”  
  ![Image](./image21.png)


- Add the Source IP/CIDR of CyberArk details in this Security Group (Verify the CIDR range with CyberArk team).   
  ![Image](./image22.png)

## 3.5 (Azure) Prepare access for CAPS for Admin UI on GS and BGS

Note : The Inbound rules are already added with the AIG automation scripts.

Verify Inbound Rules for AIG VM that CyberArk can access AIG VM are added.     

- Select the machine on which AIG services are running. Ex: tcx-tenant-dhaig014-prd-AIGServer.
- Select the “Network settings” tab.
- Verify Inbound rules for 22, 11300-11336 and 3389 ports are opened to Management plane cidr range.  
  ![Image](./image23.png)


  For further information how to access Cyberark refer to CAPS responsible or use these links (may not be active) :
[CApS Wiki - CyberArk WebApps How To´s](https://siemensnam.sharepoint.com/teams/disw_GSS_CApS/wiki/SitePages/CyberArk%20WebApps%20How%20To%C2%B4s.aspx?OR=Teams-HL&CT=1740781335260&xsdata=MDV8MDJ8YW5kcmVhcy5yZWlkdEBzaWVtZW5zLmNvbXxjM2RkNmRjNzI0YTQ0ZmE5MTZiNzA4ZGQ1ODQ3MmVmM3wzOGFlM2JjZDk1Nzk0ZmQ0YWRkYWI0MmUxNDk1ZDU1YXwxfDB8NjM4NzYzNzg0OTUxNzQ3MDc0fFVua25vd258VFdGcGJHWnNiM2Q4ZXlKRmJYQjBlVTFoY0draU9uUnlkV1VzSWxZaU9pSXdMakF1TURBd01DSXNJbEFpT2lKWGFXNHpNaUlzSWtGT0lqb2lUV0ZwYkNJc0lsZFVJam95ZlE9PXwwfHx8&sdata=RFc4bHI3TGl1bVpvdE53d29VbDBtcDc0NEFteHc4U0NBWGR0bzNpVC9uaz0%3d)




