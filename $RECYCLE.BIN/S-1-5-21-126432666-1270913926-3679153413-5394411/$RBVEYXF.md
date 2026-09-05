
##### Merge Pipeline Variables files back into main

Once the provisioning of the admin subscription resources has succeeded and the MR of `YOUR_VARIABLE_BRANCH_NAME` was reviewed, merge it back into the `main` branch.

##### Update Cell variables

Once the variables for the Admin subscription are finalized and deployed, update the corresponding variables in for the [Cell setup](../040_Setup%20Cell%20Subscription/020_Prepare%20the%20scripts%20to%20be%20executed/010_Variable%20Reference%20Guide/000_cell_env_vars.sh.md) by raising MR on https://code.siemens.com/ctcx/cookbook.
