# Viewing Deploy Pipeline Output

When your deploy pipeline completes successfully (all stages indicated in green), you can review the deployment’s output by following these steps:

## How to Access the Pipeline Output

1. Click the **Pipeline** link for your deploy pipeline.
2. Select the **post-deploy** stage.

    ![Post Deploy Stage](./image_158.png)

3. In the logs, search for **"share pipeline output file"**. The last task in this step will display an **Output File** link.

    ![Image](./image_159.png)

4. Click the Output File link. You will be redirected to the Output file in the Tenant Repository.
5. Ensure you are logged in to **Vault** and to your cloud provider (**AWS** or **Azure**, depending on your environment) before accessing any links in the output file.