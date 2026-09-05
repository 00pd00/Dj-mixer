Prerequisites:
- Server of Manufacturing Engineering System server.
- URL for Manufacturing Engineering System Web UI access
- Established connection between TcX server and Manufacturing Engineering System server.

**SOW for the customer to establish connection between AIG and Manufacturing Engineering System.**
- The following elements are necessary to establish a successful connection between AIG and Manufacturing Engineering System:
   - IP of the Manufacturing Engineering System
   - Hostname of the Manufacturing Engineering System
   - .pem SSL certificate for connection

- Login to the AIG machine and navigate to the '/siemens/aig/apps/gs1/gs/var/conf/cert' directory and upload the https SSL certificate file.
![Image](./image_1.png)


- Add the entry `<IP of Manufacturing Engineering System> <Hostname of Manufacturing Engineering System>` in system host file at ‘/etc/hosts’.

 Example: 172.24.227.219 GOAQACEP2445.SWQA.TST 

 ![Image](./image_2.png)


**Customer to raise ticket for following post deployment steps:**
- Prepare the directory structure for CN4T
   - Update set ::userDomain “.” in cn4t_mapping_config.sd at 
   ```bash
    /siemens/aig/gs/var/mmap/cn4t_mapping_config.sd.
   ```
   - Copy libcn4t.so from corporate server/DC machine available at location `/<customerID>-<EnvType>/<customerID>-<EnvType>`/external/bin to '/siemens/aig/apps/gs1/gs/bin64'

   Note: Repeat above steps for all the GS environments

- Perform starter package import
   - Login to the Corporate server/DC machine as a tcx user
   - Set context using below command 
   ```bash
   .  tcc set_context `<customerID> <EnvType>`
   ```
   - Copy the folder (recursively) StarterPackage4ManufacturingEngineering from AIG machine from location '/siemens/aig/apps/gs1/gs/var/template/cn4t' to the Customer bucket and from customer bucket to the corporate server.
   After copying the folder structure should look like this 
![Image](./image_3.png)



   - Navigate to StarterPackage4ManufacturingEngineering folder copied from above.
   - Copy the StarterPackageImport.sh script from below location:
'/siemens/DeploymentCenter/repository/software/Opcenter_Connect_Integration_tc2412_Linux_x86_64/tc/features/ocf0foundation' to the existing directory.
   - Run the StarterPackageImport.sh script and enter the password for infodba.


**Customer to login to GS web application using CyberArk:**
Follow Below Steps in GS Web Admin Console.
- Login into GS->scripts->search for 'Generate mapping and mapping deployment'->use GS login credentials and run the script.

![Image](./image_4.png)

- After running the script response should be as below.

![Image](./image_5.png)


**Customer to validate the connectivity of AIG to Manufacturing Engineering System**

- Add communication channel in GS for Manufacturing Engineering Systems
![Image](./image_6.png)

- Please configure the Manufacturing Engineering Systems parameters according to the following specifications

| Parameter | Value | Remarks |
|---|---|---|
| Name | OpcEXCR | Can be anything |
| Host | Fully Qualified domain name | Specific for the environment you are using |
| Port | Port of Manufacturing Engineering Systems | Specific port which was opened during connectivity between TcX and Manufacturing Engineering System |
| IP Stack | IPv4 and IPv6 | Needs to be exactly same |
| Transport Mode | HTTPS (TLS/SSL) | Needs to be exactly same |
| CA certificate | .pem file which was pasted at "/siemens/aig/apps/gs1/gs/var/conf/cert" | Specific for the environment you are using |
| Proxy | Empty | |

- The connection configuration to access an Opcenter server must be set via the script 'cn4t_excr_connect.tcl' in the Gateway service admin UI.

| Parameters | Value | Remarks |
|---|---|---|
| Action | Define and Store Credential alias | Should be the same |
| Credential Alias | Value inserted in Name while adding communication channel | Should be the same |
| Destination | Value inserted in Name while adding communication channel | Should be the same |
| Opcenter EX CR System Base URL | modelling/api | Should be the same |
| User | Username of Manufacturing Engineering System environment | Should be the same |
| Password | Password of Manufacturing Engineering System environment | Should be the same |
| Seconds until token expires | 720 | Should be the same |
| Max assumed clock skew in seconds | 60 | Should be the same |
| UseOAuth | TRUE | Should be the same |
| Overwrite | yes | Should be the same |
| Keep or delete the cached token before connecting | Delete | Should be the same |

- After running the script, the response should be as below
![Image](./image_7.png)
