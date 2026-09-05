# Generate new Client Secrets

Before the client secret expires it needs to be renewed to maintain uninterrupted service for the TcOOSPE integration.

**Responsibility - The customer's Azure administrator should generate the Client Secret & share it with the Siemens CApS team for further configurations.**


Overview:

Azure AD client secrets have an expiration date (typically 6, 12, or 24 months). To prevent service disruption, secrets must be rotated before expiration. It is recommended to rotate secrets at least 30 days before the expiration date.


Steps to generate a new Client Secret:

1. Log in to Azure Portal:
    Go to https://portal.azure.com and sign in using your Azure account credentials.


2. Navigate to Microsoft Entra ID:
    Locate Microsoft Entra ID under Azure services and select it.


3. Access App Registrations:
    Click on App registrations from the left-hand menu.


4. Select Your TcOOSPE Application:
    From the list, click on the application registered for TcOOSPE (e.g., "TcOOSPE", "Teamcenter-SharePoint Integration").


5. Navigate to Certificates & Secrets:
    In the application page, go to Certificates & secrets on the left menu.


6. Create New Client Secret:
    Under Client Secrets section:
    - Click "+ New client secret"
    - Provide a description (e.g., "TcOOSPE Secret 2026-Q1")
    - For Expires, select the maximum validity period available (usually 24 months or Custom if allowed)
    - Click "Add"


7. Copy the Secret Value:
    **⚠️ CRITICAL:** Copy the generated secret value immediately — it won't be shown again after you navigate away from the page.
    
    Store the secret securely in a password manager or secure notes temporarily until it can be shared with the CApS team.


8. Note the Secret Details:
    Record the following information:
    - Secret ID (automatically generated)
    - Description
    - Expiration date
    - Secret value (copied in previous step)


9. Verify Old Secret:
    Before deleting the old secret, verify that the new secret is working correctly in the integration.
    
    **Do NOT delete the old secret until:**
    - The new secret has been configured in TcX
    - Validation testing is complete
    - At least 48 hours have passed with stable operation


10. Clean Up Old Secrets (after validation):
    Once the new secret is confirmed working:
    - Return to Certificates & secrets
    - Find the old/expired secret
    - Click "Delete" next to the old secret
    - Confirm deletion


Important Security Notes:

⚠️ **Client Secret Handling:**
- Never share secrets via email or unencrypted channels
- Use secure file transfer or password managers to share with CApS team
- Never commit secrets to source control or documentation
- Immediately revoke and regenerate if a secret is compromised

⚠️ **Rotation Best Practices:**
- Set calendar reminders for 30 days before expiration
- Maintain overlap period with both old and new secrets active
- Test new secret thoroughly before removing old secret
- Document secret rotation in change management system


Client Secret Rotation Schedule:

| Secret Validity | Recommended Rotation |
| :-------------- | :------------------- |
| 6 months | 5 months (1 month before expiry) |
| 12 months | 11 months (1 month before expiry) |
| 24 months | 23 months (1 month before expiry) |
| Custom | Based on security policy |


Communication with CApS Team:

**Once the Client Secret is generated, the Customer Azure Admin Team is responsible for securely sharing the following information with the Siemens CApS Team:**

| Information | Purpose |
| :---------- | :------ |
| New Secret Value | To update in HashiCorp Vault |
| Secret Expiration Date | For scheduling next rotation |
| Application Name | To identify correct application |
| Environment | (e.g., Production, Development, Test) |


Preferred Communication Channels:
1. Secure file transfer portal (if available)
2. Azure Key Vault share (recommended)
3. Encrypted email with password provided separately
4. Service Now ticket with attachment

**Do NOT use:**
- Regular email without encryption
- Instant messaging platforms
- Screenshots or photos
- Verbal communication without secure follow-up


Next Steps:

After generating the new client secret:
1. Securely share secret with CApS team
2. CApS team updates secret in HashiCorp Vault (see next section)
3. Validation testing is performed
4. Old secret is removed after successful validation
5. Document rotation completion
