# Journey to ISO 27001 - SISW SaaS ISMS Policy Searchable Page-ocr - Page 6

- **1.8.3** Where keys, token or secrets have been stored in endpoints or assets independent of the key vault, a
secure wipe procedure shall be applied to remove such keys
  - **1.9** Keys, tokens, passphrases shall follow the schedule within Table 1 of this document for retirement/rotation, or
after the detection of a security incident that may have led to the compromise of such secrets
*Please refer to the policy document to view Table 1. *
SISW Saas Data Backup and Recovery Policy requirements

**1.1** Siemens has assigned levels for data classification, and all data backed up must be subject to same classification
level as was the data source.
    - **1.1.1** Data backed up will be handled as per the requirements associated with the data classification level,
as detailed in the Siemens Industry Software (SISW) Saas Data Classification, Handling and Sharing Policy.

**1.2** Data backup methodology used must preserve data structure as found in the source, with clear labeling of
source of data, and location hierarchy as found in the source.
    - **1.2.1** Data scope for the backup must be defined by considering the respective environment which can
include configuration data, license files, and contractual requirements

**1.3** Data backup schedules must leverage incremental, daily and weekly/monthly rollup routines to optimize
recovery point objective (RPO) and storage efficiencies.

**1.4** Data backed up should be stored in a location isolated from the source, minimally at a logical level.

**1.5** Data backup routines must generate an activity log, and the log information should be reviewed on a regular
basis to verify job status. Backup logs are subject to policies set forth in the Siemens Industry Software (SISW) Saas
Secure Logging and Monitoring Policy.

**1.6** Data backed up must be replicated to an offsite location or alternate Cloud availability zone based on data
criticality and classification. Offsite replication must also be logged and reviewed to ensure job completion.

**1.7** Data backed up must be tested via restore tests on a regular basis. The tests must be conducted to verify data
availability and integrity to ensure any recovery point objective (RPO) and recovery time objective (RTO)
requirements.
    - **1.1.1** Data restore activity must be logged, subject to policies set forth in the Siemens Industry Software
(SISW) Saas Secure Logging and Monitoring Policy.
    - **1.1.2** Data restore activity must include data backup restore tests that are inclusive of information,
software, and systems.
SISW Saas Data Classification, Handling, and Sharing Policy requirements

**1.1** Data classification levels must be documented and implemented based on established criteria.
    - **1.1.1** Data classification levels must be defined in consideration of the following impacts, should the data
be inappropriately disclosed:
• Regulatory, legal, and contractual liabilities
• Financial liabilities
• Operational impacts
• Damages to reputation or public image
• Potential physical harms
    - **1.1.2** Data sets containing data from multiple classification levels must be classified at the level of the most
sensitive data type within the data set.
    - **1.1.3** SISW Saas data must be classified according to the Siemens Data Classification Acceptable Use
Document, which allocates the following classification levels.
Strictly Confidential: This applies to corporate proprietary information, for which unwanted disclosure
can have "major" risk impact e.g. for an Operating Company (see ERM scale). This is information that is

