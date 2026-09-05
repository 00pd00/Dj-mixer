### SES Server Validation

Validate the setup from an EC2 Linux shell using the following procedure:

1. Obtain the username and password from the `credentials.csv` file downloaded in a previous step.
2. Base64 encode both username and password using the command below:
    ```bash
    echo -n "<value>" | openssl enc -base64
    ```
3. Create a file `mail.txt` with the following content, replacing the base64-encoded username and password with the values created in the previous step. The recipient email can be any email address (this assumes that the Sandbox restrictions have been lifted per the instructions above. If this is not the case, the recipient email must first be verified with AWS, see [https://console.aws.amazon.com/ses/home?region=eu-west-1#verified-senders-email](https://console.aws.amazon.com/ses/home?region=eu-west-1#verified-senders-email)):

    ```
    EHLO siemens.com
    AUTH LOGIN
    <<BASE64_ENCODED_USERNAME>>
    <<BASE64_ENCODED_PASSWORD>>
    MAIL FROM: test@cloud.teamcenter.com
    RCPT TO: <<RECIPIENT_EMAIL>>
    DATA
    From: Test <test@cloud.teamcenter.com>
    To: <<RECIPIENT_EMAIL>>
    Subject: Amazon SES SMTP Test

    This message was sent using the Amazon SES SMTP interface.
    .
    QUIT
    ```

4. Issue the following command:
    ```bash
    openssl s_client -crlf -quiet -starttls smtp -connect email-smtp.eu-west-1.amazonaws.com:587 < mail.txt
    ```

If the email is accepted by Amazon SES, you should see a multi-line response ending with a line similar to:
```
250 Ok 010001727bf05c7f-8ff7cc5f-aea3-4284-91ea-51f2f82c4469-000000
```
shortly followed by a timeout due to user inactivity. The test email should arrive in the recipient inbox shortly after.

