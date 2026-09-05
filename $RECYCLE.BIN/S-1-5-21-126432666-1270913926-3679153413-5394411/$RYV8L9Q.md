# FSx Restore Operation Failure

In the event of pipeline failures during FSx restore operations due to SnapMirror relationships, follow the steps below to resolve the failure

**Pipeline Failure Error:**
```
error:
      code: '917858'
      message: Volume "Siemens_[tenant_id]_[tenant_env]_fsx_volume" in SVM "Siemens-[tenant_id]_[tenant_env]-svm" is the destination or source endpoint of one or more SnapMirror relationships. Before you can delete the volume, you must delete the relationships for which it is the destination endpoint, and release the source information for the relationships for which it is the source endpoint using "snapmirror release".
```

---

## Step 1: Delete FSx ONTAP Volume from AWS Console

- Open the Amazon FSx console at https://console.aws.amazon.com/fsx/.
- In the left navigation pane, choose File systems, and then choose the ONTAP file system **Siemens-[tenant_id]-[tenant_env]-fsx**.
- Choose the Volumes tab.
- Select the Volume **Siemens_[tenant_id]_[tenant_env]_fsx_volume**.
- For **Actions**, choose **Delete volume**.
- In the confirmation dialog box, for **Create final backup**. Choose **No**, 
- Confirm the volume deletion by entering delete in the **Confirm delete** field.
- Choose **Delete volume(s)**.


![Image](./image004_fsx_delete_volume.PNG)

---

## Step 2: Create FSx ONTAP Volume from AWS Console
- Open the Amazon FSx console at https://console.aws.amazon.com/fsx/.
- In the left navigation pane, choose File systems, and then choose the ONTAP file system **Siemens-[tenant_id]-[tenant_env]-fsx**.
- Choose Create volume.
- For Storage virtual machine, choose the storage virtual machine (SVM) **Siemens-[tenant_id]-[tenant_env]-svm**.
- In the **Volume details** section, provide the following information:

| Field | Value |
| -------- | ------- |
| Volume name | Siemens_[tenant_id]_[tenant_env]_fsx_volume |
| Volume style | FlexVol |
| Volume size | 1 **GiB** |
| Volume type | Read-Write (RW) |
| Junction path | /fsx_volume |
| Storage efficiency | Enabled |
| Volume security style | Unix(Linux) |
| Snapshot policy | None |

- In the **Storage tiering** section, provide the following information:

| Field | Value |
| -------- | ------- |
| Capacity pool tiering policy | None |

- In the **Advanced** section, provide the following information:

| Field | Value |
| -------- | ------- |
| SnapLock Configuration | Disabled |

- In the **Tags optional** section, provide the following information:

| Tag key | Value |
| -------- | ------- |
| SnapLock Configuration | Disabled |

- Choose **Confirm** to create the volume.


You can monitor the update progress on the **File systems** detail page, in the **Status** column of the **Volumes** pane. The volume is ready for use when its status is **Created**.

---

### Step 3: CloudWatch Metrics Steps

1. Navigate to the AWS Management Console and search for **CloudWatch**.
2. In the left panel, go to the **Metrics -> All metrics** tab and click on **FSx** (**Refer**: [Image 1](#image-1)).
3. Select AWS region and **Detailed File System Metrics** from the Browse tab (**Refer**: [Image 2](#image-2)).
4. Enter FSx ONTAP file-system IDs of **Siemens-[tenant_id]-[tenant_env]-fsx** in the search panel (**Refer**: [Image 3](#image-3)).
5. Select **StorageCapacity** and **StorageUsed** for Storage Tier **SSD** (**Refer**: [Image 4](#image-4)).
6. Go to **Graphed metrics** and wait for **80%** of FSx's SSD Storage capacity to be freed (**Refer**: [Image 5](#image-5)).
##### Image 1
![Image](./image008_fsx_cloudwatch.png)
##### Image 2
![Image](./image009_fsx_detailed_matrics.png)
##### Image 3
![Image](./image010_fsx_search_filesystem.png)
##### Image 4
![Image](./image011_fsx_select_metrics.png)
##### Image 5
 ![Image](./image012_fsx_graphed_metrics.png)

---

### Step 4: Rerun the failed Pipeline

Once, above steps are completed, rerun the failed restore pipeline stage.