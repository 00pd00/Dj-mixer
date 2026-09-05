
##### Configure Pipeline Credential Management

###### Create a Root Service Principal

The Azure Secrets Engine requires a privileged Root Service Principal (Root SP) to function properly.

1. Execute `1_create_hcv_root_sp.sh`. 

    **Note** : Adapt the owners' addresses according to your organization.

    ```bash
    ./1_create_hcv_root_sp.sh "tcx-admin-${AZURE_SUBSCRIPTION_ID:0:3}-root-sp" "<<owner1@splm.siemens.com>>" "<<owner2@splm.siemens.com>>"
    ```
    
2. Store the output SP credentials `AZURE_CLIENT_ID`, `AZURE_CLIENT_SECRET` in vault under the secret engine named `secret`:

    ![Image](./image_148.png)

    Add the above values as `client_id` and `client_secret` at path `cell/<cell-id>/creds/<root-sp-name>` (example shown below):

    ![Image](./image_147.png)

3. Submit a request for the MS Graph API Permission `Application.ReadWrite.OwnedBy` in [SNOW Incident](https://diswsiemens.service-now.com/sp?id=sc_cat_item&table=sc_cat_item&sys_id=50be0241c3f72a901b27bc33e40131d1&recordUrl=com.glideapp.servicecatalog_cat_item_view.do%3Fv%3D1&sysparm_id=50be0241c3f72a901b27bc33e40131d1) using the template below: 

    ```text
    **Please select your request type:** Request for Admin Consent
    **Description:**  
    Please forward this to the DI SW Enterprise Foundation (ad_admins.sisw@siemens.com) team . 
    <Team_name> is submitting this request to obtain admin consent for the MS Graph API Permission `Application.ReadWrite.OwnedBy` to Service Principal `<name of the Root Service Principal mentioned in the output of 1_create_hcv_root_sp.sh>`.  
    The subscription ID: `<Subscription on which Root Service Principal is getting created>`.
    Reason: <Team_name> needs to configure this Service Principal in Hashicorp Vault for Azure integration. This setup will allow the pipeline to generate short-lived credentials, which are used to securely deploy resources within the specified subscription.
    ```

4. Download the extended `0_admin_env_vars.sh` from your Cloud Shell:

![Image](./image_83.png)

###### Configure the Azure Secrets Engine

**Note**: Perform this step only after Graph API access for Root SP has been approved by IT. You need to again perform the step [Setup execution environment](./030_Setup%20execution%20environment.md) at this point. Use the backed-up scripts from section [Create the Root SP](#create-root-service-principal) instead of the default ones from the `scripts` folder.


1. Set the environment variables saved securely while creating RootSP:

    ```bash
    export AZURE_CLIENT_ID="YOUR AZURE_CLIENT_ID"
    export AZURE_CLIENT_SECRET="YOUR AZURE_CLIENT_SECRET"
    ```

2. Initialize the Azure Secrets Engine with the Bootstrap SP:

    ```bash
    SECRETS_ENGINE_PATH="azure-admin-${AZURE_SUBSCRIPTION_ID:0:3}"
    BOOTSTRAP_SP_NAME="tcx-admin-${AZURE_SUBSCRIPTION_ID:0:3}-bootstrap-service-principal"
    ./3_enable_azure_secrets_engine.sh $AZURE_CLIENT_ID $AZURE_CLIENT_SECRET $AZURE_SUBSCRIPTION_ID $AZURE_TENANT_ID $SECRETS_ENGINE_PATH
    echo "export SECRETS_ENGINE_PATH='$SECRETS_ENGINE_PATH'" >> ./0_admin_env_vars.sh
    echo "export BOOTSTRAP_SP_NAME='$BOOTSTRAP_SP_NAME'" >> ./0_admin_env_vars.sh
    ```

3. Validate the successful configuration:

    ```bash
    vault read $SECRETS_ENGINE_PATH/config
    ```
