# EFS Throughput Issues for Large File Upload

## Problem

When uploading large files to Teamcenter X, you may experience slow performance or timeouts due to insufficient EFS throughput settings.

## Solution

If you encounter issues with large file uploads, follow these steps to change the EFS throughput settings:

:::note
By default, EFS performance is now set to **Elastic** mode. Only perform these steps if you're experiencing throughput-related issues or if your EFS is configured with **Bursting** mode.
:::

### Steps to Change EFS Throughput Settings

1. Login to tenant AWS account
2. Navigate to the **EFS service** in the AWS Console
3. Click on each EFS (one by one) to view more details
4. Click the **Edit** button to start editing EFS settings
5. Change the performance settings from **Bursting** to **Elastic** as shown in the image below and save the settings

![EFS Performance Settings](../030_Day%20N%20Operations/image_372.png)

## When to Apply This Fix

Apply this solution if you experience:
- Slow file upload speeds
- Upload timeouts for large files
- EFS performance warnings in AWS console
- Your EFS is still configured with Bursting mode instead of Elastic

