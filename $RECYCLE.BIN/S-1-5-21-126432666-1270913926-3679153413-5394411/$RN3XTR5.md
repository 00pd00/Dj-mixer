##### Configure Service Principals for the pipeline

**Note**:Ensure Application Developer role is [active in PIM](../../../../../../CTCX-Intro/010_Containerized%20TcX%20Architecture%20Overview/020_AZURE/030_Activating%20Roles%20and%20Groups%20via%20PIM.md)

###### 1. Create Root Service Principal

The Azure pipeline utilizes the Azure Secrets Engine to generate dynamic credentials for pipeline execution. The Azure Secrets Engine requires a privileged Service Principal (Root SP) to function properly.

1. Navigate to the `scripts` folder:

    ```bash
    cd scripts
    ```

2. Execute `1_create_hcv_root_sp.sh`. Note : Adapt the owners' addresses according to your organization.

    ```bash
    # Create Root SP
    ROOT_SP="tcx-cell-${AZURE_SUBSCRIPTION_ID:0:3}-root-sp"
    ./1_create_hcv_root_sp.sh $ROOT_SP "owner1@splm.siemens.com" "owner2@splm.siemens.com"
    ```

3. Store the output SP credentials `AZURE_CLIENT_ID`, `AZURE_CLIENT_SECRET` in vault under the secret engine named `secret`:

    ![Image](./image_148.png)

    Add the above values as `client_id` and `client_secret` at path `cell/<cell-id>/creds/<root-sp-name>`:

    ![Image](./image_147.png)

