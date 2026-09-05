
#### Restart Workload

1. Once the TcX Container Deploy pipeline has successfully completed the maintenance operation, restart the container workload.
2. Run the Shutdown Restart workflow as documented in  [Shutdown and restart workloads](../../../Day%20N%20Operations/Shutdown%20and%20restart%20workloads).
3. Launch the template and select **Next**. On the survey page, select:
    - **Teamcenter Deployment for Password Change** in **WORKLOAD**.
    - **Restart** in **ACTION**.
    - Wait for 5-10 minutes for all teamcenter pods to Restart.

    ![Image](./image_369.png)
4. Log in to ArgoCD and verify that Indexer, DB Daemons, and Visualization components are running.
5. In ArgoCD restart TCSS pod manually
   ![Image](./image_370.png)
