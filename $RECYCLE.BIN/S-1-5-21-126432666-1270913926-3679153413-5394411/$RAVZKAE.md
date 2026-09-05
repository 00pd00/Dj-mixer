# UAT vs PROD Environment Separation

## Overview

It is **critical** that customers configure separate environments for UAT (User Acceptance Testing) and PROD (Production) to prevent any potential harm to production data. This separation must be implemented at both the Entra app registration level and the SharePoint Embedded container configuration level.

## Required Separation

### 1. Separate Entra App Registrations

Customers must create and configure **distinct Entra app registrations** for each environment:

- **UAT Environment**: Dedicated Entra app registration with its own Client ID, Client Secret, and permissions
- **PROD Environment**: Separate Entra app registration with its own Client ID, Client Secret, and permissions

This ensures that:
- Authentication tokens are scoped to the appropriate environment
- Access permissions cannot accidentally cross environments
- Auditing and monitoring can be tracked per environment

### 2. Separate Container Type IDs

Each environment must use a **different ContainerTypeID** in SharePoint Embedded:

- **UAT ContainerTypeID**: Used exclusively for UAT testing and development
- **PROD ContainerTypeID**: Used exclusively for production operations

This separation is essential because ContainerTypeIDs define the SharePoint Embedded storage instances where all documents and data are stored.

## Why This Matters

### Data Protection

Production data must be completely isolated from UAT operations. Without proper separation:

- **Risk of Data Loss**: In UAT environments, customers may perform destructive operations such as:
  - Deleting entire containers to test cleanup scenarios
  - Purging test data that could inadvertently affect shared storage
  - Testing failure scenarios that could corrupt data
  
- **Unsaved Edits**: If UAT and PROD share the same container infrastructure, operations like container deletion in UAT could result in:
  - Loss of in-progress edits from production users
  - Corruption of production document versions
  - Interruption of active production workflows

### Testing Freedom

Separate UAT environments allow teams to:
- Test disaster recovery scenarios safely
- Validate new configurations without risk
- Perform load and stress testing
- Simulate failure conditions
- Delete and recreate containers as needed for testing
