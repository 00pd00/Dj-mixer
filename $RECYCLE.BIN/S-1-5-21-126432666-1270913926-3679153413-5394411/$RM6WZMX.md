### Prerequisites
 - [Datadog monitor and slo setup ](../../010_Tenant%20Onboarding/090_Datadog%20monitor%20and%20slo%20setup/090_Datadog%20monitor%20and%20slo%20setup.md) has already been performed.

 - [Vault setup](../../000_Cell-Setup/000_Automation%20Prerequisites/070_Tools%20Setup/000_Vault%20Setup.md) has also been performed. This is required for Datadog vault secrets.

### Description
This operation automates the SRE onboarding automation of the tenant deployments to DataDog. There are four types of operations that can be performed explained in the table below.

   | Operation | Output | 
|---------|------------------|
| sre_onboard | This operation will onboard tenants to Datadog by creating the Datadog artifacts. By default, PagerDuty alerting is unmuted only for SREConfig set to prod environments. When onboarding a TcX tenant via a static QD file, Datadog artifacts are deployed only for the *base* TcX (e.g., TC7003-XT); in all other onboarding situations, the operation will also pull Datadog artifacts from any additional installed add-ons. |
| sre_mute | This operation will set all PagerDuty alerts and warning to false. It should be used before any maintenance events such as Teamcenter upgrade.|
| sre_unmute | This operation will set all PagerDuty alerts and warning to true. This restores the alerts which was paused earlier for some reasons. |
| sre_offboard | This operation is used for deboarding a tenant from Datadog. |


#### Initiate the workflow

1. Use the RunCommands Template to perform the operation. Please refer to the [Ansible Templates Table](../../010_Tenant%20Onboarding/020_Basic%20Flow/020_Ansible%20Templates%20Table.md)
​​
2. In Survey Provide the [Customer Input](./190_GitOps%20File%20Agent%20Access%20Token%20Rotation.md#customer-inputs), GITLAB PAT token and Vault Token 
 
![Image](./sre_operation.png)

​​
3. Click on 'Launch' to initiate the workflow.


​​
#### Customer Inputs
​​
   | Parameter | Value | Sample |
|-----------------|-------|------------|
| CustomerID | CustomerID | put0001 |
| Description | A brief explanation of why this pipeline is being executed. | SRE onboarding tenant to Datadog | 
| Environment | The type of environment deployed. | prd |
| TcXVersion | The version of TcX that will be deployed. This value refers to the tag of the tc-version-manifests project in gitlab. | br.2512.0000 |
| PipelineStage | The stage of the pipeline to run: operations | operations | 
| OperationsAction | Action to perform : [sre_onboard/sre_mute/sre_unmute/sre_offboard] | sre_onboard |
| SREConfig | Workload type: [dev/pre_prod/prod]. This property specifies the type of SRE pipelines. The value is typically established during the initial deployment pipeline execution. Manually setting of this field will override the existing value. pre_prd represents uat, prod represents customer, dev is for development usage. Default value is dev | dev |
| StreamId | Stream id used for tenant creation. Default value is dev | dev |

**Note**: *Before destroying the tenant, you need to perform the sre_offboard operation; otherwise, monitors will not be deleted*

