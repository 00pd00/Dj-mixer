
### Unable to create the cloud service for 'cloudvolume 094300001df99ad76330'

Issue :- 2025/03/05-17:58:43.935 UTC - ERROR - - 0C8C5ADB8 - - - Unable to create the cloud service for 'cloudvolume 094300001df99ad76330'

If facing this issue during upgrade then follow below steps to resolve this issue. 

1. Open file '/tenant-ENV/tenant-ENV/deploy/component/config/fmsmaster/fsc/fmsmaster_FSC_fmsmaster.xml'
2. Replace dss and sam endpoints with the values that were existing prior to the 2412 upgrade (Note - you will get this file from backup.)
3. Restart the fmsmaster and AuthenticatingFSC pods via Rancher or ArgoCD
4. Restart the DeployUtils pod