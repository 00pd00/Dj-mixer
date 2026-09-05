## Utilities taking too long to complete due to lot of dead processes

Teamcenter keeps track of the process details for utilities and tcservers, and associated login sessions in the database. When the utility or tcserver logs out, the associated entries are removed from the database. In some cases, these entries are not cleared out from database when a utility/tcserver crashes or the utility/tcserver does not log out. Over a period of usage, the entries related to the dead/stale processes get accummulated in the Teamcenter database and this slows down utilities that connect to the database. As a best practice, it is recommended to run clearlocks utility periodically (daily or weekly - during non-peak hours) to scan all processes and clean up entries related to dead/stale processes in the database.

The following command should be run using tcc CLI to clear the dead processes and associated session entries in Teamcenter database. Please refer to the instructions in section [Executing Teamcenter ITK Utilities in a containerized environment](../Day%20N%20Operations/Executing%20Teamcenter%20ITK%20Utilities#executing-teamcenter-itk-utilities-in-a-containerized-environment) regarding tcc CLI.

For clear-locks details refer here: [Siemens Support Centre](https://internal.docs.sw.siemens.com/en-US/doc/282219420/PL20250520748650994.utilities_reference/clearlocks)

Below is a example: 
Assert all sessions dead: 
```bash
    tcc exec 'clearlocks -assert_all_dead -verbose -u=infodba -pf=$TC_SECURITY_DIR/default_infodba.pwf -g=dba'
```