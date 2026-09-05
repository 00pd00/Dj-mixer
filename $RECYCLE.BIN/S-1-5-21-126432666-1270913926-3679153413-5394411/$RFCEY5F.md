## 1. Scope

**AIG** (Active Integration Gateway) is the integration platform for bi-directional data integration and process coupling between **Teamcenter (X)** and enterprise applications. This enables digital threads for customers beyond **Siemens systems** and the **Siemens Cloud**.

Several products use the integration platform to connect Teamcenter to other specific systems based on **smart connectors** (E.g. **T for Teamcenter** and **O for Oracle - T4O**) or to create a custom bidirectional integration to an external system from scratch based on **technical connectors** (**T4EA**). These products are mentioned in the next Chapters.

The scope of this cookbook is only the **Base Install** explained in the following chapters.

### 1.1 Products & Licenses

This cookbook is intended to enable you to carry out a basic installation of several products that are based on the **Active Integration Gateway Platform (AIG)** platforms. Only the technical abbreviations are used in the rest of the document. If the term **AIG** is used it means the foundation of all products.

#### TcX Premium (`-XT`)
| Product | Product ID | Abbrev. | License key (TC license file) |
| :-- | :-- | :-- | :-- |
| Teamcenter Gateway Extension Package | TC10317-XT | **T4EA** | `tfea` |
| Teamcenter Gateway for Enterprise Apps | TC10318-XT | **T4EA** | `tfea` |
| Teamcenter Gateway for Oracle EBS | TC10316-XT | **T4O** | `oracle_gateway` |
| Teamcenter Integration for SAP S/4HANA | TC10320-XT | **S4S** | `sap_gateway`, `sap_gateway_s4hana` |
| ↳ PLMSI Connector (part of S4S) | part of S4S TC10320-XT | **T4ST** | included in S4S |
| ↳ SAP RFC Netweaver Connector (part of S4S) | part of S4S TC10320-XT | **T4S** | included in S4S |

#### TcX Advanced (`TC73xx`)
| Product | Product ID | Abbrev. | License key (TC license file) |
| :-- | :-- | :-- | :-- |
| Teamcenter X Advanced Gateway for SAP S/4HANA | TC7302 | **S4S** | `sap_gateway`, `sap_gateway_s4hana` |
| ↳ PLMSI Connector (part of S4S) | part of S4S TC7302 | **T4ST** | `t4st` |
| Teamcenter X Advanced Gateway for Enterprise Apps | TC7301 | **T4EA** | `tfea` |
| Teamcenter X Advanced Gateway Extension Package | TC7304 | **T4EA** | `tfea` |

It should be noted that the **Teamcenter Integration for SAP S/4HANA** (**S4S**) product has an important difference from the rest, as it consists of two installation products. On the one hand, the **PLMSI Connector** or **T4ST**, which requires an SAP component called PLMSI in order to be connected to it. On the other hand, the **SAP RFC Netweaver Connector** or **T4S**, which establishes a connection to a specific set of **SAP ERP systems** via the RFC Netweaver Connector.

For TcX Advanced there a clear restrictions regarding Scenarios and what is allowed to be installed. 

In the following section, these are treated as separate products, although the **S4S** license acquires both.

### 1.2 Base Install & Project Work

This section of the document focuses on the left part of the diagram below. The AIG base installation is mentioned and referenced here. This base installation is dependent on the products selected, it is without a business configuration and without external systems and customer specific  artefacts. These points are dealt with in the middle by an implementation project with a separate SOW or an integration product based on T4EA or AIG Foundation.
![Image](./Base%20Install.png)

### 1.3 Supported AIG & Teamcenter Versions

This cookbook is for AIG 2606 and containerized TcX 2606. There won't be updated versions for patches or minor versions. 

## 1.4 Deployment Architecture

### 1.5 Active Integration Deployment Diagram with Tc X

The overview of the architecture is shown in the diagram below. This diagram is the basic diagram for TC X. Added components of AIG are shown in black and red, optional extensions, e.g. required for development purposes, are shown in a dashed orange line.
![Image](./Active%20Integration%20Deployment%20Diagram.png)

### Azure
The AIG is an analogue embedded in the TcX Azure architecture - similarly hosted on an EC2, where instead of AWS services, Azure services are used. 
![Image](./Azure.png)

#### Components explained

A more detailed view of the components can be seen in the following image, which enlarges the centre section of the image above.
![image](./Components%20explained.png)

**AIG - BGS:** The AIG Basic Gateway Service (BGS) is responsible for licensing and logging. This central service must be installed at least once per site and requires neither a target system (e.g. SAP, Oracle EBS, ...) nor a Teamcenter environment (except possibly for job execution, depending on the configuration). The AIG Job Server is a part of AIG BGS that manages transactions, which can be large and numerous, in the background. This allows the Teamcenter user to continue working while the system processes data.

