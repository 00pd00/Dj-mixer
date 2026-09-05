### Configure TcX AI Chat and Visual Part Search Monitoring for Customer Tenant for SAM1.0 Based environment

> **Note:** Ignore this cookbook page if you are provisioning a SAM 2.0-based TcX environment.

This process ensures proper metrics collection, application registration, and permissions for AI Chat features.

The next steps assume you will already know the following:

- **Customer SAM account ID number**  
- **Customer ECA ID number**  
- **Production environment access credentials**  

These are the pre-requisites for configuring AI Chat monitoring

- **Customer SAM account**  
  - Is linked to an ECA
  - Has Tenant user as Owner/Administrator
- **Production environment access** 

These are the high-level steps:

- Configure Tenant SAM Account role for metrics publishing  

#### 1. Configure Tenant SAM Account Role for Metrics Publishing

The Customer SAM account must have the appropriate role and permissions to publish AI Chat metrics to the monitoring system.

##### Policy Definition

Provide correct region value in policy, ie: `us-east-1`

```json
{
    "version": "2017-05-11",
    "rules": [
        {
            "effect": "Permit",
            "actions": [
                "uas:serviceprovider.manage"
            ],
            "resources": [
                "sws:::uas::metering::*"
            ]
        },
        {
            "effect": "Permit",
            "actions": [
                "uas:metering.tenant"
            ],
            "resources": [
                "sws:::uas::metering::*"
            ]
        },
        {
            "effect": "Permit",
            "actions": [
                "dss:uploadFileByTicket"
            ],
            "resources": [
                "sws::<REGION>;:dss::ticket::*"
            ]
        },
        {
            "effect": "Permit",
            "actions": [
                "dss:*"
            ],
            "resources": [
                "*"
            ]
        }
    ]
}
```

##### Role Assignment Process

Region | Enviroment | Url |
-------|------------|-----|
us-east-1 | preprod | us-east-1.preprod.teamcenterwebservices.com
us-east-1 | prod | us-east-1.sws.siemens.com
germany-west-1 | preprod | eu-central-1.preprod.teamcenterwebservices.com
germany-west-2 | prod | eu-central-1.sws.siemens.com

###### For Environment where SAM Console is available (Except PROD)

1. **Create user group with name `TcX_AI_Chat_Metrics_Publisher`**
    ![Create Group](./create_group.PNG)
2. **Create policy with name `TcX_AI_Chat_Metrics_Publisher_Policy`**
    ![Create Policy](./policy_create.PNG)
3. **Attach policy definition**
    ![Attach policy](./add_policy_definition.PNG)
4. **Add created group to policy**
    ![Add created group to policy](./add_group_to_policy.PNG)
5. **Add group to user**
    ![Add create group to user](./add_group_to_user.PNG)

###### For Production

To run the following commands, you need `SAM_ACCESS_KEY` and `SAM_SECRET_ACCESS_KEY` from `ActAsRole` postman call. It is not the values you get from `Ansible input file`.

1. Create UTS Policy and Group and Assign to User

For windows
```shell
aws lambda invoke --region us-east-1 --function-name arn:aws:lambda:us-east-1:361500002652:function:tcx_cli:PRD --cli-binary-format raw-in-base64-out --payload '[[\"<SAM_ACCESS_KEY>\",\"<SAM_SECRET_ACCESS_KEY>\",\"us-east-1.sws.siemens.com\"],[\"SetupServiceUser2\",\"<CUSTOMER_SAM_ACCOUNT_ID>\",\"UTS_Policy\",\"TcXUtsAccessPolicy.json\",\"TcX_AI_Chat_Metrics_Publisher\",\"TcXSamAuthUser\"]]' outputfile.txt
```

For linux
```shell
aws lambda invoke --region us-east-1 --function-name arn:aws:lambda:us-east-1:361500002652:function:tcx_cli:PRD --cli-binary-format raw-in-base64-out --payload '[["<SAM_ACCESS_KEY>","<SAM_SECRET_ACCESS_KEY>","us-east-1.sws.siemens.com"],["SetupServiceUser2","<CUSTOMER_SAM_ACCOUNT_ID>","UTS_Policy","TcXUtsAccessPolicy.json","TcX_AI_Chat_Metrics_Publisher","TcXSamAuthUser"]]' outputfile.txt
```

Under the hood of `SetupServiceUser2`, it will create do following steps;

1. Create group with name `TcX_AI_Chat_Metrics_Publisher`
2. Create policy with name `UTS_Policy` and user content as mentioned above
3. Assign policy to group
4. Assign group to existing user `TcXSamAUthUser`

**To verify**

For windows
```shell
aws lambda invoke --region us-east-1 --function-name arn:aws:lambda:us-east-1:361500002652:function:tcx_cli:PRD --cli-binary-format raw-in-base64-out --payload '[[\"<SAM_ACCESS_KEY>\",\"<SAM_SECRET_ACCESS_KEY>\",\"us-east-1.sws.siemens.com\"],[\"sam\",\"GetPolicyId\",\"<CUSTOMER_SAM_ACCOUNT_ID>\",\"UTS_Policy\"]]' outputfile.txt
```

For linux
```shell
aws lambda invoke --region us-east-1 --function-name arn:aws:lambda:us-east-1:361500002652:function:tcx_cli:PRD --cli-binary-format raw-in-base64-out --payload '[["<SAM_ACCESS_KEY>","<SAM_SECRET_ACCESS_KEY>","us-east-1.sws.siemens.com"],["sam","GetPolicyId","<CUSTOMER_SAM_ACCOUNT_ID>","UTS_Policy"]]' outputfile.txt
```

This should return objectID for created policy.

#### Troubleshooting

**Common Issues:**

1. **Metrics API Permission Denied**  
   - Verify the metrics publishing role is correctly attached  
   - Check the trust policy allows the customer SAM account  
   - Ensure the access token has not expired  

2. **Role Assignment Failed**  
   - Ensure ActAsRole is enabled for the customer SAM account  
   - Verify the admin SAM account has sufficient permissions  
   - Check that the role policy syntax is valid  

**Support Contacts:**
- For UTS issues: Contact UTS support team `mohit.mehra.ext@siemens.com` 
- For metrics configuration: Contact monitoring team  
- For SAM role issues: Contact `krishn.mishra@siemens.com` or `sheikh.ahmed@siemens.com`