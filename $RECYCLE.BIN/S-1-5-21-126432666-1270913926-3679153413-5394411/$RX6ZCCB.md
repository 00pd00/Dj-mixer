### Upload License File to Common Storage Account

**Note:** These steps apply to the Azure cloud provider.

#### 1. Access the Tenant's Storage Account in Azure Portal

- Go to the **Azure Portal**.
- Navigate to the resource group: `tcx-tenant-[CustomerID]-common-rg`.
- Open the tenant’s storage account (for example: `tcxtneh2514cm01saf81`).
- Go to **Networking** and select **Manage**.

  ![Access Networking in Azure Storage Account](image_331.png)

#### 2. Add Your Client IPv4 Address

- Click on **Add your client IPv4 address**.
- Click **Save** to apply the changes.

  ![Add Client IPv4 Address](image_332.png)

#### 3. Upload the License File

- Go to **Containers** in the storage account.
- Open your tenant’s **Common Container**.
- Click **Upload** and select your license file to upload.

  ![Upload License File](image_330.png)