##### Check Management Group Roles

**Note**: Management group-level roles are inherited by subscriptions, so you can see them at the subscription level even though they were created at the management group.

## 1. Navigate to Your Subscription

1. In the global search box, search for **Subscriptions** and select the **Subscriptions** service.
2. Navigate to your subscription

### 2. Search for Required Roles

1. In the subscription overview, navigate to **Access Control (IAM)**.
2. Click on **Roles** and change the type to **Custom role**.

   ![alt text](image_7.png)


3. **Check for Lock Management Role**:
   
   Search for: `TcX-LockManagement-Role`
   
   **Examples of suffixes**: `dev`, `prod`, `MgmtGrp-Teamcenter`
   
   So you might find roles like: `TcX-LockManagement-Role-dev` or `TcX-LockManagement-Role-prod`

   ![alt text](image-4.png)
   
   **If found**: Copy the exact role name for future use.
   
   ![alt text](image-8.png)

4. Follow steps 2 and 3, and verify the Management-level custom roles:

      - TcX-TenantSPCustomRole-TenantBackupOperator
      - TcX-TenantSPCustomRole-TenantCommonRGManager
      - TcX-TenantSPCustomRole-TenantEnvironmentManager

### 3. If Roles Do NOT Exist

If any required roles are missing:

1. **Share Scripts Package**: Provide your `scripts.tar.gz` file to your Management Group Administrator
2. **Provide Documentation**: Direct them to [Create Management Group Roles](./022_Create%20Management%20Group%20Roles.md) for step-by-step instructions
3. **Request Role Creation**: Ask them to create the missing roles and provide back the exact role names

