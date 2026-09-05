## FMS memory and scalability issues with large number of concurrent users

### FSC Out of Memory

If the FSC pod starts showing “Out of memory” issues, increase the amount of memory allocated to the FSC pod from the default to 2GB. This can be done by editing the deployment.yaml in the FSC helm charts which is located under:

/[deployment]/[deployment]/deploy/component/helm/teamcenter/charts/fmsmaster/templates/deployment.yaml

The file needs a new entry to be added that defines the environment variable for the FSC memory. See below for the example (FSC_MEM with the value being 2048M)

    ![Image](./image_416.png)

Repeat this step for the authenticating fsc as well, the path for the deployment being:

/[deployment]/[deployment]/deploy/component/helm/teamcenter/charts/authenticatingfsc/templates/deployment.yaml

Restart the FSC pods for the settings to take effect (if required)

### FSC Scalability and number of Replicas

When there is a high load on the system, for example when multiple users are trying to save large CAD assemblies at the same time: It is possible that the current number of FSC replicas may not be enough to serve all requests. In these cases, users may experience errors that show up as “Unreachable” errors in the FCC logs (Example - 408: ERROR_STRING_NO_FSC_REACHABLE)

This is an indication that the number of FSC replicas need to be scaled up to meet the Load demands on the system.

The replicaCount is defined in the values.yaml located under the

/[deployment]/[deployment]/deploy/component/helm/teamcenter/charts/fmsmaster/values.yaml. Below is an example of what needs to be changed. Change this value to5 to cater to high Loads

**Note:** This is for the fmsmaster FSC only and NOT the authenticatingfsc

    ![Image](./image_417.png)

Since there is no HPA available as of now, follow this rule for sizing fmsmaster instances:
For every 100 tenants (TcX Essentials) or 100 users (TcX), add 1 FSC replica.
For TcXEssentials, the recommendation is to keep the replica count at 5 if the region has below 500 tenants onboarded.
If there are more than 500 tenants onboarded, increase the replica count to 10.

It is also recommended to scale the ClamAV replicas so that the number of fmsmaster replicas and ClamAV replicas are the same.

### ClamAV out of memory

If the ClamAV pod starts showing “Out of memory” issues, increase the amount of memory allocated to the ClamAV pod from the default to 4GB. This can be done by editing the values.yaml in the ClamAV helm charts which is located under:

/[deployment]/[deployment]/deploy/component/helm/teamcenter/charts/tc_clamav/values.yaml

    ![Image](./image_418.png)

### ClamAV Scalability and number of Replicas

ClamAV scanning is done when Files are uploaded/saved in Teamcenter. When there is a high load on the system, for example when multiple users are trying to save large CAD assemblies at the same time, it is possible that the current number of ClamAV replicas may not be enough to serve all requests. In these cases, users may experience errors that show up as Save errors with the virus scan failure as the error in the FSC and FCC logs (-9052: ERROR_VIRUSSCAN_FAILURE_0)

This is an indication that the number of ClamAV replicas need to be scaled up to meet the Load demands on the system.

The replicaCount is defined in the values.yaml located under the `/<deployment>/<deployment>/deploy/component/helm/teamcenter/charts/tc-clamv/values.yaml.` Below is an example of what needs to be changed. Change this value to10 to cater to high Loads.

![Image](./image_418_1.png)


