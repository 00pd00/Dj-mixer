## Salt License Server Setup on Additional Instances

This document provides step-by-step instructions to install and configure the Salt License Server on the additional instances and update all license machines with the triad license file.

For AWS, 
- `<release-bucket>` refers to `tcx-release-management-dev` or `tcx-release-management-production` or `tcx-release-management` or `tcx-release-management-pre-production` bucket, depending on the stream you have used.
Also `<TCVersion>` refers to Teamcenter foundation version. e.g. 2506

For Azure, 

* `<AccountName>` refers to admin storage account name.
* `<container>` refers to the `tcx-release-management-dev` or `tcx-release-management-production` or `tcx-release-management` or `tcx-release-management-pre-production` bucket depends on stream you have used.   
---

### Step 1: Download Triad License File

For AWS, get the triad license file from the following S3 location:
s3://`<release-bucket>`/admin-console/`<TCVersion>`_cloud_license/triad_`<TCVersion>`_license.lic.txt

For Azure, get the triad license file from the azure blob storage
az storage blob download --account-name `<AccountName>` --container-name `<container>` --name "admin-console/`<TCVersion>`cloud_license/triad_`<TCVersion>`_license.lic.txt" --file triad_`<TCVersion>`_license.lic.txt --auth-mode login

Or create a container license file by raising request. To reise request refer to [Teamcenter X Cloud License](docs/Documentation/010_Tenant%20Onboarding/080_License%20Configuration/030_Teamcenter%20X%20Cloud%20License.md)

Make sure when requesting license file share hostname of your all instances and their respective unique containerid. More that or equal to 3 instances is request to triad container license file.

---
 
### Step 2: Login to Additional Instances

Log in to the additional instances that were created earlier (e.g., splmlicense2 and splmlicense3) for Salt License installation.

---

### Step 3: Create New Directory

Create new directory "TriadLicense" to install the license server-

```bash
sudo su
mkdir /TriadLicense/
cd /TriadLicense/
```

---

### Step 4: Create tcx_user (Same as DC Machine)

Run the following commands:

```bash
sudo adduser tcx_user
sudo passwd tcx_user
```
```bash
sudo visudo
```

In the visudo file, add this line at the end:

```bash
tcx_user ALL=(ALL:ALL) NOPASSWD: ALL
```

Then save and exit

---

### Step 5: Install Required RPM Packages

Download the required RPMs:

#### AWS
```bash
/usr/local/bin/aws s3 cp s3://<release-bucket>/third_party_binaries/lnx64/rpms/lsof/4.94.0-3/lsof-4.94.0-3.el9.x86_64.rpm .
/usr/local/bin/aws s3 cp s3://<release-bucket>/third_party_binaries/lnx64/rpms/lsb/4.1-56/ /lsb/ --recursive
```

#### Azure
**Note**: 
- Ensure to have Contributor and Storage Blob Data Contributor access to the storage account. 

- Ensure you have the Azure CLI installed. ``az --version`` 

```bash
az login
```
```bash
az storage blob download --account-name <AccountName> --container-name <container> --name "third_party_binaries/lnx64/rpms/lsof/4.93.2-1/lsof-4.93.2-1.el8.x86_64.rpm" --file lsof-4.93.2-1.el8.x86_64.rpm --auth-mode login
```

```bash
mkdir -p ./lsb && az storage blob download-batch --account-name <AccountName> --source <container> --destination ./lsb --pattern "third_party_binaries/lnx64/rpms/lsb/*" --auth-mode login
```

#### Install the RPMs:

```bash
sudo dnf install lsof-4.94.0-3.el9.x86_64.rpm -y
sudo dnf install $(find lsb/ -type f -name '*.rpm') -y
```
---

### Step 6: Download and Install Salt Binary


#### AWS
```bash
/usr/local/bin/aws s3 cp s3://<release-bucket>/third_party_binaries/lnx64/splm/2.2.4.0/SiemensLicenseServer_v2.2.4.0_Lnx64_x86-64.bin /tmp/
chmod +x SiemensLicenseServer_v2.2.4.0_Lnx64_x86-64.bin
/usr/local/bin/aws s3 cp s3://<release-bucket>/license/teamcenter/<TCVersion>/splm.lic ugslmd.lic
/tmp/SiemensLicenseServer_v2.2.4.0_Lnx64_x86-64.bin -silent -licensefile /tmp/ugslmd.lic -destination /tmp/LicenseServer -licensePort 28000
```

#### Azure
```bash
az storage blob download --account-name <AccountName> --container-name <container> --name "third_party_binaries/lnx64/splm/2.2.4.0/SiemensLicenseServer_v2.2.4.0_Lnx64_x86-64.bin" --file SiemensLicenseServer_v2.2.4.0_Lnx64_x86-64.bin --auth-mode login
az storage blob download --account-name <AccountName> --container-name <container> --name "license/teamcenter/<TCVersion>/splm.lic" --file splm.lic --auth-mode login
chmod +x SiemensLicenseServer_v2.2.4.0_Lnx64_x86-64.bin
./SiemensLicenseServer_v2.2.4.0_Lnx64_x86-64.bin -silent -licensefile splm.lic -destination /TriadLicense/LicenseServer -licensePort 28000
```

---

### Step 7: Replace License with Triad License File (All License Machines)
This process must be done on all license machines, including the DC machine.

#### i. Download Triad License File

##### AWS
```bash
/usr/local/bin/aws s3 cp s3://tcx-release-management-dev/admin-console/<TCVersion>_cloud_license/triad_<TCVersion>_license.lic.txt splm.lic
```
For Azure,
```bash
az storage blob download --account-name <AccountName> --container-name <container> --name "admin-console/<TCVersion>cloud_license/triad_<TCVersion>_license.lic.txt" --file splm.lic --auth-mode login
```

or use the triad license file you requested.

#### ii. Create siemens_container_id.txt
```bash
cd /opt/
mkdir Siemens
cd Siemens/
vi siemens_container_id.txt
```

Add the following content based on machine:

DC machine: First container id entry in license file (e.g. CTX0000000001)
LicMachine1: second container id entry in license file (e.g. CTX0000000002)
LicMachine2: third container id entry in license file (e.g. CTX0000000003)

Set ownership:
```bash
chown saltd:saltd siemens_container_id.txt
```

#### iii. Update Hostnames in Triad License File
```bash
cd /TriadLicense/
vi splm.lic
```

#### iv. Update the license file

- Replace hostname in Entry in First container id entry line → hostname of DC machine
- Replace hostname in Entry in Second container id entry line → hostname of LicMachine1
- Replace hostname in Entry in Third container id entry line → hostname of LicMachine2

To get hostname in instance details check for `Private IP DNS name (IPv4 only)`

#### v. Move Triad License to Active Location
```bash
mv /TriadLicense/splm.lic /TriadLicense/LicenseServer/ActiveLicenses/ugslmd.lic
chown saltd:saltd /TriadLicense/LicenseServer/ActiveLicenses/ugslmd.lic
```
Repeat on all license machines.

#### vi. Restart License Server
```bash
systemctl restart saltd
```
#### vii. Check License Server Status 
```bash
systemctl status saltd
```