### Azure

The following section outlines the process by which pods deployed on Kubernetes cluster and the Dispatcher service in the tenant VNet can establish a connection to the common license server deployed in a Shared VNet within the same subscription. Our objective is to enable all tenants in a subscription to access the common license server in the Shared VNet. The Shared VNet would be in the same TcX cell.

## Pre-Requisites

- Access to the tenant repositories containing the helm charts and configurations.
- Access to the Azure subscription as a Contributor where tenants are deployed to create a VM to host common license server, update private hosted zone entries.
- VNet peering between the Shared VNet and the XCR cluster VNet

## High-Level Steps

1. Create a Linux VM in the shared VNet
2. Gather environments’ information.
3. Enable communication from containers deployed within the XCR K8s cluster to the shared license server deployed in the Shared VNet.
4. Enable communication from Dispatcher machine to the shared license server deployed in the Shared VNet.

## Create a Linux VM in the shared VNet

1. Activate your Contributor access to tenant subscription `YOUR_TENANT_SUBSCRIPTION` through PIM in Azure portal.
2. Go to Virtual Machines.
3. Click on Create button and select Virtual Machine from the drop down.
4. Populate the following VM fields with the below specified values:
- **Resource Group** Select the Shared Resource Group from the list of existing Resource Groups
- **Virtual machine name** "common-license-server"
- **Image** Click on "See all images" -> Under "Other items" on the left pane, click on "Shared Images" -> Select "azure-linux-image".
- **Authentication type** "SSH public key"
- **Username** "azureuser"
- **SSH public key source** "Generate new key pair"
- **SSH Key Type** "RSA SSH Format"
- **Key pair name** "common-license-server_key"
- **License type** "Red Hat Enterprise Linux"
5. Click on Next : Disks -> Next : Networking
6. Set "Public IP" field to None
7. Click on "Review and Create"
8. After the Validation is passed, click on "Create"

## Install License Server in the above created VM

1. Navigate to the Virtual Machines.
2. Locate the License server VM created in shared VNet.
3. Select and click on Connect -> Connect via Bastion
4. Populate the fields as follows-
- **Username:** azureuser
- **Authentication Type:** SSH Private Key from Local File
- **Local File:** Download the vm keypair from the path, "tcx/automation/servers/keypair/vm_keypair" inside Hashicorp vault.
5. Click on Connect.
6. Copy the license server from Devops Management plane SA using the azcopy command-
```
azcopy copy "<blob storage URL of SiemensLicenseServer_<version>_Lnx64_x86-64.bin>?<SAS Token>" "/tmp/"
```
7. Execute the following commands from the license server VM-
```
cd /tmp
yum install -y redhat-lsb-core
chmod 777 SiemensLicenseServer_<version>_Lnx64_x86-64.bin
useradd --system  -g 1000 saltd
./SiemensLicenseServer_<version>_Lnx64_x86-64.bin -silent -licensefile /root/<license-file.lic> -destination /usr/Siemens/PLMLicenseServer -user saltd -licensePort 28000 -vendorPort 28001
```
8. Execute below commands to unblock License server ports to avoid VM firewall from blocking the traffic
```
sudo firewall-cmd --zone=public --add-port=28000/tcp --permanent
sudo firewall-cmd --zone=public --add-port=28001/tcp --permanent
sudo firewall-cmd --reload
```

## Gather the required Environment Configurations

We need the following information about the environments:

- **License Server IP** (private IP of VM hosting License server) from Shared VNet
- **Private DNS Zone Name** in the Azure subscription where tenants are deployed

### License Server IP

Activate your Azure subscription in Azure portal where the Shared VNet is present and find the SPLM license server IP in the Overview -> Properties section of the License server VM.

### Private DNS Zone of the tenant TcX Cell

1. Go to any tenant repository of the Cell environment.
2. Look for the `/customer-information/pipeline-output.md` file in the repository.
3. Note down the Private DNS Zone Name.

Refer to the diagram below:

![Environment Configuration Diagram](./image_456.png)

## Configure Windows VMs of Workloads to Reach Shared License Server

1. Activate your tenant subscription in Azure portal.
2. Go to Private DNS Zones.
3. Click on the Private DNS Zone name of the tenant.
4. Go to DNS Management section in the left pane and select Recordsets.
5. Search with the value of the tenant's DNS subdomain name
6. Edit the record with the name set to ``<DNSSubdomainName.license-service.prd>``.
7. Update the "IP address" field with the license server IP address.
8. Click on Apply


## Configure K8S Workload to Use Shared License Server

### Update `infra.yaml` File in the Helm Charts of UAT

1. Go to the tenant repository.
2. Look for the `/helm_charts/infra.yaml` file in the repository.
3. Use the IP address of the Production License Server to update the Cell environment by modifying the `ADMIN_LICENSE_SERVER_IP` and `SPLM_LICENSE_SERVER_IP`.

    ![Infra.yaml Update](./../image_448.png)


### Sync the Teamcenter Application of UAT Using ArgoCD

1. Open the ArgoCD console.
2. Choose the namespace in ArgoCD of the Tenant environment.

    ![ArgoCD Namespace](./../image_450.png)

3. Click on the `teamcenter-tcx-helm` tile in ArgoCD and click on **Sync**.

    ![ArgoCD Sync](./../image_451.png)

4. Ensure that the latest GitLab commit ID of the UAT environment repository and the ArgoCD commit ID are the same. If not, click on the **Sync** option in ArgoCD again.

    ![Commit ID Verification](./../image_452.png)

    ![Sync Confirmation](./../image_453.png)

### Verify Login to Active Workspace Console

1. Log in to the AWC console of the Tenant environment and ensure you can log in without any license error issues.

    ![AWC Console Login](./../image_454.png)

2. Check the connectivity from the Dispatcher Windows Machine to the Common License Server:
    - Open CMD on the Dispatcher Windows Machine and run the following command:
      ```
      ping <License_Server_IP_or_Hostname>
      ```
    - For example:

      ![Ping Command Example](./../image_455.png)

    - If you receive replies, the Dispatcher can reach the License Server. If you see timeouts or errors, the connectivity is blocked.
