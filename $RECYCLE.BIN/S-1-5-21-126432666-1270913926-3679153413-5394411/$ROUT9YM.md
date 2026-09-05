## Post Replica Deployment

After the replica creation pipeline completes successfully, perform the following post deployment operations to ensure your clone environment is fully configured and secure:

1. **Post Deployment Operations:**  
   Follow the [Post Deploy Operations](../../010_Tenant%20Onboarding/030_Post%20Deploy%20Operations/000_Create%20Admin%20License%20Server.md) section for all required tasks in the replica environment.

2. **Dispatcher Installation:**  
   If your environment includes a Dispatcher, complete the installation steps as outlined in the [Teamcenter Dispatcher and Translators](../../010_Tenant%20Onboarding/040_Teamcenter%20Dispatcher%20and%20Translators/000_Requirements.md) documentation.

3. **Password Management:**  
   The replica environment initially uses some of the same passwords as the production environment. Affected credentials include:
   - dc server
   - infodba user
   - tcxadmin user
   - cmdpred_dbpassword
   - tcservermanager_dbpassword
   - ldap password

   Refer to the table [Secrets Table](../110_Hashicorp%20Vault%20access%20for%20operator%20users/060_Secrets%20Table.md) for fetching paths of above secrets in the Hashicorp Vault.

   **Recommendation:** Update these passwords post deployment. For instructions on password rotation, refer to the [Day N Password Rotation](../050_Password%20Maintenance/020_On_Demand_Update/040_Day%20N%20Password%20Rotation/000_Intro.md) section and follow the Teamcenter cookbooks for the detailed procedures.

4. **Day N Operations:**  
   Manage the replica environment like any other production deployment for all subsequent Day N operations.

**NOTE:** Once the replica environment is created, it must be treated with the same operational protocols as any other live deployment.
