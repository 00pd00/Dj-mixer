#### Run Pipeline in Maintenance Mode to Apply Password Change

1. To apply the password changes to the tenant deployment, the TcX deploy automation pipeline must be run in operations mode.
2. Refer to [Ansible Templates Table](../../../../Tenant%20Onboarding/Basic%20Flow/Ansible%20Templates%20Table) for the operation run command (Password Maintenance) template link.
3. Launch the Ansible template within Ansible Tower.
4. Click the **Launch** button.
    ![Image](./image_368.png)
5. Add the following input parameters and click **Next** to proceed:
    - **CustomerID:** `<CustomerID>`
    - **Description:** `Ctcx tc password update`
    - **CellId:** `<CellId>`
    - **Environment:** `<Environment>`
    - **PipelineStage:** `operations`
    - **PipelineCloud:** `<PipelineCloud>`
    - **OperationsAction:** `update_password_tc`
    - **StreamId:** `dev`
    - **PipelineVersion:** `<PipelineVersion>`
    - **TcXVersion:** `<TCXVersion>`
    - **TcxCliRequirement:** `<TCXCLIRequiredment>`
    - **PipelineVariableVersion:** `<PipelineVariableVersion>`
    - Add GitLab PAT token and Vault token in the survey input.
6. Review the summary page to ensure all settings and survey responses are correct.
7. Click **Launch** to start the job template.
8. Ensure the operations stage is successfully completed by verifying it on GitLab.
9. A new `deployUtil` job will start automatically. Ensure it is completed successfully.
10. Verify the changes in ArgoCD.
