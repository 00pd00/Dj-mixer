# Setting Up a Site-to-Site VPN for a Tenant Environment in Azure

This guide walks you through establishing a Site-to-Site VPN connection from a tenant deployment in Azure (via TcX) to another environment. These instructions are suitable for both technical operators and end users.

Sample configuration followed here:

![Sample VPN Config](./image_210_23.png)

---

## Prerequisites

Before you begin, gather the following information from the customer:

- Public IP address or Fully Qualified Domain Name (FQDN) for their gateway
- On-prem Network address space (CIDR block) (Should be as small as possible, at max /28, to reflect only the essential on-prem infra)
- VPN device vendor (optional)
- VPN device family (optional)
- VPN device firmware version (optional)

---

## Step 1: Deploy VPN infra

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

4. Set valid values for environment variables related to your tenant in `12_vpn_infra_vars.env`. Refer below table for details:

   | Variable | Description |
   | --- | --- |
   | `TENANT_ENV` | Tenant environment (`dev`, `uat`, `nonprod`, `prd`) |
   | `TENANT_ID` | Tenant identifier |
   | `SUBSCRIPTION_ID` | Azure subscription ID |
   | `LOCATION` | Azure region (for example: `eastus`, `germanywestcentral`, `centralus`) |
   | `ADDRESS_SPACE` | Next available /25 CIDR from `10.24.224.0/19` address space for VPN deployment. Refer below note to get list of already used CIDRs |
   | `TAG_ACCOUNT_OWNER` | Account owner email |
   | `TAG_INTENT` | Purpose of the resources, eg `Production`, `dryrun` etc. |
   | `CLUSTER_NAME` | Cluster name for tagging and auto peering |

   _Note: To find already used CIDRs in the range 10.24.224.0/19, use below query in [Resource Graph Explorer](https://portal.azure.com/?feature.msaljs=true#servicemenu/Microsoft_Azure_Resources/ResourceManager/resourcegraphexplorer):_

   ```resources
   resources
   | where ['type'] == "microsoft.network/virtualnetworks"
   | where ['subscriptionId'] == "<subscription-id>"
   | mv-expand properties['addressSpace']['addressPrefixes']
   | extend properties_addressSpace_addressPrefixes = tostring(properties_addressSpace_addressPrefixes)
   | where ipv4_is_in_range(properties_addressSpace_addressPrefixes, "10.24.224.0/19")
   | project name, resourceGroup, properties_addressSpace_addressPrefixes
   | order by properties_addressSpace_addressPrefixes asc
   ```

5. Zip all files in the `scripts` folder:

    ```bash
    cd ..
    tar -czvf scripts.tar.gz scripts/
    ```

6. Open a Bash Cloud Shell in Azure. Upload `scripts.zip`.

   ![Image](./image_210_24.png)

7. Open a Bash Cloud Shell in Azure . Upload `scripts.zip`.  

   ![Image](./image_210_24.png)

8. Unzip the scripts and make them executable.

    ```bash
    tar -xzvf scripts.tar.gz
    dos2unix scripts/*.sh
    chmod +x scripts/*.sh
    cd scripts
    ```

9. Execute `12_deploy_tenant_vpn_infra.sh` to deploy the vpn infra.

   ```bash
   ./12_deploy_tenant_vpn_infra.sh
   ```

   Wait for the script to complete. It will take around 40-45 minutes.

   ![Image](./image_210_25.png)

10. Check the vpn infra deployed in `tcx-tenant-<tenant id>-common-rg`.

   ![resources deployed](./image_210_26.png)

11. Check the peering from vpn-vnet (`tcx-tenant-<tenant id>-common-vpn-vnet`) to tenant-vnet (`tcx-tenant-<tenant id>-<env>-vnet`):

   ![peering vpn to tenant](image_210_34.png)

   Check the flags:

   ![peering details](image_210_35.png)

12. Check the peering from tenant-vnet (`tcx-tenant-<tenant id>-<env>-vnet`) to vpn-vnet (`tcx-tenant-<tenant id>-common-vpn-vnet`):

   ![peering tenant to vpn](image_210_32.png)

   Check the flags:

   ![peering details](image_210_33.png)

---

## Step 2: Configure NAT Rule for the Virtual Network Gateway (Recommended, Optional)

Setting up Ingress and Egress SNAT segregates the customer and tenant network configurations in Azure, preventing IP conflicts. You can configure NAT for both networks within Azure using an address block from the Carrier Grade NAT range `100.64.0.0/10`. The recommended range is `100.127.0.0/16`, though you can select a different block based on customer requirements. Recommended breakup of this CIDR:

   - Ingress SNAT: 100.127.0.0/17 - Represents the customer site's network. You can break it down further to represent the customer env.
   - Egress SNAT: 100.127.128.0/17 - Represents the tenant network deployed in Azure. You can break it down further to represent each tenant env, for eg, if a tenant has 3 env, you can represent them as:
     - prd1: 100.127.128.0/25
     - prd2: 100.127.128.128/25
     - prd3: 100.127.129.0/25

1. Go back to the resource group and select the Virtual Network Gateway:  
   `tcx-tenant-<tenant id>-common-vpn-vgw`
2. In the sidebar, go to **Settings → NAT rules**.
3. Add NATing for customer network with:
   - **Name**: `<customer-site>`
   - **Type**: `Static`
   - **Mode**: `IngressSNAT`
   - **Internal Mappings**: (Customer network address space. Keep this block as small as possible to cover necessary infra required for cTcX to communicate, eg /28)
   - **Internal/External port mappings**: (Leave as default)
   - **External Mappings**: (This can be any slice from the carrier grade NAT IP range `100.127.0.0/16`,  eg `100.127.0.0/28`.

   _Note: If a customer has multiple sites, repeat this step for each site by assigning each a different NAT address_
4. To add NATing for tenant env network, add a new NAT rule with:
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

## Step 3: Configure the Local Network Gateway

This represents the customer site's network in Azure. If a customer has multiple sites, create a Local Network Gateway per site:

1. Return to the tenant’s common resource group:  
   `tcx-tenant-<tenant id>-common-rg`
2. Click **+ Create** at the top.

   ![Create Button](./image_210_1.png)

3. In the Marketplace, search for **Local network gateway**.  
   Select **Create → Local network gateway**.

   ![Local Network Gateway](./image_210_4.png)

4. Complete the form:
   - **Region**: (Same as tenant deployment region)
   - **Name**: `tcx-tenant-<tenant id>-common-vpn-lgw`
   - **Endpoint**: (`IP Address/FQDN` provided by customer)
   - **IP address/FQDN**: (Public address/FQDN of the Gateway hosted at customer's site)
   - **Address Space(s)**: (The NATed Address space of the network at customer's site as configured in `Step 2.3`)

   ![Local Network Gateway Form](./image_210_5.png)

5. Click **Next: Advanced >**, set **Configure BGP settings** to `No`.
6. Select **Next: Review + create >**, then **Create**.

---

## Step 4: Create the VPN Connection

The `Connection` will connect the Virtual Network Gateway and the customer site represented by Local Network Gateway. Create a `Connection` per `Local Network Gateway`:

1. In the Virtual Network Gateway, go to **Settings → Connections**, then click **+ Add**.

   ![Add Connection](./image_210_7.png)

2. Fill in the following:
   - **Connection type**: `Site-to-Site(IPsec)`
   - **Name**: `tcx-tenant-<tenant id>-common-to-customer-conn`
   - **Region**: (Same as tenant deployment region)

   ![Connection Form](./image_210_8.png)

3. Click **Next: Settings >** and complete the settings:
   - **Virtual network gateway**: (Select `tcx-tenant-<tenant id>-common-vpn-vgw`)
   - **Local network gateway**: (Select `tcx-tenant-<tenant id>-common-vpn-lgw`)
   - **Authentication Method**: `Shared Key (PSK)`
   - **IKE Protocol**: `IKEv2`
   - **IPsec / IKE policy**: (Use `Custom` to specify fine-grained IPSec/IKE parameters, else leave as `Default`)
   - **Ingress NAT Rules**: (Select `<customer-site>`)
   - **Egress NAT Rules**: (Select `<tenant-env>`)
   - _Leave the rest as defaults._

   ![VPN Connection Settings](./image_210_9.png)

4. Click **Next: Tags >**, add the tags as per the earlier table, then select **Next: Review + create >** and **Create**.
5. Wait for the deployment to complete.  
   Once done, click the connection resource link.

   ![Connection Resource](./image_210_10.png)

6. In the connection object, select **Download configuration**.

   ![Download Configuration](./image_210_11.png)

7. Enter the VPN device details (vendor, family, firmware version) if provided by the tenant. If the details are not available, select options as shown below and download the configuration file.

   ![VPN Device Form](./image_210_12.png)

8. Store the configuration file securely.
9. Share the file with tenant IT using a secure method, such as encrypted email.

---

## Step 5: Setup routing in tenant vnet

These steps ensure the traffic to the vpn goes via the firewall.

1. Navigate to the resource group `tcx-tenant-<tenant id>-<env>-rg` and select `tcx-tenant-<tenant id>-<env>-priv-snet-rt` from `Overview`.
2. Select `Routes` from the left navigation.
3. Add a route for **each customer site**:

   - **Route name**: `to-<customer-site>-via-firewall`
   - **Destination type**: `IP Address`
   - **Destination IP addresses/CIDR ranges**: (NAT cidr of the customer network as entered in the NAT rules of `Step 2.3`)
   - **Next hop type**: `Virtual appliance`
   - **Next hop address**: (Private IP of the firewall)

   ![add route](image_210_27.png)

4. Save the rule.

---

## Step 6: Update firewall policy rules

The deployment script creates the firewall and the base firewall policy objects, but the actual VPN allow rules still need to be added manually. Each customer setup can be different and may need a different way of handilng of rules.

### Firewall policy overview

For this VPN setup, you will work with an **Azure Firewall Policy**. The policy is attached to the firewall and contains the rule hierarchy that decides whether traffic is allowed or denied.

The hierarchy is:

- **Firewall Policy**: The top-level object attached to the firewall.
- **Rule Collection Group**: A logical container used to organize related rule collections.
- **Rule Collection**: A set of rules of the same type and action, for example a `Network` collection with action `Allow`.
- **Rule**: The individual traffic match criteria, such as source IP, destination IP, protocol, and port.
- **Stateful processing**: Azure Firewall is stateful, so for an allowed flow, return traffic is automatically allowed without adding a separate reverse rule.

For the VPN flows in this guide, use **Network** rules because the traffic is matched by IP address, protocol, and port.

### How priority is resolved

Azure Firewall evaluates traffic in the following order:

1. **Rule type order**: `DNAT` rules are evaluated first, then `Network` rules, then `Application` rules.
2. **Rule Collection Group priority**: Within the same rule type, the group with the **lowest numeric priority** is processed first.
3. **Rule Collection priority**: Within a group, the collection with the **lowest numeric priority** is processed first.
4. **Rule order inside the collection**: Rules are evaluated in the order they appear.
5. **First match wins**: As soon as a rule matches, processing stops for that traffic flow.

> **Important:** A lower number means a higher priority. For example, priority `1000` is evaluated before priority `2000`.

### Example: priority resolution

Assume the policy contains these two `Network` rule collections:

- Rule Collection Group `vpn-exceptions`, priority `150`
   - Rule Collection `deny-sql`, priority `100`
   - Rule: deny traffic from `10.10.1.4` to `100.127.0.0/28` on `TCP/1433`
- Rule Collection Group `tcx-tenant-<tenant id>-common-vpn-rcg`, priority `200`
   - Rule Collection `vpn-egress`, priority `1000`
   - Rule: allow traffic from `10.10.1.4` to `100.127.0.0/28` on `TCP/1433`

In this case, the traffic is **denied**. Even though both rules match the same flow, Azure Firewall processes the group with priority `150` before the group with priority `200`, so `deny-sql` wins.

If both collections were in the same Rule Collection Group, then the collection priority would decide the order. For example, a collection with priority `900` would be evaluated before one with priority `1000`.

In this cookbook, the script already creates the Rule Collection Group `tcx-tenant-<tenant id>-common-vpn-rcg` (create a Rule Collection Group with a different name if needed). In the following steps, you add the required `Network` rule collections into that existing group.

1. Navigate to the resource group `tcx-tenant-<tenant id>-common-vpn-rg` and select `tcx-tenant-<tenant id>-common-vpn-afwp` from `Overview`.
2. Select `Network Rules` from the left navigation.
3. Add a `Rule Collection` for egress traffic:

   - **Name**: (some appropriate name for the rule collection, eg `vpn-egress`)
   - **Rule collection type**: `Network`
   - **Priority**: `1000`
   - **Rule collection action**: `Allow`
   - **Rule collection group**: `tcx-tenant-<tenant id>-common-vpn-rcg`
   - **Rules**:
      - **Name**: (some appropriate name for the rule, eg `allow-abc-from-tenant`)
      - **Source type**: `IP Address`
      - **Source**: (IP of the VM in `tcx-tenant-<tenant id>-<env>-rg` which needs connectivity to customer network)
      - **Protocol**: `TCP`
      - **Destination Ports**: (port of the target service on customer network)
      - **Destination Type**: (IP Address)
      - **Destination**: (NAT CIDR of the customer network as entered in the NAT rules of `Step 2.3` above)

   ![rule collection](image_210_29.png)

4. Add a `Rule Collection` for ingress traffic:

   - **Name**: (some appropriate name for the rule collection, eg `vpn-ingress`)
   - **Rule collection type**: `Network`
   - **Priority**: `2000`
   - **Rule collection action**: `Allow`
   - **Rule collection group**: `tcx-tenant-<tenant id>-common-vpn-rcg`
   - **Rules**:
      - **Name**: (some appropriate name for the rule, eg `allow-abc-service-from-on-prem`)
      - **Source type**: `IP Address`
      - **Source**: (NAT CIDR of the customer network as entered in the NAT rules of `Step 2.3` above)
      - **Protocol**: `TCP`
      - **Destination Ports**: (port of the target service on tenant side)
      - **Destination Type**: (IP Address)
      - **Destination**: (IP of the VM in `tcx-tenant-<tenant id>-<env>-rg` which needs connectivity to customer network)

   ![rule collection](image_210_30.png)

5. Wait for firewall to update. Here are the sample rules added:

   ![sample rules](image_210_31.png)

---

## Step 7: Testing the VPN Connection

### Testing from Another Azure VNet with Virtual Network Gateway

To confirm connectivity, you can test the VPN using another Azure virtual network equipped with a Virtual Network Gateway. Ensure the public IP of this gateway was used to establish the original VPN in the Azure tenant deployment.

1. In the virtual network, click **+ Create** at the top.

   ![Create Button](./image_210_15.png)

2. In the Marketplace, search for **Local network gateway**.  
   Select **Create → Local network gateway**.

   ![Local Network Gateway](./image_210_16.png)

3. Fill in the form based on the configuration file you received:

   ![Configuration Reference](./image_210_17.png)

   - **Region**: (Same as tenant deployment region)
   - **Name**: `tcx-tenant-<tenant id>-<env>-lgw`
   - **Endpoint**: (IP Address/FQDN from config file)
   - **IP address/FQDN**: (Public gateway address from config)
   - **Address Space(s)**: (Address space from config)

   ![Local Gateway Config](./image_210_18.png)

4. Click **Next: Advanced >**, set **Configure BGP settings** to `No`.

   ![BGP Settings](./image_210_19.png)

5. Select **Next: Review + create >**, then **Create**.
6. In the Virtual Network Gateway, create a connection:
   - Go to **Settings → Connections**, then click **+ Add**.

   ![Add Connection](./image_210_20.png)

   - Click **Next: Settings >**.

7. Complete the VPN connection details:
   - **Virtual network gateway**: (Select your gateway)
   - **Local network gateway**: (Select the gateway created above)
   - **Authentication Method**: (Use pre-shared key from config file)
   - **IKE Protocol**: `IKEv2`
   - _Leave the rest as defaults._

   ![Connection Settings](./image_210_21.png) <br/>
   ![VPN Connection Defaults](./image_210_22.png)

8. Click **Next: Tags >**, add tags as in the earlier table, then select **Next: Review + create >** and **Create**.
9. Within five minutes, the connection status should display as **Connected**.

---

> **Note:**  
> You can use similar steps to connect the VPN from other networks, such as AWS or on-premises environments.
