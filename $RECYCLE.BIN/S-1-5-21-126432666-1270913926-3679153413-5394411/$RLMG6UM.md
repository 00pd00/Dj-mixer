# FMS Re-Configuration

This guide explains how to reconfigure the File Management System (FMS) in Teamcenter X Standard/Advanced/Premium to recognize a tenant’s shadow volume.

---

## FMS Re-Configuration

### Get Info of Tenant’s Shadow Volume

Export the current volume information from Teamcenter X Standard/Advanced/Premium.

1. **Export Volume Info**
   ```bash
   tcc exec 'mkdir -p tcxlite2tcx/tcxlite/target_vol_info2; cd tcxlite2tcx/tcxlite/target_vol_info2; export TC_KEEP_SYSTEM_LOG=1; backup_xmlinfo -u=infodba -pf=<infodba_pwd_file> -g=dba'
   ```
   - This command provides details about volumes in XML format.

2. **Open the Output File**
   - Review the resulting `backup.xml` file.
   - Extract these values for the tenant's shadow volume:
     - `enterpriseId`
     - `volumeUid`

---

### Update FSC (FMS Master XML)

Manually update the FMS configuration to include the tenant's shadow volume.

1. **Open the FMS Master XML**
   - File location:  
     ```
     /<CUSTOMER_ID>/<CUSTOMER_ID>/deploy/component/config/fmsmaster/fsc
     ```

2. **Update FMS Master**
   - Insert a new `<cloudvolume>` element with the extracted values.  
     Add this element to the relevant `<fsc>` block (look for `<fsc id="<fsc_id>" address="..." ismaster="true">`).

   - Example:
     ```xml
     <cloudvolume 
         id="<TenantShadowVolume_uid>" 
         enterpriseid="<enterpriseId>" 
         root="cloud" 
         cloudserviceid="<CloudServiceID_of_cloned_DSS_vault>" 
         externalstorageid="<cloned_DSS_vault_id>" 
     />
     ```
   - **Note:**  
     Place the `<cloudvolume>` element before the first other cloud volume in the file, making it the first cloud volume entry.

3. **Restart FMS to Apply Changes**
   - **Using ArgoCD:**
     1. Log in to ArgoCD:  
        [ArgoCD US for XCR US regional clusters](https://argocd.nac1.co.sws.siemens.com/applications) or [ArgoCD EMEA for XCR EMEA regional clusters](https://argocd.emea1.co.sws.siemens.com/applications) or [ArgoCD APAC for XCR APAC regional clusters](https://argocd.apac1.co.sws.siemens.com/applications)
     2. Search applications for  
        `<Customer_ID>-<envtype>-teamcenter-tcx-helm`
     3. Find the deploy component `FMSMaster`.
     4. Delete `FMSMaster` (it will be recreated automatically, effectively restarting it).

---

### Validation

1. **Verify in Teamcenter**
   - Log in as `infodba` to Teamcenter X Standard/Advanced/Premium.
   - Go to the Organization module > Volumes.
   - Open the tenant's shadow volume.
   - Check the FMS configuration reporting to ensure the update was successful.

**Note:**  
A future FMS rewiring utility will automate these steps. When that is available, this manual section will be removed.
