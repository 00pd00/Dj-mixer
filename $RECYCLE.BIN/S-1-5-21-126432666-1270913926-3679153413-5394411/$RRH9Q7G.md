# Resize Azure NetApp Files Resources

## 1. Description
Re-trigger the pipeline for resizing Azure NetApp Files resources based on user-defined pool size, volume size, and throughput.

## 2. Pre-requisites
- The deployment must be an **AzureNetapp**-based deployment, i.e., TcFMSVolumeType:["AzureNetapp"]

## 3. Implementation

### 3.1 Resize Azure NetApp Capacity Pool:

1. Rerun the pipeline using `PipelineStage: build_infra` and `AzANFPoolSizeTB: <custom-size>`. Check out [Azure Customer Input](../../010_Tenant%20Onboarding/010_Pre-Reqs/020_Ansible%20Template%20Input/020_AZURE%20Customer%20Input.md) for more details on inputs. Keep all other input parameters the same as the original deployment. After the rerun, the capacity pool will be resized.
2. Validate Using Azure Portal:
    - Activate your Contributor access by activating the Operator Group assignment on the target `AZURE_SUBSCRIPTION_ID`.

    - Navigate to tcx-tenant-< tenant >-< env-type >-rg

    - Search for capacity pool

    ![alt text](image_363.png)

    - In the overview section, verify that the "size" parameter reflects the custom size specified in your input parameters.

    ![alt text](image_364.png)

### 3.2 Resize Azure NetApp Volume:

1. Rerun the pipeline using `PipelineStage: build_infra` and `AzANFVolumeSizeGB: <custom-size>`. Check out [Azure Customer Input](../../010_Tenant%20Onboarding/010_Pre-Reqs/020_Ansible%20Template%20Input/020_AZURE%20Customer%20Input.md) for more details on inputs. Keep all other input parameters the same as the original deployment. After the rerun, the volume will be resized.
2. Validate Using Azure Portal:
    - Activate your Contributor access by activating the Operator Group assignment on the target `AZURE_SUBSCRIPTION_ID`.

    - Navigate to tcx-tenant-< tenant >-< env-type >-rg

    - Search for Volume

    ![alt text](image_365.png)

    - In the overview section, verify that the "quota" parameter reflects the custom size specified in your input parameters.

    ![alt text](image_366.png)

### 3.3 Increase Throughput MiB/s of the Azure NetApp Volume: 

1. Rerun the pipeline using `PipelineStage: build_infra` and `AzANFVolumeThroughputMibps: <custom-throughput>`. Check out [Azure Customer Input](../../010_Tenant%20Onboarding/010_Pre-Reqs/020_Ansible%20Template%20Input/020_AZURE%20Customer%20Input.md) for more details on inputs. Keep all other input parameters the same as the original deployment. After the rerun, the throughput will be increased.
2. Validate Using Azure Portal:
    - Activate your Contributor access by activating the Operator Group assignment on the target `AZURE_SUBSCRIPTION_ID`.

    - Navigate to tcx-tenant-< tenant >-< env-type >-rg

    - Search for Volume

    ![alt text](image_365.png)

    - In the overview section, verify that the "Max. Throughput MiB/s" parameter reflects the custom throughput specified in your input parameters.

    ![alt text](image_367.png)

**Notes:** 
- Throughput increase is only applicable for `AzANFServiceLevel` = `Flexible`
- To resize multiple components simultaneously (capacity pool, volume size, and/or throughput), include all desired parameters in the same pipeline run. For example, use `AzANFPoolSizeTB: <custom-size>`, `AzANFVolumeSizeGB: <custom-size>`, and `AzANFVolumeThroughputMibps: <custom-throughput>` together in a single deployment to resize all components at once.
