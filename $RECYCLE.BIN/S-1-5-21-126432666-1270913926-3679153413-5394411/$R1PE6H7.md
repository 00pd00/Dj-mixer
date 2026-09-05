

#### Trigger pipeline to provision VM images into Admin Subscription Compute Gallery 

##### Pre-requisites

1. Access to tcx-image-builder repository . 
2. Credentials to the Onboarding SP created on Admin Subscription . 
3. Hashicorp vault command to fetch credentials : vault read < admin azure secret engine name>/creds/< admin onboarding sp name>
![Image](./image_101.png)

`ADMIN_AZURE_CLIENT_ID`

`ADMIN_AZURE_CLIENT_SECRET`


##### Trigger the pipeline

1. Trigger the tcx-image-builder using [this form](https://gitlab.industrysoftware.automation.siemens.com/tcx-deploy/tcx-image-builder/-/pipelines/new?ref=main&var%5BCELL_ID%5D=YOUR_CELL_VARIABLE_FILENAME&var%5BSTREAM_ID%5D=YOUR_STREAM_ID&var%5BVARIABLE_BRANCH_NAME%5D=YOUR_VARIABLE_BRANCH_NAME&var%5BGLBL_CLOUD_PROVIDER%5D=azure&var%5BADMIN_AZURE_CLIENT_ID%5D=ADMIN_AZURE_CLIENT_ID_VALUE&var%5BADMIN_AZURE_CLIENT_SECRET%5D=ADMIN_AZURE_CLIENT_SECRET_VALUE&var%5BADMIN_AZURE_TENANT_ID%5D=6b5bd02b-92d2-40b2-9ffd-c9c94280c757&var%5BADMIN_AZURE_SUBSCRIPTION_ID%5D=ADMIN_AZURE_SUBSCRIPTION_ID_VALUE)


2. Change the branch name of the pipeline to the current release tag from [wiki](https://gitlab.industrysoftware.automation.siemens.com/groups/tcx-deploy/-/wikis/Branches)

3. Update the placeholder variables that you see in the form. The table guides 

| Argument | Value |
|----------|-------|
| GLBL_CLOUD_PROVIDER | azure  |
| ADMIN_AZURE_TENANT_ID | 6b5bd02b-92d2-40b2-9ffd-c9c94280c757 |
| CELL_ID | Name of the cell file created for Admin Subscription  |
| YOUR_STREAM_ID | According to your environment. It must match the name of one of the files present in the folder ./variables/stream/ of your YOUR_VARIABLE_BRANCH_NAME-branch |
| VARIABLE_BRANCH_NAME | Branch name used in [wiki](https://gitlab.industrysoftware.automation.siemens.com/groups/tcx-deploy/-/wikis/Branches) for that particular release |
| ADMIN_AZURE_CLIENT_ID | Client ID of your [Admin Root SP](Setup%20Admin%20subscription/Configure%20pipeline%20credential%20management/#create-a-root-service-principal) |
| ADMIN_AZURE_CLIENT_SECRET | Client Secret of your [Admin Root SP](Setup%20Admin%20subscription/Configure%20pipeline%20credential%20management/#create-a-root-service-principal) |
| ADMIN_AZURE_SUBSCRIPTION_ID | Azure Admin Subscription ID |


4. Example :

![Image](./image_91.png)



