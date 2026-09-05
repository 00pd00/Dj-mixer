

### Setup Azure and Entra Groups and Roles

#### Management Group and Subscription Overview

TcX is hosted in the SPLM Azure Tenant. The tenant is composed of a hierarchy of Management Groups, Subscriptions, and Resource Groups.
![Image](./image_3.png)

#### Entra and Azure Personas

This cookbook will use the following personas. These personas may be assumed by the same or different actual persons. Personas have permissions and goals. Note that such personas support the principle of least privilege. Please plan accordingly.

| Persona | Goals | Entra Roles | Azure Roles |
|---------|-------|-------------|-------------|
| TcX Entra Administrator | Manage group lifecycle and membership | DISW_CreateGRP_SubscriptionOwner | none |
| TcX Management Group Admin | Ensure consistent application of policies across all subscriptions | none | Owner, UAA |
| TcX Admin Subscription Owner | Assign Azure Roles to Entra Groups | none | Owner, UAA (via Management Group)|
| TcX Cell Subscription Owner | Assign Azure Roles to Entra Groups | none | Owner, UAA (via Management Group) |
| TcX Admin Subscription Provisioner | Provision admin subscription | DISW_SUBS_Users_PIM_AppDevelopers | Contributor, RBAC, UAA |
| TcX Cell Subscription Provisioner | Provision cell subscription (through TcX Cell Setup) | DISW_SUBS_Users_PIM_AppDevelopers | Contributor, RBAC, UAA, Resource Policy Contributor  |
| TcX Tenant Onboarder | Onboards tenant into subscription (through Tenant Onboarding) | none | TcX Tenant Onboarder
| TcX Tenant Operator | Perform operational activities | none | TcX-Azure-Tenant-Operator |

#### Entra Groups, Azure Roles

Via this cookbook you will define Entra Groups. Groups are composed of Owners and Members. You will leverage Privileged Identity Management (PIM). With PIM, permissions are granted for a short period of time, then expire.

Azure has "roles", which are a set of permissions on resources. Roles can be assigned to individuals, SP's, and groups.

The method in use here is,

Users can activate their PIM group membership in Entra. Activated PIM group members are granted permissions to act on Azure resources.

#### Authenticating to Azure and Entra

In order to do anything in Azure and Entra at all, please ensure your Siemens GID is associated in Entra with the SPLM ID, and that the latter is present in SPLM's Azure Tenant. **This is a mandatory step for anyone who will operate directly in Azure**

##### Prerequisites

