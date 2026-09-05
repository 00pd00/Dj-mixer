# Upgrading an HA Environment

:::warning Prerequisites — Only proceed if the following condition is met
Only perform the steps on this page if the **`<CustomerID>-<Environment>-onboarding-tcx-helm` Helm application is in a Degraded state** in ArgoCD after the upgrade pipeline has completed. If the application is healthy and synced, no action is required.
:::

This page describes the additional steps required **after** the standard upgrade pipeline has completed, specifically for High Availability (HA) environments being upgraded to a new major version (for example, from **2506** to **2512** or later).

This procedure also applies if the **`tcx-onboarding` application is showing as Out of Sync in ArgoCD** after an HA environment upgrade. In that case, the PVCs from the previous version are still bound and blocking the new version from attaching storage — follow the steps below to resolve it.

> **What is a PVC?**  
> A Persistent Volume Claim (PVC) is a request for storage in Kubernetes. It reserves a piece of disk storage for the application. During an HA upgrade, old PVCs from the previous version must be removed and re-created so that the new version can attach fresh storage correctly.

:::note
Complete the [standard upgrade procedure](./000_Upgrading%20an%20existing%20Deployment.md) first. Only perform the steps on this page **after** the upgrade pipeline has finished successfully.
:::

## Steps for Upgrading an HA Environment

### Part 1 — After the Upgrade Pipeline

#### Step 1 — Complete shutdown of the tenant environment

Shut down the HA environment before making any changes. This ensures no services are running while you modify the storage configuration.

Refer to [Shutdown and restart workloads](../030_Day%20N%20Operations/030_Shutdown%20and%20restart%20workloads.md) for step-by-step shutdown instructions.

---

### Part 2 — Wait for 5 to 10 minutes after shutdown to ensure all resources are fully terminated before proceeding to the next steps. This is important to avoid conflicts when modifying PVCs in the next steps

Once done, perform the following steps in the tenant's Git repository.

#### Step 2 — Navigate to the tenant repository

Open the tenant Git repository for the deployment that was just upgraded. This is the same repository used during the original deployment.

---

#### Step 3 — Copy (back up) the current PVC and PV definitions

Before making any changes, save a copy of the existing file contents. You will need these exact contents later to restore the resources in Steps 8 and 9.

Open the following file and copy its entire contents to a safe location (for example, a local text file or a comment in your notes):

```
helm_charts/deploy/tc_deployutils/templates/volumeclaim.yaml
```

Also copy the contents of:

```
helm_charts/onboarding/onboard_tcx/templates/volumes.yaml
```

:::warning
Do **not** skip this step. If you empty the files without saving the contents first, you will not be able to restore the PVC and PV correctly in Steps 8 and 9.
:::

---

#### Step 4 — Empty the deploy utils PVC file

Open the following file in the tenant repository and **delete all of its contents**, leaving the file completely empty:

```
helm_charts/deploy/tc_deployutils/templates/volumeclaim.yaml
```

Save the file after clearing it.

---

#### Step 5 — Commit the change

Commit the now-empty `volumeclaim.yaml` to the repository:

```bash
git add helm_charts/deploy/tc_deployutils/templates/volumeclaim.yaml
git commit -m "Remove deploy utils PVC for HA upgrade"
git push
```

---

#### Step 6 — Sync

Trigger a sync via ArgoCD (or your configured GitOps tool) for the deploy utils application. Wait for the sync to complete and confirm that the old PVC has been removed from the cluster before continuing.

---

#### Step 7 — Empty the onboarding PV file, commit, and sync

Open the following file and **delete all of its contents**, leaving it completely empty:

```
helm_charts/onboarding/onboard_tcx/templates/volumes.yaml
```

Save the file, then commit and push:

```bash
git add helm_charts/onboarding/onboard_tcx/templates/volumes.yaml
git commit -m "Remove onboarding PVs for HA upgrade"
git push
```

Trigger a sync for the `tcx-onboarding` application in ArgoCD and wait for it to complete.

:::note
**If `tcx-onboarding` is Out of Sync:** This is expected behaviour in the HA upgrade scenario. The application shows as Out of Sync because the old PVs from the previous version are still present and cannot be re-used by the new version. Emptying this file (as done above) and syncing removes those stale PV definitions. The application will return to a healthy Synced state once the PVs are re-added in Step 8.
:::

Confirm the old onboarding PVs have been removed from the cluster before proceeding to the next step.

---

#### Step 8 — Re-add the onboarding PV definition and sync

Paste back the original PV contents (copied in Step 3) into the onboarding file:

```
helm_charts/onboarding/onboard_tcx/templates/volumes.yaml
```

Save the file, then commit and push:

```bash
git add helm_charts/onboarding/onboard_tcx/templates/volumes.yaml
git commit -m "Re-add onboarding PVs after HA upgrade"
git push
```

Trigger a sync for the `tcx-onboarding` application in ArgoCD. The PVs will be re-created in the cluster with the new version's storage configuration. Wait for the sync to complete and confirm the application shows **Synced** and **Healthy** in ArgoCD before continuing.

---

#### Step 9 — Re-add the deploy utils PVC definition and sync

Paste back the original PVC contents (copied in Step 3) into the deploy utils file:

```
helm_charts/deploy/tc_deployutils/templates/volumeclaim.yaml
```

Save the file, then commit and push:

```bash
git add helm_charts/deploy/tc_deployutils/templates/volumeclaim.yaml
git commit -m "Re-add deploy utils PVCs after HA upgrade"
git push
```

Trigger a sync for the deploy utils application in ArgoCD. The PVCs will be re-created in the cluster with the new version's storage configuration. Wait for the sync to complete and confirm the application shows **Synced** and **Healthy** in ArgoCD before continuing.

---

#### Step 10 — Restart the workload

Once all applications are synced and healthy, restart the tenant workload to bring the environment back online.

Refer to [Shutdown and restart workloads](../030_Day%20N%20Operations/030_Shutdown%20and%20restart%20workloads.md) and follow the **Restart** instructions.

After the restart completes, verify that all services are running as expected and that the application is accessible. The HA environment upgrade is now complete.
