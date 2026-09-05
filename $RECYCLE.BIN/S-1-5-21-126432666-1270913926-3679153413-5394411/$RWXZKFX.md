## Post-install Validation

### 1. Update Preferences

- **TCAllowedChildTypes_Fnd0LogicalBlock**  
    Set this preference to `Functionality` on the Teamcenter server.  
    This allows the 'Activity' element to be added as a child under the parent 'Block'.

### 2. Check for Required Preferences

- Ensure the following preference exists:  
    - `ActiveWorkspaceHosting.URL`
- If it does not exist, create it with the appropriate ActiveWorkspace URL.

### 3. Validate Project Model Creation

- Confirm that an engineering user can create a Project Model:
    1. From the home page, select a folder.
    2. Run the **ADD** command.
    3. Enter the required inputs as shown below:

        ![Image](./image_2.png)
