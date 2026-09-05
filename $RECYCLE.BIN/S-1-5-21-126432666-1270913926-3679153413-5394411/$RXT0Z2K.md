# Storage Cleanup maintenance operation

- once deployment is finished ( Ctcx Deployment either fresh Deployment / Migration / upgrade using blue green or    inplace upgrade finished and Login is working )

- there will be redundant kits present in storage from previous version ( process mode kits incase of migration and source version ctcx kits incase of upgrade) in the block storage attached to linux machine and file storage mounted on linux machine and kubernates pods which incur cloud costs , and these costs will exponetially increase as we take daily backups of these storage resources.

- inorder to avoid costs we introduced this cleanup operation to remove the redundant kits from storage resources

> **Note:** For Storage Cleanup activity, pipeline should be green and deployment center application should in healthy condition ( eg: installed/Updated ).

## operation execution 

1. Execute the [Operation Run Command Template](../../010_Tenant%20Onboarding/020_Basic%20Flow/020_Ansible%20Templates%20Table.md) with below inputs.

- The operation is executed using the RunCommands template in Ansible Tower. The following customer inputs are required to execute the workflow:

    | Parameter | Value | Example |
    |-----------------|-------|------------|
    | CustomerID | CustomerID | deploy123 |
    | Description | Description for information | storage cleanup of tenant cloud storage resources | 
    | Environment | The type of your source environment | prd/prd01/prd02 |
    | TcXVersion | The version of TcX to be used for operation.<br /> This value refers to the tag of the tc-version-manifests project in gitlab. | br.2512.0000 |
    | PipelineStage | The stage of the pipeline to run: operations | operations |
    | OperationsAction | Action to perform | storage_cleanup_after_deployment |
    | StreamId | Configuration file for loading parameters. Supported values: [dev, dryrun, internal, customer]. | dev |
    | TcxCliRequirement | tcx cli tag      | teamcenterx==TAG |


- For example, the customer input will look like:
    ```yaml
    CustomerID: tenant01
    Description: storage cleanup maintenance operation
    Environment: prd
    TcXVersion: br.2512.0000
    PipelineStage: operations
    OperationsAction: storage_cleanup_after_deployment
    StreamId: dev
    TcxCliRequirement: 'teamcenterx==v4.0.60.rc02'

    ```

## Initiate the job
- Use RunCommands Template to perform operation. Please refer [Ansible Templates Table](/docs/Documentation/Tenant%20Onboarding/Basic%20Flow/Ansible%20Templates%20Table/)

- After successfull template launch, a GitLab pipeline will be triggered automatically.

- To find the pipeline URL: In the Ansible job output, locate the **trigger pipeline** job step and check its output for the pipeline URL.
  ![alt text](image.png) <br/>
  ![alt text](image-1.png)

