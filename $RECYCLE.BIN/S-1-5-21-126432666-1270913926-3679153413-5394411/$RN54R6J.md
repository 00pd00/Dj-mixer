# Updating an Existing Deployment

Updating a tenant deployment to a new minor version of Teamcenter begins with LCS development tagging and releasing a new version of the `tc-version-manifests` GIT project. Let's start with an example where the admin wants to update from `tc2412` to `tc2412.001`.

On day 0, an admin deploys `tenant1-prd` using the `tc-version-manifests` tag `2412.0000`.  
That tag referred to a version of `2412.0000` that deployed `Tc2412`.  
That tag was originally specified in the input JSON using the parameter `TcXVersion`.  

At some later date, the admin wants to update the deployment to `tcx2412.0001` to pick up some defect fixes.  
LCS development will release a new tagged version of the `tc-version-manifests` project, let's say `tcx2412.0001`.  
In this example, `tcx2412.0001` refers to `Tc2412.0001`.  

The following sections provide details on how an admin would perform a tenant update to a new minor version of `TcX`.

