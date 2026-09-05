# SharePoint Embedded Container Setup

**Responsibility: The customer's Azure administrator or SharePoint administrator should perform this step.**

A SharePoint Embedded container must be created to store and manage Teamcenter documents. This container acts as an isolated storage unit with its own governance and access controls.

The scripts referenced in this guide can be found at: https://github.com/Spucelik/SPE-Setup/

## Overview

SharePoint Embedded containers provide isolated, application-specific document storage that integrates seamlessly with Office Online and other Microsoft 365 services while maintaining Teamcenter's access control policies.

## Prerequisites

- SharePoint Embedded license provisioned
- Azure application registered (from previous step)
- Administrator access to Azure portal
- PowerShell with SharePoint Online Management Module
- Azure subscription with billing configured

## Step-by-Step Guide

### 1. Complete Prerequisites

Ensure you have completed:
- [Azure Application Registration](./020_Azure%20Application%20Registration.md)
- [API Permissions Configuration](./030_API%20Permissions%20-%20Azure%20Application.md)

### 2. Set PowerShell Variables

Set up the required variables for the setup scripts. Replace the placeholder values with your actual information:

```powershell
$TenantName = "<TenantName>"
$TenantID = "<TenantID>"
$AppId = "<AppID>"
$ClientSecret = "<ClientSecret>"
$ContainerTypeName = "ContainerName"
$ContainerName = "SPEVideoDemoContainer"
$ContainerTypeId = "<ContainerTypeID>"
$AzureSubscriptionId = "<AzureSubscriptionID>"
$ResourceGroup = "<ResourceGroup>"
$CertPath = "./certs/SPDemo.key"
$Thumbprint = "Thumbprint"
$AdminUser = "<user>"
```

### 3. Create and Upload Certificate

Create a new certificate if you don't already have one, and upload it to the App Registration:

```powershell
.\createCert.ps1 -CertName $ContainerName
```

After creating the certificate:
a. Navigate to your App Registration in Azure portal
b. Go to **Certificates & secrets**
c. Click **Upload certificate**
d. Upload the generated certificate file

### 4. Create the Container Type

Use SharePoint Online PowerShell to create the container type:

```powershell
Import-Module "Microsoft.Online.SharePoint.PowerShell"
Import-Module Microsoft.Online.SharePoint.PowerShell -UseWindowsPowerShell
Connect-SPOService -Url "https://${TenantName}-admin.sharepoint.com"

New-SPOContainerType -ContainerTypeName $ContainerTypeName -OwningApplicationId $AppId
```

The command will output a **Container Type ID**. Save this value.

### 5. Update the ContainerTypeId Variable

Update the PowerShell variable with the Container Type ID from the previous step:

```powershell
$ContainerTypeId = "<ContainerTypeId-from-step-5>"
```

### 6. Associate Azure Subscription Billing

Link the Azure subscription to the newly created Container Type for billing purposes:

```powershell
Add-SPOContainerTypeBilling –ContainerTypeId $ContainerTypeId -AzureSubscriptionId $AzureSubscriptionId -ResourceGroup $ResourceGroup -Region "eastus"
```

:::note
Adjust the `-Region` parameter based on your requirements (e.g., "westus", "northeurope", etc.).
:::

### 7. Register Container Type and Create Container

Run the registration and container creation scripts:

```powershell
.\SPERegistrationScript.ps1 -ClientId $AppId -ContainerTypeId $ContainerTypeId -PemCertificationFilePath $CertPath -ConsumerTenantId $TenantID -ConsumerTenantUrl "https://${TenantName}.sharepoint.com" -Thumbprint $Thumbprint

.\CreateContainer.ps1 -TenantId $TenantID -ClientId $AppId -ClientSecret $ClientSecret -ContainerTypeId $ContainerTypeId -DisplayName "Container1" -UserPrincipalName "${AdminUser}@${TenantName}.onmicrosoft.com" -Role "owner"
```

### 8. Verify Container Creation

You can now verify the newly created Container Type and container in the SharePoint Admin Center:

a. Navigate to [SharePoint Admin Center](https://admin.microsoft.com/sharepoint)
b. Go to **Settings** > **SharePoint Embedded**
c. Verify your container type and container appear in the list

:::info
It may take up to 5 minutes for the container to appear in the admin center.
:::

### 9. Configuration Complete

Everything is now configured for SharePoint Embedded integration with Teamcenter Office Online.

## Required Information to Share with CApS Team

After completing the setup, provide the following information to the Siemens CApS team:

| Item | Description |
| :--- | :---------- |
| Container ID | Unique identifier for the SharePoint Embedded container |
| Container Type ID | Identifier for the registered container type |
| Container URL | Access URL for the container |
| Application ID | Azure application ID with container access |
| Tenant ID | Azure AD Tenant ID |

## Important Notes

:::warning
- Container creation requires appropriate SharePoint Embedded licenses
- Container Type registration is a one-time operation per application
- Multiple container instances can be created from the same container type
- Ensure proper access controls are configured before adding documents
- Container deletion is permanent and cannot be undone
- **For UAT vs PROD environments**: Create separate container types and containers for each environment to prevent data loss
:::

## Additional Resources

For detailed API documentation and PowerShell scripts, refer to:
- [Microsoft Graph Storage API](https://learn.microsoft.com/en-us/graph/api/resources/filestorage)
- [SharePoint Embedded Documentation](https://learn.microsoft.com/en-us/sharepoint/dev/embedded/overview)
- [SharePoint Online PowerShell](https://learn.microsoft.com/en-us/powershell/sharepoint/sharepoint-online/introduction-sharepoint-online-management-shell)
