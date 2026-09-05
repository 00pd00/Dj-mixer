
When you have finished using a tenant environment, there is a process to clean up the provisioned resources. Remember that anything provisioned and running in AWS incurs costs.
NOTE:
1. This is an irreversible action. Proceed with certainty, ensuring you use the correct Customer ID.
2. Before triggering the destroy pipeline, ensure that any resources created manually or outside the pipeline's scope are deleted first.
3. (Specific for SRE) If SRE monitors are created, please follow the [SRE Onboarding Operations](../../020_Operations/030_Day%20N%20Operations/200_SRE%20Onboarding%20operations.md) guide to offboard or delete these monitors.
4. (Specific to Azure) Before triggering the destroy pipeline, ensure that the steps noted in [pre-destroy](./020_Pre-Destroy%20Action%20in%20Tenant%20Repo/020_Pre-Destroy%20Action%20in%20Tenant%20Repo.md) are followed.
5. Prepare the input file with PipelineStage: destroy, as detailed in the [Ansible template Input](../../010_Tenant%20Onboarding/010_Pre-Reqs/020_Ansible%20Template%20Input/000_Ansible%20Template%20Input.md) section.
6. Trigger the GitLab pipeline using the Ansible template, as described in the [Ansible playbook execution](../../Tenant%20Onboarding/Basic%20Flow/Ansible%20playbook%20execution/) section.
