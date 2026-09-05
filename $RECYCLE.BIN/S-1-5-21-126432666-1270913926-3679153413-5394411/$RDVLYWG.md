## Installed Product Validation Steps Instructions

Start the SMW executable.

SMW will prompt for a workspace. Select a folder where the current user has write access and click “Launch”.

![Image](./image_6.png)



Once started, use the “login” button in the main toolbar.

![Image](./image_7.png)



This should bring up the web browser configured on the client machine to prompt for the Single Sign-On authentication.

If everything is configured properly and the login was successful, SMW should now display a popup mentioning that the user is “now logged in”.

An additional verification can be made by creating a new project and publishing it to Teamcenter to ensure the communication is going though:

Use File > New > Capella Project
Name this project without any special character (refer to the user-guide for the exact list of restricted characters if need be)
Right-click the project and use Teamcenter > Share Model
Click ‘Next >’ on the project selection dialog that appears
Click ‘Finish’ to share the model with Teamcenter

This operation should complete successfully, and the project be visible in Teamcenter when it is done. You can right-click the project and use Teamcenter > View in Teamcenter to open the embedded Teamcenter view and check whether the project has been successfully published.


