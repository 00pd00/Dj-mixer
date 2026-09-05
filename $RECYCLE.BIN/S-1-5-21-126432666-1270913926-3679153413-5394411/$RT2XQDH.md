### Post steps

The following post-steps must be completed after launching a Teamcenter X Essentials Environment.

#### Update dcproxy user's name

##### Download the input.txt file from the following location:

[Download input.txt](https://artifacts.industrysoftware.automation.siemens.com/artifactory/generic-local/com/siemens/tcxlite/dcproxy_name_change/input.txt)

##### Run make_user utility to update dcproxy user's name to “Virtual Translation User”

1. Connect to the AWS EC2 instance of the environment as `tcx_user`.
2. Upload `input.txt` to `/administration/admin_work`.
3. Execute the following commands:
    ```bash
    sudo chown tcx_user:root /administration/admin_work/input.txt
    sudo chmod "+x" /administration/admin_work/input.txt
    tcc exec 'make_user -u=infodba -pf=$TC_SECURITY_DIR/default_infodba.pwf -g=dba -file=<path of the uploaded input.txt>'
    ```
4. Verify in Active Workspace UI.  
    ![Image](./image_405.png)

#### Update License File

##### Get Environment's Composite ID and Host ID

1. In the Environment's EC2 command prompt, navigate to `/siemens/LicenseServer/ugslmd_utils`.
2. Execute:
    ```bash
    ./getcid
    ```
    Record the Composite ID for your environment.  
    ![Image](./image_406.png)

3. Execute the following to find the environment's Host ID:
    ```bash
    echo $HOSTNAME
    ```

##### Request License File

1. Visit [TAC Licensing](https://tac.industrysoftware.automation.siemens.com/).
2. Select ‘New IR’ in the top right.
3. In the Site field, enter 1105626
4. In the contact field, enter + sign and add yourself to the contact list by entering the required fields (marked with red bar)
5. In the Assignee field, enter GDS_LIC_NSTD
6. The family will default to FIN_O2C and the application will default to GDS_LICENSING
7. In the Function field, select NON_INTEGRATED
8. In the Subfunction field, select MISCELLEANOUS
9. In the Subject field, enter “Request internal non-standard license”
10. In the Case Description text field, you must provide the following info (example below)
    - **SiteComposite ID (CID):** Instructions for gathering CID are located in prior section [Get Environment's Composite ID and Host ID](../../Optional%20Product%20Integrations/Teamcenter%20X%20Essentials/Post-Steps#get-environments-composite-id-and-host-id)
    - **Host id:** Instructions for gathering Host ID are located in prior section [Get Environment's Composite ID and Host ID](../../Optional%20Product%20Integrations/Teamcenter%20X%20Essentials/Post-Steps#get-environments-composite-id-and-host-id)
    - **Product Number:** example CLDTCX7005T
    - **Version:** example Teamcenter 2412
    - **Quantity:** (this value determines how many users can use the license)
11. Click **Create**.  
12. The Licensing team will get the case and will respond to you with the completed license file.
    Example Request:

    ![Image](./image_407.png)

##### Update Environment's License File

1. Upon receiving the new license file, update the `VENDOR` line to reference `saltd`:
    ```
    VENDOR saltd saltd PORT=28001
    ```
    ![Image](./image_408.png)

2. Upload the new license file to a location inside the environment (e.g., `/tmp`).
3. Login to the EC2 command prompt as `tcx_user`.
4. Stop the `saltd` service:
    ```bash
    sudo systemctl stop saltd
    ```
5. Navigate to `/siemens/LicenseServer/ActiveLicenses` and back up the existing license file:
    ```bash
    sudo mv ugslmd.lic ugslmd_old.old
    ```
6. Copy the new license file to this location and rename it to `ugslmd.lic`.  
    ![Image](./image_409.png)

7. Change ownership of the new license file:
    ```bash
    sudo chown saltd:saltd ugslmd.lic
    ```
8. Restart the `saltd` service:
    ```bash
    sudo systemctl start saltd
    ```
9. Verify the service status:
    ```bash
    sudo systemctl status saltd
    ```
    ![Image](./image_410.png)

##### Validate License Version

1. As `tcx_user`, navigate to `/siemens/LicenseServer/` on the corporate server EC2 machine.
2. Run the following command to return the license version:
    ```bash
    ./lmutil lmstat -i gateway -c 28000@<server name>
    ```
    Example:  
    ```bash
    ./lmutil lmstat -i gateway -c 28000@tcxlt680tcs1prd
    ```
    ![Image](./image_411.png)
