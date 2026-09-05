### Create an IAM User in AWS Account
*** Note that these steps are applicable for each deployment.*** 

1. Login to AWS account and create an IAM user (e.g. AIChatUser1).
    a. While creating IAM user, do not set any permissions. Click on Next without adding any permissions. ![User Permissions](image201.png)
    b. Add a tag "EMAIL" with the value as your email and click n Finish.  ![Email Tag](image202.png)
2. Record the ARN of this user (e.g. *arn:aws:iam::111111111111:user/AIChatUser1*) – this is required in pipeline inputs.
3. Create **AccessKey** and **SecretAccessKey** for this user:

    a. In Users page, go to ‘Security Credentials’, scroll down and click on ‘Create access key’.
    b. Select **Application running outside AWS** for your use case.   
    c. Record the value of AccessKey and SecretAccessKey – this is required in pipeline inputs.
**NOTE**: This AccessKey and SecretAccessKey needs to be rotated as per CSO policy set in place, by following credential rotation steps mentioned [here](../../060_Maintenance/010_Credentials%20Rotation/010_AWS/010_IAM%20User%20credentials.md)
