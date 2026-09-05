## Manual update of Kubernetes labels

This section provides steps to change deprecated labels to adhere to XCR standards.

> **Note:** This manual step is needed for Essentials deployments but is already part of TC 2406 and subsequent releases.

For each production TcX Essentials deployment, perform the following steps:

1. Navigate to the tenant repo for the tenant and find the [namespace.yaml](https://gitlab.industrysoftware.automation.siemens.com/tcx-containers-deploy-automation/tcx-tenant-repos-customer/tcx1use3-prd/-/blob/main/helm_charts/onboarding/onboard_tcx/templates/namespace.yaml?ref_type=heads) file in the Helm chart repo. It is located in the onboarding chart folder structure.

    ![Screenshot showing namespace.yaml location](675-screenshot-20250103-044034.png)

2. Make modifications to the labels and values as shown below. The left side represents the default values, and the right side shows the new format required going forward.

    ![Screenshot showing label modifications](676-screenshot-20250103-044034.png)

3. ArgoCD will perform a sync of the namespace resource, which will push out the labels to the proper resources. This process typically takes around 5 minutes. If nothing happens, you can use the **Sync** button in ArgoCD to manually trigger the process.
