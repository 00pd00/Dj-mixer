# Oracle Data Guard Manual Failover

## 1. Description

Steps to manually fail over to the standby database when the primary database is down and automatic failover did not trigger.

**Estimated Duration:** 10-15 minutes

**When to Use:**
- **Manual Failover**: When Oracle DB1 (primary) is stopped or unavailable,this procedure manually promotes the standby database (Oracle DB2) to primary and later sets up the original primary (Oracle DB1) as the new standby.

> **Note:** This is for unplanned outages where automatic failover failed. For planned maintenance, use [Oracle Data Guard Switchover & Switchback](../../../020_Operations/030_Day%20N%20Operations/280_Oracle_DataGuard_Switchover_Switchback.md).

---

## 2. Prerequisites

### 2.1 Fetch the database password

1. Log in to the vault using the tenant namespace.  
   **Vault URL:** (Prod) "https://vault.xcr.gblsvcs01eu.prod.eu-central-1.kaas.sws.siemens.com" / (Non-prod) "https://vaultent.emea1.co.sws.siemens.com/"  
   Provide the tenant-specific namespace during login, e.g., `<tcx-development_ns/storm_playground/release1/prd>`.  

2. Navigate to the dashboard of the tenant-specific namespace.  

3. Click on `secret/` and navigate to the path: `tcx/teamcenter/rds`.
   3.1 Copy the `dbpassword` from the vault; this password is required to connect as `SYS` when running Data Guard commands.

![Image](./image_008.png)

### 2.2 Connect to Oracle DB2 VM (Standby)

- Connect to Oracle DB2 by following the steps in [Log in to VM](../../../020_Operations/030_Day%20N%20Operations/240_Login%20to%20CorpServer.md). Search for **OracleDB2** and connect using the SSH key.

---

## 3. Manual Failover to Standby (Promote TCXDB2)

### 3.1 Switch to Oracle user and check Data Guard status

```bash
sudo su - oracle
dgmgrl sys/<password>@TCXDB2
SHOW CONFIGURATION;
```

Expected output will show:
- TCXDB - Primary database (Error: ORA-12543 - destination host unreachable) or Error: ORA-1034: ORACLE not available or Error: ORA-12541: TNS:no listener
- TCXDB2 - (*) Physical standby database
- Configuration Status: ERROR

![alt text](./image_003.png)

### 3.2 Validate Failover Readiness

```sql
VALIDATE DATABASE TCXDB2;
```

Expected:

```
Ready for Failover: Yes
```

![alt text](./image_002.png)


### 3.3 Execute Manual Failover

Perform a failover to promote TCXDB2 to primary:

```sql
FAILOVER TO TCXDB2;
```

![alt text](./image_004.png)

This command promotes TCXDB2 to the primary role immediately.

### 3.4 Verify Failover Success

```sql
SHOW CONFIGURATION;
```

Expected:

```
TCXDB2 - Primary database
TCXDB - Physical standby database (DISABLED or DISCONNECTED)
```

![alt text](./image_005.png)

---

## 4. Reinstate Oracle DB1 as Standby

Once Oracle DB1 VM is back online and healthy, reinstate it as the standby database.

### 4.1 Start Oracle DB1 Database

1. Navigate to Azure Portal
2. Go to resource group: `tcx-tenant-<tenant-id>-prd-rg`
3. Locate `tcx-tenant-<tenant-id>-prd-OracleDB1-vm`

4. Connect to Oracle DB1 VM by following the steps in [Log in to VM](../../../020_Operations/030_Day%20N%20Operations/240_Login%20to%20CorpServer.md). Search for **OracleDB1** and connect using the SSH key.

5. Switch to Oracle user and verify database role:

   ```bash
   sudo su - oracle
   sqlplus / as sysdba
   SELECT database_role FROM v$database;
   ```

   **Expected output:**
   
   ```
   DATABASE_ROLE
   ----------------
   PHYSICAL STANDBY
   ```

   **If you get error:**
   
   ```
   ERROR at line 1:
   ORA-01034: ORACLE not available
   Process ID: 0
   Session ID: 0 Serial number: 0
   ```
   
   This means the database is not running. Continue to step 6 to start it.

6. Start the database (only if you received ORA-01034 error in step 5):

   ```sql
   STARTUP;
   ```

   ![alt text](./image_009.png)

   **Expected output:**

   ```
   ORACLE instance started.

   Total System Global Area 2.3622E+10 bytes
   Fixed Size                8909392 bytes
   Variable Size          2684354560 bytes
   Database Buffers       2.0871E+10 bytes
   Redo Buffers             58195968 bytes
   Database mounted.
   ORA-16649: possible failover to another database prevents this database from
   being opened
   ```

   > **Note:** The ORA-16649 error is expected after a failover. The database will automatically synchronize as a standby.

   ```sql
   EXIT;
   ```

### 4.2 Connect to Oracle DB2 VM (Current Primary)

- Connect to Oracle DB2 by following the steps in [Log in to VM](../../../020_Operations/030_Day%20N%20Operations/240_Login%20to%20CorpServer.md). Search for **OracleDB2** and connect using the SSH key.

### 4.3 Check Data Guard Status

```bash
sudo su - oracle
dgmgrl sys/<password>@TCXDB2
SHOW CONFIGURATION;
```

Check the status of TCXDB. In some cases, once VM1 is back online, TCXDB may automatically reinstate itself. 

- If TCXDB shows as **Physical standby database** with status **SUCCESS**, it has automatically reinstated - proceed to section 4.5.
- If TCXDB shows as **DISABLED** state, continue to section 4.4 to manually reinstate it.

![alt text](./image_006.png)

### 4.4 Reinstate the Old Primary as Standby (If Required)

> **Note:** Only run this command if TCXDB is in DISABLED state and has not automatically reinstated.

```sql
REINSTATE DATABASE TCXDB;
```

### 4.5 Verify Reinstatement Success

```sql
SHOW CONFIGURATION;
```

Expected:

```
TCXDB2 - Primary database
TCXDB - Physical standby database
Configuration Status: SUCCESS
```

![alt text](./image_007.png)

---

## 5. Switching Back to Original Configuration

Once TCXDB (Oracle DB1) is up and running, then switchback to TCXDB as the primary database by following the switchback procedure documented in [Oracle Data Guard Switchover & Switchback - Section 4: Switchback to TCXDB](../../../020_Operations/030_Day%20N%20Operations/280_Oracle_DataGuard_Switchover_Switchback.md#4-switchback-to-tcxdb).

---
