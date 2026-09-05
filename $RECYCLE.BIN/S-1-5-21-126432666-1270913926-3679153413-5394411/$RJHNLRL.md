
##### Trigger the pipeline

1. Trigger the account pipeline using [this form](https://gitlab.industrysoftware.automation.siemens.com/tcx-deploy/tcx-pipeline-account/-/pipelines/new?ref=main&var[CELL_ID]=YOUR_CELL_VARIABLE_FILENAME&var[STREAM_ID]=YOUR_STREAM_ID&var[VARIABLE_BRANCH_NAME]=YOUR_VARIABLE_BRANCH_NAME&var[stage]=YOUR_STAGE_NAME)
2. Change the branch name of the pipeline to the current release tag from [wiki](https://gitlab.industrysoftware.automation.siemens.com/groups/tcx-deploy/-/wikis/Branches)
3. Update the placeholder variables that you see in the form. The table guides 

| Argument | Value |
|----------|-------|
| YOUR_VARIABLE_BRANCH_NAME | According to your chosen cell variable branch name  |
| YOUR_CELL_VARIABLE_FILENAME | $VARIABLES_FILENAME (_note: without .yml extension)_  |
| YOUR_STREAM_ID | According to your environment. It must match the name of one of the files present in the folder ./variables/stream/ of your YOUR_VARIABLE_BRANCH_NAME-branch |
| YOUR_STAGE_NAME | manage-bootstrap-rg |
