# Azure Storage Account Key Rotation

## Steps

### Shutdown Workloads

1. Execute the [Shutdown and Restart Template](../../../010_Tenant%20Onboarding/020_Basic%20Flow/020_Ansible%20Templates%20Table.md).
2. Run shutdown workflow with below survey parameter and follow for other values as described in document [Shutdown and restart workloads](../../Day%20N%20Operations/Shutdown%20and%20restart%20workloads)
3. Specify the Shutdown option as indicated below:  

| Survey parameter | Value |
|-----------------|-------|
| TENANT ID | Tenant ID |
| ENVIRONMENT TYPE | Type of the environment e.g. prd, uat |
| WORKLOAD | Complete Teamcenter deployment |
| ACTION | Shutdown |
| GITLAB TOKEN | Provide personal access token for GitLab |
| STREAM ID | Select dev/customer/dryrun/internal |
| ENTER VAULT TOKEN | Provide token for Vault |

![Image](../020_On_Demand_Update/040_Day%20N%20Password%20Rotation/image_363.png)

After about 5-8 minutes, all the pods for this tenant deployment will stop.

### Rotate Storage Account Keys

1. Log into the Azure Portal
2. Activate your `Contributor`-role through PIM
3. Open a Bash Cloud Shell
4. Run

```bash
RESOURCE_GROUP_NAME="YOUR TENANT ENV RESOURCE GROUP NAME"
STORAGE_ACCOUNT_NAME="YOUR TENANT ENV STORAGE ACCOUNT NAME"
# Example command: az storage account keys renew -g tcx-tenant-aga322-prd-rg -n tcxtaga322prdfsa7dd --key key1
az storage account keys renew -g $RESOURCE_GROUP_NAME -n $STORAGE_ACCOUNT_NAME --key key1
az storage account keys renew -g $RESOURCE_GROUP_NAME -n $STORAGE_ACCOUNT_NAME --key key2
```
5. Copy one of the rotated keys to a secure temporary location and use it as `STORAGE_ACCOUNT_KEY` in the next step.

### Update Volume Mounts in CorpServer

1. Log in to the Vault
2. Navigate to `secret/tcx/automation/servers/keypair`
3. Retrieve the SSH key from Vault
4. Save the secret `vm_keypair` in a text file `key.txt`

![Image](./image_501.png)

5. Log into the Azure Portal
6. Navigate to your CorpServer-VM
7. SSH into your VM using `key.txt` as key

![Image](./image_502.png)

8. Once logged into your VM, run the following command to identify the mounts to be updated. 3 error messages stating `Host is down` are expected.

```bash
findmnt -t cifs && findmnt -t cifs --verify
```

![Image](./image_504.png)

9. Take note of the private Private Endpoint IP address displayed in the `SOURCE` column. Use it as `SA_PEP_IP` in the following commands to update the mounts

```bash
STORAGE_ACCOUNT_NAME=<YOUR STORAGE ACCOUNT NAME>
STORAGE_ACCOUNT_KEY=<YOUR NEW STORAGE ACCOUNT KEY>
SA_PEP_IP=<YOUR PRIVATE IP ADDRESS>
TENANT_ENV_ID=<YOUR TENANT_ID-ENV_ID>

DST_PATH=/$TENANT_ENV_ID 
SRC_PATH=//$SA_PEP_IP/tcx-tenant-$TENANT_ENV_ID-fileshare-deploy
sudo umount -l "$DST_PATH"
sudo mount -t cifs "$SRC_PATH" "$DST_PATH" -o vers=3.0,username="$STORAGE_ACCOUNT_NAME",password="$STORAGE_ACCOUNT_KEY",dir_mode=0777,file_mode=0777,serverino

DST_PATH=/$TENANT_ENV_ID-ipdata
SRC_PATH=//$SA_PEP_IP/tcx-tenant-$TENANT_ENV_ID-fileshare-ipdata
sudo umount -l "$DST_PATH"
sudo mount -t cifs "$SRC_PATH" "$DST_PATH" -o vers=3.0,username="$STORAGE_ACCOUNT_NAME",password="$STORAGE_ACCOUNT_KEY",dir_mode=0777,file_mode=0777,serverino

DST_PATH=/administration/admin_work
SRC_PATH=//$SA_PEP_IP/tcx-tenant-$TENANT_ENV_ID-fileshare-deploy/$TENANT_ENV_ID/deploy/tc_adminutils/admin_work
sudo umount -l "$DST_PATH"
sudo mount -t cifs "$SRC_PATH" "$DST_PATH" -o vers=3.0,username="$STORAGE_ACCOUNT_NAME",password="$STORAGE_ACCOUNT_KEY",dir_mode=0777,file_mode=0777,serverino
```

10. Validate that all mounts are healthy by running the following command again. No errors are expected.

```bash
findmnt -t cifs && findmnt -t cifs --verify
```
![Image](./image_503.png)

11. Terminate the SSH session

### Restart Workloads

1. Execute the [Shutdown and Restart Template](../../../010_Tenant%20Onboarding/020_Basic%20Flow/020_Ansible%20Templates%20Table.md).
2. Run Restart workflow with below survey parameter and follow for other values as described in document [Shutdown and restart workloads](../../Day%20N%20Operations/Shutdown%20and%20restart%20workloads)
3. Specify the Restart option as indicated below:

| Survey parameter | Value |
|-----------------|-------|
| TENANT ID | Tenant ID |
| ENVIRONMENT TYPE | Type of the environment e.g. prd, uat |
| WORKLOAD | Complete Teamcenter deployment |
| ACTION | Restart |
| GITLAB TOKEN | Provide personal access token for GitLab |
| STREAM ID | Select dev/customer/dryrun/internal |
| ENTER VAULT TOKEN | Provide token for Vault |

![Image](../020_On_Demand_Update/040_Day%20N%20Password%20Rotation/image_363.png)

After about 5-8 minutes, all the pods for this tenant deployment will be running again.