# Azure Customer Input Guide

Use this guide to accurately configure your Teamcenter X deployment on Azure. The parameter table below details each required and optional key, its function, and whether values can be updated in reruns. Follow the sample YAML and validation steps for reliable and compliant environment setup.

---

## Key Azure Customer Input Table

| Key        | Description | Allowed to Change in Rerun |
|------------|-------------|---------------------------|
| PipelineStage | The stage of the pipeline to run (`deploy` or `destroy`). | Yes |
| Description | A meaningful description for the pipeline run. | Yes |
| CustomerID | Unique Customer Identification ID. Numeric, max 8 characters, use double quotes if numeric. Defines unique environment with `Environment`. | No |
| Company | OPTIONAL – Customer Company Name. | Yes |
| Environment | Type of environment: `PRD`, `UAT`, `DEV`. Uniquely defines deployment with `CustomerID`. | No |
| CellId | Identifier of the cell for deployment; must exist in repo (`tc-pipeline-templates/variables/cells`). | No |
| SamAuthAccountID | SAM account ID for SAMAuth service user. [Details](../010_Configure%20Customer%20SAM%20Account.md#adding-a-service-user-to-access-the-samauth-service-in-teamcenter-x-customer-sam-account). This input is not required for SAM 2.0-based TcX environments. | Yes |
| SamAuthUserAccessKey | Access key for SAMAuth service user. [Details](../010_Configure%20Customer%20SAM%20Account.md#adding-a-service-user-to-access-the-samauth-service-in-teamcenter-x-customer-sam-account). This input is not required for SAM 2.0-based TcX environments. | Yes |
| SamAuthUserSecretAccessKey | Secret key for SAMAuth service user. [Details](../010_Configure%20Customer%20SAM%20Account.md#adding-a-service-user-to-access-the-samauth-service-in-teamcenter-x-customer-sam-account). This input is not required for SAM 2.0-based TcX environments. | Yes |
| NotificationEmailId | Email for notifications, e.g., `someone@some.com`. | Yes |
| IstioMeshTlsSecret | Name of K8S secret for TLS Server Certificate in `istio-gateway` namespace. | Yes |
| IstioMeshGatewayNamespace | Namespace for Istio gateway and TLS certificate secret. | Yes |
| dnsSubdomainName | DNS subdomain name for the tenant. Must start and end with a letter or number (a-z, A-Z, 0-9), can include letters, numbers, and hyphens (-) in between, and must be 1 to 32 characters long. | Yes |
| TcDatabaseType | Required; database type for Teamcenter deployment. Values: `MSSQLServer`, `Oracle`, `PostgreSQL`. Note: Oracle support on Azure is available but currently only via VM. | No |
| WindowsVMInstanceType | Optional; Specifies the Azure Virtual Machine instance size for Windows-based VMs. Additionally ,For graphics-intensive applications like NX, AI/ML, or remote desktops : Standard_NV12ads_A10_v5 <br/><br/>[Azure All Instance types](https://learn.microsoft.com/en-us/azure/virtual-machines/sizes/overview?tabs=breakdownseries%2Cgeneralsizelist%2Ccomputesizelist%2Cmemorysizelist%2Cstoragesizelist%2Cgpusizelist%2Cfpgasizelist%2Chpcsizelist)<br/>  | Yes |
| LinuxVMInstanceType | Optional; Specifies the Azure Virtual Machine instance size for Linux-based VMs.<br/><br/>[Azure All Instance types](https://learn.microsoft.com/en-us/azure/virtual-machines/sizes/overview?tabs=breakdownseries%2Cgeneralsizelist%2Ccomputesizelist%2Cmemorysizelist%2Cstoragesizelist%2Cgpusizelist%2Cfpgasizelist%2Chpcsizelist)<br/> | Yes |
| TcDBInstanceClass | Required. Any value from [Small, Medium, Large, XLarge, XXLarge] can be provided as input. This parameter specifies the Oracle DB VM size to be used: Small → Standard_E4ds_v5, Medium → Standard_M8ms, Large → Standard_M16ms, XLarge → Standard_M32ms, and XXLarge → Standard_M64ms. Default: Small , Only applicable when `TcDatabaseType` = `Oracle`. | No |
| Enable_SSO | Optional; enable SSO for dev/testing. | Yes |
| ProcessMax | Maximum total TcServers (assigned + warm). Recommended minimum values is 20. [Details](./000_Ansible%20Template%20Input.md#serverpool-property-settings-for-container-environments) | Yes |
| SMTPUserName | Access key for SMTP User. | Yes |
| SMTPPassword | Password for SMTP User. | Yes |
| FeatureHighAvailableDeployment | HA deployment flag. | No |
| ProcessTarget | Number of active servers available at any time. [Details](./000_Ansible%20Template%20Input.md#serverpool-property-settings-for-container-environments) | Yes |
| ProcessWarm | Number of warm (unassigned) servers for user login. [Details](./000_Ansible%20Template%20Input.md#serverpool-property-settings-for-container-environments) | Yes |
| TcXAdminEmail | Email for creating `tcxadmin` in LDAP. Must match format `someone@some.com`. [Details](../../../Cell-Setup/Automation%20Prerequisites/Teamcenter%20X%20Operating%20SAM%20Account%20Set-up/Set-up%20Teamcenter%20X%20Operating%20SAM%20Account/On-board%20Operating%20Users) | Yes |
| DefaultUserSamId | SAM user ID for `tcxadmin` user from operating SAM account. In case of SAM 2.0-based TcX, the CApS user specifies the corresponding [Service Admin](https://developer.internal.siemens.com/fds/documentation/apps/admin-console-guide-ix/service-org-account.html#service-admin) user id visible in the Service Org Admin Console. [See more](../../../Cell-Setup/Automation%20Prerequisites/Teamcenter%20X%20Operating%20SAM%20Account%20Set-up/Set-up%20Teamcenter%20X%20Operating%20SAM%20Account/On-board%20Operating%20Users) | Yes |
| TeamcenterProductIDList | Product IDs to deploy; one per line. Mutually exclusive with `TeamcenterPackageIDList`. Must include all existing IDs if updating. | Yes (cannot switch between PID and static CD) |
| TeamcenterPackageIDList | Package IDs to deploy; one per line. Can be used with `TeamcenterProductIDList`. | Yes |
| QDFileName | File name for static QD deployments. Mutually exclusive with `TeamcenterProductIDList`/`TeamcenterPackageIDList`. Note that the `TeamcenterProductSKUList` input parameter should be specified when deploying SAM 2.0-based TcX environments. | Yes (cannot switch between QD and PID/CD) |
| DeployDispatcher | Optional; set `true` only if product IDs include dispatcher packages. Default=`false`. Product/package alignment is required to avoid failures. | Yes (not recommended to change) |
| AutomationForDispatcherInstallation | Optional; run `deploy.bat` for dispatcher installation. Experimental—do not use in production/ATDD. | Yes |
| EnterpriseCloudAccountId | Production: obtain from Purchase team. Dev: use `'000000000'` if unknown. [Details](../Enterprise%20Cloud%20Account%20Setup) | Yes |
| TenantSamAccountId | SAM account for tenant user registration. Dev: same as EnterpriseCloudAccountId. Production: use LIO portal. [Details](../Enterprise%20Cloud%20Account%20Setup) | Yes |
| SamHost | Optional; SAM endpoint for environment. Default: `"us-east-1.sws.siemens.com"`. Credential region must match. | Yes |
| SamAuthHost | Optional; SAMAuth endpoint. Default: `"us-east-1.sws.siemens.com"` and `"us-east-1.preprod.teamcenterwebservices.com"` for preprod. Credential region must match. | Yes |
| PipelineVersion | Tenant repo branch/tag. | Yes |
| TcXVersion | Deployed version from `tc-version-manifests`. | Yes |
| TcxCliRequirement | Branch for `tcx-cli` tool. If not supplied, uses latest version. | Yes |
| PipelineVariableVersion | Variable repo branch/tag. | Yes |
| PipelineCloud | Target environment account. | No |
| StreamId | Configuration file for parameter loading. | No |
| TcXMasterLocale (optional) | Deploy locale; options: `en_US,DE_DE,ZH_CN,FR_FR,IT_IT,JA_JP,KO_KR,PL_PL,RU_RU,CZ_CZ,PT_BR`. Default=`en_US`. | Yes |
| TcLanguageLocalizedPropertyValueDisplay (optional) | Display locale setting; default=`en_US`. | Yes |
| UsingSamProd | Optional; tells if prod SAM is used. No current impact. | No |
| XAppIssuers | Optional; required for xApps (external application) TCX integration. List issuer and/or client IDs as specified. [Details](../../Enable%20xApps%20Integration%20with%20Teamcenter%20X/). <br/><br/><b>Cloud Scheduler:</b> Specify client ID of the Cloud Scheduler app. [More info](../010_Configure%20Customer%20SAM%20Account.md#generate-client-credentials-for-teamcenter-xcelerator-proxy-txp-and-cloud-scheduler).<br/>Also refer to [Cloud Scheduler validation](#cloud-scheduler-validation) section.<br/>_Applicable to TcX Essentials/Standard/Advanced deployments only._ |   | No |
| XAppUsers | Optional; mapping of xApp (external application) client_ids to TCX usernames. [Details](../../Enable%20xApps%20Integration%20with%20Teamcenter%20X/) <br/><br/><b>Cloud Scheduler:</b> Specify client ID of the Cloud Scheduler app and TCX username as "dcproxy". [More info](../010_Configure%20Customer%20SAM%20Account.md#generate-client-credentials-for-teamcenter-xcelerator-proxy-txp-and-cloud-scheduler).<br/>Also refer to [Cloud Scheduler validation](#cloud-scheduler-validation) section.<br/>_Applicable to TcX Essentials/Standard/Advanced deployments only._ | No |
| SREConfig | Optional; workload type: `dev, pre_prod, prod`. Supported in 2512+. | Yes |
| AzDeployShareSizeGB | Optional; Azure FileShare quota for Deploy File share. Default=`100`. | Yes |
| AzIPDataShareSizeGB | Optional; Azure FileShare quota for IPData share. Default=`100`. | Yes |
| BackupSLATier | Optional. Sets the backup SLA tier, which controls backup frequency and retention policies. Allowed values: `std`, `silver`, `gold`. Default: `std`. **Note:** To trigger an ad-hoc backup using the `silver` tier, the tenant must have been initially deployed with `silver` tier. <br/><br/> **Tier definitions:** <br/><table><thead><tr><th>Property</th><th>std</th><th>silver</th><th>gold</th></tr></thead><tbody><tr><td>Frequency</td><td>Daily</td><td>Every 12 hours</td><td>Every 2 hours</td></tr><tr><td>Short Term Retention</td><td>14 days</td><td>30 days</td><td>30 days</td></tr><tr><td>Monthly LTR</td><td>3 months</td><td>6 months</td><td>12 months</td></tr></tbody></table> | No |
| OtlpMetricInput                                        | Optional, The OtlpMetricInput is used to control the behavior of OpenTelemetry metrics collection in TCX Tenant. It allows control over whether monitoring is enabled and which specific metrics (if any) should be excluded. <br/> Supported for versions 2512+. <br/><br/> 1. For 2512, default behaviour for OTLP observability is disabled, OTLP-based application monitoring is supported only for Standard, Advanced, and Premium products with the following PIDs: **TC7003-XT, TC10102-XT, TC7100, TC7101**. <br/> 2. For 2606, default behaviour for OTLP observability is enabled, OTLP-based application monitoring is supported for Standard, Advanced, Essential and Premium products with the following PIDs: **TC7003-XT, TC10102-XT, TC7100, TC7101** and **QD based deployment for Essential**.  <br/><br/> Here is the definition for ["Otlp Metric Input"](#otlp-metric-input)                                                                                                                               | Yes                                               |
| TcFMSVolumeType                                    | Optional: Storage type: ["AzureNetapp"] for Azure NetApp files, default value - ["AzureFiles"]. **Note: It is either AzureFiles or AzureNetapp** | No |
| MetaverseTranslatorAccesskey                 | Optional: Required for Digital Reality Viewer (external application) integration. Please follow DigitalRealityViewer Cookbook to generate these keys.  | No                                               |
| MetaverseTranslatorSecretaccesskey           | Optional: Required for Digital Reality Viewer (external application) integration. Please follow DigitalRealityViewer Cookbook to generate these keys. | No           |
| AzureNetAppInput                                   | Optional: Nested Azure NetApp Files configuration. Only applicable when `TcFMSVolumeType` = `['AzureNetapp']`. See nested keys below. |  |
| AzANFServiceLevel                                  | Optional: Service level for Azure NetApp Files. Allowed values: `Standard`, `Premium`, `Ultra`, `Flexible`. Default: `Flexible`. **Cannot be changed on rerun**. | No |
| AzANFPoolSizeTB                                    | Optional: The size should be specified in TB. Default: `2`, Minimum Value: `2`, Allowed Values - Integer. Only applicable when `TcFMSVolumeType` = `['AzureNetapp']`. | Yes |
| AzANFVolumeSizeGB                                  | Optional: The size should be specified in GB. Default: `1024`, Minimum Value: `1024`, Allowed Values - Integer. Only applicable when `TcFMSVolumeType` = `['AzureNetapp']`. | Yes |
| AzANFVolumeThroughputMibps                         | Optional: Volume throughput in MiB/s. Default: `288`, Minimum Value: `128`, Allowed Values - Integer . **Required only when `AzANFServiceLevel` = `Flexible`** . Only applicable when `TcFMSVolumeType` = `['AzureNetapp']`. | Yes |
| PrimaryAZName | Optional: Primary Availability zone for the cluster node affinity. <br />Commands to get the valid list of logical zones: <br /> ```export AZURE_SUBSCRIPTION_ID=<tenant-subscription-id>``` <br/> ```export REGION=<Azure-region>``` <br /> ```az rest --method get --uri "/subscriptions/${AZURE_SUBSCRIPTION_ID}/locations?api-version=2022-12-01" --query "value[?availabilityZoneMappings != 'null' && name == '${REGION}'].{name: name, availabilityZoneMappings: availabilityZoneMappings}" ``` <br /> Example output: <br /><pre><code>[<br />  &#123;<br />    "availabilityZoneMappings": [<br />      &#123;<br />        "logicalZone": "1",<br />        "physicalZone": "eastus-az3"<br />      &#125;,<br />      &#123;<br />        "logicalZone": "2",<br />        "physicalZone": "eastus-az2"<br />      &#125;,<br />      &#123;<br />        "logicalZone": "3",<br />        "physicalZone": "eastus-az1"<br />      &#125;<br />    ],<br />    "name": "eastus"<br />  &#125;<br />]</code></pre><br />For a desired physical zone, the value for PrimaryAZName should be in the format ```<region>-<logicalZone>``` <br />E.g., if the deployment is desired in ```eastus-az3```,  PrimaryAZName will be ```eastus-1```, where ```eastus``` is the region and ```1``` is the logical-zone corresponding to physical-zone ```az3``` | Yes |
| ValuesOverride | YAML object containing chart/value overrides. Supports nested keys such as replicaCount. | No, use operation update-override to update the values. |
| SamVersion | Optional. SAM version to be selected. Allowed values are `1.0` and `2.0`. Defaults to `1.0`, if parameter is not specified. | No |
| Sam2Input.TcxDeploymentTctuClientId | Mandatory only when `SamVersion` is `2.0`. Client id for the [TcX deployment tech user](https://developer.internal.siemens.com/fds/documentation/apps/admin-console-guide-ix/service-org-account.html#create-admin-tech-user) generated from Service Org Admin Console. Example: `500135143-tcxpremium-admintechuser-20260302103033`. | Yes |
| Sam2Input.TcxDeploymentTctuClientSecret | Mandatory only when `SamVersion` is `2.0`. Client secret for the [TcX deployment tech user](https://developer.internal.siemens.com/fds/documentation/apps/admin-console-guide-ix/service-org-account.html#create-admin-tech-user) generated from Service Org Admin Console. | Yes |
| TeamcenterProductSKUList | Optional. List of product SKUs which uniquely identify the ARM product for which the environment is to be created. To be used only when static QD is specified as input. More details provided [below](./020_AZURE%20Customer%20Input.md#input-parameters-to-enable-fds-iam-sam-20).| No |
| UpTime | Optional: Schedule automatic start/stop of the tenant environment . Refer to the [Schedule List](../../../020_Operations/030_Day%20N%20Operations/110_Schedule%20Start%20Stop/010_Schedule%20List.md) for supported schedule names and descriptions. Use the schedule name as input for 'UpTime'. If not specified, environment runs continuously (always-on)  | yes         |
| TXPClientId | Optional: Required to be able to invoke Xcelerator services from Teamcenter components using a technical user. [More info](../010_Configure%20Customer%20SAM%20Account.md#generate-client-credentials-for-teamcenter-xcelerator-proxy-txp-and-cloud-scheduler).<br/>_Applicable to TcX Essentials/Standard/Advanced deployments only._ | No |
| TXPClientSecret  | Optional: Required to be able to invoke Xcelerator services from Teamcenter components using a technical user. [More info](../010_Configure%20Customer%20SAM%20Account.md#generate-client-credentials-for-teamcenter-xcelerator-proxy-txp-and-cloud-scheduler).<br/>_Applicable to TcX Essentials/Standard/Advanced deployments only._ | No |
| TXPAccpEndpoints | Optional: This is required for proper functioning of PL Web Components in Active Workspace. If this is not specified in the Ansible input, then it is expected that it is specified in the YAML cell file that is used for the deployment.<br/><br/>This field defines a set of endpoint configurations for PL Web Component (PWC) providers within the Xcelerator Services ecosystem. Each entry, identified by an alias such as "adhoc", "dim", etc., corresponds to a specific provider module supporting various PWC functionalities. The structure accommodates multiple provider endpoints, each with its own base URL and versioning metadata (e.g., sam_version).<br/><br/>Depending on the region where the tenant is being provisioned, the values listed in the ["Teamcenter Xcelerator Proxy (TXP) microservice endpoints"](#teamcenter-xcelerator-proxy-txp-microservice-endpoints) section listed below should be in the Ansible input. (See: [Validation steps](../../050_Validation%20Steps%20for%20Teamcenter%20X%20Products/240_Post%20Deploy%20Validation%20Steps%20for%20TXP.md)). | Yes |
| TXPXcsEndpoints | Optional: This is required for successful invocation of Xcelerator Services from Teamcenter components. If this is not specified in the Ansible input, then it is expected that it is specified in the YAML cell file that is used for the deployment.<br/><br/>This field contains endpoint configurations for Xcelerator Services (XCS), a suite of cloud-based microservices that extend Teamcenter functionality. Each alias maps to a specific backend service, such as notifications, reporting, subscriptions, or data synchronization. Each entry includes a unique service URL and associated versioning metadata (e.g., sam_version), enabling support for multiple XCS endpoints.<br/><br/>Depending on the region where the tenant is being provisioned, the values listed in the ["Teamcenter Xcelerator Proxy (TXP) microservice endpoints"](#teamcenter-xcelerator-proxy-txp-microservice-endpoints) section listed below should be used in the Ansible input. (See: [Validation steps](../../050_Validation%20Steps%20for%20Teamcenter%20X%20Products/240_Post%20Deploy%20Validation%20Steps%20for%20TXP.md)). | Yes |
| TCREPAppClientId | Optional: Required for "Teamcenter Integration for Power BI software". It is the Azure Application Client Id which is the unique identifier of the Azure-registered app used to securely authenticate Power BI with your organization’s identity system for Teamcenter integration| No |
| TCREPAppTenantId | Optional: Required for "Teamcenter Integration for Power BI software". It is the Azure Application Tenant Id that identifies the Azure organization where the app is registered, ensuring Power BI connects to the correct environment for Teamcenter integration| No |
| TCREPAppClientSecret | Optional: Required for "Teamcenter Integration for Power BI software". It is the Azure Application Client Secret - a secure credential used to authenticate the app, enabling Power BI to securely connect to Azure and access Teamcenter data | Yes |
| TCREPEnterpriseAppName | Optional: Required for "Teamcenter Integration for Power BI software". It is the Azure Application Name/Display name that identifies the registered app, helping Power BI connect to the correct Azure application for Teamcenter integration| No |

---

## Sample Customer Input YAML Format

Use this example as a template for your Azure customer input file. Replace placeholders with your actual values and validate before launching.

```yaml
PipelineStage: deploy
Description: Testing the creation on integrate branch
PipelineVariableVersion: "<variable repo branch>"
PipelineVersion: "<tenant repo branch>"
TcXVersion: "br.2506.0001"
TcxCliRequirement: "teamcenterx==3.0.3.9.rc1"
StreamId: dev
CustomerID: "12345678"
Company: acmeinc
dnsSubdomainName: acmeinc-prd
TcDatabaseType: MSSQLServer
WindowsVMInstanceType: Standard_E8s_v3
LinuxVMInstanceType: Standard_D8s_v5
TcXAdminEmail: tcxtest.siemens@gmail.com
NotificationEmailId: devuser@siemens.com
CellId: azm-eaus-tcx-preprod47-dev-005
Enable_SSO: true
DeployDispatcher: false
Environment: prd
FeatureHighAvailableDeployment: false
IstioMeshGatewayNamespace: istio-xcr
IstioMeshTlsSecret: tls-secret
ProcessTarget: '0730 1, 1700 1'
ProcessMax: 3
ProcessWarm: 1
SMTPPassword: test1234
SMTPUserName: testuser
SamAuthAccountID: "<your-sam-auth-account-id>"
SamAuthUserAccessKey: "<your-sam-auth-access-key>"
SamAuthUserSecretAccessKey: "<your-sam-auth-secret-key>"
DefaultUserSamId: "<your-default-sam-id>"
PipelineCloud: "109407702"
EnterpriseCloudAccountId: "500107952"
TenantSamAccountId: "8d44757a921e4b74b2aebfe54f448494"
TeamcenterProductIDList:
  - TC7003-XT
TXPClientId: <txp-client-id>
TXPClientSecret: <txp-client-secret>
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
XAppIssuers:
  - <SAM 2.0 xApps1 issuer id>
  - <SAM 2.0 xApps1 client_id>
  - <SAM 1.0 xApps2 client_id>
  - <SAM 2.0 Token Exchange xApps3 issuer id>
XAppUsers:
  - <SAM 2.0 xApps1 client_id:tcdaemonusername1>
  - <SAM 1.0 xApps2 client_id:tcdaemonusername2>
  - <SAM 1.0 Token Exchange xApps3 client_id:tcdaemonusername3>
  - <SAM 2.0 Token Exchange xApps4 client_id:tcdaemonusername4>
SREConfig: dev
AzDeployShareSizeGB: 200
AzIPDataShareSizeGB: 200
BackupSLATier: std
OtlpMetricInput:
  OtlpMonitoringDisabled: False
  OtlpMetricDisabled:
  - microservice.tc.metric.test
MetaverseTranslatorAccesskey: <your-metaverse-accesskey>
MetaverseTranslatorSecretaccesskey: <your-metaverse-secret-accesskey>
AzureNetAppInput:
  AzANFServiceLevel: "Flexible"
  AzANFPoolSizeTB: 2
  AzANFVolumeSizeGB: 1024
  AzANFVolumeThroughputMibps: 288
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


## Enable WAF Rate Limit Input

### `Enable_azure_waf_ratelimit`

A **boolean configuration flag** that controls whether **Azure WAF Rate Limit** is enabled or disabled for the system.

If the incoming Tc SOA Login Api request is a token value, the request is allowed through whereas only the ones containing passwords are aggregated for rate limiting. The idea behind this being that since token based requests originate from authenticated users only, hence they won’t be considered for rate limiting.

The rules would check for the length of the value being passed as part of the password/ssoCredentials field in the API request and compare it to a threshold value of 70 characters. If the value is greater than 70 , it is considered to be a token and allowed through. Anything less than or equal to 70 is assumed to be a password and is aggregated for rate limiting.

Additionally, all Tc SOA Login API Requests are to be logged for detailed monitoring.

- When set to **`true`**, Custom rule Sets are **enabled**. It is the default value. 
- When set to **`false`**, Custom rule sets are **disabled**.