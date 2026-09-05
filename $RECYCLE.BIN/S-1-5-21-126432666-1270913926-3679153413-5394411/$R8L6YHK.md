# Process Overview for DMARC SPF DKIM Enablement.md

## Overview

Below documentation contains detailed process to configure DMARC, DKIM, and SPF with Amazon Simple Email Service (SES). These email authentication methods helps to protect domain from email spoofing, improve email deliverability, and ensure compliance with security standards.

## Email Authentication Methods

Below is short description of what SPF, DKIM and DMARC stands for:

- **SPF (Sender Policy Framework):** Verifies if the sender's IP is authorized to send on behalf of the domain.
- **DKIM (DomainKeys Identified Mail):** Verifies if the email's content has not been tampered with.
- **DMARC (Domain-based Message Authentication, Reporting, and Conformance):** Requires SPF or DKIM to pass and aligns them with the domain in the "From" address.

## Important Prerequisites

**NOTE:** Before performing all the steps mentioned in the document below, please note that:

1. SES configuration must be done in the **same region** and **same account** where SMTP user is present.
2. SES user and SES identity should be present in the **same region**.

## Configuration Process

The configuration process involves the following main steps:

1. **Creating SMTP Credentials** - Setting up IAM user for email sending
2. **Domain Setup in AWS SES** - Configuring domain identity and verification
3. **SMTP Configuration and Validation** - Validating configuration and testing email headers

Please follow the subsequent documentation files in sequence to complete the full setup process.
