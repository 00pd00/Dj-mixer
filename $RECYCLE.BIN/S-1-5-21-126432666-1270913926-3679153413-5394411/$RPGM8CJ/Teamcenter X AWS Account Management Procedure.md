# Teamcenter X AWS Account Management Procedure

    

Teamcenter\-X

AWS Account Management Procedure

Version 0\.1 

Version History

S\.NO\.

Date

Version

Description

1\.0

25/02/2025

0\.1

Initial Version

Review and Approvals

S\.NO\.

Name

Version

Date

Role

1\.0

Collar Ben

0\.1

10/03/2025

PSSE

Contents

[AWS Account Management	2](#_Toc721842658)

[1\.	Principles	3](#_Toc1257937459)

[2\.	Roles and Responsibilities	3](#_Toc616453392)

[3\.	Procedures	3](#_Toc986174214)

[4\.	References	3](#_Toc2074893174)

Teamcenter\-X Procedures

# <a id="_Toc721842658"></a>AWS Account Management

The document is a formal procedure to outline the working agreement for onboarding and offboarding AWS cloud account for TCX Development Teams\.

##### Policy Tag

[Siemens Industry Software \(SISW\) SaaS Information Security Policy\.pdf](https://siemensnam.sharepoint.com/:b:/r/teams/disw_ISMS/Policies/Siemens%20Industry%20Software%20(SISW)%20SaaS%20Information%20Security%20Policy.pdf?csf=1&web=1&e=2xE6u4)

[Siemens Industry Software \(SISW\) SaaS Network Security Policy\.pdf](https://siemensnam.sharepoint.com/:b:/r/teams/disw_ISMS/Policies/Siemens%20Industry%20Software%20(SISW)%20SaaS%20Network%20Security%20Policy.pdf?csf=1&web=1&e=snIJ0W)

##### Scope

Procedure scope covers the following three tasks\.

1. Onboarding new AWS account
2. Changes into existing AWS account
3. Offboarding AWS account

## <a id="_Toc1257937459"></a>Principles

We follow consistent configuration across all aws accounts\. This principle is to ensure all new and existing  aws accounts have same baseline configuration and they are onboarded into all agreed tooling

Up to date aws account inventory – This principle requires new aws accounts to be onboarded immediately, and offboarded aws accounts are removed from all tooling and monitoring as soon as possible\.

## <a id="_Toc137544288"></a><a id="_Toc138404965"></a><a id="_Toc616453392"></a>Roles and Responsibilities

Account Owner

Request new aws account

Onboard/Offboard/Modify aws configuration

Point of contact for all activities

PSSE

Validate aws account onboarding

Include new account in periodic security activities

Remove offboarded aws account from periodic security activities

Scrum Master

__Delegate to Account Owner__

## <a id="_Toc986174214"></a>Procedures

### Onboarding new AWS account

1. Request new aws account using [JIRA ticket](https://siemensomneo.atlassian.net/servicedesk/customer/portal/1/group/14/create/156)

Ensure following parameters are set correctly:

- SaaS Product = TcX
- Project group = TcX
- Product & Solution Security Officer \(PSSO\) Email = [laura\.dominique@siemens\.com](mailto:laura.dominique@siemens.com) 
- Product & Solution Security Expert \(PSSE\) Email = __ __[benjamin\.collar@siemens\.com](mailto:benjamin.collar@siemens.com)

1. Co\-ordinate with Pathfinder team for enrolling account in AWS Patch Management\.

- Point of contact – Godase Abhijeet \([abhijeet\.godase@siemens\.com](mailto:abhijeet.godase@siemens.com) \)

1. Co\-ordinate with Zeus team for onboarding account into CloudOps tool\. 

Kindly fill out [Steps to gather AWS Account information for the reporting tools v3\.docx](https://siemensnam.sharepoint.com/:w:/r/teams/disw_plc_coi_fdo/cyber/Shared%20Documents/ISMS%20Procedures%20for%20TcX%20Development/Source%20Files/Steps%20to%20gather%20AWS%20Account%20information%20for%20the%20reporting%20tools%20v3.docx?d=w224572f4c2dc4c3e8ddbb29f99e613aa&csf=1&web=1&e=E6Idg0) 

Point of contact – Shamsundar Machale \([shamsundar\.machale@siemens\.com](mailto:chase.bristow@siemens.com) \)

1. Add the new account to the TcX AWS Account List [AWS Account List < Asset Inventory < Documents & Pages < Teamcenter](https://mypolarion.industrysoftware.automation.siemens.com/polarion/#/project/Teamcenter/wiki/Asset%20Inventory/AWS%20Account%20List)
2. Arrange an initial call with PSSE to discuss 

- The purpose of creating a new account\.
- Primary and Secondary account owners
- Initial setup validation

1. PSSE to include new account in to 

- Vulnerability review meeting
- Access rights review
- Splunk dashboards

1. Update any other compliance related documentation

### Modifications to AWS account

If an existing AWS Account is being repurposed, then the account owner must raise required changes with respective teams\. This includes but is not limited to CSO, PSSE, Pathfinder, Zeus\. 

Aws account owner must ensure repurposed account is configured with same parameters as on\-boarding new accounts\.

Account modifications should be done via the CSO Portal: [Account Detail Modification \- SaaS Cloud Security \- Jira Service Management](https://siemensomneo.atlassian.net/servicedesk/customer/portal/1/group/14/create/87)

### Offboarding existing AWS Account

AWS account no longer needed must be off boarded fully from all the systems\.

1.  Send communication to PSSE about proposed account off boarding\.
2.  Delete all aws resources created within the account\. They might have been created automatically via different pipelines or manually\.
3.  Request Zeus team to stop collecting account data using Zeus CloudOps tool
4.  Raise account closure request with [CSO](https://siemensomneo.atlassian.net/servicedesk/customer/portal/1/group/14/create/85)
5.  Update the TcX AWS Account List
6.  Post confirmation from CSO team, ask PSSE to remove it from

- Vulnerability review meeting
- Access right review

## <a id="_References"></a><a id="_Toc2074893174"></a>References

[Siemens Industry Software \(SISW\) SaaS Information Security Policy\.pdf](https://siemensnam.sharepoint.com/:b:/r/teams/disw_ISMS/Policies/Siemens%20Industry%20Software%20(SISW)%20SaaS%20Information%20Security%20Policy.pdf?csf=1&web=1&e=HmEsDr)

[Siemens Industry Software \(SISW\) SaaS Network Security Policy\.pdf](https://siemensnam.sharepoint.com/:b:/r/teams/disw_ISMS/Policies/Siemens%20Industry%20Software%20(SISW)%20SaaS%20Network%20Security%20Policy.pdf?csf=1&web=1&e=snIJ0W)

[requesting a new AWS Account](https://siemensomneo.atlassian.net/servicedesk/customer/portal/1/group/14/create/156)

[New Account Request Form Help \- developer\.internal\.siemens\.com](https://developer.internal.siemens.com/fds/p0/sec_ops/aws/aws_accounts/aws-account-request-guide.html)

[AWS Account Closure Request](https://siemensomneo.atlassian.net/servicedesk/customer/portal/1/group/14/create/85)

[AWS Account Modification](https://siemensomneo.atlassian.net/servicedesk/customer/portal/1/group/14/create/87)

[AWS Account List < Asset Inventory < Documents & Pages < Teamcenter](https://mypolarion.industrysoftware.automation.siemens.com/polarion/#/project/Teamcenter/wiki/Asset%20Inventory/AWS%20Account%20List)

[Steps to gather AWS Account information for the reporting tools v3\.docx](https://siemensnam.sharepoint.com/:w:/r/teams/disw_plc_coi_fdo/cyber/_layouts/15/Doc.aspx?sourcedoc=%7B224572F4-C2DC-4C3E-8DDB-B29F99E613AA%7D&file=Steps%20to%20gather%20AWS%20Account%20information%20for%20the%20reporting%20tools%20v3.docx&action=default&mobileredirect=true)

