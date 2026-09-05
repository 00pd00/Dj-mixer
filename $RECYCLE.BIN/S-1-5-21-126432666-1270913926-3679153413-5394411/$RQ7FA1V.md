## Partner Connect Deployment

Applicable Product IDs: TC030724-XT
### Post Installation Steps

After successful installation of the Teamcenter Partner Connect (Product ID - TC030724-XT), the following steps need to be performed by logging in to the TCX environment through AW as a dba user.

### Setup ACL for non dba Users

When a partner contract is sent for approval to non-administrator users, they must have the required permissions to approve or reject the partner contract. To configure this, in Teamcenter Access Manager, select the **Has Class (POM_object) > Has Application (Any)** node from the Access Manager (AM) rule tree, add **Has Application (Any)** node and create the **PC_ACL_non_admin_users** ACL in it.

| Condition | Value | Accessor Type | Accessor | Privileges |
|-----------|-------|---------------|----------|------------|
| Has Application | Any | Role | Designer | **Grant these privileges:** Read, Write |
| | | Group | Engineering.MyOrg | **Grant these privileges:** Read, Write |

   ![Image](./image_458.png)

### Setup ACLs for Partner Users

Define access privileges for partner representatives to ensure they have the appropriate permissions to access necessary information. This helps maintain data security, compliance, efficient collaboration, and protect sensitive information.

To define the access privileges, create the following access control lists (ACLs) in Access Manager:

1. Select the **Has Class (POM_object) > Has Application (Any)** node from the AM rule tree, and add **Has Type (IP_License)** and create the **Vendor Admin ACL** ACL with the following details:

    | Condition | Value | Accessor Type | Accessor | Privileges |
    |-----------|-------|---------------|----------|------------|
    | Has Type | IP_License | Role | VendorAdmin | **Grant these privilege:** Write, Delete, Create |

    ![Image](./image_474.png)

2. Select the **Has Class (POM Object)** node from the AM rule tree, add **Is Current Group External (true)** node above **Has Class (WorkspaceObject)** node.

    ![Image](./image_473.png)

3. Select the **Has Class (POM Object) > Is Current Group External** node from the AM rule tree, add **User In Attached IP License (Any)** node and create the **VM External Group Security** ACL with the following details:

    | Condition | Value | Accessor Type | Accessor | Privileges |
    |-----------|-------|---------------|----------|------------|
    | User In Attached IP License | Any | Groups with Security | External | **Grant this privilege:** Read |

    ![Image](./image_459.png)

4. Select the **Has Class (POM Object) > Is Current Group External** node from the AM rule tree, add **Has Class (WorkspaceObject)** node and create the **External User ACL** ACL with the following details:

    | Condition | Value | Accessor Type | Accessor | Privileges |
    |-----------|-------|---------------|----------|------------|
    | Has Class | WorkspaceObject | Owning User | | **Grant these privileges:** Read, Write, Delete, Change, Change Ownership, Publish, Subscribe |
    | | | Owning Group | | **Grant these privileges:** Read, Write |
    | | | Groups with Security | External | **Deny these privileges:** Read, Delete |

    ![Image](./image_460.png)

5. Select the **Has Class (POM Object) > Has Class (WorkspaceObject)** node from the AM rule tree, add **Has Class (Vendor)** node and create the **Vendor ACL** ACL with the following details:

    | Condition | Value | Accessor Type | Accessor | Privileges |
    |-----------|-------|---------------|----------|------------|
    | Has Class | Vendor | Role | VendorAdmin | **Grant these privileges:** Write, Delete, Create |
    | | | World | | **Deny these privileges:** Write, Delete, Create |

    ![Image](./image_475.png)

6. Select the **Has Class (POM Object) > Has Class (WorkspaceObject)** node from the AM rule tree, add **Has Class (Vm0PrtnrContract)** node and create the **Partner Contract ACL** ACL with the following details:

    | Condition | Value | Accessor Type | Accessor | Privileges |
    |-----------|-------|---------------|----------|------------|
    | Has Class | Vendor | Role | VendorAdmin | **Grant these privileges:** Write, Delete, Change, Create |
    | | | World | | **Deny these privileges:** Write, Delete, Change, Create |

    ![Image](./image_476.png)

7. Select the **Has Class (POM Object) > Has Class (WorkspaceObject)** node from the AM rule tree, add **Has Class (Vm0PrtnrContractRevision)** node and use the existing **Partner Contract ACL** ACL and verify if the following details are present:

    | Condition | Value | Accessor Type | Accessor | Privileges |
    |-----------|-------|---------------|----------|------------|
    | Has Class | Vendor | Role | VendorAdmin | **Grant these privileges:** Write, Delete, Change, Create |
    | | | World | | **Deny these privileges:** Write, Delete, Change, Create |

    ![Image](./image_477.png)

