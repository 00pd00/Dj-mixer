## DC Password Change

The process for changing the DC user password is different from changing other Teamcenter users. Follow the steps below to change the DC user password:

### A. Change DC Password by Running Deployment Center Script

1. Log in to the Linux machine as 'dc_user'.

2. Stop DC services (Refer to [Commands to Start and Stop DC Services on Linux](../../Day%20N%20Operations/Stop%20DC%20Services#commands-to-start-and-stop-dc-services-on-linux)) 
    > **Note:** When prompted provide dc_user password fetched from the vault with the key `dc_user_password` and path: `tcx/automation/servers/os_users`.
    
3. Export the Java home path:
    ```bash
    export JAVA_HOME=/siemens/openjdk/<JDK_VERSION>/
    ```
4. Run the following command:
    ```bash
    /siemens/kits/dc_kit/deployment_center/deployment_center.sh -user=dcadmin -password=<current_password> -maintenance -changePassword -newPassword=<new_password> -serverDir=/siemens/DeploymentCenter/webserver
    ```
    > **Note:** The `dc_user` password can be fetched from the vault with the key `dc_user_password` and path: `tcx/automation/servers/os_users`.

    > **Note:** The `<current dcadmin>` password can be fetched from the vault with the key `dc_server_password` and path: `tcx/teamcenter/common/dc_server`.

5. Stop the services started by DC
     ```bash
        /siemens/DeploymentCenter/webserver/dcserver.sh stop
        /siemens/DeploymentCenter/webserver/repotool/repotool.sh stop
        /siemens/DeploymentCenter/webserver/messaging/publisher.sh stop
     ```
6. Restart DC services (Refer to [Commands to Start and Stop DC Services on Linux](../../Day%20N%20Operations/Stop%20DC%20Services#commands-to-start-and-stop-dc-services-on-linux)).

### B. Update DC Password Files

1. Use a superuser (`sudo su`) to perform these steps.
2. Change the directory to:
    ```bash
    cd /siemens/DeploymentCenter/webserver/
    ```
3. Export the JRE home path:
    ```bash
    export JRE64_HOME=/siemens/openjdk/<JDK_VERSION>/
    ```
4. Set the environment variable `dcpwd` with the new password:
    ```bash
    export dcpwd=<new_password>
    ```
5. Take a backup of the existing password file:
    ```bash
    cp /<tenant_id>-<env_type>/<tenant_id>-<env_type>/teamcenter/security/dcadmin.pwf bkp_dcadmin.pwf
    ```
6. Run the encryption script:
    ```bash
    ./dc_encrypt.sh -env=dcpwd -file=/<tenant_id>-<env_type>/<tenant_id>-<env_type>/teamcenter/security/dcadmin.pwf
    ```
    > **Note:** Run the following command only if your environment was created with `pid2qd` (TeamcenterProductIDList) and not with `staticqd` (QDFileName):
    ```bash
    ./dc_encrypt.sh -env=dcpwd -file=/siemens/DeploymentCenter/tcx-qd-processing/dcadmin.pwf
    ```

### C. Change Password in Vault

1. Log in to the Vault.
2. Navigate to `secret/tcx/teamcenter/common/dc_server`.
3. Click on **Create new version**.
    ![Image](./image_361.png)
4. Enter `dc_server_password` in the **Key** field and the desired password string in the **Value** field.
    ![Image](./image_362.png)
5. Click **Save**.
