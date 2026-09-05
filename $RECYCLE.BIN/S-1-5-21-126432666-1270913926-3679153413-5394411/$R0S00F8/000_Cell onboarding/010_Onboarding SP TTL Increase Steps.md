> Note: Before proceeding, check if the onboarding SP TTL is already set to 6 hours. If it is, skip the steps below.

## Steps to check the onboarding SP TTL

1. Run the following command to check the current TTL of the onboarding SP:

   ```bash
   vault read <cell_secret_engine_name>/roles/<onboarding_sp_name>
   ```

2. Look for the `ttl` value in the output. If it is already set to 6 hours (21600 seconds), no further action is needed. If it is set to a lower value, proceed with the update steps below.

3. Refer to the image below for reference:

   ![Vault Role Output](./040_Onboarding%20SP%20TTL.png)

# Update onboarding SP TTL to 6 hours if not already set

The onboarding service principal (SP) TTL must be set to 6 hours for successful operations.

## Steps to update TTL

> Caution: Updating the onboarding SP TTL can affect ongoing pipelines and may cause failures. Perform the update only when no pipeline is running.

**Step 1:** Delete the existing onboarding SP role from HashiCorp Vault using the command below:

```bash
vault delete <cell_secret_engine_name>/roles/<onboarding_sp_name>
```

**Step 2:** Update your `cell_variables` file based on the latest cell template.

**Step 3:** Run the account pipeline to re-create the onboarding SP. See [Trigger account pipeline](./../../../Documentation/000_Cell-Setup/000_Automation%20Prerequisites/040_TcX%20Cell%20Setup/AZURE/010_Trigger%20Admin%20pipeline/010_Trigger%20the%20pipeline.md) for instructions on triggering the account pipeline.

> After completing the steps above, start a new deployment only after both conditions are met:
> 1. The account pipeline completes successfully.
> 2. Follow the **Steps to check the onboarding SP TTL** section above and confirm that the TTL is 6 hours (21600 seconds).

