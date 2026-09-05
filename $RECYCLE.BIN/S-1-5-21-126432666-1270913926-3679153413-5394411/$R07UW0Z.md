## GitLab User Roles and Access Configuration for Pipeline Execution

The cTcX pipeline runs in Ansible and GitLab context, and hence need users to have appropriate permissions on both Ansible and Git. Moreover, pipeline needs access to vault to generate, store and retrieve secrets during the pipeline execution. In general following are required to execute the pipeline:

1. Access to Ansible Tower artifacts and permission to launch the required templates.
2. Access to GitLab to generate the user specific PAT token.
3. Access to required GitLab repositories to run the pipeline.

### Generating the Personal Access Token (PAT) to Execute the Pipeline

Once users are added to GitLab, they can login and generate a PAT for themselves. PAT is user specific and its user's responsibility to keep them secure. Hence these should be assigned only relevant permissions and as short a lifetime as possible. Pipeline execution usually takes 6 to 12 hrs., so it’s recommended that the token is generated only when needed and with expiry of no more than 24 hrs.

![Image](./image_103.png)

![Image](./image_104.png)

### Adding Access to Required GitLab Repositories to Run the Pipeline

Users need access to several Git repositories with varying role levels to run the pipeline. To do so in a simple way and to separate the responsibility of assigning the role level and access privilege:

- A separate GitLab group is created and is already invited to relevant other projects and groups with appropriate role levels.
- An admin is assigned as owner to the group, and they can further add the users that need to run pipeline to this group.
- Users that are added to this group will inherit all required roles to run the pipeline.

1. As administrator, log Into Git and open the Members settings for the group: TcX-Pipeline-CAPS-Users.Group members · TcX-Pipeline-CAPS-Users · GitLab (siemens.com)  
    [Group members · TcX-Pipeline-CAPS-Users · GitLab (siemens.com)](https://gitlab.industrysoftware.automation.siemens.com/groups/tcx-pipeline-caps-users/-/group_members)

    ![Image](./image_105.png)

2. Invite the user who needs access to run the pipeline as a **Maintainer** to this group.  
![Image](./image_106.png)

3. As a User login into the TcX-Pipeline-CAPS-Users group and check the access to required projects.
![Image](./image_107.png)

NOTE- The developers are to be add to the group- tcx_lcs_pipeline_developers
