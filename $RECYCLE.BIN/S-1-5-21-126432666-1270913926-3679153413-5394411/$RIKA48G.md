# Azure OIDC App Key Rotation

## Context

The password, aka client secret, associated with the OIDC Application created during [Global App Configuration](../../../000_Cell-Setup/000_Automation%20Prerequisites/040_TcX%20Cell%20Setup/AZURE/000_Setup%20Admin%20subscription/070_Configure%20global%20apps.md) needs annual rotation.

## Steps

The following steps need to be performed by one of the app registration owners configured during [Global App Configuration](../../../000_Cell-Setup/000_Automation%20Prerequisites/040_TcX%20Cell%20Setup/AZURE/000_Setup%20Admin%20subscription/070_Configure%20global%20apps.md).

### Add New Secret

1. Log into the Azure Portal
2. Open a Bash Cloud Shell
3. Run

    ```bash
    OIDC_APP_NAME="YOUR OIDC APP NAME"
    AZURE_CLIENT_ID=$(az ad app list --display-name $OIDC_APP_NAME --query "[0].appId" --output tsv)
    AZURE_CLIENT_SECRET=$(az ad app credential reset --id $AZURE_CLIENT_ID --append --display-name "oidc-app-secret" --query "password" --output tsv)
    echo $AZURE_CLIENT_SECRET
    ```

4. Store the output `password`, aka `AZURE_CLIENT_SECRET`, in a secured place.

### Update the OIDC Auth configuration in HashiCorp Vault

5. Download the Vault CLI as a binary

    ```bash
    curl https://releases.hashicorp.com/vault/1.18.5/vault_1.18.5_linux_amd64.zip -o vault_cli.zip
    unzip vault_cli.zip
    export PATH=$PATH:$(pwd)
    ```

6. Set variables matching your environment

    ```bash
    export VAULT_ADDR="YOUR VAULT URL"
    export VAULT_NAMESPACE="YOUR VAULT NAMESPACE"
    export VAULT_TOKEN="YOUR VAULT TOKEN"

    OIDC_AUTH_PATH="YOUR OIDC AUTH PATH"
    AZURE_TENANT_ID=$(az account show --query tenantId --output tsv)
    ```

7. Update the OIDC Auth configuration

    ```bash
    vault write auth/$OIDC_AUTH_PATH/config \
        oidc_client_id="$AZURE_CLIENT_ID" \
        oidc_client_secret="$AZURE_CLIENT_SECRET" \
        oidc_discovery_url="https://login.microsoftonline.com/$AZURE_TENANT_ID/v2.0" \
        bound_issuer="https://login.microsoftonline.com/$AZURE_TENANT_ID/v2.0"
    ```
