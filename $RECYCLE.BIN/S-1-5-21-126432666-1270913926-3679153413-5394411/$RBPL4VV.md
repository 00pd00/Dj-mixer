# Editing nxtransdirect.bat

Follow this guide to configure the `nxtransdirect.bat` file for your Teamcenter Dispatcher setup.

>**Note:**
For **TCX-Essential** there is an additional check thats needed to be done. From TC_DATA folder open tc_profilevars.bat in notepad. Check if 'PGCLIENTENCODING' variable is set. If it's not set add following line at the beginning of the batch file: 'set PGCLIENTENCODING=UTF8'. This issue is fixed in TC 2512.

Example snippet of tc_profilevars.bat after adding the variable is as following:

![tc_profilevars](./image363.png)


## Step 1: Navigate to the File- Go to:  
  `D:\Siemens\Teamcenter_xxxx\Dispatcher\Module\Translators\nxtransdirect`
- On the dispatcher machine, locate and open the `nxtransdirect.bat` file.

## Step 2: Update Configuration Parameters

Set values for following variables using the appropriate values.
- `TC_ROOT`
- `TC_DATA`
- `FMS_HOME`
- `TC_JRE_HOME`
- `UGII_BASE_DIR`
- `SPLM_LICENSE_SERVER`

- Replace the value `CHANGE_ME` with the appropriate values if required.
- Remove `REM` command if required. In a batch file, REM ("remark") is a command used to add comments or remarks within the script.

**Example Values - Before editing file:**  

set TC_ROOT=CHANGE_ME  
set TC_DATA=%TC_ROOT%\tcdata  
set FMS_HOME=CHANGE_ME  
set TC_JRE_HOME=CHANGE_ME  
REM set UGII_BASE_DIR=  
REM set SPLM_LICENSE_SERVER=  

**Example Values - Editing File:**
```cmd
set TC_ROOT=d:\Siemens\Teamcenter_<version>\tc_root
set TC_DATA=d:\Siemens\Teamcenter_<version>\tcdata
set FMS_HOME=d:\Siemens\Teamcenter_<version>\tc_root\tccs
set TC_JRE_HOME=d:\Siemens\jdk\<java version>
set UGII_BASE_DIR=d:\Siemens\Teamcenter_<version>\Dispatcher\NX
set SPLM_LICENSE_SERVER=28001@hybrid05.license-service.prd.tcxservices.com
```
## Step 3: Restart Dispatcher Services

1. Open **Task Manager** and select the **Services** tab.
2. Locate the Dispatcher services in the list (as shown in the screenshot below).
3. Right-click each Dispatcher service and choose **Restart**.

![Dispatcher Services Screenshot](./image_189.png)

---

## Enabling NxTransDirect Translator in Teamcenter

To activate the NxTransDirect translator feature:

1. Log in to the tenant's Active Workspace.
2. Add the preference `NX_ETS_NXTRANSDIRECT_ENABLED` and set its value to `true`.

    Note: For more details about adding any TC preference, please refer Teamcenter documentation for the respective preference. Eg: For TC2512 if you want to add above mentioned preference, please refer [teamcenter documentation](https://internal.docs.sw.siemens.com/documentation/internal/PL20250702463573610/en-US/AdminDataReport/Preferences/Fnd0PreferenceDefinition_NX_ETS_NXTRANSDIRECT_ENABLED_NX_ETS_NXTRANSDIRECT_ENABLED.html) for the preference.

> **Important:**  
> Only perform this step after configuring the NxTransDirect translator. Enabling this preference allows the generation of JT files using Dispatcher.

