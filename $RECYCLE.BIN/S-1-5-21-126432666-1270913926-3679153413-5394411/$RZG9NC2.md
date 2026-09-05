# Adding a new tenant environment in the VPN

This guide walks you through adding a new tenant environment to use the same VPN configured already via steps [Setup VPN from tenant env deployment](./210_Setup%20VPN%20between%20tenant%20deployment%20and%20customer%20site.md)

---

## Prerequisites

- Deploy the VPN as guided on [Setup VPN from tenant env deployment](./210_Setup%20VPN%20between%20tenant%20deployment%20and%20customer%20site.md)

---

## Update and re-run the scripts

1. Clone the `tcx-pipeline-account` repo:

    ```bash
    git clone git@gitlab.industrysoftware.automation.siemens.com:tcx-deploy/tcx-pipeline-account.git
    ```

2. Check out the `main` branch:

    ```bash
    cd tcx-pipeline-account
    git checkout main
    ```

3. Navigate to the `scripts` folder over any editor.

   ```bash
   cd scripts
   ```

4. Update below values under `12_vpn_infra_vars.env`:

   | Variable | Description |
   | --- | --- |
   | `TENANT_ENV` | New tenant environment which needs VPN connection (`dev`, `uat`, `nonprod`, `prd`) |

   For rest of the parameters, use the values configured while following [Setting Up a Site-to-Site VPN for a Tenant Environment in Azure](./210_Setup%20VPN%20between%20tenant%20deployment%20and%20customer%20site.md) to setup the VPN for the first time.

5. Zip all files in the `scripts` folder:

    ```bash
    cd ..
    tar -czvf scripts.tar.gz scripts/
    ```

6. Open a Bash Cloud Shell in Azure. Upload `scripts.zip`.

   ![Image](./image_210_24.png)

7. Unzip the scripts and make them executable.

    ```bash
    tar -xzvf scripts.tar.gz
    dos2unix scripts/*.sh
    chmod +x scripts/*.sh
    cd scripts
    ```

8. Execute `12_deploy_tenant_vpn_infra.sh` to deploy the vpn infra.

   ```bash
   ./12_deploy_tenant_vpn_infra.sh
   ```

   Wait for the script to complete. It will take around 10-15 minutes.

9. Check the peering from vpn-vnet (`tcx-tenant-<tenant id>-common-vpn-vnet`) to tenant-vnet (`tcx-tenant-<tenant id>-<env>-vnet`):

   ![peering vpn to tenant](image_210_34.png)

   Check the flags:

   ![peering details](image_210_35.png)

10. Check the peering from tenant-vnet (`tcx-tenant-<tenant id>-<env>-vnet`) to vpn-vnet (`tcx-tenant-<tenant id>-common-vpn-vnet`):

   ![peering tenant to vpn](image_210_32.png)

   Check the flags:

   ![peering details](image_210_33.png)

---

## Step 2: Configure NAT Rule for the new tenant env (Recommended, Optional)

1. Go back to the resource group and select the Virtual Network Gateway:  
   `tcx-tenant-<tenant id>-common-vpn-vgw`
2. In the sidebar, go to **Settings → NAT rules**.
3. To add NATing for tenant env network, add a new NAT rule with:
   - **Name**: `<tenant-env>`
   - **Type**: `Static`
   - **Mode**: `EngressSNAT`
   - **Internal Mappings**: (Tenant env address space)
   - **Internal/External port mappings**: (Leave as default)
   - **External Mappings**: (This can be any slice calculated above from the carrier grade NAT IP range `100.127.128.0/17`,  eg `100.127.128.0/25`.

   _Sample NAT config:_

   ![NAT Rule](./image_210_13.png)

4. Click **Save**, then **Confirm**.

---

## Step 3: Setup routing in tenant vnet

These steps ensure the traffic to the vpn goes via the firewall.

1. Navigate to the resource group `tcx-tenant-<tenant id>-<env>-rg` and select `tcx-tenant-<tenant id>-<env>-priv-snet-rt` from `Overview`.
2. Select `Routes` from the left navigation.
3. Add a route for **each customer site**:

   - **Route name**: `to-<customer-site>-via-firewall`
   - **Destination type**: `IP Address`
   - **Destination IP addresses/CIDR ranges**: (NAT cidr of the customer network as entered in the NAT rules on Virtual Network Gateway as performed on `Step 2.3` of [Setup VPN from tenant env deployment](./210_Setup%20VPN%20between%20tenant%20deployment%20and%20customer%20site.md))
   - **Next hop type**: `Virtual appliance`
   - **Next hop address**: (Private IP of the firewall)

   ![add route](image_210_27.png)

4. Save the rule.

---

## Step 4: Update firewall policy rules

Update the firewall policy to allow egress/ingress as insructed on [Step 6: Update firewall policy rules](./210_Setup%20VPN%20between%20tenant%20deployment%20and%20customer%20site.md#step-6-update-firewall-rule)
