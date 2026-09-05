**Post-deploy failures (404/502) where deployutils is Degraded**


**Issue Description:** During post-deploy failures (404/502), it is seen that deployutils reports as Degraded. This section guides on below scenarios:

1. How to safely restart the `deployutils` Job from ArgoCD and verify whether it failed?
2. What to do if the pod hasn't gotten into Running state and has no logs/events about any issues even after the restart and how to describe the pod via Rancher to obtain the root cause (Events/Reason/ExitCode)?
3. What to do if the FSC container successfully started, but deployutils failed to communicate with FSC within a pre-configured time interval?


**WorkAround**
1. Steps to delete the deployutils job in ArgoCD:
    - Launch ArgoCD.
    - Select the ArgoCD Deploy Application of the tenant(e.g., azy092-prd-deploy-tcx-helm). 
    - In the tree, find **`tc-deployutils-1`** (Job).
    - Click on `Actions → Delete` (forces a clean restart from the Job).
        ![Image](./image_450.png)
    - Watch the **Logs**:
        ![Image](./image_451.png)


2. If there are No logs even after restart
    - Open Rancher (specific to the deployed region).
    For example: [Rancher EU Central 1](https://k8s.prod.eu-central-1.kaas.sws.siemens.com/dashboard/c/c-vdvpx/explorer/event)
    - Use Rancher to investigate the root cause.
    - Use Rancher to describe the pod and check for the errors in the Events section of the describe pod output:
        - Open kubectl shell in Rancher
        - Run below commands
    
    ```
    kubectl -n <namespace> get pods
    kubectl -n <namespace> describe pod <deployutils-pod>
    # For example:
    kubectl get pods -n prd-azy092
    kubectl describe pod tc-deployutils-1-hztpj -n prd-azy092
    ```

    ![Image](./image_452.png)

3. **FSC container successfully started, but deployutils failed to communicate with FSC within a pre-configured time interval**
   - In this scenario, although the FSC container is healthy, deployutils is unable to establish communication with FSC within the expected time.
   - **Resolution:** Manually restart the deployutils job from ArgoCD as described in workaround 1 above.
   