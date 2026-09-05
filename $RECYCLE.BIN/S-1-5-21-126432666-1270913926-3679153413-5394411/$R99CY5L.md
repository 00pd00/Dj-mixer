# Steps for CApS Team

**Responsibility: Siemens CApS team performs these steps during pipeline execution.**

After receiving the required information from the customer's Azure administrator, the CApS team will configure the TcOOSPE integration using the provided credentials and settings.


Required Inputs from Customer:

The following information must be received from the customer before proceeding:

| Item | Source | Purpose |
| :--- | :----- | :------ |
| Enterprise App Name | Azure App Registration | Application identifier |
| Client ID | Azure App Registration | Authentication |
| Tenant ID | Azure App Registration | Azure AD tenant identification |
| Client Secret | Azure App Registration | Secure authentication |
| Client Secret Expiration | Azure App Registration | Client Secret's Expiration Date |
| Container Type ID | SharePoint Embedded Setup | Container type reference |


CApS Team Configuration Steps:

1. Validate Customer Inputs:
    - Verify all required credentials are provided


2. Configure Pipeline Parameters:
    
    Update the deployment pipeline with TcOOSPE-specific parameters:
    
    ```yaml
    TcOOSPEInput:
        TcOOSPEEntraAppId: "CHANGE_ME"
        TcOOSPEDirectoryId: "CHANGE_ME"
        TcOOSPESharePointClientSecret: "CHANGE_ME"
        TcOOSPESharePointClientSecretExpiration: "CHANGE_ME"
        TcOOSPEContainerTypeId: "CHANGE_ME"
    ```

Important Security Notes:

⚠️ **Client Secret Handling:**
- Never log or expose client secrets in plain text
- Store secrets only in HashiCorp Vault or Azure Key Vault
- Rotate secrets according to security policies
- Use secure channels for receiving secrets from customers

⚠️ **Access Control:**
- Limit access to deployment pipelines to authorized CApS personnel
- Use least-privilege principle for service accounts
- Audit all configuration changes
- Maintain separation of duties


Next Steps:

After successful deployment by CApS team:
1. Proceed to "Post Deployment Configurations" section
2. Customer team performs validation steps
3. Enable monitoring and alerting
4. Schedule regular maintenance windows
