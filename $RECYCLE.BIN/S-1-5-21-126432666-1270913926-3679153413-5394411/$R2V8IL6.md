# NetApp Failover Mechanism

### 1. Shutdown the Environment

Shutdown the environment using the `Complete Teamcenter deployment` workload. Refer to [Shutdown and restart workloads](./030_Shutdown%20and%20restart%20workloads.md) for detailed instructions.

---

### 2. Break the Replication Peering from Replica Volume

- Activate your Contributor access using Privileged Identity Management (PIM) if necessary.
- Navigate to tcx-tenant-< tenant >-< env-type >-anf-volume-replica

![Image](./image_424.png)

- Click on **Replication** under Storage Service.
- Click on **Break peering** type **yes** and click on break to **Break** the replication from the replica volume.

![Image](./image_400.png)

- Wait for the peering to be broken.

![Image](./image_438.png)

---

### 3. Update infra.yml

- Get the replica volume IP address from the Azure portal.
- Navigate to the replica volume (tcx-tenant-< tenant >-< env-type >-anf-volume-replica) in the Azure portal.
- Copy the IP address from **Mount path** field on the **Overview** tab.

![Image](./image_445.png)



In the tenant repo, update the `<tenant-repo>/helm_charts/infra.yaml` file with the replica volume IP address.
**Specifically, update the `server` field under `storage.config.user_volume.driver_config.nfs`** to point to the replica NetApp volume IP.

Refer the commit: [Edit infra.yaml updated replica anf volume IP](https://gitlab.industrysoftware.automation.siemens.com/tcx-containers-deploy-automation/tcx-tenant-repos-dev/pratst01-prd/-/commit/fc510256f96d272bf0bb271610a4c9a4f5c94737#f6ceafe9052ca03ee1e3b67ca812a72da79f13e4_151_150)

![Image](./image_439.png)

#### Expected Error in ArgoCD After the Update

After updating, the `<tenant id>-<env type>-onboarding-tcx-helm` application will get **OutOfSync** with the following error:


![Image](./image_401.png)

---

### 4. Resolve the OutOfSync Issue

In order to sync these, edit the pvc to remove the protection in uservolume pv which is attached to NetApp volume

### i. Remove Protection and Delete PVC/PV

#### a. Remove the protection.

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

### ii. Synchronize to Recreate and Remount to replica Volume

- Synchronize so that the PV and PVC are recreated and mounted to the replica volume.
- In the argoCD, navigate to `<tenant id>-<env type>-onboarding-tcx-helm` application. 

![Image](./image_431.png)

- Search for `tc-uservolume-pv-<env type>-<tenant id>` and click on it.

![Image](./image_432.png)

- Click on `SYNC` button.

![image](./image_434.png)

- Click on `SYNCHRONIZE` button to confirm synchronization.

![Image](./image_435.png)

After synchronization, verify that the PV is recreated with replica volume IP.

![Image](image_446.png)

---

### 5. Restart the Environment

Restart the environment using the `Complete Teamcenter deployment` workload. Refer to [Shutdown and restart workloads](./030_Shutdown%20and%20restart%20workloads.md) for detailed instructions.

---
