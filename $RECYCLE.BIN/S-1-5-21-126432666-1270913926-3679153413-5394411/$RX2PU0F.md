
### Create Regex Pattern Set in Tenant Region

#### Steps to Create Regex Pattern Set

1. **Login to AWS Management Console**  
    Login to the AWS Management Console in the TcX Tenant Account.

2. **Navigate to WAF & Shield**  
    In the global search box, search for **WAF & Shield** and select the service.

3. **Select Regex Pattern Sets**  
    On the left-hand side navigation panel, select **Regex Pattern Sets**.  
    ![Image](./image_66.png)

4. **Create Regex Pattern Set**  
    - Select the region where the TcX stack will be deployed.
    - Click on **Create Regex Pattern Set**.  
      ![Image](./image_67.png)

5. **Fill in the Details**  
    - **Regex Pattern Set Name**: `waf-regex-pattern-set`
    - **Region**: Select the deployment region.
    - **Regular Expressions**: `awc\/ping`

    Click on **Create Regex Pattern Set**.  
    ![Image](./image_68.png)

6. **Verify Creation**  
    The created regex pattern set will be available in the list.  
    ![Image](./image_69.png)

---