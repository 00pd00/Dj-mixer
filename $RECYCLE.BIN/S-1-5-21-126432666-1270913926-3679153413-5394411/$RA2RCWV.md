
##### Configure Global Apps

###### Create the AWS Interop Application
**NOTE**: This step needs to be done only once per stream setup (Dev/Dryrun/Customer).

The AWS Interop App can be reused across Cells to authenticate against AWS using Entra/Azure credentials.

1. Create the App Registration:

    ```bash
    ./4_create_aws_interop_app.sh $AZ_AWS_INTEROP_APP $APPLICATION_REGISTRATION_URL_ID "owner1@splm.siemens.com" "owner2@splm.siemens.com"
    ```

2. Configure OIDC federation in the AWS account as documented in the section [Configure AWS](https://aws.amazon.com/blogs/security/how-to-access-aws-resources-from-microsoft-entra-id-tenants-using-aws-security-token-service).
**Important:** Only configure the `aud-constraint` using `$APPLICATION_REGISTRATION_URL_ID`, do not configure the `sub-constraint`.

###### Create the OIDC Application

The OIDC App can be reused across instances of HashiCorp Vault to authenticate using Entra/Azure credentials.

1. Create the singleton App Registration and store the output credentials in a secure place (password manager):

    ```bash
    ./5_create_oidc_app.sh $OIDC_APP_NAME "owner1@example.com" "owner2@example.com"
    ```

2. Note the `OIDC_APP_ID` and `OIDC_CLIENT_SECRET` and set them as environment variables:

    ```bash
    export OIDC_APP_ID=<OIDC_APP_ID from script output>
    export OIDC_CLIENT_SECRET=<OIDC_CLIENT_SECRET from script output>
    ```

3. Configure the OIDC Auth method for your Vault instance:

    ```bash
    ./5_configure_oidc_authentication.sh $OIDC_APP_ID $OIDC_CLIENT_SECRET $TENANT_ID $VAULT_ENTITY_NAME $OIDC_AUTH_PATH
    ```
