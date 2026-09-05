### Identify Resources

#### Identify AWS Resources Tagged with CustomerID

Use the AWS Resource Groups Tag Editor to find all resources associated with the tag.

1. Go to the AWS Management Console.
2. Navigate to **Resource Groups > Tag Editor**.
    ![Image](./image_370.png)

3. Select the region where you expect resources to be tagged.
4. Select **Resource types** as "All supported resource types".
5. In the Tag Editor, select the tag key as "CustomerID" and tag value as `<customer id>`.
6. Click on **Search resources**.
    ![Image](./image_371.png)

7. Export the list of resources found to a CSV file for reference and tracking.

> **Note**: KMS keys may have been scheduled for deletion. These resources can be ignored.

#### Identify Azure Resources Tagged with CustomerID

Use the Azure Resource Graph Explorer to look for all the resources associated with that tag.

1. Log in to the Azure Portal.
2. Navigate to **Azure Resource Graph Explorer**.
3. Run the following Kusto query to search for the resources tagged with the CustomerID tag:

    ```kql
    Resources
    | where tags["CustomerID"] == "<tenant-id>"
    ```

    ![Image](./image_372.png)

4. Click on **Run query** to view the results.
5. Export the list of resources found to a CSV file by clicking on **Download as CSV** for reference and tracking.