4. Submit a request for the MS Graph API Permission `Application.ReadWrite.OwnedBy` in [SNOW Incident](https://diswsiemens.service-now.com/sp?id=sc_cat_item&table=sc_cat_item&sys_id=50be0241c3f72a901b27bc33e40131d1&recordUrl=com.glideapp.servicecatalog_cat_item_view.do%3Fv%3D1&sysparm_id=50be0241c3f72a901b27bc33e40131d1) using the template below:

    ```text
    **Please select your request type:** Request for Admin Consent
    **Description:**  
    Please forward this to the DI SW Enterprise Foundation (ad_admins.sisw@siemens.com) team . 
    <Team_name> is submitting this request to obtain admin consent for the MS Graph API Permission `Application.ReadWrite.OwnedBy` to Service Principal `<name of the Root Service Principal mentioned in the output of 1_create_hcv_root_sp.sh>`.  
    The subscription ID: `<Subscription on which Root Service Principal is getting created>`.
    Reason: <Team_name> needs to configure this Service Principal in Hashicorp Vault for Azure integration. This setup will allow the pipeline to generate short-lived credentials, which are used to securely deploy resources within the specified subscription.
    ```

5. Send an email to the Administration Subscription owner to grant RBAC access on the subscription to the Root SP. This is required so that the Root SP can grant other roles to the SP created for the pipeline later.

    - **Dev deployments**: `tc.azure.deployops.architects.disw@siemens.com`
    - **Prod/PreProd deployments**: `caps-platformautomation.sisw@siemens.com`

    ```text
    **Subject**: RBAC Admin Role Assignment Request - <cell-id> Environment Onboarding  
    **Description**:  
    
        ---------------
        Environment: <dev/prod/preprod>
        Cell ID: <cell-id>
        Team Name: <team_name>
        Root Service Principal: <root-sp name>
        Subscription: <subscription name>
        Administrative Subscription : <admin subscription id>
        
        Business Justification:
        ---------------------
        Purpose: Environment Onboarding
        Detailed Reason: <details of why you are setting up this env>
        
        Additional Information:
        --------------------
        - Access Level Requested: RBAC Admin
        - Access Duration: <specify if temporary or permanent>
    ```

6. Download the extended `0_cell_env_vars.sh` and `0_cloud_env_vars.sh` from your Cloud Shell for later use:

    ![Image](./image_89.png)

###### 2. Configure the Azure Secrets Engine

**Note**: Perform this step only after Graph API access for Root SP has been approved by IT. You need to again perform the step [Setup execution environment](./024_Setup%20execution%20environment.md) at this point. Use the backed-up scripts from above section [Create the Root SP](#1-create-root-service-principal) instead of the default ones from the `scripts` folder.

1. Set the environment variables saved securely while creating RootSP:

    ```bash
    AZURE_CLIENT_ID="<saved azure client id>"
    AZURE_CLIENT_SECRET="<saved azure client secret>"
    ```
2. Navigate to the `scripts` folder:

    ```bash
    cd scripts
    ```
3. Configure the Azure Secrets Engine with the Root SP:

    ```bash
    SECRETS_ENGINE_PATH="azure-${AZURE_SUBSCRIPTION_ID:0:3}"
    BOOTSTRAP_SP_NAME="tcx-cell-${AZURE_SUBSCRIPTION_ID:0:3}-bootstrap-service-principal"
    ./3_enable_azure_secrets_engine.sh $AZURE_CLIENT_ID $AZURE_CLIENT_SECRET $AZURE_SUBSCRIPTION_ID $AZURE_TENANT_ID $SECRETS_ENGINE_PATH
    echo "export SECRETS_ENGINE_PATH='$SECRETS_ENGINE_PATH'" >> ./0_cell_env_vars.sh
    echo "export BOOTSTRAP_SP_NAME='$BOOTSTRAP_SP_NAME'" >> ./0_cell_env_vars.sh
    ```

4. Validate the successful configuration:

    ```bash
    vault read $SECRETS_ENGINE_PATH/config
    ```

###### 3. Create AWS Service Principal

**Note**: Perform this step only after Graph API access for Root SP has been approved by IT. You need to again perform the step [Setup execution environment](./024_Setup%20execution%20environment.md) at this point. Use the backed-up scripts from section [Create the Root SP](#1-create-root-service-principal) instead of the default ones from the `scripts` folder.

The Azure pipeline utilizes this SP to communicate with AWS components.
1. Navigate to the `scripts` folder:

    ```bash
    cd scripts
    ```
2. Set the environment variables saved securely while creating RootSP:

    ```bash
    AZURE_CLIENT_ID="<saved azure client id>"
    AZURE_CLIENT_SECRET="<saved azure client secret>"
    OWNER_SPLM_EMAIL_1="<owner1@splm.siemens.com>"
    OWNER_SPLM_EMAIL_2="<owner2@splm.siemens.com>"
    ```

3. Execute `4_create_aws_service_principal.sh`.

    ```bash
    # Create AWS SP
    AZ_AWS_INTEROP_SP="tcx-cell-${AZURE_SUBSCRIPTION_ID:0:3}-aws-interop-sp"
    ./4_create_aws_service_principal.sh $AZURE_CLIENT_ID $AZURE_CLIENT_SECRET $AZURE_TENANT_ID $AZ_AWS_INTEROP_APP $AZ_AWS_INTEROP_SP $SECRETS_ENGINE_PATH $OWNER_SPLM_EMAIL_1 $OWNER_SPLM_EMAIL_2
    echo "export AZ_AWS_INTEROP_CREDS='$AZ_AWS_INTEROP_SP'" >> ./0_cloud_env_vars.sh
    ```

4. Submit a request for Custom API permission `AssumeRoleWithWebIdentity` in [SNOW Incident](https://diswsiemens.service-now.com/sp?id=sc_cat_item&table=sc_cat_item&sys_id=50be0241c3f72a901b27bc33e40131d1&recordUrl=com.glideapp.servicecatalog_cat_item_view.do%3Fv%3D1&sysparm_id=50be0241c3f72a901b27bc33e40131d1) using the template below:

    ```text
    **Please select your request type:** Request for Admin Consent 
    **Description:**  
    Please forward this to the DI SW Enterprise Foundation (ad_admins.sisw@siemens.com) team . 
    <Team_name> is submitting this request for admin consent for the Custom API permission `AssumeRoleWithWebIdentity` to Service Principal <AZ_AWS_INTEROP_SP >.  
    The subscription ID: <Subscription on which InterOp Service Principal is getting created>.
    Reason: <Team_name> requires a Service Principal to enable communication with AWS accounts through the registered application <AZ_AWS_INTEROP_APP>. 
    To achieve this, the Service Principal (<AZ_AWS_INTEROP_SP>) must be granted permission to assume the role associated with the <AZ_AWS_INTEROP_APP> application.
    ```
