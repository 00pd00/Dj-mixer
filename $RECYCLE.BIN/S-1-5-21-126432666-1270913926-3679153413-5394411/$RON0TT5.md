
If a personalization kit is already applied to an existing deployment and needs to have an updated version of personalization deployed on that existing environment, the deployment pipeline should be rerun while giving the updated version and kit path in the `AdditionalSoftware` parameter as per the steps provided below:

1. Copy previously run deployment pipeline parameters as found in the customer input JSON that is supplied to the Ansible tower.
2. Update `AdditionalSoftware` and `TeamcenterPackageIDList` parameters with the updated version and kit path information.

### AdditionalSoftware:
```yaml
AdditionalSoftware:
    - software_id: "<software-id-1>"
      version: "<updated-software-version-1>"
      kit_file:
          lnx64: "s3://common-tenant-bucket-name/path/to/linux64/updated-kit.zip"
          wntx64: "s3://common-tenant-bucket-name/path/to/windows64/updated-kit.zip"
    - software_id: "<software-id-2>"
      version: "<updated-software-version-2>"
      kit_file:
          lnx64: "s3://common-tenant-bucket-name/path/to/linux64/updated-kit2.zip"
          wntx64: "s3://common-tenant-bucket-name/path/to/windows64/updated-kit2.zip"
```

### TeamcenterPackageIDList:
```yaml
TeamcenterPackageIDList:
- "<DC-package-id-1>"
- "<DC-package-id-2>"
```

3. Rerun the deployment pipeline with the updated parameters as per the instructions provided in section [Stopping and Restarting TcX Containerized Deployment](../../../Documentation/Operations/Day%20N%20Operations/Shutdown%20and%20restart%20workloads#stopping-and-restarting-tcx-containerized-deployment).

> **Note:** Only packages that were not deployed previously or are a newer version of an already deployed package will be installed.
