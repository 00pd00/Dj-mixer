### Pre-requisites

#### TcX Tenants

Two TcX Tenants or instances are required; they are referred to as site1 and site2 here.  It is understood that there is an Enterprise Contract Agreement (ECA) and deployments will be completed in an Amazon Web Services. However, a customer can also have an on-premise environment on one side and in that case configuration and deployment should be done by the customer or Teamcenter Services. In the following example, site1 can be represented as TcX/on-prem, and site2 is TcX. If site1 is TcX, pipeline is supported to configure site1. Tenants must have Multisite AWC components installed: Multisite Integration Client and Multisite Integration.

Site1 must be able to connect to site2 public ingress points for the Web Tier and FSC, and vice versa. You are not limited to two sites; you can do this on multiple sites. This just describes two sites but anything that is done between the two sites can be repeated with a 3rd or 4th site as required.


#### MS Proxy User Creation

Each site must have a TcSS LDAP proxy user; the user has been automatically added to the LDAP as part of the Tc2606 pipeline deployment. This is similar to how the infodba user is handled. This document will refer to it as the msproxy user, but any name can be used, and they do not need to be identical between site1 and site2. The password for this user is required for configuration. The password can be retrieved from the TcSS LDAP or SAMAuth. A Proxy user is a user that is created specifically to be used behind the scenes to send data from one site to another. You will also need to register your proxy user key, your proxy user and your site name in the vault secrets. Please refer to the vault section of the cookbook for vault and secrets details. 

#### Required Skills

This document is written for an audience familiar with Teamcenter, the TcX EC2 command line and directory structure, the vi editor, and the use of S3 volumes to upload and download files to/from TcX. Mostly you will be using Ansible to run the pipeline automation, vault for your keys and GitLab for checking your jobs. This can be done using Azure as well, but we have not documented specifics here yet. With that said, setup should be the same, only the interface will change. 