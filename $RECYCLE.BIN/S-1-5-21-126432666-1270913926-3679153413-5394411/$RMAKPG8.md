## Write secrets to vault

Note: Make sure to generate token mentioned in [Generate Vault Token](Generate%20Secrets%20Vault%20token)

`<secret_key>`: key of the secret you want to put.

`<secret_value>`: the value of the secret you want to put.

To get `<secret_path>` from `<secret_key>` refer below [Secrets Table](Secrets%20Table) 

```
set VAULT_NAMESPACE=< Tenant Env Namespace> 
C:\apps\vault.exe kv put -mount=secret <secret_path> <secret_key>=<secret_value>
```
