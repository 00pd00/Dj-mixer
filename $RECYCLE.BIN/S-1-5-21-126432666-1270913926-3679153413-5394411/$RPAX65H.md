To capture logs from Azure-managed resources into Datadog, a specific Azure setup is required. At the moment, this setup needs to be done manually.

SRE provides detailed instructions for this setup on the following page:
* [SRE Log Forwarding Solutions for Azure](https://developer.internal.siemens.com/fds/p0/sre/observability/logging/log_forwarding_solutions_azure.html)

The instructions on this page were used for the DEV setup, as the SRE instructions were not available at the time. However, the setup follows the same overall pattern described in the SRE page.

As an overview, you need to:
1. **Set up the Log Forwarding resources in the Admin Subscription.** (Required only once per environment type / Admin subscription)
2. **Configure Diagnostic Settings for Azure Resources to enable log capture.** (Required for each relevant individual Azure managed resource)

---

### 1. Set up the Log Forwarding Resources in the Admin Subscription

#### A. Create a Separate Resource Group for Datadog

In the Admin Subscription, create a resource group specifically for Datadog log forwarding. Following a hub-spoke architecture, the resources in this resource group will serve as a hub for all log forwarding required for an environment type (e.g., PROD or PRE_PROD).

For TcX Azure in DEV:
* The DEV Admin Subscription is: **NonProd46**
* The DEV Datadog Resource Group is: **tcx-admin-datadog-001-rg**

#### B. Create the Azure "Stack" (Event Hub, Function App, etc.)

From this point, you can follow the SRE instructions step by step.

Alternatively, we describe below the setup steps for DEV, as we used an automation "shortcut" (template) provided by Datadog.

1. Go to the following Datadog Guide page:  
   [Azure Logging Guide](https://docs.datadoghq.com/logs/guide/azure-logging-guide/?tab=eventhub)

2. Click on the "Deploy to Azure" button (under the "Event Hub" tab).  
   ![Datadog Guide](./sre_setup_120_0001.png)

3. In the Azure Portal, enter the required parameters, such as:
   - Select the Admin subscription.
   - Select the Resource Group created in step 1 for Datadog.
   - Enter the Datadog API key (obtain this from SRE for the environment type).
   - Set **Send Activity Logs**: `true`.
   - Enter the Event Hub Name: e.g., `tcx-admin-datadog-001-evh`.
   - Enter the Function App Name: e.g., `tcx-admin-datadog-001-dd-log-fwd-func-0001`.
   - Enter Datadog Tags: e.g., `cloud_provider:azure,product:tcx_azure_premium`.

4. Review the configuration, proceed, and wait, as it may take a few minutes to complete the deployment.  
   ![Review](./sre_setup_120_0002.png)

5. Confirm that Azure resources were created:
   - Check the resources created under the Datadog Resource Group. See DEV for an example:  
     ![Azure Resources](./sre_setup_120_0003.png)


### C. Ensure the Azure Resources for Log Forwarding are Secure

If you followed the above instructions ([section 1.B](#b-create-the-azure-stack-event-hub-function-app-etc)), it is possible some Azure resources created by the Datadog template are not properly secure, and "Microsoft Defender for Cloud" may be identifying some security issues. The following updates should address those security issues.

1. In the Azure portal, search for and select the Function App created by the Datadog template.
   - Use the Function App name used on step 1.B.3, for example, `tcx-admin-datadog-001-dd-log-fwd-func-0001`

2. Update the Function App "Settings > Networking":
   - For `Inbound traffic access`, change the `Public network access` from `Enabled from all networks` to `Disabled`
     ![Change Function App Networking](./sre_setup_120_0007.png)
 
3. Update the Function App "Settings > Configuration":
   - Select the "General settings" tab
   - Change `HTTPS only` to `On`
   - Change `Minimum Inbound TLS Version` to `1.3`
   - Change `Incoming client certificates: Client certificate mode` from `Ignore` to `Optional`
     ![Change Function App Configuration](./sre_setup_120_0008.png)
     ![Change Function App Configuration](./sre_setup_120_0008a.png)

4. Update the Function App "Settings > Identity":
   - Change "Status" from "Off" to "On"
   - in the popup "Enable system assigned managed identity", select "Yes"
     ![Change Function App Identity](./sre_setup_120_0009.png)

5. Update the Function App "API > CORS":
   - Remove the "*" entry from the `Allowed Origins`
     ![Remove Allowed Origins](./sre_setup_120_0010.png)


---

### 2. Configure Diagnostic Settings for Azure Resources to Enable Log Capture

By default, no specific Azure-managed resources created for TcX are required to have logs captured in Datadog at all times. However, this can be revisited if specific situations arise where logs are needed.

Note that auditing and security logs are captured in Splunk.

To confirm that the Log Forwarding setup is working, it is recommended to maintain at least one Azure resource sending logs to Datadog via the log forwarding setup.

For Azure resources that require logs to be forwarded, diagnostics need to be configured individually.

#### Prove the Log Forwarding Setup is Working

For example, to verify the setup, you can configure log forwarding from the Azure Firewall for one TcX cell subscription. Search for the Firewall resource (e.g., `tcx-cell-azm-eaus-preprod47-dev-007-shared-afw`), select **Monitoring > Diagnostic settings**, and edit the diagnostic settings (or add one if none is available).

1. In the Azure Portal, go to one of the TcX Cell subscriptions' "hub" (or "shared") resource group. For example, in DEV:
   - **Subscription**: NonProd45 subscription.
   - **Resource Group**: `tcx-cell-azm-eaus-preprod47-dev-007-shared-rg`.

2. Search for the firewall resource.
   - Example: `tcx-cell-azm-eaus-preprod47-dev-007-shared-afw`.

3. Select **Monitoring > Diagnostic settings**, and "edit" the diagnostic settings (or "add" one if none is available).  
   ![Diagnostics](./sre_setup_120_0004.png)

4. When editing the Diagnostic settings:
   - Select the logs to capture (e.g., `allLogs`).
   - Select **Stream to an event hub**.
   - Enter details for the event hub created in the TcX Admin subscription.
   ![Select Logs](./sre_setup_120_0005.png)

5. Save the settings and wait for a while to confirm that logs are reaching Datadog.
   - After changing the settings, it may take some time before log messages start appearing in Datadog.

6. Go to the Datadog Logs - Live Tail page:
   - Enter tags for the firewall or subscription, such as:
     - `cloud_provider:azure` or `product:tcx_azure_premium` or `service:azure`.
     - `subscription_name:nonprod_45_-_tcxonaz_dev_mca` or `resource_group:tcx-cell-azm-eaus-preprod47-dev-007-shared-rg`.
     - `source:azure.network` or `name:tcx-cell-azm-eaus-preprod47-dev-007-shared-afw`.
   - [Datadog Live Tail Example from DEV](https://pillar0-siemens.datadoghq.com/logs/livetail?query=cloud_provider%3Aazure%20product%3Atcx_azure_premium%20subscription_name%3Anonprod_45_-_tcxonaz_dev_mca&agg_m=count&agg_m_source=base&agg_t=count&cols=host%2Cservice&messageDisplay=inline&refresh_mode=sliding&storage=driveline&stream_sort=desc&viz=stream&from_ts=1750416495373&to_ts=1750417395373&live=true)  
     ![Datadog Live Tail](./sre_setup_120_0006.png)

