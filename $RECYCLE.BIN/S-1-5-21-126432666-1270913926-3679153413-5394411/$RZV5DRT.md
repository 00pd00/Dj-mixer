## Adding additional modules

Additional modules can be deployed by running the DeployOps pipeline with Product IDs for the new modules to be deployed. The product IDs need to be specified as a value for the parameter `TeamcenterProductIDList` in the inputs provided for the Ansible survey.  

1. Adding modules/pids existing onboarded products
   - The administrator must shutdown the workload “Teamcenter deployment for maintenance” from Ansible tower for this deployment as per the steps mentioned in section **[Stopping and Restarting TcX Containerized Deployment](../030_Shutdown%20and%20restart%20workloads.md#stopping-and-restarting-tcx-containerized-deployment)**.
   - Copy previously run deployment pipeline parameters as found in customer input json that is supplied to the Ansible tower.
   - As part of the new input json for the deploy automation pipeline, administrator need to append new ProductIDList on the existing TeamcenterProductIDList( optionally administrator can add new PackageIDList to the TeamcenterPackageIDList.) rest of the inputs are same.
     - TeamcenterProductIDList:
       - `<NewPid-1>`
       - `<NewPid-2>`
   - Admin user triggers pipeline from Ansible tower with input yaml parameters defined above with PipelineStage set to deploy
   - After the pipeline is completed and deployutils execution is successful, retry the post-deploy stage of the pipeline to regenerate AW build artifacts associated with personalization kits.
   - **Note:** In the latest version, there is no need to manually run the restart workflow. The deploy pipeline automatically restarts the workload after any subsequent pipeline run (example: personalization).
