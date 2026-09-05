## Steps to Add Users in the SAM Account

Follow the steps below to add users to your SAM account and retrieve their required details:

1. Log in to the **SAM Console**.
2. Click the plus icon to add a new user.  
   *(If the user already exists in the SAM account, skip this step.)*

   ![Add User in SAM Console](./image_322.png)

   ![User Entry in SAM Console](./image_323.png)

3. Select the user, then copy the user's SAM `user_id` and `email`:

   - **Example:**
     - User Id (`SAM_USER_ID`): `13cc8664e67849a7959ec734575036d4`
     - Email (`SAM_EMAIL`): `vikram.rakhe@siemens.com`

## Add users to service org account

1. Log in to the **Service Org Account** managing the given customers.
2. Add a service admin user for customer ECA. Refer to the [Service Org Account documentation](https://developer.internal.siemens.com/fds/documentation/apps/admin-console-guide-ix/service-org-account.html#create-service-admin-and-assign-ecas).

   ![User Entry in Service org](./image_324.png)
   
   - If the user is part of other customer ECAs, keep those ECA selections as they are.
   - Check the current ECA in the existing list and select it.
3. Retrieve and keep the user ID from the UI for later reference.
