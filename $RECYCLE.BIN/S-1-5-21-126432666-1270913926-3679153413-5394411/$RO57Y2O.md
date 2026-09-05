## Steps to Disable FMS ClamAV Virus Scanning (requires Approval)

In instances where it is agreed to disable FMS CLamAV FMS Virus Scanning, here are the steps to follow (login with sudo su - tcx_user)

1. Navigate to the `/<deployment>/<deployment>/deploy/component/config/fmsmaster/fsc` folder
2. Take a backup of the fmsmaster_FSC_fmsmaster.xml file
3. Edit the fmsmaster_FSC_fmsmaster.xml file to remove the "quarantinevolume" entry from this fmsmaster xml. Sample entry shown below
Remove this entire line from the fmsmaster xml
> `<quarantinevolume enterpriseid="-1652316044" root="/fms/quarantine" command="$SCAN_COMMAND $SCAN_FILE" timeout="200" />`
4. Save the fmsmaster xml file
5. Restart all the fmsmaster pods
6. Test uploading an EICAR file from Active Workspace. See [how to create an EICAR file](https://code.siemens.com/ctcx/cookbook/-/blob/master/docs/Documentation/010_Tenant%20Onboarding/050_Validation%20Steps%20for%20Teamcenter%20X%20Products/230_FSC%20Virus%20Scanner.md?ref_type=heads&plain=0#testing-with-eicar-virus-scanner-test-file-disk-volume)
This file should now be successfully uploaded since Virus Scanning is turned off.
