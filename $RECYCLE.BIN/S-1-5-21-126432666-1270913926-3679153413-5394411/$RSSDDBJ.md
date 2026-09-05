# Azure Pipeline Network Connectivity Failures

**Issue Description**:  
Azure pipeline stages can fail when required outbound network access to external services is blocked or unavailable.
This occurs when firewall policies rules, or allowlists do not include the required endpoints.
Connectivity failures commonly affect operations that call external services such as Azure Communication Services, Git repositories, or package managers.
The issue is not pipeline stage specific and can impact any pipeline stage that requires outbound connectivity.

Possible causes of connectivity issues:
1. Missing DNS and HTTPS allowlist entries for required endpoints.
2. Restricted network policies blocking outbound traffic on port 443.
3. SSL/TLS inspection or proxy interruption for service endpoints.
4. Missing Azure CLI extensions in runners with restricted internet access.
5. Endpoint updates not reflected in `variables/global/include.yml` variables (for example `GLBL_ALLOW_ESSENTIAL_SERVICES`).

**Work Around:**
1. Navigate to the failed pipeline job and capture the exact connectivity error.
2. Identify the endpoint being accessed when the failure occurred.
3. Verify required entries in `GLBL_ALLOW_ESSENTIAL_SERVICES` in `variables/global/include.yml`.
4. Add or update DNS/FQDN entries for blocked endpoints and ensure outbound HTTPS (443) is allowed.
5. If Azure CLI extension commands fail, allow extension discovery/download endpoints.
6. Raise and merge MR to `main` in the `tcx-pipeline-account` repository.
7. Trigger the pipeline again to apply updates: [trigger cell pipeline](../../../000_Cell-Setup/000_Automation%20Prerequisites/040_TcX%20Cell%20Setup/AZURE/040_Setup%20Cell%20Subscription/090_Trigger%20Cell%20Pipeline.md).

## Typical Errors Observed

| **Error Type** | **Error Message** | **pipeline link** | **Typical Resolution** |
|---|---|---|---|
| **Azure CLI Extension Not Found** | `az communication list-key: 'communication' is misspelled or not recognized` | https://gitlab.industrysoftware.automation.siemens.com/tcx-deploy/tcx-pipeline-tenant/-/jobs/78904117#L628 | Allow `aka.ms` and `azcliprod.azureedge.net`, or pre-install `communication` extension |
| **ACS Email SSL/TLS Error** | `EOF occurred in violation of protocol` | https://gitlab.industrysoftware.automation.siemens.com/tcx-deploy/tcx-pipeline-tenant/-/jobs/79133867#L644 | Allow outbound 443 to `<resource-name>.communication.azure.com` and bypass SSL inspection for this endpoint |