<!-- 

##### Create peering connection between TCX and XCR TGW

Two Transit Gateways:
- XCR Transit Gateway (for TcX Customer)
- TcX Transit Gateway

Must be connected using a Transit Gateway Peering connection. The following setup has to be done only once in TcX Cell Administrative Account.

First, XCR team needs to create, configure and approve requested Transit Gateway Peering.

###### Create a transit gateway attachment with XCR

Navigate to **VPC** -> **Create transit gateway attachment**.
- In the attachment type, select **Peering Connection**.
- Select **Other account** under peering connection attachment and enter details of the XCR (AWS account and the TGW ID).

The screenshot below shows the TGW attachment.

![Image](./image_30.png)

1. Ask XCR team to approve the Transit Gateway peering connection.
2. Add respective CIDR routes in TcX Transit Gateway and update Automation if required for VPC routes (process described below in **Create route for XCR Kubernetes cluster VPC CIDR range**).
3. Ask XCR to add respective CIDR routes in their Customer Transit Gateway to enable connectivity.

###### Create route for XCR Kubernetes cluster VPC CIDR range

The XCR team will share the Cluster VPC CIDR range (requested in [Request Kubernetes Cluster from XCR in the required cell](../../../../../../Cell-Setup/Automation%20Prerequisites/XCR%20Kubernetes%20Cluster%20Setup/AWS/Request%20XCR%20Cluster#request-kubernetes-cluster-from-xcr-in-the-required-cell)).

1. Navigate to the **Association route table ID** of the above TGW attachment.

    ![Image](./image_31.png)

2. Under **Routes**, create a new static route for the Cluster VPC CIDR range provided by XCR Team for the respective cluster.

    ![Image](./image_32.png)

3. Make sure to select the Transit Gateway peering attachment ID created between XCR Transit Gateway and TcX Transit Gateway.
4. Click on **Create Static Route** to create the route entry. -->


### Create Peering Connection Between TcX and XCR Transit Gateways

To enable network connectivity between the **TcX Transit Gateway** and the **XCR Transit Gateway** for TcX customers, a Transit Gateway Peering connection must be established. This procedure is performed **once** in the TcX Cell Administrative Account.

#### Prerequisites

- **XCR team** must create and configure the requested Transit Gateway Peering connection and approve it.

---

#### Step 1: Create a Transit Gateway Peering Attachment with XCR

1. In the AWS Console, go to **VPC**.
2. Select **Create transit gateway attachment**.
3. For **Attachment type**, select **Peering Connection**.
4. Under **Peering connection attachment**, choose **Other account**.
    - Enter the XCR AWS account number and TGW ID provided by the XCR team.

    ![Transit Gateway Attachment](./image_30.png)

5. Submit to create the peering attachment.

---

#### Step 2: Approval and Routing

1. **Request approval:** Notify the XCR team to approve the Transit Gateway peering connection.
2. **Update Routing:**
    - Add relevant CIDR routes in the TcX Transit Gateway, and update any automation scripts or configurations related to VPC routes as needed (see next section for details).
3. Request the **XCR team** to add the corresponding CIDR routes in their Customer Transit Gateway to complete inbound/outbound connectivity.

---

#### Step 3: Create Route for XCR Kubernetes Cluster VPC CIDR Range

The XCR team will provide the Cluster VPC CIDR range. (Reference: [Request Kubernetes Cluster from XCR in the required cell](../../../../../../Cell-Setup/Automation%20Prerequisites/XCR%20Kubernetes%20Cluster%20Setup/AWS/Request%20XCR%20Cluster#request-kubernetes-cluster-from-xcr-in-the-required-cell))

To add the route:

1. In the AWS Console, navigate to the **Association route table ID** of the Transit Gateway attachment.

    ![Association Route Table](./image_31.png)

2. Under the **Routes** tab, create a new static route:
    - Use the Cluster VPC CIDR range provided by the XCR team.
    - Select the Transit Gateway peering attachment ID created between the XCR Transit Gateway and the TcX Transit Gateway.

    ![Create Static Route](./image_32.png)

3. Click **Create Static Route** to apply the route entry.

---

By completing these steps, your TcX and XCR transit gateways will be connected, enabling validated and secure cluster connectivity.