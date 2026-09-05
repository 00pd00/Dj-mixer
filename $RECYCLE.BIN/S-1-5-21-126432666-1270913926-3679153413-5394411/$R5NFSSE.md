### Configure TcX AI Chat Monitoring

This activity must be done only once per environment per region. Currently, it is enabled in `us-east-1` and `eu-central-1` for `preprod` and `prod`.
This process ensures proper metrics collection, application registration, and permissions for AI Chat features.

The next steps assume you will already know the following:

- **Customer SAM account ID number**  
- **Customer ECA ID number**  
- **UTS application registration details**
  - Service alias 
  - Metric definitions 

These are the pre-requisites for configuring AI Chat monitoring

- **Customer SAM account**  
  - Is linked to an ECA
  - Has Tenant user as Owner/Administrator

These are the high-level steps:

* Register TcX service alias in Production environment in UTS
* Define metrics in Production environment
* Configure Tenant SAM Developer account role for defining metric definition ( Covered in [here](../../../030_Tenant%20Onboarding/010_UTS%20Role%20Assignment.md) )

Service alias will be `tcx` for this feature. If it is required to use different service alias, you can define it, however keep it in mind that, this value has to be used in Tenant onboarding automation, can be found [here](../../../020_Cell%20Onboarding/020_UTS10/010_UTS%20Integration.md)

#### 1. Register TcX service alias in Production environment in UTS

AI Chat feature is using UTS(Usage Tracking Service) to push usage metrics. To enable this, Service has to be defined in UTS.

To create service alias, it is required to communicate with UTS team `<mohit.mehra.ext@siemens.com>` or `amit.pandit@siemens.com`.

Sample mail content;

```text
Topic: Create Service alias and Limit/Metric Definition for TcX AI Chat
Content:

We would like to onboard TcX AI Chat on UTS. Can you move forward and create required service with `tcx` as service alias? You can also find metric/limit definitions attached. Can you also create them?

Regards
```

Note: Metric definitions can be found in [vectordb_request_count.json](./metric_definitions/vectordb_request_count.json), [llm_token_usage.json](./metric_definitions/llm_token_usage.json),  [em_embedding_token_usage.json](./metric_definitions/em_embedding_token_usage.json), [em_inference_token_usage.json](./metric_definitions/em_inference_token_usage.json),
[image_embedding_count.json](./metric_definitions/image_embedding_count.json) and [image_embedding_size.json](./metric_definitions/image_embedding_size.json)

**Support Contacts:**
- For UTS issues: Contact UTS support team `mohit.mehra.ext@siemens.com` or `amit.pandit@siemens.com`
- For SAM role issues: Contact `krishn.mishra@siemens.com` or `sheikh.ahmed@siemens.com`