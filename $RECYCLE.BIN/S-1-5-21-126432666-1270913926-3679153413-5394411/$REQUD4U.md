**Tenant Destroy fails with NetworkIntentPolicy**  

**Issue Description**:

Whenever Pipeline fails in tenant destroy stage with error ConflictWithNetworkIntentPolicy as shown in the below screenshot, go to Azure portal check the activity log of tenant resource group. 

![Image](./image_448.png) 

**Work Around:**  

- Login to Azure portal.  
- Search the Activity logs.  
- Filter the tenant resource group and timespan.  
- Check the log entry of SQL by using the search box.  
- If a deletion of SQLMI managed instance operation is running, wait at least 2 hours before the next re-run of the destroy stage from gitlab so that the deletion operation can complete.  
- Once again, check the tenant Activity logs for a "Delete Network intent policy" entry as shown in the snippet below.  
- If the Network intent policy is deleted, you can re-run the destroy stage from gitlab.

![Image](image_449.png)