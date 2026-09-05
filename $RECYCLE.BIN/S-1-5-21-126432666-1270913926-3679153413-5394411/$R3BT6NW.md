# Bulk Users Management Operation
Overview
-------
This operation is used to for convience of  **Teamcenter CAPs (Customer Application Platform) users** in a multi-tenant Teamcenter environment. CAPs users need access to a Teamcenter tenant deployed and managed through the TCX pipeline.

Rather than requiring a Teamcenter administrator to manually create or deactivate users through the Active Workspace Client (AWC) or IT admin console, this operation automates the entire lifecycle in a pipeline-driven, auditable way. It is the standard mechanism for:

- **Onboarding new CAPs users** — provisioning their Teamcenter account, assigning them to the correct organizational group and role, setting their license level, and making them active in the tenant in a single pipeline run.
- **Offboarding / deactivating CAPs users** — bulk-deactivating accounts (e.g. when employees leave or change roles) without manual intervention, ensuring timely removal of access in line with security and compliance requirements.
- **Bulk operations** — handling tens or hundreds of users in one pipeline execution by reading a `users.csv` supplied by the requestor (e.g. a project admin or the customer) from cloud object storage (AWS S3 or Azure Blob Storage), rather than processing accounts one at a time.

Technically, the operation connects to the Teamcenter SOA REST API authenticated as the `admin_console_daemon_user` (a privileged service account whose credentials are retrieved from HashiCorp Vault at runtime). It resolves the tenant's organizational structure (groups and roles) from the live Teamcenter data before provisioning, so that every user is placed in the correct location in the org tree.

In summary, this operation bridges the gap between a customer-supplied user list and a running Teamcenter CAPs tenant, providing a self-service, repeatable, and cloud-agnostic way to keep user access up to date across AWS and Azure deployments.

