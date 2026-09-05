

##### Copy kits from AWS S3 to Azure Administrative Account

**Note:** The following instructions use the development Administrative subscription resource names to illustrate the values expected as inputs.

###### Pre-requisites

- Use Git Bash or Windows Subsystem for Linux (WSL) as the execution environment.
- Ensure access to the respective AWS kit bucket as mentioned below.
  - dryrun Development->[dryrun](../AWS/TcX%20Tenant%20Administrative%20AWS%20Account%20setup/Get%20access%20to%20AWS%20kits%20S3%20bucket,%20Route%2053%20for%20TcX%20Tenant%20Administrative%20Account%20dryrun/)
  - prod Development->[prod](../AWS/TcX%20Tenant%20Administrative%20AWS%20Account%20setup/Get%20access%20to%20AWS%20kits%20S3%20bucket,%20Route%2053%20for%20TcX%20Tenant%20Administrative%20Account%20prod/)
- The admin storage account in the admin subscription must be created by triggering the tcx-pipeline-account.

###### Login to Azure Admin Account

1. Activate a role that gives you **Storage Blob Data Contributor** and **Contributors** role on the kit storage account (e.g., `tcxadmin0002sa888`).
2. Ensure you have the Azure CLI installed. ``az --version``
3. Login and set the admin subscription as active:  
    ```bash
    export ADMIN_SUBSCRIPTION=<REPLACEME> (e.g. "888b0468-c8c4-4e39-915f-9f9fcc38040a") 
    az login 
    az account set -s $ADMIN_SUBSCRIPTION 
    az account show
    ```

    **Note:** If you encounter the error `Subscription does not exist in cloud AzureCloud`, restart your terminal.

## Download AzCopy Tool Steps for Windows-Based Systems

Follow these steps to install and configure `azcopy` on your Windows machine:

