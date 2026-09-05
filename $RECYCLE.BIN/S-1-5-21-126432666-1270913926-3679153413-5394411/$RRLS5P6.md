
​​
### Reference Architecture Deployment Considerations

#### Provisioning a New TcX Cell (AWS Region)

A TcX Cell is required for each AWS region where deployment is planned. Typically, one TcX Cell is sufficient per region; however, multiple TcX Cells may be necessary to segregate internal and external customers using the same infrastructure. The following steps outline the process to provision a TcX Cell:

- [XCR Kubernetes Cluster Setup](../../../Documentation/Cell-Setup/Automation%20Prerequisites/XCR%20Kubernetes%20Cluster%20Setup/AWS/Request%20XCR%20Cluster)  
- [TcX Cell Setup](../../../Documentation/Cell-Setup/Automation%20Prerequisites/TcX%20Cell%20Setup/AWS/TcX%20Cell%20Account%20Setup/Cell%20Account/Create%20TcX%20Transit%20Gateway)  

#### Onboarding a New TcX Tenant Administrative Account with a Dedicated XCR Kubernetes Cluster

When there is a need of deploying TcX infrastructure to a Team Specific AWS Account and the Team also wants to keep their Containerized workload separate in team specific XCR Kubernetes cluster, follow the steps listed in section:

1. Refer to [XCR Kubernetes Cluster Setup](../../../Documentation/Cell-Setup/Automation%20Prerequisites/XCR%20Kubernetes%20Cluster%20Setup/AWS/Request%20XCR%20Cluster) (Skip [Request Transit Gateway Connection to TcX Cell Administrative Account (AWS Specific)](../../../Documentation/Cell-Setup/Automation%20Prerequisites/XCR%20Kubernetes%20Cluster%20Setup/AWS/Request%20Transit%20Gateway)).

2. Follow [Create route for the XCR Kubernetes cluster VPC CIDR range](../../../Documentation/Cell-Setup/Automation%20Prerequisites/TcX%20Cell%20Setup/AWS/TcX%20Cell%20Account%20Setup/Cell%20Account/Peering%20Between%20TCX%20and%20XCR%20TGW#create-route-for-xcr-kubernetes-cluster-vpc-cidr-range)
3. Complete [TcX Tenant Administrative Account (AWS Account) Setup](../../../Documentation/Cell-Setup/Automation%20Prerequisites/TcX%20Cell%20Setup/AWS/TcX%20Cell%20Account%20Setup/Cell%20Account/Create%20TcX%20Transit%20Gateway#tcx-cell-administrative-account-setup-aws-specific)  

#### Onboarding a New TcX Tenant Administrative Account

As the mapping of XCR Cluster and TcX Administrative Account is usually 1:1, If the XCR EKS Clusters exists in specific cell (AWS Region) and due to any circumstances, the customer wants to onboard a new TcX Administrative Account, Section [TcX Tenant Administrative Account (AWS Account) Setup](../../../Documentation/Cell-Setup/Automation%20Prerequisites/TcX%20Cell%20Setup/AWS/TcX%20Cell%20Account%20Setup/Cell%20Account/Create%20TcX%20Transit%20Gateway#tcx-cell-administrative-account-setup-aws-specific) setup needs to be followed.


An example reason for new AWS TcX Tenant Administrative Account creation is reaching AWS Hard Limits in an existing TcX Tenant AWS Account, or a Team specific boundary.

**Note:** Make use of existing an TcX Cell Administrative Account for TcX Tenant Administrative Account onboarding.  
