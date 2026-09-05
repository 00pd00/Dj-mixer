## Hybrid deployment with an ATDD QD fails with databaseUpdate error

**Error found in install-regen_schema_filexxxxx.syslog:**

ODBC error. SQLSTATE: 01000 Native error: 0 
Message: [unixODBC][Driver Manager]Can't open lib 'SQL Server' : file not found 
Approx SQL was "CONNECT"

**Work Around:**

1. Login to the Corporate Server.
2. Edit the odbcinst.ini file from /etc folder as follows-
   
   sudo vi /etc/odbcinst.ini
3. Add an entry for MSSQL server ODBC driver as follows-

   [SQL Server]  Description     = ODBC for Microsoft SQL Server  
   Driver          = /siemens/Teamcenter_2506/tc_root/fossrepo/artifacts/Teamcenter/lnx64/mssqlODBC/17.10.6.1a/lib/libmsodbcsql-17.10.so.6.1  
   Driver64        = /siemens/Teamcenter_2506/tc_root/fossrepo/artifacts/Teamcenter/lnx64/mssqlODBC/17.10.6.1a/lib/libmsodbcsql-17.10.so.6.1 
   FileUsage       = 1
4. Press "Esc" + ":wq!" to save the changes made to the file and retry the execution of deploy.sh.