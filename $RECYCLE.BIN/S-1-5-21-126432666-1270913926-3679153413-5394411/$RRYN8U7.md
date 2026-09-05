## Azure

**Reference Diagram:** [cTcX Azure-WIP.vsdx](https://siemensapc.sharepoint.com/:u:/t/TcXAzure/EThSswO3pWZIl_IKYVcWvw8B2tYA75yuQLd85RqaDMsZ2w?e=CddN33)  
![Image](./image_2.png)

### Reference Architecture Components

- **TcX Administrative Subscription (Azure Subscription):**  
    An Azure Subscription unique per Management Group to host the shared tenant resources, such as VM Images and TcX Kits.

- **TcX Cell (Azure Subscription):**  
    A Cell represents an Azure Subscription in which tenant infrastructure is deployed.

- **Bootstrap ResourceGroup:**  
    A ResourceGroup per cell that maintains the terraform state of all the tenants and shared resources deployed in the cell in a StorageAccount. Each tenant's terraform state is kept in its own Container in the StorageAccount. The StorageAccount is protected via NetworkRules and backed-up in the BackupVault.

- **Shared ResourceGroup:**  
    A ResourceGroup per cell that hosts all the common resources across all the tenant deployments, like DNSPrivateConssd. This acts as a hub in the deployment architecture, with tenant ResourceGroups as spokes.

- **Tenant-env ResourceGroup:**  
    A ResourceGroup to place a tenant’s resources. This separates one tenant’s resources from any other.

- **Tenant VirtualNetwork:**  
    A network in a tenant’s ResourceGroup that defines the tenant’s individual network topology.

- **Tenant-common ResourceGroup:**  
    A ResourceGroup in the cell to host resources common to all environments of a tenant, like WAF Policies, Tenant Common Storage etc.

- **XCR (Xcelerator Container Runtime):**  
    Xcelerator Container Runtime (XCR) is a container orchestration platform that provides highly available and scalable secure self-service development and production environments for Siemens DISW SaaS cloud products. 

- **XCR VNet:**  
    An Azure VNet created for hosting an Azure AKS Cluster by XCR. This VNet belongs to Azure Account managed by XCR. 

- **TcX Management Plane Account (AWS Account):**  
    A shared service AWS Account, which consist of shared Teamcenter resources. like AdminLicence Server.

- **XCR/XCD Services (on-prem):**  
    Hosted Enterprise Gitlab used for Source control and CI for Automation Pipelines. 

- **Networking:**  
    To provide connectivity between Tenant Resources and Cluster resources, Networking is setup using Azure Virtual Network Peering.

- **XCR Vault:**  
    HashiCorp Enterprise Vault to store automation-specific secrets. Managed by XCR.

- **XCR Harbour:**  
    A registry for container images, offered as a platform service by XCR.

- **XCR Argo CD:**  
    Argo CD is an open-source, declarative, GitOps continuous delivery tool for Kubernetes applications. Offered as a platform service by XCR.