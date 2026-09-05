# Manage User Operation — How-To Guide

This guide walks through the end-to-end steps required to run the **Bulk Users Management Operation** against a TCX tenant on either AWS or Azure.It is used to either create bulk users or deactivate bulk users

---

## Overview of the Flow

```
Step 1               Step 2                  Step 3                Step 4
──────────           ──────────────────────  ──────────────────    ───────────────────
Prepare              Upload users.csv to     Set the               Trigger the
users.csv            cloud storage &         template variables    template run
                     store SAM Creds
``` 



---

## Step 1 — Prepare the `users.csv` File

Create a CSV file named exactly **`users.csv`** on your local machine.

### Format

The file must have a **header row** followed by one row per user. Column order is fixed and uses the following field names:

| `user_person_name` | `user_name` | `user_os_user` | `user_email` | `user_license_level` | `user_group` | `user_role` | `user_license_server`
|--------------------|-------------|----------------|-------------|----------------------|------------|-----------|-----------
| John Doe           | jdoe        | jdoe           | jdoe@example.com | author           | dba        | DBA       | Default Local License Server

### Example `users.csv` (header + one row)

![users.csv example screenshot](./images/userscsv_format.png)


- Empty or malformed rows are **skipped and logged** — the run **fails** if no valid rows remain after filtering.
- If `user_license_level` is not provided, it defaults to **`author`**.
- If `user_license_server` is not provided, it defaults to **`Default Local License Server`**. To use a different license server, first configure it in the Teamcenter Admin Center before running this operation and specify the name given to that server in this csv file under user_license_server coloumn.
Link to configure admin license server : [Configure Admin License Server](https://ctcx.code.siemens.io/cookbook/docs/2506/Documentation/Tenant%20Onboarding/Post%20Deploy%20Operations/Create%20Admin%20License%20Server/)


---

## Step 2 — Upload `users.csv` to Cloud Storage & store SAM creds

Upload the file to the tenant's common storage bucket/container before triggering the pipeline.

### AWS — Upload to S3

1. Go to AWS Console
2. In S3 , search for the tenant for which you want to manage users using tenant id and then upload the file to tenant common bucket (ex common bucket name: `tcx-tenantbucket-us-east-1-{{tenant_id}}-{{aws_account_id}}`). Refer the below image for more information.
3. Upload the above created users.csv in this bucket

**Via AWS Console:**

![Common Bucket UI screenshot](./images/common_bucket.png)

---

### Azure — Upload to Blob Storage

1. Login to the subscription of the tenant on Azure
2. In Azure go in Azure Blob Storage
3. Search for common tenant bucket inside blob(ex common bucket name: `tcx-{{tenant_id}}-common-container`)
4. Upload the above created users.csv in this bucket

![Common Bucket UI screenshot](./images/common_bucket_azure.png)

---

### Store SAM credentials in Vault (root namespace)

After uploading `users.csv`, store the CAPs user's SAM credentials in HashiCorp Vault so the pipeline can read them at runtime. The credentials must be placed under the root namespace path `secret/shared/operator-eca/<ECA_ID>` where `<ECA_ID>` is the ECA identifier for the tenant.

Step-by-step:

1. Determine the tenant's ECA ID

    - Open the tenant repository and locate the tenant's `tenant.yml` .
    - Inspect the file and note the value used as the tenant's ECA identifier (the file contain a field named `GLBL_ENT_CLOUD_ACCT_ID`). Use the exact identifier value as `<ECA_ID>` below.


2. Create/update the Vault path and store the SAM credentials

    Replace the placeholders with the real values for the CAPs user in the `secret/shared/operator-eca/${ECA_ID}` folder in the root namespace.:

    ```bash
    SAM_ACCESS_KEY_ID="<SAM_ACCESS_KEY_ID>" \
    SAM_ACCOUNT_ID="<SAM_ACCOUNT_ID>" \
    SAM_SECRET_ACCESS_KEY="<SAM_SECRET_ACCESS_KEY>"
    ```

    - This writes the three keys under `secret/shared/operator-eca/${ECA_ID}` in the root namespace.


    - Confirm the three keys appear and that their values are correct.


## Step 3 — Set Template Variables
## Ansible template

Use this Ansible template for this operation:

[Dev.TcX.Operations.RunCommands-5.0.0-Manage_User](https://ansible-dev.cloud.teamcenter.com/#/templates/job_template/6924/details)

Open the pipeline template and set the required variables before running.

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `CustomerID` | The tenant identifier | `td001` |
| `TcxCliRequirement` | Minimum TcX CLI version or requirement string used by the template | `6.0.4` |
| `STREAM_ID` | Stream identifier | `dev` |
| `Mode` | Operation mode: `create_user` or `deactivate_user` — determines whether users are created or deactivated | `create_user` |
| `target_environments` | Optional comma-separated list of target environments (if omitted the operation runs across all tenant environments) | `prd,dev` |
| `GITLAB_PAT` | GitLab Personal Access Token used by the pipeline (secret) | (secret) |
| `VAULT_TOKEN` | Vault token or reference used to access HashiCorp Vault (secret) — enter in pipeline UI or use vault integration | (secret) |
| `entitlement_enabled` | Whether SAM entitlement persists the SAM user GUID in the Teamcenter UI (`yes`/`no`) — see note below | `yes` |

Notes:

- `Mode` accepts exactly two values: `create_user` (create/provision users) and `deactivate_user` (bulk-deactivate users).
- `target_environments` is optional. If provided (comma-separated), the operation will run only against the listed environments. If omitted, the operation runs across all environments associated with the tenant.
- `entitlement_enabled`: when set to `no`, the SAM user GUID will **not** be persisted in the Teamcenter AWS UI; when `yes` it will be persisted (affects licensing/SAM behavior).

### Pipeline Template

![Template screenshot](./images/template_screenshot.png)

---

## Step 4 — Launch the Template

After you set the template variables (Step 3) launch the pipeline template. Launching the template will create and start multiple pipelines in parallel — one pipeline per target environment — which perform the bulk user management work for their respective environment.

- If you provided `target_environments`, a pipeline is started only for each environment listed.
- If `target_environments` was omitted, pipelines are started across all environments associated with the tenant.
- Each pipeline runs independently: failures or retries in one environment do not affect other pipelines.

You can monitor each pipeline run in the `tcx-pipeline-tenant` project's pipelines view; the individual pipeline logs show download, validation and Teamcenter API calls per user.

### Verify the Operation in GitLab

Once the Ansible template has been launched successfully:

1. Navigate to the **`tcx-pipeline-tenant`** repository on GitLab.
2. Open the **Pipelines** view and locate the pipeline(s) triggered by this run.
3. Confirm the pipeline status shows **Success**.
4. Open the pipeline logs and search for the `addusersasgroupmembers` step.
   - If the response status code is **`200`**, the operation completed successfully and users have been created/deactivated as expected.
5. You can now verify the users in the Teamcenter UI.

### Expected Output

A successful aggregate run will show pipeline-level success for each environment. Individual pipeline logs contain the detailed per-user results.


**Bulk User Creation**

![Bulk User Creation screenshot](./images/Bulk_User_Creation.png)

<br/>

**Bulk User Deactivation**

![Bulk User Deactivation screenshot](./images/User_Deactivation.png)

> As the user is deactivated, the status of the user is changed to **1**.

<br/>

**User Created with Admin License Server**

![Creation Of User in Default Admin License Server](./images/admin_license_server.png)

> Check the **License Server** field in the AWC UI to confirm the correct license server is assigned.

<br/>

**SAM User GUID Not Persisted**

![SAM USER guid not persisted](./images/Userguid_not_persist.png)

> This image confirms that the SAM GUID is not persisted across the Teamcenter environment.

<br/>

Check the `tcx-pipeline-tenant` repo pipelines page to see the parallel runs and open each run to view its logs and per-user status messages.

---

## Troubleshooting

| Symptom | Likely Cause | Fix |
|---------|-------------|-----|
| `csv file not found after download` | File not uploaded to correct bucket/container | Re-upload `users.csv` to the correct path (Step 2) |
| `no valid rows remain` | All rows in CSV are malformed or empty | Check CSV format — ensure `user_name` and `email` are populated |
| `assertion failed: TENANT_ID not set` | Pipeline variable missing | Set all required variables (Step 3) |
