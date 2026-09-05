
##### Get Access to AWS Kits S3 Bucket, Route 53 for TcX Tenant Administrative Account (Internal Development)

To get access to AWS kits S3 bucket for TcX Tenant Administrative Account. Access to these AWS services is required to deploy any customer.

Drop a mail to the deploy Ops team as mentioned below:

| Field | Content |
|-------|---------|
| To | deployops.tc.lcs.disw@internal.siemens.com |
| CC | yuvraj.chaudhari@siemens.com; pravin.magdum@siemens.com |
| Subject | TCX: Require access to the AWS kits S3 bucket (dev) |
| Body | Provide me access to the AWS kits S3 bucket (dev) for account [Account ID] to access "tcx-release-management-dev" bucket. | 

Where `<AWS Account ID>` is the Ops team one-time account ID (NOT CUSTOMER AWS ACCOUNT ID) which will be used for all customer installations to get access to the production AWS services (resources).

In response to the aforementioned email, you will be sent a confirmation that access has been granted.

1. Open the command prompt and set the credentials of TcX Tenant Administrative Account by running:
    ```bash
    aws configure
    aws sts assume-role --role-arn arn:aws:iam::593713585809:role/access_addaccount_lambda_2 --role-session-name AWSCLI-Session --duration-seconds 3600 --region us-west-1 --external-id <<external ID you got when you requested access to the IAM Role>>
    ```
    This provides the details of the access key, secret access key, and tokens. Please record these values.

2. Open a new command prompt and use the below command to get access to the S3 bucket, Route 53, and AMIs for the customer account:
    ```bash
    SET AWS_ACCESS_KEY_ID=<Access key got from above command>
    SET AWS_SECRET_ACCESS_KEY=<Secret Access key got from above command>
    SET AWS_SESSION_TOKEN=<Access Token got from above command>
    SET AWS_REGION=us-west-1
    ```

3. Invoke the lambda on the same command prompt where environment variables are set in step 2 (note that credentials expire after some time so you may need to repeat step 1 again if credentials in step 1 are expired):
    ```bash
    aws lambda invoke --function-name add_customer_account --cli-binary-format raw-in-base64-out --payload "{\"account_id\": \"<Customer Account ID>\", \"tcx_version\": \"8.3\", \"env_type\": \"pv\"}" response-pv.json --region us-west-1
    ```
    Here `<Customer Account ID>` is the customer account ID where the customer is deployed.

4.  Once the command is executed there will be one file "response-pv.json" created at the location from where it is being executed. Open that file and it will provide below details. Please record these values; these details will be required during the deployment:
```json
Output { 
  "statusCode": 200, 
  "body": { 
    "Status": "Successfully added customer account", 
    "data": { 
      "S3": { 
        "bucket_name": "tcx-release-management-dev", 
        "bucket_region": "us-east-1" 
      }, 
      "AMI": [ 
        { 
          "ami_id": "ami-08ce7a6bXXXXXXXXX", 
          "ami_type": "windows" 
        }, 
        { 
          "ami_id": "ami-089d154acXXXXXXXXX", 
          "ami_type": "linux" 
        } 
      ], 
      "Route53": { 
        "DNSRoleARN": "arn:aws:iam::XXXXXXXXX:role/IAMForTestplmcloudsolutions-Route53Role-2", 
        "DNSHostedZoneID": "Z1CNJUMXXXXXXXXX", 
        "DNSHostName": "cloud.teamcenter.com" 
      } 
    } 
  } 
}
```

5. In regard to configuring the IAM role `IAMForTestplmcloudsolutions-Route53Role-2` in variables, you will also need the ExternalID. Make use of the same ExternalID you received as part of [Get Access to AWS Kits S3 Bucket, Route 53 for TcX Tenant Administrative Account (Internal Development)](#get-access-to-aws-kits-s3-bucket-route-53-for-tcx-tenant-administrative-account-internal-development).

6. Take a note of the DNSHostedZoneID from the response.json-pv, your cell.yml file should have the DNSHostedZoneID mentioned above output. For more details check [Route 53 values](./070_Route%2053%20values.md).

Note: Ignore linux and the windows AMI values from above output 