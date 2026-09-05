<!-- ##### Create peering connection between TCX and CAPS (TCX Management Plane) TGW

Two Transit Gateways:
- CAPS Transit Gateway (for Management Plane)
- TcX Transit Gateway

Must be connected using a Transit Gateway Peering connection. The following setup has to be done only once per region in TcX Cell Administrative Account.

First, CAPS team needs to create, configure and approve requested Transit Gateway Peering.

###### Create a transit gateway attachment with CAPS in TcX Cell Administrative Account.

Navigate to **VPC** -> **Create transit gateway attachment**.
- In the attachment type, select **Peering Connection**.
- Select **Other account** under peering connection attachment and enter details of the CAPS (AWS account and the TGW ID).

The screenshot below shows the TGW attachment.

![Image](./image_37.png)

1. Ask CAPS team to approve the Transit Gateway peering connection.
2. Add respective CIDR routes in TcX Transit Gateway and update Automation if required for VPC routes (process described below in **Create route for CAPS CIDR range in TcX Cell Administrative Account**).
3. Ask CAPS to add respective CIDR routes in their CAPS Transit Gateway to enable connectivity.

###### Create route for CAPS CIDR range in TcX Cell Administrative Account.

The CAPS team will share the CIDR range for the CAPS management plane VPC.

1. Navigate to the **Association route table ID** of the above TGW attachment.

    ![Image](./image_38.png)

2. Under **Routes**, create a new static route for the Cluster CIDR range provided by CAPS Team for the respective Management plane VPC.

    ![Image](./image_39.png)

3. Make sure to select the Transit Gateway peering attachment ID created between CAPS Transit Gateway and TcX Transit Gateway.
4. Click on **Create Static Route** to create the route entry.
5. Update the pipeline variable `GLBL_CAPS_MGMT_PLANE_CIDR_BLOCK` with the IP Address CIDR provided by CAPS management plane. -->


##### Create Peering Connection Between TcX and CAPS (TcX Management Plane) Transit Gateways

To establish secure networking between the **CAPS Transit Gateway** (for management plane) and the **TcX Transit Gateway**, you must create a Transit Gateway Peering connection. This setup is required only once per region in the TcX Cell Administrative Account.

> **Note:** The CAPS team is responsible for initiating, configuring, and approving the Transit Gateway Peering connection request.

---

###### Step 1: Create a Transit Gateway Attachment with CAPS in TcX Cell Administrative Account

1. In the AWS Console, go to **VPC**.
2. Select **Create transit gateway attachment**.
3. For **Attachment type**, select **Peering Connection**.
4. Under **Peering connection attachment**, choose **Other account**.
    - Enter the CAPS AWS account number and the CAPS TGW ID.
5. Submit the request to create the peering attachment.

    ![TGW Attachment with CAPS](./image_37.png)

---

###### Step 2: Approval and Route Configuration

1. **Request Peering Approval:** Notify the CAPS team to approve the Transit Gateway peering connection.
2. **Configure CIDR Routes:**
    - Add the required CAPS CIDR routes in the TcX Transit Gateway, updating automation if necessary (see next steps).
3. **CAPS Routing:** Ask the CAPS team to add the necessary CIDR routes in their CAPS Transit Gateway for complete connectivity.

---

###### Step 3: Create Route for CAPS CIDR Range in TcX Cell Administrative Account

The CAPS team will provide you with the CIDR range for the CAPS management plane VPC.

To create the route:

1. In the AWS Console, go to the **Association route table ID** of the CAPS transit gateway peering attachment.

    ![Association Route Table](./image_38.png)

2. Click on the **Routes** tab and select **Create static route**.

    ![Create Static Route](./image_39.png)

3. Enter the **Cluster CIDR range** (as provided by the CAPS Team for the management plane VPC).
4. Select the transit gateway peering attachment ID created between CAPS Transit Gateway and TcX Transit Gateway.
5. Click **Create Static Route** to add the route.
6. Update the pipeline variable `GLBL_CAPS_MGMT_PLANE_CIDR_BLOCK` with the CIDR block supplied by the CAPS management plane.

---

By following these steps, TcX and CAPS (Management Plane) Transit Gateways will be connected to enable seamless network communications.