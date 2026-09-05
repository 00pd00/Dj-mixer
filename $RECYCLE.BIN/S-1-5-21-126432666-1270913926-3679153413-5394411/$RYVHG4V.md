# Procedures Document for the New Product Introduction OBSOLETE

Procedures Document for the New Product Introduction \(NPI\) environment

Once the NPI environment request \(which is raised via an email\) is approved by the development manager\. Follow below steps\.

1. Pick TcX release version and addon list based on the requirement\.
2. Choose a region \(where there is no deployment yet\) for the deployment from the AWS Account 30\.
3. Create a TcX environment by following section “2\.3\.2 Customer deployment” from the version specific cookbook\.  
For TcX8\.2, https://mypolarion\.industrysoftware\.automation\.siemens\.com/polarion/\#/project/Teamcenter/wiki/TCX%208\_2%20Install%20Documentation/TCX%208\_2%20installation%20Cookbook
4. Once environment is created, Onboarded the users by following section “3\.1\.7 End\-users On\-boarding” from the version specific cookbook\.  
For TcX8\.2, [https://mypolarion\.industrysoftware\.automation\.siemens\.com/polarion/\#/project/Teamcenter/wiki/TCX%208\_2%20Install%20Documentation/TCX%208\_2%20installation%20Cookbook](https://mypolarion.industrysoftware.automation.siemens.com/polarion/#/project/Teamcenter/wiki/TCX%208_2%20Install%20Documentation/TCX%208_2%20installation%20Cookbook)
5. \[Optional\] Create a region\-specific AWS role \(federated SAML\) in deployment AWS account to onboard users to the AWS \(federated login\)\.
6. \[Optional\] Onboard the user to AWS account using role created above, based on the requirement\.
7. Drop an email to the stakeholder as below format\.

Hello Team,  
  
We have onboard you to the TcX environment and on the AWS account\.   
  
To access the environment, use WebKey login\.  
  
To perform operation on the environment, refer cookbook <LINK\_TO\_COOKBOOK>

  
__Active Workspace: __<AWC\_URL>

__AWS Console: __[https://www\.siemens\.com/sisw/aws](https://www.siemens.com/sisw/aws)

__EC2 Servers:__ <LINK\_TO\_AWS\_CONSOLE\_CORPORATE\_SERVER> 

__RDS Server:__ <LINK\_TO\_AWS\_CONSOLE\_RDS\_SERVER>  

__Vault:__ <LINK\_TO\_VAULT\_NAMESPACE>

__Note:__ Make sure to keep the environment in shutdown in the non\-working hours\.

__RACI Matrix__  


__Tasks__

__Requestor__

__CLOUD\_ART Development Manager__

__CLOUD\_ART Technical Developer__

New environment request

R

A

I

Environment recreation

I

I

R

Share environment details

I

I

R

Review access control on the environment

I

I

R

Problem related to access

R

I

C

Incident report

R

I

C

Shutdown of the environment

R

\-

\-

Maintenance activity on the environment like addon deployment

R

I

C

Security patch on the environment

I

I

R

Security patch on the resource created outside OOTB environment

R

I

C

Created resource outside OOTB environment

R

I

C

Deletion of the environment

A

I

R

	

