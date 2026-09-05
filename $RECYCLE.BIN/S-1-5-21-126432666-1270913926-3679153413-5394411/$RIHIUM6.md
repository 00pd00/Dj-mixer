# Troubleshoot Dispatcher Translator Failures

If a Dispatcher translator failure occurs, follow these steps for effective troubleshooting:

1. **Record Details**
   - Note the time of failure and the name of the translator that failed.

2. **Configure Datadog Logging**
   - Ensure Datadog is set up for system process logs on the Server Dispatcher before starting troubleshooting.

3. **Access Datadog Logs**
   - Log in to Datadog: [Datadog](https://pillar0-siemens.datadoghq.com/).
   - Go to the **Logs** menu and select **Log Explorer**.
   - Adjust the time range (top right) to match the time of the failure.
   ![Log Explorer](./image_227.png)

4. **Verify Dispatcher Process Status**
   - Add filters to check Dispatcher process health:
     - `env_name: prd-<tenant_id>`
     - `service: tc-dispatcher`
   ![Dispatcher Processes](./image_228.png)

5. **Identify Translation Failures**
   - Add filters for translation errors:
     - `env_name: prd-<tenant_id>`
     - `service: tc-dispatcher-task`
     - `status: error`
   - Find the Task ID linked to failed requests.
   ![Failed Task ID](./image_229.png)

6. **Gather Task-Specific Logs**
   - Add filters to narrow logs to the problematic task:
     - `env_name: prd-<tenant_id>`
     - `service: tc-dispatcher-task`
     - `<Task Id>`
   ![Task Specific Logs](./image_230.png)

7. **Refine Task Log Analysis**
   - To isolate module-specific logs, adjust the `<Task Id>` filter:
     - `<Task Id>_dc` — Logs from Dispatcher Client
     - `<Task Id>_s` — Logs from Dispatcher Scheduler
     - `<Task Id>_m` — Logs from Dispatcher Module (translator output)
   - Example: Using `U2dd2916xx6647982e2357_m` for module-specific logs.
   ![Module-specific Logs](./image_231.png)

8. **Resubmit Failed Dispatcher Requests**
   - Once the root cause is resolved, resubmit the failed request using the Task ID:

     ```bash
     sudo su - tcx_user
     . tcc set_context <customer-ID> prd
     tcc exec 'dispatcher_util -u=dcproxy -p=*** -g=dba -a=resubmit -taskid=U1fc3a16xx6645da7a1ed1 -force'
     ```

   - To list all Dispatcher requests, use:

     ```bash
     tcc exec 'dispatcher_util -u=dcproxy -p=*** -g=dba -a=list'
     ```

   **Note:**  
   The dispatcher password file is generated during Windows dispatcher deployment. The commands above can be executed only from the admin utility, and the `-p` option must be used.

   The `dispatcher_util` command can also be run from a Teamcenter console on the Dispatcher Windows machine.

   Alternatively, use the Dispatcher AdminConsole UI in RAC to resubmit requests:
   ![Dispatcher AdminConsole UI](./image_232.png)