## PoolManager pod runs out of memory in Teamcenter X deployments with large number of concurrent users
**Issue Description**:

In Teamcenter X  deployments with large number of concurrent users (200+ users), it has been observed that the tc-poolmanager pod runs out of memory with following exception and gets into degraded state:
java.lang.OutOfMemoryError: Java heap space


**Troubleshooting Steps**
This issue can be corrected by modifying tc-poolmanager helm charts. In 2506 Teamcenter X deployments, the default resource requests for memory and cpu are 1Gi and 500m respectively. For deployments with large number of concurrent users, it is recommended to increase the resource requests for memory and cpu are 4Gi and 1 respectively, as per the steps listed below. Please note that downtime is needed for making this change. 

### Shutdown Teamcenter Workload
Before updating the poolmanager helm charts, the required Teamcenter workload has to be shut down.

1. Trigger [Shutdown and restart workloads](../../../Documentation/Operations/Day%20N%20Operations/Shutdown%20and%20restart%20workloads)

    - **Workload:** Teamcenter deployment for applying updates
    - **Action:** Shutdown

2. Once the shutdown is successful, follow the process below.

### Update poolmanager manifest files
- Connect to the License/DC Server
    ```bash
    sudo su -
    ```
- Navigate to the directory:
    ```
    /<tenant-id>-<envtype>/<tenant-id>-<envtype>/deploy/component/helm/teamcenter/charts/tc-poolmanager-pool1/
    ```
- Update resource request settings in `values.yaml` 
    ```
    resources:
      requests:
      cpu: 1
      memory: 4Gi
    ```
- Navigate to the directory:
    ```
    /<tenant-id>-<envtype>/<tenant-id>-<envtype>/deploy/component/helm/teamcenter/charts/tc-poolmanager-pool1/templates
    ```
- Update resource request settings in `deployment.yaml` 
    ```
          livenessProbe:
            httpGet:
              path: /{{- include "tc-poolmanager.poolid" . }}/services/ServerManagerProbe/alive
              port: probe-port
              scheme: HTTP
            initialDelaySeconds: 15
            periodSeconds: 10
            failureThreshold: 10
          readinessProbe:
            httpGet:
              path: /{{- include "tc-poolmanager.poolid" . }}/services/ServerManagerProbe/ready
              port: probe-port
              scheme: HTTP
            initialDelaySeconds: 20
            periodSeconds: 10
            failureThreshold: 25
    ```

### Restart Teamcenter Workload
After performing the above tasks, the required Teamcenter workload has to be restarted.

1. Trigger [Shutdown and restart workloads](../../../Documentation/Operations/Day%20N%20Operations/Shutdown%20and%20restart%20workloads)

    - **Workload:** Teamcenter deployment for applying updates
    - **Action:** Restart