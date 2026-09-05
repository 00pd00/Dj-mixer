## Steps to Create a Schedule in Ansible Tower

1. **Login to Ansible Tower**  
    Open your web browser and navigate to the Ansible Tower URL.  
    Login using your credentials.

2. **Select the Template to Schedule**  
    For TcX Backup Template link, please refer to [Ansible Templates Table](../../../../010_Tenant%20Onboarding/020_Basic%20Flow/020_Ansible%20Templates%20Table.md).

3. **Go to the Schedules Tab**  
    Once inside the template, look for the **Schedules** tab at the top.  
    Click on the **Schedules** tab to view any existing schedules.  
    ![Image](./../../image_383.png)

4. **Create a New Schedule**  
    Click on the **+ (plus)** button or **Add** button to create a new schedule.

5. **Configure the Schedule**  
    - **Name**: Name the schedule with `<CustomerID>-<ENV>-BackupSchedule`.  
    - **Start Date/Time**: Set the date and time for the first execution.  
    - **Repeat Frequency**: Define how often you want the job to run. Options include:  
      - None (one-time run)  
      - Daily  
      - Weekly  
      - Monthly  
      - Configure Custom (cron-like schedule)  - set the frequency based on the tier:  
        - **Standard (std)**: Daily  
        - **Silver**: Every 12 hours  
        - **Gold**: Every 2 hours  
    - **End Date**: Set an end date if required.  
    - **Timezone**: Confirm the correct time zone is set.  

    Fill in the fields from the Extra Variables with appropriate values:  
    - **customer_id**: Enter the customer ID.  
    - **description**: Enter the description.  
    - **environment_type**: Enter the environment type as `prd`, `uat`, etc.  
      *(Note: If the environment_type includes a postfix, such as `prd012`, treat '012' as the environment_id and provide it in the environment_id field below.)*  
    - **environment_id**: Enter the environment id (keep it empty if environment_id is not present).  
    - **stream_id**: Enter the stream ID as `dev/customer/dryrun/internal`.  
    - **mode**: `Azure Backup`.  
    - **region**: Enter the environment's Azure region, e.g., `eastus`, `japaneast`,`germanywestcentral` etc. 
     - **CellId**: Enter the CellId.
        Example: `CellId: azm-eaus-tcx-preprod47-dev-008`.  
      - **PipelineCloud**: Enter the PipelineCloud.  
        Example: `PipelineCloud: '0ef62f60'`.  
      - **orchestrator_version**: [Version of the tcx-backup-core](https://gitlab.industrysoftware.automation.siemens.com/tcx-deploy/tcx-backup-core/-/blob/main/pyproject.toml?ref_type=heads#L3). This is an optional parameter.
        Example: `orchestrator_version: 1.7.0`.
    - **tier**: Enter the tier based on the tenant, e.g., `std`, `silver`, or `gold`. *(For reference only)*  
      *(Note: The backup tier is not highly relevant for backup operations, but it becomes important when configuring retention settings. However, it is recommended to enter the correct tier for the tenant.)*  
    - **pipeline_variable_version**: Enter the pipeline variable version. If this field is not present, then add it manually.  
      Example: `pipeline_variable_version: 3.0.4`.
    ![Image](./../../image_385.png)
    *(Note: Please ignore/keep it default fields not mentioned in above snapshot.)*

6. **Click on Prompt**  
  - **Credentials**: Keep all selections as it is and Click **Next** to proceed.  
  - **Other Prompts**: Fill in the fields from the Extra Variables with the appropriate values.  
  - **Survey**: Complete the survey with the required values:  
    - **GITLAB PAT**: Personal Access Token of GitLab.  
    - **VAULT TOKEN**: *(For prod tower only)*  
        *(Note: Do not use temporary credentials for scheduling the backups.)*
        *(Note: If any credentials have expired, please contact the appropriate authorities to obtain new credentials. Once you have received the updated credentials, replace the old credentials by editing the same scheduled job.)*

    Click on **Next** and then **Confirm**.  
    *Note: It will show the values as Null. But once you confirm it, it will be stored.*  
    ![Image](./../../image_376.png)

7. **Save the Schedule**  
    Once all settings are configured, click **Save**.

8. **Validate azure backups on azure portal**: [Validate Azure Backups](./../../060_Validate%20Azure%20Backup.md) 
