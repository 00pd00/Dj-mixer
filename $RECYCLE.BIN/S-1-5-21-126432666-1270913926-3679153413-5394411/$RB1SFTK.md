### Create ElastiCache Valkey (Once per Tenant AWS Account)

Terraform code to create a elasticache valkey for a given tenant account is available in the repository **TcX-Deploy / tcx-pipeline-account**.

Elasticache is AWS high performance distributed caching mechanism. This will be used by TcX services like FMS for caching the meta data which can be accessed from different kubernetes cluster pods. This will use the shared VPC for communication between pod to elasticache. Three subnets associated with the shared vpc will be used with the elasticache.


#### Steps:
1. Open the repository **TcX-Deploy / tcx-pipeline-account** in your browser.
2. Click on **Pipelines**:  
    ![Image](./image_63.png)
3. Enter the following details

    ![Image](./image_82.png)

    - **stage**: `createelasticache`
    - **CLOUD_ID**: AWS account ID where elasticache is to be created (e.g., `906956190433`)
    - **CELL_ID**: Cell ID of the cluster (e.g., `depops-preprod05-us-east-1`)
    - **STREAM_ID**: Deployment stream id (e.g., `dev`) 
    - **git_username**: Your Git username
    - **git_password**: Your Git token
    - **VARIABLE_BRANCH_NAME**: `tcx-pipeline-variables` branch name (defaults to `main` if not provided)

4. Click on **Run**. After successful execution, note the following details displayed in the run output:
    
    ![Image](./image_83.png)

    - `elasticache_endpoint_address`
    - `elasticache_endpoint_port`

5. After successful completion of the pipeline, update your Cloud ID file in `tcx-pipeline-variables` with the new details.

    1. GLBL_ELASTICACHE_ADDRESS: value from `elasticache_endpoint_address` from the pipeline output
    2. GLBL_ELASTICACHE_PORT: value from `elasticache_endpoint_port` from the pipeline output