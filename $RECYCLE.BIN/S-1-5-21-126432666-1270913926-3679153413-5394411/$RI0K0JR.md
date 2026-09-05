## License Server EC2 Deployment Guide

This document outlines the steps to deploy **two EC2 instances** as license servers in separate Availability Zones for redundancy and high availability.

---
### Prerequisites

- Existing DC server EC2 instance
- AWS Console or CLI access with necessary permissions
- Gitlab Tenant Repo Access

---

### Environment Setup Instructions

#### 1. Add Two EC2 Instances

- **Availability Zones**:  
  Ensure the new EC2 instances are launched in two *different*  zones.  
  
  To know the Availability Zones:
  -  Open Tenant Repo in Gitlab.
  -  In tenant repo, open customer-information > ansible-state.yml.
  -  Inside ansible-state.yml, there are two fields primary_zone and secondary_zone.
  - You need to deploy new EC2 instances in primary zone and first secondary zone.
  - ![Tenant Repo Availability Zone](image.png)

- **AMI**:  
  Use the **same AMI** as the existing license server.
  
  To know the AMI being used:
  - Go to AWS Management Console
  - Open EC2 > Instances
  - Search your instance. Select Linux EC2.
  - In *details* tab, you can see the AMI
  - ![AMI](image-1.png)

- **IAM Role and Security Group**:
  In *security* tab, you can see the IAM Role and Security Group.
  ![IAM Role and Security Group](image-2.png)

- **Tags**:
  In *Tags* tab, you can see Tags
  ![Tags](image-3.png)

---

### EC2 Configuration Details

| Parameter          | Value / Instruction                                                                 |
|-------------------|--------------------------------------------------------------------------------------|
| **Name**           | `Siemens-<SoldToID>-<Env>-LicServer<N>` (e.g. Siemens-soo112b-prd-LicServer1)       |
| **Instance Type**  | `t3.medium`                                                                          |
| **Storage**        | `30 GiB`                                                                              |
| **Security Group** | Use the **same Security Group** as the existing DC server                            |
| **VPC**            | Use the **same VPC** as the existing DC server                                       |
| **Subnets**        | Use the **private subnets** inside same VPC of existing DC server                    |
| **IAM Role**       | Same as existing DC server (Search for IAM instance profile using `<SoldToID>`)      |
| **Tags**           | Replicate tags from the existing DC server                                           |
| **Key Pair**       | Select **"Proceed without key pair"** (.pem file not required)                       |

- Refer below image to configure the storage<br/>
  ![alt text](configure-storage.png)

- Refer below image to replicate the tags<br/>
  ![alt text](names-and-tags.png)

- Ensure during modification of tags do not modify `Name` and modify `SSMTag` value to lic1_linux and lic2_linux for LicServer1 and LicServer2 machine. Modify tags accordingly if you have more than 2 extra LicServers.

---

### Security Group Configuration

#### Modify Existing DC Server's Security Group

- **Allow Intra-VPC Communication** for the following port:
  - **security group name**: DCServer
  - **Type**: Custom TCP
  - **Source**: Custom
  - **Port range**: 28000-28001
  - **CIDR blocks**: VPC CIDR
  - **Port**: `28000-28001` (TCP)
  - Add both inbound and outbound rules with all VPC CIDR's

- Sample CIDR range
  ![CIDR-Range](../image10.png)
  
- Sample inbound/outbound security group entries needs to add
  ![security-entries](../image9.png)

- Go to security group and search for security group with `Siemens-<EnvType>-<TenantId>-DCServer-SecurityGroup` example : `Siemens-prd-oralic26-DCServer-SecurityGroup` <br/>
  ![alt text](security-group-search.png)

- Click on inbound rules <br/>
  ![alt text](inbound-rules.png)

- Go to VPC to check CIDR <br/>
  ![alt text](vpc.png)
  
> This ensures that all license servers can communicate with each other internally over port 28000 and 28001.

---

### Notes

- `<SoldToID>` and `<Env>` should be replaced with appropriate values based on the project or customer.
- Ensure monitoring and backups are enabled post-deployment if applicable.

---

