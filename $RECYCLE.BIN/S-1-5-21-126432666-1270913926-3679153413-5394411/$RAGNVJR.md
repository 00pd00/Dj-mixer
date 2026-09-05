## Enable Admin Console to Assign Users Using Managed-Product Info API

To enable the Admin Console for Teamcenter X customers, you must call the `POST /v1/managed-product/info` API.

---

### 1. Get Entitlement Service Credentials from Vault

- Access the designated secrets in the XCR vault located at:
  ```
  shared/acis/<ACIS_Environment>
  ```
- Retrieve the `ssc_api_client_id` and `ssc_api_client_secret` values.

  ![Image showing vault secrets](./image_311.png)

---

### 2. Generate Access Token

You will need to generate an access token using Postman with BAS SWS credentials before calling the `POST /v1/managed-product/info` API.

#### Steps to generate the `access_token`:

1. In Postman, create a POST request using the appropriate Authorization Token URL:

   | Environment    | Authorization Token URL                                            |
   | -------------- | ------------------------------------------------------------------ |
   | pre-production | https://lds-pre-prod.auth.us-east-1.amazoncognito.com/oauth2/token |
   | production     | https://lds-prod.auth.us-east-1.amazoncognito.com/oauth2/token     |

2. In the request body, select "x-www-form-urlencoded" and add these keys and values:
    ```
    grant_type: client_credentials
    client_id: <ssc_api_client_id>
    client_secret: <ssc_api_client_secret>
    ```
   - Replace `<ssc_api_client_id>` and `<ssc_api_client_secret>` with the actual values from the vault.
   - Example:

     ![Image showing Postman token request](./image_312.png)

3. Click "Send".
4. Copy the `access_token` from the response body.

    ![Image showing Postman token response](./image_314.png)

---

### 3. Call `POST /v1/managed-product/info`

Reference: API specification for `/v1/managed-product/info`.

#### Steps to call `POST /v1/managed-product/info`:

| Environment     | Entitlement Service URL                        |
| --------------- | --------------------------------------------- |
| pre-production  | https://api.preprod.bas.sws.siemens.com       |
| production      | https://api.bas.sws.siemens.com               |

1. In Postman, create a POST request to the Entitlement Service URL and append `/v1/managed-product/info`.

   ![Image showing URL entry](./image_315.png)

2. Go to "Authorization".

   ![Image showing authorization selection](./image_316.png)

3. Choose Auth Type "Bearer Token".

   ![Image showing Bearer Token selection](./image_317.png)

4. Paste the copied `access_token` in the Token box.

   ![Image showing token entry](./image_318.png)

5. In the body section, enter your request payload. Update the parameters with correct values:

    ```json
    {
      "ecaId": "<Replace_ECA_ID>",
      "sku": "<Replace_product_sku_id>",
      "region": "<Replace_tenant_deployement_region>",
      "version": "<Replace_teamcenter_version>",
      "isConfigurationComplete": true
    }
    ```

| No. | Parameter   | Value Description                                 | Example                                             |
|-----|-------------|---------------------------------------------------|-----------------------------------------------------|
| 1   | ecaId       | Enterprise Cloud Account Id of the tenant         | 500071775                                           |
| 2   | sku         | Product SKU number                                | TC7003-XT (Use SKU according to product type)       |
| 3   | region      | Tenant environment deployment region              | us-east-1 (Refer below table for accepted regions)  |
| 4   | version     | Teamcenter version for the tenant environment     | 2506                                                |


- **Accepted Region values in the API Request body**

   The table below shows the mapping between **AWS/Azure tenant regions** and the corresponding **FDS supported region**.
   Identify the tenant deployment region and use the mapped **FDS Supported Region** in the API request body.

   | Tenant Region (AWS / Azure)                      | FDS Supported Region    |
   | :----------------------------------------------- | :---------------------- |
   | Americas                                         | `us-east-1`             |
   | Europe and United Kingdom                        | `eu-central-1`          |
   | Asia-Pacific, Australia, Middle East and Africa  | `ap-northeast-1`        |


   ![Image showing Postman body](./image_319.png)

6. Send the request and check for a `201 Created` status code and the expected response.

---

After a successful API call, Teamcenter X product access and the "Assign User" feature will appear in the Admin Console. This enables Admin Console access for the entitlement, allowing customers to add users.

![Image showing Assign User button](./image_320.png)
![Image showing Admin Console](./image_321.png)
