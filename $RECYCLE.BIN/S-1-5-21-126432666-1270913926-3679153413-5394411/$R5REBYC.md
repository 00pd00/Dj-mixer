#### Troubleshooting - The Volume Mount Issue

This is an optional section, only needs to be followed if you encounter this error.  
You might encounter a volume mount issue in the deployUtils Pod.  
Go to Azure portal, activate your role in the cell subscription.  
Go to Virtual Networks and filter out with your tenant ID.  
In the left pane, go to **Settings -> Peerings**.  
Make sure there exists a peering between your tenant VNet and the cluster as shown in the below screenshot:  
![Image](./image_73.png)

If this peering is missing, reach out to the XCR team to resolve this.  
Open the [FDSOne Help Center XCR Request Link](https://fdsone.atlassian.net/servicedesk/customer/portal/29/group/37/create/113).  
Fill in the form with the following values:
- **Summary**: VNet peering between tenant VNet and XCR VNet is missing
- **Description**:
  - **Cluster Name**: `tcx<Your org/team short-name>`
  - **Namespace**: `prd-*`, `dev-*`, `uat-*`
  - **Details**: I see that VNet peering is missing between tenant VNet and XCR VNet, due to which the volume mounts on deployUtils pods are failing. Can you please help me resolve this?
- **Severity**: P1
- **Business Unit / Segment**: DISW
- **Product Name**: Cloud Operation
- **FDSOne Cloud Operations**: Cloud Runtime
- **Services**: XCR – Networking

Attach a screenshot of the request:  
![Image](./image_74.png)

4. **Automated ACM Certificate Creation**  
    The AWS ACM Certificate for ALB to each environment is automated through the tenant deployment pipeline to configure SSL in ALB. Below are the steps followed in the tenant deployment pipeline:
    - Automation pipeline creates a certificate for each tenant environment using a tenant-specific subdomain name (e.g., `b2412716-prd.cloud.teamcenter.com`, not `*.cloud.teamcenter.com`).
    - After creation, the obtained CNAME name and CNAME value for DNS validation are added to Route53 in the account where the domain is delegated.
    - The Tenant ALB is updated to use the new tenant-specific subdomain certificate.

    Example: For each tenant deployment, a new TLS certificate is created for a tenant-specific subdomain for ALB:  
    ![Image](./image_76.png)

