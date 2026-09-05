### Additional License Server Deployment Guide

This document outlines the steps to deploy **two virtual machines as license servers** as license servers in separate Availability Zones for redundancy and high availability.

### Environment Setup Instructions

---

### Prerequisites

- Existing corporate server virtual machine for the tenant
- Azure subscription access where the tenant is deployed
- Gitlab Tenant Repo Access. (e.g., tenantid:`neh4500` --[link](https://gitlab.industrysoftware.automation.siemens.com/tcx-containers-deploy-automation/tcx-tenant-repos-dev/neh4500-prd))

---

#### I. Note the existing corporate server VM information.

1. Login to Azure portal
2. Go to the [tcx-tenant-`<tenantID>`-`<env>`-rg] (e.g. tcx-tenant-neha4501-prd-rg) for tenant where the triad licenses setup is required.
3. Search for Virtual Machine, open the existing corporate server VM, and note the following VM information:
    - Region
    - Subscription
    - Resource Group
    - VNet
    - Size
    - RHEL version
    ![alt text](image-6.png)

---

#### II. Create Two linux virtual machines

1. Login to Azure portal
2. Go to the [tcx-tenant-`<tenantID>`-`<env>`-rg] (e.g. tcx-tenant-neha4501-prd-rg) for tenant where the triad licenses setup is required.
3. Search for Virtual Machine, select the existing corporate server VM, click create.

    ![alt text](image-7.png)
4. Select RHEL for Microsoft Azure on Marketplace page and click create.

    **Note**: While creating the server, ensure that you select the correct RHEL version matching the existing corporate server’s RHEL version noted in the previous steps.
    ![alt text](image-4.png)

5. On the create a virtual machine page fill required information in each section.

    -  Select different zones for both the servers e.g zone 2 for 2nd server, zone 3 for 3rd server.
    - Select Authentication type as SSH public key, and select existing ssh key source.

- Refer to the information below for the respective sections.

    **Note**: Fill in the information for the listed sections; the other sections can be kept as suggested.

| Section           | **Variable**       | **Value** |
|-------------------|--------------------|---------------------------|
| **Basic**         | Subscription       | `<your subscription name>`|
|                   | Resource group     | `<your resourcegroup>`    |
|                   | Virtual machine name | `<splmlicense2>` (for 1st server, `<splmlicense2>` for 2nd server `<splmlicense3>`) |
|                   | Region             | `<subscription region>`   |
|                   | Availability options | Availability zone        |
|                   | Zone options       | Self-selected zone        |
|                   | Availability zone  | Zone2 (for 1st server, `<zone2>` for 2nd server `<zone3>`) |
|                   | Size               | Same as existing Linux server (e.g., Standard_D8ds_v5 - 8 vCPUs, 32 GiB memory ($397.12/month)) |
|                   | Authentication type | SSH public key           |
|                   | Username           | azureuser                 |
|                   | SSH public key source | Use existing key stored in Azure |
|                   | Stored Keys        | tcx-tenant-`<tenantID>`-`<env>`-sshkey |
|   Example        |![alt text](image-10.png) | ![alt text](image-11.png) |
| **Disks**         | ![alt text](image-12.png) |                           |
| **Networking**    | Virtual network    | tcx-tenant-`<tenantID>`-`<env>`-vnet |
|                   | Subnet             | tcx-tenant-`<tenantID>`-`<env>`-priv-snet |
|                   | Public IP          | None                      |
|                   | NIC network security group | Advanced          |
|                   | Configure network security group | tcx-tenant-`<tenantID>`-`<env>`-CorpServer-nsg |
|  Example          |![alt text](image-13.png) |   |
| **Tags**          | account-owner      | `<emailid>`               |
| Example           | ![alt text](image-14.png)|    |


6. Review and create the vm and wait for few minutes for the vm to get deployed.
After successful deployment, go to the resource and connect to the linux vm using the same SSH key.
 - Steps to connect to the VM->[Login to CorpServer](../../../../../../Documentation/Operations/Day%20N%20Operations/Login%20to%20CorpServer)

---

##### III. Update Hostname

Update hostname and Ip address
1. Retrieve the private IP and hostname of the server:
    ```bash
    hostname -I | awk '{print $1}'
    hostname
    ```
2. Create a list of the IP addresses and hostnames in the following format:
    ```bash
    <Private_Ip_address> <hostname>
    <Private_Ip_address2> <hostname2>
    <Private_Ip_address3> <hostname3>
    ```
3. Add the list of IP addresses and hostnames inside the file and save the file.
    ```bash
    cd /etc/
    vi hosts
    ```

---

##### IV. Verify the network settings of corp server vm.

1. Check current firewall settings:
    ```bash
    sudo firewall-cmd --list-all
    ```
2. Verify that the following ports are enabled.
    
    ![alt text](image-15.png)

3. If the ports are not listed, execute the following commands to add them.
    ```bash
    sudo firewall-cmd --zone=public --add-port=28000/tcp --permanent
    sudo firewall-cmd --zone=public --add-port=28001/tcp --permanent
    sudo firewall-cmd --reload
    ```

---



