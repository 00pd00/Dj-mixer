
##### Enable Resource Providers

Ensure Contributors role is [active in PIM](../../../../../../CTCX-Intro/010_Containerized%20TcX%20Architecture%20Overview/020_AZURE/030_Activating%20Roles%20and%20Groups%20via%20PIM.md).
Open a Bash Cloud Shell in Azure. Execute below commands.

1. Set the subscription

    ```bash
    az account set --subscription $AZURE_SUBSCRIPTION_ID
    ```

    **Note:** If you encounter the error `Subscription does not exist in cloud AzureCloud`, restart your terminal.

2. Enable resource providers 

```bash
az provider register --namespace Microsoft.Storage
```
