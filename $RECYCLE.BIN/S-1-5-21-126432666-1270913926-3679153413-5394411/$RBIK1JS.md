# Monitoring and Health Checks

**Responsibility: CApS Team and Customer Operations Team**

Regular monitoring and health checks ensure the TcOOWeb integration remains operational and performs optimally.


Overview:

1. Check the Health status of the Target Group in AWS
   - Login to AWS and go to EC2 --\> Target Groups
     ![Image](./images/target_groups.png)

   - Filter for the tenant ID
     From the filtering list select \<tenant ID\>-moos-prd
     ![Image](./images/target_groups_filtered.png)

   - Click on the Target Group

   - Verify the Details shows 1 Healthy and 0 Unhealthy
     ![Image](./images/health_status.png)

2. Check the Health status of the tcooweb pod in Rancher
    - Go to Rancher and filter for your cluster
      ![Image](./images/rancher.png)

    - Click on your cluster and then Workloads-->Pods
      ![Image](./images/rancher_pods.png)

    - Filter on "tcooweb" and then scroll to find the correct pod for your tenant
      ![Image](./images/pod_filter.png)

    - Click on the pod and ensure istio-proxy and tcooweb show as "Running"
      ![Image](./images/pod_status.png)    