8. Select the **Has Class (POM Object) > Has Class (WorkspaceObject) > Has Class (Vm0PrtnrContractRevision)** node from the AM rule tree, add **Has Status (Obsolete)** node and create the **VM Delete Partner Contract** ACL with the following details:

    | Condition | Value | Accessor Type | Accessor | Privileges |
    |-----------|-------|---------------|----------|------------|
    | Has Status | Obsolete | World | | **Grant this privilege:** Delete |

    ![Image](./image_461.png)

9. Select the **Has Class (POM Object) > Has Class (WorkspaceObject) > Has Class (Vm0PrtnrContractRevision)** node from the AM rule tree, add **Has Status (Vm0Created)** node and use the existing **Working** ACL and verify if the following details are present:

    | Condition | Value | Accessor Type | Accessor | Privileges |
    |-----------|-------|---------------|----------|------------|
    | Has Status | Vm0Created | Owning User | | **Grant these privileges:** Write, Delete, Change, Change Ownership, Publish, Subscribe, Digitally Sign, Void Digital Signature |
    | | | Owning Group | | **Grant these privileges:** Write, Subscribe, Digitally Sign, Void Digital Signature |
    | | | System Administrator | | **Grant these privileges:** Delete, Change, Change Ownership, Subscribe |
    | | | World | | **Grant these privileges:** Read, Copy<br/>**Deny these privileges:** Write, Delete, Change, Promote, Demote, Change Ownership, Publish, Subscribe, Remote Check-Out, Check-In/Check-Out, Digitally Sign, Void Digital Signature |

    ![Image](./image_462.png)

10. Select the **Has Class (POM Object) > Has Class (WorkspaceObject) > Has Class (Vm0PrtnrContractRevision) > Has Status (Vm0Created)** node from the AM rule tree, add **Has Status (Vm0Created)** node and use the existing **Vendor ACL** ACL and verify if the following details are present:

    | Condition | Value | Accessor Type | Accessor | Privileges |
    |-----------|-------|---------------|----------|------------|
    | Has Class | Vendor | Role | VendorAdmin | **Grant these privileges:** Write, Delete, Create |
    | | | World | | **Deny these privileges:** Write, Delete, Create |

    ![Image](./image_478.png)

11. To prevent a partner from viewing the other assigned partners in an engineering change notice (ECN), create the following ACLs below **Has Bypass(true)**:

    a. In the **Has Class (POM Object) > Is Current Group External** node, add **Has Class (User) > Is User External (true)** nodes and create the **Is User External** ACL with the following details:

    | Condition | Value | Accessor Type | Accessor | Privileges |
    |-----------|-------|---------------|----------|------------|
    | Is User External | True | Groups with Security | External | **Deny this privilege:** Read |
    | | | Groups with Security | Internal | **Grant this privilege:** Read |

    ![Image](./image_463.png)

    b. In the **Has Class (POM Object) > Is Current Group External > Has Class (User) > Is User External** node, add **Is User In Current Group (true)** node and create the **Is User Same** ACL with the following details:

    | Condition | Value | Accessor Type | Accessor | Privileges |
    |-----------|-------|---------------|----------|------------|
    | Is User In Current Group | True | World | | **Grant this privilege:** Read |

    ![Image](./image_464.png)

    c. In the **Has Class (POM Object) > Is Current Group External** node, add **Has Class (Group) > Is Group External (true)** nodes and create the **Is Group External** ACL with the following details:

    | Condition | Value | Accessor Type | Accessor | Privileges |
    |-----------|-------|---------------|----------|------------|
    | Is Group External | True | Groups with Security | External | **Deny this privilege:** Read |
    | | | Groups with Security | Internal | **Grant this privilege:** Read |

    ![Image](./image_465.png)

    d. In the **Has Class (POM Object) > Is Current Group External > Has Class (Group) > Is Group External** node, add **Is Group Same As Current Group (true)** node and create the **Is Group Same** ACL with the following details:

    | Condition | Value | Accessor Type | Accessor | Privileges |
    |-----------|-------|---------------|----------|------------|
    | Is Group Same As Current Group | True | World | | **Grant this privilege:** Read |

    ![Image](./image_466.png)

    e. In the **Has Class (POM Object) > Is Current Group External** node, add **Has Class (GroupMember) > Is GroupMember External (true)** nodes and  create the **Is GroupMember External** ACL with the following details:

    | Condition | Value | Accessor Type | Accessor | Privileges |
    |-----------|-------|---------------|----------|------------|
    | Is GroupMember External | True | Groups with Security | External | **Deny this privilege:** Read |
    | | | Groups with Security | Internal | **Grant this privilege:** Read |

    ![Image](./image_467.png)

    f. In the **Has Class (POM Object) > Is Current Group External > Has Class (GroupMember) > Is GroupMember External** node, add **Is Group Same As Current Group (true)** node and create the **Is GroupMember Same** ACL with the following details:

    | Condition | Value | Accessor Type | Accessor | Privileges |
    |-----------|-------|---------------|----------|------------|
    | Is Group Same As Current Group | True | World | | **Grant this privilege:** Read |

    ![Image](./image_468.png)

