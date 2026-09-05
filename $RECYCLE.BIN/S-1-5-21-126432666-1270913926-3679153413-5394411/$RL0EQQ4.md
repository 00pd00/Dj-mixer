# Journey to ISO 27001 - SISW SaaS ISMS Policy Searchable Page-ocr

crucial for the success and survival of the entire company or parts of it. Disclosure can cause very serious
harm to business interests and goals of the company, lead to grave legal consequences, impinge on the
value of Siemens stock or severely damage the company's reputation (e.g. company or sales strategy
papers, economic and budget plans, information on merger and acquisition topics). This information
should be distributed on a need-to-know basis and requires a non-disclosure agreement for sharing with
people outside the company.
Confidential: This applies to corporate proprietary information, for which unwanted disclosure can have
"moderate" or "significant" risk impact e.g. for an Operating Company (see ERM scale). The information
can be valuable for competitors (e.g. controlling data, procurement and sales contracts, source code of
software developed by SISW Saas or design documents). This information should be distributed on a
need-to-know basis and requires a non-disclosure agreement for sharing with people outside the
company.
Restricted: This applies to corporate proprietary information, for which unwanted disclosure can have
only "marginal" or "minor" risk impact for e.g. an Operating Company (see ERM scale). This information
may be accessible for a large circle of employees on need-to-know basis, but not generally available to
people outside the company (e.g. organizational plans, internal telephone directories, internal
guidelines, test reports, etc.). This information may be distributed externally on a need-to-know basis
after the external parties are informed about their obligations. Consider a non-disclosure agreement
when sharing with people outside the company.
Unrestricted: This kind of classification applies to corporate information, which is intended for public
use or where disclosure has no negative impact to Siemens (e.g. press releases, job postings, official
price lists, advertising materials, etc.). It is either labelled as "unrestricted" or immediately identifiable as
for public-use information (e.g. an internet web site).
    - **1.1.4** All data stored on the cloud is classified as Confidential by definition. As such, there is no need for
tagging or other marking.
    - **1.1.5** All source code and software design documentation is classified as Confidential by definition. As
such, when these artifacts are stored within a controlled system (e.g. Gitlab, Polarion, Jira, etc.) there is no
need for further tagging or other marking.
    - **1.1.6** All Controlled Unclassified Information (CUI) referenced in NIST 800-171 is classified as Confidential
by definition.

**1.2** Data handling and sharing requirements must be documented and implemented based on established criteria.
    - **1.2.1** Data handling requirements must be defined for:
      - **1.2.1.1** Data stored within SISW Saas information resources (e.g., databases, servers,
workstations, mobile devices, etc.) and environments of Third-Party Providers
      - **1.2.1.2** The classification of an asset shall follow the classification of the most sensitive
classified data within that asset
      - **1.2.1.3** Data transmitted across production, corporate, and public networks
    - **1.2.2** Requirements must be established for sharing data with authorized internal and external entities.
    - **1.2.3** SISW Saas data must be handled and shared according to the Siemens AG Cybersecurity Card -
Protection of Sensitive Data.
    - **1.2.4** Users shall either manually activate the "lock screen" or logout before leaving a system unattended.
    - **1.2.5** A non-disclosure agreement must be executed in accordance with the rules defined in 1.1.3 when
sharing information outside the company.
    - **1.2.6** The requirements for data and resource handling, according to their security classification and
Acceptable Use within the SISW Company Directives, apply regardless of location.
    - **1.2.7** Mechanisms shall be implemented to conceal sensitive information such as PII by means of, including
but not limited to, data masking, pseudonymization, and anonymization in accordance with the established
classification criteria.
    - **1.2.8** Measures regarding data leakage prevention shall be implemented across all data classified as Strictly
Confidential, Confidential and Restricted.
    - **1.2.9** Data retention periods shall be established and documented with consideration to legal and
regulatory requirements in accordance with the established classification criteria.

