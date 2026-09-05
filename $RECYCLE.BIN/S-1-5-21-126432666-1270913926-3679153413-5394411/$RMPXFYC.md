# Reindexing Solr Execution

- This operation is required in case of post migration and Full-clone replica

- If someone wants to execute the Reindexing of their DB Asynchronously, they can trigger the operation separately instead of running it in the post-deploy stage of the existing deployed env, this operation should be executed after the post deploy is done successfully

- As per the production data , reindexing solr Database will take from few minutes to few hours , varies from one production deployment to another , inorder to handle this usecase excluded reindex solr task from main deploy pipeline , since this operation can be executed asynchronoulsy without disturbing post pipeline activitivies carried out by operations engineer.

## operation execution

1. Execute the [Operation Run Command Template](../../010_Tenant%20Onboarding/020_Basic%20Flow/020_Ansible%20Templates%20Table.md) with below inputs.

- The operation is executed using the RunCommands template in Ansible Tower. The following customer inputs are required to execute the workflow:

    | Parameter | Value | Example |
    |-----------------|-------|------------|
    | CustomerID | CustomerID | deploy123 |
    | Description | Description for information | storage cleanup of tenant cloud storage resources |
    | Environment | The type of your source environment | prd/prd01/prd02 |
    | TcXVersion | The version of TcX to be used for operation.<br /> This value refers to the tag of the tc-version-manifests project in gitlab. | br.2506.0006 |
    | PipelineVersion | The version of the pipeline-tenant being deployed. | br.4.0.0 |
    | PipelineVariableVersion | The version of the pipeline-variables. | main |
    | PipelineStage | The stage of the pipeline to run: operations | operations |
    | OperationsAction | Action to perform | storage_cleanup_after_deployment |
    | TcxCliRequirement | tcx cli tag      | teamcenterx==TAG |


- For example, the customer input will look like:
    ```yaml
    CustomerID: tenant01
    Description: Example Configuration for Reindexing Solr in TeamcenterX.
    Environment: prd
    TcXVersion: br.2606.0000
    PipelineVersion: main
    PipelineVariableVersion: main
    PipelineStage: operations
    OperationsAction: reindex_solr
    TcxCliRequirement: 'teamcenterx==5.1.1'

    ```

## Initiate the job
- Use RunCommands Template to perform operation. Please refer [Ansible Templates Table](../../Tenant%20Onboarding/Basic%20Flow/Ansible%20Templates%20Table)

- In Survey, provide the [Customer Input created in above step] customer inputs, GITLAB PAT token, and Vault Token.
