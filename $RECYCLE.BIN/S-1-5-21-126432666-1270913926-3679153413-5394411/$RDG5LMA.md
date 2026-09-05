# Updating Client Secret in HashiCorp Vault

**Responsibility: Siemens CApS Team**

After receiving a new client secret from the customer's Azure administrator, the CApS team must update the secret in HashiCorp Vault to ensure the TcOOSPE integration continues to function without interruption.


Overview:

HashiCorp Vault is used to securely store and manage sensitive credentials including Azure AD client secrets. This guide outlines the process for rotating the TcOOSPE client secret in Vault.

For general guidance on rotating expired Vault credentials via the CLI, refer to [Vault Credential Rotation via Ansible](/docs/Documentation/020_Operations/030_Day%20N%20Operations/120_Vault%20Credential%20Rotation%20via%20Ansible.md#rotating-expired-vault-credentials-in-ansible).


Prerequisites:

- New client secret received from customer Azure admin
- Access to HashiCorp Vault with appropriate permissions


Steps to Update Client Secret in HashiCorp Vault:

1. Verify New Secret Information:

    Before updating, confirm you have:
    - New client secret value
    - Secret expiration date


2. Navigate to the TcOOSPE Secret Path in Vault:

    In the Vault UI or CLI, go to the following path:
    ```
    <namespace>/Secrets/secret/tcx/teamcenter/tcoospe
    ```

    This path contains the TcOOSPE credentials including:
    - `tcoospe_sharepoint_client_secret` — the client secret value
    - `tcoospe_sharepoint_client_secret_expiration` — the secret expiration date


3. Update the Client Secret:

    **Using Web UI:**
    - Navigate to the path above
    - Click "Create new version"
    - Update the `tcoospe_sharepoint_client_secret` field with the new secret value
    - Update the `tcoospe_sharepoint_client_secret_expiration` field with the new expiration date
    - Click "Save"

    **Using CLI:**
    Follow the documentation on how to rotate secrets through the Vault CLI:
    [Rotating Expired Vault Credentials in Ansible](/docs/Documentation/Operations/Day%20N%20Operations/Vault%20Credential%20Rotation%20via%20Ansible#rotating-expired-vault-credentials-in-ansible)

    The key-value pairs to update are:
    ```bash
    tcoospe_sharepoint_client_secret="<new-secret-value>"
    tcoospe_sharepoint_client_secret_expiration="<expiration-date>"
    ```


4. Verify Secret Update:

    Read the secret to confirm the update:

    Verify:
    - [ ] `tcoospe_sharepoint_client_secret` shows the new value
    - [ ] `tcoospe_sharepoint_client_secret_expiration` is updated
    - [ ] Version number has incremented


5. Perform Day N Password Rotation:

    After updating the secret in Vault, follow the Day N Password Rotation process to propagate the updated credentials to the environment. Complete all steps outlined in the [Day N Password Rotation](/docs/Documentation/020_Operations/050_Password%20Maintenance/020_On_Demand_Update/040_Day%20N%20Password%20Rotation/000_Intro.md) section.


6. Test Integration:

    Before considering rotation complete, test the integration:

    a. Access the TcX environment
    b. Attempt to open an Office document (Word, Excel, PowerPoint)
    c. Verify the document opens in the Active Workspace Universal Viewer

    If testing fails, rollback to the previous secret version immediately, and verify with the customer whether they sent the right value.

