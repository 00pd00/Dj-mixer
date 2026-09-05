## Create and Setup Partial Replica Environment with Admin Configurations and Test Data

This document outlines how to create a partial replica environment from your production system using selective data export/import. This replica mirrors the production configuration while importing test data suited for training, development, and testing purposes.

> **NOTE:**  
> - Partial clone is not supported for TcX on Azure environments .
> - Replica functionality is not supported for cTcX Essentials.  
> - Cloning a partial cloned environment is not supported.  
> - For AWS, the replica partial clone can be created in the same or a different AWS account than the production deployment. For example, if the production environment resides in AWS account A, the partial replica can be created in AWS account A or AWS account B.
---

### 1. Overview

cTcX enables you to create a partial replica environment by:
- Copying the production configuration (admin configurations such as stylesheets, organization settings, preferences, etc.).
- Exporting and importing test data (from a specific Test Group located in a designated Teamcenter folder) instead of live production data.

This approach ensures that the replica provides the necessary data for non-production activities while preserving the integrity and security of production data.

---

### 2. Environment Details and Workflow

1. **Fresh Replica Environment:**  
   - A new environment is created with the same production install configuration.

2. **Admin Configuration Export/Import:**  
   - Export configuration data (e.g., stylesheets, organization settings, preferences) from the production environment.
   - Import these settings into the replica to maintain consistency with your production setup.

3. **Test Data Export/Import:**  
   - Export test data that belongs to the designated Test Group from the specified Teamcenter folder in production.
   - Import this test data into the replica.  
   *Note:* This data is test data only and does not contain any live production information.

---

### 3. Steps to Create the Partial Replica

1. **Initiate Replica Creation:**  
   Start the process to create a new replica environment with the same baseline configuration as your production environment.

2. **Export Production Data:**  
   - **Admin Configurations:** Export necessary configuration files including stylesheets, organization settings, and preferences.  
   - **Test Data:** Export test data from the specific Teamcenter folder associated with the Test Group.

3. **Import into Replica Environment:**  
   - Create a fresh replica instance.
   - Import the exported administrative and test data into the new environment.

4. **Verification and Finalization:**  
   - Verify that the imported configuration data matches the production settings.  
   - Confirm that the test data is correctly imported and that it remains isolated from live production data.
   - Complete any additional post-deployment steps as required.
