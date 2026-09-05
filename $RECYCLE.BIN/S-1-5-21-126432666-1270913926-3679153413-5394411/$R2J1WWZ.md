
### AWS

The following section outlines the process by which Tenants deployed on Kubernetes and the Dispatcher service in a VPC can establish a connection to a shared license server deployed in a Shared VPC within the same Account. Our objective is to enable all tenants in a VPC to access the common license server in the Shared VPC. The Shared VPC can be in the same AWS Account or a VPC from another AWS account.

## Pre-Requisites

- Access to the tenant repositories containing the helm charts and configurations.
- Access to the AWS account where tenants are deployed with sufficient permission to update route tables, security groups, and hosted zone entries.

## High-Level Steps

1. Gather environments’ information.
2. Make the containers from the XCR communicate with the shared license server deployed in the Shared VPC.
3. Make the EC2 instances of the tenant environment reach the shared license server deployed in the Shared VPC.

## Collect Environment Configuration

We need the following information about the environments:

- **License Server IP** (private IP of EC2) from Shared VPC
- **VPC CIDR Block Range** from the VPC where the License Server is hosted
- **Hosted Zone ID** in the AWS Account where tenants are deployed

### License Server IP

Log in to the Shared AWS Account console and find the SPLM license server IP in the EC2 dashboard of your respective region.

### VPC ID and VPC CIDR Block in Shared AWS Account

1. In the EC2 dashboard, select your License Server EC2 Instance. In the lower panel, go to the **Details** tab and find the VPC ID. Note the VPC ID.
2. Click the VPC ID. The page will load with the VPC details.
3. In the lower panel, go to the **Details** tab and find the IPv4 CIDR. Note the VPC CIDR.

### VPC ID, VPC CIDR Block, and Hosted Zone ID of the TcX Cell Administrative Account

1. Go to any tenant repository of the Cell environment.
2. Look for the `/customer-information/pipeline-output.md` file in the repository.
3. Note down the Private Hosted Zone ID.

Refer to the diagram below:

![Environment Configuration Diagram](./image_436.png)

## Configure EC2 Instances of Workloads to Reach Shared License Server

### Update the Route Tables for Tenant Workloads

1. Log in to the TcX Cell Administrative Account (AWS) and go to **Route Tables** in the VPC dashboard.
2. Search for the VPC ID of a tenant.

    ![Route Table Search](./image_437.png)

3. Select the route table with `Siemens-<tenant-id>-NAT-RT1`, go to **Routes**, and click on “Edit routes.”

    ![Edit Routes](./image_438.png)

4. Add another route with the destination VPC CIDR of the shared license environment and set the Target to the Transit Gateway.

    > **Note:** The Transit Gateway ID can be fetched from the `tcx-pipeline-variables` repository under the Cell variable `GLBL_TGW_RESOURCE_ID`.

    ![Transit Gateway Configuration](./image_439.png)

5. Save the changes.

### Update the Security Groups of the Common License Environment to Allow Traffic from Tenants

1. Select the common license server from the EC2 Dashboard.

    ![Select License Server](./image_440.png)

2. Click on the Security Group and edit the inbound rules.

    ![Edit Security Group](./image_441.png)

3. Add a rule with the port range `28000-28001` and a custom CIDR range of the Cell Admin account VPC CIDR block.

    ![Inbound Rule Configuration](./image_442.png)

### Update Route53 Hosted Zone Entries for Tenant AWS Account

1. Go to the **Route53** dashboard of the Cell Admin AWS Account where the tenants are hosted.

    ![Route53 Dashboard](./image_443.png)

2. Search for the hosted zone ID of the Cell Admin account and click on the hosted zone ID.

    ![Hosted Zone Search](./image_444.png)

3. Choose the record name `<tenant-id>.license-service.prd.tcxservices.com` and click on **Edit Record** on the right-hand panel.

    ![Edit Record](./image_445.png)

4. Update the value with the Common License Server private IP address. This IP address can be found in the EC2 dashboard of the Cell Admin AWS Account environment.

    ![Update Record](./image_446.png)

5. Edit the record as shown below.

    ![Record Update Example](./image_447.png)

## Configure K8S Workload to Use Shared License Server

### Update `infra.yaml` File in the Helm Charts of UAT

1. Go to the tenant repository.
2. Look for the `/helm_charts/infra.yaml` file in the repository.
3. Use the IP address of the Production License Server to update the Cell environment by modifying the `ADMIN_LICENSE_SERVER_IP` and `SPLM_LICENSE_SERVER_IP`.

    ![Infra.yaml Update](./../image_448.png)

### Add Network Policy Resource in Helm Charts of UAT

1. Go to the tenant repository of the UAT environment.
2. Navigate to `/helm_charts/onboarding/onboard_tcx/templates`.
3. Add a network policy resource to `splm_license.yaml`.

    ![Network Policy Resource](./../image_449.png)

### Sync the Onboarding Application of UAT Using ArgoCD

1. Open the ArgoCD console.
2. Choose the namespace in ArgoCD of the Tenant environment.

    ![ArgoCD Namespace](./../image_450.png)

3. Click on the `teamcenter-tcx-helm` tile in ArgoCD and click on **Sync**.

    ![ArgoCD Sync](./../image_451.png)

4. Ensure that the latest GitLab commit ID of the UAT environment repository and the ArgoCD commit ID are the same. If not, click on the **Sync** option in ArgoCD again.

    ![Commit ID Verification](./../image_452.png)

    ![Sync Confirmation](./../image_453.png)

### Verify Login to Active Workspace Console

1. Log in to the AWC console of the Tenant environment and ensure you can log in without any license error issues.

    ![AWC Console Login](./../image_454.png)

2. Check the connectivity from the Dispatcher Windows Machine to the Common License Server:
    - Open CMD on the Dispatcher Windows Machine and run the following command:
      ```
      ping <License_Server_IP_or_Hostname>
      ```
    - For example:

      ![Ping Command Example](./../image_455.png)

    - If you receive replies, the Dispatcher can reach the License Server. If you see timeouts or errors, the connectivity is blocked.

