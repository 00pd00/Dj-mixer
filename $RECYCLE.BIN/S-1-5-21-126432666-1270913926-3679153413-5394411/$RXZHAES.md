

##### Create cell bootstrap resources for `tcx-pipeline-account` pipeline

Note Prerequisites
Before proceeding, ensure the following steps have been completed:
- [Create variable YAML for new AWS Account XCR cluster](../../../../010_Automation%20Setup/020_Create%20variable%20YAML%20for%20new%20AWS%20Account%20XCR%20cluster.md)

Ensure you have installed and configured AWS CLI using step [Route 53 values](070_Route%2053%20values.md)  

Terraform code to create a cell bootstrap S3 bucket with version control and sharing TGW with the Tenant Administrative Account is available at the repository [TcX-Deploy / tcx-pipeline-account · GitLab](https://gitlab.industrysoftware.automation.siemens.com/tcx-deploy/tcx-pipeline-account).  

Clone the repository and execute the Terraform code locally using your Siemens Laptop/VDI. This action needs to be performed by the CApS Admin.  

1. Update the trust policy for the role `tcx-container-deploy-ops-CSC-CIRole` in the TcX Cell Administrative Account (`185682516292`) to add the tenant account ID (if not already done).  
2. Use Terraform 1.5.6 ([Download Terraform](https://releases.hashicorp.com/terraform/1.5.6/)).  
3. Steps to follow to create the bootstrap bucket:  
    ```bash
    git clone git@gitlab.industrysoftware.automation.siemens.com:tcx-deploy/tcx-pipeline-account.git
    cd ./tcx-pipeline-account/terraform/
    ```
    - `cell_tgw_share_arn` value varies based on the TcX Tenant Administrator AWS Region. This value is needed in the next step:
      - `us-east-1`: `"arn:aws:ram:us-east-1:185682516292:resource-share/94b80e14-1518-48ff-b6b5-6813fec81c4a"`
      - `eu-central-1`: `"arn:aws:ram:eu-central-1:185682516292:resource-share/784605ac-6ca3-43c8-90d1-cb18cec59fac"`
      - `ap-northeast-1`: `"arn:aws:ram:ap-northeast-1:185682516292:resource-share/f1802de6-b814-493a-9fab-7af3a1071784"`
    ```bash
    terraform init # Use local Terraform state
    terraform plan -out bootstrap.out
    ```
    Provide values of variables as below:
    - `var.cell_account_id`: `185682516292`
    - `var.cell_account_master_role_name`: `tcx-container-deploy-ops-CSC-CIRole`
    - `var.cell_external_id`: `CellAccountForTGW`
    - `var.cell_tgw_share_arn`: `<Value from 3rd step, without quotes>`
    - `var.environment_type`: `prd`
    - `var.region`: `<TcX Tenant Administrator AWS Region>`
    - `var.tenant_account_id`: `<TcX Tenant Administrator AWS Account Id>`
    - `var.vault_parent_role_arn`: `arn:aws:iam::060863920329:role/gblsvcs01eu-prod-xcrvaultent-workload`
    ```bash
    terraform apply bootstrap.out
    ```
    Note
    - For **Dev** Environment use `var.vault_parent_role_arn`: `arn:aws:iam::060863920329:role/svcs02eu-prod-xcrvaultent-workload`
    - For **Prod** and **DryRun** Environment use `var.vault_parent_role_arn`: `arn:aws:iam::060863920329:role/gblsvcs01eu-prod-xcrvaultent-workload`
4. Store the Terraform state file in a secure location & keep the outputs handy. Recommended approach: zip the complete `pipeline-account-setup` folder for safekeeping.