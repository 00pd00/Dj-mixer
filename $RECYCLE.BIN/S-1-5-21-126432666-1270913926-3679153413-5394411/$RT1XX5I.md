## Cell Onboarding Steps for PGFlex

**Step 1: Raise an FDS ticket to update an existing XCR cluster with Private DNS Zone integration**

1. Submit a support request using [FDS](https://fdsone.atlassian.net/servicedesk/customer/portal/302/group/348/create/768).
2. Complete the ticket fields exactly as shown below. Leave all other fields unchanged.

   - Summary: `Request Private DNS Zone Integration for existing XCR Cluster`
   - Share with: `Share with FDSOne`
   - Request type: `Enablement Request`
   - Component: `XCR Rancher`

3. In the Description field, provide the following information:

   ```text
   Private DNS Zone Integration
     - Rancher Cluster Name: "<existing-xcr-cluster-name>"
     - Rancher Cluster ID: "<existing-xcr-cluster-id>"
     - Do you require Private DNS Zone(s): yes
     - For which Azure service(s): Azure Database for PostgreSQL Flexible Server
     - Expected Private DNS Zone name: ".postgres.database.azure.com"
     - Microsoft Entra ID Group name to grant DNS Zone Record create permission to: "<name-of-onboarding-entra-id-group>"
     - Microsoft Entra ID Group Object ID: "<object-id-of-onboarding-entra-id-group>"

   Expected output values from XCR upon request completion:
   - "XCR Tenant ID"
   - "XCR Subscription ID"
   - "Private DNS Zone Resource Group Name"
   ```

4. Refer to the sample support ticket image below:

   ![Sample FDS Ticket](./050_Sample%20FDS%20Support%20Ticket.png)


**Step 2:** Add the onboarding SP to the Microsoft Entra ID group referenced in the FDS request to grant DNS Zone Record create permission. See [Request to Add Onboarding SP to Required Entra Group to Access Private DNS Zone](./020_Request%20to%20Add%20Onboarding%20SP%20to%20Required%20Entra%20Group%20to%20Access%20Private%20DNS%20Zone.md).

**Step 3:** Increase the onboarding SP TTL to 6 hours. See [Onboarding SP TTL Increase Steps](./010_Onboarding%20SP%20TTL%20Increase%20Steps.md).

**Step 4:** After completing Steps 1-3, add the values provided by the XCR team to your cell file variables. If these values are already present, skip this step.

- `GLBL_XCR_DNS_ZONE_RESOURCE_GROUP_NAME`: "Private DNS Zone Resource Group Name"
- `GLBL_XCR_TENANT_ID`: "XCR Tenant ID"
- `GLBL_XCR_SUBSCRIPTION_ID`: "XCR Subscription ID"
