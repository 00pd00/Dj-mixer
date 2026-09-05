## Manual steps to be performed before pipeline starts

### Backup `fmsmaster_FSC_fmsmaster.xml` file on S3 bucket

This step is not required every time before an upgrade. Check the S3 bucket to see if a backup of this file already exists. If not, follow the steps below:

1. Log in to the EC2 DC instance.
2. Run the following command to take a backup:

    ```
    /usr/local/bin/aws s3 cp /tenant-ENV/tenant-ENV/deploy/component/config/fmsmaster/fsc/fmsmaster_FSC_fmsmaster.xml s3://tcx-<region>-<ENV>-<TenantID>/
    ```
   > **Note:** Ensure that the backup is verified in `s3://tcx-<region>-<ENV>-<TenantID>`.

### Start tc-ldap pod
1. Go to the Tenant Repo in GitLab and open the override template to allow the `tc-ldap` pod to remain running during the update process of the environment. The file is located at:

    ```
    <tenant-id>-prd->helm_charts->override-templates->shutdown-teamcenter-for-update.yaml
    ```

2. Edit the file and remove the entry for `tc-ldap`:

    ```yaml
    tc-ldap:
      replicaCount: 0
    ```

3. Commit the changes, and you are now ready to start the upgrade/update pipeline.

### Update ugslmd.lic license file.
Currently the TCX upgrade process does not support the updation of ugslmd.lic license file of the license server.We have to manually modify the license file before triggering the pipeline for upgrade. Follow the steps below.
1. Go to Linux EC2 and move the orginal ugslmd.lic located at */siemens/LicenseServer/Activelicenses* to some temporary location.

2. Copy the *splm.lic* license file from *tcx-release-management-dev*/*tcx-release-management-production* S3 bucket located at the path *license/teamcenter/\<cTcX version to upgrade\>/* to the path */siemens/LicenseServer/ActiveLicenses* of the Linux EC2 machine.

3. Rename the *splm.lic* file to *ugslmd.lic* and make sure the directory containes only one *.lic* file.

4. Check the file encoding type is in UTF-8 format, if not then convert it.\
    *give user read write permissions of the file.*
    ```
    sudo chmod u=rw,go=r /siemens/LicenseServer/ActiveLicenses/ugslmd.lic
    ```
    *check the file character encoding type, example output: ugslmd.lic: text/plain; charset=iso-8859-1*
    ```
    file -i /siemens/LicenseServer/ActiveLicenses/ugslmd.lic
    ```
    *Take the file backup and convert it into UTF-8 encoding format.*
    ```
    sudo cp /siemens/LicenseServer/ActiveLicenses/ugslmd.lic /siemens/LicenseServer/ActiveLicenses/ugslmd.lic.bak
    
    sudo iconv -f iso-8859-1 -t UTF-8 /siemens/LicenseServer/ActiveLicenses/ugslmd.lic > /tmp/ugslmd.lic.new
    
    sudo mv /tmp/ugslmd.lic.new /siemens/LicenseServer/ActiveLicenses/ugslmd.lic
    ```
    *Check if the file now is in UTF-8 format.*
    ```
    file -i /siemens/LicenseServer/ActiveLicenses/ugslmd.lic
    ```

5. Run the *hostname* command to get the host name of the machine (make sure to ignore the -.ec2.internal- if present in the hostname) and edit the new license file by changing the content **server \<ip\>** to **server \<hostname\>** and **VENDOR ugslmd** to **VENDOR saltd saltd PORT=28001**.

6. Stop, start the license server and check the status if it is running.\
*systemctl stop saltd*\
*systemctl start saltd*\
*systemctl status saltd*
