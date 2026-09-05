#### Remediating a policy assignment ####

Activate the necessary PIM group having the Resource Policy Contributor role for performing the policy operations.

1. Open Azure policies. Navigate to Azure Portal --> Search for Management Groups 

    ![Image](./020_Img_001.png)
2. Click on the required management group and navigate to Governance --> Policy

    ![Image](./020_Img_002.png)
3. You should be redirected to the policy compliance page as shown below:

    ![Image](./020_Img_003.png)

4. Click on Assignments. Search for the policy and click on it to open the policy assignment details page

    ![Image](./020_Img_011.png)

5. Click on Create Remediation task.

    ![Image](./020_Img_013.png)

6.  Enter the relevant details below. You should also be able to see the list of non-compliant resources listed here.  
    Locations -- This would remediate the resources in the mentioned location for this policy.  
    Specific Resources -- This option allows you to select specific non-compliant resources as per the policy.  

    ![Image](./020_Img_014.png)

7. Click on Next --> Review+Create. This should create a remediation task to remediate the existing resources for compliance.

**Note: This is applicable for policies with Modify and Deploy IF not exists effect. Alternatively, you can also assign the remediation task during assignment of similar kind of policy. Refer to [Configure Remediation Task](../../Operations/Azure%20Policies/Assign%20Policy)
