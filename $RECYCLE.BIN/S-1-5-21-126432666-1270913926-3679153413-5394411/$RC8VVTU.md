
The administrator must specify the name of the personalization DC package to deploy and the location on disk of the personalization package. The steps below describe in more detail how the pipeline is executed with these inputs.

<<<<<<< HEAD
The administrator must shut down the workload “Teamcenter deployment for maintenance” from Ansible Tower for this deployment as per the steps mentioned in section [Stopping and Restarting TcX Containerized Deployment](../../../Day%20N%20Operations/Shutdown%20and%20restart%20workloads#stopping-and-restarting-tcx-containerized-deployment). This will shut down the critical Teamcenter components so that DC can apply the personalization package.
=======
The administrator must shut down the workload “Teamcenter deployment for maintenance” from Ansible Tower for this deployment as per the steps mentioned in section [Stopping and Restarting TcX Containerized Deployment](../../../030_Day%20N%20Operations/030_Shutdown%20and%20restart%20workloads.md#stopping-and-restarting-tcx-containerized-deployment). This will shut down the critical Teamcenter components so that DC can apply the personalization package.
>>>>>>> 5b273bd918e440478bbe59cecea6d04bb2fd3480

Copy previously run deployment pipeline parameters as found in the customer input JSON that is supplied to the Ansible Tower.

As part of the input JSON for the deploy automation pipeline, the admin will add the following entries:

### Change in the input parameter - PipelineStage:
```yaml
PipelineStage: pre_deploy
```
Note - Benefit: Passing pre-deploy as PipelineStage runs only partial part of the pipeline which includes stages essential for personalization (pre-deploy, deploy, post-deploy), This reduces the personalization  pipeline execution time drastically.

### The name of the personalization package to deploy:
```yaml
TeamcenterPackageIDList:
    - <DC-package-id-1>
    - <DC-package-id-2>
```

### The location of the personalization package on disk:
This format is similar to the format of `teamcenter_install_kit_config.json`, which is where other TcX software is described:

```yaml
AdditionalSoftware:
    - software_id: "<software-id-1>"
        version: "<software-version-1>"
        kit_file:
            lnx64: "https://<common-tenant-storageaccount-name>.blob.core.windows.net/path/to/linux64/kit.zip"
            wntx64: "https://<common-tenant-storageaccount-name>.blob.core.windows.net/path/to/linux64/kit.zip"
    - software_id: "<software-id-2>"
        version: "<software-version-2>"
        kit_file:
            lnx64: "https://<common-tenant-storageaccount-name>.blob.core.windows.net/path/to/linux64/kit2.zip"
            wntx64: "https://<common-tenant-storageaccount-name>.blob.core.windows.net/path/to/linux64/kit2.zip"
...
```
### Notes
- Replace `<DC-package-id-1>` and `<DC-package-id-2>` with the package IDs from associated software kits specified in `AdditionalSoftware` input. The `<DC-package-id>` inputs can be fetched from `<personalization-kit>/dc_contributions/packages/<package-id>_package.xml`.
- Replace `<common-tenant-storageaccount-name>` with `tcxt<tenant_id>cm<tenant_infix>sa<subscription_id_prefix>`.
- Replace `<software-id-1>`, `<software-id-2>`, `<software-version-1>`, `<software-version-2>`, etc., with actual identifiers, and `https://<common-tenant-storageaccount-name>.blob.core.windows.net/path/to/...` with actual storage account paths to the kit files.
- There should not be any tab space in the input YAML.


The admin user triggers the pipeline from Ansible Tower with input YAML parameters defined above with `PipelineStage` set to `deploy`.  
After the pipeline is completed and `deployutils` execution is successful, retry the post-deploy stage of the pipeline to regenerate AW build artifacts associated with personalization kits.  
**Note:** In the latest version, there is no need to manually run the restart workflow. The deploy pipeline automatically restarts the workload after any subsequent pipeline run (example: personalization).
