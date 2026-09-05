##### Create preshared-key in vault for management plane

This key establishes a SiteToSite connection with the Management Plane in AWS.

1. Log in to Vault UI using ROOT TOKEN

2. Select `Secrets Engines` in the left navigationbar, navigate to `secret/connectivity` in the main area.

    ![Image](./image_143.png)

3. Click on `Create secret +`. Append your cell ID to the secret path:
    ![Image](./image_145.png)

4. Under `Secret data`, replace `key` with string "management_plane_s2s_preshared_key". The value should be any alphanumeric string without any special characters. You can use below command in bash to generate a value:

    ```sh
    openssl rand -hex 15
    ```

    For example:
    ![Image](./image_146.png)

5. Click `Save`.
