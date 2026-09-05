# Increase Oracle Database DBUSER_INDX Tablespace Size (Optional)

**Note:** This procedure is applicable only for Oracle databases.

## Steps to Increase Tablespace Size

Follow the steps below to download and install the `sqlplus` client, which is required for managing the Oracle database.

1. Download the SQL*Plus Client

    Use the following commands to download the SQL*Plus client on the corporate server:
    ```bash
    curl https://download.oracle.com/otn_software/linux/instantclient/1925000/oracle-instantclient19.25-basic-19.25.0.0.0-1.x86_64.rpm -o /tmp/oracle-instantclient19.25-basic-19.25.0.0.0-1.x86_64.rpm
    curl https://download.oracle.com/otn_software/linux/instantclient/1925000/oracle-instantclient19.25-sqlplus-19.25.0.0.0-1.x86_64.rpm -o /tmp/oracle-instantclient19.25-sqlplus-19.25.0.0.0-1.x86_64.rpm
    ```

2. Install the `sqlplus` client:
    ```bash
    sudo rpm -ivh /tmp/oracle-instantclient19.25-basic-19.25.0.0.0-1.x86_64.rpm
    sudo rpm -ivh /tmp/oracle-instantclient19.25-sqlplus-19.25.0.0.0-1.x86_64.rpm
    ```

3. Connect to the database:
    ```bash
    sqlplus 'dbuser@(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=<REPLACE_DATABASE_ENDPOINT>)(PORT=1521))(CONNECT_DATA=(SID=tcxdb)))'
    ```

4. Check the tablespace size:
    ```sql
    SELECT TABLESPACE_NAME, ROUND(SUM(BYTES)/(1024*1024*1024),2) SUM_GB, ROUND(MAXBYTES/(1024*1024*1024),2) MAX_GB, AUTOEXTENSIBLE FROM DBA_DATA_FILES GROUP BY TABLESPACE_NAME, MAXBYTES, AUTOEXTENSIBLE;
    ```

5. Set the size of the tablespace based on the requirement:
    ```sql
    ALTER TABLESPACE DBUSER_INDX RESIZE <REPLACE_SIZE_IN_GB>G;
    ```

    Or, to set the tablespace to unlimited:
    ```sql
    SELECT file_id, file_name FROM dba_data_files WHERE tablespace_name='DBUSER_INDX';
    EXEC rdsadmin.rdsadmin_util.autoextend_datafile(<REPLACE_WITH_FILE_ID_FROM_ABOVE_COMMAND>, 'ON', '128M', 'UNLIMITED');
    ```

6. Uninstall the `sqlplus` client:
    ```bash
    sudo rpm -e /tmp/oracle-instantclient19.25-sqlplus-19.25.0.0.0-1.x86_64
    sudo rpm -e /tmp/oracle-instantclient19.25-basic-19.25.0.0.0-1.x86_64
    ```