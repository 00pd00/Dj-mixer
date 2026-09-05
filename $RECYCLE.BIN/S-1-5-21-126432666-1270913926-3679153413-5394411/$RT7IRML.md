## Steps for Updating `cTcX` Environment

1. **Shutdown workload in the tenant environment that is to be updated**  
    For Shutdown and Restart Template link, please refer to [Ansible Templates Table](../../010_Tenant%20Onboarding/020_Basic%20Flow/020_Ansible%20Templates%20Table.md) in Tower with these inputs.
    Run shutdown workflow with below survey parameter and follow for other values as described in document [Shutdown and restart workloads](../Day%20N%20Operations/Shutdown%20and%20restart%20workloads)

    | Survey parameter | Value |
    |-----------------|-------|
    | TENANT ID | Tenant ID |
    | ENVIRONMENT TYPE | Type of the environment e.g. prd, uat |
    | WORKLOAD | Teamcenter deployment for applying updates |
    | ACTION | Shutdown |
    | GITLAB TOKEN | Personal access token for gitlab |
    | STREAM ID | Select dev/customer/dryrun/internal |
    | GITLAB TOKEN | Provide GitLab personal access token |
    | ENTER VAULT TOKEN | Provide vault token |

2. **Backup the tenant environment**  
    Execute the backup pipeline using steps outlined in section [Trigger automated backup using Ansible job template](../../Operations/Automated%20Backup%20and%20Restore%20of%20TcX%20environment/Automated%20Backup#trigger-automated-backup-using-ansible-job-template)

3. **Navigate to the Ansible Tower template for performing the update**  
    - Navigate to the GIT project for the deployment that is to be updated.  
      - For CAPS deployments, navigate to `tcx-tenant-repos-customer`.  
      - For internal deployments, navigate to `tcx-tenant-repos-internal` or `tcx-tenant-repos-dev`.  
    - Search for the deployment to update using the GIT search field on the right.  
      ![Image](./image_358.png)

4. **Navigate to the bottom of the specific deployment project**  
    Click on the "template" link in the Ansible box. This will take you to the Ansible template to use for the update operation.  
    ![Image](./image_359.png)

5. **Get the input JSON values required for executing the update job**  
    - In this release, all of the input JSON passed during the initial deploy must also be passed as input to the deploy operation.  
    - These values can be retrieved from Ansible Tower by navigating to the original job OR  
    - The values can be found in the tenant GIT repo for this deployment in the `customer-information/tenant.yml` file.

6. **Execute the Ansible Tower deploy template**  
    - Use the input JSON from the original input, EXCEPT during this run, specify the new value for `TcXVersion` that matches the version the deployment will be updated to.  
    - Same goes for DC update.  
    - Ansible Tower will trigger execution of the container deploy automation pipeline, which will run for some time (hours).  
    - From Ansible standard output, go to the GIT pipeline link for the update. You will see the pipeline is completed successfully.  
    - A notification email about pipeline completion is sent to the email address configured for the `NotificationEmailId` parameter in input parameters while triggering the update run.  

    **Note:** To update DC version, follow the same process. The pipeline can detect the new value in the DC version in step 5 and it will update the DC version.