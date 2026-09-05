# SharePoint Embedded License Requirements

**Responsibility: The customer's Microsoft license administrator should ensure proper licensing.**

A SharePoint Embedded license is essential to create containers, store documents, and enable Office Online viewing and editing capabilities within the TcOOSPE integration.


Overview:

SharePoint Embedded provides a headless, API-only version of SharePoint that allows applications to create isolated document containers with their own independent lifecycle, governance, and data residency. For TcOOSPE integration, this enables secure document storage and Office Online integration.


Before proceeding with the TcOOSPE integration setup, ensure the following licensing requirements are met:

1. SharePoint Embedded License:
    - SharePoint Embedded Container licensing is required
    - Licensing is typically based on storage capacity and API usage
    - Contact Microsoft for current pricing and licensing options
    - Available licensing models:
        * Per-container billing
        * Storage-based billing
        * Transaction-based billing


2. Microsoft 365 Licenses for End Users:
    For users to view and edit Office documents using Office Online, one of the following licenses is required:
    - Microsoft 365 E3 or E5
    - Office 365 E3 or E5
    - Microsoft 365 Business Standard or Premium
    - Office 365 A3 or A5 (for education)


3. Azure Active Directory:
    - Azure AD P1 or P2 (recommended for production environments)
    - Azure AD Free may be sufficient for development/testing


License Requirements Summary:

| Component | License Type | Purpose |
| :-------- | :----------- | :------ |
| SharePoint Embedded | Container License | Document storage and container management |
| Microsoft 365 / Office 365 | E3, E5, Business Standard/Premium | Office Online viewing and editing |
| Azure Active Directory | P1/P2 (recommended) | User authentication and application management |


⚠️ Important Notes:

- Users without appropriate Microsoft 365/Office 365 licenses may have limited functionality when accessing Office documents
- SharePoint Embedded licensing is separate from traditional SharePoint Online licensing
- Ensure sufficient storage capacity is provisioned based on expected document volume
- Some features may require specific license tiers (e.g., advanced compliance features require E5)


Additional Resources:

For detailed SharePoint Embedded licensing information, refer to:
- [Microsoft SharePoint Embedded Documentation](https://learn.microsoft.com/en-us/sharepoint/dev/embedded/overview)
- Contact your Microsoft account representative for enterprise licensing options
