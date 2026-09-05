
This activity is performed by the [Cell Provisioner](../../../../../../CTCX-Intro/010_Containerized%20TcX%20Architecture%20Overview/020_AZURE/020_Setup%20Azure%20and%20Entra%20Groups%20and%20Roles.md). Activate your membership in the Cell Provisioner group.

##### Configure auto peering

We need to configure auto-peering for the shared VNet and tenant VNet to auto-peer with the XCR cluster VNet.

###### Check access

Ensure the XCR team has granted the rights to access their `NetworkGroup` to the AD group shared as part of the ticket in [Request Kubernetes Cluster from XCR in the required cell](../../../../../Cell-Setup/Automation%20Prerequisites/XCR%20Kubernetes%20Cluster%20Setup/AZURE/Request%20XCR%20Cluster#raise-fds-ticket-for-cluster)

###### Configure the policy

1. Go to **Policy -> Definitions**:  
    
    ![Image](./image_85.png)

2. Create a new Policy:  
    
    ![Image](./image_86.png)

    Use below template for the policy rule:

    ```json
    {
        "mode": "Microsoft.Network.Data",
        "policyRule": {
            "if": {
                "allOf": [
                    {
                        "equals": "Microsoft.Network/virtualNetworks",
                        "field": "type"
                    },
                    {
                        "allOf": [
                            {
                                "equals": "<subscription-id>",
                                "value": "[subscription().SubscriptionId]"
                            },
                            {
                                "equals": "true",
                                "field": "tags['xcr_peer']"
                            },
                            {
                                "equals": "<cluster-name>",
                                "field": "tags['cluster_name']"
                            }
                        ]
                    }
                ]
            },
            "then": {
                "details": {
                    "networkGroupId": "<networkGroupId>"
                },
                "effect": "addToNetworkGroup"
            }
        }
    }
    ```

3. Replace with values:

    | Argument | Value |
    |----------|--------|
    | [subscription-id] | Set your subscription |
    | [cluster-name] | xcr cluster-name |
    | [networkGroupId] | The network group id shared by XCR team as output of [Request Kubernetes Cluster from XCR in the required cell](../../../../../Cell-Setup/Automation%20Prerequisites/XCR%20Kubernetes%20Cluster%20Setup/AZURE/Request%20XCR%20Cluster#raise-fds-ticket-for-cluster) |

4. Assign the policy to Subscription:

    ![Image](./image_87.png)


5. Replace with values:

| Argument | Value |
    |----------|--------|
    | [Scope] | Set your subscription |
    | [Policy definition] | Select your policy |
    | [Assignment name] | Policy Assignment for tcx-xcr-auto-peering |

    ![Image](./image_88.png)

---