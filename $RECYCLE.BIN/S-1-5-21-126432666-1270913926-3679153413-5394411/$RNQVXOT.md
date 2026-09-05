## SMTP Configuration and DMARC/SPF Validation

**Note: Please note that user needs to perform below section on an environment created using the SMTP credentials created in Creating SMTP Credentials section. DMARC SPF and DKIM needs to be in verified state in order to perform this section.**

### Validation of SMTP configuration on Active Workspace

To set up SMTP server to comply with DMARC, DKIM and SPF, user need to follow below steps:

1. Login to Customer's Active Workspace console as Active Admin

![Image](./image_121.png)

2. Navigate to Preferences

3. Search for email as shown in below screenshot

![Image](./image_122.png)

4. User needs to check below parameters:
   
   a. **Check for Mail_OS_From_Address:** Ensure that the value is set as this would be the email address from where user will be receiving the emails

![Image](./image_123.png)
   
   b. **Mail_server_name:** Mail server name consists of aws region. Ensure that this is the same region in which your domain name is created and verified. Eg. us-east-1

**Note: User needs to provide the same region which was provided earlier in creating SMTP Credentials section.**

![Image](./image_124.png)

### Validation of DMARC/SPF configuration

### Domain Verification

1. Login to AWS Console

2. In AWS console, select the region where user wants to use SES (e.g., us-east-1)

**Note: User needs to provide the same region which was provided earlier in creating SMTP Credentials section.**

3. Navigate to the Amazon Simple Email Service Management Console.

![Image](./image_125.png)

4. Now as shown in below screenshot, select identities

![Image](./image_126.png)

5. Select Domain for which you want to validate

![Image](./image_127.png)

Once domain is verified, Identity Status will be displayed as **verified** as mentioned below:

![Image](./image_128.png)

### DKIM Verification

Similarly, when DKIM is verified, DKIM configuration status will be displayed as **Successful**:

![Image](./image_129.png)

### Mail From Domain(SPF) Verification

Similarly, when Mail from Domain is verified, Mail From Domain configuration status will be displayed as **Successful**:

![Image](./image_130.png)

### Validation of Internet Headers of an email

Once DKIM and Custom Mail from Domain is verified and SMTP configuration is also done on active workspace console, user needs follow below steps to validate the internet headers of an email.

**Note: To receive an email, make sure that email address for user is on which user will receive an email. Also ensure that you are using a workflow which will notify upon changes in workflow state.**

User needs to follow below steps to validate internet headers of an email:

1. Login to Active Workspace console as an Author

![Image](./image_131.png)

2. Go to Folders and create an item with an attachment or use existing item with attachment

![Image](./image_132.png)

3. Click on **Manage** and then click on **Submit to Workflow**:

![Image](./image_133.png)

4. Now select **All** and then choose appropriate workflow that will notify after submitting to the workflow

![Image](./image_134.png)


![Image](./image_135.png)

5. After submitting to the workflow, user will receive a notification on the email address attached to the user.


6. User needs to open the email received:

![Image](./image_136.png)

7. Ensure that mail address that is received does not include **"via amazonses.com"**. This means that email has been received from a verified domain and the sender is verified

8. Now click on **File**

![Image](./image_137.png)

9. Navigate to **Properties**

![Image](./image_138.png)

10. Copy the Text contents present inside the internet headers to notepad

![Image](./image_139.png)

11. Search for **SPF**, **DKIM** and **DMARC** and it should be in **pass** state as displayed in below:

![Image](./image_140.png)