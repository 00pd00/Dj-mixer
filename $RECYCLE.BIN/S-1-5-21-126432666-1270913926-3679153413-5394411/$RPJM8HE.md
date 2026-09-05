## Pre-requisites

### General pre-requisites

1. RDS version of the essentials environment is upgraded to 15.x following the steps from the cookbook **[cTcX_Aurora_PostgreSQL_Upgrade](https://mypolarion.industrysoftware.automation.siemens.com/polarion/#/project/Teamcenter/wiki/TCX%20Maintenance%20Documentation/cTcX_Aurora_PostgreSQL_Upgrade_v1)**.
2. Personalization package, if available, is upgraded through BMIDE and made available following the section [Applying Personlization](../../020_Applying%20Personalization/000_Applying%20Personalization.md)  
   > **Note:**
   > For update or upgrade use cases, the personalization package version must be higher than the version already deployed in the existing environment.
3. LCS has handed off the target, i.e., `TCX-2412`.
4. Check if all the software is in the installed/upgrade state before running the upgrade, refer to **[Check DC software status](./040_Check%20DC%20software%20status.md)**.
5. **Important**: For upgrading environments with version lower than 2412.0007:
   
   The tenant bucket (`tcx-tenantbucket-<region>-<tenant id>`) must be empty before triggering the upgrade pipeline
   - Example: If upgrading from version 2412.0006, ensure your tenant bucket is empty first
  
