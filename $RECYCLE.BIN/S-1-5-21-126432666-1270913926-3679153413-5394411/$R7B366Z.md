# AWS Customer Input Guide

Configure and validate your AWS customer input for TcX deployments using the parameters below. This guide ensures correct formatting, clarity, and compliance. Follow validation steps for reliable pipeline execution.

---

## Key Customer Input Table

| Key                                                | Description                                                                                                                                                                                                                                                                        | Allowed to Change in Rerun                       |
| -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| PipelineStage                                      | The stage of the pipeline to run: `deploy` or `destroy`.                                                                                                                                                                                                                           | Yes                                              |
| Description                                        | A meaningful description of the pipeline to be run.                                                                                                                                                                                                                                | Yes                                              |
| CustomerID                                         | Unique Customer Identification ID. In production, this value must be the designated customer ID (primary key for tenant deployments). Numeric only, maximum 8 characters. If the value is numeric, provide in double quotes (`"12345678"`).                                        | No (defines unique environment with Environment) |
| Company                                            | OPTIONAL - Customer Company Name.                                                                                                                                                                                                                                                  | Yes                                              |
| Environment                                        | The type of environment to deploy (prd, uat, dev); together with CustomerID, uniquely defines a deployment.                                                                                                                                                                        | No (defines unique environment with CustomerID)  |
| CellId                                             | The identifier of the cell used for deployment. Must be pre-created and the definition file must exist in the project at `tc-pipeline-templates/variables/cells`.                                                                                                                  | No                                               |
| SamAuthAccountID                                   | SAM account ID where the SAMAuth service user is created. [See more](../010_Configure%20Customer%20SAM%20Account.md#adding-a-service-user-to-access-the-samauth-service-in-teamcenter-x-customer-sam-account). This input is not required for SAM 2.0-based TcX environments.                                                                                      | Yes                                              |
| SamAuthUserAccessKey                               | Access key owned by the SAMAuth service user for registration in the tenant's SAMAuth account. [See more](../010_Configure%20Customer%20SAM%20Account.md#adding-a-service-user-to-access-the-samauth-service-in-teamcenter-x-customer-sam-account). This input is not required for SAM 2.0-based TcX environments.                                                 | Yes                                              |
| SamAuthUserSecretAccessKey                         | Secret access key for the SamAuthUserAccessKey. [See more](../010_Configure%20Customer%20SAM%20Account.md#adding-a-service-user-to-access-the-samauth-service-in-teamcenter-x-customer-sam-account). This input is not required for SAM 2.0-based TcX environments.                                                                                                | Yes                                              |
| DSSAccountID                                       | SAM account ID for cloud Data Storage Service storing Teamcenter volume. [See more](../010_Configure%20Customer%20SAM%20Account.md#adding-a-service-user-for-dataset-storage-service-dss-access-in-teamcenter-x-customer-sam-account). This input is not required for SAM 2.0-based TcX environments.                                                           | Yes                                              |
| DSSUserID                                          | SAM user ID for DSS service account storing Teamcenter volume. Must be created in the customer SAM account listed in DSSAccountID. [See more](../010_Configure%20Customer%20SAM%20Account.md#adding-a-service-user-for-dataset-storage-service-dss-access-in-teamcenter-x-customer-sam-account). This input is not required for SAM 2.0-based TcX environments. | Yes                                              |
| DSSUserAccessKey                                   | Access key for DSS service user, used to create vaults for deployment. [See more](../010_Configure%20Customer%20SAM%20Account.md#adding-a-service-user-for-dataset-storage-service-dss-access-in-teamcenter-x-customer-sam-account). This input is not required for SAM 2.0-based TcX environments.                                                             | Yes                                              |
| DSSUserSecretAccessKey                             | Secret access key for DSSUserAccessKey. [See more](../010_Configure%20Customer%20SAM%20Account.md#adding-a-service-user-for-dataset-storage-service-dss-access-in-teamcenter-x-customer-sam-account). This input is not required for SAM 2.0-based TcX environments.                                                                                            | Yes                                              |
| NotificationEmailId                                | Valid email for deployment notification. Must follow `someone@some.com` format.                                                                                                                                                                                                    | Yes                                              |
| IstioMeshTlsSecret                                 | Name of K8S secret created from TLS certificate in `istio-gateway` namespace.                                                                                                                                                                                                      | Yes                                              |
| IstioMeshGatewayNamespace                          | Namespace for istio gateway and creation of Kubernetes TLS secret.                                                                                                                                                                                                                 | Yes                                              |
| dnsSubdomainName                                   | DNS subdomain name for the tenant. Must start and end with a letter or number (a-z, A-Z, 0-9), can include letters, numbers, and hyphens (-) in between, and must be 1 to 32 characters long.                                                                                                                                                                                                                                              | Yes                                              |
| Enable_SSO                                         | Optional, enable single-sign-on configuration for development/testing. Allowed  values: true/ false.                                                                                                                                                                                                            | Yes                                              |
| ProcessMax                                         | Maximum total TcServers (assigned + warm). Recommended minimum values is 20. In container deployment, this is the max number of running TcServer pods. [More info](./000_Ansible%20Template%20Input.md#serverpool-property-settings-for-container-environments)                              | Yes                                              |
| SMTPUserName                                       | SMTP user access key.                                                                                                                                                                                                                                                              | Yes                                              |
| SMTPPassword                                       | SMTP user password.                                                                                                                                                                                                                                                                | Yes                                              |
| FeatureHighAvailableDeployment                     | Enable highly available resource deployment for tenant. Allowed values: true/ false.                                                                                                                                                                                                                          | No                                               |
| ProcessTarget                                      | Number of active servers to be available at any time (logged in + unassigned). [More info](./000_Ansible%20Template%20Input.md#serverpool-property-settings-for-container-environments)                                                                                            | Yes                                              |
| ProcessWarm                                        | Number of warm (unassigned) servers for user login. [More info](./000_Ansible%20Template%20Input.md#serverpool-property-settings-for-container-environments)                                                                                                                       | Yes                                              |
| TcXAdminEmail                                      | Email for creating `tcxadmin` user in LDAP. Must follow `someone@some.com` format. [See more](../../../Cell-Setup/Automation%20Prerequisites/Teamcenter%20X%20Operating%20SAM%20Account%20Set-up/Set-up%20Teamcenter%20X%20Operating%20SAM%20Account/On-board%20Operating%20Users) | Yes                                              |
| DefaultUserSamId                                   | SAM user ID for `tcxadmin` user from operating SAM account. In case of SAM 2.0-based TcX, the CApS user specifies the corresponding [Service Admin](https://developer.internal.siemens.com/fds/documentation/apps/admin-console-guide-ix/service-org-account.html#service-admin) user id visible in the Service Org Admin Console. [See more](../../../Cell-Setup/Automation%20Prerequisites/Teamcenter%20X%20Operating%20SAM%20Account%20Set-up/Set-up%20Teamcenter%20X%20Operating%20SAM%20Account/On-board%20Operating%20Users)                        | Yes                                              |
| TeamcenterProductIDList                            | List of product IDs to deploy: one per line. Mutually exclusive with TeamcenterPackageIDList. Add all previously deployed IDs if extending deployment                                                                                                         | Yes (cannot switch between PID and static CD)    |
| TeamcenterPackageIDList                            | List of package IDs to deploy (CD packages without product IDs): one per line. Can be used with TeamcenterProductIDList.                                                                                                                                                           | Yes                                              |
| QDFileName                                         | For deployments using static QD file; mutually exclusive with TeamcenterProductIDList/TeamcenterPackageIDList. The `TeamcenterProductSKUList` input parameter should be specified when deploying SAM 2.0-based TcX environments. | Yes (cannot switch between QD and PID/CD)        |
| DeployDispatcher                                   | Whether to deploy dispatcher on WindowsServer1. Set `true` only when product IDs include TC7030-XT, CLID1C7030F_OR_TC7100, or TC7101. Must match relevant product/package setting; mismatch causes pipeline failure. Default: false.                                               | Yes (not recommended to change)                  |
| AutomationForDispatcherInstallation                | Optional. Default value is  `false`. If set to `true`, dispatcher installation will be performed automatically by the pipeline.                                                                                                                                              | Yes                                              |
| EnterpriseCloudAccountId                           | Account id provided by Purchase team for tenant entitlement. Production: accurate value required; development: use `'000000000'` if unknown. [More info](../Enterprise%20Cloud%20Account%20Setup)                                                                                  | Yes                                              |
| TenantSamAccountId                                 | SAM account id for tenant users registration. Production: use LIO portal per EnterpriseCloudAccountId; development: use same as EnterpriseCloudAccountId. [More info](../Enterprise%20Cloud%20Account%20Setup)                                                                     | Yes                                              |
| SamHost                                            | Optional: specify environment-specific SAM endpoint; default is `"us-east-1.sws.siemens.com"` (SAM prod endpoint). Credentials must match specified endpoint.                                                                                                                      | Yes                                              |
| DSSHost                                            | Optional: Specify the DSS endpoint based on the region. Select the appropriate endpoint for your region: <br/>**us-east-1:** `"dss.us-east-1.sws.siemens.com"`<br/>**eu-central-1:** `"dss.eu-central-1.sws.siemens.com"`<br/>**ap-northeast-1:** `"dss.ap-northeast-1.sws.siemens.com"`<br/>**ap-south-1:** `"dss.ap-south-1.sws.siemens.com"`<br/> **ap-southeast-1:** `"dss.ap-southeast-1.sws.siemens.com"`<br/>**ap-southeast-2:** `"dss.ap-southeast-2.sws.siemens.com"`<br/> **ap-northeast-2:** `"dss.ap-northeast-2.sws.siemens.com"`                                                                                                                                                                                    | Yes                                              |
| SamAuthHost                                        | Optional: specify SAMAuth endpoint per environment; default is `"us-east-1.sws.siemens.com"`.                                                                                                                                                                                      | Yes                                              |
| PipelineVersion                                    | tcx-pipeline-tenant repo branch or tag for pipeline.                                                                                                                                                                                                                               | Yes                                              |
| TcXVersion                                         | Deployed TcX version (tag from tc-version-manifests GitLab project).                                                                                                                                                                                                               | Yes                                              |
| PipelineVariableVersion                            | tcx-pipeline-variables repo branch or tag.                                                                                                                                                                                                                                         | Yes                                              |
| PipelineCloud                                      | AWS Account id for environment deployment.                                                                                                                                                                                                                                                | No  
| TcxCliRequirement                                  | tcx-cli repo tag                                                                                          | Yes                                       |                        
| StreamId                                           | Configuration file for loading parameters. Supported values: [dev, dryrun, internal, customer].                                                                                                                                                                                                                                         | No                                               |
| TcMasterLocale (optional)                         | Deploy TcX locale: en_US, DE_DE, ZH_CN, FR_FR, IT_IT, JA_JP, KO_KR, PL_PL, RU_RU, CZ_CZ, PT_BR. Default: en_US.                                                                                                                                                                    | Yes                                              |
| TcLanguageLocalizedPropertyValueDisplay (optional) | Language for displaying localized property values. Default: en_US.                                                                                                                                                                                                                 | Yes                                              |
| UsingSamProd                                       | Optional: indicates production SAM usage. No current impact. Allowed values: [true, false].                                                                                                                                                                                        | No                                               |
| TcDBInstanceClass                                  | Optional: [Small, Medium, Large, XLarge, XXLarge]; refers to DB instance class. [Impact details in original]                                                                                                                                                                       | Yes                                              |
| TcDBIOPS                                           | Optional: Oracle database-specific IOPS. Default: 3000                                                                                                                                                                                                                             | Yes                                              |
| TcDatabaseType                                     | Optional: PostgreSQL (default), Oracle. Oracle only supported for premium deployments.                                                                                                                                                                                             | No                                               |
| TcDBEngineType                                     | Optional: Standard (default), Enterprise; required for Oracle DB                                                                                                                                                                                                                   | No                                               |
| TcDBMinStorage                                     | Optional: Min DB storage in MB. Required for Oracle DB. Default: 150                                                                                                                                                                                                               | Yes                                              |
| TcDBMaxStorage                                     | Optional: Max DB storage in MB. Required for Oracle DB. Default: 1000                                                                                                                                                                                                              | Yes                                              |
| LinuxServerAMI                                     | LinuxServer AMI ID for relevant region; optional. Defaults from cell file if not specified.                                                                                                                                                                                        | Yes (if changed, may be ignored)                 |
| WindowsServerAMI                                   | WindowsServer AMI ID for relevant region; optional. Defaults from cell file if not specified.                                                                                                                                                                                      | Yes (if changed, may be ignored)                 |
| TcDBOracleLicenseModel                             | Optional: Oracle license model. Allowed: [license-included, bring-your-own-license]. Default: bring-your-own-license.                                                                                                                                                              | No                                               |
| PrimaryAZName                                      | Optional: AWS Availability Zone for tenant resources (advanced use only). Default: pipeline selects best subnet.                                                                                                                                                                   | Yes                                              |
| AdminReadAccessRoleArn                             | Optional: AWS admin read access role for vault obtained from IAM in the deployment AWS account. **Highly recommended** for secrets control.                                                                                                                                                                                        | Yes                                              |
| AdminReadWriteAccessRoleArn                        | Optional: AWS admin read-write access role for vault obtained from IAM in the deployment AWS account. **Highly recommended** for secrets control.                                                           | Yes                                              |
| AdminLicenseServerIp                               | Optional: Mandatory for cloud licensing based deployments,IPv4 address of the common FlexLM based License Server in the TcX Management Plane Account. Must be a valid IPv4 address (e.g., `10.254.42.78`) As pipeline code already sets the correct value for production(defaulted to `10.149.18.180`) this is not a required paramter for CaPs RV/ Production deployments.                                                                                                                                                                                      | Yes                                              |
| IsEntitlement                                      | Optional: Mandatory for cloud licensing based deployments, enables Siemens Cloud Licensing for the deployment. When set to `true`, the cloud licensing endpoint is configured and the FlexLM based license server is not deployed on the dc server. Must be specified together with `EntitlementServiceEndpoint`. Allowed values: `true` / `false`.                                                                                                        | Yes                                              |
| EntitlementServiceEndpoint                         | Optional: Mandatory for cloud licensing based deployments,URL endpoint for the Siemens Cloud Licensing service. Must be specified together with `IsEntitlement`. Example for dev and QA environments use: `https://cloud-licensing.preprod.cls.bas.sws.siemens.com` for CaPs RV/Production deployments use :`https://cloud-licensing.cls.sws.siemens.com`.                                                                                                                                                | Yes                                              |
| TcFMSVolumeType                                    | Optional: Storage type: ['FSx'] for Amazon FSx (no DSS credentials required), ['DSS'] (default) needs DSS account info. **Note: FSx not valid for TcX Essentials., for Fresh Deployment TcFMSVolumeType value ['FSx', 'DSS'] is not supported, it is either DSS or FSx**                                                                                                                | No                                               |
| FSxVolumeSize                                      | Optional: FSx file system size in GB (default: 1024, min: 1024). **FSx only**                                                                                                                                                                                                      | Yes                                              |
| FSxThroughputCapacity                              | Optional: FSx throughput capacity in MBps. Allowed: [128, 256, 512, 1024, 2048, 4096]. **FSx only**                                                                                                                                                                                | Yes                                              |
| TXPClientId                                        | Optional: Required to be able to invoke Xcelerator services from Teamcenter components using a technical user. [More info](../010_Configure%20Customer%20SAM%20Account.md#generate-client-credentials-for-teamcenter-xcelerator-proxy-txp-and-cloud-scheduler).<br/>_Applicable to TcX Essentials/Standard/Advanced deployments only._ | No |
| TXPClientSecret                                    | Optional: Required to be able to invoke Xcelerator services from Teamcenter components using a technical user. [More info](../010_Configure%20Customer%20SAM%20Account.md#generate-client-credentials-for-teamcenter-xcelerator-proxy-txp-and-cloud-scheduler).<br/>_Applicable to TcX Essentials/Standard/Advanced deployments only._ | No |
| XAppIssuers                                        | Optional: Required for xApps (external application) integration, list of issuer and/or client IDs. [Details](../../Enable%20xApps%20Integration%20with%20Teamcenter%20X/).<br/><br/><b>Cloud Scheduler:</b> Specify client ID of the Cloud Scheduler app. [More info](../010_Configure%20Customer%20SAM%20Account.md#generate-client-credentials-for-teamcenter-xcelerator-proxy-txp-and-cloud-scheduler). <br/>Also refer to [Cloud Scheduler validation](../../050_Validation%20Steps%20for%20Teamcenter%20X%20Products/241_Post%20Deploy%20Validation%20Steps%20for%20Cloud%20Scheduler.md) section.<br/>_Applicable to TcX Essentials/Standard/Advanced deployments only._ | No                                               |
| XAppUsers                                          | Optional: Required for xApps (external application) integration, mapping of client_ids to TCX usernames. [Details](../../Enable%20xApps%20Integration%20with%20Teamcenter%20X/)<br/><br/><b>Cloud Scheduler:</b> Specify client ID of the Cloud Scheduler app and TCX username as "dcproxy". [More info](../010_Configure%20Customer%20SAM%20Account.md#generate-client-credentials-for-teamcenter-xcelerator-proxy-txp-and-cloud-scheduler).<br/>Also refer to [Cloud Scheduler validation](../../050_Validation%20Steps%20for%20Teamcenter%20X%20Products/241_Post%20Deploy%20Validation%20Steps%20for%20Cloud%20Scheduler.md) section.<br/>_Applicable to TcX Essentials/Standard/Advanced deployments only._  | No                                               |
| SREConfig                                          | Optional: Workload type. Allowed: [dev, pre_prod, prod]. `pre_prd` = UAT, `prod` = customer, `dev` = development. Supported for versions 2512+.                                                                                                                                    | Yes
| OtlpMetricInput                                        | Optional, The OtlpMetricInput is used to control the behavior of OpenTelemetry metrics collection in TCX Tenant. It allows control over whether monitoring is enabled and which specific metrics (if any) should be excluded. <br/>Supported for versions 2512+. <br/><br/> 1. For 2512, default behaviour for OTLP observability is disabled, OTLP-based application monitoring is supported only for Standard, Advanced, and Premium products with the following PIDs: **TC7003-XT, TC10102-XT, TC7100, TC7101**. <br/> 2. For 2606, default behaviour for OTLP observability is enabled, OTLP-based application monitoring is supported for Standard, Advanced, Essential and Premium products with the following PIDs: **TC7003-XT, TC10102-XT, TC7100, TC7101** and **QD based deployment for Essential**. <br/><br/> Here is the definition for ["Otlp Metric Input"](#otlp-metric-input)                                                                                                                               | Yes                                               |
| TXPAccpEndpoints | Optional: This is required for proper functioning of PL Web Components in Active Workspace. If this is not specified in the Ansible input, then it is expected that it is specified in the YAML cell file that is used for the deployment.<br/><br/>This field defines a set of endpoint configurations for PL Web Component (PWC) providers within the Xcelerator Services ecosystem. Each entry, identified by an alias such as "adhoc", "dim", etc., corresponds to a specific provider module supporting various PWC functionalities. The structure accommodates multiple provider endpoints, each with its own base URL and versioning metadata (e.g., sam_version).<br/><br/>Depending on the region where the tenant is being provisioned, the values listed in the ["Teamcenter Xcelerator Proxy (TXP) microservice endpoints"](#teamcenter-xcelerator-proxy-txp-microservice-endpoints) section listed below should be used in the Ansible input. (See: [Validation steps](../../050_Validation%20Steps%20for%20Teamcenter%20X%20Products/240_Post%20Deploy%20Validation%20Steps%20for%20TXP.md)). | Yes |
| TXPXcsEndpoints | Optional: This is required for successful invocation of Xcelerator Services from Teamcenter components. If this is not specified in the Ansible input, then it is expected that it is specified in the YAML cell file that is used for the deployment.<br/><br/>This field contains endpoint configurations for Xcelerator Services (XCS), a suite of cloud-based microservices that extend Teamcenter functionality. Each alias maps to a specific backend service, such as notifications, reporting, subscriptions, or data synchronization. Each entry includes a unique service URL and associated versioning metadata (e.g., sam_version), enabling support for multiple XCS endpoints.<br/><br/>Depending on the region where the tenant is being provisioned, the values listed in the ["Teamcenter Xcelerator Proxy (TXP) microservice endpoints"](#teamcenter-xcelerator-proxy-txp-microservice-endpoints) section listed below should be used in the Ansible input. (See: [Validation steps](../../050_Validation%20Steps%20for%20Teamcenter%20X%20Products/240_Post%20Deploy%20Validation%20Steps%20for%20TXP.md)). | Yes |
| SamAuthScope                                    | Optional: List of SAM scopes (apart from defaut) that need to be added in the SAM application during pipeline execution while registering SAM App if mentioned for any product configuration only. These scopes define the access permissions required for the application. (It is applicable for SAM 1.0.)   | No                                               |
| SamAuthScopeApproval                            | Optional: Boolean value indicating whether the SAM scopes specified in SamAuthScope require approval. Set to `true` if the scopes need approval, `false` otherwise.                                                                                                             | No                                               |
| MetaverseTranslatorAccesskey                 | Optional: Required for Digital Reality Viewer (external application) integration. Please follow DigitalRealityViewer Cookbook to generate these keys.   | No                                               |
| MetaverseTranslatorSecretaccesskey           | Optional: Required for Digital Reality Viewer (external application) integration. Please follow DigitalRealityViewer Cookbook to generate these keys.   | No               |
| ValuesOverride | YAML object containing chart/value overrides. Supports nested keys such as replicaCount. | No, use operation update-override to update the values. |
| SamVersion | Optional. SAM version to be selected. Allowed values are `1.0` and `2.0`. Defaults to `1.0`, if parameter is not specified. | No |
| Sam2Input.TcxDeploymentTctuClientId | Mandatory only when `SamVersion` is `2.0`. Client id for the [TcX deployment tech user](https://developer.internal.siemens.com/fds/documentation/apps/admin-console-guide-ix/service-org-account.html#create-admin-tech-user) generated from Service Org Admin Console. Example: `500135143-tcxpremium-admintechuser-20260302103033`. | Yes |
| Sam2Input.TcxDeploymentTctuClientSecret | Mandatory only when `SamVersion` is `2.0`. Client secret for the [TcX deployment tech user](https://developer.internal.siemens.com/fds/documentation/apps/admin-console-guide-ix/service-org-account.html#create-admin-tech-user) generated from Service Org Admin Console. | Yes |
| TeamcenterProductSKUList | Optional. List of product SKUs which uniquely identify the ARM product for which the environment is to be created. To be used only when static QD is specified as input. More details provided [below](./010_AWS%20Customer%20Input.md#input-parameters-to-enable-fds-iam-sam-20).| No |
| UpTime | Optional: Schedule automatic start/stop of the tenant environment . Refer to the [Schedule List](../../../020_Operations/030_Day%20N%20Operations/110_Schedule%20Start%20Stop/010_Schedule%20List.md) for supported schedule names and descriptions. Use the schedule name as input for 'UpTime'. If not specified, environment runs continuously (always-on). | yes         |
| TCREPAppClientId | Optional: Required for "Teamcenter Integration for Power BI software". It is the Azure Application Client Id which is the unique identifier of the Azure-registered app used to securely authenticate Power BI with your organization’s identity system for Teamcenter integration| No |
| TCREPAppTenantId | Optional: Required for "Teamcenter Integration for Power BI software". It is the Azure Application Tenant Id that identifies the Azure organization where the app is registered, ensuring Power BI connects to the correct environment for Teamcenter integration| No |
| TCREPAppClientSecret | Optional: Required for "Teamcenter Integration for Power BI software". It is the Azure Application Client Secret - a secure credential used to authenticate the app, enabling Power BI to securely connect to Azure and access Teamcenter data | Yes |
| TCREPEnterpriseAppName | Optional: Required for "Teamcenter Integration for Power BI software". It is the Azure Application Name/Display name that identifies the registered app, helping Power BI connect to the correct Azure application for Teamcenter integration| No |



---

## Sample Customer Input YAML Format

Use the following template for your AWS customer input. Ensure all required fields are supplied and validate values before pipeline execution.

```yaml
CellId: depops-preprod05-us-east-1
PipelineVersion: "2412"
TcXVersion: "2412"
PipelineVariableVersion: "2412"
Company: custo01
CustomerID: "12345678"
DSSAccountID: "<your-dss-account-id>"
DSSUserAccessKey: "<your-access-key>"
DSSUserID: "<your-dss-user-id>"
DSSUserSecretAccessKey: "<your-secret-access-key>"
DefaultUserSamId: "<your-default-sam-id>"
DeployDispatcher: false
Description: Template
Enable_SSO: true
Environment: prd
FeatureHighAvailableDeployment: false
IstioMeshGatewayNamespace: istio-xcr
IstioMeshTlsSecret: tls-secret
LinuxServerAMI: ami-042b0ce3ae48393f3
NotificationEmailId: user.email@siemens.com
PipelineCloud: "906956190433"
PipelineStage: deploy
ProcessMax: 20
ProcessTarget: 18
ProcessWarm: 3
QDFileName: base_qd.j2
SMTPPassword: "<your-smtp-pw>"
SMTPUserName: "<your-smtp-user>"
SamAuthAccountID: "<your-sam-auth-id>"
SamAuthUserAccessKey: "<your-sam-auth-key>"
SamAuthUserSecretAccessKey: "<your-sam-auth-secret>"
StreamId: customer
TcXAdminEmail: user.email@siemens.com
dnsSubdomainName: custo01
EnterpriseCloudAccountId: "<your-enterprise-account-id>"
TenantSamAccountId: "<your-tenant-sam-id>"
TcDatabaseType: PostgreSQL
TcDBMinStorage: 150
TcDBMaxStorage: 1000
TcDBIOPS: 3000
TcDBOracleLicenseModel: bring-your-own-license
TcFMSVolumeType: ['DSS']
TXPClientId: <txp-client-id>
TXPClientSecret: <txp-client-secret>
XAppIssuers:
  - <SAM 2.0 xApps1 issuer id>
  - <SAM 2.0 xApps1 client_id>
  - <SAM 1.0 xApps2 client_id>
  - <SAM 1.0 Cloud Scheduler client_id>
  - <SAM 2.0 Token Exchange xApps3 issuer id>
XAppUsers:
  - <SAM 2.0 xApps1 client_id:tcdaemonusername1>
  - <SAM 1.0 xApps2 client_id:tcdaemonusername2>
  - <SAM 1.0 Cloud Scheduler client_id:dcproxy>
  - <SAM 1.0 Token Exchange xApps3 client_id:tcdaemonusername3>
  - <SAM 2.0 Token Exchange xApps4 client_id:tcdaemonusername4>
SREConfig: dev
IsEntitlement: true
EntitlementServiceEndpoint: https://cloud-licensing.preprod.cls.bas.sws.siemens.com
AdminLicenseServerIp: 10.254.42.78
OtlpMetricInput:
  OtlpMonitoringDisabled: False
  OtlpMetricDisabled:
  - microservice.tc.metric.test 
TXPAccpEndpoints: 
  <alias>: 
    url: <url> 
    sam_version: <2.0 || 1.0>
    status_check: <health check path>
TXPXcsEndpoints: 
  <alias>: 
    url: <url> 
    sam_version: <2.0 || 1.0>
    status_check: <health check path>
SamAuthScope:
  - "<scope 1>"
  - "<scope 2>"
SamAuthScopeApproval: true
MetaverseTranslatorAccesskey: <your-metaverse-accesskey>
MetaverseTranslatorSecretaccesskey: <your-metaverse-secret-accesskey>
ValuesOverride:
  fmsmaster:
    replicaCount: 10
    resources:
      requests:
        cpu: 500m
        memory: 10Gi
UpTime: EU_8x5 
TcTeamcenterReportServiceInput:
  - TCREPAppClientId: <your-AzureApplication-ClientId>
  - TCREPAppTenantId: <your-AzureApplication-TenantId>
  - TCREPAppClientSecret: <your-AzureApplication-ClientSecret>
  - TCREPEnterpriseAppName: <your-AzureApplication-DisplayName>
```
   
## Setting Up Teamcenter X High Availability (HA)

Most foundational Teamcenter X services achieve high availability (HA) through containerization, ensuring automatic scaling and failover. Certain services, however, require explicit configuration to enable HA. Use the table below to identify which services need attention and follow the steps to configure them for HA.

---

### Services Needing HA Configuration

| Service        | 2412        | 2506        | 2512 | Notes                                                                                                                                                                                                                                  |
| -------------- | ----------- | ----------- | ---- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Database       | ✓           | ✓           | ✓    | Enable HA by setting `FeatureHighAvailableDeployment` to `true` in customer input. See the [AWS Customer Input section](#aws-customer-input-guide).                                                                                    |
| License Server | ✓           | ✓           | ✓  | Configure triad setup for HA. Detailed procedure available in [Triad License Server HA Setup](../../../../Documentation/Operations/Upgrading%20an%20existing%20Deployment/Setup%20triad%20license%20for%20HA%20environments/Overview). |
| Cloud License* | Not offered | Not offered | Not offered | From Teamcenter X 2606 onward, Siemens Cloud Licensing service is used, providing HA support by default.

## OTLP Metric Input 

### `OtlpMonitoringDisabled`

A **boolean configuration flag** that controls whether **OpenTelemetry monitoring** is enabled or disabled for the system.

- When set to **`true`**, OTLP monitoring is **disabled** — telemetry metrics data will **not be collected or exported** to the monitoring backend.  
- When set to **`false`**, OTLP monitoring is **enabled**, allowing the system to **collect and export telemetry data** for observability, performance tracking, and troubleshooting purposes. 
- For 2512 (default behaviour for OTLP observability is disabled) OTLP-based application monitoring is supported **only** for Standard, Advanced, and Premium products with the following PIDs: **TC7003-XT, TC10102-XT, TC7100, TC7101**.
- For 2606 (default behaviour for OTLP observability is enabled) OTLP-based application monitoring is supported for Standard, Advanced, Essential and Premium products with the following PIDs: **TC7003-XT, TC10102-XT, TC7100, TC7101** and **QD based deployment for Essential**

### `OtlpMetricDisabled`

An **optional configuration parameter** that specifies a **list of metrics to be excluded** from OpenTelemetry monitoring.  

This setting is effective **only when monitoring is enabled** (`OtlpMonitoringDisabled` is set to `false`).  
It allows you to selectively exclude the collection or export of certain metrics that may not be relevant, useful, or required in a given environment.

#### Ansible input

```yaml
OtlpMetricInput:
  OtlpMonitoringDisabled: False
  OtlpMetricDisabled:
  - microservice.tc.metric.test
  ```                                                                                                                               

## Teamcenter Xcelerator Proxy (TXP) microservice endpoints

### Tenant region: `Americas`

This configuration is applicable to Teamcenter tenants provisioned in the Americas regions:
  - us-east-1

#### Ansible input

```yaml
TXPAccpEndpoints:
  adhoc:
    url: 'https://acc.adhoc.us-east-1.sws.siemens.com'
    sam_version: '1.0'
    status_check: '/desadhoccollaboration/service/status'
  catalog:
    url: 'https://acc.catalog.us-east-1.sws.siemens.com'
    sam_version: '1.0'
    status_check: '/descatalogacc/service/status'
  dim:
    url: 'https://acc.dim.us-east-1.sws.siemens.com'
    sam_version: '1.0'
    status_check: '/desdimacc/service/status'
TXPXcsEndpoints:
  catalog:
    url: 'https://catalog.us-east-1.sws.siemens.com'
    sam_version: '1.0'
    status_check: '/catalog/service/status'
  collab:
    url: 'https://collab.us-east-1.sws.siemens.com'
    sam_version: '1.0'
    status_check: '/collabhub/service/status'
  dss:
    url: 'https://dss.us-east-1.sws.siemens.com'
    sam_version: '1.0'
    status_check: '/dss/service/status'
  notification:
    url: 'https://notification.us-east-1.sws.siemens.com'
    sam_version: '1.0'
    status_check: '/notification/service/status'
  plchat:
    url: 'https://cloud.us1.sws.siemens.com/api/nxxai/v1/copilot/tdoc'
    sam_version: '2.0'
    status_check: ''
  sam:
    url: 'https://sam.us-east-1.sws.siemens.com'
    sam_version: '1.0'
    status_check: '/sam/service/status'
  samauth:
    url: 'https://samauth.us-east-1.sws.siemens.com'
    sam_version: '1.0'
    status_check: '/samauth/service/status'
  submgr:
    url: 'https://subscription-manager.us-east-1.sws.siemens.com'
    sam_version: '1.0'
    status_check: '/submgr/service/status'
  unp:
    url: 'https://subscription-manager.us-east-1.sws.siemens.com'
    sam_version: '1.0'
    status_check: '/submgr/service/status'
  xrs:
    url: 'https://xrs.us-east-1.sws.siemens.com'
    sam_version: '1.0'
    status_check: '/xrs/service/status'
```

### Tenant region: `Europe`

This configuration is applicable to Teamcenter tenants provisioned in the Europe regions:
  - eu-central-1

#### Ansible input

```yaml
TXPAccpEndpoints:
  adhoc:
    url: 'https://acc.adhoc.eu-central-1.sws.siemens.com'
    sam_version: '1.0'
    status_check: '/desadhoccollaboration/service/status'
  catalog:
    url: 'https://acc.catalog.eu-central-1.sws.siemens.com'
    sam_version: '1.0'
    status_check: '/descatalogacc/service/status'
TXPXcsEndpoints:
  catalog:
    url: 'https://catalog.eu-central-1.sws.siemens.com'
    sam_version: '1.0'
    status_check: '/catalog/service/status'
  collab:
    url: 'https://collab.eu-central-1.sws.siemens.com'
    sam_version: '1.0'
    status_check: '/collabhub/service/status'
  dss:
    url: 'https://dss.eu-central-1.sws.siemens.com'
    sam_version: '1.0'
    status_check: '/dss/service/status'
  notification:
    url: 'https://notification.eu-central-1.sws.siemens.com'
    sam_version: '1.0'
    status_check: '/notification/service/status'
  plchat:
    url: 'https://cloud.eu1.sws.siemens.com/api/nxxai/v1/copilot/tdoc'
    sam_version: '2.0'
    status_check: ''
  sam:
    url: 'https://sam.eu-central-1.sws.siemens.com'
    sam_version: '1.0'
    status_check: '/sam/service/status'
  samauth:
    url: 'https://samauth.us-east-1.sws.siemens.com'
    sam_version: '1.0'
    status_check: '/samauth/service/status'
  submgr:
    url: 'https://subscription-manager.eu-central-1.sws.siemens.com'
    sam_version: '1.0'
    status_check: '/submgr/service/status'
  unp:
    url: 'https://subscription-manager.eu-central-1.sws.siemens.com'
    sam_version: '1.0'
    status_check: '/submgr/service/status'
```

### Tenant region: `Asia-Pacific`

This configuration is applicable to Teamcenter tenants provisioned in the Asia-Pacific regions:
  - ap-northeast-1
  - ap-northeast-2
  - ap-south-1
  - ap-southeast-1
  - ap-southeast-2

#### Ansible input

```yaml
TXPAccpEndpoints:
  adhoc:
    url: 'https://acc.adhoc.ap-northeast-1.sws.siemens.com'
    sam_version: '1.0'
    status_check: '/desadhoccollaboration/service/status'
  catalog:
    url: 'https://acc.catalog.ap-northeast-1.sws.siemens.com'
    sam_version: '1.0'
    status_check: '/descatalogacc/service/status'
TXPXcsEndpoints:
  catalog:
    url: 'https://catalog.ap-northeast-1.sws.siemens.com'
    sam_version: '1.0'
    status_check: '/catalog/service/status'
  collab:
    url: 'https://collab.ap-northeast-1.sws.siemens.com'
    sam_version: '1.0'
    status_check: '/collabhub/service/status'
  dss:
    url: 'https://dss.ap-northeast-1.sws.siemens.com'
    sam_version: '1.0'
    status_check: '/dss/service/status'
  notification:
    url: 'https://notification.ap-northeast-1.sws.siemens.com'
    sam_version: '1.0'
    status_check: '/notification/service/status'
  plchat:
    url: 'https://cloud.ap1.sws.siemens.com/api/nxxai/v1/copilot/tdoc'
    sam_version: '2.0'
    status_check: ''
  sam:
    url: 'https://sam.ap-northeast-1.sws.siemens.com'
    sam_version: '1.0'
    status_check: '/sam/service/status'
  samauth:
    url: 'https://samauth.us-east-1.sws.siemens.com'
    sam_version: '1.0'
    status_check: '/samauth/service/status'
  submgr:
    url: 'https://subscription-manager.ap-northeast-1.sws.siemens.com'
    sam_version: '1.0'
    status_check: '/submgr/service/status'
  unp:
    url: 'https://subscription-manager.ap-northeast-1.sws.siemens.com'
    sam_version: '1.0'
    status_check: '/submgr/service/status'
```

## Input parameters to enable FDS IAM (SAM 2.0)

FDS IAM (SAM 2.0) has to be explicitly enabled for a TcX environment during provisioning by setting input parameter `SamVersion` to `2.0`.

The `TcxDeploymentTctuClientId` and `TcxDeploymentTctuClientSecret` parameters have to be [generated from the Service Org Admin Console](https://developer.internal.siemens.com/fds/documentation/apps/admin-console-guide-ix/service-org-account.html#create-admin-tech-user).

```yaml
SamVersion: '2.0'
Sam2Input:
    TcxDeploymentTctuClientId: '500136326-tcxpremium-admintechuser-20260306141713'
    TcxDeploymentTctuClientSecret: 'hWxtNoRNe89qbw06yiaaUvC5A3XrK4xAOfXcMx1eUS5UOqWUcF0'
```

Note that in production, the optional parameter `TeamcenterProductSKUList` can have one of the values as specified [here](../000_Enterprise%20Cloud%20Account%20Setup.md#sku-details-and-product-selection). For TcX Essentials, please provide one of the corresponding SKUs.

The input parameter `DefaultUserSamId` should be the user's id in the Service Org Admin console. Specifying any other value will lead to login failure.
