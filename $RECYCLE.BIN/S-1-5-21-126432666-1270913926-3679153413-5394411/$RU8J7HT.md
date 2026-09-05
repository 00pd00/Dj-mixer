# NetApp Failback Mechanism

**Reference Documentation:** [Resync volumes after disaster recovery](https://learn.microsoft.com/en-us/azure/azure-netapp-files/cross-region-replication-manage-disaster-recovery#resync-replication)

---

## 1. Resync Volumes After Disaster Recovery

### a. Disable the Backup Policy

- Activate your Contributor access using Privileged Identity Management (PIM) if necessary.
- Navigate to tcx-tenant-< tenant >-< env-type >-anf-volume

![Image](./image_440.png)

- Click the **Backups** tab under the Storage Service.
- Click on **Configure Backups**
- Select **Disabled**
- And click **OK** button to disable the backup policy.

![Image](./image_407.png)

- Wait for the backup policy to be disabled.

![Image](./image_408.png)

---

### b. Reverse-Resync

After disabling the backup policy, the reverse resync option is now enabled.

- Click on **Replication** under Storage Service. You will see that the **Reverse Resync** option is now enabled.

![Image](./image_409.png)

- Click on **Reverse Resync**. Type **Yes** , then click **OK**.

![Image](./image_410.png)

- Wait for the reverse resync to complete.

![Image](./image_441.png)

- After completion of reverse resync, ensure that **Mirror State** shows **Mirrored**.

![Image](./image_413.png)

---

## 2. Reestablish Source-to-Destination Replication

After the resync operation from destination to source is complete, you need to break replication peering again to
reestablish source-to-destination replication.

### i. Break the Replication Peering

a. Select the destination volume.

- Navigate to tcx-tenant-< tenant >-< env-type >-anf-volume and click on it.

![Image](./image_437.png)

b. Check the following fields before continuing:

- Ensure that **Mirror State** shows **Mirrored**.
- Ensure that **Relationship Status** shows **Idle**.

![Image](./image_413.png)

c. Select **Replication** under Storage Service.

d. Select **Break Peering**.

e. Type **Yes** when prompted, then select **Break**.

![Image](./image_414.png)

Wait for the peering to be broken.

![Image](./image_425.png)

---

### ii. Resync the Source Volume with the Destination Volume

a. Select the *destination* volume (tcx-tenant-< tenant >-< env-type >-anf-volume-replica). Select **Replication** under **Storage Service**. Then select **Reverse Resync**.

b. Type **Yes** when prompted, then select **OK**.

![Image](./image_415.png)

Wait for the reverse resync to complete.

![Image](./image_416.png)

---

### iii. Enable the Backup for Source Volume

Re-enable the backup policy on the source volume.

a. Select the *source* volume (tcx-tenant-< tenant >-< env-type >-anf-volume). Select **Backups** under Storage Service. 

b. Then click on **Configure Backups**. 

c. Then select **Enabled**. Then click **OK**.

![Image](./image_417.png)

Wait for the backup policy to be enabled.

![Image](./image_426.png)


---

## 3. Remount the Source Volume to Pods

### i. Shutdown the Environment

Shut down the environment using the `Complete Teamcenter deployment` workload. Refer to [Shutdown and restart workloads](./030_Shutdown%20and%20restart%20workloads.md) for detailed instructions.

---

### ii. Update the infra.yml with the Source Volume IP

- Get the source volume IP address from the Azure portal.
- Navigate to the source volume (tcx-tenant-< tenant >-< env-type >-anf-volume) in the Azure portal.
- Copy the IP address from **Mount path** field on the **Overview** tab.

![Image](./image_442.png)

In the tenant repo, update the `<tenant-repo>/helm_charts/infra.yaml` file with the source volume IP address.
**Specifically, update the `server` field under `storage.config.user_volume.driver_config.nfs`** to point to the source volume IP.

Refer the commit: [Edit infra.yaml updated source anf volume IP](https://gitlab.industrysoftware.automation.siemens.com/tcx-containers-deploy-automation/tcx-tenant-repos-dev/pratst01-prd/-/commit/6bd2c2a0d60117d7c015a9b7a1452db90ce22fa6#f6ceafe9052ca03ee1e3b67ca812a72da79f13e4_151_150)

![Image](./image_423.png)

---

### iii. Remove Protection and Delete PVC/PV

#### a. Remove protection.

- In the argoCD, navigate to `<tenant id>-<env type>-deploy-tcx-helm` application. 

![Image](./image_428.png)

- Search for `tc-uservolume-pvc` and click on it.

![Image](./image_429.png)

- Edit the YAML, click on `EDIT` button and remove the following lines as shown in image below:

![Image](./image_427.png)

- After removing, click on save button to save the changes.

![Image](./image_418.png)


##### b. Delete the PVC and PV

- After removing the protection, delete the uservolume pv and pvc.
- In the argoCD, navigate to `<tenant id>-<env type>-onboarding-tcx-helm` application. 

![Image](./image_431.png)

- Search for `tc-uservolume-pv-<env type>-<tenant id>` and click on it.

![Image](./image_432.png)

- Delete the PV by clicking on `DELETE` button and typing what it asks to confirm deletion then click `OK`.

![Image](./image_430.png)

- Similarly, delete the PVC by navigating to `<tenant id>-<env type>-deploy-tcx-helm` application.

![Image](./image_428.png)

- Search for `tc-uservolume-pvc` and click on it.

![Image](./image_429.png)

- Delete the PV by clicking on `DELETE` button and typing what it asks to confirm deletion then click `OK`.

![Image](./image_433.png)

---

### iv. Synchronize to Recreate and Remount to Source Volume

- Synchronize so that the PV and PVC are recreated and mounted to the source volume.
- In the argoCD, navigate to `<tenant id>-<env type>-onboarding-tcx-helm` application. 

![Image](./image_431.png)

- Search for `tc-uservolume-pv-<env type>-<tenant id>` and click on it.

![Image](./image_432.png)

- Click on `SYNC` button.

![Image](./image_434.png)

- Click on `SYNCHRONIZE` button to confirm synchronization.

![Image](./image_435.png)

After synchronization, verify that the PV is recreated with source volume IP.

![Image](./image_436.png)

---

### v. Restart the Environment

Restart the
environment using the `Complete Teamcenter deployment` workload. Refer to [Shutdown and restart workloads](./030_Shutdown%20and%20restart%20workloads.md) for detailed instructions.

---



