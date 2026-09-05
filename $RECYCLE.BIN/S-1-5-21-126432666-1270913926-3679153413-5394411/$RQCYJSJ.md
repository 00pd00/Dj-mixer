# Time Sync Issue on Azure RHEL Virtual Machines

## 1. Description

This guide covers resolving NTP/chrony time synchronisation issues on Azure RHEL Virtual Machines.

**When to Use:**
- The VM clock is drifting or not synchronised to the expected time source.
- `chronyc tracking` shows `System clock synchronized: No` or an unexpected `Leap status`.

---

## 2. Prerequisites

### 2.1 Connect to the VMs

Connect to the following VMs by following the steps in [Log in to VM](../../../020_Operations/030_Day%20N%20Operations/240_Login%20to%20CorpServer.md) and using the SSH key.

| Deployment type | VMs to connect |
|---|---|
| **Non-HA** | CorpServer, Oracle DB1 |
| **HA** | CorpServer, Oracle DB1, Oracle DB2 |

Perform all steps in Sections 3–5 on **each** VM.

---

## 3. Verify Current Time Sync Status

Run the following commands to check the current synchronisation state:

```bash
chronyc tracking
timedatectl
```

![chronyc tracking and timedatectl output](./image_time_sync_verify.png)

> **Expected:** `Leap status: Normal` in `chronyc tracking` and `System clock synchronized: yes` in `timedatectl`.

If both commands show the expected output, the VM is correctly synchronised and **no further action is required**.

If either value differs from the expected output above, proceed to Section 4.

---

## 4. Fix Time Synchronisation

### 4.1 Back up the current chrony configuration

```bash
sudo cp /etc/chrony.conf /etc/chrony.conf.bak.$(date +%Y%m%d_%H%M%S)
```

### 4.2 Add the Azure Hyper-V hardware clock as a reference

```bash
sudo sed -i '1i refclock PHC /dev/ptp_hyperv poll 3 dpoll -2' /etc/chrony.conf
```

### 4.3 Restart the chronyd service

```bash
sudo systemctl restart chronyd
```

### 4.4 Wait for synchronisation to settle

```bash
sleep 15
```

---

## 5. Verify the Fix

Run the following commands to confirm synchronisation is restored:

```bash
chronyc tracking
timedatectl
```

![chronyc tracking and timedatectl output](./image_time_sync_verify.png)
