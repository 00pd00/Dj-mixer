# Editing `translator.xml`

## Steps to Edit translator.xml
These steps are for enabling nxtransdirect translator.
1. Go to `D:\Siemens\Teamcenter_xxxx\Dispatcher\Module\conf` on the Dispatcher machine.
2. Open the `translator.xml` file.

### Required Changes

- Remove the tag `name="clientoption"` to ensure user credentials are enforced from `translator.xml`.
- Use a password file instead of plain text passwords for enhanced security.

## Creating the Password File

1. Log in to the vault using your tenant namespace.

    **Vault URLs:**
    - **Production:** `https://vault.xcr.gblsvcs01eu.prod.eu-central-1.kaas.sws.siemens.com`
    - **Non-production:** `https://vaultent.emea1.co.sws.siemens.com/`

    Provide your specific tenant namespace during login (for example, `<tcx-development_ns/storm_playground/release1/prd>`).

2. Navigate to `secret/tcx/teamcenter/dispatcter/users/` to find the DC proxy password.

    ![Vault Password Path](./image_186.png)

    **Vault Login Page:**
    ![Vault Login Screenshot](./image_187.png)

    **DC Proxy Password Key-Value Pair:**
    ![Proxy Password Screenshot](./image_187.5.png)

3. Create the password file by running the following commands in a Teamcenter shell:
    ```plaintext
    set VAR1=<dc proxy password>
    install -encryptpwf -e=VAR1 -f=%TC_ROOT%\security\config1_dcproxy.pwf
    ```
    If you cant find Teamcenter command prompt, launch a normal command prompt and execute following commands:

    ```command
    set TC_ROOT=d:\Siemens\Teamcenter_<version>\tc_root
    set TC_DATA=d:\Siemens\Teamcenter_<version>\tcdata
    %TC_DATA%/tc_profilevars.bat
    ```
    Replace the ```<version>``` string by appropriate version string in the name of folder.
---

## Translator.xml Configuration

### TcX Standard, Advanced, and Premium

Update the `translator.xml` as follows:

```xml
<NxTransDirect provider="SIEMENS" service="nxtransdirect" isactive="true" OutputNeeded="false">
    <TransExecutable name="nxtransdirect.bat" dir="&MODULEBASE;/Translators/nxtransdirect"/>
    <Options>
        <Option name="inputpath" string="-inputFile=" description="..."/>
        <Option name="clientoption" optionkey="user" string="-u=" value="dcproxy" description="..."/>
        <Option name="clientoption" optionkey="password" string="-pf=" value="<Full path to config1_dcproxy.pwf>" description="..."/>
        <Option name="clientoption" optionkey="group" string="-g=" value="dba" description="..."/>
        <Option name="clientoption" optionkey="encrypted_password" string="-encrypt=" value="false" description="..."/>
        <Option name="clientoption" optionkey="use_module_user" string="-autologin=" value="false" description="..."/>
        <Option name="clientoption" optionkey="storeInSourceVolume" string="-storeInSourceVolume=" value="true" description="..."/>
        <Option name="clientoption" optionkey="updateExistingVisData" string="-updateExistingVisData=" value="false" description="..."/>
        <Option name="clientoption" optionkey="changeOwnerToCad" string="-changeOwnerToCad=" value="true" description="..."/>
        <Option name="clientoption" optionkey="changeOwnerToCad" string="-changeOwnerToCad=" value="true" description="..."/>
        <Option description="Bypass option for translator" optionkey="bypass" string="-bypass=" value="true" />
    </Options>
</NxTransDirect>
```

Update the highlighted sections from the reference screenshot:

![Configuration Reference](./image_344.png) 

__Mind the last option added in above xml that enables bypass for the translator.__

### TcX Essentials Only

Since TcX Essentials is multi-tenant, use a group value from the Translation Request instead.

```xml
<NxTransDirect provider="SIEMENS" service="nxtransdirect" isactive="true" OutputNeeded="false">
    <TransExecutable name="nxtransdirect.bat" dir="&MODULEBASE;/Translators/nxtransdirect"/>
    <Options>
        <Option name="inputpath" string="-inputFile=" description="..."/>
        <Option name="clientoption" optionkey="user" string="-u=" value="dcproxy" description="..."/>
        <Option name="clientoption" optionkey="password" string="-pf=" value="<Full path to config1_dcproxy.pwf>" description="..."/>
        <Option name="clientoption" optionkey="group" string="-g=" value="" description="..."/>
        <Option name="clientoption" optionkey="encrypted_password" string="-encrypt=" value="false" description="..."/>
        <Option name="clientoption" optionkey="use_module_user" string="-autologin=" value="false" description="..."/>
        <Option name="clientoption" optionkey="storeInSourceVolume" string="-storeInSourceVolume=" value="true" description="..."/>
        <Option name="clientoption" optionkey="updateExistingVisData" string="-updateExistingVisData=" value="false" description="..."/>
        <Option name="clientoption" optionkey="changeOwnerToCad" string="-changeOwnerToCad=" value="true" description="..."/>
    </Options>
</NxTransDirect>
```

Make sure to update the highlighted configuration based on the reference screenshot:

![Essentials Configuration Reference](./image_345.png)