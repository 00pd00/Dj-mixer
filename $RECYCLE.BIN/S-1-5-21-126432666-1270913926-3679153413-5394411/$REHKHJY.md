## Pre-requisites

Navigate to the GIT project for customer-information/pipeline-output.md
- For CApS deployments, navigate to **tcx-tenant-repos-customer**

- [/-/blob/main/customer-information/pipeline-output.md" target="_top" class="descriptionLink">https://gitlab.industrysoftware.automation.siemens.com/tcx-containers-deploy-automation/tcx-tenant-repos-customer/[tenant_id]-[environment_type_id]/-/blob/main/customer-information/pipeline-output.md](https://gitlab.industrysoftware.automation.siemens.com/tcx-containers-deploy-automation/tcx-tenant-repos-customer/<tenant_id>-<environment_type_id>/-/blob/main/customer-information/pipeline-output.md)

- For internal deployments, navigate to **tcx-tenant-repos-internal** or **tcx-tenant-repos-dev**

[- /-/blob/main/customer-information/pipeline-output.md" target="_top" class="descriptionLink">https://gitlab.industrysoftware.automation.siemens.com/tcx-containers-deploy-automation/tcx-tenant-repos-dev/[tenant_id]-[environment_type_id]/-/blob/main/customer-information/pipeline-output.md ](https://gitlab.industrysoftware.automation.siemens.com/tcx-containers-deploy-automation/tcx-tenant-repos-dev/<tenant_id>-<environment_type_id>/-/blob/main/customer-information/pipeline-output.md)

Below placeholders are referred in further document.

| Place Holder | Value | Description |
|--------------|-------|-------------|
| [Vault IAM Role] | **AWS:** <br/> For read access: Value of **AWS Vault ReadRole ARN** in customer-information/pipeline-output.md <br/> For read write access: Value of **AWS Vault ReadWriteRole ARN** in customer-information/pipeline-output.md <br/> **Azure:** <br/> For read access: Value of **Azure Read Tenant SP Role Name** in customer-information/pipeline-output.md <br/> For read write access: Value of **Azure Tenant SP Access Entra Group Id** in customer-information/pipeline-output.md | AWS: This gives ARNs for Vault ReadRole and ReadWrite Role <br/> Azure: This gives SP for Vault ReadRole and ReadWrite Role|
| [Vault Backend Role] |**AWS**: <br/> For read access: Value of **AWS Vault ReadRole Name** in customer-information/pipeline-output.md <br/> For read write access: Value of **AWS Vault ReadWriteRole Name** in customer-information/pipeline-output.md ,<br/> **Azure**: <br/> For read access: Value of **Azure Vault ReadRole Name** in customer-information/pipeline-output.md <br/> For read write access: Value of **Azure Vault ReadWriteRole Name** in customer-information/pipeline-output.md| This gives the names for Vault ReadRole and ReadWrite Role |
| [Admin Access Role] | **AWS:** <br/> For read access: Value of **AWS Admin Read Access Role ARN** in customer-information/pipeline-output.md <br/> For read write access: Value of **AWS Admin ReadWrite Access Role ARN** in customer-information/pipeline-output.md <br/> **Azure:** <br/>For read access: Value of **Azure Read Access Entra Group Id** in customer-information/pipeline-output.md <br/> For read write access: Value of **Azure ReadWrite Access Entra Group Id** in customer-information/pipeline-output.md | admin access role which has permission to assume the read or read/write role |
| [Auth Path] | **AWS:** <br/> For read access: Value of **Vault ReadRole Auth Path** in customer-information/pipeline-output.md <br/> For read write access: Value of **Vault ReadWriteRole Auth Path** in customer-information/pipeline-output.md <br/>**Azure:** <br/> For read access: Value of **Vault OIDC Auth Path** in customer-information/pipeline-output.md | authentication path for the specific tenant environment |
| [Parent Namespace] | For production deployment: **caps-tcx-production_ns**/\nFor dry-run deployment: **caps-tcx-nonproduction_ns**/ | Parent namespace for authentication |
| [Tenant Env Namespace] | Value of **Tenant Environment Vault Namespace** in customer-information/pipeline-output.md | Tenant namespace to access secrets |
| [VaultEndpoint] | **https://vault.xcr.gblsvcs01eu.prod.eu-central-1.kaas.sws.siemens.com/** | Hashicorp Vault endpoint to be used |
 
​​
