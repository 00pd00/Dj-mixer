## Blue-Green Upgrade Workflow: Pipeline Execution

This document details the GitLab-driven Blue-Green upgrade pipeline workflow for CTCx environments.

---

## 1. Overview

The Blue-Green upgrade is executed through a GitLab pipeline integrated with Terraform and Deployment Center (DC). The workflow orchestrates snapshot creation, environment provisioning, data restoration, upgrade execution, validation, and switchover operations.

---

## 2. Prerequisites

Before starting, ensure that:

### 2.1 Source Environment Requirements
- The Blue (production) environment is active and serving users
- Deployment Center (DC) services are running
- GitLab Personal Access Token (PAT)
- AWS/Azure credentials with snapshot and provisioning permissions
- Vault access for secrets management (ROOT TOKEN required for snapshot operations)

For guidance on starting DC services, see: [Commands to Start and Stop DC Services on Linux](../../../Documentation/Operations/Day%20N%20Operations/Stop%20DC%20Services#commands-to-start-and-stop-dc-services-on-linux).


---

## 3. Pipeline Input Parameters

### 3.1 Input Parameters

| **Parameter** | **Description** | **Example** |
|---------------|-----------------|-------------|
| Description | Description of the input configuration | `Example input based on nightly (stable kits, latest pipeline)` |
| PipelineProject | GitLab pipeline project path | `tcx-deploy/tcx-pipeline-tenant` |
| PipelineVersion | Pipeline template version | `main`, `br.5.0.0` |
| TcxCliRequirement | Required tcx-cli version | `teamcenterx==0.4.9` |
| CustomerID | Unique customer/tenant identifier | `changeme`, `deploy123` |
| Company | Company/customer name | `CHANGE_ME` |
| dnsSubdomainName | DNS subdomain for Green environment | `change-me`, `tcx-green.example.com` |
| externaldnsSubdomainName | External DNS subdomain | `change-me` |
| TcXAdminEmail | TcX administrator email address | `tcxtest.siemens@gmail.com` |
| CellId | Cell identifier for deployment | `depops-preprod05-us-east-1` |
| PipelineCloud | AWS account ID or Azure subscription ID | `906956190433`, `123456789012` |
| Environment | Target environment type | `dev`, `prd`, `uat`, `preprod` |
| SourceEnvironmentType | Type of source Blue environment | `prd`, `uat`, `preprod` |
| SourceEnvironmentID | Unique identifier of source deployment | `001`, `01`, `02` |
| SourceTcXVersion | Current Teamcenter version in source | `br.2506.0006` |
| TcXVersion | Target Teamcenter version for upgrade | `main`, `br.2512.0000` |
| BackupSetId | Backup set identifier for restore | `customer_prd_backup_20240812` |
| TcDatabaseType | Database type | `PostgreSQL`, `Oracle` |
| TcDBInstanceClass | Database instance size | `Small`, `Medium`, `Large` |
| PrimaryAZName | Primary availability zone | `us-east-1b` |
| DSSAccountID | DSS account identifier (secret) | `FAKE_DSS_SECRET` |
| DSSUserAccessKey | DSS user access key | `CHANGE_ME` |
| DSSUserID | DSS user identifier | `4b042fa93b2e471a8768e9558de84ce5` |
| DSSUserSecretAccessKey | DSS user secret access key | `CHANGE_ME` |
| DefaultUserSamId | Default SAM user identifier | `97e21dd158cc466c8fe1caaa7ca737da` |
| SamHost | SAM service host URL | `us-east-1.sws.siemens.com` |
| SamAuthHost | SAM authentication host URL | `us-east-1.sws.siemens.com` |
| DSSHost | DSS service host URL | `us-east-1.sws.siemens.com` |
| SamVersion | SAM version | `1.0` |
| SamAuthAccountID | SAM auth account ID (secret) | `FAKE_SAM_AUTH_ACCOUNT_ID_SECRET` |
| SamAuthUserAccessKey | SAM auth user access key | `CHANGE_ME` |
| SamAuthUserSecretAccessKey | SAM auth user secret access key | `CHANGE_ME` |
| TenantSamAccountId | Tenant SAM account identifier | `747e44a4357c4cc2800e696006018d4a` |
| EnterpriseCloudAccountId | Enterprise cloud account ID | `500007810` |
| UseDSSLite | Enable DSS Lite mode | `true`, `false` |
| DeployDispatcher | Deploy dispatcher service | `false`, `true` |
| Enable_SSO | Enable Single Sign-On | `true`, `false` |
| Enable_MFA | Enable Multi-Factor Authentication | `true`, `false` |
| FeatureHighAvailableDeployment | Enable high availability deployment | `false`, `true` |
| IstioMeshGatewayNamespace | Istio mesh gateway namespace | `istio-xcr` |
| IstioMeshTlsSecret | Istio mesh TLS secret name | `CHANGE_ME` |
| IstioVersionLabel | Istio version label | `prod-stable` |
| LinuxServerAMI | Amazon Machine Image ID for Linux servers | `ami-042b0ce3ae48393f3` |
| WindowsServerAMI | Amazon Machine Image ID for Windows servers | `CHANGE_ME` |
| DCInstanceType | Deployment Center instance type | `c5a.large` |
| WindowsServer1InstanceType | Windows server instance type | `m5a.large` |
| ProcessTarget | Target number of processes | `0000 4` |
| ProcessMax | Maximum number of processes | `30` |
| ProcessWarm | Number of warm processes | `4` |
| TcFMSVolumeType | FMS volume type(s) | `DSS` |
| StreamId | Stream identifier for notifications | `dev` |
| NotificationEmailId | Email for notifications | `test@siemens.com` |
| SMTPUserName | SMTP username for email | `CHANGE_ME` |
| SMTPPassword | SMTP password for email | `CHANGE_ME` |
| SREConfig | SRE configuration identifier | `dev` |
| AdditionalSoftware | List of additional software packages | See YAML example for structure |
| XAppIssuers | List of xApp client/issuer IDs | `["SAM_1_CLIENT_ID", "SAM_2_ISSUER_ID"]` |
| XAppUsers | List of xApp user mappings | `["SAM_1_CLIENT_ID:TEAMCENTER_USERID_1"]` |

### 3.2 AWS-Specific Parameters

| **Parameter** | **Description** | **Required** |
|---------------|-----------------|--------------|
| AWS_ACCESS_KEY_ID | Access key for source AWS account | Mandatory |
| AWS_SECRET_ACCESS_KEY | Secret access key for source account | Mandatory |
| AWS_SESSION_TOKEN | Session token (if using temporary credentials) | Mandatory |
| AdminReadAccessRoleArn | IAM role ARN for Vault read access | Recommended |
| AdminReadWriteAccessRoleArn | IAM role ARN for Vault write access | Recommended |

### 3.3 Azure-Specific Parameters

| **Parameter** | **Description** | **Required** |
|---------------|-----------------|--------------|
| AZURE_SUBSCRIPTION_ID | Azure subscription ID | Mandatory |
| AZURE_TENANT_ID | Azure tenant ID | Mandatory |
| AZURE_CLIENT_ID | Service principal client ID | Mandatory |
| AZURE_CLIENT_SECRET | Service principal secret | Mandatory |

### 3.4 Common Parameters

| **Parameter** | **Description** | **Required** |
|---------------|-----------------|--------------|
| GITLAB_PAT | GitLab Personal Access Token | Mandatory |
| VAULT_TOKEN | Hashicorp Vault ROOT TOKEN (pipeline token will NOT work) | Mandatory |

**⚠️ Critical:** The Vault ROOT TOKEN is required for backup and snapshot operations. The standard pipeline token (customer_inputs) will not work for this use case. See [Vault Setup](../../000_Cell-Setup/000_Automation%20Prerequisites/070_Tools%20Setup/000_Vault%20Setup.md) for details.

---

## 4. Executing the Pipeline

### 4.1 Selecting the Template

1. Navigate to the **Blue-Green Upgrade** template using the [Ansible Templates Table](../../010_Tenant%20Onboarding/020_Basic%20Flow/020_Ansible%20Templates%20Table.md)
2. Choose the appropriate version:
   - **Dry-run:** For testing the workflow without affecting production
   - **Production:** For live upgrade execution

3. Review all inputs for accuracy
4. Click **Launch** or **Run Pipeline**
5. Monitor pipeline execution through GitLab UI


---

## 5. Troubleshooting

For detailed troubleshooting guidance, refer to [Troubleshooting Section](../../../Documentation/Operations/Troubleshooting/Enable%20Diagnostic%20logs%20for%20tcservers).

### 5.1 Common Issues

- Verify Blue environment is healthy and accessible
- Check AWS/Azure credentials and permissions for backup
- Ensure sufficient storage quota for snapshots
- Validate Vault ROOT TOKEN is correct

---

## 6. Post-Deployment Operations Checklist

- Complete the standard post-deployment operations as outlined in [Post Deploy Operations](../../../Documentation/Tenant%20Onboarding/Post%20Deploy%20Operations/Create%20Admin%20License%20Server):

- trigger solr reindex operation for reindexing SOLR database, follow [reindex solr db operation](../../../Documentation/020_Operations/056_Reindex%20Solr%20Operation/000_Reindex%20Solr%20Execution.md)

- [ ] License server registration and validation
- [ ] User onboarding and access verification
- [ ] Monitoring and alerting configuration g

---

## 7. Dispatcher Configuration (If Applicable)

If your environment includes a Teamcenter Dispatcher, complete post-upgrade configuration:

Follow the [Teamcenter Dispatcher and Translators](../../../Documentation/Tenant%20Onboarding/Teamcenter%20Dispatcher%20and%20Translators/Requirements) documentation for:
- Dispatcher service Deployment

---

## 8. Next Steps

After successful pipeline completion, proceed to [Post-Upgrade Operations](./020_Post%20Green%20deployment.md) for validation, monitoring, and cleanup procedures.

---