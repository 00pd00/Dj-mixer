# Rich-Client Installation for Mass Client Deployment Using PId2qd

Follow the steps and recommendations below to deploy the Rich Client for mass client installations, ensuring smooth integration with the TCX environment.

## Reference Documentation

For complete instructions on installing RAC (Rich Application Client) and connecting to the TCX environment, always refer to the official Siemens documentation:  
[Siemens Official Installation Guide](https://docs.sw.siemens.com/en-US/doc/282219420/PL20231129261301184.client_unix/installRichClientTEM)

---

## High-Level Deployment Steps

1. **Create a Windows Test Client VM Instance**  
   Use the existing CApS process to provision a new Windows VM test client machine.
2. **Install Required Third-Party Software**  
   Follow the current CApS process to install any necessary third-party software.

---

## Important Notes

- CApS will provision a Windows VM instance according to their current procurement practice, as done for Teamcenter X 14.2 production.
- Continue using the current CApS practice of downloading software kits from the Support Center and deploying them via the mass client deployment script.
- To set up a Windows test client VM instance, refer to the "Test Client Windows Box Installation in Maintenance" section in the TcX 8.2 Install Cookbook.  
  If the direct link does not work, search for the section title within the cookbook.

---

## Creating `tcx_user` on the Windows Test Box

Follow these steps to create a `tcx_user` account and add it to the administrators group.

### On AWS

1. Go to the EC2 service and select the new Windows EC2 instance.
2. Connect using AWS Session Manager.
3. Run the following commands to create the user and assign administrative privileges:

    ```powershell
    net user /add tcx_user <tcx_user_pass>
    net localgroup administrators tcx_user /add
    ```

### On Azure

1. Log in to the vault using the tenant namespace:
    - **Development Environment:**  
      [https://vaultent.emea1.co.sws.siemens.com/](https://vaultent.emea1.co.sws.siemens.com/)
    - **Production Environment:**  
      [https://vault.xcr.gblsvcs01eu.prod.eu-central-1.kaas.sws.siemens.com/](https://vault.xcr.gblsvcs01eu.prod.eu-central-1.kaas.sws.siemens.com/)
2. Retrieve the `tcx_user` password from the following vault path:  
   `tcx/automation/servers/os_users/tcx_user_password`
3. Log in to the target Windows VM (named as: `tcx-tenant-<tenant id>-<env id>-WindowsServer1-vm`).
4. Click on **Connect via Bastion**.
5. Enter the following credentials:
    - **Username:** `tcx_user`
    - **Password:** Use the password obtained from the vault.
6. Click **Connect** to finish logging in.

---

## Prerequisites

- Use the OpenJDK version supported for this TcX release.  
  The specified JDK version is: `Please refer to the latest version`.  
  Replace this version in the following commands as needed to download or configure the correct JDK.

### AWS

- **Pre-prod:**
    ```bash
    aws s3 cp s3://tcx-release-management-pre-production/third_party_binaries/wntx64/JDK/<JDK_VERSION>/amazon-corretto-<JDK_VERSION>-windows-x64-jdk.zip D:\Kits\
    ```
- **Prod:**
    ```bash
    aws s3 cp s3://tcx-release-management-production/third_party_binaries/wntx64/JDK/<JDK_VERSION>/amazon-corretto-<JDK_VERSION>-windows-x64-jdk.zip D:\Kits\
    ```

### AZURE
          
- **Pre-prod:**
    ```bash        
      az storage blob download --account-name tcxadmin${ADMIN_CELL_ID}sa<ADMIN_SUBSCRIPTION_ID:0:3> \
      --container-name tcx-release-management-pre-production \
      --name third_party_binaries/wntx64/JDK/<JDK_VERSION>/amazon-corretto-<JDK_VERSION>-windows-x64-jdk.zip \
      --file D:\Kits\amazon-corretto-<JDK_VERSION>-windows-x64-jdk.zip \
      --auth-mode login
    ```
- **Prod:**
    ```bash
      az storage blob download --account-name tcxadmin${ADMIN_CELL_ID}sa<ADMIN_SUBSCRIPTION_ID:0:3> \
      --container-name tcx-release-management-production \
      --name third_party_binaries/wntx64/JDK/<JDK_VERSION>/amazon-corretto-<JDK_VERSION>-windows-x64-jdk.zip \
      --file D:\Kits\amazon-corretto-<JDK_VERSION>-windows-x64-jdk.zip \
      --auth-mode login
    ```

Make sure you must extracted the downloaded JDK zip from D:\Kits\ to D:\OpenJDK\<JDK_VERSION> value path must set the below environment variable:

    JAVA_HOME=D:\OpenJDK\<JDK_VERSION>

    JDK_HOME=D:\OpenJDK\<JDK_VERSION>

    JRE_HOME=D:\OpenJDK\<JDK_VERSION>

    JRE64_HOME=D:\OpenJDK\<JDK_VERSION>

##  Download the Tc Platform released kit for TcX version 2606 on D:\Kits
   
### AWS

To perform mass client deployment, use the following S3 buckets.

> **Note:** Replace `RELEASED-BASELINE-VERSION` in the commands below with your actual baseline version.

- **Pre-prod:**
    ```bash
    aws s3 cp s3://tcx-release-management-pre-production/teamcenter-container/tc2606.<RELEASED-BASELINE-VERSION>/tc2606_wntx64.zip D:\Kits\   
    ```

- **Prod:**
    ```bash   
    aws s3 cp s3://tcx-release-management-production/teamcenter-container/tc2606.<RELEASED-BASELINE-VERSION>/tc2606_wntx64.zip D:\Kits\  
    ```

### AZURE

To perform a mass client deployment, follow the steps below:

1. Use the admin storage container as referenced below.  
   > **Note:** Replace `RELEASED-BASELINE-VERSION` in the commands with your actual baseline version.

2. Log in to the Windows VM: 
   `tcx-tenant-<tenant id>-<env id>-WindowsServer1-vm`

3. Execute below commands in cmd.

- **Pre-prod:**
  ```bash        
  az login --identity
  az storage blob download --account-name tcxadmin${ADMIN_CELL_ID}sa<ADMIN_SUBSCRIPTION_ID:0:3> \
  --container-name tcx-release-management-pre-production \
  --name teamcenter-container/2512_kits_tc2512.<RELEASED-BASELINE-VERSION>/tc2512_wntx64.zip \
  --file D:\Kits\tc2512_wntx64.zip \
  --auth-mode login
  ```
- **Prod:**
  ```bash        
  az login --identity
  az storage blob download --account-name tcxadmin${ADMIN_CELL_ID}sa<ADMIN_SUBSCRIPTION_ID:0:3> \
  --container-name tcx-release-management-production \
  --name teamcenter-container/2512_kits_tc2512.<RELEASED-BASELINE-VERSION>/tc2512_wntx64.zip \
  --file D:\Kits\tc2512_wntx64.zip \
  --auth-mode login
  ```

## Download the mass client installer zip

### AWS

1. Download the mass client installer zip from tenant s3 bucket the bucket format is  tcx-`<tenant AWS region>-<env-type>-<tenant id>` using below cmd and extract it
```bash
aws s3 cp s3://tcx-`<tenant AWS region>-<env-type>-<tenant id>`/deploy_script/deploy_mass_client_windows.zip D:\deploy_script\ 
```

2. From power shell navigate to directory `D:\deploy_script\deploy_mass_client_windows`  

### Azure

1. Download the mass client installer zip from tenant common storage container the container format is `tcx-<tenant id>-common-container`.
2. Login inside the Windows VM machine `tcx-tenant-<tenant id>-<env id>-WindowsServer1-vm`.
3. Execute below commands in cmd.

```bash        
  az login --identity
  az storage blob download --account-name tcxt<tenant id>cm01sa<AZURE_SUBSCRIPTION_ID:0:3> \
  --container-name tcx-<tenant id>-common-container \
  --name deploy_script/deploy_mass_client_windows.zip \
  --file D:\Kits\deploy_mass_client_windows.zip \
  --auth-mode login
```

## Retrieving `<DC PASSWORD>` from Tenant Vault Namespace

Follow the steps below to obtain the `<DC PASSWORD>` required for deployment:

1. **Log in to Vault Using Tenant Namespace**

   - Open your browser and navigate to the Vault URL:  
     [https://vault.xcr.gblsvcs01eu.prod.eu-central-1.kaas.sws.siemens.com](https://vault.xcr.gblsvcs01eu.prod.eu-central-1.kaas.sws.siemens.com)

   - At the login prompt, provide your tenant-specific namespace. Example:
     ```bash
     <tcx-development_ns/storm_playground/release1/prd>
     ```

2. **Access the Secret Path**

   - After login, you will be directed to the dashboard for your tenant namespace.
   - Click on `secret/`, then navigate through the following path to retrieve the DC server password:
     ```bash
     tcx/teamcenter/common/dc_server
     ```
   - Once you reach this path, copy the DC server password by clicking the first icon in the "value" field.
   - Refer to the screenshot below for guidance:

     ![Image](./image_334.png)

3. **Set Java Environment Variables**

   Before running the deployment script, set the following environment variables in your command prompt to point to your Java installation:

   - `JRE64_HOME`
   - `JRE_HOME`
   - `JAVA_HOME`
   - `JDK_HOME`
  
  ```bash
  .\deploy.bat -dcusername=dcadmin -dcpassword="<DC PASSWORD>" -softwareLocation=D:\kits
  ```