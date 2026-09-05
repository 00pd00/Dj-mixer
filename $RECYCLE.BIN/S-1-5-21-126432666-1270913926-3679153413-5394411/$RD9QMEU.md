# Teamcenter Security Services Modifications

The `web.xml` is currently configured to support on-premise deployment and needs minor modification to support Kubernetes operations where the login tokens are expiring before the user is able to start work. This will be configurable in the next release.

1. Login to the CorpServer of the deployment as per cloud provider.  
    - AWS: EC2 instance
    - AZURE: Virtual Machine. Follow [these](../../Operations/Day%20N%20Operations/Login%20to%20CorpServer) steps to log in to Virtual Machine.

    Change directory to: 
    `/<{tenantID}-{environmentID}>/<{tenantID}-{environmentID}>/deploy/component/config/tc-tcss/login/login_webapp_root/WEB-INF`

2. Edit the file `web.xml` using the editor:  
    ![Image](./image_121.png)

3. Change the following property:  
    - `session-timeout` to `1440`  
    ![Image](./image_122.png)

4. Save `web.xml`.

5. In about 2 minutes, the content will be synced to the tenant Git repository. Check that the modified content is available in the Git repository. Move to the next step to confirm that the updated data is available in the Git repo.

6. In **ArgoCD**, perform a **Sync** to bring up the changes.  
    ![Image](./image_123.png)

7. In **ArgoCD**, delete the `tc-tcss` deployment.  
    ![Image](./image_124.png)

8. **ArgoCD** will restart the `tc-tcss` pods.
