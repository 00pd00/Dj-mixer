##### Setup Execution Environment

1. Open a Bash Cloud Shell in Azure. Upload `scripts.zip`.

    ![Image](./image_84.png)

2. Unzip the Scripts and make them executable

    ```bash
    tar -xzvf scripts.tar.gz
    dos2unix scripts/*.sh
    chmod +x scripts/*.sh
    cd scripts
    ```

3. Set input variables as environment variables
    Run the following commands:

    ```bash
    source ./0_admin_env_vars.sh
    ```

4. Set the Subscription
    Run the command:  

    ```bash
    az account set --subscription $AZURE_SUBSCRIPTION_ID
    ```

   **Note:** If you encounter the error `Subscription does not exist in cloud AzureCloud`, restart your terminal.

5. Download the Vault CLI as a binary

    ```bash
    curl https://releases.hashicorp.com/vault/1.18.5/vault_1.18.5_linux_amd64.zip -o vault_cli.zip
    unzip vault_cli.zip
    export PATH=$PATH:$(pwd)
    ```

6. Validate your access to vault

    ```bash
    vault token lookup $VAULT_TOKEN
    ```
