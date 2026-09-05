## Deploy Utils failure due to clearlocks

Condition: Deploy utils pod fails while clearing locks applied on database.
Logs of pods can be seen on Argo CD.
Reinitiate the deployment using the same parameters that were initially used while triggering the deployment for the first time. (Refer to section [Updating an Existing Deployment](../Updating-an-Existing-Deployment/Updating-an-Existing-Deployment)  to get the original parameters of the tenant deployment)
