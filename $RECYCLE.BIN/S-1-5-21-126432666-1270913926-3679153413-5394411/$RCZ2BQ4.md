## Post-Upgrade Operations for Blue-Green Deployment

After the Blue-Green upgrade pipeline completes successfully and switchover is executed, perform the following post-deployment operations to ensure your upgraded environment is fully validated, secure, and optimized.

---

## 1. Overview

The post-upgrade phase focuses on:
- Validating the upgraded Green environment (now production)
- Managing the old Blue environment for rollback capability
- Updating passwords and security credentials
- Performing operational health checks
- Planning for cleanup and decommissioning

---

## 2. Immediate Post-Switchover Validation

### 2.1 Service Health Verification

Immediately after switchover, verify all critical services are operational:

#### Core Services
- [ ] FMS (File Management System) operational ( upload and download of files)
- [ ] AWC (Active Workspace Client) accessible
- [ ] SSO/Authentication working
- [ ] License server connectivity verified


### 2.2 User Access Testing

Perform end-user validation:
- [ ] Users can log in successfully
- [ ] File upload and download functional
- [ ] Reports generate as expected


---


## 3. Detailed Validation Procedures

### 3.1 FMS Validation

Verify File Management System operations:
- Upload test file to various pools 
- Download existing files from production data
- Verify file preview generation
- Test large file operations (>100MB)

### 3.2 License Validation

Confirm license server connectivity:
- Check available license pool
- Confirm license server logs show connections

---

## 4. Security and Credential Management

### 4.1 Password Updates

The Green environment initially uses the same passwords as the Blue environment. For security best practices, update the following credentials post-upgrade:

#### Affected Credentials
- **DC Server Password:** Deployment Center administrative access
- **infodba User:** Teamcenter database administrative user
- **tcxadmin User:** Teamcenter system administrator
- **cmdpred_dbpassword:** Command processor database credentials
- **tcservermanager_dbpassword:** Server manager database credentials
- **LDAP Password:** Directory service credentials

Refer to the [Secrets Table](../../020_Operations/110_Hashicorp%20Vault%20access%20for%20operator%20users/060_Secrets%20Table.md) for fetching paths of these secrets in Hashicorp Vault.

#### Password Rotation Procedure
Follow the [Day N Password Rotation](../../020_Operations/050_Password%20Maintenance/020_On_Demand_Update/040_Day%20N%20Password%20Rotation/000_Intro.md) guide for detailed password update procedures.

**⚠️ Important:** Change passwords in a controlled manner to avoid service disruption. Update Vault secrets first, then apply to services sequentially.

---

## 5. Blue Environment Management

### 5.1 Retain Blue for Rollback

**⚠️ Critical:** Do NOT decommission the old Blue environment immediately after switchover.

Retention recommendations:
- **Minimum:** Retain for 7 days post-switchover
- **Recommended:** Retain for 30 days
- **Extended:** Retain until next scheduled maintenance window

During retention period:
- Keep Blue environment stopped using below steps
- Shutdown the environment using the `Complete Teamcenter deployment` workload. Refer to [Shutdown and restart workloads](../030_Day%20N%20Operations/030_Shutdown%20and%20restart%20workloads.md) for detailed instructions.
- Maintain all snapshots and backup data
- Do NOT delete any resources
- Monitor for any rollback requirements

### 5.2 Rollback Procedure (If Needed)

If critical issues are discovered in Green environment:

#### Immediate Rollback Steps
1. **Stop accepting new operations** in Green
2. **Switch DNS/Load Balancer back to Blue**
3. **Restart Blue environment** (if stopped)
4. **Verify Blue services** are healthy
5. **Communicate rollback** to stakeholders
6. **Document rollback reason** in incident report

#### Post-Rollback Actions
- Analyze root cause of Green environment issues
- Fix problems in non-production environment
- Plan remediation upgrade
- Schedule new upgrade attempt

### 5.3 Cleanup and Decommissioning

Once Green environment is confirmed stable (after retention period):

#### Decommission Blue Environment

- Run the destroy pipeline for the tenant in tcx-pipeline-tenant. ( Using PipelineStage: destroy )

---

## 6. Monitoring and Alerting

Set up or verify monitoring for the upgraded environment:


---

## 7. Day N Operations

Manage the Green environment like any other production deployment for all subsequent Day N operations.

For post-deployment operational activities, refer to:
- [Day N Operations](../030_Day%20N%20Operations/000_Day%20N%20Operations.md)


---


