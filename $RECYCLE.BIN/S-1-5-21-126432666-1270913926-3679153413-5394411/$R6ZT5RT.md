# Steps to bump up the deploy/ipdata file shares' size

## 1. Trigger the deploy pipeline up to the build_infra stage
- Follow the steps in [Trigger deploy pipeline](../../010_Tenant%20Onboarding/020_Basic%20Flow/000_Ansible%20playbook%20execution.md) using the `TcX deployment Template` (refer to [Ansible templates](../../010_Tenant%20Onboarding/020_Basic%20Flow/020_Ansible%20Templates%20Table.md)), provide the below inputs and confirm that the pipeline run completes successfully.
```
PipelineStage: build_infra
AzDeployShareSizeGB: <New size in GB>
AzIPDataShareSizeGB: <New size in GB>
```

**Azure sample inputs to bump up the Fileshare sizes:**

![image](./image_289.png)

## 2. Validate that the File share size is bumped up to the specified values
### Access the Azure Portal
- Log in to the Azure Portal using your SPLM credentials.
- Locate the resource group: `tcx-tenant-<tenant-id>-<env-type>-rg`.
- Locate the Azure files Storage Account: `tcxt<tenant-id><env-type>fsa<First 3 characters of the tenant-subscription-id>`. E.g., `tcxtazpdora08prdfsa0ef`
- Expand `Data Storage` in the left pane and click on `File shares`

![image](./image_287.png)

- Click on the Fileshare whose size was bumped up and the updated size can be seen in the `Overview` section under the `Properties` tab as shown in the below figure.

![image](./image_288.png)
