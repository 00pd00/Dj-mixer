# Upgrading an existing Deployment

Different between Upgrade and update:

**Update:** is meant for updating the patches of installed TC release i.e. 14.3.x to 14.3.y

**Upgrade:** is meant for updating major version updates of the TC release i.e. from 14.3.x to 2412

Upgrading a tenant deployment to a new minor version of Teamcenter begins with LCS development tagging and releasing a new version of the tc-version-manifests GIT project. Lets start with an example where the admin wants to upgrade from tcx9.0.0 
(tc14.3.0.7) to tcx2412( or latest )
On day 0, an admin deploys tenant1-prd using the tc-version-manifest tag tcx9.0.0.
That tag referred to a version of TcX 9.0 that deployed Tc 14.3.0.7.
That tag was originally specified in the input json using the parameter TcXVersion
At some later date, the admin wants to upgrade the deployment to tcx2412 ( or latest )  to pickup some defect fixes
LCS development will release a new tagged version of the tc-version-manifest project, lets say tcx2412
The following sections provide details on how an admin would perform a tenant upgrade to a new major version of TcX.
