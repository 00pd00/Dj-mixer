## Upgrade NX Dispatcher to Utilize Newer Version of NX

**Applicable Product IDs:** TC30600-XT, TC7100, TC7101

Before upgrading NX Dispatcher, ensure a backup of the Dispatcher Server is completed. Steps for backing up the Dispatcher server are detailed in the [Automated Backup](../../Operations/Automated%20Backup%20and%20Restore%20of%20TcX%20environment/Automated%20Backup) section.

When upgrading from one functional release to another (e.g., NX2306 to NX2406), you must update the license file for the new NX version.

**New License File Required:**
- NX 2312.4000 > NX 2406.3000

**New License File NOT Required:**
- NX 2406.3000 > NX 2406.4000

Refer to [License Configuration](../080_License%20Configuration/010_License%20Configuration%20for%20the%20Initial%20Installations.md) for steps on generating and updating your new license file.


**Notes:**
- This procedure uses an example upgrade from NX2306 to NX2406 Dispatcher.
- The Dispatcher Server's "C:" drive can support only one NX installation at a time. Uninstallation instructions for the older NX version are included below.

### Steps to Upgrade NX Dispatcher

1. **Stop Dispatcher Services**
    - Stop Dispatcher services in the following order on the Dispatcher machine:
      - Stop Dispatcher Client
      - Stop Dispatcher Module
      - Stop Dispatcher Scheduler
    ![Stop Services](./image_233.png)

2. **Uninstall the Previous Version of NX**
    - Go to `C:\nx_kit\SiemensNX-2306_wntx64` and click **Launch**.
    - Click **Install NX**, then **Next**.
    - On the Setup screen, select **Remove**, then confirm by clicking **Remove** again.<br/>
    ![Uninstall NX](./image_234.png)
    - After uninstalling NX, navigate to the `C:\nx_kit` folder.
    - Delete all zip files and folders related to the previous NX version.
    ![Delete Old Files](./image_235.png)

3. **Install the New Version of NX**
    - Follow cookbook step [5.4.4.2](070_NX%20Installation.md) to install the appropriate NX release.

4. **Configure and Validate `translator.xml` File**
    - Ensure the `translator.xml` file is still correctly configured. Refer to cookbook step [5.4.4.3](080_Edit%20translator.xml.md) for guidance.

5. **Configure and Update `nxtransdirect.bat` File**
    - On the Dispatcher machine, go to `D:\Siemens\Teamcenter_XXXX\Dispatcher\Module\Translators\nxtransdirect`.

        Replace 'xxxx' by appropriate teamcenter version number.
    - Confirm `nxtransdirect.bat` is set up correctly by following cookbook step [5.4.4.4](090_Edit%20nxtransdirect.bat.md).
    
6. **Restart Dispatcher Services**
    - Start Dispatcher services in the following order:
      - Start Dispatcher Scheduler
      - Start Dispatcher Module
      - Start Dispatcher Client