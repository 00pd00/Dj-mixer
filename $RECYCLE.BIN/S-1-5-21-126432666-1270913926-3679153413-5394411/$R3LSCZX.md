

#### Request Transit Gateway connection to TcX Cell Administrative Account (AWS Specific)

**NOTE: This is NOT cluster-specific and an AWS Region-specific step. Skip this step if your XCR Kubernetes cluster and Tenant VPCs are in the `us-east-1` Region.**

In reference architecture, the "Transit Gateway Customer TcX" is created per region and connected with "Transit Gateway (T-5)" of TcX Cell Administrative Account using Transit Gateway Peering. This peering connection requires the XCR Team allocating specific CIDR ranges to TcX for the Tenant VPC Creations. This CIDR Range alignment task is owned by the LCS (PD) Team. **Kindly ask the LCS (PD) team to work with the XCR team for onboarding a new region and get CIDR range alignment with the XCR Team.Below request needs to be raised by the LCS (PD) team for establishing the transit gateway peering connection between TcX and XCR in a new AWS Region.**

Kindly follow the steps below to request a Transit Gateway connection.

Open FDSOne Help Center XCR request link: [https://fdsone.atlassian.net/servicedesk/customer/portal/26/group/34/create/107](https://fdsone.atlassian.net/servicedesk/customer/portal/26/group/34/create/107)

Fill in the following values in the form:
- **Summary**: Request for Transit Gateway peering connection to TcX Cell Administrative Account.  
- **Description**:  
    - **Region**: `<Region in which you need EKS cluster>`  
    - **Cluster Name**: `<Cluster Name received in "Request Kubernetes Cluster from XCR in the required cell">`  
    - **Namespace**: `prd-*`, `dev-*`, `uat-*`  
    - Request to create a new transit gateway for the region/continent and share it with the TcX Cell Administrative Account.  
    - **Cell Shared AWS Account ID**: `<Cell Shared Account ID>`  
    - **Region**: `<Region in which you need EKS cluster>`  
    - Requesting you to configure routing in the XCR Kubernetes cluster VPC to route traffic to TcX CIDR allocated for the new AWS Region. `<mention the region-specific CIDR agreed upon with XCR>`  
- **Severity**: P1  
- **Business unit / Segment**: DISW  
- **Product Name**: Cloud Operation  
- **FDSOne Cloud Operations**: Cloud Runtime  
- **Services**: XCR-Networking (DNS, Calico, Cert manager, Ingress)  

**Request Screenshot**:  
![Image](./image_7.png)

Once the request is submitted, coordinate with the XCR team for the status and follow-up. Provide additional information if required.

- Create a transit gateway at TcX Cell Administrative Account. (Steps at: [section](../../../../../Documentation/Cell-Setup/Automation%20Prerequisites/TcX%20Cell%20Setup/AWS/TcX%20Cell%20Account%20Setup/Cell%20Account/Create%20TcX%20Transit%20Gateway#tcx-cell-administrative-account-setup-aws-specific))  
- Work with the XCR Team to create Transit Gateway Peering with TcX and XCR Transit gateways. (Steps at: [section](../../../../../Documentation/Cell-Setup/Automation%20Prerequisites/TcX%20Cell%20Setup/AWS/TcX%20Cell%20Account%20Setup/Cell%20Account/Peering%20Between%20TCX%20and%20XCR%20TGW#create-peering-connection-between-tcx-and-xcr-tgw))

---