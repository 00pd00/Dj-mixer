## Solr pod runs out of memory in Teamcenter X Essentials deployments with large number of concurrent users

In Teamcenter X Essentials deployments with large number of concurrent users (200+ users), it has been observed that the Solr pod runs out of memory with following exception:

java.lang.OutOfMemoryError: Java heap space

This issue can be corrected by modifying Solr indexing profile value. In Teamcenter X deployments, the Solr indexing profile is by default set to "Low" (512MB memory). For deployments with large number of concurrent users or for use-cases that involve lot of Solr memory, it is recommended to increase the indexing profile value to "Medium" (2GB memory) or "High" (4GB memory) based on the memory usage metrics for Solr pod from Datadog, as per the steps listed below. Please note that downtime is needed for making this change. 
1. **Shutdown** workload **Teamcenter deployment for applying updates** from Ansible tower for this deployment as per the steps specified in section [Shutdown and restart workloads](../Day%20N%20Operations/Shutdown%20and%20restart%20workloads)
2. Run the DeployOps automation pipeline as per the steps detailed below:
   - Create a new branch of tc-version-manifests git repository from the tag/branch applicable for specififc Teamcenter X release. You need to include name of the tenant and environment type (prd/uat/dev) in the branch being created to maintain uniqueness.
   - Modify tcxlite_qd.j2 file in tcx-configuration/quick_deploy_templates folder in the branch created in previous step to add the following entry for aws2_indexingProfile property under aws2_indexingengine component, and commit the change. The entry below specifies "High" as the value for aws2_indexingProfile property.

     `<property id="aws2_indexingProfile" value="High"/>`
   - Trigger DeployOps automation pipeline with stage as "deploy" and TcXVersion as the name of the branch created in step
3. **Restart** the workload **Teamcenter deployment for applying updates** from Ansible tower for this deployment as per the steps specified in section[Shutdown and restart workloads](../Day%20N%20Operations/Shutdown%20and%20restart%20workloads)