1.  **Download the `azcopy` tool:**
    *   Visit the official Microsoft Learn page to download the latest version: [https://learn.microsoft.com/en-us/azure/storage/common/storage-use-azcopy-v10](https://learn.microsoft.com/en-us/azure/storage/common/storage-use-azcopy-v10)
    *   Download the `.zip` file for Windows.
    *   Extract the contents of the downloaded `.zip` file to a location of your choice (e.g., `C:\AzCopy`).

2.  **Set environment variables for system and user:**
    *   You need to add the directory where you extracted `azcopy` to your system's `Path` environment variable.
    *   **How to do it:**
        *   Search for "Environment Variables" in the Windows search bar and select "Edit the system environment variables."
        *   In the System Properties window, click the "Environment Variables..." button.
        *   Under "System variables," find and select the `Path` variable, then click "Edit..."
        *   Click "New" and add the full path to the directory where you extracted `azcopy` (e.g., `C:\AzCopy`).
        *   Click "OK" on all open windows to save the changes.
    *   *Note: You might need to restart your command prompt or PowerShell window for the changes to take effect.*

3.  **Check `azcopy` tool version:**
    *   Open a new Command Prompt or PowerShell window.
    *   Type the following command and press Enter:
        ```bash
        azcopy --version
        ```
    *   You should see the installed version of `azcopy` displayed, confirming a successful setup!

## Download AzCopy Tool Steps for Linux-Based Systems

Here's how to get `azcopy` up and running on your Linux system:

1.  **Go to the official Microsoft Learn page:**
    *   Visit: [https://learn.microsoft.com/en-us/azure/storage/common/storage-use-azcopy-v10](https://learn.microsoft.com/en-us/azure/storage/common/storage-use-azcopy-v10)

2.  **Find the Linux download link:**
    *   On the Microsoft Learn page, locate the download link for Linux (usually a `.tar.gz` file). Copy its direct URL.
    *   Alternatively, you can use `wget` directly in your terminal. For example (replace with the actual URL):
        ```bash
        wget https://azcopyvnext.azureedge.net/release20240319/azcopy_linux_amd64_20240319.tar.gz
        ```
        *(The URL above is an example; always get the latest from the Microsoft page!)*

3.  **Extract the downloaded `.tar.gz` file:**
    *   Once downloaded, extract the archive. Replace `azcopy_linux_amd64_*.tar.gz` with the actual filename you downloaded:
        ```bash
        tar -xvf azcopy_linux_amd64_*.tar.gz
        ```

4.  **Navigate into the extracted folder:**
    *   After extraction, a new folder will be created (e.g., `azcopy_linux_amd64_20240319`). Change into this directory:
        ```bash
        cd azcopy_linux_amd64_*
        ```

5.  **Make the `azcopy` executable and move it to a common PATH directory:**
    *   First, make the `azcopy` binary executable:
        ```bash
        chmod +x azcopy
        ```
    *   Then, move it to a directory that is already in your system's `PATH` (e.g., `/usr/local/bin`):
        ```bash
        sudo mv azcopy /usr/local/bin/
        ```
    *   *(You might be prompted for your password for `sudo`.)*
---

4. Login to `azcopy` via the device login method (SPLM tenant will be the same for production).
   ```
   export AZURE_TENANT_ID="6b5bd02b-92d2-40b2-9ffd-c9c94280c757"
   azcopy login --tenant-id "$AZURE_TENANT_ID"
   azcopy login status
   ```

###### Prepare for Transfer

The following steps can be adapted to transfer third-party binaries or any location in the AWS kit. The main aspect is to prepare a list of files (relative paths in the AWS S3 bucket).

###### Variables and Test Transfers

1. Set helper environment variables.
    ```
    export STORAGE_ACCOUNT_RG=<REPLACEME> (e.g. "tcx-admin-0002-rg") 
    export STORAGE_ACCOUNT=<REPLACEME> (e.g. "tcxadmin0002sa888") 
    export CONTAINER_NAME=<REPLACEME> (e.g. "tcx-release-management-dev")
    ```
2. Add your IP to the storage account firewall.
   ```
   export EXTERNAL_IP=$(curl -s https://ifconfig.me) 
   az storage account network-rule add -g "$STORAGE_ACCOUNT_RG" --account-name "$STORAGE_ACCOUNT" --ip-address "$EXTERNAL_IP"
   ```


###### Prepare manifest file

1. Download manifest file from `tc-version-manifest` repo.  (``tcx-configuration/teamcenter_install_kit_config.json``)
2. Extract just file names, and prepare a file list for your baseline.
   ```
   export KIT_FILE="teamcenter_install_kit_config.json"
   grep -o '"[^"]*\.zip"' $KIT_FILE | sed 's/"//g' >> filelist-tmp.txt 
   sort -u -o filelist-0314.txt filelist-tmp.txt
   ```

(optional) If you only want to transfer the changed files from one baseline (e.g. 0314 to 0402) to another, here's an example command to get the diff:
```
diff --new-line-format="%L" --old-line-format="" --unchanged-line-format="" filelist-0314.txt filelist-0402.txt > filelist.txt
```
###### Prepare manifest file for Hybrid Components
**Note:** This is required to be performed only once per release

1. Download hybrid_comp_install.json from `tc-version-manifest` repo.  (``tcx-configuration/hybrid_comp_install.json``)
2. Extract just file names, and prepare a file list for your baseline.
   ```
   export HYBRID_KIT_FILE="hybrid_comp_install.json"
   grep -o '"[^"]*\.\(zip\|tar\)"' $HYBRID_KIT_FILE | sed 's/"//g' >> filelist-hybrid-tmp.txt
   sort -u -o filelist-hybrid.txt filelist-hybrid-tmp.txt
   ```
(optional) If you only want to transfer the changed files from one baseline (e.g. 0314 to 0402) to another, here's an example command to get the diff:
```
diff --new-line-format="%L" --old-line-format="" --unchanged-line-format="" filelist-hybrid-0314.txt filelist-hybrid-0402.txt > filelist-hybrid.txt
```
###### Setup AWS access

1. Make sure you have AWS CLI installed.  ``aws --version``
2. Login to AWS console via [AWS Role Selection](https://identity.industrysoftware.automation.siemens.com/WebkeyLogin/AWS/roleSelection).  
3. Use the "show credentials" (key) button to view the temporary credentials.  
4. Copy the AWS environment variables (e.g. AWS_ACCESS_KEY_ID, etc.) into your terminal
5. Verify AWS credentials
   ```
   aws sts get-caller-identity
   ```

###### Trigger transfers

1. Copy file list using the following script from the `tcx-pipeline-account` repo (`/scripts` folder):
```bash
export AWS_REGION=us-east-1 
export BUCKET_NAME=<REPLACEME> (e.g. "tcx-release-management-dev)

# Copy Teamcenter Install files
./99_copy_kits.sh filelist.txt

# Copy Hybrid Component Install files 
./copy_kits.sh filelist-hybrid.txt
```

2. Transfer third-party binaries.
```
azcopy copy "https://s3.us-east-1.amazonaws.com/${BUCKET_NAME}/third_party_binaries/*" "https://${STORAGE_ACCOUNT}.blob.core.windows.net/${CONTAINER_NAME}/third_party_binaries" --recursive=true
```

3. Transfer setup licenses
```
azcopy copy "https://s3.us-east-1.amazonaws.com/${BUCKET_NAME}/license/teamcenter/<TCVersion>/*" "https://${STORAGE_ACCOUNT}.blob.core.windows.net/${CONTAINER_NAME}/license/teamcenter/<TCVersion>" --recursive=true
```

4. Transfer Triad Licenses
```
azcopy copy "https://s3.us-east-1.amazonaws.com/${BUCKET_NAME}/admin-console/<TCVersion>_cloud_license/*" "https://${STORAGE_ACCOUNT}.blob.core.windows.net/${CONTAINER_NAME}/admin-console/<TCVersion>_cloud_license/*"
```

###### Clean up

1. Remove your IP from the storage account firewall.
```
az storage account network-rule add -g "$STORAGE_ACCOUNT_RG" --account-name "$STORAGE_ACCOUNT" --ip-address "$EXTERNAL_IP"
```

###### Debugging

1. If you are facing errors during copying, you can create a placeholder file and test simple transfers.
```
touch placeholder.txt 
export PREFIX_PATH="third_party_binaries" 
az storage blob upload --account-name $STORAGE_ACCOUNT --container-name $CONTAINER_NAME --name "$PREFIX_PATH/placeholder.txt" --file placeholder.txt --auth-mode login 
az storage blob list --account-name $STORAGE_ACCOUNT --container-name $CONTAINER_NAME --prefix "$PREFIX_PATH" --output tsv --auth-mode login 
```

2. Azcopy can do a dry run to show what paths and locations are being used (an example file from S3)

```
azcopy copy "https://s3.us-east-1.amazonaws.com/tcx-release-management-dev/teamcenter_add_on/tcxm_biw/biw4manufacturingoverlay_2406_wntx64.zip" "https://${STORAGE_ACCOUNT}.blob.core.windows.net/${CONTAINER_NAME}/teamcenter_add_on" --dry-run
```