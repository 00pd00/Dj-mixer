##### Allowlist TcX Tenant Administrative Account for XCR Vault Usage

To generate dynamic AWS credentials using the above IAM role, the XCR team needs to allowlist your TcX Tenant Administrative Account. This role remains the same for all TcX Tenant Administrative Accounts.

**Steps:**

1. Request the XCR team to add permissions for the role `arn:aws:iam::060863920329:role/gblsvcs01eu-prod-xcrvaultent-workload` in the account `060863920329` to assume CI roles of TcX Tenant AWS Account.
Note:
- For Dev Environment use `arn:aws:iam::060863920329:role/svcs02eu-prod-xcrvaultent-workload`,
- For Prod and DryRun Environment use `arn:aws:iam::060863920329:role/gblsvcs01eu-prod-xcrvaultent-workload`

2. Open the [FDSOne Help Center XCR request link](https://fdsone.atlassian.net/servicedesk/customer/portal/302/group/348/create/768).
3. Fill in the form with the following values:
    - **Summary**: Allow AWS Account to assume Vault Role
    - **Description**:
      - Region: `eu-central-1`
      - Cluster Name: `tcx-*`
      - Namespace: `prd*`, `dev*`, `uat*`
      - We are making use of XCR Vault to generate temporary AWS Account Credentials. We are onboarding new AWS Account `<TcX Tenant AWS Account Id>`. Requesting you to allow AWS Account `<TcX Tenant AWS Account Id>` to assume IAM Role: `arn:aws:iam::060863920329:role/gblsvcs01eu-prod-xcrvaultent-workload`. The IAM role needs to be allowlisted as: `tcx-container-deploy-ops-CIRole-<TcX Tenant AWS Account Id>`.
    - **Request type**: Enablement Request
    - **Component**: XCR Docs
4. Attach a screenshot of the request:

![Image](./image_42.png)