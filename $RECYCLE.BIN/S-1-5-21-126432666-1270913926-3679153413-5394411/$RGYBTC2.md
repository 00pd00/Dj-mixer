## Create and Setup Full Clone Replica Environment with FMS Volume and Database
This document explains how to create and set up a full clone replica environment that includes both the database and FMS volume.

**Note : Full Clone replica is not supported for 2606 TcX on Azure . It is supported with 2512 TcX baselines.**
---
### 1. Overview and Use Cases
A full clone replica (clone environment) with an integrated database and volume is essential for various scenarios, including:
- **Issue Resolution:**    Identify and resolve production issues that only manifest in a live environment.  
- **Migration Validation:**    Perform tests to validate the migration process with a dataset that mirrors production.  
- **Demo:**    Present a near-live server environment for stakeholder demonstrations without affecting production.
- **Training:**    Deliver training sessions using real production data for a limited group without impacting the live system.

cTcX provides the capability to create this replica environment with a complete copy of production data, ensuring that business-critical scenarios can be tested safely.

---
### 2. Pre-Clone Activities(Optional)
**This activity is required for scenarios where additional softwares are used and source environment is a migrated environment**
- Navigate to Tenant Repo of the source CTCX Environment:   `<TENANTID>`-`<ENVIRONMENT>`/customer-information/tenant.yml
  - `<TENANTID>`  ---- Tenant Id of a Customer
  - `<ENVIRONMENT>`  -----  Environment of customer
- Update the common tenant bucket Name in ```GLBL_ADDITIONAL_SOFTWARE:``` with the following names for respective releases.
  - Format : in 2412.0001 release : **tcx-tenantbucket-`<REGION>`-`<TENANTID>`**
  - Format: next releases from 2412.0007 onwards : **tcx-tenantbucket-`<REGION>`-`<TENANTID>`-`<SOURCE_AWS_ACCOUNT_ID>`**
- Copy the bmide ( additional software kits ) packages to the common tenant bucket location to be in sync with location mentioned in ```GLBL_ADDITIONAL_SOFTWARE:```
- Upload additional software kits to the Tenant common bucket before triggering Replica using below steps

---
#### File Upload Process for BMIDE Packages
- Navigate to Kits Directory

```bash
cd /siemens/kits
``` 
- Upload Command Syntax
- For Linux DC Machines:
```bash
    /usr/local/bin/aws s3 cp <local_package_path> s3://<tenant_bucket>/<target_s3_path>
```

- For Windows Machines:
```bash
    aws s3 cp <local_package_path> s3://<tenant_bucket>/<target_s3_path>
```



---
### 3. Key Details of the Replica Environment
The full clone replica environment is created through the following processes:
1. **Backup and Restore of Production database and Volume:**  
  - Capture the backup of your production database and associated FMS volumes.   
  - Restore these backups into the replica environment.
2. **Backup and Restore of LDAP Users:**   
  - Export the LDAP user from production.   
  - Import this user to ensure that authentication and authorization settings are consistent.
3. **Deployment Using DC:**  
  - Utilize Deployment Center (DC) to deploy the replica environment.
  - The deployment leverages the restored database and volume without the need for additional provisioning.
4. **Cloning of Products and Personalization Packages:**   
  - All products and personalization packages from production will be cloned into the replica environment.
  
---

### 4. Notes

Replica full clone of an existing full clone environment is supported.

For AWS, the replica full clone can be created in the same or a different AWS account than the production deployment. For example, if the production environment resides in AWS account A, the replica can be created in AWS account A or AWS account B. <!-- For Azure, however, the replica environment is only supported within the same Azure subscription as the production deployment. For instance, if the production environment resides in Azure subscription A, the replica must also be created in Azure subscription A. -->
 