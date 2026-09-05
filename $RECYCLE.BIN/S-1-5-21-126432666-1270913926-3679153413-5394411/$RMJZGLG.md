## Helm YAML Updates required after teamcenter upgrade done

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

### Step 2: Modify `infra.yaml`

1. Open the following file: helm_charts/infra.yaml
2. Make necessary changes to include additional license servers.
3. Save the file after updating.

Refer to the image below:  
![Infra YAML Changes](image2.png)

---

### Step 3: Edit `values.schema.json`

1. Navigate to: helm_charts/onboarding/onboard_tcx/values.schema.json
2. Update this file to add schema entries for the additional license servers.
3. Save the changes once completed.

Refer to the image below:  
![Schema JSON Changes](image3.png)

### Step 4: Edit `values.yaml`

#### Step i: Verify `values.yaml` in GitLab

1. Login to **GitLab**.
2. Navigate to the file: helm_charts/teamcenter/values.yaml
3. Check that the following three sections contain all three license servers (`splmlicense`, `splmlicense2`, `splmlicense3`) with port `28000`:

- `tc-am-readexpression-manager`
- `tc-adminutils`
- `tc-tcserver`

4. The license format should look like: 

Refer to the image below for example format:  
![values.yaml license entry](image8.png)

> If entries are missing in any section, **edit the file and add them** to ensure consistency.

#### Step ii: Verify Values File on EFS (DC Server)

1. **login into the DC server**.
2. Navigate to the deployment directory: /`<customerID>-<envType>`/`<customerID>-<envType>`/deploy/
3. Open the values file present in this directory.
4. Check for `splmlicense` entries for all three license servers with port `28000`.

> If any license entry is missing, **update the file manually**.

---

### Step 4: Update `tc_profilevars`

1. Still on the **DC server**, go to: /`<customerID>-<envType>`/`<customerID>-<envType>`/teamcenter/tc_data/
2. Open the file: tc_profilevars
3. Ensure the following variables are set and correctly ordered:

```bash
UGII_LICENSE_FILE=28000@splmlicense2,28000@splmlicense3,28000@splmlicense,28001@test.license-service.prd.tcxservices.com
SPLM_LICENSE_SERVER=28000@splmlicense2,28000@splmlicense3,28000@splmlicense,28001@test.license-service.prd.tcxservices.com
```
📌 The master license server should always appear first in the list (i.e., splmlicense2 in this case).

4. Repeat this process to update tc_profilevars on other hybrid machines
   e.g. on dispatcher machine in `<TC_DATA>`/tc_profilevars.bat file need to repeat above process. Here, `<TC_DATA>` is location of tcdata folder on machine