12. To prevent a partner from creating vendors, company contacts, company locations, and partner contracts, create the following ACLs:

    a. To prevent a partner from creating vendors, select the **Has Class (POM Object) > Is Current Group External** node from the AM rule tree, add **Has Class (Vendor)** node and create the **ACL To Restrict Vendor Creation** ACL with the following details:

    | Condition | Value | Accessor Type | Accessor | Privileges |
    |-----------|-------|---------------|----------|------------|
    | Has Class | Vendor | Groups with Security | External | **Deny these privileges:** Read, Write, Delete, Create |

    ![Image](./image_469.png)

    b. To prevent a partner from creating company contacts, select the **Has Class (POM Object) > Is Current Group External** node from the AM rule tree, add **Has Class (CompanyContact)** node and create the **ACL To Restrict Company Contact Creation** ACL with the following details:

    | Condition | Value | Accessor Type | Accessor | Privileges |
    |-----------|-------|---------------|----------|------------|
    | Has Class | CompanyContact | Groups with Security | External | **Deny these privileges:** Read, Write, Delete, Create |

    ![Image](./image_470.png)

    c. To prevent a partner from creating company locations, select the **Has Class (POM Object) > Is Current Group External** node from the AM rule tree, add **Has Class (CompanyLocation)** node and create the **ACL To Restrict Company Location Creation** ACL with the following details:

    | Condition | Value | Accessor Type | Accessor | Privileges |
    |-----------|-------|---------------|----------|------------|
    | Has Class | CompanyLocation | Groups with Security | External | **Deny these privileges:** Read, Write, Delete, Create |

    ![Image](./image_471.png)

    d. To prevent a partner from creating partner contracts, select the **Has Class (POM Object) > Is Current Group External** node from the AM rule tree, add **Has Class (VM0PrtnrContract)** node and create the **ACL To Restrict Partner Contract Creation** ACL with the following details:

    | Condition | Value | Accessor Type | Accessor | Privileges |
    |-----------|-------|---------------|----------|------------|
    | Has Class | VM0PrtnrContract | Groups with Security | External | **Deny these privileges:** Read, Write, Delete, Create |

    ![Image](./image_472.png)

### Hiding the Workflow tasks to external users

Configure a partner's access to ensure they can only view and interact with their specific workflow jobs, workflow tasks, and emails. This configuration enhances security, protects sensitive information, and ensures that partners focus solely on their assigned responsibilities.

To configure a partner's access to only their assigned objects, configure the following ACLs as follows:

1. To allow partners access to the workflow jobs of their group and to restrict their access to only these jobs, modify the **Job** ACL at **Has Class (POM Object) > Has Class (POM Object) (System Objects) > Has Class (EPMJob)** node, grant **Read** and **Write** privileges to **Owning Group**, and deny **Read**, **Write**, and **Delete** privileges from **Groups with Security** as **External**.

    ![Image](./image_455.png)

2. To allow partner representatives access to the workflow tasks of their group and to restrict their access to only these tasks, modify the **Task** ACL at **Has Class (POM Object) > Has Class (POM Object) (System Objects) > Has Cladd (EPMTask)** node, grant **Read** and **Write** privileges to **Owning Group**, and deny **Read**, **Write**, and **Delete** privileges from **Groups with Security** as **External**.

    ![Image](./image_456.png)

3. To allow partner representatives access to the emails of their group and to restrict their access to only these emails, modify the **Mailbox** ACL at **Has Class (POM Object) > Has Class (POM Object) (System Objects) > Has Class (Folder) > Has Type (Mail Folder)** node, grant **Read** and **Write** privileges to **Owning Group**, and deny **Read**, **Write**, and **Delete** privileges from **Groups with Security** as **External**.

    ![Image](./image_457.png)
