

### Create Shared Database VPC (Once per Tenant AWS Account)

Note Prerequisites
Before proceeding, ensure the following steps have been completed:
- [Create variable YAML for new AWS Account XCR cluster](../../../../010_Automation%20Setup/020_Create%20variable%20YAML%20for%20new%20AWS%20Account%20XCR%20cluster.md)


Terraform code to create a shared VPC for a given tenant account is available in the repository **TcX-Deploy / tcx-pipeline-account**.

A shared VPC is an AWS VPC where RDS will be located. This shared VPC will be peered with the XCR cluster VPC. For successful VPC peering, identify the AWS account that must use a shared VPC and the cluster to which the shared VPC will be peered. Request the VPC ID and AWS account ID of the cluster from the XCR team.

#### Requesting Tenant CIDR range allocations for cell.

With the broad TcX Network, each Cell needs a specific CIDR Range for Tenant VPC allocation, and to account for the shared database VPC for the cell. 

There is a formal spreadsheet list to allocate and track the various Cell ranges across the global TcX Network (multiple regions and multiple cells.)

When requesting network ranges the following information is needed to satisfy the request:    
  
    
 - Who will be the contact person(s) for this cell:  
 - AWS Tenant Account ID (nnnnnnn):   
 - AWS Account alias/name (awspdxxx):  
 - What AWS region:  
 - XCR Cluster Name:   
 - TcX cell name:   (this should relate to the cluster, and to the cell file name in git)  
 - Number of concurrent tenant envs that would be deployed. (capacity for Tc envs) (8,16,32):  
  

For development and test usage consider the costs incurred when provisioning many resources.   
For production and operations testing consider the number of potential active tenant environments within a region.  



#### Steps:

1. Request a CIDR block from Matt Anderson/vipul Prajapati/Donny Daniel for the shared VPC.  See inputs above.  
2. Open the repository **TcX-Deploy / tcx-pipeline-account** in your browser.
3. Click on **Pipelines**:  
    ![Image](./image_63.png)

4. Enter the following details:  

    ![Image](./image_64.png)

    - **stage**: `createsharedvpc`
    - **xcr_peering_vpc_id**: VPC ID of the cluster provided by XCR    
    - **git_username**: Your Git username
    - **git_password**: Your Git token
    - **vpc_cidr**: CIDR block provided by DeployOps (e.g., `10.24.3.0/24`)
    - **CELL_ID**: Cell ID of the cluster (e.g., `depops-preprod05-us-east-1`)            
    - **CLOUD_ID**: AWS account ID to which peering is to be performed (e.g., `906956190433`)
    - **STREAM_ID**: Deployment stream id (e.g., `dev`)
    - **VARIABLE_BRANCH_NAME**: `tcx-pipeline-variables` branch name (defaults to `main` if not provided)


5. Click on **Run**. After successful execution, note the following details displayed in the run output:  
    
    ![Image](./image_65.png)

    - `shared_vpc_id`
    - `tenant_account_id`
    - `vpc_cidr_block`
    - `xcr_account_id`

6. File a FDS ticket with the above details and request them to accept the peering. Use the [FDSOne Help Center XCR request link](https://fdsone.atlassian.net/servicedesk/customer/portal/302/group/348/create/768).

    ![Image](./image_84.png)

7. After the peering request is accepted, rerun the pipeline with all the data specified in Step 4 along with an additional parameter **update_route_table** with a value `true`. **Note**: Do not change any data used in Step 4 above.

8. After successful completion of the pipeline, update your Cloud ID file in `tcx-pipeline-variables` with the new details.

    1. GLBL_DB_VPC_ID: value from `shared_vpc_id` from the pipeline output
    2. GLBL_DB_VPC_CIDR_BLOCK: value provided by LCS
---