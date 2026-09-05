
# Create Cell Owner Group

:::note
This step is optional and should be performed if you want to restrict people from triggering pipelines in your cluster. Creating a cell owner group allows you to control access to deployment pipelines by limiting who can execute them for your specific cell environment.
:::

## Email Template for Cell Group Creation

Use the following email template to request a GitLab Cell Group creation:

```text
To: deployops.tc.lcs.disw@internal.siemens.com
Subject: To create Gitlab Cell Group for <TeamName>

Hello Team,

We would like to request the creation of a Gitlab Cell Group for our team, <TeamName>.

Once the group is created, please provide us with the following details:

GLBL_GITLAB_GROUP_ID: [To be provided by DeployOps]
GLBL_GITLAB_GROUP_LINK: [To be provided by DeployOps]

Thank you for your assistance.

Best regards,
[Your Name/Team Name]
```

## Example Response

After creating the group, DeployOps will provide details similar to the following (example values only):

```yaml
GLBL_GITLAB_GROUP_ID: "92054"
GLBL_GITLAB_GROUP_LINK: "https://gitlab.industrysoftware.automation.siemens.com/tcx-cell-user-groups/deployops"
GLBL_GITLAB_GROUP_OWNER_EMAIL: "your-team-email@siemens.com"  # Define your own team/owner email, you can give multiple emails separated by comma
```

:::warning Demo Values
The values shown above are for demonstration purposes only. Use the actual values provided by the DeployOps team for your specific cell group.
:::