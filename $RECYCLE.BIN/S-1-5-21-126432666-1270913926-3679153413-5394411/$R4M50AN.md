# Journey to ISO 27001 - SISW SaaS ISMS Policy Searchable Page-ocr

- **1.1.2** Roles and responsibilities must be defined for all facets of software and services development and
must be updated as needed to reflect current practices.
    - **1.1.3** Data must be handled in accordance with the Data Classification, Handling, and Sharing Policy
throughout all phases of the development lifecycle.
    - **1.1.4** Privacy and security impact assessments must be performed for new and significantly updated
application software and services.
      - **1.1.4.1** Associated security requirements, risks statements, risk response measures, and design
decisions must be tracked and maintained
    - **1.1.5** Prior to inclusion, the impact of third-party dependencies such as libraries, snippets, run-times should
be evaluated from both security and terms of use/licensing and monetization perspectives, as defined by the
Compliance and Legal functions.
    - **1.1.6** Security requirements for all third party components used, or sought out for use, in developed
software must be defined and communicated to third parties. These requirements must be validated both prior
to, and during, utilization of the code or component. Considerations must include:
• Core security requirements put into acquisition documents, contracts, and third party agreements
• Defining requirements for selecting/approving/rejecting software (e.g., third party vulnerability
disclosure program), IR capabilities, adherence to Siemens requirements, providing vendor attestation,
provide code provenance information
• Documenting approved exceptions
    - **1.1.7** Processes must be in place to identify vulnerabilities during development and after release, including
vulnerabilities associated with third-party and open source components.
    - **1.1.8** Free and open source software components and libraries must be registered to ensure legal and
licensing clearance for applied components and libraries (e.g., Blackduck).
    - **1.1.9** Vulnerabilities identified during and after development must be remediated according to criteria
defined in the Siemens Industry Software (SISW) Saas Vulnerability and Patch Management Policy.
    - **1.1.10** Code review methodologies must be defined and implemented. Findings from the code review, and
follow-up actions, must be recorded.
    - **1.1.11** A final review must be performed to verify that security requirements were addressed prior to
implementation.
    - **1.1.12** Teams must determine whether executable code testing is necessary. If deemed necessary, the types
oftesting to be used must be defined (e.g., sandbox testing, testing at each stage of
development).
    - **1.1.13** Production code changes must be performed in accordance with the Siemens Industry Software
\{SISW) Saas Change Management Policy. Code changes must be documented and tracked by using a software
project management tool (e.g., Polarion, JIRA), and where possible within the code development tool as well
(versioning).
    - **1.1.14** Where appropriate, support for standardized security features must be built (e.g., enabling
integration with existing log management, identity management, access control, or vulnerability management
systems).
    - **1.1.15** Where in-house-developed tools, tool configurations, customized outsourced components are used,
developers must follow all security requirements defined within this policy.
  - **1.2** Source code must be developed and maintained within approved, secured repositories and controlled
throughout its lifecycle.
    - **1.2.1** Access to all forms of code must be restricted to authorized personnel following the principle of least
privilege and the four-eyes principle.
    - **1.2.2** Source code repositories must not be cloned or transmitted in clear text.
    - **1.2.3** Version control of source code must be maintained.
    - **1.2.4** Changes to source code must be logged and monitored.
    - **1.2.5** Source code must be archived and secured by mechanisms comparable to production code.
    - **1.2.6** Where possible, integrity verification functionality must be utilized for all software and shared with
acquirers (e.g., using cryptographic hashes, certificate authorities, periodically reviewing code signing
processes).
    - **1.2.7** Related security data (e.g., integrity information, provenance data, associated images) must be
archived securely for all software.

