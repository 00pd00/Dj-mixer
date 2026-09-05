### Ansible Tower

This section describes the automation for importing the artifacts into Production Ansible Towerprovided with a particular release. The artifacts are needed to run the DeployOps pipeline from Production Ansible Tower.

#### Pre-Requisites and Assumptions
- The JFROG Artifactory credentials must be present on the Ansible Tower (Refer to [Artifactory Creds (Dev)](https://ansible-dev.cloud.teamcenter.com/#/credentials/120)).
- The service account user has privileges to log in and import the artifacts (Admin User).
- A valid GitLab project access token for the service account that has at least a reporter role on the DeployOps repository.

##### Generate Ansible Token

1. Log in to the ansible tower.
2. Click on the User at the top right corner

 ![Image](./image_127_1.png)

3. Go to the tokens and click on the '+' icon.

 ![Image](./image_127_2.png)

4. Add description and select scope as 'Write'

 ![Image](./image_127_3.png)


#### Importing Ansible Artifacts
- The artifacts import process is automated via a Git pipeline. To run the pipeline, follow these steps:
    1. Go to the `tcx-ansible-artifacts` repository.
    2. Go to **Build > Pipelines** and click on the ![Pipeline Icon](./image_120.png) icon on the right.
    3. Select the tag provided with the release tags.

![Release Tags](./image_121.png)

- Provide the below mandatory inputs:

    | Input Variable | Description |
    |---------------|-------------|
    | AnsibleHost | The URL of the Ansible Tower. |
    | AnsibleToken | Authentication token for accessing the Ansible API. |
    | GitUserName | The username for accessing the Git repository. |
    | GitUserToken | The personal access token for the Git repository. |
    | Environment | The environment for reference (e.g., Prod, Dryrun). |

- In case of minor changes in the new release tag, provide the variable below to import the project only.
Skip this variable if you want to import all the artifacts.

    | Input Variable | Description | Value |
    |----------------|-------------|---------|
    | ImportScope | Specifies the scope of artifacts to import. | project |

- The below variable has a default value. These variables must be overridden if the need arises.

| Input Variable | Description | Default Value |
|-----------------|-------------|---------------|
| TemplatePostfixVersion | The postfix version used for infra template files. | 3.0.0 |
| AnsibleRunbooksVersion | The version of Ansible runbooks to be used. | 3.0.0 |
| PipelineVersion | The version of the pipeline-tenant being deployed. | 3.0.0 |
| TcXVersion | The version of version-manifest being used. | 2412.0001 |
| PipelineVariableVersion | The version of the pipeline-variables. | 3.0.0 |
| TcxCliRequirement | The required CLI version. | teamcenterx==3.0.0 |

- Click on **Run Pipeline**.
    - **Note**: A pipeline will be triggered with 2 jobs:
        - One job generates a base image for pushing artifacts to Ansible Tower.
        - The other job pushes the artifacts into Ansible Tower.

##### Post Import Process
- Once the pipeline is completed, manually add the permissions to the imported artifacts for the respective teams.

##### Verifying the Imported Artifacts
- Log into the Production Ansible Tower UI and search for the following artifacts:
    - **Organization**:
        - Go to the organizations and check if the Org named `<Environment>.TcX.Org-<Release_tag>` exists with 1 project and 18 Job Templates.

            ![Organization Verification](./image_122.png)

    - **Project**:
        - Click on **Projects** from the Organization.
        - Check if the project status is "Green," i.e., the SCM is accessible using the credentials.

            ![Project Verification](./image_123.png)

    - **Job Templates**:
        - For the TcX Backup Template link, please refer to section - [Ansible Templates Table](../../../010_Tenant%20Onboarding/020_Basic%20Flow/020_Ansible%20Templates%20Table.md).
        - Check if the `artifactory_creds` are attached to the template.

            ![Job Templates Verification](./image_124.png)

    - **Workflow Template**:
        - For the Shutdown and Restart Template link, please refer to section  - [Ansible Templates Table](../../../010_Tenant%20Onboarding/020_Basic%20Flow/020_Ansible%20Templates%20Table.md).
        - Click on the Workflow Visualizer from the top and check if both the nodes are attached to the workflow as shown below.

            ![Workflow Template Verification](./image_125.png)
            ![Workflow Template Nodes](./image_126.png)

---

#### Verify Ansible Workflows Created for Replica
- Perform the following steps to verify the workflow created for the replica:
    1. For the Production Ansible Tower Full Clone Replica template link, refer to section - [Ansible Templates Table](../../../010_Tenant%20Onboarding/020_Basic%20Flow/020_Ansible%20Templates%20Table.md).
    2. Go to Workflow Visualizer and check if a total of 11 nodes are attached one after another.

        ![Replica Workflow Verification](./image_127.png)

---

