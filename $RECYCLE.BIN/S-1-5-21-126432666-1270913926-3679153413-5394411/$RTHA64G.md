
#### Trigger Admin pipeline

##### Create the Pipeline Variables files

1. Import all variables as environment variables:

    ```bash
    source ./0_admin_env_vars.sh
    ```

2. Clone the `tcx-pipeline-account` repo:

    ```bash
    git clone git@gitlab.industrysoftware.automation.siemens.com:tcx-deploy/tcx-pipeline-account.git
    ```

3. Clone the `tcx-pipeline-variables` repo:

    ```bash
    git clone git@gitlab.industrysoftware.automation.siemens.com:tcx-deploy/tcx-pipeline-variables.git
    cd tcx-pipeline-variables
    ```

4. Create a branch and specify the cell variable file name:

    ```bash
    git checkout -b feat/admin-$AZURE_SUBSCRIPTION_ID
    ```

5. Create a variables file:

    ```bash
    cd ./variables/cell/
    envsubst < ../../../tcx-pipeline-account/cell-templates/azure/azure-admin-cell-template.yml > temp.yml
    sed 's/#{/\${/g' temp.yml > $VARIABLES_FILENAME.yml
    rm temp.yml
    ```

6. Validate that `./variables/stream/` contains a stream variables file that corresponds to your targeted environment. Add a new stream variables file if required. Update and/or validate all stream variables!
7. Commit and push the new files:

    ```bash
    git add .
    git commit -m "Add admin pipeline variables"
    git push origin feat/admin-$AZURE_SUBSCRIPTION_ID
    ```

8. Raise an MR of `YOUR_VARIABLE_BRANCH_NAME` into `main`.
