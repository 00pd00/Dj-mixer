## Helm YAML Updates for Additional License Servers

This document provides step-by-step instructions to add additional license servers by modifying Helm chart files in the GitLab repository.

---

### Prerequisites

- GitLab account with **write access** to the target repository

---

### Step 1: Access the GitLab Repository

1. Log in to GitLab.
2. Navigate to the repository: `<customerID>-<env>`. Replace `<customerID>` and `<env>` with appropriate values.
3. This repository contains the Helm YAML files for the environment.

Refer to the image below:  
![Repository Access](image1.png)

---

### Step 2: Modify helm_charts/infra.yaml using operation run

For Operation Run Command Template link, please refer to [Ansible Templates Table](https://ctcx.code.siemens.io/cookbook/docs/Documentation/Tenant%20Onboarding/Basic%20Flow/Ansible%20Templates%20Table/) Run Operation Run Command Template with below survey parameter.

**Note**: Update the IPs with your server1, server2, and server3 created at earlier stage [Create extra VMs-AWS](https://ctcx.code.siemens.io/cookbook/docs/Documentation/Operations/Upgrading%20an%20existing%20Deployment/Setup%20triad%20license%20for%20HA%20environments/Create%20extra%20VMs/AWS) OR [Create extra VMs-Azure](https://ctcx.code.siemens.io/cookbook/docs/Documentation/Operations/Upgrading%20an%20existing%20Deployment/Setup%20triad%20license%20for%20HA%20environments/Create%20extra%20VMs/AZURE)
```yaml
Description: 
CustomerID: 
Environment: 
StreamId: 
TcxCliRequirement: 
PipelineStage: operations
PipelineVariableVersion: 
PipelineVersion: 
TcXVersion: 
OperationsAction: update_values_override
OverrideInputs:
  ValuesOverride:
    global:
      env:
        SPLM_LICENSE_SERVER_IP: 10.24.255.133
        SPLM_LICENSE_SERVER_IP2: 10.24.255.120
        SPLM_LICENSE_SERVER_IP3: 10.24.255.110
```
---

### Step 3: Edit `values.schema.json`

1. Navigate to: helm_charts/onboarding/onboard_tcx/values.schema.json
2. Update this file to add schema entries for the additional license servers.
3. Save the changes once completed.

Refer to the image below:  
![Schema JSON Changes](image3.png)

---

### Step 4: Add License Template Files

1. Go to the templates directory: helm_charts/onboarding/onboard_tcx/templates/
2. Create two new files modeled after `splm_license.yaml`:
- `splm_license2.yaml`
- `splm_license3.yaml`

Refer to the image below:  
![Template File Creation](image4.png)

---

### Step 5: Add Content to New Files

- `splm_license2.yaml` should have the content shown below:  
📷 ![License 2 YAML](image5.png)

- `splm_license3.yaml` should have the content shown below:  
📷 ![License 3 YAML](image6.png)







