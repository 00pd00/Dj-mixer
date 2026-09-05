### Description
This operation **Schedule Tenant Environment** enables users to manage and control the uptime of a tenant environment. It provides flexibility to extend or modify the predefined uptime using **runtimeExtension**, **maintenanceWindow**, or by updating the existing uptime schedule itself by using **uptime**.
   
> Important:
>  This operation can be executed only after an uptime schedule has already been configured for the tenant environment.


In an uptime schedule, the start and stop times for cloud resources and K8s pods are predefined. For example, if the uptime is defined as UpTime: EU_8x5 in the customer input, the instance and K8s will start at 8:00 AM and stop at 5:00 PM.

The runtimeExtension or maintenanceWindow actions simply extends the predefined uptime schedule for tenant (for example- UpTime: EU_8x5) by n number of hours. Thus, it will extend to EU_8x9 if we increase by 4 hours.

 1. **runtimeExtension**  : This option is utilized when an environment is actively operational, and a user requires additional time to conduct further testing or complete ongoing tasks. It provides the flexibility to extend the operational period of an existing environment without interruption, accommodating immediate needs for continued access and validation.

 2. **maintenanceWindow**  : This is designated for planned activities that involve modifications or enhancements to an environment. It is the appropriate choice when a user intends to perform deployments, integrate personalized packages, implement system upgrades, or execute any other changes that may require a dedicated period for execution, often involving a scheduled service interruption to ensure successful and stable implementation.

 3. **Update Existing Uptime Schedule**  : In addition to extending the current schedule, users can now modify the existing uptime configuration entirely.
For example, if the initial uptime is EU_8x5, it can now be changed to a different schedule such as IN_13x5. This allows users to realign the environment’s operational hours based on changing business or regional requirements. Unlike runtimeExtension and maintenanceWindow, which temporarily extend the existing schedule, this operation permanently updates the tenant’s uptime configuration going forward.


#### Initiate the workflow
1.  Use RunCommands Template to perform operation. Please refer [Ansible Templates Table](../../../010_Tenant%20Onboarding/020_Basic%20Flow/020_Ansible%20Templates%20Table.md)

2. In Survey Provide the Customer Inputs given below and GITLAB PAT token
 
![template](image-1.png)

​​
3. Click on 'Launch' to initiate the workflow.


​​
#### Customer Inputs
​​
   | Parameter | Value | Sample |
|-----------------|-------|------------|
| CustomerID | CustomerID | put0001 |
| Description | Description for information | Schedule Tenant Environment Operation | 
| CellId | Mention cell ID which used for deployment | CellId_value |
| PipelineCloud | The account where the target environment will be deployed  | Account ID |
| Environment | The type of environment deployed. | prd |
| OperationsAction | Action to perform : schedule_tenant_environment | schedule_tenant_environment |
| TcxCliRequirement | Required verion of tcx-cli repo. | teamcenterx==x.x.x | 
| PipelineVersion | The branch name from the tcx-pipeline-tenant repo  | main |
| PipelineVariableVersion | The branch name from the tcx-pipeline-variables repo  | main | 
| PipelineStage | The stage of the pipeline to run: operations | operation | 
| OperationsPayload | The sepcific action **maintenanceWindowInHours** or **runtimeExtensionInHours** or **uptime** that you want to execute. |runtimeExtensionInHours: 4  or maintenanceWindowInHours: 4  or uptime: IN_13x5 |

#### Sample inputs :

```yaml
CustomerID: changeme
Description: Schedule Tenant Environment Operation for cTcX deployment
CellId: changeme
PipelineCloud: "changeme"
Environment: prd
TcxCliRequirement: 'teamcenterx==x.x.x'
PipelineVersion: main
PipelineVariableVersion: main
PipelineStage: operations
OperationsAction: schedule_tenant_environment
OperationsPayload:
  runtimeExtensionInHours: x
```

***Replace runtimeExtensionInHours by maintenanceWindowInHours or uptime when required***

***Note*** : 
1. At a time, only single action can be executed. Either runtimeExtensionInHours or maintenanceWindowInHours or uptime.
2. The range for runtimeExtensionInHours is 1-6 hours
3. The range for maintenanceWindowInHours is 1-12 hours
4. When updating the uptime schedule, the new schedule (e.g., changing from EU_8x5 to IN_13x5) will override the existing configuration and will be applied going forward.
