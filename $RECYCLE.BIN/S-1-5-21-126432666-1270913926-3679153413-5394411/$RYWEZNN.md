## Create variable YAML for new AWS Account XCR cluster

This section explains how to create a new cell and cloud YAML variable files for onboarding a new AWS Account or XCR EKS cluster. Steps are as follows:

1. Create a new cell file using one of the existing `<cell>.yml` from `variables/cell` in the [TcX-Deploy / tcx-pipeline-variables GitLab repository](https://gitlab.industrysoftware.automation.siemens.com/tcx-deploy/tcx-pipeline-variables/-/tree/main/variables/cell?ref_type=heads).
2. Rename the newly created cell file with the cluster name.

    ![Image](./image_128.png)

3. Change the following values as per the new cluster:

| Variable | Description | Reference/Value |
|----------|-------------|----------------|
| GLBL_CELL_TYPE | Cell development environment | 'dev' or 'customer' |
| GLBL_REGION | The region associated to the cell in which the tenant is onboarded | - |
| GLBL_NUMBER_OF_USERS | Maximum number of users that can login at a time | Between 20 to 250 |
| GLBL_CIDR_BLOCK | The CIDR range at the Cell level | Configure the CIDR block received as part of [Section](../Automation%20Prerequisites/TcX%20Cell%20Setup/AWS/TcX%20Tenant%20Administrative%20AWS%20Account%20setup/Get%20the%20Tenant%20CIDR%20Range) Need to be taken by mailing vipul Prajapati, Donny Daniel and Gueorgui Tchamkoriyski |
| GLBL_TENANT_CIDR_BLOCK_SIZE | The number of Ips allocated per private subnet | 16 or 32 |
| GLBL_LINUX_SERVER_AMI | AMI to use for Linux Server | Refer to Section [new generating AMIs](../Automation%20Prerequisites/TcX%20Cell%20Setup/AWS/TcX%20Tenant%20Administrative%20AWS%20Account%20setup/Get%20access%20to%20AWS%20kits%20S3%20bucket,%20Route%2053%20for%20TcX%20Tenant%20Administrative%20Account%20internal%20development) |
| GLBL_WINDOWS_SERVER_AMI | AMI to use for Windows Server | Refer to Section [new generating AMIs](../Automation%20Prerequisites/TcX%20Cell%20Setup/AWS/TcX%20Tenant%20Administrative%20AWS%20Account%20setup/Get%20access%20to%20AWS%20kits%20S3%20bucket,%20Route%2053%20for%20TcX%20Tenant%20Administrative%20Account%20internal%20development) |
| GLBL_CONTAINER_REGISTRY | Harbor registry URL | For us-east-1: 'harbor.xcr.svcs01.prod.us-east-1.kaas.sws.siemens.com/tcx'<br/>For eu-central-1: 'harbor.xcr.svcs01eu.prod.eu-central-1.kaas.sws.siemens.com/tcx'<br/>For ap-northeast-1: 'harbor.apac1.co.sws.siemens.com/tcx' |
| GLBL_TGW_RESOURCE_ID | Resource id of the transit gateway | Refer to [Section](../Automation%20Prerequisites/TcX%20Cell%20Setup/AWS/TcX%20Tenant%20Administrative%20AWS%20Account%20setup/Request%20update%20transit%20gateway%20IAM%20Role%20in%20TcX%20Cell%20Administrative%20Service%20Account) |
| GLBL_TGW_EXTERNAL_ID | External id of the transit gateway | Refer to [Section](../Automation%20Prerequisites/TcX%20Cell%20Setup/AWS/TcX%20Tenant%20Administrative%20AWS%20Account%20setup/Request%20update%20transit%20gateway%20IAM%20Role%20in%20TcX%20Cell%20Administrative%20Service%20Account) |
| GLBL_CLUSTER_ACC_ID | The AWS account id in which the EKS cluster is created | For dev: 416919875671<br/>For prod: 060863920329 |
| GLBL_CLUSTER_VPC_CIDR_RANGE | The CIDR range provided by the XCR team | Provided by XCR team during cluster creation |
| GLBL_CLUSTER_NAME | The name of the EKS cluster | Provided by XCR team during cluster creation |
| GLBL_ISTIO_BASED_DEPLOYMENT | Is Istio required for the deployment | true |
| GLBL_RANCHER_PROJECT_ID | The project id in Rancher | Refer to [Validate GLBL_RANCHER_PROJECT_ID and GLBL_RANCHER_CLUSTER_PROJECT_ID](../../Cell-Setup/Automation%20Setup/Create%20variable%20YAML%20for%20new%20AWS%20Account%20XCR%20cluster#validate-glbl_rancher_project_id-and-glbl_rancher_cluster_project_id) |
| GLBL_RANCHER_CLUSTER_PROJECT_ID | Project id of the rancher cluster | Refer to [Validate GLBL_RANCHER_PROJECT_ID and GLBL_RANCHER_CLUSTER_PROJECT_ID](../../Cell-Setup/Automation%20Setup/Create%20variable%20YAML%20for%20new%20AWS%20Account%20XCR%20cluster#validate-glbl_rancher_project_id-and-glbl_rancher_cluster_project_id) |
| GLBL_NLB_ENDPOINT_SERVICE_NAME | The VPC endpoint service name | Can be taken by raising inquiry ticket to XCR – Kubernetes |
| XCR_ZONE_MAPPING | The mapping of the zone id's with the zone names | Refer to [XCR AWS Account AZ Mapping Reference](../../Reference%20Resources/150_Appendix/020_XCR%20AWS%20Account%20AZ%20Mapping%20Reference.md) |
| GLBL_DSS_BASE_URL | Default DSS endpoint | For us-east-1: 'dss.us-east-1.sws.siemens.com'<br/>For eu-central-1: 'dss.eu-central-1.sws.siemens.com'<br/>For ap-northeast-1: 'dss.ap-northeast-1.sws.siemens.com'<br/>For ap-south-1: 'dss.ap-south-1.sws.siemens.com'<br/>For ap-southeast-1: 'dss.ap-southeast-1.sws.siemens.com'<br/>For ap-southeast-2: 'dss.ap-southeast-2.sws.siemens.com'<br/>For ap-northeast-2: 'dss.ap-northeast-2.sws.siemens.com'' |
| GLBL_SSO_LAMBDA_REGION | Same for all cells | us-east-1 |
| GLBL_SSO_LAMBDA_ARN | Same for all cells | `arn:aws:lambda:${GLBL_SSO_LAMBDA_REGION}:361500002652:function:tcx_cli` |
| GLBL_GITLAB_GROUP_ID | **Optional:** GitLab group ID for the cell | Valid only if step [Create Cell Owner Group](./015_Create%20Cell%20Owner%20Group.md) is performed. Provided by DeployOps team (e.g., "92054") |
| GLBL_GITLAB_GROUP_LINK | **Optional:** GitLab group URL for the cell | Valid only if step [Create Cell Owner Group](./015_Create%20Cell%20Owner%20Group.md) is performed. Provided by DeployOps team |
| GLBL_GITLAB_GROUP_OWNER_EMAIL | **Optional:** Email of the GitLab group owner | Valid only if step [Create Cell Owner Group](./015_Create%20Cell%20Owner%20Group.md) is performed. Defined by author/team (your team's email address) |
| ARGOCD_REGION | Region specific | For us-east-1: 'helm'<br/>For eu-central-1: 'helm-emea'<br/>For ap-northeast-1: 'helm-apac' |

    Below is a sample of one development cluster:

    ```yaml
    variables:
      # cell information
      GLBL_CELL_TYPE: "dev"
      GLBL_REGION: "us-east-1"
      GLBL_NUMBER_OF_USERS: "25"
      GLBL_CIDR_BLOCK: "10.254.8.0/21"
      GLBL_TENANT_CIDR_BLOCK_SIZE: "16"
      GLBL_LINUX_SERVER_AMI: "ami-03b689c941c47365d"
      GLBL_WINDOWS_SERVER_AMI: "ami-024fff5cac79709fe"
      GLBL_CONTAINER_REGISTRY: "harbor.xcr.svcs01.prod.us-east-1.kaas.sws.siemens.com/tcx"
      
      # GitLab group information (optional - only valid if step 015_Create Cell Owner Group is performed)
      # Group ID and Link: provided by DeployOps | Owner Email: defined by author/team
      GLBL_GITLAB_GROUP_ID: "92054"
      GLBL_GITLAB_GROUP_LINK: "https://gitlab.industrysoftware.automation.siemens.com/tcx-cell-user-groups/deployops"
      GLBL_GITLAB_GROUP_OWNER_EMAIL: "your-team-email@siemens.com"
      # TGW resource ID from cell admin account's region (104)
      GLBL_TGW_RESOURCE_ID: "tgw-0a3e826470bd41350"
      GLBL_TGW_EXTERNAL_ID: "CellAccountForTGW"

      # xcr cluster information
      GLBL_CLUSTER_ACC_ID: "416919875671"
      GLBL_CLUSTER_VPC_CIDR_RANGE: "10.17.0.0/16"
      GLBL_CLUSTER_NAME: "aws-usea1-tcx-preprod05"
      GLBL_ISTIO_BASED_DEPLOYMENT: "true"
      GLBL_RANCHER_PROJECT_ID: "p-9xrvx"
      GLBL_RANCHER_CLUSTER_PROJECT_ID: "c-87lxz:p-9xrvx"
      GLBL_NLB_ENDPOINT_SERVICE_NAME: "com.amazonaws.vpce.us-east-1.vpce-svc-0b305bcf625951475"

      # xcr zone id - name mappings
      XCR_ZONE_MAPPING: '[{"id": "use1-az2", "name": "us-east-1d"},{"id": "use1-az4","name": "us-east-1a"},{"id": "use1-az1","name": "us-east-1c"}]'

      # default DSS ENDPOINT (select any one it based on the region)
      GLBL_DSS_BASE_URL: 
       dss.us-east-1.sws.siemens.com (for us-east-1)
       dss.eu-central-1.sws.siemens.com (for eu-central-1)
       dss.ap-northeast-1.sws.siemens.com (for ap-northeast-1) 
       dss.ap-south-1.sws.siemens.com (for ap-south-1) 
       dss.ap-southeast-1.sws.siemens.com (for ap-southeast-1) 
       dss.ap-southeast-2.sws.siemens.com (for ap-southeast-2) 
       dss.ap-northeast-2.sws.siemens.com (for ap-northeast-2)

      # SSO lambda variables
      GLBL_SSO_LAMBDA_REGION: "us-east-1"
      GLBL_SSO_LAMBDA_ARN: "arn:aws:lambda:${GLBL_SSO_LAMBDA_REGION}:361500002652:function:tcx_cli"
      # ArgoCD configuration file location. ArgoCD is made a continental deployment, hence the configuration file to create
      # argoCD apps should be in separate folders as per the deployment region
      ARGOCD_REGION: "helm"
    ```

4. Create a new cloud file using an existing `<AccountID>.yml` from the [cloud variables directory](https://gitlab.industrysoftware.automation.siemens.com/tcx-deploy/tcx-pipeline-variables/-/tree/main/variables/cloud).
5. Copy one of the existing `<AccountID>.yml`.

    ![Image](./image_129.png)

6. Change the following values as per the new cluster:
    | Variable | Description/Reference |
    |----------|---------------------|
    | `GLBL_TENANT_VPC_ACC_ID` | Tenant AWS Account ID |
    | `GLBL_ROLE_NAME_DEPLOYMENT` | Refer to [section](../Automation%20Prerequisites/TcX%20Cell%20Setup/AWS/TcX%20Tenant%20Administrative%20AWS%20Account%20setup/Create%20cell%20bootstrap%20resources%20for%20tcx-pipeline-account%20pipeline) |
    | `GLBL_DNS_ROLE_ARN` | - For Internal: refer to [section](../Automation%20Prerequisites/TcX%20Cell%20Setup/AWS/TcX%20Tenant%20Administrative%20AWS%20Account%20setup/Get%20access%20to%20AWS%20kits%20S3%20bucket,%20Route%2053%20for%20TcX%20Tenant%20Administrative%20Account%20internal%20development)<br/>- For dryrun: refer to [section](../Automation%20Prerequisites/TcX%20Cell%20Setup/AWS/TcX%20Tenant%20Administrative%20AWS%20Account%20setup/Get%20access%20to%20AWS%20kits%20S3%20bucket,%20Route%2053%20for%20TcX%20Tenant%20Administrative%20Account%20dryrun) <br/>- For prod: refer to [section](../Automation%20Prerequisites/TcX%20Cell%20Setup/AWS/TcX%20Tenant%20Administrative%20AWS%20Account%20setup/Get%20access%20to%20AWS%20kits%20S3%20bucket,%20Route%2053%20for%20TcX%20Tenant%20Administrative%20Account%20prod) |
    | `GLBL_DNS_EXTERNAL_ID` | - For Internal: refer to [section](../Automation%20Prerequisites/TcX%20Cell%20Setup/AWS/TcX%20Tenant%20Administrative%20AWS%20Account%20setup/Get%20access%20to%20AWS%20kits%20S3%20bucket,%20Route%2053%20for%20TcX%20Tenant%20Administrative%20Account%20internal%20development)<br/>- For dryrun: refer to [section](../Automation%20Prerequisites/TcX%20Cell%20Setup/AWS/TcX%20Tenant%20Administrative%20AWS%20Account%20setup/Get%20access%20to%20AWS%20kits%20S3%20bucket,%20Route%2053%20for%20TcX%20Tenant%20Administrative%20Account%20dryrun)<br/>- For prod: refer to [section](../Automation%20Prerequisites/TcX%20Cell%20Setup/AWS/TcX%20Tenant%20Administrative%20AWS%20Account%20setup/Get%20access%20to%20AWS%20kits%20S3%20bucket,%20Route%2053%20for%20TcX%20Tenant%20Administrative%20Account%20prod) |

    Below is a sample of one development cluster:

    ```yaml
    variables:
      GLBL_TENANT_VPC_ACC_ID: "906956190433"
      GLBL_ROLE_NAME_DEPLOYMENT: "tcx-container-deploy-ops-CSC-CIRole"
      GLBL_DNS_ROLE_ARN: "arn:aws:iam::593713585809:role/IAMForTestplmcloudsolutions-Route53Role-1URNYF93ZWD51"
      GLBL_DNS_EXTERNAL_ID: "593713585809"
    ```

### Get access to AWS AMIs for TcX Tenant Administrative Account

**Note:** This is a one-time activity for each Tenant AWS Account ID and should be performed while creating the cell file only.

#### Prerequisites

1. Go to the [tcx-pipeline-variables GitLab repository](https://gitlab.industrysoftware.automation.siemens.com/tcx-deploy/tcx-pipeline-variables/-/tree/tcx-image-builder/variables/cloud).
2. Click on **Edit** -> **Web IDE**.

    ![Image](./image_130.png)

3. Copy any of the existing `.yml` files and rename it with the Tenant AWS Account ID (e.g., `071989559904.yml`).

    **Note:** There is no need to modify variables from the copied file, as only the file names will be used to retrieve the list of Tenant AWS Account IDs.

4. Commit and push the changes.

#### Steps for sharing the AMIs

1. Navigate to the [tcx-image-builder](https://gitlab.industrysoftware.automation.siemens.com/tcx-deploy/tcx-image-builder) repository.
2. Go to **Build** > **Pipelines**.
3. Click **New Pipeline**.
4. Select the branch as `main`.
    4.a. Select 'main' for RHEL 9.
    4.b. Select 'RHEL8_imagebuilder' for RHEL 8.
5. Add the following variables:
    - `GLBL_CLOUD_PROVIDER= aws`
    - `STREAM_ID= dev`
    - `VARIABLE_BRANCH_NAME= main`
    - `GLBL_ACCOUNT_ID = <Tenant AWS Account ID>`
6. Click **Run Pipeline**.

### Validating variable details

#### Validate `GLBL_RANCHER_PROJECT_ID` and `GLBL_RANCHER_CLUSTER_PROJECT_ID`

Sometimes it's possible that XCR team might not provide the Rancher Project Id and Cluster Project id. Kindly follow below steps to find the correct values for your specific EKS Kubernetes Cluster.

1. Log in to Rancher and select your XCR Cluster.
2. From the top Namespace filter, select the namespace: `istio-xcr`.
3. From the left navigation panel, select **Cluster** > **Projects/Namespaces**.
4. Click on the `istio-xcr` namespace.
5. Click on the three vertical dots at the top-right corner and select **View YAML**.
6. Search for `"field.cattle.io/projectId"` under `"annotations"`. The value is `GLBL_RANCHER_CLUSTER_PROJECT_ID`.
7. Search for `"field.cattle.io/projectId"` under `"labels"`. The value is `GLBL_RANCHER_PROJECT_ID`.
