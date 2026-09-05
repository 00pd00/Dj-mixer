##### Increase the AWS Resources Service Quotas

For each new tenant, the tenant stack (VPC, Aurora RDS Database, EFS, etc.) is deployed in this AWS Account. Therefore, the [AWS Service Quotas](https://docs.aws.amazon.com/general/latest/gr/aws_service_limits.html) need to be increased to fit the amount of tenants and their resource needs. Please keep in mind that some quotas are AWS Account level, while others are region-specific.

Below is a list and guide providing the steps to increase the relevant quota.

###### Guideline Table for Service Quota Increase

This table gives a guideline on which AWS Service Quota you need to increase to what level to accommodate X tenants with 1 environment (dev, uat, prd). Since tenant environments do not share any infrastructure, to calculate the Service Quota for multiple environments, multiply accordingly.

**Table 1: Guideline Table for Service Quota Increase**

| AWS Resource | Default Quota | 1 Tenant | 100 Tenants | 200 Tenants | 300 Tenants | AWS Quota Code |
|--------------|--------------|-----------|-------------|-------------|-------------|----------------|
| Amazon VPC |  |  |  |  |  | |
| VPCs per Region | 5 | 1 | 100 | 200 | 300 | L-F678F1CE |
| Internet gateways per Region | 5 | 1 | 100 | 200 | 300 | L-A4707A72 |
| VPC security groups per Region | 2500 | 8 | 800 | 1600 | 2400 | L-E79EC296 |
| Network interfaces per Region | 5000 | 22 | 2200 | 4400 | 6600 | L-DF5E4CA3 |
| NAT gateways per Availability Zone | 5 | 1 | 100 | 200 | 300 | L-FE5A380F |
| |  |  |  |  |  | |
| Amazon RDS |  |  |  |  |  | |
| Parameter groups* | 50 | 1 | 100 | 200 | 300 | L-DE55804A |
| DB cluster parameter groups* | 50 | 1 | 100 | 200 | 300 | L-E4C808A8 |
| DB clusters | 40 | 1 | 100 | 200 | 300 | L-952B80B8 |
| DB instances | 40 | 1 | 100 | 200 | 300 | L-7B6409FD |
| DB subnet groups | 50 | 1 | 100 | 200 | 300 | L-48C6BF61 |
| |  |  |  |  |  | |
| Amazon Route 53 |  |  |  |  |  | |
| Hosted zones | 500 | 1 | 100 | 200 | 300 | L-4EA4796A |
| Records per hosted zone | 10000 | 9 | 900 | 1800 | 2700 | L-E209CC9F |
| |  |  |  |  |  | |
| Amazon Simple Storage Service (Amazon S3)  |  |  |  |  |  | |
| Buckets | 100 | 1 | 100 | 200 | 300 | L-DC2B2D3D |
| |  |  |  |  |  | |
| Amazon Identity and Access Management (IAM)  |  |  |  |  |  | |
| Roles per account | 1000 | 2 | 200 | 400 | 600 | L-FE177D64 |
| Instance profiles per account | 1000 | 2 | 200 | 400 | 600 | L-6E65F664 |
| |  |  |  |  |  | |
| Amazon Elastic Block Store (Amazon EBS)   |  |  |  |  |  | |
| Storage for General Purpose SSD (gp2) volumes, in TiB | 50TB | 0.38TB | 38TB | 76TB | 114TB | L-D18FCD1D |
| |  |  |  |  |  | |
| Amazon Elastic Compute Cloud (Amazon EC2)   |  |  |  |  |  | |
| EC2-VPC Elastic IPs | 5 | 1 | 100 | 200 | 300 | L-0263D0A3 |
| Running On-Demand Standard instances (VCPU) | 5 | 14 | 140 | 280 | 420 | L-1216C47A |
| Attachments per transit gateway | 5000 | 1 | 100 | 200 | 300 | L-E0233F82 |
| Transit gateway(applicable for replica full clone deployment with FSx volume type) | 5 | 1 | 100 | 200 | 300 | L-A2478D36 |
| Attachments per transit gateway(applicable for replica full clone deployment with FSx volume type) | 5000 | 2 | 200 | 400 | 600 | L-E0233F82 |
| Route Tables per transit gateway(applicable for replica full clone deployment with FSx volume type) | 20 | 1 | 100 | 200 | 300 | L-43872EB7 |
| |  |  |  |  |  | |
| Amazon Elastic File System (EFS)    |  |  |  |  |  | |
| File systems per account | 1000 | 2 | 200 | 400 | 600 | L-848C634D |
| |  |  |  |  |  | |
| Elastic Load Balancing (ELB)  |  |  |  |  |  | |
| Target Groups per Region | 1000 | 1 | 100 | 200 | 300 | L-A0D0B863 |
| Application Load Balancers per Region | 50 | 1 | 100 | 200 | 300 | L-53DA6B97 |
| Listeners per Application Load Balancer | 50 | 1 | 100 | 200 | 300 | L-B6DF7632 |
| Rules per Application Load Balancer | 100 | 1 | 100 | 200 | 300 | L-7EED9B64 |
| |  |  |  |  |  | |
| Amazon FSx (FSx)    |  |  |  |  |  | |
| Amazon ONTAP backups | 10,000 | 1 | 100 | 200 | 300 | L-C431DBA3 |
| Amazon ONTAP file systems | 100 | 1 | 100 | 200 | 300 | L-C28C1403 |
| Amazon ONTAP SSD IOPS | 2,000,000 | 3072 | 307200 | 614400 | 921600 | L-57578687 |
| Amazon ONTAP SSD storage capacity | 1,048,576 GiB | 1024 GiB | 102400 GiB | 204800 GiB | 307200 GiB | L-E2C89679 |
| Amazon ONTAP throughput capacity | 10,240 MBps | 128 MBps | 12800 MBps | 25600 MBps | 37400 MBps | L-C5F860DD |

###### AWS Resource Quotas Request Steps

Follow the [AWS Documentation](https://docs.aws.amazon.com/servicequotas/latest/userguide/request-quota-increase.html) to increase the service quota limit.

> **Note**  
> The value **"DB Cluster Parameter Groups"** is marked by AWS as non-adjustable. However, increasing the Account Level Service Quota called **"Parameter Groups"** for RDS will indirectly increase the limit for **DB Cluster Parameter Groups**.  
> 
> For example, increasing the **"Parameter Group"** value to 100 also increases the **"DB Cluster Parameter Groups"** value to 100.  
> 
> ![Image](./image_40.png)  
> *Figure 1: Parameter Group quota increased to 100*  
> 
> ![Image](./image_41.png)  
> *Figure 2: DB Cluster Parameter Group increased to 100 by increasing Parameter Group Value*