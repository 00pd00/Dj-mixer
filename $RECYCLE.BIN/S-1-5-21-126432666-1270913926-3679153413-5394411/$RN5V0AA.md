
# Ansible Template Input Guide

This guide helps both technical operators and end users navigate the process step-by-step, while ensuring clarity, compliance, and error-free configuration.

---

## Quick Start Summary

Follow these steps to prepare your Ansible template input:

1. Select the correct Ansible template (dry-run or production) from the [Ansible Templates Table](../../020_Basic%20Flow/020_Ansible%20Templates%20Table.md).
2. Gather customer-specific onboarding information and required GitLab credentials.
3. Prepare your input using the recommended YAML format.
4. Validate all entries prior to launching the playbook.

---

## Selecting the Ansible Template

Refer to the [Ansible Templates Table](../../020_Basic%20Flow/020_Ansible%20Templates%20Table.md) to choose between **dry-run** or **production** templates based on your deployment requirements.

---

## Customer Input Requirements

When launching the Ansible playbook, you must provide the following:
- **Onboarding Information:** Details specific to your tenant or customer environment.
- **GitLab Credentials:** Personal access token for authenticating with GitLab (refer [Create a Personal Access Token](#creating-a-personal-access-token-for-gitlab)).

**Input Format:**  
It is highly recommended to use **YAML** for clarity and validation. Refer to samples for AWS or Azure below.

- **AWS Format:** [AWS Sample Customer Input Key-Value Pair Format](./010_AWS%20Customer%20Input.md)
- **AZURE Format:** [AZURE Sample Customer Input Key-Value Pair Format](./020_AZURE%20Customer%20Input.md)

---

### Customer Input Parameters

Below are parameters to set for different deployment types. Always validate these inputs prior to deployment.

#### TcX Standard Deployment

| Key                     | Value   | Description                                                                                     |
|-------------------------|---------|-------------------------------------------------------------------------------------------------|
| TeamcenterProductIDList | TC7100  | List of Teamcenter product IDs.                                                                 |
| DeployDispatcher        | true    | Set to "true" to deploy Dispatcher on "WindowsServer1" (mandatory for TcX Standard deployments). |

#### TcX Advanced Deployment

| Key                     | Value   | Description                                                                                     |
|-------------------------|---------|-------------------------------------------------------------------------------------------------|
| TeamcenterProductIDList | TC7101  | List of Teamcenter product IDs.                                                                 |
| DeployDispatcher        | true    | Set to "true" to deploy Dispatcher on "WindowsServer1" (mandatory for TcX Advanced deployments). |

---

## Creating a Personal Access Token for GitLab

You must provide a GitLab **Personal Access Token (PAT)** in your Ansible input to trigger pipeline operations.

#### Step-by-step Procedure

1. Access [GitLab](https://gitlab.industrysoftware.automation.siemens.com).
2. On the left sidebar, select your **avatar**.
3. Select **Edit profile**.
4. In the sidebar, click on **Access Tokens**.
5. Click **Add new token**.
6. Enter a **name** and **expiry date** for the token.
    - Tokens expire at midnight UTC of the selected date.
    - Omitting an expiry date will automatically set it to 365 days from today's date (maximum allowed).
7. Assign the following permissions:
    - `api`
    - `read_api`
    - `read_user`
    - `read_repository`
    - `write_repository`
    - `read_registry`
    - `write_registry`
8. Click **Create personal access token**.

> **IMPORTANT**
> Save your personal access token securely. Once you leave the page, you cannot retrieve or view the token again. Always provide this token in the GitLab PAT field during launch.

---

## ServerPool Property Settings for Container Environments

When deploying Teamcenter in a containerized environment, the **Kubernetes (K8s) cluster** manages Tc Server instances, not the PoolManager directly.

#### Key Changes

- **ServerPool Properties:**  
  - `PROCESS_MAX`: Maximum number of TcServers (warm + assigned) allowed across deployment. As the total approaches this limit, available "warm" servers reduce.
  - `PROCESS_TARGET`: Now represents the count of "warm" TcServer Deployment Replicas, not the total server count.
  - `PROCESS_WARM`: Used for the TcServer Deployment Replica count. Greater value between `PROCESS_WARM` and `PROCESS_TARGET` is applied.

---
## Support for multiple pool managers
Starting from 2606 release TcX supports multiple pools. When the value of ProcessMax input parameter exceeds pool block size (default value 2000), it is divided into multiple pools. Note that the values for ProcessTarget and ProcessWarm are applied to each pool without any division.

The table below shows how the ProcessMax is divided across pools:

| Pipeline Input                                                            | Pools Computations      |
| :------------------------------------------------------------------------ | :--------------------- |
| **ProcessMax:** 4000<br/>**ProcessWarm:** 100<br/>**ProcessTarget:** 0700 200, 1800 100 | **Number of pools =** 2<br/>**Pool1 Configuration**<br/>&nbsp;&nbsp;ProcessMax: 2000<br/>&nbsp;&nbsp;ProcessWarm: 100<br/>&nbsp;&nbsp;ProcessTarget: 0700 200, 1800 100<br/>**Pool2 Configuration**<br/>&nbsp;&nbsp;ProcessMax: 2000<br/>&nbsp;&nbsp;ProcessWarm: 100<br/>&nbsp;&nbsp;ProcessTarget: 0700 200, 1800 100<br/> |
| **ProcessMax:** 2055<br/>**ProcessWarm:** 80<br/>**ProcessTarget:** 0700 150, 1800 100 | **Number of pools =** 2<br/>**Pool1 Configuration**<br/>&nbsp;&nbsp;ProcessMax: 1028<br/>&nbsp;&nbsp;ProcessWarm: 80<br/>&nbsp;&nbsp;ProcessTarget: 0700 150, 1800 100<br/>**Pool2 Configuration**<br/>&nbsp;&nbsp;ProcessMax: 1028<br/>&nbsp;&nbsp;ProcessWarm: 80<br/>&nbsp;&nbsp;ProcessTarget: 0700 150, 1800 100<br/>***Note:*** *ProcessMax is divided into two and rounded off to the next integer.* |


The ProcessMax value can be adjusted during updates or maintenance. When this occurs, number of pools is adjusted (added or deleted) to reflect the new ProcessMax setting.

---
#### Overriding Default Pool Block Size (Development Use Only)

For development and validation purposes, the default pool block size (which is `2000`) can be overridden. You can do this by specifying the `TcServerPoolBlockSize` parameter in your pipeline inputs.

**Important Considerations:**

*   **Exercise caution** when overriding this value, as it directly impacts pool configuration.
*   The `ProcessMax` value is divided into multiple pools, with the `TcServerPoolBlockSize` determining the size of each.
*   `ProcessTarget` and `ProcessWarm` values are applied **per pool**, not globally.
*   The effective value of `ProcessMax` per pool should be greater than `ProcessTarget` and `ProcessWarm` values. **Failure to do so may cause the deployment pipeline to fail during the pre-deploy stage, potentially making it unrecoverable.**

Below table shows a few computations of pool configuration:
| Pipeline Input                                                            | Pools Computations     | Valid?                |
| :------------------------------------------------------------------------ | :--------------------- |:--------------------- |
| **ProcessMax:** 50<br/>**ProcessWarm:** 20<br/>**ProcessTarget:** 0700 30, 1800 20<br/>**TcServerPoolBlockSize:** 30 | **Number of pools =** 2<br/>**Pool1 Configuration**<br/>&nbsp;&nbsp;ProcessMax: 25<br/>&nbsp;&nbsp;ProcessWarm: 20<br/>&nbsp;&nbsp;ProcessTarget: 0700 30, 1800 20<br/>**Pool2 Configuration**<br/>&nbsp;&nbsp;ProcessMax: 25<br/>&nbsp;&nbsp;ProcessWarm: 20<br/>&nbsp;&nbsp;ProcessTarget: 0700 30, 1800 20<br/> | ***Invalid*** - since effective ProcessMax - 25 is less than ProcessTarget value - 30 |
| **ProcessMax:** 180<br/>**ProcessWarm:** 25<br/>**ProcessTarget:** 0000 115<br/>**TcServerPoolBlockSize:** 8 | **Number of pools =** 23<br/>**Pool1 Configuration**<br/>&nbsp;&nbsp;ProcessMax: 8<br/>&nbsp;&nbsp;ProcessWarm: 25<br/>&nbsp;&nbsp;ProcessTarget: 0000 115<br/>**Pool2 Configuration**<br/>&nbsp;&nbsp;ProcessMax: 8<br/>&nbsp;&nbsp;ProcessWarm: 25<br/>&nbsp;&nbsp;ProcessTarget: 0000 115<br/> | ***Invalid*** - since effective ProcessMax - 8 is less than ProcessTarget value - 115 |
| **ProcessMax:** 400<br/>**ProcessWarm:** 10<br/>**ProcessTarget:** 0000 10<br/>**TcServerPoolBlockSize:** 100 | **Number of pools =** 4<br/>**Pool1 Configuration**<br/>&nbsp;&nbsp;ProcessMax: 100<br/>&nbsp;&nbsp;ProcessWarm: 10<br/>&nbsp;&nbsp;ProcessTarget: 0000 10<br/>**Pool2 Configuration**<br/>&nbsp;&nbsp;ProcessMax: 100<br/>&nbsp;&nbsp;ProcessWarm: 10<br/>&nbsp;&nbsp;ProcessTarget: 0000 10<br/>**Pool3 Configuration**<br/>&nbsp;&nbsp;ProcessMax: 100<br/>&nbsp;&nbsp;ProcessWarm: 10<br/>&nbsp;&nbsp;ProcessTarget: 0000 10<br/>**Pool3 Configuration**<br/>&nbsp;&nbsp;ProcessMax: 100<br/>&nbsp;&nbsp;ProcessWarm: 10<br/>&nbsp;&nbsp;ProcessTarget: 0000 10<br/> | ***Valid*** |
---
## Product ID List & Software Integration Versions

- For a full list of supported Product IDs, refer to: [Product ID list](https://gitlab.industrysoftware.automation.siemens.com/tcx-deploy/tc-version-manifests/-/blob/main/tc-pid2qd-configuration/TcXProductIDsToPackages.csv?ref_type=heads)
- Software and integration versions are documented in: [teamcenter_install_kit_config.json](https://gitlab.industrysoftware.automation.siemens.com/tcx-deploy/tc-version-manifests/-/blob/main/tcx-configuration/teamcenter_install_kit_config.json?ref_type=heads)
- Tenant-specific details can be found in the [Tenant Repo](https://gitlab.industrysoftware.automation.siemens.com/tcx-containers-deploy-automation/tcx-tenant-repos-customer)

---

## Validation Steps

Always check your customer input and configuration values before initiating deployment:

- Confirm all required fields are populated using the sample YAML format.
- Validate GitLab credentials and permissions.
- Cross-reference Product IDs and software versions with official lists.
- Ensure server pool properties are correctly configured for container deployment.
- Save all tokens and credentials securely.
- Review values for logical consistency and compliance.

---

## Troubleshooting Tips

- If deployment fails, verify all required input fields and permissions.
- Check server pool settings for appropriate replica counts.
- For credential errors, regenerate your GitLab token and re-enter details.
- Consult referenced sample formats and official documentation for clarification.