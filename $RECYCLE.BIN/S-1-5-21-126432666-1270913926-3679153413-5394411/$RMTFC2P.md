The below index provides overview about list of required pre-requisites that needs to be met while on-boarding new Accounts/Customers.

| Infrastructure Requirements | Reference |
|---------------------------|------------|
| **Tools access (Permissions/Access required for developer to work on XCD and XCR)** | Refer section [Tools Access](Tools%20Access/Tools%20Access) |
| **Setup XCR Kubernetes cluster** | Refer section <br /> AWS:[XCR Kubernetes Cluster Setup](../../Cell-Setup/Automation%20Prerequisites/XCR%20Kubernetes%20Cluster%20Setup/AWS/Request%20XCR%20Cluster) <br /> Azure: [XCR Kubernetes Cluster Setup](../../Cell-Setup/Automation%20Prerequisites/XCR%20Kubernetes%20Cluster%20Setup/AZURE/Pre-requisites) |
| **SAM Account setup** | Refer section [Teamcenter X Operating SAM Account Set-up](Teamcenter%20X%20Operating%20SAM%20Account%20Set-up/Operating%20SAM%20Account%20Set-up%20Definitions) |
| **XCR Tools setup** | Refer section [Tools Setup](Tools%20Setup/Vault%20Setup) |

| Accounts and Access (AWS) | Reference |
|---------------------------|------------|
| Setup AWS accounts for Infrastructure deployment | Refer section [TcX Cell Setup - AWS](../../Cell-Setup/Automation%20Prerequisites/TcX%20Cell%20Setup/AWS/TcX%20Cell%20Account%20Setup/Cell%20Account/Create%20TcX%20Transit%20Gateway) |
| AWS SES SMTP account setup | Refer section [Amazon SES SMTP Account Set-up](Amazon%20SES%20SMTP%20Account%20Set-up/Amazon%20SES%20SMTP%20Account%20Set-up) |

| Accounts and Access (Azure) | Reference |
|---------------------------|------------|
| Setup Azure Subscription for infrastructure deployment |Refer section <br /> Setup Admin subscription:[Setup Admin subscription](../../Cell-Setup/Automation%20Prerequisites/TcX%20Cell%20Setup/AZURE/Setup%20Admin%20subscription/Pre-requisites) <br /> **Note:** Admin setup is a one-time process. If the admin setup is already in place, proceed to the Setup Cell Subscription steps:[Setup Cell Subscription](../../Cell-Setup/Automation%20Prerequisites/TcX%20Cell%20Setup/AZURE/Setup%20Cell%20Subscription/Pre-requisites/)|

| Automation/Pipeline Requirements | Reference |
|---------------------------|------------|
| Teamcenter X Customer SAM Account setup | Refer section [Enable ActAsRole for Teamcenter X Customer SAM Account to generate SAMAuth and DSS credentials](../../Tenant%20Onboarding/Pre-Reqs/Configure%20Customer%20SAM%20Account#enable-actasrole-for-teamcenter-x-customer-sam-account-to-generate-samauth-and-dss-credentials) section [Pre-Reqs](../../Tenant%20Onboarding/Pre-Reqs/Enterprise%20Cloud%20Account%20Setup)|
| Customer Input JSON | Refer section [Ansible template Input](../../010_Tenant%20Onboarding/010_Pre-Reqs/020_Ansible%20Template%20Input/000_Ansible%20Template%20Input.md) |