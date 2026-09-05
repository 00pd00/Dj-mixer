## Preview Service and Render Management Translator Setup

**Applicable Product IDs:** There is no product ID  
**Applicable Platforms:** AWS, AZURE  
**Polarion Item:** PL-163399 - No Product ID - Teamcenter Dispatcher and Translators

> **Note:** This is applicable for all TcX Standard, TcX Advanced and TcX Premium.

This section provides the deployment and configuration steps for the Preview Service Translator and Render Management Translator.

### Overview

The Preview Service Translator and Render Management Translator are used for generating preview images and managing rendering tasks in Teamcenter. These translators require the following software prerequisites:

- **Microsoft Office** (for document preview generation)
- **Teamcenter Visualization** (for CAD file preview generation)

### Translator Package IDs

| Translator Name | Package ID |
|-----------------|------------|
| Preview Service Translator | `prevServSel_translator` |
| Render Management Translator | `renderMgtTranslatorSel_translator` |

---

## Deployment Steps

### Step 1: Add Package IDs to Customer Input

To deploy the Preview Service and Render Management translators, add the Package IDs to the `TeamcenterPackageIDList` parameter in your customer input file.

**Example customer input:**

```yaml
TeamcenterProductIDList:
  - TC7003-XT
  - TC7030-XT

TeamcenterPackageIDList:
  - prevServSel_translator
  - renderMgtTranslatorSel_translator

DeployDispatcher: true
```

> **Note:** When setting `DeployDispatcher: true`, you must provide the corresponding Package IDs. Failing to do so will result in a pipeline failure.

For more details on customer input parameters, refer to:
- **AWS:** [AWS Customer Input](../010_Pre-Reqs/020_Ansible%20Template%20Input/010_AWS%20Customer%20Input.md)
- **AZURE:** [AZURE Customer Input](../010_Pre-Reqs/020_Ansible%20Template%20Input/020_AZURE%20Customer%20Input.md)

### Step 2: Run the Deployment Pipeline

Execute the deployment pipeline with the updated customer input. The pipeline will:

1. Deploy the Dispatcher infrastructure on the Windows Server
2. Install the translator packages specified in `TeamcenterPackageIDList`

### Step 3: Verify Dispatcher Installation

After the pipeline completes, verify the Dispatcher installation by checking the Windows services on the Dispatcher machine:

1. Open **Task Manager** on the Windows Dispatcher machine
2. Navigate to the **Services** tab
3. Verify the following services are running:
   - `Teamcenter Dispatcher Scheduler V<Teamcenter Version>`
   - `Teamcenter Dispatcher Module V<Teamcenter Version>`
   - `Teamcenter DispatcherClient V<Teamcenter Version>`

---

## Configuration Steps

### Step 1: Install Microsoft Office

Microsoft Office is required for document preview generation (Word, Excel, PowerPoint files).

1. Download Microsoft Office from the official Microsoft website
2. Run `Setup.exe` on the Dispatcher Windows machine
3. Complete the installation and activate with your product key

For detailed steps, refer to [Microsoft Office Installation](./030_Microsoft%20Office%20Installation.md).

### Step 2: Install Teamcenter Visualization

Teamcenter Visualization is required for CAD file preview generation.

1. Download Teamcenter Visualization from the [Siemens Support Center](https://support.sw.siemens.com/en-US/product/229029598/downloads)
2. Run `setup.exe` on the Dispatcher Windows machine
3. Select **Convert** option during installation
4. Install to `<DISP_ROOT>\Visualization` directory (recommended)
5. Enter your license server details
6. Complete the installation

For detailed steps, refer to [Teamcenter Visualization Installation](./040_Teamcenter%20Visualization%20Installation.md).

> **Note:** If Visualization is installed in a different location, update the `TC_VVCP` environment variable in `<DISP_ROOT>\Module\Translators\previewservice\previewservice.bat`.

### Step 3: Restart Dispatcher Services

After installing the prerequisites, restart the Dispatcher services:

1. Open **Task Manager** → **Services** tab
2. Stop the services in this order:
   - `Teamcenter DispatcherClient V<Teamcenter Version>`
   - `Teamcenter Dispatcher Module V<Teamcenter Version>`
   - `Teamcenter Dispatcher Scheduler V<Teamcenter Version>`
3. Start the services in this order:
   - `Teamcenter Dispatcher Scheduler V<Teamcenter Version>`
   - `Teamcenter Dispatcher Module V<Teamcenter Version>`
   - `Teamcenter DispatcherClient V<Teamcenter Version>`

---

## Validation Steps

### Validate Preview Service Translator

1. Login to Active Workspace as a Teamcenter user
2. Upload a document (Word, Excel, or PowerPoint file) to an Item
3. Verify that a preview/thumbnail is generated for the document
4. Open the document preview in the viewer

### Validate Render Management Translator

1. Login to Active Workspace as a Teamcenter user
2. Upload a CAD file (e.g., NX part, JT file) to an Item
3. Verify that a rendered preview is generated
4. Check the rendering status in the Dispatcher logs

---

## Troubleshooting

### Preview not generating

1. Verify Microsoft Office is properly installed and activated
2. Check Dispatcher services are running
3. Review Dispatcher logs at `<DISP_ROOT>\logs`

### Visualization preview failing

1. Verify Teamcenter Visualization is installed correctly
2. Check the `TC_VVCP` environment variable points to the correct path
3. Verify the license server is accessible

For additional troubleshooting, refer to [Troubleshoot Dispatcher Translator Failures](./170_Troubleshoot%20Dispatcher%20Translator%20Failures.md).
