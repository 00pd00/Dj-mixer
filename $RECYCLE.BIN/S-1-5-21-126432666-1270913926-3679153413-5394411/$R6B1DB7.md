
Datadog provides an “Azure Datadog Integration” module that enables the capture of metrics from Azure into Datadog. The setup of this integration module is done via the SRE GitOps setup. Note that the same SRE GitLab repository is also used for [TcX in AWS](../../../../../Tenant%20Onboarding/Datadog%20monitor%20and%20slo%20setup/Datadog%20-%20AWS%20Integration).

---

### Pre-Requisites

1. **Access to the SRE GitOps Repository**:
   - Ensure you have access to the SRE GitOps repository at [tcx-container-based](https://gitlab.industrysoftware.automation.siemens.com/cloud-operations/sre/segments/lcs/tcx-container-based).
   - If you do not have access, raise a request at the [FDS Service Desk](https://fdsone.atlassian.net/servicedesk/customer/portal/11) for the SRE Observability team.

2. **Azure Subscriptions**:
   - Ensure that Azure subscriptions for TcX Admin and TcX Cell are available.

For reference, the instructions on this page follow the general guidelines provided by the SRE team for Azure Datadog Integration, available [here](https://developer.internal.siemens.com/fds/p0/sre/observability/onboarding/cloud_integrations.html#azure-integration).

The SRE GitOps repository is currently configured with three environment types for TcX:
- **DEV**, **PRE_PROD**, and **PROD** (each with an associated folder in the repository).

The setup for **DEV** has been completed by the TcX Dev team. However, the setup for **PRE_PROD** and **PROD** is expected to be performed by the CApS/SRE teams.

---

### 1. Create a Service Principal (SP) for the Azure Datadog Integration

We recommend the following naming convention for the SP for **PROD**:  
`tcx-az-prod-datadog-reader-sp`  
However, you can adopt a naming convention that aligns with your team's standards.

For reference, in **DEV**, the following SP has been created for this integration:  
`tcx-az-dev-datadog-reader-sp` (ID: `ed6fe560-b0f1-4261-94f5-19d472efe455`).

To create the SP, open the Azure Portal, launch a new Azure Cloud Shell, and execute the following command:

```shell
az ad sp create-for-rbac --name "tcx-az-prod-datadog-reader-sp"
```

The above command will return the `appId` and the `password` for the SP (among other details). Save this information securely for later steps, such as in a password manager (KeePass) or an encrypted file.
* `appId`: corresponds to the SP "Client ID" or "spId".
* `password`: corresponds to the "Client Secret". 



Note, just like with any other manually created SPs, it is recommended that you add some of your team members as Owners of this SP as well. For this:
  - a. Go to the Azure Portal
  - b. Search for the name of the SP you created (e.g. `tcx-az-prod-datadog-reader-sp`)
  - c. Select the "Application" match
  - d. On the left navigation, select "Manage" > "Owners"
  - e. Press on the "+ Add owners" button
  - f. Search and select one or more contacts to be added as Owner of the SP.

---

### 2. Assign the "Monitoring Reader" Role to the SP

The Service Principal must have the "Monitoring Reader" role assigned for every Azure subscription related to the **ENV_TYPE** (e.g., PROD). This includes at least the Admin subscription and one Cell subscription. When additional Cell subscriptions are created, the "Monitoring Reader" role must also be assigned to the SP for those subscriptions.

To assign the role to the SP, open an Azure Cloud Shell and execute the following bash script. Replace the SP ID (`spId`) and the list of subscription IDs (`subscriptions`) with the appropriate values:

```shell
# Update these variables. Example used for DEV.
spId="ed6fe560-xxx-19d472efe455"
subscriptions=("0ef62f60-xxx-6022a9e2c9a6" "888b0468-xxxx-9f9fcc38040a" "7dd21ef9-xxx-9dff90ae89e9")

# Do not change anything below this point

echo "Role Assignments:"
role="Monitoring Reader"

# Assign the role to the Service Principal
echo "- Assigning the '$role' role to '$spId'..."

for subscriptionId in "${subscriptions[@]}"; do
    subscriptionScope="/subscriptions/$subscriptionId"
    assignment=$(az role assignment create --role "$role" --assignee "$spId" --scope "$subscriptionScope")

    echo "AZURE_SUBSCRIPTION_ID='$(echo $subscriptionId)'"
    echo "Assignment: '$(echo $assignment)'"
done
```

---

### 3. Update the SRE GitLab Repository

For the following steps, if you have access to the SRE GitLab repository, you can perform some of the tasks. However, certain steps will require the SRE team to complete them.

This section outlines the tasks for creating a Merge Request (MR). The next section provides details to include in the ticket for the SRE team.

#### A. Create a New Branch for Updates

If you are setting up both `pre-prod` and `prod` environments simultaneously, create a single branch for both. Otherwise, create a separate branch for each. The following example assumes you are setting up the `prod` environment. Adjust accordingly for `pre-prod` or both.

If you have not cloned the SRE GitLab repository before, use the following command in your local Git Bash:

```shell
git clone git@gitlab.industrysoftware.automation.siemens.com:cloud-operations/sre/segments/lcs/tcx-container-based.git
```

Ensure your local `main` branch is up to date before creating a new branch. For example, for `prod`:

```shell
# Check the current branch
git status

# Switch to the main branch
git checkout main

# Pull the latest changes
git pull

# Create a new branch for the updates
git checkout -b feature/azure-prod
```

#### B. Add Terraform Variables for the Environment

Add two variables for `CLIENT_ID` and `CLIENT_SECRET` for the respective **ENV_TYPE** (e.g., PROD).

Example for **PROD**:  
Update the [prod/variables.tf](https://gitlab.industrysoftware.automation.siemens.com/cloud-operations/sre/segments/lcs/tcx-container-based/-/blob/main/prod/variables.tf?ref_type=heads) file with the following lines:

```hcl
variable "AZURE_PROD_CLIENT_ID" {
  description = "Azure Integration Client ID for PROD"
  type        = string
}

variable "AZURE_PROD_CLIENT_SECRET" {
  description = "Azure Integration Client Secret for PROD"
  type        = string
}
```

#### C. Add or Update the Azure Integration Terraform File

Add or update the `prod/azure_integration.tf` file with the **ENV_TYPE** configuration. Example for **PROD**:

```hcl
#---------------------------------------------------------------------
# Azure Integration
# For TCX @ Azure Integration: 
# TCX DeployOps PROD subscriptions / environments
#---------------------------------------------------------------------
module "datadog_integration_azure" {
  source = "git::https://gitlab.industrysoftware.automation.siemens.com/cloud-operations/sre/observability-projects/terraform-modules/azure-integration-module.git?ref=main"

  tenant_name   = "6b5bd02b-92d2-40b2-9ffd-c9c94280c757"
  client_id     = var.AZURE_PROD_CLIENT_ID
  client_secret = var.AZURE_PROD_CLIENT_SECRET
}
```

#### D. Commit Changes and Create a Merge Request

Commit the changes and push them to the remote repository:

```shell
git commit -m "Add Azure Integration for Prod"
git push --set-upstream origin feature/azure-prod
```

Follow the link provided in the output to create the Merge Request (MR) in the GitLab UI. Save the MR link for inclusion in the SRE ticket.

---

### 4. Send a Request to the SRE Team

Raise a request at the [FDS Service Desk](https://fdsone.atlassian.net/servicedesk/customer/portal/11) for the SRE Observability team.

In the request, include a message such as the sample below, modifying:
- the SP Client ID/Secret from Step 1
- the GitLab MR Link from step 3.D



```
Request: TCX Azure PROD - Complete Setup Required for Azure Datadog Integration

Context: TCX Container Based
SRE Git Repo: https://gitlab.industrysoftware.automation.siemens.com/cloud-operations/sre/segments/lcs/tcx-container-based


This request is to perform any tasks required to complete the Azure integration for PROD, including:

1. Adding the following CI/CD Variables to the GitLab Repo

| CI/CD Variables                   | Description                                |
|-----------------------------------|--------------------------------------------|
| `TF_VAR_AZURE_PROD_CLIENT_ID`     | The Client ID for the SP used for PROD     |
| `TF_VAR_AZURE_PROD_CLIENT_SECRET` | The Client Secret for the SP used for PROD | 

* Note, the "Client ID" and "Client Secret" values need to be passed to the SRE team member in a secure manner, therefore they are not included in this ticket. Please contact me directly for those values.

2. Reviewing and Merging the following MR:
- <link to the MR>

3. Triggering the SRE pipeline for prod ("plan-prod" / "deploy-prod")

4. Confirming the Azure Integration appears in Datadog
- Look for the client ID in the "Azure Integrations" page:
- https://pillar0-siemens.datadoghq.com/integrations?category=Azure&integrationId=azure&panel=subscriptions&tab=configuration&tenantId=6b5bd02b-92d2-40b2-9ffd-c9c94280c757  

```


---

### 5. Confirm Azure Datadog Integration is Operational

#### A. Check the Datadog Azure Integrations Page

Once the Terraform changes are applied, the subscriptions should appear under the Client ID in the Datadog Azure Integrations page.

- Azure Integrations (Link for DEV Client ID):  
  https://pillar0-siemens.datadoghq.com/integrations?category=Azure&clientId=ed6fe560-b0f1-4261-94f5-19d472efe455&integrationId=azure&panel=subscriptions&tab=configuration&tenantId=6b5bd02b-92d2-40b2-9ffd-c9c94280c757  

- Look for the PROD client ID in the list


#### B. Check Azure Metrics Available in Datadog

Go to the Datadog **Metrics Explorer** page and confirm that Azure metrics are available for one of the integrated subscriptions.

- **Datadog Metrics Explorer Page:**  
  https://pillar0-siemens.datadoghq.com/metric/explorer  

Azure metrics should start with the `azure.*` prefix.

**Examples of metrics captured:**
- `azure.storage.count`
- `azure.vm.count`

**Examples of queries to check:**
- `sum:azure.storage.count{subscription_name:*prod*tcx*} by {subscription_name}`
- `sum:azure.network_applicationgateways.count{subscription_name:prod_NN_caps_tcx_customer}`
- `sum:azure.sql_managedinstances.count{*} by {subscription_name}`

