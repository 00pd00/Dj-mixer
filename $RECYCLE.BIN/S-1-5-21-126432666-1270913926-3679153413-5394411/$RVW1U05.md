# Transition Steps

This guide provides clear, step-by-step instructions to help you transition your TcX (Teamcenter X) environment to a new product tier. Follow these instructions carefully to ensure a smooth and successful transition.

## 1. Shut Down the TcX Containerized Deployment

To begin the transition, you must shut down the existing TcX containerized components.

1. Refer to the steps in [Stopping and Restarting TcX Containerized Deployment](../Documentation/Operations/Day%20N%20Operations/Shutdown%20and%20restart%20workloads).
2. In the deployment interface, select **"Teamcenter deployment for applying updates"** from the workload dropdown menu.

---

## 2. Update the Product Tier for the TcX Environment

Updating your TcX environment’s product tier requires running a new DeployOps pipeline for your tenant. Refer [Ansible Playbook Execution](../Documentation/Tenant%20Onboarding/Basic%20Flow/Ansible%20playbook%20execution) for more information.

1. **Prepare Customer Input for Ansible Template**
   - Before running the pipeline, fill in the required **Customer Input** for the Ansible template.
   - See the [Customer Input](../Documentation/Tenant%20Onboarding/Pre-Reqs/Ansible%20Template%20Input/Ansible%20Template%20Input) section for details.

2. **Specify the Correct Product IDs**
   - Enter the appropriate Product ID(s) under the `TeamcenterProductIDList` field in the customer input form.
   - Refer to the following guidelines to select the right Product IDs for your target product tier.

### 2.1 Update from TcX Standard to TcX Advanced

Use the following specific parameters for a TcX Advanced deployment:

| Key                   | Value   | Description                                                                                    |
|-----------------------|---------|------------------------------------------------------------------------------------------------|
| `TeamcenterProductIDList` | TC7101  |                                                                 |
| `DeployDispatcher`    | true    | Set to `true` to deploy Dispatcher on "WindowsServer1". This is required for TcX Advanced.     |

- All other parameters can be referenced from the [Customer Input](../Documentation/Tenant%20Onboarding/Pre-Reqs/Ansible%20Template%20Input/Ansible%20Template%20Input).

### 2.2 Update from TcX Standard to TcX Premium

- Refer to the Product ID list and Software/Integration Versions : `Tenant Onboarding > Pre-Reqs > Ansible Template Input > Ansible Template Input Guide > Product ID List & Software Integration Versions`  documentation to find TcX Premium Product IDs.
- Select the correct Product IDs based on your requirements and entitlements.
- Enter these Product IDs in the `TeamcenterProductIDList` field of the customer input.

---

## 3. Restart the TcX Containerized Deployment

After updating the product tier, restart the TcX containerized components.

1. Follow the procedure in [Stopping and Restarting TcX Containerized Deployment](../Documentation/Operations/Day%20N%20Operations/Shutdown%20and%20restart%20workloads).

---

## 4. Link the Existing Environment to the New Product Tier in Xcelerator Admin Console

Enable access to the new product tier for your customer.

1. Refer to [Enable Teamcenter X Product Access in Xcelerator Admin Console for Customer](../Documentation/Tenant%20Onboarding/Enable%20Xcelerator%20Admin%20Console%20for%20Teamcenter%20X/Enable%20Xcelerator%20Admin%20Console%20for%20Teamcenter%20X) for detailed steps.

---

## 5. Migrate Users from Old Tier to New Tier

Once customer access to the new product tier is enabled, assign users from the old tier to the new tier.

### 5.1 User Migration Steps

1. Log in to the [Xcelerator Admin Console](https://cloud.sw.siemens.com/).
2. Select the old product tier to view its details.
3. Click the **Assigned Users** tab to list all users.
   ![alt text](image.png)
4. For each user listed under the source tier:
    1. Select the new product tier to view its details.
    2. Go to the **Assigned Users** tab.
       ![alt text](image-1.png)
    3. Click the **Assign Users** button.
    4. In the **Assign User** dialog, provide the user's email address, environment, and any other required details.
       ![alt text](image-2.png)
    5. Click **Assign** to complete the migration for that user.
5. Repeat these steps for each user that needs to be migrated.

---

## 6. Expire the Old Product Tier

After successful migration, users will begin using the new product tier. Disable customer access to the old tier.

1. Create an issue in the [FDS Forum](https://code.siemens.com/xf/xf-forum/-/issues) to request expiry of the old product tier for the relevant ECA (Enterprise Customer Account).

---

## 7. Verify Advanced Features

1. Log in to Active Workspace with the `Engineering.MyOrg` group and `Author` role.
2. In the left-hand navigation command bar, verify that the **Classification** command is visible as shown below.
   ![alt text](image-3.png)
3. Clicking on the **Classification** command should display the **Class Navigator**.

---

## NOTE: For TCX premium, further steps are documented in TcX_Advanced_to_TcX_Premium_Transition step 7 Manually Enable TCX Premium Features

[Manually Enable TCX Premium Features](../TcX_Advanced_to_TcX_Premium_Transition/020_Transitions_Steps.md#7-manually-enable-tcx-premium-features)
