## Changing configuration parameters and or preferences

All configurations and preferences for a TcX containerized deployment should be made via the TcX deploy automation pipeline. Using the pipeline to update configurations maintains the GITOPS approach to deployment and full traceability of all changes. the GITOPS approach will enable fleet management and simplify the upgrade process as the deployment moves to newer TcX releases.
TcX configurations can be made in different ways depending on the configuration. Below are some examples and how those changes would be applied to a deployed environment
### Changing a configuration via pipeline variable

The TcX Deploy Automation Pipeline allows for the specification of many common TcX configuration values. The most common configuration values can be set on the the pipeline as input json values. The input json table described in an earlier section of this document (Refer section [Customer input](../../010_Tenant%20Onboarding/010_Pre-Reqs/020_Ansible%20Template%20Input/000_Ansible%20Template%20Input.md)) lists the pipeline variables that can be set during initial as deployment as well as in a subsequent update using the same deploy pipeline.
​​
### How to update Site Preference

The recommended approach to update site preferences is through preferences_manager utility with an XML file containing the preference details to be modified, using tcc CLI. Please refer to the instructions in section [Executing Teamcenter ITK Utilities in a containerized environment](./Executing%20Teamcenter%20ITK%20Utilities#executing-teamcenter-itk-utilities-in-a-containerized-environment)
Please note that the site preference values are loaded during start-up or login.
If the updated preference value was not taking effect as result then a re-login would be required.
Note: For user/role/group types of preferences, no restart/re-login is required.
​​
