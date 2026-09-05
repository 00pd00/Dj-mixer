## Updating TMS entry for Cloned and Updated Environments

**Please note:** This step is only needed if the environment is created through clone workflow OR the same deployment is updated by specifying new product ids. (eg. TcxStandard to TcX Advanced, TcX Advanced to Tcx Premium etc )

In such case the cloned environment, the product Ids needs to be fetched from the source environment.

In case of Update, the product Ids need to be fetched from ansible input.

Then TMS database record for the environment needs to be updated with the product Ids. 

AWS UI access is needed to update the TMS record.

Once database record is updated for product id, the **post deploy** stage of the tenant pipeline has to be re run.
