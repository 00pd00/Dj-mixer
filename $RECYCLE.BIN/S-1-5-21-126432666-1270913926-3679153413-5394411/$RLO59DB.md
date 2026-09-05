## Rotating expired vault credentials in Ansible

Ansible templates use the 'XCR Vault login token' credentials to connect with Vault and store secrets. This credential is valid for 30 days and requires periodic updates. Follow the steps below to update it.

> **Note:** You need Admin access to Vault's Root namespace: `tcx-development_ns/storm_playground/` to perform the steps below.

### Prerequisites
1. Install the Vault CLI on your developer machine. (Refer to Section [Install Vault CLI (One-Time Activity)](../../../Documentation/Operations/Hashicorp%20Vault%20access%20for%20operator%20users/Generate%20Secrets%20Vault%20token#install-vault-cli-one-time-activity))
2. Set the following environment variables to log in:
    ```bash
    export VAULT_ADDR=https://vault.xcr.gblsvcs01eu.prod.eu-central-1.kaas.sws.siemens.com
    export VAULT_NAMESPACE=tcx-development_ns/storm_playground/
    export VAULT_TOKEN=<Your Token Copied from Vault UI>
    ```
3. Run the following command to generate a token with the policy `vp-runtime-sa-ansible`:
    ```bash
    vault token create -policy=vp-runtime-sa-ansible -period=768h -orphan=true
    ```
4. Create a new version of the key: `secret/tcx/saansible` with the new Vault token value.
5. Run the following command to generate a token with the policy `vp-runtime-ansible-tower-trigger`:
    ```bash
    vault token create -policy=vp-runtime-ansible-tower-trigger -period=768h -orphan=true
    ```
6. Update the Ansible Tower vault credential `ansible-trigger-xcr-vault-token` with the new token value in the **TOKEN** field.  
    [*(Navigate to Ansible Tower | EDIT CREDENTIAL (teamcenter.com))*](https://ansible-dev.cloud.teamcenter.com/#/credentials/82/details)

### Verification
- Test the new configuration with a pipeline run to ensure the updated credentials are working as expected.
