## Day N Password Rotation

To ensure proper security, it is important to rotate (change) passwords periodically. This section describes the steps to perform such a password change. All TcX passwords are now stored in Hashicorp Vault. To change one or more passwords, the admin will log into HCVault, navigate to the namespace for the deployment, and change the password to the desired hardened value.

> **Note:** 
> - For Password Maintenance activity, you will need to access the secrets vault. Refer to [Hashicorp Vault access for operator users](../../../110_Hashicorp%20Vault%20access%20for%20operator%20users/000_Hashicorp%20Vault%20access%20for%20operator%20users.md) to access the secrets vault.
> - The full containerized deployment, including hybrid components, must be complete before attempting password rotation.

