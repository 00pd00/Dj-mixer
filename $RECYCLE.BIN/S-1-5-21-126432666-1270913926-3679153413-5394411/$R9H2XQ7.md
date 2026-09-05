## AWS

### Reference Architecture Components

Ref Diagram - [Link](https://siemensnam.sharepoint.com/:u:/r/teams/disw_AWSInitiative/Shared%20Documents/TcX%20-%20XCR/TcX%20Containerized%20Reference%20Architecture%20Spring23/tcx_ref_arch_diagrams%20-%20TcX9.0%20(XCR).vsdx?d=w725786ffb4174185811f8390251973c7&csf=1&web=1&e=eSKV8G)  
​​
![Image](./image_1.png)  

- **TcX Cell (AWS Region):** Represents an AWS Region where tenant infrastructure is deployed.  
- **TcX Tenant Administrative Account (AWS Account):** A shared AWS Account used for deploying tenant infrastructure.  
- **TcX Tenant VPC:** An AWS VPC containing tenant-specific resources, providing a networking boundary between tenants.  
- **TcX Cell Administrative Account (AWS Account):** A shared service AWS Account hosting shared tenant resources. This account is separate from the TcX Tenant Administrative Account and is used for creating tenant VPCs. A single account can host shared services across multiple regions for respective TcX Cells.  
- **XCR (Xcelerator Container Runtime):** A container orchestration platform offering highly available, scalable, and secure self-service development and production environments for Siemens DISW SaaS cloud products.  
- **XCR VPC:** An AWS VPC created by XCR to host an AWS EKS Cluster. This VPC belongs to an AWS Account managed by XCR.  
- **TcX Management Plane Account (AWS Account):** A shared service AWS Account containing shared Teamcenter resources, such as the Admin License Server.  
- **XCR/XCD Services (on-prem):** Hosted Enterprise GitLab used for source control and CI for automation pipelines.  
- **Networking:** Provides connectivity between tenant resources and cluster resources. Networking is set up using AWS VPC Endpoint Service and AWS Transit Gateway.  
- **XCR Vault:** HashiCorp Enterprise Vault used to store automation-specific secrets, managed by XCR.  
- **XCR Harbour:** A container image registry offered as a platform service by XCR.  
- **XCR Argo CD:** An open-source, declarative GitOps continuous delivery tool for Kubernetes applications, offered as a platform service by XCR.  