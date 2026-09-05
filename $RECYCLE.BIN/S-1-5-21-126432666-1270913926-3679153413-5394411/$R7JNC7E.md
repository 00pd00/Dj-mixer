##### Prepare the scripts to execute

1. Clone the `tcx-pipeline-account` repository:

    ```bash
    git clone git@gitlab.industrysoftware.automation.siemens.com:tcx-deploy/tcx-pipeline-account.git
    ```

2. Check out the tag provided during handoff:

    ```bash
    cd tcx-pipeline-account
    git checkout <tag-name>
    ```

3. Navigate to the `scripts` folder over any editor.
4. Set valid values for all variables related to your admin cell in the following files:
    - `0_admin_env_vars.sh`
5. Zip all files in the `scripts` folder:

    ```bash
    tar -czvf scripts.tar.gz scripts/
    ```

Variables guide for `0_admin_env_vars.sh`:

- 0_admin_env_vars:

| **No.** | **Key** | **Description** | **Reference/Value** |
|---------|---------|-----------------|---------------------|
| 1 | ACCOUNT_OWNER_EMAIL | (Tag purpose) Specifies the email address of the account or subscription owner. This value will be included in Azure resource tags for identification and contact purposes. Add one email id only. | Example: "abc@siemens.com" |
| 2 | ADMIN_CELL_ID | This will be used in admin resources name creation. This cannot exceed 4 characters. | For Dev: "0002"<br />For DryRun: "0001" <br/>For Prod: "0001"|
| 3 | AZURE_SUBSCRIPTION_ID | Azure subscription ID under which resources are deployed. | For Example: "888b0468-c8c4-4e39-915f-9f9fcc38040a"|
| 4 | AZURE_TENANT_ID | Tenant id of SPLM Tenant | "6b5bd02b-92d2-40b2-9ffd-c9c94280c757" |
| 5 | AZ_AWS_INTEROP_APP | This is used as the name of the app registration to enable interoperability with AWS. This is created once per management group | For Dev: "tcx-az-dev-aws-interop-app" <br/> For DryRun: "tcx-az-caps-rv-nonprod-aws-interop-app" <br/> For Prod: "tcx-az-prd-aws-interop-app" |
| 6 | AZ_DEST_IMG_DEFINITIONS | Destination image definitions for copying image versions to | For Dev: "TcX.RHEL8,TcX.WindowsServer2022,TcX.Oracle19.RHEL8,TCX.RHEL9.Prod" <br/> For Prod: "TcX.RHEL8,TcX.WindowsServer2022,TcX.Oracle19.RHEL8,TCX.RHEL9.Prod" |
| 7 | AZ_IMG_COPY_SCHEDULE_FREQUENCY | Schedule frequency for automated image copy operations | "Day" <br/> Possible values: OneTime, Day, Hour, Week, or Month.|
| 8 | AZ_IMG_COPY_SCHEDULE_INTERVAL | Schedule interval for automated image copy operations | "1" |
| 9 | AZ_REQUIRED_VALIDATION_TAG | Tag name to filter validated images for copying. Set to empty string to pull latest available images without tag filtering | "tcx-vm-image-validated" |
| 10 | AZ_SOURCE_GALLERY_NAME | Source gallery name from where validated images come | "tcx_admin_0002_gal" |
| 11 | AZ_SOURCE_IMAGE_DEFINITIONS | Source image definitions from where validated images come | For Dev: "TcX.RHEL8.PreProd,TcX.WindowsServer2022.PreProd,TcX.Oracle19.RHEL8.PreProd,TcX.RHEL9.PreProd" <br/> For Prod: "TcX.RHEL8,TcX.WindowsServer2022,TcX.Oracle19.RHEL8,TcX.RHEL9.Prod" |
| 12 | AZ_SOURCE_RESOURCE_GROUP | Source resource group from where validated images come | "tcx-admin-0002-rg" |
| 13 | AZ_SOURCE_SUBSCRIPTION_ID | Source subscription ID from where validated images come | "888b0468-c8c4-4e39-915f-9f9fcc38040a" |
| 14 | CELL_LOCATION | Azure region where the cell is deployed. | "eastus/germanywestcentral/japaneast/centralus" |
| 15 | INTENT | This will be used in the Azure resource tags to show the purpose of the deployment (e.g., dry run, production). | Example:<br />For Dev: "Development"<br />For DryRun: "DryRun" <br/> For Prod: "Production" |
| 16 | OIDC_APP_NAME | This will be used as the name of the application registered for OIDC (OpenID Connect) authentication. | For dev: tcx-az-entra-oidc-app<br />For DryRun: "tcx-az-caps-rv-nonprod-entra-oidc-app" <br/> For Prod: "tcx-az-prd-entra-oidc-app" |
| 17 | OIDC_AUTH_PATH | The path segment used in the authentication URL for OIDC. | oidc |
| 18 | SECURITY_CONTACT_EMAIL | (Tag purpose) This will be used in the Azure resource tags. Provide Email for security alerts and notifications. | For dev: "tcx.security.industry@siemens.com" <br /> For Prod: "caps.security@siemens.com"|
| 19 | SHARED_RESOURCE | (Tag purpose) Boolean flag indicating whether the Azure resource is shared across environments or tenants. Used in resource tags to identify shared components such as shared-rg or admin-rg that are accessed by multiple tenant resources. | "Yes" |
| 20 | TIMEZONE | (Tag purpose) Time zone setting for the deployment. This will be used in azure resource tags. | Example: "utc" |
| 21 | VALID_LOCATIONS | Defines the list of Azure regions where deployments are permitted. This variable is used to enforce region validation during Terraform execution. | Example : '["eastus", "japaneast", "germanywestcentral", "centralus"]' |
| 22 | VARIABLES_FILENAME | Name of the file that would be auto-created using the environment name or deployment context, containing the admin cell variables. There is typically only one admin cell. | Example: azm-preprod-admin-002 |
| 23 | VAULT_ADDR | Base URL of the Vault server. | Dev: "https://vaultent.emea1.co.sws.siemens.com"<br />For DryRun/Prod: "https://vault.xcr.gblsvcs01eu.prod.eu-central-1.kaas.sws.siemens.com" |
| 24 | VAULT_ENTITY_NAME | This will be used as an entity name in OIDC authentication. | TcXEntity |
| 25 | VAULT_NAMESPACE | Namespace in Vault for organizing secrets and configurations. | For Dev: "tcx-development_ns/storm_playground"<br/> For DryRun: "caps-tcx-nonproduction_ns" <br/> For Prod: "caps-tcx-production_ns" |
| 26 | VAULT_TOKEN | Authentication token for accessing Vault. | To be generated as per current procedure |
