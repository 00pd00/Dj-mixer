# Teamcenter X Configuration Management Responsibilities

    

Teamcenter X

Configuration Management Responsibilities

Version 0\.1 Draft for review 

Version History

S\.NO\.

Date

Version

Description

1

2022\-04\-29

0\.1

Initial version \[Girish Chidambaran\]

Review and Approvals

S\.NO\.

Name

Version

Date

Role

Contents

[Objective And Scope	3](#_Toc171863106)

[Key Elements of Teamcenter X Service Offering	3](#_Toc171863107)

[Conclusion	4](#_Toc171863108)

# <a id="_Toc171863106"></a>Objective And Scope

The objective of this document is to outline different elements of Teamcenter X deployments and their configuration management responsibilities\. This document stops with identification of configuration management system, process owner and tool owner of the configuration management systems\. This document does not provide details of processes and procedures involved in those teams\.

# <a id="_Toc171863107"></a>Key Elements of a Teamcenter X Deployment

The elements of Teamcenter X deployment are as follows:

- Infrastructure, including compute, storage, network, security, OS, runtime environments and middle\-ware components, referred in this document as runtime environment\.
- Teamcenter software
- Customer specific configurations\.

The configuration management system, process ownership and system ownership for them are stated below:

### Teamcenter X runtime environment

#### Teamcenter runtime environment is constructed with Infrastructure as Code \(IaC\) tools like Terraform and Ansible\. 

#### The code is developed, maintained in GitLab by the Teamcenter X development team and release to CApS\.

The GitLab tooling is maintained by Digital Industries Foundation and Data Services Pillar 0 \(DI FDS IDS\) team\.

### Teamcenter Software

Teamcenter software is developed and maintained by Teamcenter development teams\. The source code is managed in GitLab tooling maintained by Digital Industries Foundation and Data Services Pillar 0 \(DI FDS IDS\) team and DMS that is maintained by Digital Industries Software Development Operations \(DI SW T&I DO\) team\.

### Customer Specific Configuration

The customer specific configurations are managed in tenant specific repositories in GitLab, by CApS\.

The source code is managed in GitLab tooling maintained by Digital Industries Foundation and Data Services Pillar 0 \(DI FDS IDS\) team\.

