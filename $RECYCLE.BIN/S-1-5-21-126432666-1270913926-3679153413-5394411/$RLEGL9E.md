## Known deployment failures

### Deployment failure as fms pod not started

Deployutils pod degraded with failure while executing the databaseUpdate target :  Execution of "WAITFOR" task failed with The specified destination is not a directory 
2025/01/23-09:53:41.616 UTC - CONSOLE - AntBuildListener - dev05-vit1415 - UPDATE_CorporateServ_databaseUp - 9LI3QP27U3ELP - Getting: http://fmsmaster:4544/FMSMasterConfigFileRequest
2025/01/23-09:53:41.616 UTC - CONSOLE - AntBuildListener - dev05-vit1415 - UPDATE_CorporateServ_databaseUp - 9LI3QP27U3ELP - To: /tmp/fmsmasterFile5864524974350525934.xml
2025/01/23-09:53:41.620 UTC - CONSOLE - AntBuildListener - dev05-vit1415 - UPDATE_CorporateServ_databaseUp - 9LI3QP27U3ELP - EnterpriseId received from the request is: -1672216562
2025/01/23-09:53:41.620 UTC - CONSOLE - AntBuildListener - dev05-vit1415 - UPDATE_CorporateServ_databaseUp - 9LI3QP27U3ELP - Unable to identify FMS service version:
2025/01/23-09:54:11.622 UTC - ERROR - AntBuildListener - dev05-vit1415 - UPDATE_CorporateServ_databaseUp - 9LI3QP27U3ELP - Thu Jan 23 09:54:11 GMT 2025        Execution of "WAITFOR" task failed with The specified destination is not a directory
​​
Workaround:
1. In ArgoCD, verify that the fmsmaster and authenticatingfsc pods are running with the upgraded image version ( tc-fsc:2412 ).
2. Restart the deployutils pod from Argo CD.
