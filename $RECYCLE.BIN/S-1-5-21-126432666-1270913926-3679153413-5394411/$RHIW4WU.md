## Build-infra Failed: Virtual Network Peering Error


**Issue Description**:

Build-infra stage failed because the peering between shared and tenant vnet was disconnected.

**Example Error:**
```
Error: Virtual Network Peering Name: "tcx-tenant-t72241ca-prd-tenantvnet-to-sharedvnet-peer" to be created: unexpected status 400 (400 Bad Request) with error: VnetAddressSpaceOverlapsWithAlreadyPeeredVnet: Cannot create or update peering
```
![alt text](image.png)

![Image](./image_peering_disconnected.png)

**Work Around:**
1. Go to Azure Portal.  
2. Navigate to the Shared Resource Group-> Virtual network.  
3. Inside Peering, find your tenant peering and delete it.  
4. Wait for the deletion to complete.
5. Validate that the deletion is complete by refreshing the peering view in Azure Portal.
6. Retry the job from the GitLab UI by navigating to the pipeline associated with the failed build-infra stage and clicking the retry button.