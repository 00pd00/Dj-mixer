### Description
This operation automates the rotation of API Keys required for authentication while interacting with  Azure cloud services ( Open AI, AI Vision ) in Teamcenter AI Chat and securely stores them in the tenant's vault. The operation is designed to enhance security by regularly updating azure cloud services API keys.

** OperationsAction ** : `rotate_apim_keys`


#### Initiate the workflow

1. Use RunCommands Template to perform operation. Please refer [Ansible Templates Table](https://ctcx.code.siemens.io/cookbook/docs/Documentation/Tenant%20Onboarding/Basic%20Flow/Ansible%20Templates%20Table)

2. In Survey Provide the [Customer Input](https://ctcx.code.siemens.io/cookbook/docs/Documentation/Operations/Day%20N%20Operations/Gitlab%20Access%20Token%20Rotation%20Operation/#customer-inputs), GITLAB PAT token and Vault Token.

3. Along with customer inputs mentioned in above point. Please mention **OperationAction** as `rotate_apim_keys` and add below input as well:

#### TC AI Chat Inputs
​​
   | Parameter | Value | Sample |
|-----------------|-------|------------|
| EnableVisualPartSearch | true or false | true if visual part search is enabled in customer's environment else false |