**AIG -  GS:** The AIG Gateway Service (GS) controls the process mapping. It contains the complete AIG software (including all AIG servers, but not BGS). With this package, multiple AIG instances can be installed on the network, all of which can use the same AIG BGS instance. GS manages the connection to the target enterprise applications, operates the mapping, etc. It therefore requires a configured target system (e.g. SAP, Oracle EBS, ...) and a Teamcenter environment. This package contains both the client software and the programmable TCL code (mapping) or low-code pipelines that manage the transfers/imports. Large and numerous transactions can be executed asynchronously in the background with the help of the Job Server (BGS) and Job Agents (GS). Depending on the workload, there must be one or two GSs on the company server. If two GS are required, one is only responsible for the export (TC2X - where X is other systems) and one for the import (X2TC). The GS has its own EBS volume for installation and business configuration.

*   **AIG WebDV**: Dedicated server that ensures that the AIG client extensions can display the correct data.
*   **AIG libraries**: AIG installs several of its own libraries on the Corporate / TC server, which ensures that the data can be read and written from/to TC in an efficient manner.
*   **TC runtime**: This component is part of the TC delivery and ensures that AIG can connect to the TC database.

#### Connections from and to other systems (part of customer project SOW)

Connections from and to other external systems are always carried out with the corresponding GS. The setup and adjustments are **customer-specific** and depend on the systems, their locations, and the customer processes. For this reason, only general rules are defined here. The rest is part of an SOW or another product based on AIG. 
Please note this is not accounted in the costs of AIG. In the SOW quoting hardware and network choices must be considered which are not part of AIG.
![image](./connections.png)
                                                        Figure 3: allowed connectivity and Guardrails AIG

### 1.6 Combining multiple products

If several AIG products are to be installed for a customer, the deployment usually looks like this (simplified)
![image](./AIG%20Products.png)

This means that all products can be installed together but depending on the sizing multiple GS are required. There will only be one BGS again. Please note that if you have selected sizing for one product, sizing multiple products in parallel can increase sizing independently of the TC user.

## 1.7 Sizing

The sizing of the AIG products depends on the number of systems to be integrated, the technologies used, and the design of the process integrations. Therefore, AIG does not scale with e. g. TC users, and the implementation project has an impact on the sizing.

The technical simplified driver of the sizing of AIG is Total Concurrent (cc) Transfers as the amount of parallels transfers lead to new connections that need RAM and CPU power.  This is always part of the customer contract.

### Sizing AWS TcX Premium

![image](./AWS%20sizing.png)

### Sizing Azure TcX Premium

![image](./Azure%20sizing.png)
Please always include Ian Hadden of Integration Service Practice (ISP) or PD if more than 500 TC users are involved and multiple systems/products in parallel must be integrated. Please note that there are several assumptions/limitations regarding Sizing when it does not apply anymore and ISP must be integrated.

* Heavy Usage of Data Transfers

### Sizing & Guardrails TcX Advanced

Teamcenter X Advanced has a very specific sizing to decrease the costs. It uses the sizings from AWS and extends them with a configuration for 1 concurrent User.

| Product                           | # Users TC (author) | Max concurrent transfers for customer | Automation script value AWS |
| :------------                     | :------------------ | :------------------------------------ | :-------------------------- |
| S4S (TC7302) or T4EA (TC7301)     | 20-30               | max 1 concurrent transfers            | c5a.xlarge                  |
| S4S or T4EA                       | 31-70               | max 3 concurrent transfers            | c5a.2xlarge                 |
| S4S or T4EA                       | 70-200              | max 8 concurrent transfers            | c5a.4xlarge                 |
| S4S or T4EA                       | 200-300             | max 18 concurrent transfers           | c5a.8xlarge                 |
| Case S4S+T4EA (TC7302+TC7301/7304)| 20-30               | max 3 concurrent transfers            | c5a.2xlarge                 |
| Case S4S+T4EA                     | 31-70               | max 8 concurrent transfers            | c5a.4xlarge                 |
| Case S4S+T4EA                     | 70-200              | max 18 concurrent transfers           | c5a.8xlarge                 |
| Case S4S+T4EA                     | 200+300             | max 45 concurrent transfers           | c5a.12xlarge                |


The latest guardrails for TcX Advanced can be found in https://siemens.highspot.com/items/6945179a502acabf2382c95d#1. They are important for Service projects. 

For this cookbook the impact is activities in Chapter 4 are not relevant for TcX Advanced and others like

- no additional infrastructure like VPN or mTLS
- no open ports for external systems
- no PLMXML, no SOAP, only HTTPS
- only Workflow based transfers

### Edge Cases & Sizing Calculator

#### Out of the box products based on T4EA/AIG

