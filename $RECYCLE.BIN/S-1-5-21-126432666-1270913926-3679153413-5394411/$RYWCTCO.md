# Rewire Volume Using FMS Rewiring Utility

This step-by-step guide shows how to use the DSSVaultRewiring utility to rewire a tenant shadow volume in Teamcenter X Standard/Advanced/Premium, connecting it to a cloned DSS vault.

---

## Rewire Volume

Using FMS rewiring utility, rewire the shadow volume of Tenant created in Teamcenter X Standard/Advanced/Premium, to connect to the cloned DSS vault.

### Step 1: Download the DSSVaultRewiring Utility  and  log4j.properties file.

Download the `DSSVaultRewiring.jar` utility, which assists in updating volume configurations:

- **Download Link (All Versions):**  
  [https://artifacts.industrysoftware.automation.siemens.com/ui/native/generic-local/com/siemens/tcx/utilities/dssvaultrewiring/](https://artifacts.industrysoftware.automation.siemens.com/ui/native/generic-local/com/siemens/tcx/utilities/dssvaultrewiring/)

- **Create your own log4j.properties and paste below contents:** 

    ```
    # Define the root logger with appender file 
    log4j.rootLogger = DEBUG, FILE

    # Define the file appender
    log4j.appender.FILE=org.apache.log4j.FileAppender
    log4j.appender.FILE.File=DSSVaultRewiring.log

    # Define the layout for file appender
    #%5p - Priority of the logging event
    #%t - Name of the thread that initiated the logging event
    #%F- File name where the logging issue was requested
    #%L - line number that caused the logging message to be generated
    log4j.appender.FILE.layout=org.apache.log4j.PatternLayout
    log4j.appender.FILE.layout.conversionPattern=%5p [%F:%L] - %m%n
    ```


**Notes:**
- Always select the latest version of the utility from the download location.
- For **Tc2406 and later**, use the Java 17 version:
  - [https://artifacts.industrysoftware.automation.siemens.com/artifactory/generic-local/com/siemens/tcx/utilities/dssvaultrewiring/8.0_Java17/](https://artifacts.industrysoftware.automation.siemens.com/artifactory/generic-local/com/siemens/tcx/utilities/dssvaultrewiring/8.0_Java17/)

---

### Step 2: Prepare the Utility for Use

- Rename the downloaded file to `DSSVaultRewiring.jar` to match the examples given in commands,  
  **or**  
- Adjust the command examples to use the actual utility file name (for example, `DSSVaultRewiring_java17.jar`).
- Users must ensure that the log4j.properties file is placed in the same directory as the DSSVaultRewiring.jar file before executing the utility.
- The database password must be retrieved from the Vault using the path: tcx/teamcenter/rds 
- Verify that the correct path to the fmsmaster.xml file is configured for both components, Master FSC and Authenticating FSC

    *example.*
    ```
    /<tenant>/<tenant-id>/deploy/component/config/fmsmaster/fsc/fmsmaster_FSC_fmsmastertrgprm06prd.XML
    ```
- Before running the utility, ensure that the Java environment variables are correctly configured.
Set the JAVA_HOME variable and update the PATH to include the Java binary directory, as shown below,                    export JAVA_HOME=/siemens/openjdk/21.0.8.9.1           
export PATH=$PATH:$JAVA_HOME/bin

---

By following these steps, you are ready to use the FMS rewiring utility for updating the shadow volume configuration for your tenant.

### Required Information

Prepare the following arguments for the utility:

| Argument           | Required? | Description                                                                              |
|--------------------|-----------|------------------------------------------------------------------------------------------|
| `databasehostname` | Yes       | RDS endpoint (from customer_infrastructure.json `'rds'->'endpoint'` or AWS console -> Databases -> Select the database -> Connectivity & Security -> Endpoint for Writer instance)      |
| `databasename`     | Yes       | Database name (usually `tcxdb`, from `'rds'->'dbname'`)                                 |
| `databaseusername` | Yes       | Database user name (usually `dbuser`, from `'rds'->'dbuser'`)                           |
| `databasepassword` | Yes       | Database password (from `'rds'->'dbpassword'`)                                          |
| `tc_root_dir`      | Yes       | Path to TC root directory (where the `fsc` folder is, e.g., `/apps/fsc_config`)         |
| `vaultid`          | Yes       | Cloned DSS Vault ID (`DestVaultId` from clone vault utility response)                    |
| `volumeName`       | Yes       | Name of the cloud volume in Teamcenter X that is being rewired                          |

---

### Running the Utility

**Procedure:**

1. Download the utility to a corporate server.
2. Open a Teamcenter Shell.
3. Log in as `tcx_user`.
4. Copy your current `fmsmaster.xml` to `/apps/fsc_config/fsc` (or a similar working directory).
5. Set `/apps/fsc_config` as your `tc_root_dir` argument.
6. Execute the utility as shown below.

**Syntax:**
```bash
java -jar DSSVaultRewiring.jar \
    databasehostname=<databasehostname> \
    databasename=<databasename> \
    databaseusername=<databaseusername> \
    databasepassword=<databasepassword> \
    tc_root_dir=<absolute path to TC root dir> \
    vaultid=<Vault ID> \
    volumeName=<Cloud volume name>
```

**Example:**
```bash
java -jar DSSVaultRewiring.jar \
    databasehostname=rdsaurora-prd-testcus1-databasecluster-lwou8554cfqg.cluster-cetkuvoqf7mi.us-west-2.rds.amazonaws.com \
    databasename=tcxdb \
    databaseusername=dbuser \
    databasepassword=G1Tigx9G9w2A \
    tc_root_dir=/apps/fsc_config \
    vaultid=dss-908378b8eca0443db5frt6e17cb130e3 \
    volumeName=TenatShadowVolume
```

---

### Apply Updated Configuration

1. **Copy Updated XML:**  
   Move the updated `fmsmaster.xml` from `/apps/fsc_config/fsc` back to its original Teamcenter location.

2. **Restart the Master FSC:**  
   [Shutdown and restart workloads](https://ctcx.code.siemens.io/cookbook/docs/2512/Documentation/Operations/Day%20N%20Operations/Shutdown%20and%20restart%20workloads/).
   This will apply the new configuration.

3. **Container Deployments:**  
   - Update the Authenticating FSC's `fmsmaster.xml` manually with the new/updated volume entry.
   - Copy the relevant entry from the main FMS master XML.
   - Restart the Authenticating FSC.
