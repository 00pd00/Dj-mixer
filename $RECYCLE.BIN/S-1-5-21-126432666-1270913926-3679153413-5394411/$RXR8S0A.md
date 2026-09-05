# Import Configuration Features

## Overview

The TCX Onboarding Portal provides two import features to streamline environment configuration using YAML format. These features allow you to quickly populate configuration parameters, reuse settings across environments, and ensure consistency in your setup.

---

## Import Config

To import a complete environment configuration, navigate to the **Request Environment** page and click the **"Import Config"** button at the top-right.

A modal dialog will appear with a pre-filled YAML template showing all available configuration fields. You can modify the values according to your requirements and click **"Submit"** to populate the form.

### Supported Configuration Parameters

The Import Config feature supports the following parameters:

**Basic Settings:**
- Customer ID (8-character numerical identifier)
- Environment type (UAT or PRD)
- TCX Version
- Pipeline versions and CLI requirements
- Company name and DNS subdomain
- Admin and notification email addresses

**Advanced Settings:**
- AWS/SAM authentication credentials
- DSS configuration and credentials
- Server process configuration (target, max, warm)
- SMTP settings for email notifications
- Feature flags (SSO, High Availability)
- Storage volume configurations
- Product selection (comma-separated product IDs)

### After Import

Once imported:
- All form fields are automatically populated
- TCX Version is set to "Custom"
- Selected products appear in the dropdown
- Advanced Configuration section expands automatically
- You can review and modify any field before submitting the request

---

## Configure Additional Imports

This feature allows you to add supplementary parameters to your environment configuration, such as custom software packages, service endpoints, and specialized integration settings.

### How to Access

1. On the Request Environment page, click **"Show Advanced Configuration"**
2. Scroll down to the **"Additional Import Parameters"** section
3. Click **"Configure Additional Imports"**

**Note:** The Advanced Configuration option provides the ability to customize your TCX environment using custom pipeline inputs. Please note that this functionality should be utilized with caution and is intended for users who are familiar with the implications of such configurations.

### Supported Parameters

**Additional Software Packages:**
- Custom software installations with version and kit file locations
- Support for both Linux (lnx64) and Windows (wntx64) platforms

**Service Endpoints:**
- TXP ACCP Endpoints (adhoc, dim)
- TXP XCS Endpoints (xrs, notification, scs, dss)
- Custom host configurations (DSSHost, SamHost, SamAuthHost)

**Product Lists:**
- Additional Teamcenter package IDs

### After Import

Once imported:
- New parameters are merged with your existing advanced configuration
- Products (if specified) are added to your current selection
- Main form settings remain unchanged
- You can review the configuration in the Advanced section

---

## Usage Examples

### Example 1: Basic Environment Setup

```yaml
CustomerID: 12345678
Environment: UAT
TcXVersion: 2506.0001
Company: Siemens Digital Industries
dnsSubdomainName: test-env-001
TcXAdminEmail: admin@example.com
NotificationEmailId: notify@example.com
ProcessTarget: 4
ProcessMax: 150
ProcessWarm: 2
Enable_SSO: true
TeamcenterProductIDList: TC7003-XT, TC30001-XT, TC20001-XT
```

### Example 2: Adding Custom Software

```yaml
AdditionalSoftware:
  - software_id: CUSTOM_INTEGRATION_001
    version: 3.2.1
    kit_file:
      lnx64: s3://bucket/path/to/linux-kit.zip
      wntx64: s3://bucket/path/to/windows-kit.zip
```

### Example 3: Configuring Service Endpoints

```yaml
TXPAccpEndpoints:
  adhoc:
    url: https://adhoc-service.customer.com
    sam_version: v2.3.0
  dim:
    url: https://dim-service.customer.com
    sam_version: v2.3.0

DSSHost: dss-primary.customer.com
SamHost: sam-primary.customer.com
```

---

## Environment Request Workflow

Upon submission of your environment request:

1. The request will be reviewed and approved by an onboarding administrator
2. Once approved, the provisioning process will be automatically initiated
3. Details of the newly provisioning environment will be available in the Environment Details view
4. You can monitor the status and access credentials once the environment is ready

---

**Note:** Ensure proper YAML formatting (2-space indentation) and verify that field values meet validation requirements before importing.

---

**Document Version**: 1.0.0  
**Last Updated**: November 19, 2025  
**Maintained By**: TCX Onboarding Portal Development Team
