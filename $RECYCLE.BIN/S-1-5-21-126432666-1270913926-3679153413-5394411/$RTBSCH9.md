**Pipeline fails with could not create persisted app**  

**Issue Description**:

Whenever cell creation or tenant pipeline fails with below errors:

![Image](image_436.png)

OR

![Image](image_437.png)

Switch to pre-created flow of the service principal.

**Work Around:**  

1. Checkout [tcx-pipeline-variables](https://gitlab.industrysoftware.automation.siemens.com/tcx-deploy/tcx-pipeline-variables/-/tree/main/variables/cell) to a new branch:

    ```bash
    git checkout -b fix/pre-created-sp
    ```

2. Add/Update variable `GLBL_AZ_ENGINE_ROLE_POLICY: "pre-created"` in your [cell file](https://gitlab.industrysoftware.automation.siemens.com/tcx-deploy/tcx-pipeline-variables/-/tree/main/variables/cell).

    Note: It assumes that the root-sp name is `tcx-cell-<first 3 chars of your cell subscription>-root-sp` and the root-sp credentials are saved under `cell/<cell-id>/creds/<root-sp-name>` as specified in [Configure Service Principals for the pipeline](../../../000_Cell-Setup/000_Automation%20Prerequisites/040_TcX%20Cell%20Setup/AZURE/040_Setup%20Cell%20Subscription/060_Configure%20Service%20Principals%20for%20the%20pipeline.md#1_create_hcv_root_sp). If the same is not true, the root-sp name and the path can be overridden with below variables:

    * GLBL_AZ_ROOT_SP_NAME
    * GLBL_AZ_ROOT_SP_CRED_PATH

3. Re-run the pipeline by referencing the above branch for VARIABLE_BRANCH_NAME/PipelineVariableVersion input parameter.

4. Once the pipeline is succssful, raise an MR to get it merged to main.

