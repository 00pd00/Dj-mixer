#### Stopping and Restarting TcX Containerized Deployment

The following section describes the steps to shutdown and restart TcX containerized components. In a traditional TcX process deployment, admins would normally terminate processes directly or in some cases execute scripts to shutdown components. i.e. mgrstop to terminate server manager and assigned tcservers.

In a TcX containerized deployment, an Ansible Tower workflow template is provided that allows shutting down and restarting the components based on several typical uses cases. This allows the admin to shutdown the components based on the maintenance operation to be performed rather than manually shutting components down individually. The following sections describe the steps to shutdown and restart a TcX containerized deployment.

Note : Before running the shutdown or restart workload action , you can check the status of pods in datadog using the view, Infrastructure -> Kubernetes Overview with applying the filter of specific cluster name and namespace  details:
https://pillar0-siemens.datadoghq.com/kubernetes 

Note that the shutdown and restart workflow requires an admin approval . The workflow template will create a workflow task that must be approved before the job will be executed.

##### Initiate the workflow

1. For Shutdown and Restart Template link please refer [Ansible Templates Table](../../010_Tenant%20Onboarding/020_Basic%20Flow/020_Ansible%20Templates%20Table.md)
   ​​
2. In the extra variables section add the latest pipeline version and TcxCli version provided in the handoff.

:::note ⚠️ MANDATORY FIELDS
PipelineVersion: [Provided at the time of handoff] (Note: If not provided, default 'main' branch will be used).

PipelineCliVersion: [TcxCliRequirement provided at the time of handoff]
:::

![Image](./image_338.png)

​​ 3. Click on next. A survey window will appear on the screen.

![Image](./image_339.png)

​​ 4. Fill up the survey:
​​
| Survey parameter | Value |
|-----------------|-------|
| TENANT ID | Tenant ID |
| ENVIRONMENT TYPE | Type of the environment e.g. prd, uat |
| WORKLOAD | Select the workload, see below table for more information on workload |
| ACTION | Shutdown- Select to stop the workload\nRestart - Select to restart the stopped workload |
| GITLAB TOKEN | Personal access token for gitlab |
| TENANT NAMESPACE | Git namespace for tenant repo |
| STREAM ID | Identifier for the stream, valid values are dev, customer, dryrun, internal |
| VAULT TOKEN | Hashicorp vault token |

| Workload                                              | Description                                                                                    |
| ----------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Complete Teamcenter deployment                        | Covers deployments of all Teamcenter components                                                |
| Teamcenter deployment for applying updates            | Covers deployments of all relevant Teamcenter components for applying updates                  |
| Teamcenter deployment for maintenance                 | Covers deployments of all relevant Teamcenter components for applying maintenance              |
| Teamcenter servers and pool manager                   | Covers deployments of Teamcenter server, pool manager, Teamcenter webtier, and TECS components |
| Teamcenter FSC                                        | Covers deployments of Teamcenter FSC and ClamAV components                                     |
| All Teamcenter daemons                                | Covers deployments of all Teamcenter daemon components                                         |
| Teamcenter FTS indexer                                | Covers deployment of Teamcenter FTS sync indexer                                               |
| Initial startup of Indexer, Visualization and daemons | Covers deployments of Teamcenter FTS sync indexer, visualization and daemon components         |
| Teamcenter deployment for password change             | Covers deployments of all relevant Teamcenter components for applying password changes         |
| Teamcenter Visualization                              | Covers deployments of all Teamcenter visualization components                                  |

​​ 5. Click on 'Launch' to initiate the workflow. This workflow waits for the approval to apply the changes. Please refer to the instructions in the below section to provide approval/rejection.

##### Approve Reject the workflow

1. Login into ansible tower as workflow approver
2. Click on notifications and provide decision on the one related to shutdown/restart workflow.
   Note - Survey parameters can be viewed by clicking on the link in notification.
   ![Image](./image_340.png)

If the request is denied, the workflow will exit without performing the shutdown/restart of the workload. If request is approved, the processing continues (refer to section below).

##### Initiate shutdown restart of the workload

Once the workflow approver provides approval for the request, the actual shutdown/restart of the selected workload will be initiated. After the workload is shutdown/restarted, the workflow will complete. The job logs are shown in the Tower UI.

Once the shutdown or restart pipeline has completed, the TcX containerized components will begin shutdown/restart. This normally takes a few minutes to complete.
​​
