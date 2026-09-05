### Required steps for deploying Azure AI Search

Below you will find the required steps that need to be completed in order to deploy Azure AI Search inside the tenant resource group.

1. **Create Microsoft Entra ID Group for the Cell**
    - Use Azure Portal or CLI (using the command below) to create a dedicated Microsoft Entra ID Group, to be used as a permission group for DNS Zone Record creation later on. Use a unique name for your group with the following naming convention: `<cell-id>-onboarding-group`, e.g. `azm-eaus-prprd65-tcai-001`. 

        ```bash
        az ad group create --display-name "<cell-id>-onboarding-group" --mail-nickname "<cell-id>-onboarding-group"
        ```

        Leave the group empty for now and without any permissions assigned.
    - Save the name of the Onboarding Group for the XCR Cluster Request.

2. **Submit a FDS Request for Private DNS Zone integration with Azure AI Search in the XCR Cluster**
    - **Option 1:** If you want to enable AI Chat (and Visual Part Search) on a **new** XCR Cluster:
        - Follow [the instructions outlined here](./020_Request%20XCR%20Cluster%20with%20AI%20DNS%20Zone.md) to submit a new XCR Cluster Onboarding Request with the required additional details for Private DNS Zone Integration with Azure AI Search.
    - **Option 2:** If you want to enable AI Chat (and Visual Part Search) on an **existing** XCR Cluster:
        - Follow [the instructions outlined here](./020_Change%20Request%20XCR%20Cluster%20with%20AI%20DNS%20Zone.md) to submit a XCR Change Request with the required details for enabling Private DNS Zone Integration with Azure AI Search on an existing cluster.

    As a result of submitting the XCR cluster request, you will have obtained:
    - `XCR Tenant ID`
    - `XCR Subscription ID`
    - `Private DNS Zone Resource Group Name`

#### Continue with the steps below after cell onboarding has completed

3. **Add Onboarding Service Principal to Microsoft Entra ID Group.**
    - As a result of cell onboarding, there will an Onboarding Service Principal available in the Hashicorp Secrets Engine of which the naming convention is in the format `vault-<cell-id>-onboarding-sp-XXXXXXXX`. 

    For example - `vault-tcx-cell-azm-eaus-prprd66-tcai-003-onboarding-sp-9054762391`

    Note: Onboarding SP's naming convention may change with tcx version.

    - Use Azure Portal or CLI to add the Onboarding SP ID (available in the Hashicorp Secrets Engine) to the previously created Microsoft Entra ID Group (created in Step 1 Above). 

        i.  On Azure portal, go to Groups, Search for group (created in Step 1 Above).

    ![AD Group](../image_142.png)

    ![AD Group](../image_143.png)
    
        ii.  On AD group page, select members section on left panel.

    ![AD Group members section](../image_144.png)

        iii. Click on "+ Add members"
            
             Note: to add member (Service Principal) to this Azure AD group, we need to be owner of the AD group.

        iv.  And at last, select onboarding SP `vault-<cell-id>-onboarding-sp-XXXXXXXX` from the list which belongs to your TcX cell.

    ![Adding SP to AD Group](../image_141.png)

        Reason to add it to this Group: the permissions that the XCR team granted to this group through the XCR request, the Onboarding SP will inherit permissions to create Private DNS Zone records in the Private DNS Zones (in this case the one for AI Search) that are associated with the XCR Cluster.


4. **Add New Cell Variables to tcx pipeline variable file**
    - Add the following variables to your `tcx-pipeline-variables` file:
        - GLBL_XCR_TENANT_ID: `"value-from-XCR-request-output"`
        - GLBL_XCR_SUBSCRIPTION_ID: `"value-from-XCR-request-output"`
        - GLBL_XCR_DNS_ZONE_RESOURCE_GROUP_NAME: `"value-from-XCR-request-output"`