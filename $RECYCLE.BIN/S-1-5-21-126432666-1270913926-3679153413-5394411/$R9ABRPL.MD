
##### Enable S3 access logging for Terraform state buckets (for existing accounts)

**Note:** S3 access logging is already enabled by the `tcx-tenant-install` pipeline automation for new cells. Follow this section only for the existing AWS accounts/cells.



### Enable Access Logging for S3 Buckets

To enable access logging for S3 buckets, follow these steps:

1. **Login to the AWS Account**  
    Go to the S3 Console.

2. **Create a New Bucket**  
    Use the following naming convention:  
    `tcx-s3-access-logs-<TcX Tenant Administrator AWS Region>-<TcX Tenant Administrator AWS Account Id>`  
    ![Image](./image_43.png)

    - Block all public access while creating the bucket:  
      ![Image](./image_44.png)

    - Click on **Create Bucket**:  
      ![Image](./image_45.png)

3. **Create a Lifecycle Rule**  
    - Go to the **Management** section in the bucket and create a lifecycle rule:  
      ![Image](./image_46.png)  
      ![Image](./image_47.png)

    - Select all lifecycle rule actions:  
      ![Image](./image_48.png)

    - For current versions of objects, select **Glacier Flexible Retrieval** and set **30 days** after object creation:  
      ![Image](./image_49.png)

    - For non-current objects, select **Glacier Flexible Retrieval** and set **30 days** after objects become noncurrent:  
      ![Image](./image_50.png)

    - Set object expiry and deletion values:  
      ![Image](./image_51.png)

    - Set lifecycle for deletion of incomplete multipart uploads:  
      ![Image](./image_52.png)

    - Review the transition and expiration actions. The rules should match the following:  
      ![Image](./image_53.png)

    - Click on **Create Rule**. The rule is now created:  
      ![Image](./image_54.png)

4. **Enable Server Access Logging**  
    - Go to the S3 bucket:  
      `tcx-tf-state-<TcX Tenant Administrator AWS Region>-<TcX Tenant Administrator AWS Account Id>`  
      Example:  
      ![Image](./image_55.png)

    - In the **Properties** section, if server access logging is not enabled, click on **Edit**:  
      ![Image](./image_56.png)

    - Select **Enable** and add the name of the bucket created in Step 1 with the prefix `logs/S3AccessLogs/`:  
      ![Image](./image_57.png)

    - Click on **Save Changes**:  
      ![Image](./image_58.png)

    - With these steps, S3 access logging is enabled for the cell-level Terraform state bucket. All bucket access logs will be stored in the location: `<bucket-name>/logs/S3AccessLogs`  
      ![Image](./image_59.png)

---