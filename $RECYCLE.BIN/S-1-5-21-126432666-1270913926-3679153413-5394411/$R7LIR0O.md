## License Configuration Verification Guide

This document provides steps to verify and update license server entries (`splmlicense`) across key configuration files in both GitLab and the DC server.

---

### Step 1: Verify `values.yaml` in GitLab

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

---

### Step 2: Verify Values File on EFS (DC Server)

1. **Login to DC server / Linux VM or EC2**.
2. Navigate to the deployment directory: /`<customerID>-<envType>`/`<customerID>-<envType>`/deploy/components/helm/teamcenter
3. Open the values file present in this directory.
4. Check for `splmlicense` entries for all three license servers with port `28000`.

> If any license entry is missing, **update the file manually**.

---

### Step 3: Verify `tc_profilevars` on DC Server

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
