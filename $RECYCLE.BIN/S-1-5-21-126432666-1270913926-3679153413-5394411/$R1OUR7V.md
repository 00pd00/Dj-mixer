## Tools Access

This guide provides instructions for requesting access to key tools and services. Please follow these directions carefully to ensure timely approval and access.

---

### XCD GitLab Access

To gain access to the `tcx-deploy` group, follow these steps:

> **Note:**  
> Before requesting access to the `tcx-deploy` group, ensure user have GitLab access. If user do not have a GitLab access, request one first by creating a ticket [here](https://fdsone.atlassian.net/servicedesk/customer/portal/9/group/9/create/834).

1. **Go to the Cookbook Repository Issues Section**  
   - Visit the [cookbook repository homepage][def1] on GitLab.
   - Click on the **Issues** tab at the top of the page.

2. **Create a New Access Request Issue**  
   - Click **New Issue**.
   - Select Issue type as **Issue**.
   - Select the `Access_request` template.

3. **Fill in the Mandatory Details**  
   - In the issue template, provide:
     - **GitLab Username** (mandatory, comma-separated for multiple users; e.g., `user1, user2, user3`)
     - **Email Address** (mandatory; provide only of the user creating the issue)
   
   Your input must be in the following format only:<br/>
   ![alt text](image.png)

   ![alt text](image-1.png)
   
   > **Note:**  
   > - To find your GitLab username, visit [this link](https://gitlab.industrysoftware.automation.siemens.com/-/profile/account) and scroll down to view your username.  
   > - Your request **will not be processed** if either field is missing.  
   > - If you do **not** have a GitLab license, you must first request one [here](https://fdsone.atlassian.net/servicedesk/customer/portal/9/create/834) before submitting your access request.

4. **Assign the Issue**  
   - Assign your issue to an authorized team member.

5. **Access Provision Timeline**
   - After you create the issue, you will receive access within 2 to 3 working hours.

---

### XCR Vault Access

Owned by XCR. For access or issues, contact your respective security team.

**Development contacts:**  
- rajat.singh@siemens.com  
- benjamin.collar@siemens.com  

---

### Ansible Tower Access

This guide outlines how to access Ansible Tower for different environments. Please note that access procedures vary based on the environment (Development, Dry Run, or Production).


#### Dry Run & Production Access

For **Dry Run** and **Production** Ansible Tower access, please reach out directly to:

📧 **Jeevan Singh** at `jeevan.singh@siemens.com`


#### Development Access

Gaining access to the Development Ansible Tower is a straightforward process! Follow these steps:

1.  **Sign In to Ansible Tower:**
    *   Navigate to the [Ansible Tower platform](https://ansible-dev.cloud.teamcenter.com/) (teamcenter.com).
    *   Sign in using **OIDC**.
    *   *Reference the screenshot below for visual guidance:*
        ![Sign in](image-4.png)

2.  **Request Access from Your Team Lead:**
    After you've successfully signed in, please ask your **Scrum Master, Manager, or Architect** to perform the following steps to grant you access:

    *   Open the [CTCX-LCS team page](https://ansible-dev.cloud.teamcenter.com/#/teams/8/access).
    *   *They will then follow these steps, guided by the screenshots:*
        *   Click the "Add" button.
            ![Add User Button](image-5.png)


        *   Select "Users", Press "Next".
            ![Users](image-6.png)


        *   Filter user to be added based on First Name. This can be done using Last Name or Username too.
            ![Add User](image-7.png)


        *   Finally, save the new user's access.
            ![Save User](image-8.png)



3. If your team lead doesn't have access to add the new user, contact 📧 **Shantanu Joshi** at `shantanu.joshi@siemens.com`.


---

### Harbor Repository Access

- Platform: [Harbor Container Registry (siemens.com)][def3]  
- Access to Harbor projects is managed via Keycloak groups.
- Follow the Teams Approval Workflow Instructions below for access.
- **Contact:** brian.gosch@siemens.com for Harbor-related queries.

> **Note:** Harbor access is not required for all developers, as most images are pushed via automation.

---

### Argo CD & Rancher Access

Access to Argo CD and Rancher is controlled via Keycloak groups.  
Follow the Teams Approval Workflow Instructions below for access.

---

### Teams Approval Workflow Instructions (ONLY FOR DEVELOPMENT)

Use Teams workflow to request access to the following services:
- Harbor Project
- Argo CD
- Rancher
- HashiCorp Vault (*token access is different*)

#### Steps

1. **Open the [Keycloak Group Membership][def4] form in Teams Approvals.**
2. **Complete the form:**
   - **Name of Request:** Your name or a clear title (e.g., name of requestor).
   - **Approvers:** First approver should be your Scrum Master. The second approver is auto-filled (Ben Collar or Shamsundar Machale).
   - **Services:** Select only the services to which you require access.
   - **Level of Access:** Usually "User"; specify "Admin" if needed.
   - **Justification:** Briefly state why you need the requested access.
   > **Note:** Your request will be delayed if all mandatory information is not provided.

3. **Pre-requisite:**  
   You must be a member of the Teams channel: [TC and TcX Security Approvals | General | Microsoft Teams][def5].

**Contact:** benjamin.collar@siemens.com for any queries related to Teams Approval Workflow

### ArgoCD

Argo CD pushes the desired applications/deployments into the cluster automatically. It tracks the Git repository changes and triggers the synchronization.

It enables us to quickly inspect the application and find differences between your applications' desired and the current live state and helps to visualize the entire application resource hierarchy in the web UI.

#### Process Overview:
- Enabled/Allowlist tcx-tenant-repos-dev project: Tcx-tenant-repos-dev project contains all the tenant repositories, and the helm charts and deployment templates would be emitted by deployutils into tenant projects.  
- XCR team allowlisted the entire project to facilitate Argo CD deployment   
- Argo CD application set should be configured to perform recursive checks under /app folder in tenant branch 9.0-prd (XCR team configured the Application set to perform recursive checks)  
- Inside this repo there is an `apps` directory. As part of the existing deployment mechanism, we need to create a new directory for each new app/tenant and add `config.json` file which contains the repo url of the tenant that needs to be deployed.

---

### DataDog Access

- To request access to Datadog, submit a request using the [Access Request Form][def6]
  
  ![alt text](image-2.png)

- Select **2.0 User Access Request** under What can we help you with?
- In the Approver field, enter the name or email of your manager.
- Under Requesting Information, provide your **User Email**.
- In the TOOL section, select **Datadog**.
- After selecting Datadog, two additional fields will appear:
   - **datadog_scope** – Choose the appropriate scope.
   - **datadog_role** – Select your required Datadog role.<br/>
     ![alt text](image-3.png)


---

## Important URLs

| Service      | Region           | URL                                                                                 |
|--------------|------------------|-------------------------------------------------------------------------------------|
| **ArgoCD**   | US               | https://argocd.nac1.co.sws.siemens.com/                                             |
|              | EMEA             | https://argocd.emea1.co.sws.siemens.com/                                            |
|              | APAC             | https://argocd.apac1.co.sws.siemens.com/                                            |
| **Harbor**   | eu-central-1 dev | https://harbor.xcr.svcs01eu.prod.eu-central-1.kaas.sws.siemens.com/tcx-dev          |
|              | eu-central-1 prod| https://harbor.xcr.svcs01eu.prod.eu-central-1.kaas.sws.siemens.com/tcx              |                          |
|              | apac dev         | https://harbor.apac1.co.sws.siemens.com/tcx-dev                                     |
|              | apac prod        | https://harbor.apac1.co.sws.siemens.com/tcx                                         |
|              | us-east-1 dev    | https://harbor.xcr.svcs01.prod.us-east-1.kaas.sws.siemens.com/tcx-dev               |
|              | us-east prod     | https://harbor.xcr.svcs01.prod.us-east-1.kaas.sws.siemens.com/tcx                   |
| **Rancher**  | us-east-1        | https://k8s.prod.us-east-1.kaas.sws.siemens.com/dashboard/                          |
|              | ap-southeast-1   | https://k8s.prod.ap-southeast-1.kaas.sws.siemens.com/dashboard/                     |
|              | eu-central-1     | https://k8s.prod.eu-central-1.kaas.sws.siemens.com/dashboard/                       |

---

[def1]: https://code.siemens.com/ctcx/cookbook
[def2]: https://ansible-dev.cloud.teamcenter.com/#/home
[def3]: https://harbor.xcr.svcs01.prod.us-east-1.kaas.sws.siemens.com/harbor/projects/36/repositories
[def4]: https://teams.microsoft.com/l/entity/7c316234-ded0-4f95-8a83-8453d0876592/approvals/?context=%7B%22subEntityId%22%3A%220P55753W120RMKXPJ4Y2NP4VMDBWTEXE71WSBN2FNQDB8BGMJQANMW6MGKME50JP9YZMKEMBYA5W5N0%3A%3AshareLink%3A%22%7D
[def5]: https://teams.microsoft.com/l/team/19%3A5hfrYEH8SUgZj2TuDnZi3wDOsZjcFnvazzYcYZsV8ZM1%40thread.tacv2/conversations?groupId=e884d470-82e2-4f56-bf49-ba8bf28bc2d4&tenantId=38ae3bcd-9579-4fd4-adda-b42e1495d55a
[def6]: https://fdsone.atlassian.net/servicedesk/customer/portal/9/group/9/create/232