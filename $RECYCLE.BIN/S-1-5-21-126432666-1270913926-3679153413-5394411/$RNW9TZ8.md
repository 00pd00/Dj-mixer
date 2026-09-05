## Steps to Create a Schedule in Ansible Tower to retain the backups based on tier purchased by customer.

1. **Login to Ansible Tower**  
    Open your web browser and navigate to the Ansible Tower URL.  
    Login using your credentials.

2. **Select the Template to Schedule**  
    For TcX Retention Template link, please refer to [Ansible Templates Table](../../../../../Documentation/010_Tenant%20Onboarding/020_Basic%20Flow/020_Ansible%20Templates%20Table.md).

3. **Go to the Schedules Tab**  
    Once inside the template, look for the **Schedules** tab at the top.  
    Click on the **Schedules** tab to view any existing schedules.  
    ![Image](./../../image_383.png)

4. **Create a New Schedule**  
    Click on the **+ (plus)** button or **Add** button to create a new schedule.

5. **Configure the Schedule**  
    ![Image](./../../image_374.png)  

    - **Name**: Name the schedule with `<CustomerID>-<ENV>-RetentionSchedule`.  
    - **Start Date/Time**: Set the date and time for the first execution.  
    - **Repeat Frequency**: Define how often you want the job to run. Options include:  
      - None (one-time run)  
      - Daily  
      - Weekly  
      - Monthly  
      - Custom (cron-like schedule)  
    - **End Date**: Set an end date if required.  
    - **Timezone**: Confirm the correct time zone is set.  

    Fill in the fields from the Extra Variables with appropriate values:  
      - **customer_id**: Enter the customer ID.  
      - **description**: Enter the description.  
      - **environment_type**: Enter the environment type as `prd`, `uat`, etc.  
        *(Note: If the environment_type includes a postfix, such as `prd012`, treat '012' as the environment_id and provide it in the environment_id field below.)*  
      - **environment_id**: Enter the environment id (keep it empty if environment_id is not present).  
      - **stream_id**: Enter the stream ID as `dev/customer/dryrun/internal`.  
      - **mode**: `Azure Delete`.  
      - **region**: Enter the environment's Azure region, e.g., `eastus`.
      - **CellId**: Enter the CellId.
        Example: `CellId: azm-eaus-tcx-preprod47-dev-008`.  
      - **PipelineCloud**: Enter the PipelineCloud.  
        Example: `PipelineCloud: '0ef62f60'`.  
      - **orchestrator_version**: [Version of the tcx-backup-core](https://gitlab.industrysoftware.automation.siemens.com/tcx-deploy/tcx-backup-core/-/blob/main/pyproject.toml?ref_type=heads#L3). This is an optional parameter.
        Example: `orchestrator_version: 1.7.0`.  
      - **tier**: Enter the tier based on the tenant, e.g., `std`, `silver`, or `gold`. *(For reference only)*  
        *(Note: For monthly retention, we retain data from the last day of each month, ensuring that a snapshot of month-end data is preserved.)* 
        *(Note: Please refer below mentioned table for tier information.)* 
        | Scheduled Backup     | Standard     | Silver        | Gold          |
        |----------------------|--------------|---------------|---------------|
        | Frequency            | Daily        | Every 12 hours| Every 2 hours |
        | Short Term Retention | 14 days      | 30 days       | 30 days       |
        | Monthly LTR          | 3 months     | 6 months      | 12 months     |
      - **pipeline_variable_version**: Enter the pipeline variable version. If this field is not present, then add it manually.  
        Example: `pipeline_variable_version: 3.0.4`.  
      - **Example of ansible inputs for azure scheduled backup retention.**
      ![Image](./../../image_384.png)  

6. **Click on Prompt**  
    Click on **Prompt**

    A survey will appear. Fill in the survey with appropriate values:  
    - **GITLAB PAT**: Personal Access Token of GitLab.  
    - **VAULT TOKEN**: *(For prod tower only)*  
      *(Note: Do not use temporary credentials for scheduling the retention.)*
      *(Note: If any credentials have expired, please contact the appropriate authorities to obtain new credentials. Once you have received the updated credentials, replace the old credentials by editing the same scheduled job.)*

    Click on **Next** and then **Confirm**.  
    *Note: It will show the values as Null. But once you confirm it, it will be stored.*  
    ![Image](./../../image_376.png)

7. **Save the Schedule**  
    Once all settings are configured, click **Save**.