Your SPLM ID must be visible in Entra. If it is not, open a [SNOW Incident](https://diswsiemens.service-now.com/sp?id=sc_cat_item&table=sc_cat_item&sys_id=50be0241c3f72a901b27bc33e40131d1&recordUrl=com.glideapp.servicecatalog_cat_item_view.do%3Fv%3D1&sysparm_id=50be0241c3f72a901b27bc33e40131d1) . Suggested content:
```
Please forward this to the DI SW Enterprise Foundation (ad_admins.sisw@Siemens.com) team Please enable my SPLM in the SPLM Azure Tenant. My SPLM ID is <your id>
```

- There must be a Management Group and someone with permissions as shown above for "TcX Management Group Admin". This person will perform the "Owner" activities below.

#### Setup Groups in Entra

These tasks are performed by the **TcX Entra Administrator.** There should be TWO persons who can fulfil this role.

##### Prerequisites

You must have the [PIM Entra Role](https://portal.azure.com/?feature.msaljs=true#view/Microsoft_Azure_PIMCommon/ActivationMenuBlade/~/aadmigratedroles) DISWCreateGRP_SubscriptionOwner. If you don't have this role listed in Privileged Identity Management, it can be requested via a [DISW SNOW ticket](https://diswsiemens.service-now.com/sp?id=sc_cat_item&table=sc_cat_item&sys_id=50be0241c3f72a901b27bc33e40131d1&recordUrl=com.glideapp.servicecatalog_cat_item_view.do%3Fv%3D1&sysparm_id=50be0241c3f72a901b27bc33e40131d1) . Suggested content:
```
Please grant my SPLM user (<SPLM USER ID>) the DISWCreateGRP_SubscriptionOwner role. I need to create PIM groups for TcX deployments.Please assign this ticket to the [Azure Cloud Security (DISW-L2)](https://diswsiemens.service-now.com/sys_user_group.do?sys_id=5bfac21597285910544cf4b3f153af6e) group.
```
##### Plan Your Groups and Subscription Names

Generally, the following groups are required for successful TcX deployment. Use the following schema for group names. This naming scheme must be coordinated with the **TcX Admin Subscription Owner** and **TcX Cell Subscription Owner**.

##### Admin Subscription

- Provisioners Group: `[subscription name]-Provisioners`

    members of this group are able to set up and deploy assets to this subscription

##### Cell Subscription

- Provisioners Group: `[subscription name]-Provisioners`

    members of this group are able to perform all functions through TcX Cell Setup

- Onboarders Group: `[subscription name]-Onboarders`

    members of this group are able to perform all functions after TcX Cell Setup through Tenant Onboarding. The permissions are sufficient to support maintenance activities thereafter.
- Vault Readers: `[subscription name]-Vault-Readers`

    members of this group can read secrets in the vault from all tenants in the cell. Corresponds to AZ_READ_ACCESS_ENTRA_GROUP_ID
- Vault Readers-Writers: `[subscription name]-Vault-Readers-Writers`

    members of this group can read and write secrets in the vault for all tenants in the cell. Corresponds to AZ_READWRITE_ACCESS_ENTRA_GROUP_ID

- Tenant SP Group: `[subscription-name]-TenantSP-Readers`

    members of this group can read the Tenant SP for purposes of post-pipeline activities like AIG. Corresponds to AZ_TENANT_SP_ACCESS_ENTRA_GROUP_ID

##### Create Groups for Your Subscriptions

1. Activate your PIM Entra Role `DISWCreateGRP_SubscriptionOwner`.
2. For each group listed above:
    - In Entra, create a new group with type **Security**.
    - Add BOTH TcX Entra Administrators as **OWNERS** of the group. This allows the TcX Entra Administrator to add/remove members of the groups.
    - (for development, please make sure to add Ben Collar as an owner)
    - After creating the group, click on **Privileged Identity Management** and click **Activate PIM**.
    - Reload the group.
    - Click on **Privileged Identity Management**, then **Assignments** under **Manage**.
    - Click **Add Assignments**.
    - Select role **Member**.
    - Select members as appropriate to the group.
    - Ensure the members are added as "Eligible", NOT permanent
    - Set a timeline for the membership to expire, e.g. 1 year. Group OWNER and MEMBER will get reminders as this deadline approaches.

GROUP OWNERS are permanently assigned

GROUP MEMBERS are eligible to activate their assignment

##### Add Role Assignments in the Subscriptions

These steps are performed by the **TcX Admin Subscription Owner** and the **TcX Cell Subscription Owner** for each respective group.

- Navigate to the subscription / Access control (IAM) page
- Select "Add / Add Role Assignment"
- Choose the required role
- Click Next, then "Select members". Search for the relevant Entra Group.
- **Important for UAA Role Assignment**
      - In the **Conditions** tab, select `Allow user to assign all roles except privileged administrator roles Owner, UAA, RBAC (Recommended)`.
      ![image](./image_4.png)

- Click Next ("Assignment type") and select ACTIVE. **It must be active, not eligible, despite the recommendation.** "Permanent" should also be selected.
- Review & Assign.

###### Important for UAA Role Assignment

- After completing the role assignment, navigate to the **Conditions** tab for the UAA role assignment
    ![image](./image_6.png)

- Remove **"RBAC Admin"** from the exclusion list (it's added by default)
    ![image](./image_5.png)

- This ensures that members can manage all role assignments, including RBAC admin roles

**Note:** Any activated member of the Entra Group will now have that role on that subscription.
