### Vault Organization Concepts

There are TWO SEPARATE Vault Servers:

- For Dev: [https://vaultent.emea1.co.sws.siemens.com/](https://vaultent.emea1.co.sws.siemens.com/ ).  
- For Prod: [https://vault.xcr.gblsvcs01eu.prod.eu-central-1.kaas.sws.siemens.com/](https://vault.xcr.gblsvcs01eu.prod.eu-central-1.kaas.sws.siemens.com/)

#### Namespaces

The Vault is organized as a hierarchy. root_namespace -> customer_namespace -> tenant_namespace

##### Root Namespaces:
- **Development**: `tcx-development_ns/storm_playground`  
- **Production**: `caps-tcx-production_ns`  
- **Dry-run**: `caps-tcx-nonproduction_ns`  

This namespace holds the authentication mounts, customer namespaces and a special namespace called `customer_inputs`. After initial setup the pipeline is responsible for namespace lifecycle.

In this cookbook, the `caps-tcx-production_ns` is used as an example to demonstrate the entire process. Replace the `caps-tcx-production_ns` value with your root namespace.

##### Customer Input Namespace

There is a special namespace that temporarily holds secrets for a customer early in the pipeline. The namespace is under the Authenticating Namespace and is called `customer_inputs`. These secrets come from the customer_input.json in the Ansible tower. Later the customer input namespace secret path is permanently deleted after adding to tenant namespace.

The pipeline will move initial tenant secrets from the customer input namespace (`caps-tcx-production_ns/customer_inputs`) to the tenant namespace. This step enables the KV secrets engine for this purpose.

#### Tokens
There are three types of tokens discussed in this cookbook. Please note that tokens, if stored, may not be stored in the clear! Individuals may use KeePass for their own secret storage
1. **ROOT TOKEN:** a high-power token used in cluster setup and at other selected times including backup and restore operations. The admin creates tokens with the following command:
```bash
vault token create -orphan=true -policy=admin_token_policy -namespace=caps-tcx-production_ns -period=24h
```
2. **CUSTOMER INPUTS TOKEN:** a token used to run the pipeline. The admin creates customer input tokens with the following command:
```bash
vault token create -orphan=true -policy=customer_input_token_policy -namespace=caps-tcx-production_ns/customer_inputs -period=168h
```
3. **USER TOKEN:** a token generated on the basis of cloud account roles, allowing access to specific tenant namespaces. Instructions can be found [Vault Operator Users](../../../020_Operations/110_Hashicorp%20Vault%20access%20for%20operator%20users/030_Generate%20Secrets%20Vault%20token.md)

Note: these instructions utilize the Vault UI as well as CLI. 

### Prepare to use Vault CLI
In order to use the Vault CLI, you must grab your token out of the UI.

1. Install Vault CLI (if not previously installed): [Vault CLI Installation](https://developer.hashicorp.com/vault/install).  
2. Set the following variables in the same path where the Vault CLI binary is present:
    ```bash
    export VAULT_ADDR="<Vault URL>" # Replace with actual value
    export VAULT_NAMESPACE="caps-tcx-production_ns"  # Replace with actual value
    export VAULT_TOKEN="xxxxxxxxxxxxxxxxxxxx"       # Copy Vault token from Vault console
    ```
    *(Note: Run the above commands without quotes)*  

3. Log in to XCR HashiCorp Vault using your token:
    ```bash
    vault login <TOKEN> -namespace=<ROOT_NAMESPACE>
    ```

### Create Customer Input Namespace & Enable a Secrets Engine

1. Log in to the Vault in your root namespace (`caps-tcx-production_ns`). 
2. Create a new namespace called `customer_inputs` 
2. Navigate to the new namespace (`caps-tcx-production_ns/customer_inputs`).  
3. Click on the **Secret Engines** menu and select **Enable new engine**.  
4. Choose **KV**.  
5. Set the path to `secret` and click on **Enable Engine**.  
6. Click **Save** to finish the setup.  

![Image](./image_111.png)

Values entered into the customer input JSON on Ansible Tower will be pushed to the customer input namespace in the secret path `tcx/<tenantID>/<EnvironmentType>`.

![Image](./image_112.png)

Below two pipeline variables as mentioned in tcx-pipeline-variables project. "GLBL_VAULT_CUSTOMER_INPUT_NAMESPACE" is the customer input namespace and "GLBL_VAULT_CUSTOMER_INPUT_SECRET_PATH" is the path where customer input secrets are stored.

GLBL_VAULT_CUSTOMER_INPUT_NAMESPACE: `"caps-tcx-production_ns/customer_inputs"` GLBL_VAULT_CUSTOMER_INPUT_SECRET_PATH: `"tcx/${TENANT_ID}/${GLBL_TENANT_ENV}"`

When destroy pipeline triggered if incase secrets are present in customer input namespace, the destroy pipeline will delete the secret path `"tcx/<tenantID>/<EnvironemntType>"` else ignore in pipeline.


### Enable token generation 

1. Open the vault CLI.
- Click the icon highlighted in yellow.

![alt text](image.png)

2. Execute the command in the CLI.
- Use the same VAULT_NAMESPACE as previously used.

 1. Root token generation policy

```bash
vault policy write -namespace=caps-tcx-production_ns admin_token_policy - <<EOF
path "/*"
{
 capabilities = ["create", "read", "update", "delete", "list", "sudo"]
}
EOF
```
 2. Customer inputs token generation policy
```bash
vault policy write -namespace=caps-tcx-production_ns/customer_inputs customer_input_token_policy - <<EOF
path "secret/*" {
  capabilities = ["create", "update", "list", "read"]
}
EOF
```
3. Go to **Policies**, click on **ACL Policies**, and check if the policies are created.

![alt text](image-1.png)



### Configure Vault for other tools

#### Integration with GitLab

Gitlab CI pipeline makes use of Vault to store and retrieve credentials. Also, Gitlab CI is using Vault to generate dynamic temporary AWS Credentials. Tenant secrets are stored in Tenant specific namespaces, which are created and configured by Gitlab CI pipeline. There is a minimum setup required for Gitlab CI pipeline to make use of Vault for above mentioned use-cases. In this section, we will go through the steps required to enable Gitlab CI to make use of XCR Vault.

##### JWT Method
The Gitlab runner will use its jwt to authenticated to the Vault. Here we enable the authentication method for that purpose.

The method will be enabled at the root namespace (`caps-tcx-production_ns`) to allow the pipeline to perform Vault configuration (e.g., creation of child namespace, enabling secret engines AWS, K8s, KV, etc., and creating related roles and policies). The pipeline at a later stage will automatically enable and configure the JWT auth method at the child namespace level.

###### Enabling JWT Authentication Method 

1. Log in to the Vault via a browser and navigate to the root namespace (`caps-tcx-production_ns`).  
2. Click on the **Access** menu and select **Enable new method**.  
3. Choose **JWT** and proceed by clicking **Next**.  
4. Set the path to `jwt_v2` and click on **Enable Method**.  
5. Select the `jwt_v2` method and click on **Edit configuration**.  
6. Input the OIDC discovery URL as `https://gitlab.industrysoftware.automation.siemens.com`.  
7. Enter the Bound issuer under JWT Options as `https://gitlab.industrysoftware.automation.siemens.com`.  
8. Ensure the namespace in OIDC is selected.  
9. Click **Save** to finish the setup.  

![Image](./image_110.png)


- Execute the Vault commands to enable the Vault auth method and create relevant roles and policies.

```
echo '
# Namespace management
path "sys/namespaces/*" {
  capabilities = ["create", "read", "update", "delete", "list"]
}
path "+/sys/namespaces/*" {
  capabilities = ["create", "read", "update", "delete", "list"]
}

# Token operations
path "auth/token/lookup-self" {
  capabilities = ["read"]
}
path "auth/token/create" {
  capabilities = ["create", "update"]
}

# Auth backend roles
path "auth/+/role/*" {
  capabilities = ["create", "read", "update", "delete", "list"]
}
path "+/+/auth/+/role/*" {
  capabilities = ["create", "read", "update", "delete", "list"]
}

# Auth backend config (Kubernetes, AWS, etc.)
path "auth/+/config" {
  capabilities = ["create", "read", "update", "delete", "sudo"]
}
path "+/+/auth/+/config" {
  capabilities = ["create", "read", "update", "delete", "sudo"]
}
path "auth/+/config/*" {
  capabilities = ["create", "read", "update", "delete", "sudo"]
}
path "+/+/auth/+/config/*" {
  capabilities = ["create", "read", "update", "delete", "sudo"]
}

# Auth backends
path "sys/auth/aws*" {
  capabilities = ["create", "read", "update", "delete", "sudo", "list"]
}
path "+/+/sys/auth/aws*" {
  capabilities = ["create", "read", "update", "delete", "sudo", "list"]
}
path "sys/auth/approle*" {
  capabilities = ["create", "read", "update", "delete", "sudo", "list"]
}
path "+/+/sys/auth/approle*" {
  capabilities = ["create", "read", "update", "delete", "sudo", "list"]
}
path "sys/auth/azure*" {
  capabilities = ["create", "read", "update", "delete", "sudo", "list"]
}
path "+/+/sys/auth/azure*" {
  capabilities = ["create", "read", "update", "delete", "sudo", "list"]
}
path "sys/auth/kubernetes*" {
  capabilities = ["create", "read", "update", "delete", "sudo", "list"]
}
path "+/+/sys/auth/kubernetes*" {
  capabilities = ["create", "read", "update", "delete", "sudo", "list"]
}

# Auth mounts
path "sys/mounts/auth/*" {
  capabilities = ["create", "read", "update", "delete", "list"]
}
path "+/+/sys/mounts/auth/*" {
  capabilities = ["create", "read", "update", "delete", "list"]
}

# Identity management
path "identity/entity" {
  capabilities = ["create", "read", "update", "list"]
}
path "+/+/identity/entity" {
  capabilities = ["create", "read", "update", "delete", "list"]
}
path "identity/entity/id/*" {
  capabilities = ["create", "read", "update", "list"]
}
path "+/+/identity/entity/id/*" {
  capabilities = ["create", "read", "update", "delete", "list"]
}
path "identity/entity-alias" {
  capabilities = ["create", "read", "update", "delete", "list"]
}
path "+/+/identity/entity-alias" {
  capabilities = ["create", "read", "update", "delete", "list"]
}
path "identity/entity-alias/id/*" {
  capabilities = ["create", "read", "update", "delete", "list"]
}
path "+/+/identity/entity-alias/id/*" {
  capabilities = ["create", "read", "update", "delete", "list"]
}
path "identity/lookup/entity" {
  capabilities = ["read", "update", "list"]
}
path "+/+/identity/lookup/entity" {
  capabilities = ["read", "update", "list"]
}

# Policies
path "sys/policies/acl/*" {
  capabilities = ["create", "read", "update", "delete", "list"]
}
path "+/+/sys/policies/acl/*" {
  capabilities = ["create", "read", "update", "delete", "list"]
}
path "+/+/sys/policies/egp/*" {
  capabilities = ["create", "read", "update", "delete", "list"]
}

# Secrets mounts
path "+/sys/mounts" {
  capabilities = ["read", "list"]
}
path "+/sys/mounts/secret" {
  capabilities = ["create", "read", "update", "delete"]
}
path "+/+/sys/mounts/secret" {
  capabilities = ["create", "read", "update", "delete"]
}
path "+/+/sys/mounts/aws*" {
  capabilities = ["create", "read", "update", "delete", "sudo", "list"]
}

# Secrets
path "secret/*" {
  capabilities = ["read", "list"]
}
path "customer_inputs/secret/*" {
  capabilities = ["read", "update", "delete", "list"]
}
path "+/secret/*" {
  capabilities = ["create", "read", "update", "delete", "list"]
}
path "+/+/secret/*" {
  capabilities = ["create", "read", "update", "delete", "list"]
}
path "+/+/aws/*" {
  capabilities = ["create", "read", "update", "delete", "list"]
}

# Cloud credentials
path "+/creds/*" {
  capabilities = ["read", "list"]
}
# Azure credentials
path "+/roles/*" {
  capabilities = ["create", "read", "update", "delete", "list"]
}
' > policy.hcl 
```

```bash
vault policy write tcx/vault-integration policy.hcl
```

```bash
  vault write auth/jwt_v2/role/tcx-deploy - <<EOF
  {
    "role_type": "jwt",
    "policies": ["tcx/vault-integration"],
    "token_explicit_max_ttl": 21600,
    "user_claim": "namespace_id",
    "bound_claims": {
      "namespace_path": ["tcx-deploy"]
    },
  "bound_audiences": ["<VAULT_ADDR>"]
  }  
  EOF 
```

###### Associate the JWT Entity alias with TcXEntity

1. Get Canonical ID of the TcXEntity
```cmd
vault read -field=id identity/entity/name/TcXEntity
```
2. Get mount accessor of the jwt_v2 auth path
```cmd
vault read -field=accessor sys/mounts/auth/jwt_v2
```
3. Create entity alias for the jwt_v2
```cmd
vault write identity/entity-alias name="24936" canonical_id="<Canonical_ID_From_Step_1>" mount_accessor="<Accessor_From_Step_2>"
```

The namespace path is declared as repository group names.  
The role `tcx-deploy` is leveraged in `gitlab-ci.yaml` for secret retrieval.  

With the above commands, a role `tcx-deploy` is created to authorize the GitLab group `tcx-deploy`. This role is used as part of the pipeline to authenticate to Vault.

#### Enable AWS Secret Engine and AWS Auth Method
**Note**: Applicable only for the AWS cloud provider.

In the root namespace of Vault, enable the AWS secret engine and configure it to assume the CI role of the tenant AWS account. Skip these steps if you have already followed the steps of section [Allowlist TcX Tenant Administrative Account for XCR Vault usage](../TcX%20Cell%20Setup/AWS/TcX%20Tenant%20Administrative%20AWS%20Account%20setup/Allowlist%20TcX%20Tenant%20Administrative%20Account%20for%20XCR%20Vault%20usage)  

```bash
vault secrets enable aws
```

#### Populating One-Time Vault Secrets

1. Log in to the Vault via a browser and navigate to the root namespace (`caps-tcx-production_ns`). 

##### Creating the Secret for Datadog
- Navigate to "secrets"
- Click the "Create Secret" button.
- Enter the path `shared/datadog` for input `Path for this secret`.
- Paste the `datadog_api_key`, `datadog_app_key` and `datadog_automation_key` in secret data as shown in the image below. To create `datadog_api_key`, refer to [Datadog (log aggregation, metrics, alerts)](../../../Cell-Setup/Automation%20Prerequisites/Tools%20Setup/Datadog#datadog-log-aggregation-metrics-alerts)

![Datadog Secret](./datadog_vault_setup.png)

- Click on the **Save** button to store the secret in Vault.

##### Creating the Secret for Splunk
- **Note**: Splunk HEC token is no longer used to configure the WAF. Provide any dummy string value for the HEC token.
- Navigate to the "secret" namespace within the vault root namespace.
- Click the "Create Secret" button.
- Enter the path `shared/splunk` for input `Path for this secret`.
- Paste the HEC token in secret data as shown in the image below.

![Splunk Secret](./image_117.png)

- Click on the **Save** button to store the secret in Vault.

##### Creating Secret for GitLab Service Account Bot User Token
- **Prerequisite**: Reach out to Chaudhary Yuvraj or Prashanth Bijamwar for the secret to populate into your vault.
- Navigate to the `secret` path within the vault root namespace.
- Click the "Create Secret" button.
- Enter the path `deployops/gitlab/gitlab.industrysoftware.automation.siemens.com/serviceaccount` for input `Path for this secret`.
- Put `personal_access_token` as in Version Data and paste your secret as the value. To generate `personal_access_token`, refer to [Generating the Personal Access Token (PAT) to Execute the Pipeline](../../000_Automation%20Prerequisites/020_Tools%20Access/020_GitLab%20User%20Roles%20and%20Access%20Configuration%20for%20Pipeline%20Execution.md#generating-the-personal-access-token-pat-to-execute-the-pipeline).

![GitLab Secret](./image_118.png)

##### Additional Notes
- Ensure that you have the necessary permissions and access rights to create secrets in the specified namespace. Please contact the vault administrator if you see any "Access Denied" error.

---

