### Azure

#### Enable necessary providers

 Ensure Contributors role is [active in PIM](../../../../../CTCX-Intro/010_Containerized%20TcX%20Architecture%20Overview/020_AZURE/030_Activating%20Roles%20and%20Groups%20via%20PIM.md).
Open a Bash Cloud Shell in Azure. Execute below commands:

```bash
az account set -s [subscription_id]

az provider register --namespace Microsoft.Storage
az provider register --namespace Microsoft.ManagedServices
az provider register --namespace Microsoft.Network
az feature register --name EncryptionAtHost --namespace Microsoft.Compute
```

#### Setup custom role for Virtual Network Peering

##### Create custom role for peering

1. Ensure User Access Administrator and RBAC roles are [active in PIM](../../../../../CTCX-Intro/010_Containerized%20TcX%20Architecture%20Overview/020_AZURE/030_Activating%20Roles%20and%20Groups%20via%20PIM.md).
    - Navigate to `Privileged Identity Management` -> `Tasks` -> `My roles` -> `Groups`
    - `Activate` the `[subscription name] Cell Provisioners` Group created in section [Create Groups for Your Subscriptions](../../../../../CTCX-Intro/Containerized%20TcX%20Architecture%20Overview/AZURE/Setup%20Azure%20and%20Entra%20Groups%20and%20Roles#create-groups-for-your-subscriptions)
    ![Image](./image_141.png)
2. Navigate to Subscriptions and select your subscription.
3. Go to Access Control (IAM) and click on `+Add` -> `Add custom role`.

    ![Image](./image_128.png)
4. Set the role name `TcX-NetworkWriter-Role-[team-name]`

    ![Image](./image_129.png)
5. Navigate to `JSON` tab, click `Edit`.
6. Update below template to replace `[team-name]` with your team name and `[subscription-id]` with your subscription, and use it to set the permissions:

    ```bash
    {
        "properties": {
            "roleName": "TcX-NetworkWriter-Role-Azure-[team-name]",
            "description": "",
            "assignableScopes": [
                "/subscriptions/[subscription-id]"
            ],
            "permissions": [
                {
                    "actions": [ 
                      "Microsoft.Network/register/action", 
                      "Microsoft.Network/virtualNetworks/write", 
                      "Microsoft.Management/getEntities/action", 
                      "Microsoft.Authorization/policyDefinitions/read", 
                      "Microsoft.Authorization/policyAssignments/read", 
                      "Microsoft.Network/virtualNetworks/listNetworkManagerEffectiveConnectivityConfigurations/read", 
                      "Microsoft.Network/virtualNetworks/read", 
                      "Microsoft.Network/networkGroupMemberships/read" 
                    ],
                    "notActions": [],
                    "dataActions": [],
                    "notDataActions": []
                }
            ]
        }
    }
    ```
    ![Image](./image_130.png)

7. Click `Save` -> `Review + Create` -> `Create`.

##### Assign the custom role to XCR

1. Navigate to Subscriptions and select the subscription where the TcX cell is to be setup.

2. Go to Access Control (IAM) and click on `+Add` -> `Add role assignment`.

  ![Image](./image_131.png)

3. Search for the role `TcX-NetworkWriter-Role-Azure-[team-name]` created above, select `Next`.

  ![Image](./image_132.png)

4. Select `User, group, or service principal`, click on `+Add members`, search for `AZM-XCR-SERVICE`. Select and click `Next`.

  ![Image](./image_133.png)

5. Set `Assignment type` as `Active` and `Assignment duration` as `Permanent`.

  ![Image](./image_134.png)

6. Select `Review + assign`.