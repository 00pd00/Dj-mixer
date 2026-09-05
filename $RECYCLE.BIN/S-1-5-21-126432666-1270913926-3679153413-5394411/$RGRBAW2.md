# Journey to ISO 27001 - SISW SaaS ISMS Policy Searchable Page-ocr - Page 4

- **1.1.1** The process for change management must be defined, documented, and reviewed annually and/or
when there are changes to the process.
    - **1.1.2** Prior to implementation, changes must be:
• Documented to include description, scope, implementation steps, acceptance criteria,
dependencies, validation plans, and roll back or roll forward plans
• Assigned ownership
• Prioritized
• Independently reviewed (e.g., peer review)
• Tested (e.g., unit, functional, integration, performance, and security testing)
• Approved or rejected
• Communicated to relevant interested parties
      - **1.1.2.1** The progress of execution of each change must be documented within a change ticket
      - **1.1.2.2** Where one ticket is used for multiple changes, the progress of each change must be clearly
documented
    - **1.1.3** Emergency change management processes must be established and implemented.
    - **1.1.4** Roll back or roll forward processes must be established, including responsibilities for aborting, and
recovering from unsuccessful changes and/or unforeseen events.
    - **1.1.5** Changes must be monitored during and after implementation according to established deployment
criteria.
    - **1.1.6** Roles and responsibilities for change management activities, including consideration of segregation of
duties, must be established.
    - **1.1.7** Ensure documentation standards (e.g. operational, user, continuity plan) are applied to any
updates/changes as governed by the document management system for each particular record (such as Wiki,
Confluence, etc.).
SISW Saas Cryptography Policy requirements

**1.1** Encryption methods should be leveraged to protect data at rest, or data in-transit when possible.

**1.2** Data at rest should be encrypted using symmetric key encryption methods such as AES, with key strength set to
a minimum 128-bit length to ensure best protection.
    - **1.2.1** Hardware based technologies should be leveraged where possible, and in conjunction with any
software/OS based encryption as a second layer of protection for data at rest.
    - **1.2.2** Where possible, software based encryption should be enabled by default on both fixed media and
removable media, where hardware based encryption might not be feasible.
    - **1.2.3** Encryption keys and passwords associated with symmetric key encryption should not be stored in
plain text format. Password vaults should be leveraged, with full audit trail functionality to capture
access/modification activity at a user level.

**1.3** Data in-transit should leverage end to end encryption, and encryption at multiple layers (Application, Transport,
Network etc.) should be enabled to offer maximum protection.
    - **1.3.1** Asymmetric encryption, when in service, should leverage a minimum key strength of 2048 bits, and
must use a strong hashing algorithm such as SHA-2 256 or greater.
    - **1.3.2** Secret keys shall not be available in plain text and shall be stored and transmitted encrypted using a
strong password or wrapping key technique.
      - **1.3.2.1** Secure Key Management Systems (KMS) shall be used to store secret keys in the cloud
    - **1.3.3** SSL/TLS certificates should be rotated on a regular basis, and a certificate used for public facing
services should not be used for more than a 2-year period.
      - **1.3.3.1** TLS protocol version 1.2 or higher must be used.
      - **1.3.3.2** The use of SSL 1.0, SSL 2.0, SSL 3.0, TLS 1.0, and TLS 1.1 is not allowed.
    - **1.3.4** Wild card certificates will not be used on any Cloud Accounts and Public Facing Services and should
be used sparingly for private/internal services to encourage best practices.
    - **1.3.5** Self-signed certificates may only be used with prior review and approval by DI SW Cybersecurity
Officer

