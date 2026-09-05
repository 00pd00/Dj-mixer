## Manually configure SQL MI for better performance

1. Activate your tenant subscription in Azure portal.
2. Go to SQL Managed Instances
3. Filter with the tenant id for which the configurations need to be tweaked
4. On the left pane, expand Settings and click on "Compute + storage"
5. Select the following configurations-
    - Service tier: Business Critical
    - Hardware Generation: Premium-series - memory optimized - Intel Ice Lake, 13,6 GB RAM/vCore, up to 870.4 GB
    - vCores: 20
    - Storage in GB: 160
    - Zone redundancy: Enabled
    - Backup storage redundancy: Zone redundant backup storage
  ![Image](./image_359.png)
6. Click on Apply
7. Wait for the changes to apply as it takes quite a while (around 30 mins). The status of the same can be seen under the Notifications