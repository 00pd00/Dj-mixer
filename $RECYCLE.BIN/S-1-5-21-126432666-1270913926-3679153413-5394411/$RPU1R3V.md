## Build-infra Failed: Listener Failed to Start


**Issue Description**:

Build-infra stage failed because the listener failed to start. In this particular case, the cause is disk space exhaustion on the VM, specifically the `/var` partition being full (100% used).

![Image](./image_listener_failed_to_start.png)

**How to Confirm Disk Space Exhaustion:**

1. Connect to Oracle DB1 by following the steps in [Log in to VM](../../../../020_Operations/030_Day%20N%20Operations/240_Login%20to%20CorpServer.md). Search for **OracleDB1** and connect using the SSH key.

2. Run the following command to check disk usage:

```bash
df -h
```

Check the usage for the `/var` partition. If it is at or near 100%, disk space exhaustion is the cause of the listener failure.

![Image](./image_disk_full_var.png)

**High Availability Deployments:**
If your deployment is configured for High Availability, repeat all the below steps on the OracleDB2 VM as well. 

**Note:** On OracleDB2, you might not see the `/var` partition completely utilized, but you should still perform these steps if `/var` was full on OracleDB1.

**Work Around:**

Follow the steps below to resolve the issue:

### 1. Disable rsyslog forwarding

```bash
sudo mv /etc/rsyslog.d/10-azuremonitoragent-omfwd.conf /etc/rsyslog.d/10-azuremonitoragent-omfwd.conf.disabled

sudo systemctl restart rsyslog
```

### 2. Clean existing logs

```bash
sudo truncate -s 0 /var/log/messages*
```

### 3. Remove Azure Monitor Agent

**Stop and disable service:**

```bash
sudo systemctl stop azuremonitoragent
sudo systemctl disable azuremonitoragent

sudo rpm -e azuremonitoragent
```

### 4. Cleanup systemd

```bash
sudo systemctl daemon-reload
sudo systemctl reset-failed
```

**Verify the agent is removed** (should NOT exist):

```bash
systemctl status azuremonitoragent
# Expected output:
# Unit azuremonitoragent.service could not be found.
```

### 5. Retry the job from the GitLab UI

After completing the above steps:

- Retry the job from the GitLab UI by navigating to the pipeline associated with the failed build-infra stage and clicking the retry button.

---
