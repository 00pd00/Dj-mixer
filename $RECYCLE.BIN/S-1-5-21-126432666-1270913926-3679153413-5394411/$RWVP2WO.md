
| **No.** | **Key** | **Description** | **Value/Reference** |
|---------|--------|-----------------|---------------------|
| 1 | ACCOUNT_OWNER_EMAIL | (Tag purpose) Specifies the email address of the account or subscription owner. This value will be included in Azure resource tags for identification and contact purposes. Add one email id only. | Example: "xyz@siemens.com" |
| 2 | ADMIN_CELL_ID | The value of `ADMIN_CELL_ID` set while configuring the [Admin subscription](../../../000_Setup%20Admin%20subscription/001_Prepare%20the%20scripts%20to%20be%20executed.md#prepare-the-scripts-to-execute) | For Dev: "0002" <br/> For DryRun: "0001" <br/> For Prod: "0001" |
| 3 | ADMIN_SUBSCRIPTION_ID | Subscription ID used for [Admin subscription](../../../000_Setup%20Admin%20subscription/001_Prepare%20the%20scripts%20to%20be%20executed.md#prepare-the-scripts-to-execute) | For Dev: "888b0468-c8c4-4e39-915f-9f9fcc38040a" <br/> For DryRun/Prod: "6b13ba09-2f87-45f3-bc70-b94a9574dd3f" |
| 4 | APPLICATION_REGISTRATION_URL_ID | The value of `APPLICATION_REGISTRATION_URL_ID` set while configuring the [Admin subscription](../../../000_Setup%20Admin%20subscription/001_Prepare%20the%20scripts%20to%20be%20executed.md#prepare-the-scripts-to-execute). This is the Application ID URI of the app registration to support OIDC auth with AWS | For Dev: api://tcx-azure-aws-interop-application<br />For DryRun: "api://tcx-azure-caps-rv-nonprod-aws-interop-application" <br/>For Prod: "api://tcx-azure-prd-aws-interop-application"|
| 5 | ARGOCD_REGION | Region specific | For us-east-1: 'helm'<br/>For eu-central-1: 'helm-emea'<br/>For ap-northeast-1: 'helm-apac' |
| 6 | AZ_AWS_INTEROP_APP | The value of `AZ_AWS_INTEROP_APP` set during setup of the [Admin subscription](../../../000_Setup%20Admin%20subscription/001_Prepare%20the%20scripts%20to%20be%20executed.md#prepare-the-scripts-to-execute). This is the name of the app registration to enable interoperability with AWS.  | For Dev: "tcx-az-dev-aws-interop-app" <br/> For DryRun: "tcx-az-caps-rv-nonprod-aws-interop-app" <br/> For Prod: "tcx-az-prd-aws-interop-app" |
| 7 | AZ_READ_ACCESS_ENTRA_GROUP_ID | This is the Entra ID group ID used for operators role to read-only access to Vault secrets on any given tenant's path. | For Dev: "114a1fa1-ab68-4807-b96b-a6c5ce20f640" <br /> For DryRun: "5df6178d-038f-41eb-9d83-627459b0d205" <br /> For Prod: TBD, see [Entra groups](../../../../../../../../CTCX-Intro/010_Containerized%20TcX%20Architecture%20Overview/020_AZURE/020_Setup%20Azure%20and%20Entra%20Groups%20and%20Roles.md)|
| 8 | AZ_READWRITE_ACCESS_ENTRA_GROUP_ID | Entra ID group ID for read-write access to Vault secrets on any given tenant's path. | For Dev: "e7495f09-4a95-48d2-b916-35a014846197" <br />  For DryRun: "5df6178d-038f-41eb-9d83-627459b0d205" <br /> For Prod: TBD, see [Entra groups](../../../../../../../../CTCX-Intro/010_Containerized%20TcX%20Architecture%20Overview/020_AZURE/020_Setup%20Azure%20and%20Entra%20Groups%20and%20Roles.md)|
| 9 | AZ_TENANT_SP_ACCESS_ENTRA_GROUP_ID | Entra ID group ID for providing read access to a tenant's Azure secret engine and all access to secrets on a tenant's path. | For Dev: "99237c38-12f1-4279-b7eb-5d793e4835f9" <br />  For DryRun: "aa182667-23f2-4477-98f8-ad83fe87145b" <br /> For Prod: TBD, see [Entra groups](../../../../../../../../CTCX-Intro/010_Containerized%20TcX%20Architecture%20Overview/020_AZURE/020_Setup%20Azure%20and%20Entra%20Groups%20and%20Roles.md)|
| 10 | AZURE_SUBSCRIPTION_ID | Azure subscription ID where cell is to be deployed. | |
| 11 | AZURE_TENANT_ID | Azure (SPLM) tenant ID | "6b5bd02b-92d2-40b2-9ffd-c9c94280c757" |
| 12 | BOOTSTRAP_INFIX | Infix used in bootstrapping BACKEND_SA_NAME and BACKEND_RESTORE_SA_NAME. Must be of length 4. | |
| 13 | CELL_ASN | Autonomous System Number for the cell, used in network routing. | Get value as [mentioned below](./000_cell_env_vars.sh.md#get-values-via-email) |
| 14 | CELL_EXTERNAL_MAP_OFFSET | Offset used for mapping external IPs or networks. | Get value as [mentioned below](./000_cell_env_vars.sh.md#get-values-via-email) |
| 15 | CELL_ID | Unique identifier for your cell, preferebly in the format azm-[region]-[xcr cluserid]-[stream] | Example: azm-eaus-preprod47-dryrun <br />**Note:** CELL_ID should be less than or equal to 25 chars |
| 16 | CELL_LOCATION | Location of the cell | Example: eastus |
| 17 | CELL_SUBNET_MAP_OFFSET | Offset used for subnet mapping within the cell. | Get value as [mentioned below](./000_cell_env_vars.sh.md#get-values-via-email) |
| 18| CLUSTER_LOADBALANCER_IP | IP address assigned to the xcr cluster's load balancer. | Provided by XCR team during cluster creation |
| 19 | CLUSTER_MANAGED_IDENTITY_OBJECT_ID | Object ID of the managed identity used by the cluster. | Provided by XCR team during cluster creation |
| 20| CLUSTER_NAME | Name of the XCR Kubernetes cluster. | Provided by XCR team during cluster creation |
| 21 | CLUSTER_VNET_CIDR | CIDR range for the cluster's virtual private cloud. | Provided by XCR team during cluster creation |
| 22 | CONTAINER_REGISTRY | URL or name of the container registry used for deployments. | For us-east-1, us-central: "harbor.xcr.svcs01.prod.us-east-1.kaas.sws.siemens.com/tcx"<br/>For eu-central-1: "harbor.xcr.svcs01eu.prod.eu-central-1.kaas.sws.siemens.com/tcx"<br/>For ap-northeast-1: "harbor.apac1.co.sws.siemens.com/tcx" |
| 23 | DISWPRODUCT_DOMAIN_NAME | The domain name of the server hosted in management plane | Dev/DryRun: "diswxproductsut.com" <br/> Prod: "diswxproducts.com" |
| 24 | DISWPRODUCT_DNS_SERVERS | String of comma separated list of IPs of the DNS server hosted in the management plane | Dev/DryRun: "10.149.26.115","10.149.26.217" <br/> Prod: "10.149.19.75","10.149.18.188" |
| 25 | TC_DB_SQL_SERVER_STORAGE_ACCOUNT_TYPE | Type of storage account used for the SQL Server (e.g., LRS, GRS). | "LRS" |
| 26 | TC_DB_SQL_SERVER_VCORES | Number of virtual cores allocated to the SQL Server. | 4 |
| 27 | TC_DB_SQL_SERVER_ZONE_REDUNDANT_ENABLED | Indicates whether zone redundancy is enabled for high availability. | false |
| 28 | INTENT | (Tag purpose) This will be used in azure resource tags to show the purpose or type of deployment (e.g., DEVELOPMENT, TEST, PRODUCTION). | Example: <br />For Dev: "Development" <br />For Prod: "Production" |
| 29 | LINUX_IMAGE_NAME | Name or identifier of the Linux VM image used in deployments. | "TcX.RHEL8" |
| 30 | MANAGEMENT_ADDRESS_PREFIX | IP address range used for management plane | Contact caps team for Management address prefix <br /> For Dev: "10.149.26.0/23" |
| 31 | MANAGEMENT_GROUP_ID | Azure Management Group ID where custom roles will be created. This is used for scoping custom role definitions at the management group level. To check your management group, refer to [Validate subscription management group](../../Validate%20subscription%20management%20group). | Dev (LCS): Teamcenter <br /> Dry-Run (CApS): *TBD* <br /> Prod (CApS): *TBD* |
| 32 | RANCHER_CLUSTER_PROJECT_ID | ID of the Rancher cluster project for resource scoping. | Refer Rancher Cluster ID shared by FDS as response of [cluster request](../../../../../030_XCR%20Kubernetes%20Cluster%20Setup/AZURE/010_Request%20XCR%20Cluster.md#raise-fds-ticket-for-cluster) |
| 33 | RANCHER_PROJECT_ID | ID of the Rancher project managing the XCR Kubernetes cluster. | Refer Rancher Project ID shared by FDS as response of [cluster request](../../../../../030_XCR%20Kubernetes%20Cluster%20Setup/AZURE/010_Request%20XCR%20Cluster.md#raise-fds-ticket-for-cluster) |
| 34 | SECURITY_CONTACT_EMAIL |(Tag purpose) Security Contact Purpose.  | For dev: "tcx.security.industry@siemens.com" <br /> For Prod: "caps.security@siemens.com" |
| 35 | SHARED_RESOURCE | (Tag purpose) Boolean or flag indicating if the resource is shared across cells or tenants. | "Yes" |
| 36 | SKU_NAME_FIREWALL | SKU name for the Azure Firewall resource. | "AZFW_VNet" |
| 37 | SKU_TIER_FIREWALL | Tier of the Azure Firewall (e.g., Basic, Standard, Premium). | "Premium" |
| 38 | TC_DB_SQL_LICENSE_TYPE | License type for the SQL Server | "LicenseIncluded" |
| 39 | TC_DB_SQL_SERVER_SKU_NAME | SKU name for the SQL Server used in the TC database. | Dev: "GP_Gen5" <br />Prod: "BC_Gen8IH" |
| 40 | TC_DB_SQL_SERVER_STORAGE_SIZE | Storage size allocated for the SQL Server. | 32 |
| 41 | TCX_ADDRESS_PREFIX | Address prefix used for internal TCX network. | "10.24.0.0/16" |
| 42 | TENANT_DEPLOY_FS_QUOTA | Deploy FileShare quota for tenant deployment data. | 100 |
| 43 | TENANT_IPDATA_FS_QUOTA | IPDATA FileShare quota for tenant deployment data. | 100 |
| 44 | TIMEZONE | (Tag purpose) Time zone setting for the deployment. This will be used in azure resource tags. | Example: "utc" |
| 45 | VARIABLES_FILENAME | The name of the cell file that contains below variables. | azm-"teamname"-"regioncode"-"clusterid"-"serial" <br />Example: azm-depops-eaus-preprod47-001 |
| 46 | VAULT_ADDR | The base URL of the Vault server. | For Dev: <br />https://vaultent.emea1.co.sws.siemens.com <br />For DryRun/Prod: https://vault.xcr.gblsvcs01eu.prod.eu-central-1.kaas.sws.siemens.com |
| 47 | VAULT_NAMESPACE | Specifies the authenticating namespace within the Vault server where secrets and configurations are stored. | For Dev: tcx-development_ns/storm_playground <br />For DryRun/Prod: caps-tcx-production_ns |
| 48 | VAULT_TOKEN | The authentication token used to access the Vault server. | |
| 49 | WINDOWS_IMAGE_NAME | Name or identifier of the Windows VM image used in deployments. | "TcX.WindowsServer2022" |
| 50 | CELL_OWNER_EMAIL_LIST | The owners of the Cell. | "xyz@siemens.com,abc@siemens.com" |
| 51 | XCR_ZONE_MAPPING | Availability zone mapping of the XCR cluster. Example: <code>'[&#123;"id": "1", "name": "germanywestcentral-az2"&#125;]'</code> | <code>'[&#123;"id": "1", "name": "germanywestcentral-az2"&#125;, &#123;"id": "2", "name": "germanywestcentral-az3"&#125;, &#123;"id": "3", "name": "germanywestcentral-az1"&#125;]'</code> |
| 52 | GITLAB_GROUP_ID | The Gitlab group id | Example: "134443" |
| 53 | GITLAB_GROUP_LINK | The Gitlab group link | Example: "https://gitlab.industrysoftware.automation.siemens.com/tcx-cell-user-groups/test" |
| 54 | GITLAB_GROUP_OWNER_EMAIL | The Gitlab group owner email id | Example: "xyz@siemens.com,abc@siemens.com" |

**Note**: Variables with `TBD` as values are yet to be made available. They will be updated once their Admin subscription values are finalized.

##### Get values via Email

There are specific variables that are maintained manually and must be obtained via Email. Send email using the below template to corresponding team:

- **Dev deployments**: `tc.azure.deployops.architects.disw@siemens.com`
- **Prod/PreProd deployments**: `caps-platformautomation.sisw@siemens.com`

```text
- Subject: Cell values required for <cell-id>
- Description:  
    <your team name> is deplying a new cell. Details are as below:
    * Team Name/DL: <Your team name>
    * Cell ID: <cell id>
    * Region: <region of the cell>
    * Contact Email: <point of contact for the cell>

    Please provide the below values required:
    * GLBL_CELL_ASN
    * GLBL_CELL_EXTERNAL_MAP_OFFSET
    * GLBL_CELL_SUBNET_MAP_OFFSET
```

#### Variables required specific to products

| **No.** | **Product ID** | **Product Name** | **Value/Reference** |
|---------|--------|-----------------|---------------------|
|1. | TC030406-XT | Teamcenter AI Chat | [Shared Resources Variables](../../../../../../../../Product%20Integration%20Documentation/Teamcenter%20AI%20Chat/Cell%20Onboarding/AZURE/Shared%20Resources/Shared%20Resources) |
|2. | TC030406-XT | Teamcenter AI Chat | [UTS1.0 specific Variables](../../../../../../../../Product%20Integration%20Documentation/Teamcenter%20AI%20Chat/Cell%20Onboarding/UTS10/UTS%20Integration) |
|3. | TC030406-XT | Teamcenter AI Chat | [AI Search specific Variables](../../../../../../../../Product%20Integration%20Documentation/Teamcenter%20AI%20Chat/Cell%20Onboarding/AZURE/AI%20Search/#4-Add-New-Cell-Variables-to-tcx-pipeline-variable-file) |

##### Get Gitlab group details
Please follow the steps to create Gitlab cell owners group [Create Cell Owner Group](../../../../../../010_Automation%20Setup/015_Create%20Cell%20Owner%20Group.md)
Please note this is one time activity.