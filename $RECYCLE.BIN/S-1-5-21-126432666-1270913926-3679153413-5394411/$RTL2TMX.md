### Creating SMTP Credentials

**Create an IAM user for sending emails in the AWS account where SES identity will be created and in the region where SMTP server is present. The default region for SMTP server is Eu-West-1.**

**Note: If you use any region other than the default region, user needs to change all the occurrences of region used for DMARC, SPF, DKIM enablement process.**

1. Go to https://eu-west-1.console.aws.amazon.com/console/home?region=eu-west-1#

2. Navigate to the IAM console

3. In the IAM dashboard, click on **"Users"** in the left-hand navigation pane.

4. Click the **Create user** button.

5. Enter a username for the IAM user. Eg: `smtp_prog_user`

6. Click the **Next** button.

7. On the Tags section, add a tag with the key **EMAIL** and value `<admin_email_id>`.

9. Click on the **Create user** button.

10. Go to the user-created above and create an inline policy with as below:
    ```json
    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Effect": "Allow",
                "Action": "ses:SendRawEmail",
                "Resource": "*"
            }
        ]
    }
    ```

![Image](./image_98.png)

11. Go to the **Security credentials** tab and to the **Access keys** section then generate credentials, and download the CSV file in a safe place as it contains an access key and secret access key to be used to send mail by all TeamcenterX customers.

**Note: Please note that the SMTP username is the AWS access key ID you have generated in above step, so you only need to generate the SMTP password.**

## Generate SMTP password

**Note: Your AWS secret access key is not your SMTP password and is different from your AWS secret access key. You need to follow below steps to generate your SMTP password.**

1. To generate the SMTP password, user needs to run the python script that converts an AWS secret access key to an SES SMTP password.

2. Follow the Python script instructions mentioned in the AWS document https://docs.aws.amazon.com/ses/latest/dg/smtp-credentials.html#smtp-credentials-convert

3. While executing the Python script pass the secret access key downloaded from the section Creating SMTP Credentials and region should the same region where the SES identity is created and SMTP server is present

4. After execution of python script user will be provided with the SMTP password as shown in below image

![Image](./image_141.png)

**Note: You need to provide the above generated SMTP password as input to SMTP password parameter while starting the deployment pipeline.**

