## Pipeline failing at restore stage for Oracle HA tenant due to Data Guard configuration errors

**Issue Description**

If the restore pipeline fails for an Oracle Database HA tenant deployment with an error such as:

> `ORA-16810: multiple errors or warnings detected for the member`

and the Data Guard configuration status shows **errors** as in the screenshot below:

![alt text](image_001.png)

In the same pipeline run logs, search for the string **"MRP Running"**. Go to the last occurrence of this string and check its value:

- If the value is `false`, and  
- You also see a message similar to:

> `Maximum number of attempts (3) reached`

as shown in the following image:

![alt text](image_002.png)

then the managed recovery process for the standby database did not complete within the default retry limit.

---

**Workaround**

- The default retry value for recovering the standby database is **6 attempts**.  
  If you encounter the issue described above, increase this limit by modifying a variable in your **cell file** in the `tcx-pipeline-variables` repository.
- Create a feature branch in the `tcx-pipeline-variables` repository.
- In the appropriate cell file, search for the following variable. If it exists, update its value; if it does not exist, add the variable and set it according to your database load and configuration needs:

  ```yaml
  GLBL_AZ_ORACLE_STANDBY_RECOVERY_MAX_ATTEMPTS: 6
  ```

  This variable increases the number of retries allowed for the managed recovery process of the standby database.

- Commit the changes.
- Raise a Merge Request (MR) to merge the changes into the `main` branch.

![alt text](image_003.png)

- After the MR is merged, re-trigger the restore job from Ansible Tower.
