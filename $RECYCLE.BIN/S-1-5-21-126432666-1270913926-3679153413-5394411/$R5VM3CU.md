**Post deploy fails with 503 Error**  

**Issue Description**:

Pipeline fails in post deploy stage with 503 error as shown in the below screenshot.
 
![Image](./image_447.png) 

**Work Around:**  

1. Update the Gateway Request Response Timeout in gateway's config.json
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
    - Open the config.json for edit, by executing the following commands-
    - Execute the following command by replacing the placeholders-

        ```
        cd /<tenant id-environment type>/<tenant id-environment type>/deploy/component/helm/teamcenter/charts/gateway/config/

        vi config.json
        ```

    - Update the HttpRequestResponse Timeout value as follows-
        ```
        "timeout": {
        "httpRequestResponse": 4000000,
        "autoLogout": "2m"
        },
        ```

2. Delete publish.json from filerepo in Corporate server
    - Execute the following command by replacing the placeholders-

        ```rm /<tenant id-environment type>/<tenant id-environment type>/teamcenter/filerepo/publish.json```

3. Go to ArgoCD tenant teamcenter application and restart the following pods in the same sequence-
    - Service Dispatcher
    - Gateway
    - Filerepo

4. Retry the failed post deploy stage from gitlab
