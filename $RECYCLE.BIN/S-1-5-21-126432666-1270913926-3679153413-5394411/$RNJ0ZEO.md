<!-- 

##### Create a static route for XCR CIDR range in CAPS (TCX Management Plane) TGW

For every new cluster created, get the XCR CIDR range and follow the steps below:

1. In the VPC dashboard, select **Transit gateway attachments** from the left-hand menu.
2. Pick the appropriate Transit gateway attachment and open **Association route table ID** as shown below.

    ![Image](./image_33.png)

3. Pick the **Routes** tab and select **Create static route**.

    ![Image](./image_34.png)

4. Add the XCR CIDR range and the CAPs attachment, then select **Create static route**.

    ![Image](./image_35.png)

These steps have to be repeated for each region.

![Image](./image_36.png) -->


##### Create a Static Route for XCR CIDR Range in CAPS (TcX Management Plane) Transit Gateway

For each new cluster created, you need to configure routing for the associated XCR CIDR range. Follow these steps for every region where a new cluster is provisioned:

1. **Access VPC Dashboard**
    - In the AWS Console, go to the **VPC** dashboard.

2. **Select Transit Gateway Attachments**
    - From the left-hand menu, click on **Transit gateway attachments**.

3. **Open the Association Route Table**
    - Choose the relevant Transit Gateway attachment for your environment.
    - Click on the **Association route table ID**.

    ![Association Route Table](./image_33.png)

4. **Add a New Static Route**
    - In the route table view, switch to the **Routes** tab.
    - Click **Create static route**.

    ![Create Static Route](./image_34.png)

5. **Enter Route Details**
    - Add the XCR CIDR range provided for the cluster.
    - Select the **CAPs attachment** as the target.
    - Click **Create static route** to save.

    ![Route Entry](./image_35.png)

> **Note:** Repeat these steps for each region where clusters and corresponding XCR CIDR ranges exist.

![Region Example](./image_36.png)