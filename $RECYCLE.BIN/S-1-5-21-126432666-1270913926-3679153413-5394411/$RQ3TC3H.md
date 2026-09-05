## Unable to create volume file error is seen while importing/uploading file into FSx/NetAPP volume

**Note: This steps are applicable for both AWS and Azure deployments. For AWS the volume would be FSx Volume and for Azure it would be NetApp Volume.**

In Teamcenter X deployments, while importing/uploading the files in the FSx volume shows error:

`Unable to create volume file`

Steps to check if you are getting the correct issue:
1. Try uploading a file from AWC into the FSx volume (DefaultUserNetworkVolume).
2. File upload is failing with error Bad Request.
3. Open developer tools by pressing the F12 key.
4. Check in the network tab server response error msg is "Unable to create volume file". 
4. Take the Cell ID from your inputs or config file
5. Navigate to Rancher and locate the fmsmaster pod
6. Connect to the fmsmaster pod and execute this command 
	```bash
	df -h
	```
7. Check in the fsx volume there is free space available.
![Image](image_disk_free.png)

Here in the "Mounted on" column check for path "/fms_network/volumes" and Used% is less than 95% and Available.

8. Change to the directory 
   ```bash
   cd /fms_network/volumes/DefaultUserNetworkVolume/
   ```
9. Try to create any test file in this folder with command 
	```bash
	touch test_fsxvolume.txt
	```
10. If the above command works, try to create file in Teamcenter Group level folder inside DefaultUserNetworkVolume.
![Image](image_fsxvolumedir.png)
	
	For eg: If you are getting error in uploading file from Active workspace with user from Engineering.MyOrg group than look for folder name starting with "engineering_myorg_" and execute below command,
	```bash
	touch test_fsxvolume.txt
	```
11. Command should fail with error "No space left on device".

This issue is caused due to concept from FSx ONTAP side for having reached the maximum dir size value (320 MB). For any individual directory there is max dir size associated as 320MB and it is calculated on the metadata of the files(metadata -> file name and number of files).If the number of files is too large(more than 1 million) than the max dir size limit gets reached and no more files can be created into that folder. As per teamcenter and FMS recommendations we need to set the preference TC_Volume_Max_Files_Per_Dir to limit the number of files per directory.

This issue can be resolved by following below steps:

1. Login to the TeamcenterX Active Workspace as dba user.

![Image](image_503_login_awc.png)

2. From the application tools click on the preferences tool.

![Image](image_504_app_tools.png)

3. In the preferences page search for the preference "TC_Volume_Max_Files_Per_Dir".

![Image](image_505_preference.png)

4. Edit the preference and set its value as "500000".

![Image](image_506_edit_preference.png)

5. Take the Cell ID from your inputs or config file.

6. Navigate to Rancher and locate the adminutils pod.

7. Execute this command to set the Tc env varibales:
	```bash
	source /apps/tc/TD/tc_profilevars
	```

8. Now execute below command to add index 
	```bash
	install -add_index -u=<user> -pf=<pwfile> -g=<group> <index_name> 0 ImanFile sd_path_name
	```

9. Post execution of these steps wait for 10 mins and try to import file in the FSx volume from Active workspace.
