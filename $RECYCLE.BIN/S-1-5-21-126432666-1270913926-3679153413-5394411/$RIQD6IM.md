## Add Remove Access to other Operator Users

We have created two roles through automation with read and read/write access to Vault. These roles must be accessed accordingly for read or read/write operations. These roles can only be assumed by the admin AWS IAM role (specified in the input parameters with the variable `AdminReadAccessRoleArn` for read access or `AdminReadWriteAccessRoleArn` for read/write access).

### Steps to Locate and Modify an Admin AWS IAM Role

#### Locate IAM Role:
1. Log in to the AWS Management Console.
2. Navigate to the **IAM (Identity and Access Management)** service.
3. In the IAM dashboard, click on **Roles** from the left-hand menu.
4. Extract the `<Role Name>` from the ARN: `<Admin Access Role>` (Refer to this format to extract: `arn:aws:iam:::role/`).
5. Once in the Roles section, use the search box to find the role with the name: `<Role Name>`.
6. On the role details page, find the **Trust relationships** tab and click on it.
7. You'll see the JSON policy document that defines who or what can assume this role.

#### Edit Trust Relationship Policy:
1. Click on the **Edit trust relationship** button.
2. Add/Remove Access to Users with Role ARNs:
3. Locate the `Statement` section of the JSON policy.
4. You'll typically see one or more `Principal` sections specifying which accounts, users, or roles have access.
5. **To add access**: Modify or add a new statement under `Principal`. For example, to allow access to another role, add its ARN under `AWS` as follows:
     ```json
      {
         "Effect": "Allow",
         "Principal": {
            "AWS": [
                  "arn:aws:iam::<AccountId>/<FedratedUser1>",
                  "arn:aws:iam::<AccountId>/<FedratedUser2>"
                  :
                  :
            ]
         },
         "Action": "sts:AssumeRole"
      }
      ```
6.  **To remove access**: Delete the corresponding role ARN that grants access to the specific role.

  **Note**: To get `AccountId` and `FederatedUser`, refer to the screenshot below:

  ![Image](./image_456.png)
