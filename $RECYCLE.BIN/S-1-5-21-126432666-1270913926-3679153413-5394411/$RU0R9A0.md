## Steps to Create a Schedule in Ansible Tower to retain the backups based on tier purchased by customer.

1. **Login to Ansible Tower**  
    Open your web browser and navigate to the Ansible Tower URL.  
    Login using your credentials.

2. **Select the Template to Schedule**  
    For TcX Retention Template link, please refer to [Ansible Templates Table](../../../../010_Tenant%20Onboarding/020_Basic%20Flow/020_Ansible%20Templates%20Table.md).

3. **Go to the Schedules Tab**  
    Once inside the template, look for the **Schedules** tab at the top.  
    Click on the **Schedules** tab to view any existing schedules.  
    ![Image](./../../image_373.png)

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
    - **mode**: `Delete`.  
    - **region**: Enter the environment's AWS region, e.g., `us-east-1`, `eu-central-1`, etc.  
    - **tier**: Enter the tier based on the tenant, e.g., `std`, `silver`, or `gold`. *(For reference only)*  
      *(Note: For monthly retention, we retain data from the last day of each month, ensuring that a snapshot of month-end data is preserved.)* 
      *(Note: Please refer below mentioned table for tier information.)* 
      ![Image](./../../image_382.png)
    - **pipeline_variable_version**: Enter the pipeline variable version. If this field is not present, then add it manually.  
      Example: `"pipeline_variable_version: 3.0.4"` without quotes.  
    ![Image](./../../image_375.png)
    *(Note: Please ignore/keep it default fields not mentioned in above snapshot.)*

6. **Click on Prompt**  
    Click on **Prompt** and follow the steps described in section **13.2.2** (point no 4 & 5).  

    A survey will appear. Fill in the survey with appropriate values:  
    - **AWS_ACCESS_KEY_ID**: AWS access key of the account where ENV is present.  
    - **AWS_SECRET_ACCESS_KEY**: AWS secret access key of the account where ENV is present.  
    - **AWS_SESSION_TOKEN**: *(Optional)* Session Token of AWS - Provide only when using ad hock retention.  
    - **GITLAB PAT**: Personal Access Token of GitLab.  
    - **VAULT TOKEN**: *(For prod tower only)*  
      *(Note: Do not use temporary credentials for scheduling the retention.)*
      *(Note: If any credentials have expired, please contact the appropriate authorities to obtain new credentials. Once you have received the updated credentials, replace the old credentials by editing the same scheduled job.)*

    *Note: These AWS credentials should be tenant account specific, where the customer resides. These credentials should have at least read-level access to all the AWS services we deploy. Otherwise, copy the permissions of `<env_type>-<CustomerID>-Role` and attach these permissions to the user that you wish to generate credentials for. Use these credentials to pass them from Ansible Tower.*  

    Click on **Next** and then **Confirm**.  
    *Note: It will show the values as Null. But once you confirm it, it will be stored.*  
    ![Image](./../../image_376.png)

7. **Save the Schedule**  
    Once all settings are configured, click **Save**.