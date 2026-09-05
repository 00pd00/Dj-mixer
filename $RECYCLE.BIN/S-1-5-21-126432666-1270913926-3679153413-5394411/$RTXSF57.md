#### Enable AWS CI Role Auth method in Vault

In the root namespace of Vault, enable the AWS secret engine and configure it to assume the CI role of the tenant AWS account.  
Vault CLI can be installed from [Vault CLI Installation](https://developer.hashicorp.com/vault/docs/v1.14.x/install).  

From CLI, log in to the Vault namespace mentioned in the pipeline.  
Also, set the following variables based on your environment before executing the command:

**Prod and DryRun** Environment

```bash
export VAULT_ADDR=https://vault.xcr.gblsvcs01eu.prod.eu-central-1.kaas.sws.siemens.com
export VAULT_NAMESPACE=<replace with namespace Example. caps-tcx-production_ns>/ # Namespace mentioned in tcx-pipeline-tenant
export VAULT_TOKEN=<get this token from Vault UI>
```

**Dev** Environment

```bash
export VAULT_ADDR=https://vaultent.emea1.co.sws.siemens.com/
export VAULT_NAMESPACE=<replace with namespace Example. caps-tcx-production_ns>/ # Namespace mentioned in tcx-pipeline-tenant
export VAULT_TOKEN=<get this token from Vault UI>
```

Creates or updates an AWS role configuration in HashiCorp Vault, allowing Vault to assume an IAM role from AWS when generating dynamic credentials.

```bash
vault write aws/roles/<CIRoleNameToAssume> \     role_arns=arn:aws:iam::<tcxtenantAWSaccount>:role/<CIRoleNameToAssume> \     credential_type=assumed_role
```

Note:  **CIRoleNameToAssume** : `tcx-container-deploy-ops-CIRole-<TcX Tenant Administrative Account Id>`