# Teamcenter Visualization Installation Guide

Follow these steps to install Teamcenter Visualization. This guide is designed for both end users and technical operators. If you need further clarification, refer to the [Siemens Support Center](https://support.sw.siemens.com/en-US/product/229029598/downloads).

## Prerequisites

- Install 7-Zip (required to extract the `Tc-Vis-<available version>_win64.7z` package).
- Download `7za.exe` from one of the following paths, based on your environment:
    - Pre-production: 
    ```bash
   `s3://tcx-release-management-pre-production/third_party_binaries/wntx64/7zip/19.0/7za.exe`
    ```
   - Production:
    ```bash
    `s3://tcx-release-management-production/third_party_binaries/wntx64/7zip/19.0/7za.exe`
     ```

## Installation Steps

1. **Download Teamcenter Visualization**

   - Visit the [Siemens Support Center](https://support.sw.siemens.com/en-US/product/229029598/downloads) and to download, simply navigate to Teamcenter Visualization, select your supported release, and download the `Tc-Vis-<available version>_win64.7z` file.

2. **Extract the Downloaded Archive**

   - Use 7-Zip (`7za.exe`) to extract the `Tc-Vis-<available version>_win64.7z` file.
   - Open **Command Prompt** and navigate to the folder where `7za.exe` is downloaded.
   - Run the following commands:
      ```cmd
      7za.exe x "Tc-Vis-<available version>_win64.7z" -o"C:\path\to\extraction\folder"
      ```

3. **Run the Installer**

   - Locate the downloaded file and run `setup.exe`.

4. **Start the Conversion Process**

   - Select the **Convert** option.
   
     
     > **Note:** Dispatcher translators require the Visualization software to be installed in the `<DISP_ROOT>\Visualization` directory. If you choose a different installation location, additional configuration steps are needed (see the note at the end of this guide).

   ![Select Convert Option](./image_171.png)
 
   - Select the option shown in the image below.

   ![Select Additional Option](./image_171_a.png)
   

5. **Choose Localizations**

   - Select your preferred language options for the installation.

   ![Select Localizations](./image_172.png)

6. **Enter License Server Details**

   - Provide the address of your license server when prompted.
   - User can get the address of license server from their tenant repository:
     - File: `customer-information/deploy-inputs.yaml`
     - Key: `dns_internal_license_server`

   - License server format:
     `<envtype>-<tenant-id>.license-service.<envtype>.tcxservices.com`
     - Example:
       `prd-wxoz7ysw.license-service.prd.tcxservices.com`

   - Server port: `28000`

   ![Enter License Server](./image_173.png)

7. **Install the Software**

   - Click **Install** to begin the installation.

   ![Installation Progress](./image_174.png)

8. **Complete the Installation**

   - After installation finishes, click **Finish**.

## Additional Configuration (Optional)

If you installed Visualization in a directory other than `<DISP_ROOT>\Visualization`, you must update the environment variable to ensure proper operation:

- Open the following file in a text editor:
  `<DISP_ROOT>\Module\Translators\previewservice\previewservice.bat`

- Modify the `TC_VVCP` environment variable to reflect the new installation path.