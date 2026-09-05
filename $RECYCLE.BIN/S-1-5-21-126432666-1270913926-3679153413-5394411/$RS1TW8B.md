### Datadog (Log Aggregation, Metrics, Alerts)

- Datadog Agent installation and configuration happen through the `tcx-pipeline-tenant` project. To install the Datadog Agent, an Installation API key is required from the Datadog server. The Datadog API key is considered a secret and is configured in the Vault at the following location:
    - **Vault URL**: `https://vaultent.emea1.co.sws.siemens.com/`
    - **Vault Namespace**:
        - Development: `tcx-development_ns/storm_playground`
        - Production: `caps-tcx-production_ns`
        - Dry-run: `caps-tcx-nonproduction_ns`
    - **Path**: `shared/datadog`

- At the above path, `datadog_api_key` (used for the Agent Installation) and `datadog_app_key` (Datadog’s programmatic API) are present for internal deployments.

- The Datadog agent is configured with minimum default configurations of Logs and Metric. Users can see the EC2 instances Metrices present in Datadog by default. Which is extendable with user-defined logs configurations.

#### Custom Logs Collection
- In order to view the dispatcher and deployment center logs from Dispatcher windows machine please use below Datadog UI filter:
    ```
    host:<hostname>/service:<service-name>
    ```
    - Replace the variables with appropriate values:
        - `<hostname>`: Hostname of the Windows dispatcher machine.
        - `<service-name>  tc-dispatcher.d` and `tc-deployment-center` to view dispatcher and deployment center logs respectively
- **Note**: Also make sure that service name is added in Datadog index.


