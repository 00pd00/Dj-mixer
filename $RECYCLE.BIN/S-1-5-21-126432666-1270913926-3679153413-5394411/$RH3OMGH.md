
**Note:** These variables are meant to be added ONLY for `dev` environments and NOT `uat/prod/pre-prod`.

### Variables for Wildcard Certificate- Dev Only

##### Update the Cell File

Add the following variable to the Cell file.

| **No.** | **Key** | **Value** |
|---------|-------------|-----|
| 1 | GLBL_AZ_APP_GATEWAY_WILDCARD_CERT | "true" |

##### Update the Cloud File

Add the following variables to the cloud file:

| **No.** | **Key** | **Value** |
|---------|-------------|-----|
| 1 | GLBL_ADMIN_KEY_VAULT_NAME | "tcx-admin-0002-888-kv" |
| 2 | GLBL_ADMIN_WILDCARD_CERT_NAME | "tcx-admin-0002-888-wildcard-ssl-cert" |
