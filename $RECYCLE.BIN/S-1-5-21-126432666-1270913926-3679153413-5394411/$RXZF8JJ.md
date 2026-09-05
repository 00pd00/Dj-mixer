### Update cell variables yaml file with GLBL_BEDROCK_ROLE_ARN
1. Identify the cell variable file to update.
2. Add `GLBL_BEDROCK_ROLE_ARN` variable - its value depends upon type of cell and region - see following table:

| Cell type | Region    | Value of GLBL_BEDROCK_ROLE_ARN |
| :---------|:----------|:-------------------------------|
| prod      | us-east-1 | `arn:aws:iam::597088042241:role/lcs-st-prod-use1-tcx-bedrock-access-role` |
| pre-prod  | us-east-1 | `arn:aws:iam::445567116810:role/lcs-st-preprod-use1-tcx-bedrock-access-role` |

If Bedrock service is required in other regions, reach out to Zeus team [zeusops.sisw@siemens.com](mailto:zeusops.sisw@siemens.com).

> Currently supported bedrock regions are limited to Regions mentioned in the table above. For deployments in other regions, please request ZEUS to provision the resource in the deployment region before moving ahead. 
