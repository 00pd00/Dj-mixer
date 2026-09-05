### Configure Supplier Connect on the OEM Supplier Site

#### Export/Import ACLs

**Note**: This Step is applicable only when their is an existing Teamcenter X with Supplier Connect (Product ID - TC030914-XT) and wanted to export the ACL from the **existing OEM Supplier Site tenant to new OEM Supplier site tenant** and skip [Create required ACLs on OEM Supplier Site](#create-required-acls-on-oem-supplier-site) section of this cookbook or else you have to create the ACLs manually by following [Create required ACLs on OEM Supplier Site](#create-required-acls-on-oem-supplier-site) section of this cookbook.

1. Login to TCX environment through AW as a dba user where Supplier Connect (Product ID - TC030911-XT) is already configured.

2. Navigate to Access Manager page.

   ![Image](./image_474.png)

3. Click on Export Command.

   ![Image](./ACL_export1.png)

4. A dialog launches then again click on Export button.

   ![Image](./ACL_export2.png)

5. Login to TCX environment through AW as a dba user where you wanted to import the ACL's.

6. Navigate to Access Manager page.

   ![Image](./image_474.png)

7. Click on Import Command.

   ![Image](./image_475.png)

8. Choose the exported XML file and click on import.

   ![Image](./image_476.png)

#### Create required ACLs on OEM Supplier Site

Login to the TCX environment through AW as a dba user and create following ACLs on the OEM Supplier Site.

Configure Partner Connect Post Installation Steps as specified in the cTcX cookbook section [Partner Connect Deployment](../Partner%20Connect%20Deployment/Partner%20Connect%20Deployment/#setup-acls-for-partner-users) from steps 1 to 10.

1. Select the **Has Class (POM Object)** node from the Access Manager rule tree, and update the **Import/Export** access control list (ACL) with the following details:

    | Condition | Value | Accessor Type | Accessor | Privileges |
    |-----------|-------|---------------|----------|------------|
    | Has Class | POM Application Object | World | | **Grant these privileges:** <br/>• Export<br/>• Import<br/>• Transfer Out<br/>• Transfer In |
    |  | | Remote Site | | **Grant these privileges:** <br/>• Write<br/>• Publish<br/>• Subscribe<br/>• Export<br/>• Import<br/>• Transfer Out<br/>• Transfer In<br/>• Remote Check-Out<br/>• Check-In/Check-Out |

    ![Image](./image_500.png)

2. Select the **Has Class (POM Object) > Has Class (WorkspaceObject) > Has Class (Vm0SupplierResponseObject)** node from the AM rule tree, and update the **UspSupplierResponseACL** ACL with the following details: 

    | Condition | Value | Accessor Type | Accessor | Privileges |
    |-----------|-------|---------------|----------|------------|
    | Is USP Response Editable | | World | | **Grant these privileges:** <br/>• Write<br/>• Remote Check-Out<br/>• Check-In/Check-Out |

    ![Image](./image_507.png)

3. Select the **Has Class (POM Object) > Is Current Group External > User In Attached IP License** node from the AM rule tree, and update the **ACL For Partner Object** ACL with the following details: 

    | Condition | Value | Accessor Type | Accessor | Privileges |
    |-----------|-------|---------------|----------|------------|
    | Is USP Partner Object Editable | | Groups with Security | External | **Grant these privileges:** <br/>• Write<br/>• Remote Check-Out<br/>• Check-In/Check-Out |

    ![Image](./image_504.png)

4.  Select the **Has Class (POM Object) > Is Current Group External > User In Attached IP License** node from the AM rule tree, and create the **UserInAttachedLicenseCategoryAcl** ACL with the following details: 

    | Condition | Value | Accessor Type | Accessor | Privileges |
    |-----------|-------|---------------|----------|------------|
    | User in Attach IP Lic Of Ctgry | Category RW | Groups with Security | External | **Grant these privileges:** <br/>• Read<br/>• Write<br/>• Remote Check-Out<br/>• Check-In/Check-Out |

    ![Image](./image_521.png)

5. Select the **Has Class (POM Object) > Is Current Group External >User In Attached IP License** node from the AM rule tree, and update the **Deny Read Access To External Group** ACL with the following details: 

    | Condition | Value | Accessor Type | Accessor | Privileges |
    |-----------|-------|---------------|----------|------------|
    | Has Class | Usp0OEMRefXChnge | Groups with Security | External | **Deny this privileges:** Read |

    ![Image](./image_508.png)

6. Select the **Has Class (POM Object) > Is Current Group External >User In Attached IP License** node from the AM rule tree, and update the **Deny Read Access To External Group** ACL with the following details: 

    | Condition | Value | Accessor Type | Accessor | Privileges |
    |-----------|-------|---------------|----------|------------|
    | Has Class | Usp0OEMRefXChngeRevision | Groups with Security | External | **Deny this privileges:** Read |

    ![Image](./image_509.png)

7. Select the **Has Class (POM Object) > Is Current Group External >Has Class(VariantRule)** node from the AM rule tree, and create the **ACL For Exchange Line** ACL with the following details:

    | Condition | Value | Accessor Type | Accessor | Privileges |
    |-----------|-------|---------------|----------|------------|
    | Has Class | VariantRule | Groups with Security | External | **Grant this privileges:** <br/>• Read<br/>• Write |

    ![Image](./image_510.png)

8. Select the **Has Class (POM Object) > Is Current Group External >Has Class(RevisionRule)** node from the AM rule tree, and use the **ACL For Exchange Line** ACL with the following details:

    | Condition | Value | Accessor Type | Accessor | Privileges |
    |-----------|-------|---------------|----------|------------|
    | Has Class | RevisionRule | Groups with Security | External | **Grant this privileges:** <br/>• Read<br/>• Write |

    ![Image](./image_511.png)

9. Select the **Has Class (POM Object) > Is Current Group External >Has Class(Vm0ExchangeLine)** , and create the **ACL For Supplier Exchange Line** ACL with the following details:

    | Condition | Value | Accessor Type | Accessor | Privileges |
    |-----------|-------|---------------|----------|------------|
    | Has Class | Vm0ExchangeLine | Groups with Security | External | **Deny this privileges:** Read |

    ![Image](./image_512.png)

10. Select the **Has Class (POM Object) > Is Current Group External >Has Class(Vm0ExchangeLine)>Is USP Exchange Line Visible** , and create the **ACL On Exchange Line Visibility** ACL with the following details:

    | Condition | Value | Accessor Type | Accessor | Privileges |
    |-----------|-------|---------------|----------|------------|
    | Has Class | Vm0ExchangeLine | Groups with Security | External | **Grant this privileges:** Read |

    ![Image](./image_513.png)

11. Select the **Has Class (POM Object) > Is Current Group External > Has Class(Usp0DesignXChangeRevision)** , and create the **CancelledVisibilityACL** ACL with the following details:

    | Condition | Value | Accessor Type | Accessor | Privileges |
    |-----------|-------|---------------|----------|------------|
    | Has Attribute | Usp0DesignXChangeRevision:vm0Status=Cancelled | Groups with Security | External | **Grant this privileges:** Read |

    ![Image](./image_519.png)

12. Select the **Has Class (POM Object) > Has Class (WorkspaceObject)** node from the AM rule tree, and update the **ACL For Partner Object** ACL with the following details: 

    | Condition | Value | Accessor Type | Accessor | Privileges |
    |-----------|-------|---------------|----------|------------|
    | Is USP Partner Object Editable | | Groups with Security | External | **Grant these privileges:** <br/>• Write<br/>• Remote Check-Out<br/>• Check-In/Check-Out |

    ![Image](./image_505.png)

13. Select the **Has Class (POM Object) > Has Class (WorkspaceObject) > Has Class (Dataset)** node from the AM rule tree, and update the **ACL for Dataset** ACL with the following details: 

    | Condition | Value | Accessor Type | Accessor | Privileges |
    |-----------|-------|---------------|----------|------------|
    | Is Supplier Data Editable to OEM | | World | | **Grant these privileges:** <br/>• Write<br/>• Remote Check-Out<br/>• Check-In/Check-Out |

    ![Image](./image_506.png)


#### Preferences

The following preferences are required to be set on OEM Supplier Site

| Parameter | Description |
|-----------|-------------|
| SUPPORTAL_share_site_names | Specifies the Teamcenter site names to which data exchanges can be shared. Get the value from site_util command site_name value. |

#### Supplier Connect Orchestration Translator Changes

1. Navigate to path D:\Siemens\TC_Version\Dispatcher\Module\Translators\supportalorchestrationservice on dispatcher machine and open supportalorchestrationservice.bat file
2. Update the -u, -pf and -g parameters for tcxadmin user credentials in the following line:

    `"%TC_ROOT%\bin\supportal_orchestration.exe" -u="CHANGE_ME" -pf="CHANGE_ME" -g="CHANGE_ME" %arg1%=%arg2%`

3. [Stop Dispatchers](../../../Tenant%20Onboarding/Teamcenter%20Dispatcher%20and%20Translators/Teamcenter%20Dispatcher%20Installation#stopping-dispatcher-services)
4. [Start Dispatchers](../../../Tenant%20Onboarding/Teamcenter%20Dispatcher%20and%20Translators/Teamcenter%20Dispatcher%20Installation#starting-dispatcher-services)
