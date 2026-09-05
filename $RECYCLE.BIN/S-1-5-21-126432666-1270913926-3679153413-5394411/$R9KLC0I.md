## Manual steps to be performed after pipeline completion

1. Even though the post-deploy stage of the pipeline is completed, DeployUtils job will still be running. Monitor the completion of this job in one of the following ways:
- A notification email is received about successful completion of DeployUtils job is received
- In the tc-deployutils logs for the current deployment in Datadog, DEPLOYMENT SUCCESSFUL message is present
2. If after deployutils pod successful and teamcenter pod is not able to sync up by error in below screenshot

   ![Image](./image_379.png)

Then synchronize full teamcenter pod with force option like below

   ![Image](./image_380.png)

3. Once the DeployUtils job is completed successfully, go to the update git pipeline and retry the post-deploy stage. This will re-run awbuild and other post-deploy tasks. Verify the post-deploy stage of the update pipeline is completed successfully.
4. Shutdown the workload "Complete Teamcenter deployment" by launching the 'tcx-shutdown-restart-workload-workflow' workflow template from Ansible Tower by specifying the Shutdown option, refer to [Shutdown and Restart Workloads](../030_Day%20N%20Operations/030_Shutdown%20and%20restart%20workloads.md).
After about 5-8 minutes, all the pods for this tenant deployment will stop. Please ignore pipeline failed notification message to stop assigned tcserver pods. 

    | Survey parameter | Value |
    |-----------------|-------|
    | TENANT ID | Tenant ID |
    | ENVIRONMENT TYPE | Type of the environment e.g. prd, uat |
    | WORKLOAD | Complete Teamcenter deployment |
    | ACTION | Shutdown |
    | GITLAB TOKEN | Personal access token for gitlab |

5. Restart the workload "Complete Teamcenter deployment" by launching the 'tcx-shutdown-restart-workload-workflow' workflow template from Ansible Tower by specifying the Restart option, refer to [Shutdown and Restart Workloads](../030_Day%20N%20Operations/030_Shutdown%20and%20restart%20workloads.md).

    | Survey parameter | Value |
    |-----------------|-------|
    | TENANT ID | Tenant ID |
    | ENVIRONMENT TYPE | Type of the environment e.g. prd, uat |
    | WORKLOAD | Complete Teamcenter deployment |
    | ACTION | Restart |
    | GITLAB TOKEN | Personal access token for gitlab |

6. After about 5-8 minutes, all the pods for this tenant deployment will get into running state.
7. If the deployment includes Dispatcher, run the deploy scripts on Dispatcher machine as per the steps in section [Requirements](../../Tenant%20Onboarding/Teamcenter%20Dispatcher%20and%20Translators/Requirements) and [Teamcenter Dispatcher Installation](../../Tenant%20Onboarding/Teamcenter%20Dispatcher%20and%20Translators/Teamcenter%20Dispatcher%20Installation)

8. Verify the deployment is functional by running few smoke tests from Active Workspace client. 
​​
