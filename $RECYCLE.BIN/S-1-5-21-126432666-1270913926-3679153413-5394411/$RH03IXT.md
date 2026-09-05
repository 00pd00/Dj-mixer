# Azure Pipeline Inconsistent Failures 

**Issue Description**:  
Azure Terraform deployments fail inconsistently on first or second run but succeed on subsequent runs without any code changes.  

Possible causes of inconsistent issues  
1. Azure's Eventual Consistency  
    Azure services don't propagate changes instantly. The timing varies:  
    Fast propagation: 30 seconds - 2 minutes (Pipeline succeeds)  
    Slow propagation: 5-15 minutes (Pipeline fails)  
    Reference: [Azure Storage consistency model](https://docs.microsoft.com/en-us/azure/storage/common/storage-concurrency)  
2. Azure Resource Provider Throttling  
    Azure throttles requests to prevent service overload  
    Reference: [Azure Resource Manager throttling](https://docs.microsoft.com/en-us/azure/azure-resource-manager/management/request-limits-and-throttling)  
3. RBAC Propagation Timing  
    Role assignments can take time to become effective  
    Reference: [Troubleshoot Azure RBAC](https://docs.microsoft.com/en-us/azure/role-based-access-control/troubleshooting#role-assignment-changes-are-not-being-detected)
4. Vault flakiness  
    HashiCorp vault becomes unavailable for some short period of time due to which read or write operation to vault can fail.
5. Failed to clone git repo  
    Sometimes git clone operation can fail due to network issues or git server issues or runner issue.

**Work Around:**  
1. Navigate to the failed pipeline
2. Identify the failed stage
3. Click on "Retry" stage
4. Wait for completion (usually succeeds on subsequent attempt)

## Typical Errors Observed

| **Error Type** | **Error Message** | **Pipeline Link** | **Typical Resolution** |
|---|---|---|---|
| **Key Vault Access** | `waiting for Key Vault to become available: dial tcp: lookup xxx.vault.azure.net on xxx:53: i/o timeout` | https://gitlab.industrysoftware.automation.siemens.com/tcx-deploy/tcx-pipeline-tenant/-/jobs/69458515#L3944 | Re-run stage |
| **Storage Account** | `creating Storage Account: KeyVaultAuthenticationFailure: authentication issue on the keyvault` | https://gitlab.industrysoftware.automation.siemens.com/tcx-deploy/tcx-pipeline-tenant/-/jobs/69466423#L3969 | Re-run stage |
| **DNS Resolution** | `waiting for the Data Plane for Storage Account to become available: AuthorizationPermissionMismatch` | https://gitlab.industrysoftware.automation.siemens.com/tcx-deploy/tcx-pipeline-tenant/-/jobs/69893614#L3682 | Re-run stage |
| **Network Peering** | `ReferencedResourceNotProvisioned: resource is in Updating state and the last operation was PutSubnetOperation` | https://gitlab.industrysoftware.automation.siemens.com/tcx-deploy/tcx-pipeline-tenant/-/jobs/70022362#L3641 | Re-run stage |
| **Vault flakiness** | `censored: 'the output has been hidden due to the fact that ''no_log: true'' was specified for this result'` | https://gitlab.industrysoftware.automation.siemens.com/tcx-deploy/tcx-pipeline-tenant/-/jobs/70251592#L4185 | Re-run stage |
| **Failed to clone git repo** | `msg: 'Failed to clone tcx-containers-deploy-automation/tcx-tenant-repos-dev/pratst05-prd repo. Please check the git repo path and bot token. error msg: {''cmd'': ''/usr/bin/git ls-remote origin -h refs/heads/main'', ''rc'': 128, ''stdout'': '''', ''stderr'': "fatal: unable to access ''https://gitlab.industrysoftware.automation.siemens.com/tcx-containers-deploy-automation/tcx-tenant-repos-dev/pratst05-prd.git/'': Failed to connect to gitlab.industrysoftware.automation.siemens.com port 443 after 131862 ms: Couldn''t connect to server\n", ''failed'': True, ''msg'': "fatal: unable to access ''https://gitlab.industrysoftware.automation.siemens.com/tcx-containers-deploy-automation/tcx-tenant-repos-dev/pratst05-prd.git/'': Failed to connect to gitlab.industrysoftware.automation.siemens.com port 443 after 131862 ms: Couldn''t connect to server", ''stdout_lines'': [], ''stderr_lines'': ["fatal: unable to access ''https://gitlab.industrysoftware.automation.siemens.com/tcx-containers-deploy-automation/tcx-tenant-repos-dev/pratst05-prd.git/'': Failed to connect to gitlab.industrysoftware.automation.siemens.com port 443 after 131862 ms: Couldn''t connect to server"], ''changed'': False}'` | https://gitlab.industrysoftware.automation.siemens.com/tcx-deploy/tcx-pipeline-tenant/-/jobs/72486412#L942 | Re-run stage |
<<<<<<< HEAD
=======
| **SSH Banner Exchange Timeout** | `Connection timeout during banner exchange` | https://gitlab.industrysoftware.automation.siemens.com/tcx-deploy/tcx-pipeline-tenant/-/jobs/80909654#L4052 | Re-run stage |
>>>>>>> 5b273bd918e440478bbe59cecea6d04bb2fd3480
