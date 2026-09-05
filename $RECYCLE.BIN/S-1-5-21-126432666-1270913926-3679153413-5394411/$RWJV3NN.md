# Post-Deploy Configuration for PolarionX Integration with TeamcenterX

**Applicable Product IDs:** PLN1501

> **Note:**  
> This configuration is required only if PolarionX is deployed in a separate VPC from the TcX tenant-specific VPC on AWS.

This document guides you through the necessary post-deployment configurations to integrate PolarionX with an existing TcX deployment.

---

## How to Get NAT Gateway IP of PolarionX VPC

1. Access the AWS account where PolarionX is deployed.
2. Open the **VPC** service.
3. Enter the VPC ID of the tenant used for PolarionX deployment in the filter.
4. On the VPC dashboard, note the **Primary Public IPv4 address** for subsequent steps.
   ![View Primary Public IPv4 for PolarionX](./image_279.png)

---

## ALB Configuration

Update AWS Application Load Balancer (ALB) rules using the pipeline operation `update_alb_rules`.

### Steps

#### 1. Prepare the Customer Input File

Create a file with the details of the ALB rule updates. Example:

```
CustomerID: u1234567
Description: updating alb rules
CellId: <cell id>
Environment: <environment id>
PipelineStage: operations
PipelineCloud: <cloud id>
TcXVersion: <tc version manifest branch/tag>
OperationsAction: update_alb_rules
AddWhitelistRules: # List of paths and associated IPs to whitelist
  - Path: /tc/abc/path1
    IPs:
      - 10.0.0.1/32
      - 10.1.0.1/32
  - Path: /
    IPs:
      - 121.241.69.194/24
DeleteWhitelistRules: []
PipelineVersion: <pipeline version branch/tag>
```

#### 2. Run the Operation from Ansible Tower

Execute the relevant template using Ansible Tower:

```
TcX.Operations.RunCommands-<version>
```

Provide the input file created in the previous step.

#### 3. Verify ALB Update

When execution finishes successfully, the ALB rules will be updated as defined.

**Notes:**
- The pipeline applies all rules listed in the input file.
- `AddWhitelistRules` — Adds new ALB rules.
- `DeleteWhitelistRules` — Removes existing rules previously added.
- You must specify at least one of `AddWhitelistRules` or `DeleteWhitelistRules`. If omitted, operation will fail with:  
  **Either AddWhitelistRules or DeleteWhitelistRules is mandatory for action 'update_alb_rules'**
- Paths other than the default path `/` require a CIDR range of `/32`. If not used, you’ll get:  
  **Invalid IP address format**
- AWS allows a maximum of 100 rules.

---

## FMS Client-Map Configuration

Edit the FMS client-map to allow PolarionX VPC connectivity with TcX:

Update `<EFS-volume-mount>/deploy/component/config/fmsmaster/fsc/fmsmaster_FSC_fmsmaster.xml` by adding:

```xml
<clientmap cidr="3.216.55.81/32">
     <assignedfsc fscid="fsc_loadbalancer_fmsmaster" priority="0"/>
</clientmap>
```

After editing, run the Restart workflow as described in [Shutdown and restart workloads](../../020_Operations/030_Day%20N%20Operations/030_Shutdown%20and%20restart%20workloads.md).

> **Note:**  
> During environment upgrades or updates, this setting may be overwritten. Review and reapply the configuration if necessary.

---

## Validation Steps

1. On the PolarionX server, log in with a user allowed to create and edit documents.
2. Create a new document.<br/>
   ![Create New Document in PolarionX](./image_280.png)
3. In the **Actions** menu, select **Publish to Teamcenter**.
   ![Publish to Teamcenter Menu](./image_281.png)
4. After authentication, click the **Publish** button.
   ![Click Publish Button](./image_283.png)
5. Confirm that the publishing completes successfully.
   ![Successful Publish](./image_283.png)
