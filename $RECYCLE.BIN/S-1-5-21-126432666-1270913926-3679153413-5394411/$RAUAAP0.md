# Create Microsoft Entra ID Tenant

**Responsibility: The customer's Azure administrator should perform this step.**

If you do not already have a Microsoft Entra ID tenant, you must create one before proceeding with the application registration and SharePoint Embedded setup.

## Goal

Create a Microsoft Entra ID tenant as the foundation for SharePoint Embedded.

## Prerequisites

- Must have an Azure Subscription

## Required Permissions

- Directory role: Global Administrator
- Tool access: Microsoft Entra Admin Center (https://entra.microsoft.com)

## Step-by-Step Guide

### 1. Sign in to Microsoft Entra Admin Center

Go to https://entra.microsoft.com and sign in with your Azure account credentials.

![Azure Portal Home Page](./Azure_Portal_HomePage.png)

### 2. Manage Tenants and Create New Tenant

Select **Manage tenants** → **Create**.

![Manage Tenants](./ManageTenants.png)

![Create Tenant](./CreateTenant.png)

### 3. Choose Configuration Type

Choose the type of configuration you need. In this cookbook, the **External** configuration will be chosen.

![Tenant Type](./TenantType.png)

### 4. Select Azure Active Directory

Choose **Azure Active Directory (Microsoft Entra ID)**.

### 5. Enter Tenant Details

Enter organization name, domain, and region.

![Tenant Basics](./TenantBasics.png)

### 6. Select Azure Subscription

Select an Azure subscription for billing purposes.

![Choose Azure Subscription](./ChooseAzureSub.png)

![Use Azure Subscription](./UseAzureSub.png)

### 7. Review and Create

Confirm and create the tenant.

:::note
After creating the tenant, it may take a few minutes for it to be fully provisioned and available for use.
:::

## Required Information to Note

After the tenant is created, make note of the following information:

| Item | Description |
| :--- | :---------- |
| Tenant ID | Unique identifier for your Microsoft Entra ID tenant |
| Tenant Name | The name you assigned to your tenant |
| Primary Domain | The .onmicrosoft.com domain assigned to your tenant |

These details will be required for subsequent configuration steps.

## Next Steps

Once your tenant is created and provisioned, proceed to:
- [Azure Application Registration](./020_Azure%20Application%20Registration.md)
