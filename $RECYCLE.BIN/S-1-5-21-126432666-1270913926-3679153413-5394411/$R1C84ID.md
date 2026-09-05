#### Policy Exclusions and Exemptions ####

Activate the necessary PIM group/roles having the necessary permissions  for performing the policy operations.

This section primarily deals with the steps of removing Azure resources or hierarchy from policy scanning through the built in features of Policy Exclusions and Exemptions.

#### Azure Policy Exclusion ####

This is applicable only when you want to exclude a subscription, resource group or specific resources entirely from the policy scanning scope. 

This is done during the time of policy assignment. Please follow the below mentioned steps:

1. Open Azure policies. Navigate to Azure Portal --> Search for Management Groups 

    ![Image](./020_Img_001.png)

2. Click on the required management group and navigate to Governance --> Policy

    ![Image](./020_Img_002.png)

3. You should be redirected to the policy compliance page as shown below:

    ![Image](./020_Img_003.png)

4. Click on Assign Policy. The policy assignment window opens.

    ![Image](./020_Img_019.png)

5. Click on Exclusions. 

    ![Image](./020_Img_020.png)

6. In the scope section, you can enter the appropriate scope which you want to exclude from the policy scanning. Once you assign the policy with this configuration, the said scope is not included in policy scanning and evaluation and hence it is not marked as compliance/non-compliance either.


#### Azure Policy Exemption ####

This is used to exempt any non-compliance resource from being considered under evaluation. Follow the below mentioned steps when you want to exempt any non-compliant resources from being marked as non-compliant and thereby improve the secure score of the subscription.

1. Open Azure policies. Navigate to Azure Portal --> Search for Management Groups 

    ![Image](./020_Img_001.png)
2. Click on the required management group and navigate to Governance --> Policy

    ![Image](./020_Img_002.png)
3. You should be redirected to the policy compliance page as shown below:

    ![Image](./020_Img_003.png)

4. Click on Assignments. Search for the policy and click on it to open the policy assignment details page

    ![Image](./020_Img_011.png)

5. Click on Create Exemption.

    ![Image](./020_Img_021.png)

6. Enter the details in the exemption window as below:

    Exemption Scope: Mention the subscription/resource group/ resource you want to exempt.  
    Assignment Name : This should be the name of the policy assignment for which you want to exempt.  
    Exemption Name : Name of the exemption as per user choice.  
    Exemption Category : Select as either Waiver/Mitigated.  
      a. Waiver : If you want to exclude the particular scope from non-compliance.  
      b. Mitigated: If you have resolved the non-compliance for the particular scope through another mechanism and hence want it to exempt it from the policy scanning.  
    Exemption Expiration Setting : Choose this if you want to set an expiry date for the exemption.  
    Exemption Description: Description of the exemption as per user choice.  

    ![Image](./020_Img_022.png)

7. Click on Next.

8. Enter the details in this section if you want to exempt the resources based on the resource selectors.

    ![Image](./020_Img_023.png)

9. Click on Add. Click on Next. Click on Review+Create. The exemption is created.

10. To view the exemptions, Navigate to Policy Portal -- > Exemptions. 

    ![Image](./020_Img_024.png)



