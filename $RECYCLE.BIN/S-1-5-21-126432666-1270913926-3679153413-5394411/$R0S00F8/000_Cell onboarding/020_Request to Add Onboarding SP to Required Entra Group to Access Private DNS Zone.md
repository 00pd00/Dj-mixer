# Submit a request to add the onboarding SP to the required Entra group for Private DNS Zone access

Follow the steps below to submit the request:

1. Open the [Approval Workflow for Azure Subscription](https://teams.microsoft.com/l/entity/7c316234-ded0-4f95-8a83-8453d0876592/approvals/?context=%7B%22subEntityId%22%3A%220M8KTZX7YZETRG5VY3JJBJG21PFCTEXE71WSBN2FNQDB8BGMJQANMW6MGKME50JP9YZMKEMBYA5W5N0%3A%3AshareLink%3A%22%7D).

2. Enter the following details in the approval request form:

   - Title: `Add onboarding SP <onboarding_sp_name> to Entra group <name_of_onboarding_entra_group_shared_in_fds_request> for Private DNS Zone access`
   - Subscription: `I need onboarding SP <onboarding_sp_name> added to group <name_of_onboarding_entra_group_shared_in_fds_request>`
   - What activity will you do?: `I would like to test Private DNS Zone integration`
   - What is your SPLM ID?: `App registration ID (onboarding SP): <application_id_of_onboarding_sp>`
   - Anything else?: `The SP needs to be added to group ID: <object_id_of_onboarding_entra_group_shared_in_fds_request>`

3. Use the sample request image below for reference:

   ![Sample Request](./030_Image%20of%20Sample%20Request.png)

