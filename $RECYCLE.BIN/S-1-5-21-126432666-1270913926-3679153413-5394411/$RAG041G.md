### Steps

#### Shutdown Workload

1. Run the Shutdown workflow as documented in [Shutdown and restart workloads](../../../Day%20N%20Operations/Shutdown%20and%20restart%20workloads)
2. Launch the template, On the survey page, select:
    - **Teamcenter Deployment for Password Change** in **WORKLOAD**.

    - **Shutdown** in **ACTION**.

    ![Image](./image_363.png)

3. Log in to ArgoCD and verify that Indexer, DB Daemons, and Visualization components are not running.