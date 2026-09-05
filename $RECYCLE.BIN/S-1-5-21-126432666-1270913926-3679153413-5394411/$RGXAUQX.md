# TCX Content Management/Content Management S1000D Runbook 

| **Document Status** | **Draft** |
| --------------- | ----- |
| **Date** | 11 April, 2025 |
| **Responsible** | Trish Laedtke |
| **Contributors** | Kehua Chang, Allan Tran, Jan Hampson |
| **Review By** | Girish Chidambaran, Niranjan Marathe |

> **NOTE:** This document covers both AWS and Azure.

## **Quick Information**

This section provides critical information for on calls on what can be done & who can be contacted in the event of an outage or other major performance issues.

### **Production Ready Alert Code Table (Alerts set to be monitored by CAPS/SRE Teams)**

No specific application alerts.

While Teamcenter Content Management and Teamcenter Content Management S1000D (CM/S1000D) are not set up for specific alerts in Teamcenter X monitoring, be aware, if these apps are not functioning, customers cannot ship their products, which rely on the documentation produced in these applications.

### **Escalation Policies**

| **Alert Response Level** | **PagerDuty Team Name** |
| --------------- | ----- |
| **Level 1** | CAPS RunOps |
| **Level 2** | CO-SRE |
| **Level 3** | Escalation Policy: Standard Tc X Premium <br /> PO: ?? <br /> Dev Manager: Vasant Kulkarni <br /> Architect: Niranjan Marathe |

## **1. Introduction**

### **Purpose and audience**

This document covers an operation description of the CM/S1000D applications. The purpose of this document is to provide guidance for on-call teams on how to escalate issues for this specific service.

The main audiences for this document are the SRE team, CAPS team, and Dev team.

### **Validity of the document**

This runbook is valid for descriptions only for the service operation of CM/S1000D.

## **2. Service Overview**

### **Service Goals**

CM/S1000D are applications within Teamcenter that support the creation of technical publications compliant XML schemas, managed as text topics/chunks and referenced graphics in a structure. Publications are managed with relationships to the root element object (topic, map, pubModule) that they were created from.

Technical publications examples include: spare parts catalogs, work instructions, maintenance and operations manuals, training exercises and owner manuals.

### **Stakeholders**

Responsibilities & Roles

| **Stakeholder** | **Role** | **Contact Information** |
| --------------- | ----- | --------------- |
| Trish Laedtke | Product Manager | Email: patricia.laedtke@siemens.com <br /> Phone Number: +1 (651) 285-7991 |
| Allan Tran | Application Manager | Email: allan.tran@siemens.com <br /> Phone Number: +1 (612) 916-1509 |
| LCS – Teamcenter X Premium | Service Team | |

### **Service Level Agreement (SLA)**

N/A – follows standard Teamcenter X Premium Monthly Uptime Percentage, excluding planned downtime.

Note that all CM/S1000D issue reports and problem and enhancement requests are found in Family: TEAMCENTER 🡪 Application: CONTENT_MGMT with the following functions:

| **Category** | **Explanation** |
| --------------- | ----- |
| **Family** | |
| TEAMCENTER | |
| **Application** | |
| CONTENT_MGMT |	Note: This is content, not context |
| **Function** | |
| ADMIN | Configuration of the environment for users |
| BINARY_COMPAT |	|
| CONFIG | Configuration of the system |
| CONTENT | Specific to content users create |
| DCCONTRIBUTIONS | Data model |
| DITA | Specific to DITA schemas, stylesheets |
| EDITING | Specific to integrated editors or editing in structure manager |
| EXPORT | Exporting content |
| IMPORT | Importing content |
| PUBLISH | Includes translator issues in Dispatcher, stylesheets, or applicability on publish |
| S1000D | Specific to S1000D schemas, stylesheets |
| SECURITY_RISK |	|
| TRANSLATION | This is not localization of software; this deals with the management of translation vendors, orders, or import/export of translated content and synchronization to master topics |

## **3. Logging**

Content Management/S1000D data is found in the Teamcenter logs. There are no additional logs.

## **4. System Overview**

This section provides a high-level description of the major parts of the service.

### **Architecture Overview**  

**Application Architecture Diagram:**

![Application Architecture Diagram](./image_220_001.png)

### **Access Overview**

No additional ingress points, services outside the private VPC; no additional APIs, daemon accounts, or password files.

This application does require access to DBA for document architect to configure admin data in the environment; this work must be done via the RAC. Typically, this is performed by an expert service provider in this space, although Siemens is starting to build up expertise in this discipline.

### **Application Interaction**

Content Management/S1000D typically interacts with several other applications to edit, publish, and manage translated content.

| **Function** | **Application Name** | **Usage** |
|-------------|---------------------|----------|
| Edit | JustSystem XMetaL XML | Users check-out, edit, and check-back in content. |
| Edit | SyncroSoft's Oxygen XML authoring applications | Users check-out, edit, and check-back in content. |
| Publish | Teamcenter dispatcher and translators | Users call specific publish applications that apply stylesheets to format the compiled XML for different media targets (PDF, HTML, etc.) |
| Distribute | RapidAuthor for Teamcenter (includes RapidCatalog, RapidLearning, RapidManual) | Distributes content created in RapidAuthor projects (managed as C3Ditem in Teamcenter) to CM/S1000D as topics, graphics and relationships. |

> **NOTE:** Every edit (checkout- and check-in), publish and export requires the content to be parsed via the Content Management SOA. The SOA parses and compiles or decompiles the XML for each function.

![Application Interaction](./image_220_002.png)

### **Network Overview [Optional]**

**Network & Infrastructure Layout**

![Image](./image_220_003.png)

![Image](./image_220_004.png)

### **Service Dependency Matrix [Required]**

1. Required services upon startup:
    1. Service Dispatcher
    2. File Repo
    3. TcVault
2. Required Services upon login:
    1. Teamcenter Security Services
        - When SSO enabled
    2. Teamcenter Web Tier
        - SOA
        - Username/password login 
3. Optional Services
    1. FMS/FSC
        - File upload
        - File download
        - File streaming
    2. Darsi
        - UI Builder
        - Dev Mode
    3. Tcgql
        - Discussions
        - Data Discovery
    4. Via Server
        - Vis related operations