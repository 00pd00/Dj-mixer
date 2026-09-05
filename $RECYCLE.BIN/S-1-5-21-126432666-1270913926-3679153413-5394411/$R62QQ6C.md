## Pre-Requisites
- Ensure you have Contributor access to the tenant subscription `YOUR_TENANT_SUBSCRIPTION`.
- Ensure you have a WindowsServer1 (dispatcher) VM deployed.

## 1. Get the VM password from vault

1. Login to the vault using the tenant namespace.  
      **Vault URL:** (Prod) "https://vault.xcr.gblsvcs01eu.prod.eu-central-1.kaas.sws.siemens.com" / (Non-prod) "https://vaultent.emea1.co.sws.siemens.com/"

      Provide the tenant-specific namespace during login.
      E.g., `<tcx-development_ns/storm_playground/azora28/prd>`.
2. Navigate to the dashboard of the tenant-specific namespace.
3. Get the VM Keypair of your environment

    a. Click on `secret/` and navigate to the path: `tcx/automation/servers/vm`.  
    b. Copy the `vm_password` by clicking the copy icon (first icon as highlighted in the below screenshot) in the value column. Use this file to login.

    ![Image](./image_383.png)


## 2. Get the oem password from the vault

1. Login to the vault and navigate to the dashboard of the tenant-specific namespace.
2. Click on secret and navigate to the path: `tcx/teamcenter/rds`.
3. Copy the value of `oemdbpassword` by clicking on the copy icon.

    ![Image](./image_384.png)

## 3. Login to the Windows dispatcher VM deployed for your tenant
1. Activate your Contributor access to tenant subscription `YOUR_TENANT_SUBSCRIPTION` through PIM in Azure portal.
2. Go to Virtual Machines.
3. Select the Oracle DB VM `tcx-tenant-<tenant-id>-<environment-type>-WindowsServer1-vm`.
4. Click on Connect -> Connect via Bastion
5. Populate the following fields as follows-
    - Authentication Type: `VM Password`
    - Username: `azureuser`
    - Password: Paste the VM password that was copied from the vault in previous section
6. Click on `Connect`


## 4. Construct the OEM Web console URL
1. The OEM web console URL format is: 
```
https://oemdb.vm.<dns-subdomain-name>.<environment-type>.<service-private-hosted-zone-name>:7803/em
```
2. `dns-subdomain-name` should match the value of the `dnsSubdomainName` variable provided in the pipeline inputs when triggering a deploy pipeline
3. `service-private-hosted-zone-name` should match the value set for `GLBL_SERVICE_PHZ_NAME` in the cell file of the variables repository (if specified); otherwise defaults to `tcxservices.com`
4. Example OEM web console URL: `https://oemdb.vm.azpdoem-prd02.prd02.tcxservices.com:7803/em`

## 5. Connect to OEM Web console
1. Launch the web browser from the Windows VM
2. Use the above constructed OEM web console URL to access the OEM web console
3. During your first login, you'll see a `Privacy error` page that says `Your connection isn't private`.
4. Click on `Advanced` as shown in the below screenshot.

    ![image](./image_385.png)

5. Click on a hyperlink that says, `Continue to <OEM console URL> (unsafe)`

    ![image](./image_386.png)

6. This will now take you to the OEM login page, where your username should be `sysman` and the password should be the oem password copied from the vault in the previous sections

    ![image](./image_387.png)

7. This will take you to the OEM home page as shown in the below screenshot

    ![image](./image_388.png)


## 6. View all the targets registered with OEM
1. Click on Targets button on the top right corner of the OEM home page
2. Select `All Targets` from the displayed drop down list

![image](./image_382.png)

3. This now, takes you to the page that abstracts all the targets registered with the OEM into a list as shown in the below screenshot

![image](./image_389.png)
