# Validating Deployment Success

Ensure the deployment is complete on every machine before starting any additional deployment operations. Follow these steps to verify the software deployment status.

> **Note:** Please complete the dispatcher installation before validating deployment success. Refer to the [Teamcenter Dispatcher Installation Guide](../040_Teamcenter%20Dispatcher%20and%20Translators/010_Teamcenter%20Dispatcher%20Installation.md) for detailed instructions.


## Steps to Validate Deployment

1. **Connect to CorpServer**
   - Access the CorpServer machine where your deployment actions will be performed.

2. **Switch to the Root User**
   - Run the following command:
     ```bash
     sudo su root
     ```

3. **Set Java Environment Variables**
   - Enter these commands to set the required Java paths:
     ```bash
     export JAVA_HOME=/siemens/openjdk/<JDK_VERSION>
     export JRE64_HOME=/siemens/openjdk/<JDK_VERSION>
     ```

4. **Navigate to Quick Deploy Tool Directory**
   - Change to the directory containing the deployment tools:
     ```bash
     cd /siemens/DeploymentCenter/webserver/additional_tools/internal/dc_quick_deploy
     ```

5. **Export Environment and Deployment Status**
   - Run the command below to export the environment details and their deployment status:
     ```bash
     ./dc_quick_deploy.sh -dcurl=http://localhost:8094/deploymentcenter -mode=export -exportType=Full -dcusername=dcadmin -dcpassword=<DC Password from vault> -environment=<Environment name> -exportFile=<path where the file can be exported> -preserveDeploymentStatus
     ```

6. **Review the Exported Deployment File**
   - Locate the generated file at the path specified in `-exportFile`.
   - Ensure that all components and applications are **not** in "Pending Install" or "Pending Update" status.
   - Confirm that all software is listed as "Installed" or "Updated".
   - The environment’s `deploymentStatus` should be **"Installed"** or **"Updated"**.

## Example Deployment Status

Refer to the screenshots below to verify the status format in your export file:

![Deployment Status Example 1](./image_335.png)

![Deployment Status Example 2](./image_336.png)