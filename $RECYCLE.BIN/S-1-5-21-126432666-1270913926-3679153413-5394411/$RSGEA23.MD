### Check if the ENV Namespace is Deleted from the Vault

- If there is a single ENV for a CustomerID, then the tenant namespace will be deleted in the cleanup process.
- If there are multiple ENVs (prd/uat/dev/...) for a CustomerID, then the ENV child namespace present under the tenant namespace will be deleted in the cleanup process.
