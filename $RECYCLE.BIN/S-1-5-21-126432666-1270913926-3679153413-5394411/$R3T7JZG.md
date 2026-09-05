

# Copy Kits Failing with Permission Denied

## Problem Description

During Ansible playbook execution, the task fails with a permission denied error when attempting to delete the async jobs tracking file on the DC Linux server.

## Error Message

```
fatal: [dc_linux]: FAILED! => changed=false
gid: 0
group: root
mode: '0644'
msg: 'unlinking failed: [Errno 1] Operation not permitted: b''/tmp/async_jobs_tracking_file.txt'' '
owner: root
path: /tmp/async_jobs_tracking_file.txt
secontext: system_u:object_r:user_home_t:s0
size: 2422
state: file
```

## Workaround

To resolve this issue, manually remove the problematic file from the corp server:

1. Connect to the Corp Server EC2 Instance
2. Remove the Tracking File
   ```bash
   sudo su - 
   rm -rf /tmp/async_jobs_tracking_file.txt
   ```
3. Retry the failed stage 


## Additional Notes

- The file `/tmp/async_jobs_tracking_file.txt` is used by Ansible to track asynchronous job execution
- It is safe to delete this file as it will be recreated automatically

