## Pipeline failing in post-deploy at awbuild.sh execution

### Problem Description
 
The pipeline fails during the **post-deploy** stage at the task **[call admin utils using tcc]** while executing `awbuild.sh`.

### Root Cause
 
AWS SSM "Idle Session Timeout" default value is 20 mins in every AWS account. As awbuild.sh requires more than 20 mins in some cases, its suggested to set "Idle Session Timeout" to max 60 mins.

### Resolution

> **Note:** This is a **one-time change per AWS account**. If the idle session timeout is already set to 60 minutes or higher, no action is needed — skip the steps below.

Check the current SSM idle session timeout setting on the AWS account and update it to **60 minutes** if it is set lower.

#### Steps to Update the SSM Session Idle Timeout

1. Log in to the **AWS Management Console**.

2. In the search bar at the top, search for **Systems Manager** and open it.

   ![AWS Console – Navigate to Systems Manager](./image_450.png)

3. In the left-hand navigation pane, scroll down to **Node Management** and click on **Session Manager**.

   ![Session Manager in left navigation](./image_451.png)

4. In the Session Manager page, click the **Preferences** tab, then click **Edit**.

   - Locate the **Idle session timeout** setting.
   - If the value is less than **60 minutes**, update it to **60**.
   - Click **Save** to apply the changes.

   ![Update Idle Session Timeout to 60 minutes](./image_452.png)

5. Once the timeout is updated, **re-run the post-deploy stage** from the pipeline. The `awbuild.sh` execution will now run to completion without the session being dropped, and the pipeline should complete the `call admin utils using tcc` task successfully.

### Notes

- This issue is intermittent and depends on how long the admin utilities take to execute. Environments with more data or more complex configurations are more likely to hit the timeout.
