## Setting up Identity in AWS Simple Email Service (SES) Console

**Note: Preferably do following steps in working session with TcX development team for faster results. Otherwise if the records are sent to TcX development team after performing the below steps, it may take up to 72 hours to reflect.**

1. Login to AWS Console

2. In AWS console, select the region where user needs to set up DMARC SPF and DKIM in SES identity setup for domain. (e.g., us-east-1)

**Note: User needs to provide the same region which was provided earlier in creating SMTP Credentials section.**

3. Navigate to the Amazon Simple Email Service Management Console.

![Image](./image_105.png)

4. Now as shown in below screenshot, select identities

![Image](./image_106.png)

5. Now to verify domain, user first need to create an identity

![Image](./image_107.png)

6. As shown in below screenshot, select domain and add domain name. eg. For DMARC dry-run, use `testplmcloudsolutions.com` and for production, use `cloud.teamcenter.com`
![Image](./image_108.png)

![Image](./image_109.png)

7. Once above mentioned details have been filled up, follow the next steps for verification of domain

## Verification of Domain

After adding the domain, user needs to enable DKIM and SPF. SPF is set when the Custom Mail From Domain is configured in AWS SES management console under identities.

### Enabling SPF by setting up Custom Mail From Domain

1. Once user has filled up the details related to domain, Check the option for **Use a custom Mail From Domain**
![Image](./image_110.png)

   **Note: There are different identities setup across different regions and different accounts, hence we need to add standard prefix for account as well as regions.**
   
   Similarly for different accounts, custom mail from domain address should be: `<sub-domain>-<aws-account_alias>-<aws-region-name>.<domain name>`.
   
   **Example:** `tcx-prod-deployment-account-1-us-east-1.cloud.teamcenter.com`

![Image](./image_111.png)   

2. Select Behavior on MX failure as **Use default MAIL FROM domain**

![Image](./image_112.png)

3. Unselect the **Publish DNS records to Route53** (Ignore this step if Publish DNS records to Route53 is not available in your account)

4. Download the `.csv` record set file for SPF. This file needs to be shared with TcX development team
![Image](./image_113.png)

   **Note: Please keep this file handy as user needs to share this record set file with TcX development team. Refer to point number 8 of below section.**

### Set up DomainKeys Identified Mail (DKIM)

1. After filling up the domain related details, under verifying your domain section, user needs to do DKIM-based Domain verification by adding below details

2. Under Advanced DKIM Settings, select Identity Type as **Easy DKIM**

![Image](./image_114.png)

3. Select DKIM signing key length as **RSA_2048_BIT**

![Image](./image_115.png)

4. Ensure that **Publish DNS records to Route53** is **UNCHECKED**. (Ignore this step if Publish DNS records to Route53 is not available in your account)

![Image](./image_116.png)

5. Make sure **DKIM signatures** is **Enabled**

![Image](./image_117.png)


![Image](./image_118.png)

6. Download the `.csv` record set file for DKIM and SPF

7. To Publish DNS records to Route53, Please contact the TcX development team (`abhijeet.godase@siemens.com`;`bantu.rajesh@siemens.com`)

8. Drop a mail to get records added to domains as mentioned below:

   | Field | Value |
   |-------|-------|
   | **To** | `abhijeet.godase@siemens.com`;`bantu.rajesh@siemens.com` |
   | **Mail Subject** | `TCX: Add DMARC & SPF records to the <DOMAIN_NAME> hosted zone` |
   | **Mail Body** | `Add the DMARC & SPF record sets to the <DOMAIN_NAME> hosted zone` |
   | **Attachment** | CSV files downloaded |

**Note: User needs to change value of `<DOMAIN_NAME>` with the their own domain name.**

After email confirmation on addition of all the DNS records (both DKIM and SPF), wait for domain verification to get completed as domain verification process may take up to 72 hours.

**DO NOT PROCEED AHEAD UNLESS YOUR DOMAIN, DKIM, CUSTOM MAIL FROM DOMAIN IS IN VERIFIED STATE AS SHOWN IN BELOW SCREEN SHOTS:**
![Image](./image_119.png)

![Image](./image_120.png)