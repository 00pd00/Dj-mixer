## Pipeline failing at Task - No space left on device

## AWS

### Windows Server EBS Volume Reached Full Capacity

Default volume size for extra EBS volume is 100 GB, If you encounter above issue then need to add a variable in your cell file mentioned in tcx-pipeline-variables source code or you can give **WinSer1ExtraEbsVolumeSize: 500** in input without quotes and run the pipeline.

![Image](./image_419.png)

During pipeline execution when terraform apply tasks execute successfully in build-infra stage then validate increased volume size on AWS console. Pipeline increase EBS volume size but it cannot adjust at OS level sizing.

![Image](./image_420.png)

To adjust at OS level sizing follow below steps

1. Log in to the Windows Instance: 
2. Open Disk Management:
3. Press Win + R, type diskmgmt.msc, and press Enter.
4. Extend the Volume
5. Locate the disk/partition that corresponds to the modified EBS volume.
6. It will show additional unallocated space after rescanning.

   ![Image](./image_421.png)
7. Extend the Volume:
    - Right-click the partition with free space (e.g., D: drive) and select Extend Volume.

    ![Image](./image_422.png)
8. Follow the Extend Volume Wizard:
    - Click Next and specify the amount of space to add (default is the maximum available).
      
      ![Image](./image_423.png)

      ![Image](./image_424.png)

For more details please refer -  (https://docs.aws.amazon.com/ebs/latest/userguide/recognize-expanded-volume-linux.html )

### Linux Server EBS Volume Reached Full Capacity

Default volume size for extra EBS volume is 150 GB, you can give **Ec2ExtraEbsVolumeSize: 500** in input without quotes and run the pipeline.

Once you run the pipeline and build-infra job of build-infra stage (highlighted job in following picture)is successful, then login to Linux EC2.

![Image](./image_425.png)

Login to Linux EC2 machine using SSM as root user.

![Image](./image_426.png)

Run following commands on Linux EC2:

`sudo su - `

`sudo resize2fs /dev/nvme1n1`

[**Note:** The following picture is just for reference, you will get different output when you run resize2fs command.]

![Image](./image_427.png)

After running above commands rerun the failed job. If there is no failed job then ignore.

if while rerunning the job, it fails with DC related message about certain software cannot be added into the environment or is either not support or invalid move lastScannedMedia.json using below command and rerun the job

1. Change to the repotool directory.

    `cd /siemens/DeploymentCenter/webserver/repotool/`

    export JAVA_HOME=/siemens/openjdk/17.0.10.7.1/ 
2. Stop the repotool service

    `./repotool.sh stop`
3. Delete the lastScannedMedia file

    `mv lastScannedMedia.json /tmp`

4. Copy and extract the missed kits (software which has issue) from /siemens/kits/ to **/siemens/DeploymentCenter/repository/software/**
5. Start the repotool service

    `./repotool.sh start`

## Azure

### Linux Server Disks Reached Full Capacity

By default, we have 10 GB allocated to root group volume. This can further be increased by another 10 GB.

1. Login to Corporate server using bastion and switch to root user be executing the following command-

    `sudo su - `

2. Execute the following command to get the free unallocated space-
    `sudo vgdisplay rootvg`
    ![Image](./image_vm_free_unallocated_space.png)

3. If we have enough free unallocated space, execute the following commands to increase it by another 10 GB.

    `sudo lvextend -L +10G /dev/mapper/rootvg-rootlv`

    `sudo xfs_growfs /`

4. This can be verified using the below command, where we should be able to see the new size of the root volume group-

    `df -h`

    ![Image](./image_vm_increase_root_volume.png)

5. After running above commands rerun the failed job. If there is no failed job, then ignore.

If while rerunning the job, it fails with DC related message about certain software cannot be added into the environment or is either not support or invalid move lastScannedMedia.json using below command and rerun the job

1. Change to the repotool directory.

    `cd /siemens/DeploymentCenter/webserver/repotool/`

    export JAVA_HOME=/siemens/openjdk/17.0.10.7.1/ 
2. Stop the repotool service

    `./repotool.sh stop`
3. Delete the lastScannedMedia file

    `mv lastScannedMedia.json /tmp`

4. Copy and extract the missed kits (software which has issue) from /siemens/kits/ to **/siemens/DeploymentCenter/repository/software/**
5. Start the repotool service

    `./repotool.sh start`

