# Azure Root Service Principal Key Rotation

## Context

The password, aka client secret, associated with the Root SP created during [Cell Setup](../../../000_Cell-Setup/000_Automation%20Prerequisites/040_TcX%20Cell%20Setup/AZURE/040_Setup%20Cell%20Subscription/060_Configure%20Service%20Principals%20for%20the%20pipeline.md) needs annual rotation.

## Steps

The following steps need to be performed by one of the app registration owners configured during [Cell Setup](../../../000_Cell-Setup/000_Automation%20Prerequisites/040_TcX%20Cell%20Setup/AZURE/040_Setup%20Cell%20Subscription/060_Configure%20Service%20Principals%20for%20the%20pipeline.md).

### Add New Secret

1. Log into the Azure Portal
2. Open a Bash Cloud Shell
3. Run

    ```bash
    AZURE_SUBSCRIPTION_ID="YOUR AZURE CELL SUBSCRIPTION ID"
    ROOT_SP="tcx-cell-${AZURE_SUBSCRIPTION_ID:0:3}-root-sp"
    AZURE_CLIENT_ID=$(az ad app list --display-name $ROOT_SP --query "[0].appId" --output tsv)
    AZURE_CLIENT_SECRET=$(az ad app credential reset --id $AZURE_CLIENT_ID --append --display-name "root-sp-secret" --query "password" --output tsv)
    echo $AZURE_CLIENT_SECRET
    ```

4. Store the output `password`, aka `AZURE_CLIENT_SECRET`, in a secured place.

### Update Azure Secrets Engine in HashiCorp Vault

5. Download the Vault CLI as a binary

    ```bash
    curl https://releases.hashicorp.com/vault/1.18.5/vault_1.18.5_linux_amd64.zip -o vault_cli.zip
    unzip vault_cli.zip
    export PATH=$PATH:$(pwd)
    ```

6. Set variables with values matching your Cell subscription

    ```bash
    export VAULT_ADDR="YOUR VAULT URL"
    export VAULT_NAMESPACE="YOUR VAULT NAMESPACE"
    export VAULT_TOKEN="YOUR VAULT TOKEN"

    SECRETS_ENGINE_PATH="azure-${AZURE_SUBSCRIPTION_ID:0:3}"
    AZURE_TENANT_ID=$(az account show --query tenantId --output tsv)
    ```

7. Update the Azure secrets engine configuration

    ```bash
    vault write $SECRETS_ENGINE_PATH/config \
        client_id=$AZURE_CLIENT_ID \
        client_secret=$AZURE_CLIENT_SECRET \
        tenant_id=$AZURE_TENANT_ID \
        subscription_id=$AZURE_SUBSCRIPTION_ID
    ```

8. Validate the updated configuration

    ```bash
    BOOTSTRAP_SP_NAME="tcx-cell-${AZURE_SUBSCRIPTION_ID:0:3}-bootstrap-service-principal"
    vault read $SECRETS_ENGINE_PATH/creds/$BOOTSTRAP_SP_NAME
    ```

9. Update the Root SP secret in Vault

   Update new version of SP credentials `AZURE_CLIENT_ID`, `AZURE_CLIENT_SECRET` in vault under the secret engine named `secret`:

   ![Image](./image_506.png)
   
       
   
       Update the values as `client_id` and `client_secret` at path `cell/<cell-id>/creds/<root-sp-name>`:

    ![Image](./image_507.png)