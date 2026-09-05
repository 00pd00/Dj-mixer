### UTF encoding related setting for Postgres Database
For postgres DB to handle UTG characters like 'ß' PGCLIENTENCODING needs to be set in tc_profilevars, it can be placed at any location in tc_profilevars

Set PGCLIENTENCODING=UTF8 in tc_profilervars, Typical location of tc_profilevars `/<tenantID>-<envType>/<tenantID>-<envType>/teamcenter/tc_data`
If required use sudo to edit the file

After modifying tc_profilevars restart tc_server deployment using [workflow](../../../Documentation/Operations/Day%20N%20Operations/Shutdown%20and%20restart%20workloads)
Select workload as "Teamcenter servers and pool manager"

