# Substance Compliance and CPM Deployment

**Applicable Product IDs:** TC030820-XT, TC030821-XT, TC030835-XT, TC030836-XT, TC030837-XT, TC030838-XT, TC030839-XT, TC030840-XT, TC030841-XT, TC030842-XT, TC030843-XT, TC030845-XT

## Post Installation Steps

After successful installation , the following steps need to be performed.

### Configure Compliance Admin role

1. Within the MyOrg group, create a subgroup named "Engineering" (if it doesn't already exist).

   ![Image](./image_130_001.png)
   ![Image](./image_130_002.png)

2. To this "Engineering" group, add the **Compliance Admin** role.

   ![Image](./image_130_003.png)

   ![Image](./image_130_004.png)

### ALS Configuration for Substance Compliance Rules

1.  Login to the TCX environment through AW as a dba user.
2.  Navigate to Access Manager page.

    ![Image](./image_130_005.png)

3.  Click on Manage ACL and create following configurations.

#### Configuration of Compliance Configuration files.

1. Create ACL **ACL for Compliance Configuration**.

   ![Image](./image_130_006.png)

2. Select the **Has Class (POM Object) > Owning User(infodba)** node from the AM rule tree, and add **Has Class (RevisionAnchor)** as a child, with **POM open Access** ACL with following details.

   | Condition | Value          | Accessor Type | Accessor | Privileges                                                                                                                                                                                                                                             |
   | --------- | -------------- | ------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
   | Has Class | RevisionAnchor | World         |          | **Grant these privileges**: <br />• Read<br /> • Write<br />• Delete<br />• Change<br />• Promote<br />• Demote<br />• Copy<br />• Change Ownership<br />• Publish<br />• Subscribe<br />• Export<br />• Import<br />• Transfer Out<br />• Transfer In |

   ![Image](./image_130_007.png)

3. Select the **Has Class (POM Object) > Owning User(infodba) > Has Class(WorkspaceObject)** node from the AM rule tree, and create child node **Has Class (Scp0ComplianceConfig)**, and Attach **ACL for Compliance Configuration** ACL to it with following details.

   | Condition | Value                | Accessor Type | Accessor         | Privileges                                                                                                   |
   | --------- | -------------------- | ------------- | ---------------- | ------------------------------------------------------------------------------------------------------------ |
   | Has Class | Scp0ComplianceConfig | Role          | Compliance Admin | **Grant these privileges**: <br />• Read<br />• Write <br /><br />**Revoke these privileges**:<br />• Delete |
   |           |                      | World         |                  | **Revoke these privileges**:<br />• Delete<br />                                                             |

   ![Image](./image_130_008.png)

#### Configuration of Substance Compliance Rules

1. Click on Manage ACL and create ACL **ACL for Substance Compliance Rules**.

   ![Image](./image_130_009.png)

2. Select the **Has Class (POM Object) > Owning User(infodba) > Has Class (WorkspaceObject)** node from the AM rule tree, and create child node **Has Class (Scp0DeclarationConfig)**, and Attach **ACL for Substance Compliance rules** ACL to it with following details.

   | Condition | Value                 | Accessor Type | Accessor         | Privileges                                     |
   | --------- | --------------------- | ------------- | ---------------- | ---------------------------------------------- |
   | Has Class | Scp0DeclarationConfig | Role          | Compliance Admin | **Grant these privileges**:<br />• Write<br /> |

   ![Image](./image_130_010.png)

3. Select the **Has Class (POM Object) > Owning User(infodba) > Has Class (WorkspaceObject)** node from the AM rule tree, and create child node **Has Class (Scp0MSDProcessingRule)**, and Attach **ACL for Substance Compliance rules** ACL to it with following details.

   | Condition | Value                 | Accessor Type | Accessor         | Privileges                                     |
   | --------- | --------------------- | ------------- | ---------------- | ---------------------------------------------- |
   | Has Class | Scp0MSDProcessingRule | Role          | Compliance Admin | **Grant these privileges**:<br />• Write<br /> |

   ![Image](./image_130_011.png)

### Validate if CPM ( Compliance Process Manager ) is deployed and running correctly.

1. Log in to the TCX environment as **Compliance Admin** role.
2. Change workspace to **Active Admin**.
3. Open **Compliance Configuration** application from Launcher.

   ![Image](./image_130_012.png)

4. Click on **CPM** sublocation.

   ![Image](./image_130_013.png)

5. If CPM properties are loaded, then the connection to the CPM is successful.

   ![Image](./image_130_014.png)