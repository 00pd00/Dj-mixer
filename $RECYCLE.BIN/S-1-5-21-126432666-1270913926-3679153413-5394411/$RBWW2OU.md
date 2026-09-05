## Build AW client artifacts (awbuild)

The awbuild utility is executed to "compile" Tc Active Workspace into a usable form so that the Active Workspace client displays correctly. As part of the deploy automation pipeline post-deploy step, awbuild is executed automatically. It is not normally required that awbuild is executed manually.

In unusual cases where awbuild must be executed to compile UI changes made outside of the normal pipline execution, awbuild can be executed using the "tcc exec" mechanism. Details on how to execute "tcc exec" are covered in section [Executing Teamcenter ITK Utilities in a containerized environment](./Executing%20Teamcenter%20ITK%20Utilities#executing-teamcenter-itk-utilities-in-a-containerized-environment). The specific command to run awbuild is:

cmd> `tcc exec 'awbuild.sh'`
​​
Note that awbuild MUST be executed while AW gateway, filerepo, and adminutils pods are running.
