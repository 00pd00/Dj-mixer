## Pipeline failing at Task - datadog.dd.agent : Install downloaded agent

## AWS
1. Go to AWS Management Console, and navigate to EC2 Dashboard.
2. In the EC2 Dashboard, click on Instances in the left-hand menu.
3. Locate dispatcher server of the failed environment from the list and make sure its status is **running.**
4. Select and connect to the instance using Session Manager.
5. Once connected to the session, type the following to switch to PowerShell:

    `powershell `
6. Execute the following commands to uninstall the Datadog agent:

    `$productCode = (@(Get-ChildItem -Path "HKLM:SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall" -Recurse) | Where {$_.GetValue("DisplayName") -like "Datadog Agent" }).PSChildNam`

    `Start-Process msiexec -Wait -ArgumentList "/log C:\uninst.log /q /x $productCode REBOOT=ReallySuppress"`

7. Manually install the Datadog agent by executing the following commands:

    ```powershell
    # Download the latest Datadog Agent v7 MSI installer to temp directory
    Invoke-WebRequest -Uri "https://s3.amazonaws.com/ddagent-windows-stable/datadog-agent-7-latest.amd64.msi" `
                      -OutFile "$env:TEMP\datadog-agent.msi"
     
    # Set your Datadog API key (retrieve from vault -> secret engines -> secret -> shared -> datadog -> datadog_api_key)
    $apiKey = "YOUR_DATADOG_API_KEY_FROM_VAULT"
     
    # Install silently (no UI) with the API key
    Start-Process msiexec.exe -Wait -ArgumentList "/qn /i `"$env:TEMP\datadog-agent.msi`" APIKEY=$apiKey"
    ```

## Azure

1. Go to Azure Portal,
2. Activate your Contributor access to tenant subscription `YOUR_TENANT_SUBSCRIPTION` through PIM in Azure portal.

3. Navigate to the Virtual Machines.
4. Locate dispatcher server of the failed environment from the list and make sure its status is **running.**
5. Select and click on Connect -> Connect via Bastion
6. Populate Username field as "tcx_user" and Password to be copied from the path, "tcx/automation/servers/os_users/tcx_user_password" inside Hashicorp vault.
7. Click on "Connect"
8. Open PowerShell and execute the following commands to uninstall the Datadog agent:

    `$productCode = (@(Get-ChildItem -Path "HKLM:SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall" -Recurse) | Where {$_.GetValue("DisplayName") -like "Datadog Agent" }).PSChildNam`

    `Start-Process msiexec -Wait -ArgumentList "/log C:\uninst.log /q /x $productCode REBOOT=ReallySuppress"`

9. Once done, rerun the same pipeline to reinstall the datadog agent.