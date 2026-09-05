## Deployutils failure during the fresh deployment due to pod eviction

 In some special cases, Kubernetes evicts the deployutils job if there is a shortage of resources on the node where it is scheduled to run. You can identify these cases as the status messages “DELOYMENT SUCCESSFUL” or “DEPLOYMENT FAILED” would not present in deployutils logs and also checking the events in Datadog Event Explorer. Even though k8s auto-schedules it on another node, due to deployutils’s restart policy it would not be restarted automatically.

**Workaround:**

Restart the deployutils job . For more details, refer [Troubleshooting - Restarting the deployUtils Job](260_Restart%20deployutils%20if%20post%20deploy%20fails.md)