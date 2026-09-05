# Shadow Volume Setup in Teamcenter X Standard/Advanced/Premium

This guide explains how to create a shadow volume in Teamcenter X Standard/Advanced/Premium that corresponds to the default volume of `infodba` (an EFS volume) in Teamcenter X Essentials. Follow the steps below to ensure data accessibility and proper configuration.

---

## Shadow Volume in Teamcenter X Standard/Advanced/Premium

### Copy the Default Volume (EFS Volume) from TCX Essentials

1. **Locate the EFS Volume on Teamcenter X Essentials**  
   The EFS (Elastic File System) volume is located at:
   ```
   /<CUSTOMER_ID>-ipdata/<CUSTOMER_ID>-ipdata/ipdata/fms/volumes/DefaultVolume
   ```

2. **Copy the Entire EFS Volume**  
   Copy the complete contents of the above directory from Essentials to a location in Teamcenter X Standard/Advanced/Premium.
   ```
   /<CUSTOMER_ID>-ipdata/<CUSTOMER_ID>-ipdata/ipdata/fms/volumes/tempadminvol
   ```
3. **Set Permissions**  
   After copying, grant the required permissions to all files and folders so they can be read and written by Teamcenter X Standard/Advanced/Premium.

4. Check if `/<CUSTOMER_ID>-ipdata/<CUSTOMER_ID>-ipdata/ipdata/fms/volumes/tempadminvol` is mounted to /administration/admin_work/fms/volumes/tempadminvol
---

### Create a Shadow Volume (“tempadminvol”) in TCX Standard/Advanced/Premium

You will now set up a corresponding shadow volume, referred to as `tempadminvol`, in Teamcenter X Standard/Advanced/Premium.

#### Steps:

1. **Fetch the FSC ID**  
   - Retrieve the FSC (File Server Controller) home folder path:
     ```bash
     printenv | grep "FSC_HOME"
     ```
   - Access the folder and open the FMS master XML:
     ```bash
     cd /<CUSTOMER_ID>-prd/<CUSTOMER_ID>-prd/deploy/component/config/fmsmaster/fsc/
     vi fmsmaster_FSC_fmsmaster.xml
     ```
   - Find the XML `<fsc>` element where `ismaster="true"`. An example entry:
     ```xml
     <fsc address="http://vc6s015:4544" id="FSC_vc6s015_yytcadm" ismaster="true">
     ```
   - If there are two  `<fsc>` elements where `ismaster="true"` as below,
     ```xml
     <fsc address="http://authenticatingfsc:4544" id="FSC_authenticatingfsc" ismaster="true"/>
     <fsc address="http://fmsmaster:4544" id="FSC_fmsmaster" ismaster="true"> 
     ```
     then take the fsc id from the below element
     ```xml      
     <fsc address="http://fmsmaster:4544" id="FSC_fmsmaster" ismaster="true"> 
     ```
   - Note the value of the `id` attribute (e.g., `FSC_vc6s015_yytcadm`. `FSC_fmsmaster`).  
     This is your `fscid`.

2. **Prepare Volume Creation Information**  
   - `TCXHostName`: Host where the volume will reside (typically the node hosting TCX).
   - `path`: Path in TCX where you copied the EFS volume from Essentials.

3. **Create the Shadow Volume**  
   Run the following command, substituting `<infodba_pwd>`, `<fscid>`, and `<path_of_copied_volume>`:
   ```bash
   tcc exec 'export TC_KEEP_SYSTEM_LOG=1; make_user -u=infodba -pf=<infodba_pwd_file> -g=dba -volume=tempadminvol -fscid=<fscid> -node=container -path=<path_of_tempadminvol>'
   ```
   **Example:**
   ```bash
   tcc exec 'export TC_ADMIN_PWD=<infodba_pwd>; export TC_KEEP_SYSTEM_LOG=1; make_user -u=infodba -p=$TC_ADMIN_PWD -g=dba -volume=tempadminvol -fscid=FSC_fmsmaster -node=container -path=/fms/volumes/tempadminvol'
   ```

4. **Verify Volume Creation**  
   Check that `tempadminvol` is correctly registered in the FMS master file.  
   - The FMS master XML is typically at:
     ```
     /<CUSTOMER_ID>/<CUSTOMER_ID>/deploy/component/config/fmsmaster/fsc
     ```

5. **Update `TIE_Volume_Map` Preference**  
   Refer to the next section for instructions.

---

### Configure `TIE_Volume_Map` Preference

1. **Create the Preference**  
   - Create a site-level, multivalued preference named `TIE_Volume_Map` with protection scope set to **Site**.
   - If this preference already exists, you can skip the creation step.

2. **Clear Existing Values**  
   Remove any values present in the `TIE_Volume_Map` preference to avoid conflicts.

3. **Add Volume Mapping**  
   - Add a mapping between the Teamcenter X Essentials default volume (`infodba` EFS volume) and the newly created shadow volume (`tempadminvol`) in Teamcenter X Standard/Advanced/Premium.
   - The required format is:  
     ```
     source_volume_name,target_volume_name
     ```

      **Example:**
      ```
      DefaultLocalVolume,tempadminvol
      ```
   - Repeat this process to map all tenant-specific volumes.<br/>

      **Example:**
      ```
      DefaultLocalVolume,tempadminvol
      500126104_vol,500126104_vol      
      ```

      ![alt text](image-2.png)
