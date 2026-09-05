<!-- ## TcX Cell Setup

### AWS

A cell is Unit of grouping which consists of: AWS region (where in the world), CIDR block, XCR Cluster account, Cluster name. TcX Cell consist of two AWS Accounts which needs to be created and managed by CApS.

- **TcX Tenant Administrative Account**
- **TcX Cell Administrative Account**

For TcX Deployment, There should be only Two TcX Cell Administrative Accounts. One for Internal stream and another for External stream. here is the difference between prod(customer) and pre-prod(internal) stream:

#### Any resources or deployments that customers pay for are in ”prod” domain

- Any customer deployments (prd/uat/dev) are created in prod domain
- Clusters are scoped to production level support.
- Databases and nodes are sized by the customer criteria.
- Product ID driven deploy using only released pipeline versions.
- SLAs are enforced at TcX requirements.
- Maintenance is on standard schedule.
- Datadog is enabled to capture all logs.

#### Any internal development resources are in “pre-prod” domain

- CIDR scope: CIDR ranges are defined by region and have to be managed separately in each region.  Pre-prod (scoped currently to just US-EAST-1) has a dedicated CIDR that is managed by LCS. The entire CIDR range can be “bulk loaded” into a single TcX cell/TGW and peered with corresponding XCR and management plane TGWs.
- SLAs are lower.
- Licensing: non-production license costs for the XCR infrastructure are typically cheaper/free (i.e. Vault, git, AWS, etc)
- Clusters are typically scoped smaller (cheaper) with fewer nodes (number, size, CPU, memory).
- Smaller databases.
- Number of warm servers
- Default deployment & development deployment pipeline versions allowed.
- Maintenance is driven by CVEs not a standard schedule.
- Datadog is not enabled to store logs, just live tail for 1 hour
- RBAC controls are typically loose because no access to customer data – the developer contractors, for example, can not have access to any production data, system, etc.

