# Oracle Data Guard Switchover & Switchback

## 1. Description

Steps to perform an Oracle Data Guard switchover and switchback using the Data Guard Broker (`dgmgrl`).

**When to Use:**
- **Switchover**: Performed during planned maintenance activities when you need to switch the primary database role to the standby database. This allows maintenance work to be performed on the original primary database without impacting customer environments.
- **Switchback**: After completing the planned maintenance, switch back to original primary configuration.


## 2. Prerequisites

> Note: All switchover and switchback commands are executed from one Oracle DB VM using `dgmgrl`. Observers are not used to run these commands.

---
### 2.1 Fetch the database password

i. Log in to the vault using the tenant namespace.  
  **Vault URL:** (Prod) "https://vault.xcr.gblsvcs01eu.prod.eu-central-1.kaas.sws.siemens.com" / (Non-prod) "https://vaultent.emea1.co.sws.siemens.com/"  
  Provide the tenant-specific namespace during login, e.g., `<tcx-development_ns/storm_playground/release1/prd>`.  

ii. Navigate to the dashboard of the tenant-specific namespace.  

iii. Click on `secret/` and navigate to the path: `tcx/teamcenter/rds`.  
  a. Copy the `dbpassword` from the vault; this password is required to connect as `SYS` when running Data Guard commands.

![Image](./image_447.png)


### 2.2 Connect to Oracle VM

  - Connect to the Oracle Server by following the steps in [Log in to VM](./240_Login%20to%20CorpServer.md). Instead of searching for CorpServer, search for **OracleDB1** and connect using the SSH key.


### 2.3 Switch to Oracle user and check Data Guard status

Run the following commands

```bash
sudo su - oracle
dgmgrl sys/<password>@TCXDB
SHOW CONFIGURATION;
```

Verify configuration status is `SUCCESS`

![alt text](./image_453.png)
 

### 2.4 Identify current Primary and Standby

- Refer to the `SHOW CONFIGURATION` output above and note which member is listed as "Primary database" and "Secondary database".
- Map the member name to the VM name:
  - `TCXDB` → `tcx-tenant-<tenant-id>-prd-OracleDB1-vm`
  - `TCXDB2` → `tcx-tenant-<tenant-id>-prd-OracleDB2-vm`

### 2.5 Disable Fast-Start Failover (FSFO)

```sql
DISABLE FAST_START FAILOVER;

SHOW FAST_START FAILOVER;
```

Expected:

```
Fast-Start Failover: DISABLED
```

Check the `SHOW FAST_START FAILOVER` output for the `Active Target:` line — it shows the current FSFO active target (for example `Active Target: TCXDB2`) or `(none)` when disabled. Ensure `Active Target:` is `(none)` before proceeding with the switchover.

![alt text](./image_448.png)
---

## 3. Switchover (Primary → Standby)

### 3.1 Validate Switchover Readiness

```sql
VALIDATE DATABASE TCXDB2;
```

Expected:

```
Ready for Switchover: Yes
```
![alt text](./image_449.png)


### 3.2 Execute Switchover

```sql
SWITCHOVER TO TCXDB2;
```

![alt text](./image_450.png)

---

### 3.3 Verify Switchover Success

#### 3.3.1 Check Configuration

```sql
SHOW CONFIGURATION;
```
Expected:

```
TCXDB2 - Primary database
TCXDB - Physical standby database
Configuration Status: SUCCESS
```

![alt text](./image_451.png)

---

## 4. Switchback

### 4.1 Fetch the database password

i. Log in to the vault using the tenant namespace.  
  **Vault URL:** (Prod) "https://vault.xcr.gblsvcs01eu.prod.eu-central-1.kaas.sws.siemens.com" / (Non-prod) "https://vaultent.emea1.co.sws.siemens.com/"  
  Provide the tenant-specific namespace during login, e.g., `<tcx-development_ns/storm_playground/release1/prd>`.  

ii. Navigate to the dashboard of the tenant-specific namespace.  

iii. Click on `secret/` and navigate to the path: `tcx/teamcenter/rds`.  
  a. Copy the `dbpassword` from the vault; this password is required to connect as `SYS` when running Data Guard commands.
![Image](./image_447.png)


### 4.2 Connect to Oracle VM

  - Connect to the Oracle Server by following the steps in [Log in to VM](./240_Login%20to%20CorpServer.md). Instead of searching for CorpServer, search for **OracleDB1** and connect using the SSH key.


### 4.3 Switch to Oracle and check Data Guard status

```bash
sudo su - oracle
dgmgrl sys/<password>@TCXDB
SHOW CONFIGURATION;
```
Verify configuration status is `SUCCESS`

![alt text](./image_454.png)

#### 4.4.1 Validate Readiness

```sql
VALIDATE DATABASE TCXDB;
```

Expected:

```
Ready for Switchover: Yes
```
![alt text](./image_459.png)

#### 4.4.2 Execute Switchback

```sql
SWITCHOVER TO TCXDB;
```

![alt text](./image_455.png)
---

### 4.4 Verify Switchback Success

#### 4.4.1 Check Configuration

```sql
SHOW CONFIGURATION;
```

Expected:

```
TCXDB - Primary database
TCXDB2 - Physical standby database
Configuration Status: SUCCESS
```

![alt text](./image_456.png)


#### 4.4.2 Final Role Verification

```sql
SHOW DATABASE TCXDB2;
SHOW DATABASE TCXDB;
```

![alt text](./image_457.png)

---

### 4.4.3 Re-enable Fast-Start Failover (FSFO)

```sql
ENABLE FAST_START FAILOVER;

SHOW FAST_START FAILOVER;
```

Expected:

```
Fast-Start Failover: ENABLED
```

![alt text](./image_459.png)

---



