# Prerequisites for Transition

## Set Up New TCX Environment

This guide provides clear instructions for setting up a new Teamcenter X (TCX) environment. Follow these steps to ensure all required features and packages are properly installed. 

### Mandatory Prerequisites

- Data migration must be performed for only one tenant at a time. Concurrent migration of multiple tenants is not supported
- All packages from **Teamcenter Essentials** must be available in the target environment (Teamcenter X Standard, Advanced, or Premium).
- Install and set up the **Rich Application Client (RAC)**.
- Obtain access to **ArgoCD** for restarting TCX processes.
- Acquire access to the **DSS Vault** in order to copy the vault.
- Secure access to **Datadog** for checking log files.

### Creating a Basic BOM Structure

- In **TCX Essentials**, create a simple Bill of Materials (BOM) structure.
  - Use one standard part, preferably an out-of-the-box infodba-owned part with an attached dataset.

### Setting Up a New Teamcenter X Environment

1. Create a new Teamcenter X environment using **Tenant Teamcenter X Essentials ECA**.
2. Check that the current Tenant Teamcenter X Essentials ECA is entitled with the correct SKUs for the transition environment.
3. Update the input file for the transition environment with the ECA and Tenant ID of Teamcenter X Essentials.

   - **Note:** You can retrieve the existing ECA and Tenant ID from "License Insight Operations".

## Setting Up the SAM Operating account polices
To transfer the DSS vault from Teamcenter X Essentials environment to higher tier environment, the following operations needs to be run and it requires account level policies to be configured.

***Source SAM operating account***
- CloneVault
- GetCloneVaultStatus
- ShareVault

***Target SAM operating account***
- TransferVaultOwnership

### Steps to obtain Policies:
Raise a [FDS ticket](https://fdsone.atlassian.net/servicedesk/customer/portal/29) to attach the required policies to the SAM operating accounts.

### Screenshot of the FDS request:
  ![alt text](image-5.png)
  ![alt text](image-6.png)
  ![alt text](image-7.png)

 [Sample FDS request](https://fdsone.atlassian.net/servicedesk/customer/portal/29/FDSPRR-5279?created=true) for reference.