# Backup Operation Failed with Timeout Error

## Issue Description

The backup operation fails after approximately **5 hours** of execution with a timeout error. This occurs because the backup job exceeds the configured timeout limit in the code.

**Error logs:**

```
[ERROR] Timeout exceeded
[ERROR] Time-out occurred, state of backup/restore job ids - xxxxxxxxxxxxxxxxxxxxxxxxxxxx are unknown.
...
[ERROR] Error while running backup operation: An error occurred (ResourceNotFoundException) when calling the DescribeRecoveryPoint operation: Cannot find recovery point
[ERROR] Error while running backup operation...
[INFO] Recovery points cleanup started...
```

**Source:** Ansible Automation Platform | 144804 - TcX.Operations.Backup-5.0.0

---

## Root Cause

The backup automation code has a hardcoded timeout of **5 hours**. For larger environments or environments with a significant amount of data, the backup job may not complete within this window, causing the operation to time out. When this happens, the job reaches an unknown state and the recovery point may not be found because the backup did not finish successfully.

---

## Resolution

**Re-run the backup operation.** In most cases, the backup completes successfully on a subsequent attempt.

1. Navigate to the Ansible Tower and locate the failed backup job.
2. Review the job output to confirm the failure is due to the timeout error (look for `Timeout exceeded` or `Time-out occurred` in the logs).
3. Re-launch the same backup job with the same survey parameters.
4. Monitor the job to ensure it completes successfully.

---

## Additional Notes

- This timeout applies to both **on-demand** and **scheduled** backup operations.
