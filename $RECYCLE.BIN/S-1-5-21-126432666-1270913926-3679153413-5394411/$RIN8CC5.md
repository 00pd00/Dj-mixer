### Pre-Req:

Ensure that you have the resource policy contributor role at the Management Group level.

### Note

For steps on how to assign a policy , refer to Assign policy section under Operations ---> Azure Policies.

As per latest changes Tenant pipeline assigns tenants with 'Patch:True' tag


### Set Patch Orchestration to Customer Managed Schedules for Linux Machines

1. Navigate to Azure Portal --> Search for Management Groups 

    ![Image](./020_Img_001.png)

2. Click on the required management group and navigate to Governance --> Policy

    ![Image](./020_Img_002.png)

3. Click on Definitions --> New Policy Definition

    ![Image](./image_483.png)

4. Put the below mentioned values:

    Definition Location : Management Group Name

    Name: Configure Linux virtual machines for recurring updates via AUM through customer defined windows.

    Description : This policy is being created to set Patch Orchestration option as Customer Managed Schedules for Linux.
    
    Category : Azure Update Manager

    Policy Definition:

    ```json
    {
        "properties": {
            "displayName": "Configure Linux virtual machines for recurring updates via AUM through customer defined windows.",
            "policyType": "Custom",
            "mode": "Indexed",
            "description": "This policy is a custom policy for configuring virtual machines for recurring updates via Azure Update Manager. This policy will set the Patch Mode to AutomaticByPlatform and bypassPlatformSafetyChecksOnUserSchedule to true, thereby setting the patch orchestration mode to Customer Managed Schedules i.e updates will be installed on the machines through user defined maintenance windows",
            "metadata": {
                "category": "Azure Update Manager"
            },
            "version": "1.0.0",
            "parameters": {
                "effect": {
                    "type": "String",
                    "metadata": {
                        "displayName": "Effect",
                        "description": "Enable or disable the execution of the policy"
                    },
                    "allowedValues": [
                        "DeployIfNotExists",
                        "auditIfNotExists",
                        "Disabled"
                    ],
                    "defaultValue": "DeployIfNotExists"
                }
            },
            "policyRule": {
                "if": {
                    "allOf": [
                        {
                            "field": "type",
                            "equals": "Microsoft.Compute/VirtualMachines"
                        },
                        {
                            "field": "Microsoft.Compute/virtualMachines/osProfile.linuxConfiguration",
                            "exists": "true"
                        }
                    ]
                },
                "then": {
                    "effect": "[parameters('effect')]",
                    "details": {
                        "roleDefinitionIds": [
                            "/providers/Microsoft.Authorization/roleDefinitions/b24988ac-6180-42a0-ab88-20f7382dd24c"
                        ],
                        "type": "Microsoft.Compute/virtualMachines",
                        "name": "[field('name')]",
                        "evaluationDelay": "AfterProvisioningSuccess",
                        "existenceCondition": {
                            "allOf": [
                                {
                                    "field": "Microsoft.Compute/virtualMachines/osProfile.linuxConfiguration",
                                    "exists": true
                                },
                                {
                                    "field": "Microsoft.Compute/virtualMachines/osProfile.linuxConfiguration.patchSettings.automaticByPlatformSettings.bypassPlatformSafetyChecksOnUserSchedule",
                                    "equals": true
                                },
                                {
                                    "field": "Microsoft.Compute/virtualMachines/osProfile.linuxConfiguration.patchSettings.patchMode",
                                    "equals": "AutomaticByPlatform"
                                }
                            ]
                        },
                        "deployment": {
                            "properties": {
                                "mode": "incremental",
                                "parameters": {
                                    "machineResourceId": {
                                        "value": "[field('id')]"
                                    },
                                    "osType": {
                                        "value": "[field('Microsoft.Compute/virtualMachines/storageProfile.osDisk.osType')]"
                                    },
                                    "machineName": {
                                        "value": "[field('name')]"
                                    },
                                    "location": {
                                        "value": "[field('location')]"
                                    },
                                    "patchMode": {
                                        "value": "[field('Microsoft.Compute/virtualMachines/osProfile.linuxConfiguration.patchSettings.patchMode')]"
                                    }
                                },
                                "template": {
                                    "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",
                                    "contentVersion": "1.0.0.0",
                                    "parameters": {
                                        "machineResourceId": {
                                            "type": "string"
                                        },
                                        "osType": {
                                            "type": "string"
                                        },
                                        "machineName": {
                                            "type": "string"
                                        },
                                        "location": {
                                            "type": "string"
                                        },
                                        "patchMode": {
                                            "type": "String"
                                        }
                                    },
                                    "variables": {
                                        "automaticByPlatformPatchMode": "AutomaticByPlatform",
                                        "linuxOSProfile": {
                                            "linuxConfiguration": {
                                                "patchSettings": {
                                                    "patchMode": "[variables('automaticByPlatformPatchMode')]",
                                                    "automaticByPlatformSettings": {
                                                        "bypassPlatformSafetyChecksOnUserSchedule": true
                                                    }
                                                }
                                            }
                                        },
                                        "patchModeShouldBeChanged": "[not(equals(parameters('patchMode'), variables('automaticByPlatformPatchMode')))]",
                                        "updatedOSProfile": "[variables('linuxOSProfile')]"
                                    },
                                    "resources": [
                                        {
                                            "condition": "[variables('patchModeShouldBeChanged')]",
                                            "type": "Microsoft.Compute/virtualMachines",
                                            "apiVersion": "2023-09-01",
                                            "name": "[parameters('machineName')]",
                                            "location": "[parameters('location')]",
                                            "properties": {
                                                "osProfile": "[variables('updatedOSProfile')]"
                                            }
                                        }
                                    ],
                                    "outputs": {
                                        "OSProfile": {
                                            "type": "object",
                                            "value": "[variables('updatedOSProfile')]"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

5. Click on Save . The policy definition is created successfully.

6. Assign this policy to the management group scope. The policy effect is default selected as DeployIfNotExists. 

7. Run a remediation task along with the policy assignment if there are existing resources that need to be modified.

8. Refer to the Note section for detailed policy assignment steps.

### Set Patch Orchestration to Customer Managed Schedules for Windows Machines

1. Navigate to Azure Portal --> Search for Management Groups 

    ![Image](./020_Img_001.png)

2. Click on the required management group and navigate to Governance --> Policy

    ![Image](./020_Img_002.png)

3. Click on Definitions --> New Policy Definition

    ![Image](./image_483.png)

4. Put the below mentioned values:

    Definition Location : Management Group Name

    Name: Configure Windows virtual machines for recurring updates via AUM through customer defined windows.

    Description : This policy is being created to set Patch Orchestration option as Customer Managed Schedules for Windows.
    
    Category : Azure Update Manager

    Policy Definition:

    ```json

    {
        "properties": {
            "displayName": "Configure windows virtual machines for recurring updates via AUM through customer defined windows.",
            "policyType": "Custom",
            "mode": "Indexed",
            "description": "This policy is a custom policy for configuring windows virtual machines for recurring updates via Azure Update Manager. This policy will set the Patch Mode to AutomaticByPlatform and bypassPlatformSafetyChecksOnUserSchedule to true, thereby setting the patch orchestration mode to Customer Managed Schedules i.e updates will be installed on the machines through user defined maintenance windows",
            "metadata": {
                "category": "Azure Update Manager"
            },
            "version": "1.0.0",
            "parameters": {
                "effect": {
                    "type": "String",
                    "metadata": {
                        "displayName": "Effect",
                        "description": "Enable or disable the execution of the policy"
                    },
                    "allowedValues": [
                        "DeployIfNotExists",
                        "auditIfNotExists",
                        "Disabled"
                    ],
                    "defaultValue": "DeployIfNotExists"
                }
            },
            "policyRule": {
                "if": {
                    "allOf": [
                        {
                            "field": "type",
                            "equals": "Microsoft.Compute/VirtualMachines"
                        },
                        {
                            "field": "Microsoft.Compute/virtualMachines/osProfile.windowsConfiguration",
                            "exists": "true"
                        }
                    ]
                },
                "then": {
                    "effect": "[parameters('effect')]",
                    "details": {
                        "roleDefinitionIds": [
                            "/providers/Microsoft.Authorization/roleDefinitions/b24988ac-6180-42a0-ab88-20f7382dd24c"
                        ],
                        "type": "Microsoft.Compute/virtualMachines",
                        "name": "[field('name')]",
                        "evaluationDelay": "AfterProvisioningSuccess",
                        "existenceCondition": {
                            "allOf": [
                                {
                                    "field": "Microsoft.Compute/virtualMachines/osProfile.windowsConfiguration",
                                    "exists": true
                                },
                                {
                                    "field": "Microsoft.Compute/virtualMachines/osProfile.windowsConfiguration.patchSettings.automaticByPlatformSettings.bypassPlatformSafetyChecksOnUserSchedule",
                                    "equals": true
                                },
                                {
                                    "field": "Microsoft.Compute/virtualMachines/osProfile.windowsConfiguration.patchSettings.patchMode",
                                    "equals": "AutomaticByPlatform"
                                }
                            ]
                        },
                        "deployment": {
                            "properties": {
                                "mode": "incremental",
                                "parameters": {
                                    "machineResourceId": {
                                        "value": "[field('id')]"
                                    },
                                    "osType": {
                                        "value": "[field('Microsoft.Compute/virtualMachines/storageProfile.osDisk.osType')]"
                                    },
                                    "machineName": {
                                        "value": "[field('name')]"
                                    },
                                    "location": {
                                        "value": "[field('location')]"
                                    },
                                    "patchMode": {
                                        "value": "[field('Microsoft.Compute/virtualMachines/osProfile.windowsConfiguration.patchSettings.patchMode')]"
                                    }
                                },
                                "template": {
                                    "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",
                                    "contentVersion": "1.0.0.0",
                                    "parameters": {
                                        "machineResourceId": {
                                            "type": "string"
                                        },
                                        "osType": {
                                            "type": "string"
                                        },
                                        "machineName": {
                                            "type": "string"
                                        },
                                        "location": {
                                            "type": "string"
                                        },
                                        "patchMode": {
                                            "type": "String"
                                        }
                                    },
                                    "variables": {
                                        "automaticByPlatformPatchMode": "AutomaticByPlatform",
                                        "windowsOSProfile": {
                                            "windowsConfiguration": {
                                                "patchSettings": {
                                                    "patchMode": "[variables('automaticByPlatformPatchMode')]",
                                                    "automaticByPlatformSettings": {
                                                        "bypassPlatformSafetyChecksOnUserSchedule": true
                                                    }
                                                }
                                            }
                                        },
                                        "patchModeShouldBeChanged": "[not(equals(parameters('patchMode'), variables('automaticByPlatformPatchMode')))]",
                                        "updatedOSProfile": "[variables('windowsOSProfile')]"
                                    },
                                    "resources": [
                                        {
                                            "condition": "[variables('patchModeShouldBeChanged')]",
                                            "type": "Microsoft.Compute/virtualMachines",
                                            "apiVersion": "2023-09-01",
                                            "name": "[parameters('machineName')]",
                                            "location": "[parameters('location')]",
                                            "properties": {
                                                "osProfile": "[variables('updatedOSProfile')]"
                                            }
                                        }
                                    ],
                                    "outputs": {
                                        "OSProfile": {
                                            "type": "object",
                                            "value": "[variables('updatedOSProfile')]"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }


4. Click on Save. The policy definition should be created successfully.

5. Assign this policy to the management group scope. The action is default selected as DeployIfNotExists. 

6. Run a remediation task along with the policy assignment if there are existing resources that need to be modified.

7. For detailed assignment steps, please refer to the note section above.


### Configure Periodic Assessment on the Virtual Machine

1. Open Azure policies. Navigate to Azure Portal --> Search for Management Groups 

    ![Image](./020_Img_001.png)

2. Click on the required management group and navigate to Governance --> Policy

    ![Image](./020_Img_002.png)

3. Click on Assignment ---> Assign Policy. This should redirect you to the policy assignment page.

    ![Image](./image_484.png)

4. Fill in the required information as below:

    Scope: Management Group
    Exclusions: This is to be filled if you want to exclude any resources like subscription, resources from the policy scope.
    Policy Definition: Select on Browse and search for the below policy definition

        Configure periodic checking for missing system updates on azure virtual machines

    ![Image](./image_485.png)

    Click on Add.

    Assignment Name: Choose a Name for the assignment.
    Description: Description of the policy.

5. Click on Next. You should be navigated to the Parameters tab.

6. Uncheck the parameters for review checkbox.

    ![Image](./image_486.png)

7. Select OS type as Windows.

8. Follow the remaining steps of the assignment as per the normal steps. Refer to note section above:

### Repeat steps 1-8 above and assign the policy with os type as Linux.



