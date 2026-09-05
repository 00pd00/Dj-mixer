### Pre-Requisites for Datadog Setup

Before you set up monitors, alerts, SLOs, or dashboards in Datadog, make sure these prerequisites are complete:

---

#### 1. Cloud Provider Integration

This is an <u>**one time**</u> setup to enable the AWS and Azure resources to send metrics to Datadog.
Needs to be done when a new AWS, Azure account is used for creating Teamcenter X deployments.

Check that integration with your cloud provider is complete.

##### 1. Verify in Datadog if the cloud provider account is already onboarded.
  - [AWS cccounts already onboarded to Datadog](https://pillar0-siemens.datadoghq.com/integrations?category=AWS&integrationId=amazon-web-services)
  - [Azure accounts already onboarded to Datadog](https://pillar0-siemens.datadoghq.com/integrations?category=Azure&integrationId=azure&panel=issues&tab=configuration)

##### 2. If the Account is not already onboarded, follow the link below for instructions to onboard
  - [Onboard AWS account to Datadog](./010_Datadog%20-%20AWS%20Integration.md)
  - [Onboard Azure account to Datadog](./015_Datadog%20-%20Azure%20Integration.md)

---

#### 2. Datadog Agent Installation

- The TCX deployment pipeline installs Datadog Agents on Linux and Windows VMs automatically, allowing metrics to be collected.
- Note: System logs are enabled by default on these machines.
- By default, Datadog Agents capture metrics and logs from services on the XCR cluster.

---

#### 3. Customer Onboarding/Offboarding

- For onboarding or offboarding actions, see [SRE Onboarding Operations](../../020_Operations/030_Day%20N%20Operations/200_SRE%20Onboarding%20operations.md).
