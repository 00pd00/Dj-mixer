## 2 Post-install steps

- Login to DC server through session manager, switch to `tcx_user`, and go to the `/siemens` directory.
- Check the following variables:
    ```bash
    echo $JAVA_HOME
    ```
    ```bash
    echo $JRE64_HOME
    ```
- If not available, then set them manually:
    ```bash
    export JAVA_HOME=/siemens/openjdk/17.0.13.11.1
    ```
    ```bash
    export JRE64_HOME=/siemens/openjdk/17.0.13.11.1
    ```
- Go to `/siemens/DeploymentCenter/repository/deploy_scripts/prd-<tenant-id>/install/prd-<tenant-id>/` directory, where `deploy_<tenant-id>/.dc-service.prd.tcxservices.com.zip` file is located.
- Create new directory `/tmp/dc_script`, copy above zip file here, then unzip it.
- Give executable permissions to `deploy.sh` file:
    ```bash
    chmod 777 deploy.sh
    ```
- Run the `deploy.sh` with below command. Let the script finish before proceeding.
    ```bash
    ./deploy.sh -softwareLocation=/siemens/DeploymentCenter/repository/software -dcusername=dcadmin -dcpassword=”<your dc_server pwd>”
    ```
- Directory `/siemens/tcif` should now be present.

**Create TcIF systemd service**

- Login to corporate server using the `tcx_user`.
- Download [TcIF service template](https://code.siemens.com/ctcx/cookbook/-/raw/master/docs/Product%20Integration%20Documentation/Teamcenter%20Integration%20Framework/tcif.service?ref_type=heads)
- Rename the file to `tcif.service` and place it in `/etc/systemd/system` directory.
- Edit the TcIF service template: 
    ```bash 
    sudo vi tcif.service
    ```
- Locate `Environment="SPLM_LICENSE_SERVER=28001@<tenant-id>.license-service.prd.tcxservices.com` entry and update its `tenant-id` placeholder.
- Save and exit vi, and set the permissions for this new file: 
    ```bash 
    sudo chmod 644 tcif.service
    ```
    ```bash
    sudo chown tcx_user:root tcif.service
    ```
- Then to load the service run:
    ```bash 
    sudo systemctl daemon-reload
    ```
    ```bash
    sudo systemctl enable tcif
    ```
- Start TcIF: 
    ```bash 
    sudo systemctl start tcif
    ```

**Prepare access to TcIF web UI**
- To establish connectivity between TcIF env to CyberArk, create TGW peering using [Ansible template](https://ansible-dev.cloud.teamcenter.com/#/templates/job_template/93?template_search=page_size:20;order_by:name;type:workflow_job_template,job_template).
- Add inbound rules for TcIF EC2 that CyberArk can access.
    - Select the machine on which TcIF service is running.  Ex: `Siemens-tcxtcf27-prd-LinuxServer`
    - Select the `Security` tab.
    - Click on `Security groups`.
        - ![Image](./image_1.png)
    - Under `Inbound rules`, click on `Edit Inbound rules`
        - ![Image](./image_2.png)
    - Add the Source IP/CIDR of CyberArk details in this Security Group (Verify the CIDR range with CyberArk team)  
    - The webapp URL for TcIF that must be registered in CyberArk is `http://<tennantid>.<Tc DC Server route 53 record>:8090/tcif/rest/login`.
        - Ex: http://tcxtcf27.dc-service.prd.tcxservices.com:8090/tcif/rest/login

**Configure TcIF using its UI**

- Check TcIF running status:
```bash
sudo systemctl status tcif
```
- If it is running, then shut it down: 
```bash 
sudo systemctl stop tcif
```
- Go to `/siemens/tcif/tcif/container/etc` directory and edit `com.tc.esb.security.cfg` file.
- Set `sso.enabled.pending` property’s value to `false`.
- Set `sso.login.redirect.url.pending` property’s value to empty string.
- Start TcIF:
```bash 
sudo systemctl start tcif
```
- Login to TcIF web console using the non-SSO TcIF credentials specified during TcIF installation. The username is `IFAdmin` , and the password value can be obtained from the `tcif_user_password` attribute in the vault at `Secrets/secret/tcx/teamcenter/tcif`. 
- On the left navigation pane, select `Security` menu under `Configure` section.
- Select Principals tab and click on New button.
![Image](./image_9.png)
- On the subsequent screen under the Name field, enter the name of any SSO-enabled Teamcenter user. Its password value is irrelevant since this user definition will be used exclusively for authorization purposes only.
- Select `True` option under Administrator field, then click `Save`.
- Select `SSO` tab.
- Check the property/value pairs and, if necessary, make adjustments to match the specified values, then click `Save`.

| Property | Value |
| :--------------- | :---------------- |
| Enabled | ☑ (True) |
| Admin Attribute | IsAdmin |
| Redirect URL Suffix | /rest/login |
| Application ID | tcxtcif |
| Security Context Decryption Key | SecurityTcxDecryptionKey |
| Identity URL | https://tenant-id.testplmcloudsolutions.com/identityservice |
| Login Redirect URL | (leave empty) |


- Restart TcIF:
```bash 
sudo systemctl stop tcif
```
```bash
sudo systemctl start tcif
```

- Open the aforementioned TcIF web console URL.
- Login using TcSS credentials of the TcSS-defined SSO user ID specified earlier.
- On the left navigation pane, select `Sites` menu in the `Configure` section.
- Check the existing list of site definitions. If the current Teamcenter instance’s site ID is not present, click on the `New` button. If the site ID entry does exist, click on its Edit button.

![Image](./image_11.png)


- Under `Configuration Parameters` tab, check that the Site SSO option `On` is selected, and the `Application ID` field bears the SSO Application ID assigned to the Teamcenter instance in question.

![Image](./image_12.png)


- Under `Security` tab, the `SOA_URL` property must bear the ALB-based URL pointing to the Web Tier, and its value should be `https://<tenant-id>.testplmcloudsolutions.com/tc`


