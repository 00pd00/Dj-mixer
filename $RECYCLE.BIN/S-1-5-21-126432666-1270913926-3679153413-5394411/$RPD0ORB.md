# Rotation of Client Secret:

**Responsibility - The Siemens CApS team should perform below steps to update Client Secret in Hashicorp Vault.**

To ensure proper security, it is important to rotate (change) passwords periodically. This section describes the steps to perform such a password change. All TcX passwords are now stored in Hashicorp Vault. To change one or more passwords, the admin will log into HCVault, navigate to the namespace for the deployment, and change the password to the desired hardened value.


## Follow same steps as mentioned in CTCX Docs > Operations > Password Maintenance > On_Demand_Update > Day N Password Rotation

1. Shutdown workload - run the shutdown workflow as documented in [Shutdown Workload](https://ctcx.code.siemens.io/cookbook/docs/Documentation/Operations/Password%20Maintenance/On_Demand_Update/Day%20N%20Password%20Rotation/Shutdown%20workload)

2. Log in to ArgoCD and verify that Indexer, DB Daemons, and Visualization components are not running.

3. Vault Password Update: 

    - Log in to the Vault.

    - Select the tenant namespace.
    
    - Navigate to the appropriate vault secret path to change the password.
  
  ![alt text](Hashicorp_Vault_path.png)

    - Edit the password and click **Save**. Your intended password is updated in the vault. 

    
4. Run Pipeline in Maintenance Mode to Apply Password Change - refer the documented flow as mentioned in [Run Pipeline in Maintenance Mode to Apply Password Change](https://ctcx.code.siemens.io/cookbook/docs/Documentation/Operations/Password%20Maintenance/On_Demand_Update/Day%20N%20Password%20Rotation/Run%20Pipeline%20in%20Maintenance%20Mode%20to%20Apply%20Password%20Change/)

5. Restart Workload - refer the documented flow as mentioned in [Restart Workload](https://ctcx.code.siemens.io/cookbook/docs/Documentation/Operations/Password%20Maintenance/On_Demand_Update/Day%20N%20Password%20Rotation/Restart%20Workload)


Note: Use the updated client secret in the Ansible job when triggering the pipeline, whether in Maintenance mode or for a new pipeline.
