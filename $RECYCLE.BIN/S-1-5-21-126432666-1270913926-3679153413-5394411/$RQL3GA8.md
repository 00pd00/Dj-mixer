# Update Runner IPs that access Azure Resources 

## Description

This page explains how to update pipeline runner IP allow lists so that tenant pipelines can access required resources

## Before you start

- Access to `tcx-pipeline-variables` to edit variables.
- Permission to run the tcx-pipeline-account for updating TcX cell as well as Admin Subscription resources .

## Steps to update the admin subscription 

1. Identify the runner public IP from the failing job or error message and Update the allow IP list in admin yml file with that IP.

Example:
```yaml 
   GLBL_ADMIN_ALLOW_IP_STORAGE_ACCOUNT: '["121.241.69.194", "66.117.193.162","192.94.38.34","192.94.31.2","18.153.236.164","52.57.44.162","34.193.171.223","3.217.94.183"]'

```

2. Commit the changes and raise an MR 

3. Run the account pipeline to update the admin cell 

 Refer to [Trigger the pipeline](../../000_Cell-Setup/000_Automation%20Prerequisites/040_TcX%20Cell%20Setup/AZURE/010_Trigger%20Admin%20pipeline/010_Trigger%20the%20pipeline.md)


## Steps to update the TcX Cell 

1. Identify the runner public IP from the failing job or error message and Update the allow IP list in cloud yml file with that IP.

Example:
```yaml
    GLBL_ALLOW_IP_RULES: "66.117.193.162,192.94.38.34,121.241.69.194,192.94.31.2,18.153.236.164,52.57.44.162,34.193.171.223,3.217.94.183"
```
2. Commit the changes and raise an MR 

3. Run the account pipeline to update the TcX cell 

Refer to [Trigger Cell Pipeline](../../000_Cell-Setup/000_Automation%20Prerequisites/040_TcX%20Cell%20Setup/AZURE/040_Setup%20Cell%20Subscription/090_Trigger%20Cell%20Pipeline.md)

