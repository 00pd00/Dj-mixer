# Teamcenter Dispatcher Installation Guide

**Applicable Product IDs:** TC7030-XT, TC7100, TC7101

This guide provides step-by-step instructions for manually installing the Teamcenter Dispatcher on supported environments (AWS or Azure).

**Note:** For AWS deployments, if you set the `AutomationForDispatcherInstallation` parameter to `true` during pipeline execution, the dispatcher will install automatically. You can then skip the manual steps in this guide.

---

## Logging into Dispatcher Machine

### Azure

To access the Windows Server as `tcx_user`, please perform the following steps:

1. Enable Contributor access:
    - Assign Operator Group privileges for the target `AZURE_SUBSCRIPTION_ID`.

2. Locate the resource group:
    - Go to: `tcx-tenant-<tenant>-<env-type>-rg`.

3. Search for the Windows Server:
    - Find **WindowsServer** in the resources list.

4. Connect to the server:
    - Use **Bastion** to establish the connection.
    - ![Connecting via Bastion](./image_348.png)

5. Set Authentication Type:
    - Choose **VM Password**.
    - Provide the following credentials:
        - **Username**: `tcx_user`
        - **VM Password**: Retrieve `<tcx_user_password>` as described below.

#### Retrieving `<tcx_user_password>` from the Tenant Vault

1. Log in to the vault using your tenant namespace.
    - **Vault URLs**:
        - Production: [https://vault.xcr.gblsvcs01eu.prod.eu-central-1.kaas.sws.siemens.com](https://vault.xcr.gblsvcs01eu.prod.eu-central-1.kaas.sws.siemens.com)
        - Non-production: [https://vaultent.emea1.co.sws.siemens.com/](https://vaultent.emea1.co.sws.siemens.com/)
    - Use your tenant-specific namespace, e.g., `<tcx-development_ns/storm_playground/release1/prd>`.
2. Open the dashboard for your tenant namespace.
3. Navigate to the following secret path:
    - `secret/tcx/automation/servers/os_users`
4. Click the first icon in the value column to copy the `tcx_user_password`.
    - ![Retrieve Password](./image_347.png)

### AWS

To access the Windows Server as `tcx_user`, please perform the following steps:

1. Retrieve Dispatcher Credentials from Vault
   - Open the Vault portal.
   - In the search bar, search your environment tenant ID (example: `portrun6`).  
   - Navigate through the secret path:  `secrets / secret / tcx / automation / servers / os_users`
     ![Vault Portal Secret Path](./image349.png)
   - Locate the `tcx_user_password` entry.  
   - Copy the username and password (store it temporarily in a secure password manager or note for this session).  

**Note:** Do not paste/store credentials in plaintext outside of secure tools. Always clear after use.  

1. Access AWS EC2 Instance
   - Log in to the AWS Management Console.  
   - Navigate to **EC2 → Running Instances**.  
   - Locate the Dispatcher instance (filter by name/tag: e.g., `portrun6`).  
   - Select the instance and click **Connect**.
     ![AWS EC2 Instances](./image350.png)  

2. Connect Using Fleet Manager RDP
   - In the Connect options, choose **RDP Client**.  
   - Select **Fleet Manager Remote Desktop**.  
   ![Fleet Manager RDP](./image351.png)
   - Enter the credentials you retrieved earlier (`tcx_user` + `tcx_user_password`).  
   - Click **Connect**.   
     ![Image](image.png)

---

## Deploying the Dispatcher

1. Open PowerShell and change directory to:

    ```
    D:\deploy_script\deploy_<tenantName>.dis-service.prd.tcxservices.com
    ```

2. Retrieve your `<DC PASSWORD>` from the tenant vault:

    - Log in to the vault with your tenant namespace.
        - **Vault URLs**:
            - Production: [https://vault.xcr.gblsvcs01eu.prod.eu-central-1.kaas.sws.siemens.com](https://vault.xcr.gblsvcs01eu.prod.eu-central-1.kaas.sws.siemens.com)
            - Non-production: [https://vaultent.emea1.co.sws.siemens.com/](https://vaultent.emea1.co.sws.siemens.com/)
        - Example namespace: `<tcx-development_ns/storm_playground/release1/prd>`
    - Go to your dashboard for the relevant tenant namespace.
    - Locate the secret at:
        - `secret/tcx/teamcenter/common/dc_server`
    - Copy the DC server password by clicking the first icon in the value column.
        - ![Retrieve DC Password](./image_168.png)

3. Run the deployment command in your deployment directory:

    ```bash
    .\deploy.bat -dcusername=dcadmin -dcpassword="<DC PASSWORD>" -softwareLocation=D:\kits
    ```

4. After deployment, follow the steps outlined in the **Validate Deployment Success** section.

---

## Manage Dispatcher Services

**Applicable Product IDs:** TC7030-XT

To restart or manage dispatcher services, use the directions below.

> **Note:** During installation you specify a Dispatcher root directory, referred to as `DISP_ROOT`.

### Stopping Dispatcher Services

Stop the services in the following order:

1. `Teamcenter DispatcherClient V<Teamcenter Version>`
2. `Teamcenter Dispatcher Module V<Teamcenter Version>`
3. `Teamcenter Dispatcher Scheduler V<Teamcenter Version>`

### Starting Dispatcher Services

Start the services in the following order:

1. `Teamcenter Dispatcher Scheduler V<Teamcenter Version>`
2. `Teamcenter Dispatcher Module V<Teamcenter Version>`
3. `Teamcenter DispatcherClient V<Teamcenter Version>`

---

## Dispatcher Client Post-Configuration  
**Applicable Product IDs:** TC7100, TC7101

Ensure users can mark up rendered PDFs by updating access privileges as follows:

### Update Access Privileges for Markups

1. Open the Dispatcher client configuration file:

    ```
    <DISP_ROOT>\DispatcherClient\conf\Service.properties
    ```

2. Add or modify the following line:

    ```plaintext
    Service.DataSetOwner=CAD
    ```