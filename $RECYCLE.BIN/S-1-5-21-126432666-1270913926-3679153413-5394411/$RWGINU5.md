## Pipeline failing in build stage due to ForbiddenByRbac

![Image](./image_405.png)

In case build infra stage is failing because of role assignments, deny assignments or role definitions were changed recently. Please perform below steps

- Delete Tenant Service Principal: vault delete [azure_secret_engine_name]/roles/[tenant_service_principal_name]
- Rerun Pipeline using Ansible Tower