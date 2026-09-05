## Manual Istio Version Upgrade

This section provides steps to manually upgrade the Istio version for a specific tenant.

### Shutdown Teamcenter Workload

Before upgrading the Istio version, the complete Teamcenter workload has to be shut down.

1. Trigger [Shutdown and restart workloads](../030_Day%20N%20Operations/030_Shutdown%20and%20restart%20workloads.md)

    - **Workload:** Complete Teamcenter Workload
    - **Action:** Shutdown

2. Once the shutdown is successful, follow the process below.

### Update `infra.yaml`

1. Go to the tenant Git repository.
2. Navigate to `helm_charts/infra.yaml`.
3. Replace `istio.io/rev: prod-stable` with `istio.io/rev: prod-canary` in `infra.yaml`. Ensure that `istio.io/rev: prod-canary` is inside the `istioLabels` block.
4. Commit the change to the main branch.
5. Wait for ArgoCD to reconcile.

### Validate ArgoCD Config

1. Go to ArgoCD.
2. Navigate to the onboarding chart of your specific tenant, e.g., `<tenant_id>-<env_type>-onboarding-tcx-helm`.
3. Find the tenant namespace in ArgoCD as shown below:  
    ![Image](./image_356.png)

4. Click on the namespace `ns` component and scroll down to see the live manifest.
5. Check if the manifest contains `istio.io/rev: prod-canary`. If not, wait until ArgoCD reconciles with the tenant repo change.  
    ![Image](./image_357.png)

6. Once you see this label, consider that the tenant namespace is now mapped to the new Istio version. To point all the pods and deployments to the updated Istio version, you need to restart the workload as shown in the following section.

### Restart Teamcenter Workload

After performing the above tasks, the complete Teamcenter workload has to be restarted.

1. Trigger [Shutdown and restart workloads](Shutdown%20and%20restart%20workloads)

    - **Workload:** Complete Teamcenter Workload
    - **Action:** Restart
