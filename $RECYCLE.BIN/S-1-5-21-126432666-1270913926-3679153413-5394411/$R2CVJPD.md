## Pipeline failing at destroy stage due to build-infra stage failure during apply-terraform in previous run

Here is the error (in the screenshot) encountered in destroy pipeline saying that, it cannot delete the private subnet because it is being used by another resource (ex: in this case tenantblobsa-pep.nic )

![Image](./image_407.png)

These types of errors will usually come when terraform state file is unaware of the other resources (ex: tenantblobsa-pep.nic). Here is the error screenshot of build-infra stage of previous run where it failed in apply-terraform saying **resource already exists needs to be imported into the state**

![Image](./image_408.png)

**WorkAround:**

1. Login to the azure portal 
2. If you haven't activated the role, activate the role of the subscription in which that tenant has been created: 
Go to Privileged Identity Management service -> click on the tasks in left side pane -> select My roles -> select groups -> click on the activate according to the group.

![Image](./image_432.png)

3. After the activation of the role, in global search box at azure console search for resource groups and select resource groups service.
4. In search box search for `<tenantID>-<env_type>` (ex: aztest1-prd).
5. Select the resource group -> search for resource for which pipeline is complaining -> select the resource -> click on delete -> type "delete" to confirm deletion -> delete the resource.

![Image](./image_433.png)

6. Retrigger destroy pipeline after successful deletion of the resource.
