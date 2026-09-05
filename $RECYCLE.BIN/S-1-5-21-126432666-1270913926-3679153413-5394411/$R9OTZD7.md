| **#** | **Key** | **Description** | **Value/Reference** |
|-------|--------|-----------------|---------------------|
| 1 | ADMIN_STORAGE_CONTAINER | Name of the Azure Blob Storage container for storing kits for tenant-pipeline | Dev: tcx-release-management-dev<br />Prod: tcx-release-management-production |
| 2 | ADMIN_CELL_ID | This value is used in admin resource names. | Refer: Admin variables table – 2nd row<br />Dev (LCS): 0002<br />Dry-Run (CApS): *TBD* <br /> Prod (CApS): *TBD* |
| 3 | ADMIN_SUBSCRIPTION_ID | Azure subscription ID used for administrative subscription | Refer: Admin variables table – 4th row<br />Dev (LCS): 888b0468-c8c4-4e39-915f-9f9fcc38040a <br /> Dry-Run (CApS): *TBD* <br /> Prod (CApS): *TBD* |
| 4 | ALLOW_IP_RULES | Comma-separated list of IP addresses or CIDR blocks allowed to access resources. (Gitlab runners IP) | 66.117.193.162,192.94.38.34,121.241.69.194,192.94.31.2,18.153.236.164,52.57.44.162,34.193.171.223,3.217.94.183,134.244.254.3 |
| 5 | AZURE_SUBSCRIPTION_ID | Azure subscription ID used for authentication | *(not specified)* |
| 6 | AZURE_TENANT_ID | Azure SPLM tenant ID used for authentication. | 6b5bd02b-92d2-40b2-9ffd-c9c94280c757 |
| 7 |  COMMUNICATION_ROLE_ID | Used for sending emails | For dev:"146bb9f4-8663-4986-9aca-a8cff34454d9" |
| 8 | EMAIL_SENDER_ADDRESS | Email address used as the sender for system-generated emails. | Dev: donotreply@61371b15-8912-4eea-b6bf-bd8d689d64d0.azurecomm.net<br />To get this value, Go to Azure portal -> Admin resource group -> communication service -> AzureManagedDomain -> Email services -> MainFrom address |
| 9 | LINUX_IMAGE_NAME | This is used in pipeline-tenant to create CorpServer VM. | TcX.RHEL8 |
| 10 | TENANT_SP_CUSTOM_ROLE_ADMIN_KEYVAULT_RBAC_READER_ID | The role ID of the custom role combining Key Vault Reader and RBAC permissions for admin Key Vault management. | Dev (LCS): "/subscriptions/888b0468-c8c4-4e39-915f-9f9fcc38040a/providers/Microsoft.Authorization/roleDefinitions/c536dc0b-2482-4175-80b2-c754490f692b" <br /> Dry-Run (CApS): *TBD* <br /> Prod (CApS): *TBD* |
| 11 | TENANT_SP_CUSTOM_ROLE_ADMIN_READER_ID |  The role ID of the custom role combining Compute Gallery Image Reader , Storage Blob Data Reader and minimal permissions required to send emails. | Dev (LCS): "/subscriptions/888b0468-c8c4-4e39-915f-9f9fcc38040a/providers/Microsoft.Authorization/roleDefinitions/ed65ac3d-cfc8-4f09-8921-75a7f7b89490" <br /> Dry-Run (CApS): *TBD* <br /> Prod (CApS): *TBD* |
| 12 | VALID_LOCATIONS | Defines the list of Azure regions where deployments are permitted. This variable is used to enforce region validation during Terraform execution. | Example : '["eastus", "japaneast", "germanywestcentral", "centralus"]' |
| 13 | WINDOWS_IMAGE_NAME | This is used in pipeline-tenant to create Dispatcher VM. | TcX.WindowsServer2022 |
| 14 | ORACLE_LINUX_IMAGE_NAME | This is used in pipeline-tenant to reference the Oracle-enabled Linux image for Oracle database servers. | TcX.Oracle19.RHEL8 |
