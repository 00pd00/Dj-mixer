## Steps for Updating cTcX Environment

1. **Shutdown the tenant environment that is to be updated**  
     Launch the Shutdown and Restart workflow.  
        For Shutdown and Restart Template link, please refer to [Ansible Templates Table](../../Tenant%20Onboarding/Basic%20Flow/Ansible%20Templates%20Table)
        Run shutdown workflow with below survey parameter and follow for other values as described in document [Shutdown and restart workloads](../Day%20N%20Operations/Shutdown%20and%20restart%20workloads)
    
    | Survey parameter | Value |
    |-----------------|-------|
    | TENANT ID | Tenant ID |
    | ENVIRONMENT TYPE | Type of the environment e.g. prd, uat |
    | WORKLOAD | Teamcenter deployment for applying updates |
    | ACTION | Shutdown |
    | GITLAB TOKEN | Personal access token for gitlab |

2. **Backup the tenant environment**  
    Automated backup is not supported for cTcX 14.3.x, hence manual backup should be performed. Refer to the 14.3 cookbook section **11 Manual Steps to Backup and Restore TcX environment**.

3. **Navigate to the Ansible Tower template for performing the update**  
    Navigate to the GIT project for the deployment that is to be updated:
    - For CAPS deployments, navigate to `tcx-tenant-repos-customer`.
    - For internal deployments, navigate to `tcx-tenant-repos-internal` or `tcx-tenant-repos-dev`.

    Search for the deployment to update using the git search field on the right.  
    ![Screenshot](230-screenshot-20240212-141530.png)

4. **Access the specific deployment project**  
    Navigate to the bottom of the specific deployment project and click on the "template" link in the Ansible box. This will take you to the Ansible template to use for the update operation.  
    ![Screenshot](231-screenshot-20240212-141530.png)

5. **Get the input JSON values required for executing the update job**  
    - In this release, all of the input JSON passed during the initial deploy must also be passed as input to the deploy operation.
    - These values can be retrieved from Ansible Tower by navigating to the original job OR found in the tenant git repo for this deployment in the `customer-information/tenant.yml` file.

6. **Increase the size of ebs volumes of linux and windows machine ebs volumes appened below inputs**
    | Survey parameter | Value |
    |-----------------|-------|
    | Ec2ExtraEbsVolumeSize | 500 (size of linux ebs volume ) |
    | WinSer1ExtraEbsVolumeSize | 500 (size of windows ebs volume) |
    
    above ones are deployment specfic , only need to be added if the ebs volumes are full or not enough space for new kits (use commands like "df -h" to check disk usage)

7. **Update the input JSON values**  
    In the above input JSON, update the following values/tags to the target TC released tags values.  

    | Survey parameter | Value |
    |-----------------|-------|
    | pipelineversion | 3.0.8 (target release version tag, subject to change) |
    | pipelinevariableversion | 3.0.6 (target release version tag, subject to change) |
    | tcx-version | 2412.0001_041001 (target release version tag, subject to change) |
    | tcx-cli requirement | teamcenterx==3.0.3.11 (target release version tag, subject to change) |

    **Note:** If personalized packages are present in the input JSON, ensure that all of them are updated with the corresponding kits and software versions compatible with the target release version.

    **Template for Upgrade:** Refer to  [Ansible Templates Table](../../Tenant%20Onboarding/Basic%20Flow/Ansible%20Templates%20Table).

8. **Execute the Ansible Tower deploy template**  
    Use the input JSON from the original input, EXCEPT during this run, specify the new value for `TcXVersion` that matches the version the deployment will be updated to. The same applies for the DC update.  
    - Ansible Tower will trigger execution of the container deploy automation pipeline, which will run for some time (hours).
    - From the Ansible standard output, navigate to the git pipeline link for the update. You will see the pipeline is completed successfully.
    - A notification email about pipeline completion is sent to the email address configured for the `NotificationEmailId` parameter in the input parameters while triggering the update run.

> **Note:** To update the DC version, follow the same process. The pipeline can detect the new value in the DC version in step 5 and will update the DC version.
