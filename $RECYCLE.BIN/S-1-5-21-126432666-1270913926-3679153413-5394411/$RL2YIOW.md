#### Raise FDS ticket to update an existing XCR cluster with Private DNS Zone Integration for AI

1. Raise a cluster change request form at [FDS](https://fdsone.atlassian.net/servicedesk/customer/portal/26)
2. Fill in the following ticket fields as provided below. You can leave all other fields as is.

Note: User must have `User Access Administrator` role on Azure to do the operation once it is provided.

----

Summary: `Request Private DNS Zone Integration for existing XCR Cluster`

Share with: `Share with FDSOne`

Description:
```json
Private DNS Zone Integration
  - Rancher Cluster Name: "<existing-xcr-cluster-name>"
  - Rancher Cluster ID: "<existing-xcr-cluster-id>"
  - Do you require Private DNS Zone(s): yes
  - For which Azure service(s): Azure AI Search
  - Expected Private DNS Zone name: "privatelink.search.windows.net"
  - Microsoft Entra ID Group name to grant DNS Zone Record create permission to: "<name-of-onboarding-entra-id-group>"
  - Microsoft Entra ID Group Object ID: "<object-id-of-onboarding-entra-id-group"

Expected output values from XCR as a result of request completion:
- "XCR Tenant ID"
- "XCR Subscription ID"
- "Private DNS Zone Resource Group Name"

```

Need By Date: `Choose date by which you need to have this request handled.`

Severity: `P1`

Impact: `Customer`

Business unit/Segment: `CAPS`

Product Name: `Cloud Operations`

Services: `XCR Rancher`

---

For additional guidance on how to fill out FDS Change requests, please [visit this documentation page](https://teams.microsoft.com/l/message/19:2d75725c-b941-4211-bdb9-51750e7647cd_37e03621-b2e3-4581-9856-12b1892ca426@unq.gbl.spaces/1754554991395?context=%7B%22contextType%22%3A%22chat%22%7D).

#### Information to receive from XCR

The following values will be provided by the XCR team as part of successful completion of the request:

- `XCR Tenant ID`
- `XCR Subscription ID`
- `Private DNS Zone Resource Group Name`

Now - you can continue with the [remaining steps for AI Search provisioning](./010_AI%20Search.md).