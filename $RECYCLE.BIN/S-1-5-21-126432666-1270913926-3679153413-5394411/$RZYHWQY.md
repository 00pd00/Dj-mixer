## Read secrets from vault

Note: Make sure to generate token mentioned in [Generate Vault Token](Generate%20Secrets%20Vault%20token)

`<secret_key>`: key of the secret you want to find

To get `<secret_path>` from `<secret_key>` refer below [Secrets Table](Secrets%20Table) 
​​
```
set VAULT_NAMESPACE=< Tenant Env Namespace>  
C:\apps\vault.exe kv get -mount=secret -field=<secret_key> <secret_path>  
```
​​
