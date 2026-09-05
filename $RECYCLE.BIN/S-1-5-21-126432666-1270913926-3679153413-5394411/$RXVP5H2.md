## Troubleshooting - Rich client unable to download the client cache file while logging into Teamcenter
**Issue Description**:

After a successful Rich client installation, when a user tries to log in, the client starts synchronizing the Rich Client install files with the Teamcenter Server. If the synchronization cannot communicate with the Teamcenter server, it leads to "Unable to download" and unsuccessful login errors.  
This issue is related to client machine configurations in `fcc.xml`.

![Image](./image_409.png)

![Image](./image_410.png)

**Troubleshooting Steps**

### 1. Check the FCC Configuration  
- Navigate to the Rich client installation directory (e.g., `C:\apps`).  
- Open `C:\apps\Siemens\Teamcenter2506\tccs\fcc.xml` in a text editor and look for the key parameters. 
- Example `fcc.xml` configuration:
```xml
<site id="<tenant_id-tenant_env>" overridable="true">
    <parentfsc address="https://<tenant_id-tenant_env>.testplmcloudsolutions.com:443/tc/fms/authenticatingfsc/" priority="0"/>
    <assignment mode="parentfsc"/>
</site>

<parentfsc address="https://<tenant_id-tenant_env>.testplmcloudsolutions.com:443/tc/fms/authenticatingfsc/" priority="0" transport="lan"/>
```
- Make sure the parentfsc address is in the same format.

![Image](./image_411.png)

### 2. Verify FCC status 
- Launching the Teamcenter application automatically starts the FCC service.
- To check the FCC status, open a command prompt and navigate to `C:\apps\Siemens\Teamcenter2506\tccs\bin`.
- Run the command `fccstat.exe -status`; the output will indicate if FCC is offline (FCC Offline.) or active (shows active status).

![Image](./image_412.png)

### 3. Verify FCC cache directory
- Upon launching the Teamcenter application, the FCC service also initiates and creates the FCCCache directory along with other directories (e.g., Siemens, Teamcenter) in the user directory `C:/user/username/`.

![Image](./image_413.png)

### 4. Verify FCC log file 
- If the Teamcenter application successfully completes synchronizing the Rich Client install files with the Teamcenter Server, it will take you to the Teamcenter Dashboard.
- Users can also check the FCC log file to confirm whether the FCC cache file was downloaded.

![Image](./image_414.png)