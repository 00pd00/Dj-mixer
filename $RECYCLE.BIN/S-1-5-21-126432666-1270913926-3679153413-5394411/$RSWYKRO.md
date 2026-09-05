
#### Setup OIDC federation in AWS accounts

**NOTE**: This step needs to be done only once per stream setup (Dev/Dryrun/Customer)

Azure pipeline needs to access the Route53 and Lambda services in AWS for updating the DNS entries and accessing the SAM API respectively. This is achievable via federation between AWS and Azure AD/Entra. An app registration is created in Azure, which is given access to Route53 and Lambda via OIDC federation.

To set up the federation, an App Registration was created as described in [Create the AWS Interop Application](./000_Setup%20Admin%20subscription/070_Configure%20global%20apps.md#4_create_aws_interop_app). This App Registration uses an Application ID URI defined by the variable `GLBL_APPLICATION_REGISTRATION_URL_ID` in the cell variable file.

Refer the below table for ownership of the various AWS components.

| AWS Service | Account | Role | Ownership | Contact |
|-------------|---------|------|-----------|---------|
| Route53 (Dev - testplmscloudsolutions.com) | 593713585809 | IAMRole-For-Azure-Testplmcloudsolutions-Route53-Recordsets | LCS | [Azure Architects](mailto:tc.azure.deployops.architects.disw@siemens.com) |
| Route53 (Customer/DryRun - cloud.teamcenter.com) | 338113354125 | IAMRole-For-Azure-cloudteamcentercom-Route53-Recordsets | LCS | [Azure Architects](mailto:tc.azure.deployops.architects.disw@siemens.com) |
| Lambda (tcx_cli) | 361500002652 | IAMRole-For-Azure-PreProd-SAMLambdaInvoke | CApS | [CApS Platform](mailto:caps-platformautomation.sisw@siemens.com) |

To complete the process, contact the teams mentioned to configure corresponding AWS account as mentioned below:

1. **Create an IAM Identity Provider**  
    - In the left navigation pane, **Identity providers** and search for provider `https://sts.windows.net/<Microsoft Entra Tenant ID>`.
    - If an entry exists, select it and then click `Actions` -> `Add audience`, enter `GLBL_APPLICATION_REGISTRATION_URL_ID` as value
      ![Image](./image_147.png)
        - Select `Add audience`

    - If an entry does not exist, then choose **Add provider**.
      ![Image](./image_150.png)

        - For **Provider type**, choose **OpenID Connect**.
        - For **Provider URL**, enter `https://sts.windows.net/<Microsoft Entra Tenant ID>`. This allows only identities from your Azure tenant to access your AWS resources.
        - For **Audience**, use `GLBL_APPLICATION_REGISTRATION_URL_ID` from the cell file.
          ![Image](./image_149.png)
        - Select `Add provider`

2. **Setup federation on the Role**  
    Update the appropriate role mentioned above by adding the federation:

    ```json
    {
         "Statement": [{
              "Effect": "Allow",
              "Principal": {
                    "Federated": "arn:aws:iam::<AWS Account ID>:oidc-provider/sts.windows.net/<Microsoft Entra Tenant ID>/"
              },
              "Action": "sts:AssumeRoleWithWebIdentity",
              "Condition": {
                    "StringEquals": {
                         "sts.windows.net/<Microsoft Entra Tenant ID>/:aud": "<GLBL_APPLICATION_REGISTRATION_URL_ID>"
                    }
              }
         }]
    }
    ```

    Refer:
    ![Image](./image_148.png)
