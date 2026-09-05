# NX Installation

Choose the NX install kit you need from the [Support Center](https://support.sw.siemens.com/en-US/product/209349590/downloads).

To find the correct NX version:

1. Select the product **Teamcenter X**.
2. Go to the **Downloads** tab.
3. Search for **Teamcenter X Compatibility**.
4. Download the compatibility matrix spreadsheet and identify the supported NX version.

Alternatively, you can refer [Support White Papers Certifications](https://support.sw.siemens.com/en-US/product/282219420/download/PL20200617155641511) and click on 'Teamcenter Integrations Availability Matrix [MONTH] [SOME_DATE] [YEAR]' link to download the compatibility excel.
For example, the link for Teamcenter compatibility In the month of November 2025, Excel link will be name something like following:
'Teamcenter Integrations Availability Matrix November 12 2025'

Example: Downloading NX-2412
![Compatibility Matrix Screenshot](./image_343.png)

**Note:**  
This guide uses details from the NX-2306 release. Screenshots may vary for newer NX versions.  
For the initial release of Teamcenter X Essentials based on Tc2412.x, install NX2312.

## Example: Installing NX-2306

Ensure the installation kit is available on the Dispatcher server. In this example, the kit is copied and extracted to `C:\NX kit\` on the Dispatcher server.

### Installation Steps

1. Open the `SiemensNX-2306_wntx64` directory and double-click **Launch**.  
   **Note:** Set the NX installation directory to `D:\Siemens\Teamcenter_2506\Dispatcher\NX`.
   
   ![Launch Directory Screenshot](./image_175.png)

2. Select **Install NX** and click **Next**.

   ![Install NX Screenshot](./image_176.png)

3. Choose your preferred language.

   ![Language Selection Screenshot 1](./image_177.png)  
   ![Language Selection Screenshot 2](./image_178.png)

4. Click **Next**.

   ![Next Button Screenshot](./image_179.png)

5. Select the setup and choose **All available features**.

   ![Features Selection Screenshot](./image_180.png)

6. Make sure the License File points to the tenant's License Service DNS (for example, `28001@<tenant-subdomain>.license-service.prd.tcxservices.com`).

   ![License File Screenshot](./image_181.png)

7. Select **English** for the Runtime Language.

   ![Runtime Language Screenshot](./image_182.png)

8. Click **Install**.

   ![Install Button Screenshot 1](./image_183.png)  
   ![Install Button Screenshot 2](./image_184.png)

9. Click **Finish** once the installation completes.

   ![Finish Button Screenshot](./image_185.png)