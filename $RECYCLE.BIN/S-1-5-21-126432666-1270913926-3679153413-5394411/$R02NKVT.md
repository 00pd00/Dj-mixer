

The administrator must specify the name of the personalization DC package to deploy and the location on disk of the personalization package, along with the rest of the inputs, including the product IDs to be deployed. The steps below describe in more detail how the pipeline is executed with these inputs.

As part of the input JSON for the deploy automation pipeline, the admin will add the following additional entries:

### TeamcenterPackageIDList
```yaml
TeamcenterPackageIDList:
- <DC-package-id-1>
- <DC-package-id-2>
...
```

### AdditionalSoftware
The location of the personalization package on disk, as specified below. This format is similar to the format of `teamcenter_install_kit_config.json`, which is where other TcX software is described:

```yaml
AdditionalSoftware:
    - software_id: "<software-id-1>"
        version: "<software-version-1>"
        kit_file:
            lnx64: "s3://<common-tenant-bucket-name>/path/to/linux64/kit.zip"
            wntx64: "s3://<common-tenant-bucket-name>/path/to/wntx64/kit.zip"
    - software_id: "<software-id-2>"
        version: "<software-version-2>"
        kit_file:
            lnx64: "s3://<common-tenant-bucket-name>/path/to/linux64/kit2.zip"
            wntx64: "s3://<common-tenant-bucket-name>/path/to/wntx64/kit2.zip"
...
```

### Notes
- Replace `<DC-package-id-1>` and `<DC-package-id-2>` with the package IDs from associated software kits specified in `AdditionalSoftware` input. The `<DC-package-id>` inputs can be fetched from `<personalization-kit>/dc_contributions/packages/<package-id>_package.xml`.
- Replace `<common-tenant-bucket-name>` with `tcx-tenantbucket-<tenant AWS region>-<tenant_id>-<AWS_Account_number>`.
- Replace `<software-id-1>`, `<software-id-2>`, `<software-version-1>`, `<software-version-2>`, etc., with actual identifiers, and `s3://<common-tenant-bucket-name>/path/to/...` with actual S3 paths to the kit files.
- There should not be any tab space in the input YAML.

#### Initial Deployment First
The common bucket for the Tenant ID is created only after the first environment (e.g., dev, uat) for that Tenant ID has been successfully deployed. Therefore, personalization kits cannot be uploaded to the common bucket before this initial deployment is complete when attempting to apply personalization to a fresh PRD deployment.

#### Upload Kits After Initial Deployment
- Once the initial environment is live, the common bucket for the Tenant ID becomes available.
- Upload the kits files to this common bucket.

#### Subsequent Deployments (e.g., PRD)
- For all subsequent environments created for the same Tenant ID, the common bucket (and its uploaded kits) is already accessible.
- During the deployment of subsequent environments, select the required personalization kits directly from the common bucket. Re-uploading is not necessary.

**In essence:** Deploy the first environment to establish the common bucket, then upload the kits, and finally, select those kits for any subsequent environments.

---

The admin user triggers the pipeline from Ansible Tower with the above-mentioned input YAML parameters along with the rest of the parameters required for a new deployment, with `PipelineStage` set to `deploy`.
