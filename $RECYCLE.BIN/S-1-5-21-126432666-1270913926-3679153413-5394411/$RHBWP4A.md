## Troubleshooting: Permission Denied When Deleting /tmp/async_jobs_tracking_file.txt

If you encounter the following error:
```
fatal: [dc_linux]: FAILED! => changed=false 
  gid: 0
  group: root
  mode: '0644'
  msg: 'unlinking failed: [Errno 1] Operation not permitted: b''/tmp/async_jobs_tracking_file.txt'' '
  owner: root
  path: /tmp/async_jobs_tracking_file.txt
  secontext: system_u:object_r:user_home_t:s0
  size: 578
  state: file
  uid: 0
```

This means the file `/tmp/async_jobs_tracking_file.txt` cannot be removed due to permission issues.

### Solution

1. Login to the EC2 instance.
2. Run following command to delete the file:
```sh
sudo rm -rf /tmp/async_jobs_tracking_file.txt
```
