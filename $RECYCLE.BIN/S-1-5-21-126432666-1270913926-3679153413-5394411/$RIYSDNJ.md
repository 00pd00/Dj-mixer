### Vault Integration with Ansible

The end-to-end pipeline triggered from the ansible tower involves git operation like creating repos, branches, updating the templates, etc. and in order to perform these operation a git credential would be required.

As of now we make use of git token and this token has been passed as hardcoded CICD variable to the pipeline which is not a  recommended practice. 

This solution will allow the user to pass their own git credentials (git username and user token) through Ansible, which will be stored as a secret in Hashicorp Vault. During runtime, the pipeline will fetch this secret from Vault as and when it requires to get authenticated.

> **Note:**  
> For the following tasks, you will need the following Vault environment variables:
>
> - **VAULT_ADDR**: The Vault server address.  
>   Refer to the [Vault address section](../../../../Documentation/Cell-Setup/Automation%20Prerequisites/Tools%20Setup/Vault%20Setup#vault-organization-concepts) for details.
>
> - **VAULT_NAMESPACE**: The Vault namespace.  
>   Refer to the [Vault namespace section](../../../../Documentation/Cell-Setup/Automation%20Prerequisites/Tools%20Setup/Vault%20Setup#root-namespaces) for details.
>
> - **VAULT_TOKEN**: The root-level token for the respective `VAULT_NAMESPACE`.

#### Create Ansible Credential Object for GitLab User Credentials
- **Optional**: This step is only required if the user wants to save the credentials in Ansible. This avoids providing the GitLab PAT as input every time.
- Create a Credential Type in Ansible:
    - **Name**: `xcd_gitlab_creds`
    - **Description**: Credentials of user with Personal Access Token of XCD GitLab
    - **Input Configuration YAML**:
    ```yaml
    fields:
        - id: user_name
            type: string
            label: Username of GitLab User
            secret: false
        - id: user_email
            type: string
            label: Email address of GitLab User
            secret: false
        - id: user_token
            type: string
            label: Personal Access Token of GitLab User
            secret: true
    required:
        - user_name
        - user_email
        - user_token
    ``` 
    - **Injector Configuration YAML**:
    ```yaml
    extra_vars:
        xcd_git_user_email: '{{ user_email }}'
        xcd_git_user_name: '{{ user_name }}'
        xcd_git_user_token: '{{ user_token }}'
    ```
    - Click **Save**.
- Create Credentials using the Credential Type:
    - Click on **Credentials > Create new credentials (+)**.
    - **Name**: `admin_xcd_gitlab_creds`
    - **Description**: Admin's GitLab Credentials with Personal Access Token of XCD GitLab
    - **Credentials Type**: `xcd_gitlab_creds`
    - **Username of GitLab User**: `<admin_username>`
    - **Email of GitLab User**: `<admin_username@siemens.com>`
    - **Personal Access Token of GitLab User**: `<PAT_Value>`

#### Create Ansible Credential Object for Vault AppRole
- Login to Ansible Automation Platform and Create a Credential Type in Ansible:
    ![Create new Credential Type](image-5.png)
    - **Name**: `xcr_vault_approle`
    - **Description**: XCR Vault AppRole credentials for authentication
    - **Input Configuration YAML**:
    ```yaml
    fields:
      - id: secret
        type: string
        label: XCR Vault Secret ID
        secret: true
      - id: role
        type: string
        label: XCR Vault Role ID
        secret: true
    required:
      - secret
      - role
    ```
    - **Injector Configuration YAML**:
    ```yaml
    extra_vars:
      xcr_vaultkv_role_id: '{{ role }}'
      xcr_vaultkv_secret_id: '{{ secret }}'
    ```
    - Click **Save**.
    ![xcr_vault_approle](image-6.png)

#### Vault App Role Setup Steps

##### Step 1: Get Canonical ID of TCXEntity
```cmd
set VAULT_ADDR=<Vault URL>
set VAULT_NAMESPACE=<Vault Namespace>
set VAULT_TOKEN=<Vault Root token>

vault read identity/entity/name/TCXEntity
```

![Canonical ID](image-2.png)

In the output, you will see an `id` field at the end. This is the Canonical ID. Note it down.
**Example Canonical ID**: `2c806312-b408-7dff-2f27-13f3e40a0ad7`

##### Step 2: Enable AppRole Authentication Method and Get Mount Accessor
```cmd
set VAULT_ADDR=<Vault URL>
set VAULT_NAMESPACE=<Vault Namespace>
set VAULT_TOKEN=<Vault Root token>

vault auth enable approle
vault auth list
```

In the output, you will see the accessor of the `approle/` authentication method. Note it down.
![Mount Accessor](image-3.png)
**Example Mount Accessor**: `auth_approle_fd754c91`

##### Step 3: Create AppRole and Corresponding Policy
Create a file named `app-role-token-policy.hcl` with the following content:
```hcl
path "customer_inputs/secret/*" { 
  capabilities = ["create","read","update","list"] 
}
```

Apply the policy and create the AppRole:
```cmd
vault policy write app-role-token-policy app-role-token-policy.hcl

vault write auth/approle/role/ansible-tower-app-role token_type=service secret_id_ttl=0 token_ttl=1h token_max_ttl=6h secret_id_num_uses=0 token_policies="app-role-token-policy"
```

##### Step 4: Generate Role ID and Secret ID
```cmd
vault read auth/approle/role/ansible-tower-app-role/role-id
```
Note down the role-id from the output.
**Example Role ID**: `5f0a394a-c0da-627c-d1a7-d9bb48f1a736`

```cmd
vault write -f auth/approle/role/ansible-tower-app-role/secret-id
```
Note down the secret-id from the output.

![Role and Secret ID](image-4.png)

##### Step 5: Create Entity Alias (License Optimization)
```cmd
vault write identity/entity-alias name="app-role-alias-ansible-tower" canonical_id="<Canonical_ID_from_Step_1>" mount_accessor="<Accessor_From_Step_2>"
```

Replace `<Canonical_ID_from_Step_1>` and `<Accessor_From_Step_2>` with the values obtained from Steps 1 and 2.

##### Step 6: Verify Authentication
To confirm the setup, use the Role ID and Secret ID from Step 4:
```cmd
vault write auth/approle/login role_id="<Role_ID>" secret_id="<Secret_ID>"
```

This should return a valid token, confirming that the AppRole authentication is successful.

##### Step 7: Add AppRole to Ansible Tower

1. **In Ansible Tower:**
    - Open **Credentials** from the left-hand menu.
    - Click on **Add**.
      ![Add button](image-8.png)

2. **Fill in the details:**
    - **Name:** `customer_inputs_vault_approle`
    - **Organization:** `TCX`
    - **XCR Vault Secret ID:** `<Get it from Step 4>`
    - **XCR Vault Role ID:** `<Get it from Step 4>`

    ![AppRole Credentials](image-9.png)