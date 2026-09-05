Activate the necessary PIM group having the Resource Policy Contributor role for performing the policy operations.

Azure policies can be broadly categorized into two main categories:

a. Built-In : These are predefined policies by Azure. The definitions cannot be changed by the user.

b. Custom : These are created by the user tailored as per to the requirement.

You can access Policy definations from [Global_Repo](https://gitlab.industrysoftware.automation.siemens.com/tcx-deploy/tcx-pipeline-global/-/tree/main/policies/azure?ref_type=heads)

From the CtcX perspective, steps documented below are for performing the various policy related operations in Azure.


#### Assigning a policy to a management group

1. Open Azure policies. Navigate to Azure Portal --> Search for Management Groups 

    ![Image](./020_Img_001.png)
2. Click on the required management group and navigate to Governance --> Policy

    ![Image](./020_Img_002.png)
3. You should be redirected to the policy compliance page as shown below:

    ![Image](./020_Img_003.png)
4. Navigate to Definitions. Search for the policy which you want to assign. Once done, click on the policy to open the policy defintion page.

    ![Image](./020_Img_017.png)

5. Click on Assign Policy. This will redirect you to the policy assignment window.

    ![Image](./020_Img_005.png)

6. Enter the details as below:

   Scope : This should be the management group.  
   Exclusions: This is to exclude specific subscriptions/resource groups/resources from the policy scanning scope. For more details to setup exclusions, please refer to [Configure Exclusions in Azure policy](../../Operations/Azure%20Policies/Policy%20Exclusions%20and%20Exemptions)  
   Resource Selectors: These are used if you want to target the policy to specific category of resources based on certain filter criteria.  
   Overrides: These are used if you want to override the default policy effect during its assignment.  
   Assignment Name: Name of the assignment as per user choice. In Non-Prod, we append the tcx name to the assignment name.  
   Description: Policy description as per user choice.  

   ![Image](./020_Img_025.png)

7. Click on Next.

8. Enter the details as below:

    Parameters : This section would appear if the policy definition requireds input parameters from the user.

    ![Image](./020_Img_026.png)

9. Click on Next.

10. Create a Remediation task if applicable. Remediation is only required for policies with Modify and DeployIfNotExists Effect. Also create a managed identity while creating the remediation task. 
If not required , this can be skipped.

    ![Image](./020_Img_027.png)

11. Click on Next. 

12. Enter a suitable non-compliance message.

    ![Image](./020_Img_028.png)

13. Click on Review+Create. This will create the policy assignment and it will take around 15-30 mins to take effect.
    
#### The above steps mentioned were for a built in policy. For a custom policy, the assignment procedure remains the same. ####














