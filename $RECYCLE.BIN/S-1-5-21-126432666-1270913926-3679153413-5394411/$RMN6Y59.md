## Build-infra Failed: Resource Already exists

**Issue Description**:

Build-infra stage failed with resource already exists.

![alt text](image_440.png)

**Work Around:**  
1. Go to the Azure Portal.  
2. Navigate to the Tenant Resource Group (tcx-tenant-[tenantid]-[env]-rg).  
3. Search for the resource causing the error, navigate to the resource, and delete it.
 ![alt text](image_441.png)
 ![alt text](image_442.png)

4. If you encounter a deletion error. 
![alt text](image_443.png)

- Click on the Private link resource,
  ![alt text](image_445.png)
- Go to the locks and delete the lock.
  ![alt text](image_446.png)

5. Follow **step3** again and delete the resource.
6. Once the resource is deleted, rerun the tenant pipeline.
![alt text](image_444.png)


## Build Infra Failure due to entity alias already present

The build infrastructure process fails because an entity alias with the tenant ID already exists in Vault.<br/>

![alt text](image-10.png)

### Steps to Resolve

1. Login to Vault <br/>

2. Navigate to `Access->Entities-> Aliases` <br/>
  ![alt text](image-11.png)<br/>
   ![alt text](image-12.png)
   
3. You will find an entity alias in the following format:  
  `<env_type>-<tenant_id>-CorpServerRole/<instance_id>`.  
  Rename this alias by adding `_old` as a suffix. The new alias format will be:  
  `<env_type>-<tenant_id>-CorpServerRole/<instance_id>_old`.
   ![alt text](image-13.png)
   ![alt text](image-14.png)
   ![alt text](image-15.png)

4. Rerun the pipeline for build infra in git.
 
