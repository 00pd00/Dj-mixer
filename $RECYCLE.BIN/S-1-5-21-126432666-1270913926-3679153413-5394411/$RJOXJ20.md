##### Generate Pipeline Variables

1. Open a shell session on local machine. Import all variables from the file downloaded from cloud shell(../../02Cell-Setup/Automation%20Prerequisites/TcX%20Cell%20Setup/#download-extended-scripts-1) as environment variables:

    ```bash
    source ./0_cell_env_vars.sh
    source ./0_cloud_env_vars.sh
    ```
### Cell-Validation

To validate your cell setup:

*   Provide script execution permission with `chmod +x 0_validate_inputs.sh`
*   Run the script: `./0_validate_inputs.sh`

2. Clone the `tcx-pipeline-account` Repository

    ```bash
    git clone git@gitlab.industrysoftware.automation.siemens.com:tcx-deploy/tcx-pipeline-account.git
    ```

3. Clone `tcx-pipeline-variables` Repository

    ```bash
    git clone git@gitlab.industrysoftware.automation.siemens.com:tcx-deploy/tcx-pipeline-variables.git
    cd tcx-pipeline-variables
    ```

4. Create a Branch. Specify the cell variable file name:

    ```bash
    git checkout -b feat/$CLUSTER_NAME
    ```

5. Create a Cell Variables File

    ```bash
    cd ./variables/cell/
    envsubst < ../../../tcx-pipeline-account/cell-templates/azure/azm-tcx-cell-template.yml > temp.yml
    sed 's/#{/\${/g' temp.yml > $VARIABLES_FILENAME.yml
    rm temp.yml
    ```

6. Create a Cloud Variables File

    ```bash
    cd ../cloud/
    envsubst < ../../../tc-version-manifests/tcx-configuration/azure/cell-templates/azm-tcx-cloud-template.yml > $CLOUD_VARIABLES_FILENAME.yml
    ```

7. Validate Stream Variables. Ensure that `./variables/stream/` contains a stream variables file corresponding to your targeted environment (dev/customer/dryrun). Add or update stream variables as needed.

---