## Manual Steps to Perform After Pipeline Completion

- Even though the post-deploy stage of the pipeline is completed, the `DeployUtils` job will still be running.  
  Monitor the completion of this job in one of the following ways:  
  - A notification email is received about the successful completion of the `DeployUtils` job.  
  - In the `tc-deployutils` logs for the current deployment in Datadog, a `DEPLOYMENT SUCCESSFUL` message is present.  

### To View the Message in Datadog:

1. Login to the Pillar-0 Service Datadog platform.  
2. At the bottom left, click on the **Logs** section, then **Explorer**.  
3. In the search bar, enter the query: `customer:<tenant-id> service:tc-deployutils DEPLOYMENT SUCCESSFUL`.  
4. Click on the log having the message `UTC - INFO - DeployerCLIRunner - prd-<tenant-id> - ...`.  
    You can see the `DEPLOYMENT SUCCESSFUL` text in the message section of the log.  
    ![Image](./image_360.png)

- Once the `DeployUtils` job is completed successfully, go to the update GIT pipeline and retry the post-deploy stage.  
  This will re-run `awbuild` and other post-deploy tasks.  
  Verify the post-deploy stage of the update pipeline is completed successfully.

7. **Shutdown the workload "Complete Teamcenter deployment"**  
    Launch the Shutdown and Restart Template.  
    For Shutdown and Restart Template link, please refer to [Ansible Templates Table](../../Tenant%20Onboarding/Basic%20Flow/Ansible%20Templates%20Table).  
    Run shutdown workflow with below survey parameter and follow for other values as described in document [Shutdown and restart workloads](../Day%20N%20Operations/Shutdown%20and%20restart%20workloads)
    - Specify the Shutdown option as indicated below:  

    | Survey parameter | Value |
    |-----------------|-------|
    | TENANT ID | Tenant ID |
    | ENVIRONMENT TYPE | Type of the environment e.g. prd, uat |
    | WORKLOAD | Complete Teamcenter deployment |
    | ACTION | Shutdown |
    | GITLAB TOKEN | Personal access token for gitlab |
    | STREAM ID | Select dev/customer/dryrun/internal |
    | GITLAB TOKEN | Provide GitLab personal access token |
    | ENTER VAULT TOKEN | Provide vault token |

      After about 5-8 minutes, all the pods for this tenant deployment will stop.  
      Please ignore the pipeline failed notification message to stop assigned `tcserver` pods.

8. **Restart the workload "Complete Teamcenter deployment"**  
    Launch the Shutdown and Restart workflow.  
    For Shutdown and Restart Template link, please refer to [Ansible Templates Table](../../Tenant%20Onboarding/Basic%20Flow/Ansible%20Templates%20Table)
    Run Restart workflow with below survey parameter and follow for other values as described in document [Shutdown and restart workloads](../Day%20N%20Operations/Shutdown%20and%20restart%20workloads)
    - Specify the Restart option as indicated below:

    | Survey parameter | Value |
    |-----------------|-------|
    | TENANT ID | Tenant ID |
    | ENVIRONMENT TYPE | Type of the environment e.g. prd, uat |
    | WORKLOAD | Complete Teamcenter deployment |
    | ACTION | Restart |
    | GITLAB TOKEN | Personal access token for gitlab |
    | STREAM ID | Select dev/customer/dryrun/internal |
    | GITLAB TOKEN | Provide GitLab personal access token |
    | ENTER VAULT TOKEN | Provide vault token |

    After about 5-8 minutes, all the pods for this tenant deployment will get into the running state.

9. **If the deployment includes Dispatcher**  
    Run the deploy scripts on the Dispatcher machine as per the steps in section [Requirements](../../Tenant%20Onboarding/Teamcenter%20Dispatcher%20and%20Translators/Requirements) and [Teamcenter Dispatcher Installation](../../Tenant%20Onboarding/Teamcenter%20Dispatcher%20and%20Translators/Teamcenter%20Dispatcher%20Installation)

10. **Verify the deployment is functional**  
     Run a few smoke tests from the Active Workspace client.