For more information about the terminology used here, please read: [Automation Pipeline Terminology](../../../../../../Cell-Setup/Automation%20Setup/Automation%20pipeline%20Terminology#automation-pipeline-terminology).

If TcX Tenant Administrative Account "fills up" to capacity limits, then it is possible to provision another TcX Tenant Administrative Account. Within the same geography/region use the new AWS Account. However, the TcX Cell Administrative Account is unique in your reference architecture (per stream/domain).

---

### TcX Cell Administrative Account Setup (AWS Specific)

As there is only one TcX Cell Administrative Account required, these steps should be executed only once per AWS Region. Current implementation of reference architecture has TcX Cell Administrative account setup in **185682516292** Account. All cTcX deployment for Internal stream should use existing TcX Cell Administrative Account. Do not create a new Cell Administrative Account without specific instructions from LCS (PD) Team, only perform the updates required while onboarding a new Cluster as mentioned in this document. These steps will be followed by CApS Team to create a TcX Cell Administrative Account for Customer stream. 

| AWS Resource | Default Quota | 1 Tenant | 100 Tenants | 200 Tenants | 300 Tenants | AWS Quota Code |
|--------------|--------------|-----------|-------------|-------------|-------------|----------------|
| Attachments per transit gateway | 5000 | 1 | 100 | 200 | 300 | L-E0233F82 |

This section describes the changes that need to be made at the Shared VPC/Transit Gateway level.

#### Cell Administrative Account Infrastructure Creation

##### Steps to Create Transit Gateway in TcX Cell Administrative Account

1. **Navigate to the VPC Service**:
    - Click on the "Services" dropdown menu at the top left corner of the console, then select "VPC" under the "Networking & Content Delivery" section.
    - ![Image](./image_19.png)

2. **Create Transit Gateway**:
    - In the VPC dashboard, select "Transit Gateways" from the left-hand menu.
    - Click on the "Create Transit Gateway" button.
    - ![Image](./image_20.png)
    - Fill in the necessary details such as Name, Description, and Amazon side ASN (Autonomous System Number).
    - ![Image](./image_21.png)
    - Click on "Create Transit Gateway" to create the transit gateway.
    - ![Image](./image_22.png)
    - You should see the transit gateway in the dashboard as available.

3. **Share Transit Gateway with AWS Resource Access Manager (RAM)**:
    - Go to the AWS Resource Access Manager (RAM) service by clicking on "Services" and then selecting "RAM".
    - ![Image](./image_23.png)
    - In the RAM dashboard, click on "Resource shares" from the left-hand menu. Click on "Create resource share".
    - ![Image](./image_24.png)
    - Choose "Transit Gateway" as the resource type. Select the Transit Gateway you created earlier from the dropdown.
    - ![Image](./image_25.png)
    - ![Image](./image_26.png)
    - Click next on “Associate managed permissions”.
    - Specify the principals with which you want to share the Transit Gateway. In this case, it is the AWS Account number of the XCR VPC.
    - ![Image](./image_27.png)
    - Click on Next, review, and "Create resource share".

4. **Create a FDSOne Help Center request to accept this share to be accepted by XCR team.**:
    - Open the FDSOne Help Center XCR request link: [https://fdsone.atlassian.net/servicedesk/customer/portal/26/group/34/create/107](https://fdsone.atlassian.net/servicedesk/customer/portal/26/group/34/create/107)
    - Fill in the form with the following values:
      - **Summary**: Accept transit gateway share request
      - **Description**:
         - Region: `<Region in which the transit gateway is created>`
         - We have created a TCX transit gateway `<TRANSIT_GATEWAY_ID>` and shared it with `<XCR_ACCOUNT_ID>`. Please accept the transit gateway share request.
      - **Severity**: P1
      - **Business Unit / Segment**: DISW
      - **Product Name**: Cloud Operation
      - **FDSOne Cloud Operations**: Cloud Runtime
      - **Services**: XCR-Others
    - Request Screenshot:
      - ![Image](./image_28.png)


##### Create TcX Transit Gateway in TcX Cell Administrative Account.

The Transit Gateway is created and configured in Cell Administrative Account Infrastructure. The created TGW will be used to connect with XCR and Tenant VPCs created in TcX Tenant Administrative Account.

Below screenshot shows the TGW that got created and added to Resource Access Manager.

![Image](./image_29.png) -->


# TcX Cell Setup

## Overview

A **TcX Cell** is a unit of grouping for resources, defined by the following:

- **AWS Region**: Determines physical location of resources
- **CIDR Block**: Defines the address space
- **XCR Cluster Account**: AWS account for cluster
- **Cluster Name**: Unique identifier for the cluster

Each TcX Cell uses two AWS accounts, managed by CApS:

- **TcX Tenant Administrative Account**
- **TcX Cell Administrative Account**

> **Note**: For TcX deployment, create **only two TcX Cell Administrative Accounts**—one for the Internal stream and one for the External stream.

### Stream Differences

#### Production ("prod") Domain

All customer-facing resources and deployments reside in the "prod" domain.

- Customer deployments (prd/uat/dev) occur here
- Clusters support production-level workloads
- Database and node sizes are defined by customer requirements
- Only released pipeline versions, based on product ID, are deployed
- SLAs align with TcX requirements
- Regular maintenance schedule applies
- **Datadog** captures all logs

#### Pre-Production ("pre-prod") Domain

All internal development resources reside in the "pre-prod" domain.

- **CIDR Scope**: Defined by region (currently scoped to US-EAST-1 and managed by LCS)
- Each cell/TGW is peered with the corresponding XCR and management plane TGWs
- Lower SLAs
- Infrastructure licensing is typically cheaper/free (Vault, Git, AWS, etc.)
- Clusters are smaller and less costly (fewer nodes, reduced resource allocation)
- Databases are smaller
- Fewer warm servers
- Both default and development pipeline versions are allowed for deployment
- Maintenance is prioritized by CVEs, not routine schedule
- **Datadog** logs only available as live tail for 1 hour
- Loose RBAC controls (no access to production data)

> **For terminology details, see:** [Automation Pipeline Terminology](../../../../../../Cell-Setup/Automation%20Setup/Automation%20pipeline%20Terminology#automation-pipeline-terminology)

### Administrative Account Limits

- If a **TcX Tenant Administrative Account** reaches capacity, provision a new one within the same region as needed.
- Each **TcX Cell Administrative Account** is unique per reference architecture and stream/domain.

---

## TcX Cell Administrative Account Setup (AWS Specific)

You should have **only one TcX Cell Administrative Account per AWS Region**. Follow these steps once per region. The current reference implementation uses account **185682516292** for TcX Cell Administrative tasks related to the internal stream.

> **Important**: Do not create a new Cell Administrative Account without clear instructions from the LCS (PD) Team. Only update the existing account as needed during new cluster onboarding.

#### AWS Resource Quota Table

| AWS Resource                          | Default Quota | 1 Tenant | 100 Tenants | 200 Tenants | 300 Tenants | AWS Quota Code |
|----------------------------------------|:-------------:|:--------:|:-----------:|:-----------:|:-----------:|:--------------:|
| Attachments per transit gateway        |     5000      |    1     |    100      |    200      |    300      |  L-E0233F82    |

---

## Cell Administrative Account Infrastructure Creation

Below are the steps for creating and configuring infrastructure at the Shared VPC/Transit Gateway level.

### Steps to Create a Transit Gateway in the TcX Cell Administrative Account

1. **Access the VPC Service**
    - In the AWS Console, select **Services > VPC** under "Networking & Content Delivery".
    - ![VPC Service](./image_19.png)

2. **Create a Transit Gateway**
    - In the VPC dashboard, select **Transit Gateways** from the left menu.
    - Click **Create Transit Gateway**.
    - ![Create Transit Gateway](./image_20.png)
    - Enter the required details (Name, Description, and Amazon side ASN).
    - ![Transit Gateway Details](./image_21.png)
    - Click **Create Transit Gateway** to complete.
    - ![Created Transit Gateway](./image_22.png)
    - Your new transit gateway will display as available in the dashboard.

3. **Share the Transit Gateway Using AWS Resource Access Manager (RAM)**
    - Go to **Services > RAM**.
    - ![Go to RAM](./image_23.png)
    - In RAM, select **Resource shares** > **Create resource share**.
    - ![Resource Shares](./image_24.png)
    - Choose "Transit Gateway" as the resource type and select your new Transit Gateway.
    - ![Select Transit Gateway](./image_25.png)
    - ![Associate Resource](./image_26.png)
    - Click **Next** for managed permissions.
    - Specify the AWS Account Number of the XCR VPC as the principal to share with.
    - ![Specify Principals](./image_27.png)
    - Click **Next**, review, and then **Create resource share**.

4. **Request Acceptance by the XCR Team**
    - Open a request at [FDSOne Help Center](https://fdsone.atlassian.net/servicedesk/customer/portal/26/group/34/create/107).
    - Fill in the following:
        - **Summary**: Accept transit gateway share request
        - **Description**:
            - *Region*: `<Region in which the transit gateway is created>`
            - *Message*: "We have created a TCX transit gateway `<TRANSIT_GATEWAY_ID>` and shared it with `<XCR_ACCOUNT_ID>`. Please accept the transit gateway share request."
        - **Severity**: P1
        - **Business Unit / Segment**: DISW
        - **Product Name**: Cloud Operation
        - **FDSOne Cloud Operations**: Cloud Runtime
        - **Services**: XCR-Others
    - ![Request Screenshot](./image_28.png)

---

### Completion

Once the Transit Gateway is created and shared, it is available within the Cell Administrative Account infrastructure. This Transit Gateway connects with the XCR and Tenant VPCs created in the TcX Tenant Administrative Account.

Below is an example of the Transit Gateway visible in the Resource Access Manager:

![Transit Gateway Resource Access](./image_29.png)