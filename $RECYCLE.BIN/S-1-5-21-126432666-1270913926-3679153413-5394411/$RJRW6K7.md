## Test Data Creation in Production Environment

This guide explains how to export and import test data from the production environment into a replica (development, testing, or training) deployment as part of a partial replica setup.

---

### 1. Overview

In a partial replica setup, only the test data is transferred from the source (production) deployment to the replica. This approach ensures that the replica mirrors the production configuration without exposing live production data, making it ideal for training, development, or testing purposes.

---

### 2. Guidelines for Test Data Creation

- **User Group Requirement:**  
  Test data must be created by users belonging to the 'Test' group.

- **Separate Test Folder:**  
  All test data intended for export must reside in a dedicated folder. This ensures that only the designated test content is copied to the replica environment.

---

### 3. Example

For instance, a user in the 'Test' group can create a folder named `TestDataFolder` to store all relevant test data:

![Image](./image_332.png)

> **Note:** All test data should be created in a unique folder to avoid any mix-up with production data.

---

### 4. Prerequisites

Before proceeding with the test data export/import process, ensure that you have followed the steps outlined in the [Pre-Requisites and Assumptions](../../000_Cell-Setup/000_Automation%20Prerequisites/070_Tools%20Setup/030_Ansible%20Tower.md#pre-requisites-and-assumptions) section. This setup is necessary to ensure that the workflow and job templates required for creating the replica environment are configured in Ansible Tower.
