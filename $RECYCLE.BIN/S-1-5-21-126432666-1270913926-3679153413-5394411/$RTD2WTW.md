# Connection Timeout During Banner Exchange

## Error Description

Post-deployment fails with the following error:

![alt text](image_450.png)

**Work Around:**  

  Rerun the post-deploy stage.

![alt text](image_448.png)

## Additional Troubleshooting Steps

If re-running the pipeline does not resolve the issue, perform the following checks:

1. **Verify Virtual Machine Status** -

    - Go to Azure Portal, 
    - Activate your Contributor access to tenant subscription `YOUR_TENANT_SUBSCRIPTION` through PIM in Azure portal.
    - Navigate to the Virtual Machines.
    - Locate Corporate server of the failed environment from the list.
    - Checkout the overview section, to verify the Virtual Machines is running.

Example:

![alt text](image_449.png)

2. **Test SSH Connectivity** - 

    - Go to Azure Portal, 
    - Activate your Contributor access to tenant subscription `YOUR_TENANT_SUBSCRIPTION` through PIM in Azure portal.
    - Navigate to the Virtual Machines.
    - Locate Corporate server of the failed environment from the list.
    - Select and click on Connect -> Connect via Bastion
    - Populate the fields as follows-
    - **Username:** azureuser
    - **Authentication Type:** SSH Private Key from Local File
    - **Local File:** Download the vm keypair from the path, "tcx/automation/servers/keypair/vm_keypair" inside Hashicorp vault.
    - Click on Connect
