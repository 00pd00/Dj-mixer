## Enable and access diagnostic logs for tcservers

Diagnostic logs for tcserver include the journal and SOA communication log files, apart from the syslog in debug mode. The following sections provide details on how to enable journalling and communication logging for tcservers in containerized TcX deployment.

### Enable Journalling for tcserver

Modify the `tc-common-env` config map in `helm_charts/onboarding/onboard_tcx/templates/configmap.yaml` file in the tenant git repo to add the following journal and debug variables as needed under the `data` section, and commit the changes:

```yaml
TC_JOURNAL: FULL
TC_Journalling: 'TRUE'
TC_JOURNAL_LINE_LIMIT: '0'
TC_DEBUG: 'ON'
TC_SQL_DEBUG: BJPT
```

To configure performance journalling, set the following variable in the `tc-common-env` config map:

```yaml
TC_JOURNAL_PERFORMANCE_ONLY: '1'
```

Synchronize the onboarding app in ArgoCD using the Sync command to update the `tc-common-env` configmap in the tenant namespace in the XCR Kubernetes cluster.

Restart tcservers to create journal files based on the above parameters from the config map. For restart:

1. Run the Restart workflow as documented in [Shutdown and restart workloads](../Day%20N%20Operations/Shutdown%20and%20restart%20workloads). Note that the workflow needs to be run with the 'Shutdown' action first and then with the 'Restart' action.
2. Select **"Teamcenter servers and pool manager"** in WORKLOAD and **"Shutdown"** ACTION in the Survey template first.
3. Wait for tcservers to stop (this may take a few minutes), and then run the workflow with the **"Restart"** action.

The restarted tcservers will start emitting journal files (`tcserver<pid>.jnl`) in the diagnostic log location specified in section [Access diagnostic logs](Enable%20Diagnostic%20logs%20for%20tcservers).

### Enable Communication Logging (SOA request response Log) for tcserver

To enable logging of SOA requests and responses for tcservers:

1. Update the `logging.logger.Teamcenter.Soa.Communication` variable in the `logger.properties` file for the tenant production deployment as shown below:

    ```properties
    logging.logger.Teamcenter.Soa.Communication=DEBUG
    ```

    For development deployments, the above change needs to be made in the `logger.debug.properties` file.

2. The logger properties files are available in the below-mentioned tenant file share folder on the tenant Corporate server machine:

    ```
    /<tenant-id>-<environment-type>/<tenant-id>-<environment-type>/teamcenter/tc_data/
    ```

    where `<environment-type>` specifies the type of deployment with values like `prd`, `uat`, etc.

3. Restart the tcservers after the above change is done. For restart:

    - Run the Restart workflow as documented in [Shutdown and restart workloads](../Day%20N%20Operations/Shutdown%20and%20restart%20workloads).
    - Select **"Teamcenter servers and pool manager"** in WORKLOAD and **"Restart"** ACTION in the Survey template.

The restarted tcservers will start emitting communication log files (`tcserver<pid>.comlog`) in the diagnostic log location specified in section [Access diagnostic logs](Enable%20Diagnostic%20logs%20for%20tcservers).

### Using Reactive Logging to generate diagnostic log files for the tcserver from Active Workspace client

Note: This functionality is available in TcX Releases 2512.2602 and 2606.0000

Reactive Logging functionality is provided by Teamcenter to capture several types of logs for issues seen while working in Active Workspace client. This approach does not require restarting Teamcenter server pods. Please refer to the Teamcenter documentation for this functionality at [Create a log file to share with your administrator](https://internal.docs.sw.siemens.com/en-US/doc/282219420/PL20250520748650994.UserAssistance/xid1703909). Reactive logging generates a zip file (with name as `<teamcenter-user-id>_<date>_<time>`_reactivelogs.zip) with relevant log files in the diagnosticlogs folder on Linux machine in tenant account. These logs can be accessed using instructions provided in section [Access diagnostic logs](Enable%20Diagnostic%20logs%20for%20tcservers).

Reactive logging is controlled through a site specific preference **TC_ALLOW_REACTIVE_LOGGING** in Teamcenter X deployments. By default, reactive logging is turned off with the site preference value set to `false`. To enable it, CApS administrator needs to set this preference to `true` value from Active Workspace client using Active Admin workspace.

Once the reactive logging is enabled, the end users need to re-login and capture logs as per the instructions specified in Teamcenter documentation. There are few differences in how the reactive logging works in Teamcenter X compared to on-prem/process deployments:
 - Data related to Teamcenter server syslog and fscproxylog files will not be captured in the log zip file. Instead, ththis data will be available in Datadog.
 - The log zip file will not be available for download to the user performing the action. A CApS administrator will need to make this file available to the required resources from the diagnosticlogs location, as specified earlier.

Once the logs are collected, it is recommended that CApS administrator turn off the site preference by setting its value to `false`.

### Access diagnostic logs

The journal and communication log files are stored in the EFS volume (for AWS, or Storage Account FileShare volume for Azure), accessible through the tenant EC2 (for AWS, or Azure VM) machine at the location specified below:

```
/<tenant-id>-<environment-type>/<tenant-id>-<environment-type>/teamcenter/diagnosticlogs/
```

Please note that the Teamcenter syslog file will be available in the Datadog application.


### How to find the syslog information for an AW Client user

In Datadog:

1. From the left panel, go to **Infrastructure > Kubernetes Explorer**.
2. Search in the filter criteria for **Kubernetes -> Kubernetes Namespace** filter and type in the TenantID name. Pick the filter to show only the logs for your TenantID.

![Image](./image_382.png)

3. Pick the `tc-server` as the service filter and search for the user who logged in to AW Client.

![Image](./image_383.png)

4. Find the correct message related to your session and pick it. Use the **"View in Content"** to view all the messages with the same session ID. These are the messages on the server side for the AW Client in use.

![Image](./image_384.png)