For OOTB products like Methodics IPLM or T4EA the starting sizing should be the smallest - if not stated otherwise by the product team.

#### Sizing calculator

There is a calculator to determine a TC X and AIG sizing - this should be available by CAPS. Contact pls: ramesh.venugopal@siemens.com - His team has access to a calculator of TC X and AIG ian.hadden@siemens.com (his team is often responsible to make the business configuration after setup). With these information you can specify the effects on corporate server and which EC2 instance is needed for BGS.

####  Determination of sizing for multiple products

If several products, e.g. T4EA + S4S, are used in parallel, the additional simultaneous transmissions must be included. Normally, several products lead to more multiple transmissions in parallel, as several systems transmit data.

## 1.8 Pre-requisites for SaaS Operations

|                                       |                                                                                           | Version                                       |
|----------                             |----------                                                                                 |----------                                     |
| Teamcenter X                          | Teamcenter X Premium/Advanced installed and connection to the environment exists          |                                               |
| Teamcenter X running                  | Teamcenter X environment is live and running                                              |                                               |
| AWS Account                           | Siemens responsible to execute Cookbook you must have access to AWS with an AWS account   |                                               |
| Being able to run AWS CloudShell      | Able to interact with AWS cloudshell with **Administrator** rights                        |                                               |
| S3 Bucket access Right                | S3 Bucket with AIG installation artefacts (read/write access rights) and S3 Bucket with customer artefacts is accessible and it is possible to upload files in the customer bucket (read & write access rights)     |                                                                                                                                |
| Information by Customer Success Manager/ Team | From the Customer Success Manager (CSM) - please get the information of the to be installed AIG products, the sizing and if TC X - and the bought Licenses for TcX Author and AIG.   |  |
| Access to GITLAB Tenant Repo | Able to navigate to Tenant Repo/helm_charts/ E.g.: agtest05-prd/helm_charts/ and being able   | 2412 onward                             |
| TcX Virus scanning must be enabled for ITK calls  / FMS virus scanning | Please check Teamcenter documentation / cookbook e.g. `https://docs.sw.siemens.com/en-US/product/282219420/doc/PL20200604175134771.plm00071/html/xid1012753` / `https://docs.sw.siemens.com/en-US/product/282219420/doc/PL20200604175134771.plm00102/html/xid1307738`           |                                         |
| **Azure**  |                                                                                                                 |                                         |
| Azure Subscription | You have access to Azure Subscription in the contributor role to login into both DC maschine and AIG machine via Azure Bastion                    |                      |

##  (AWS) Location of Installation Artefacts

Please check if you have access to download the files from the following buckets:

**Pre-Production**

**KitsReleaseBucketName is the location of your either pre-production kit or production kit.**

-   `s3://<KitsReleaseBucketName>/teamcenter_add_on/active_integration_gateway/`
-   Example default region for dev: `s3://tcx-release-management-dev/teamcenter_add_on/active_integration_gateway/`
-   If other than default region and pre-prod: `s3://tcx-release-management-pre-production-<region>/teamcenter_add_on/active_integration_gateway/`
    -   `<region>` could be e.g. `eu-central-1`; for default or `us-east-1` you do not have to add region.

**Production**

-   `s3://<KitsReleaseBucketName>/teamcenter_add_on/active_integration_gateway/`
-   `s3://tcx-release-management-production/teamcenter_add_on/active_integration_gateway/`
-   If other than default regions: `s3://tcx-release-management-production-<region>/teamcenter_add_on/active_integration_gateway/`
    -   `<region>` could be e.g. `eu-central-1`; for default or `us-east-1` you do not have to add region.

**Customer Bucket**

Further, please check if you have write access to the customer specific bucket:

-   `s3://<customer-bucket>/teamcenter_add_on/active_integration_gateway/`

##  (Azure) Location of Installation Artifacts

Please check if you have access to download the files from the following Storage account and containers:

**Pre-Production**

**KitsReleaseContainerName is the location of either your pre-production kit or production kit in the admin storage account.**

- `<admin_storage_account>.blob.core.windows.net/<KitsReleaseContainerName>/teamcenter_add_on/active_integration_gateway/`
- Example for dev: `tcxadmin0002sa888.blob.core.windows.net/tcx-release-management-dev/teamcenter_add_on/active_integration_gateway/`
- pre-prod: `tcxadmin0002sa888.blob.core.windows.net/tcx-release-management-pre-production/teamcenter_add_on/active_integration_gateway/`

**Production**

- `<admin_storage_account>.blob.core.windows.net/<KitsReleaseContainerName>/teamcenter_add_on/active_integration_gateway/`
- Example for production container: `tcxadmin0002sa888.blob.core.windows.net/tcx-release-management-production/teamcenter_add_on/active_integration_gateway/`









