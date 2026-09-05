### GitLab Tenant Group Setup

This step is strictly optional and only applies to cases in which the deployment pipeline needs to be configured to store the tenant repositories in a different GitLab Group than the [default tcx-tenant-repos-dev](https://gitlab.industrysoftware.automation.siemens.com/tcx-containers-deploy-automation/tcx-tenant-repos-dev). In most cases, you can skip this step.


To allow the pipeline to automatically create and configure tenant repositories in a GitLab Group, the GitLab Service Account `tcx-containerized-deployment-automation-bot` needs to be added as Maintainer to the GitLab Group.

Note: More steps will likely need to be added here - reach out to the DeployOps Teams for details.

Below steps have been already done and use as example the Gitlab Group  https://gitlab.industrysoftware.automation.siemens.com/tcx-containers-deploy-automation/tcx-tenant-repos-dev.

#### Example Steps:
1. Identify the GitLab Group which should be used to store the Tenant Repositories, e.g., [tcx-tenant-repos-dev](https://gitlab.industrysoftware.automation.siemens.com/tcx-containers-deploy-automation/tcx-tenant-repos-dev).  
2. Navigate to the GitLab Group.  
3. Navigate to the Member section, e.g., [Group Members](https://gitlab.industrysoftware.automation.siemens.com/groups/tcx-containers-deploy-automation/tcx-tenant-repos-dev/-/group_members).  
4. Add and invite the GitLab Service Account: `tcx-containerized-deployment-automation-bot` as Maintainer.  

![Image](./image_108.png)

5. Check that the Service Account is now a member of the group by searching for `tcx-containerized-deployment-automation-bot` in the Member section  

![Image](./image_109.png)

For further reading and explanation, please see the relevant section in the [Deployment Pipeline Documentation](https://gitlab.industrysoftware.automation.siemens.com/tcx-deploy/tcx-pipeline-tenant/-/tree/main/documentation#add-service-account-to-relevant-groups).

