#### Create a Custom Policy Definition ####

Activate the necessary PIM group/roles having the necessary permissions  for performing the policy operations.

1. Open Azure policies. Navigate to Azure Portal --> Search for Management Groups 

    ![Image](./020_Img_001.png)
2. Click on the required management group and navigate to Governance --> Policy

    ![Image](./020_Img_002.png)
3. You should be redirected to the policy compliance page as shown below:

    ![Image](./020_Img_003.png)

4. Click on Definitions. Click on Policy Definition to create new custom policy definiton.

    ![Image](./020_Img_017.png)

5. Enter the relevant details as below:

    Definition Location: This should be your management group.

    Name : Policy Definition Name

    Description : A short summmary about the policy and its intended Azure resource and objective.

    Category: Which category of Azure service does this policy lie in. You can choose an existing category or create a new one.

    Policy Rule: This contains the polciy definition JSON.

    ![Image](./020_Img_018.png)

6. Click on Save.

