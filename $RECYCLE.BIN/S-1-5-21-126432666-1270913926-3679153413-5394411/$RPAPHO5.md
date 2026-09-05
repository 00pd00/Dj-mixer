### Pre-requisites

- The CApS administrator prepares the personalization kits based on the initial TcX deployment for a customer/tenant. Each kit must have:
    - A unique identifier
    - A version
    - Kit zip files for different platforms (Linux and Windows)
- The CApS administrator uploads the personalization kit zip file(s) to the common tenant storage.
```
AWS: tcx-tenantbucket-<tenant AWS region>-<tenant id>-<AWS Account number>
AZURE: tcxt<tenant_id>cm<tenant_infix>sa<subscription_id_prefix>
```

#### Cross-Account Personalization Package S3 Bucket Requirements:
- Personalization packages must be stored in the tenant common bucket only
- The tenant ID in the tenant common bucket name must match the tenant ID of the deployment target