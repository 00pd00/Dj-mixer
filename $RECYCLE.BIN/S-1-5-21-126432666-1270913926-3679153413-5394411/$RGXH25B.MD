### Troubleshooting - New XCR Kubernetes Cluster Tenants in Unknown State in ArgoCD

#### Issue Description

Deployments may appear in Rancher but not in ArgoCD due to missing cluster entries in the allowed destinations of the `tcx-stormruntime-helm` project in ArgoCD.

#### Steps to Resolve

1. **Request Fix**  
    Open the [FDSOne Help Center XCR Request Link](https://fdsone.atlassian.net/servicedesk/customer/portal/26/group/34/create/107).  
    Fill in the form with the following values:
    - **Summary**: Deployments on cluster `<ClusterName>` are not visible in ArgoCD
    - **Description**:
      - **Region**: `<Region in which you need EKS cluster>`
      - **Cluster Name**: `<ClusterName>`
      - **Namespace**: `prd-*`, `dev-*`, `uat-*`
      - **Details**: Deployments are in an unknown state due to missing cluster entries in the allowed destinations of the `tcx-stormruntime-helm` project in ArgoCD.  
         Provide the ArgoCD error URL.

    Attach a screenshot of the error:  
    ![Image](./image_71.png)

2. **Follow-Up**  
    Coordinate with the XCR team for the status and provide additional information if required.

    ![Image](./image_72.png)  