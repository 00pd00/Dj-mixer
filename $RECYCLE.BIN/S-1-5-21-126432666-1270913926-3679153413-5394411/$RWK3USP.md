## Smoke Test

Variant Matrix is expected to be installed without issues during deployment. The following smoke tests can be performed to confirm that the installation was successful: 

### Validate via Create Panel (No Object Creation Required) 

If the business object of type “Product EBOM” is used as the Product Line type (as defined by its real name "Fnd0EBOMRootRevision" in the preference “Vm3QualifyProductLine” by default as OOTB), one can check if the Variant Matrix is installed or not without creating a new object, by checking whether the Enable Variant Matrix property is visible on Create Panel. 

Steps: 
- Login to the AWC environment and open the Author workspace. 
- Click on the Explorer tile to access object creation and navigation options. 
- Click on Add and select the object type: Product EBOM. 
- In this Create Panel, check for the “Enable Variant Matrix” Boolean property. 
- It should be visible with default value selected as False. 

![Image](./image_1.png)

 
The visibility of this property means the Variant Matrix is installed. There’s no need to create a new Product Line to verify this. 
**Note:** If the business object defined in the preference “Vm3QualifyProductLine” is different than the Product EBOM or its subtype, then this “Enable Variant Matrix” property may not appear on the Create Panel. Customers will have flexibility if they want to use a different type as Product Line by changing the value of this preference. 
 
### Validate the Variant Matrix Tab via Existing or New Product Line Object 
If a Product Line object of a type listed in the “Vm3QualifyProductLine” preference already exists, use it for validation. Only create a new object if none exists. 
Steps: 
- If the required business object already exists, please jump to step: d directly. 
- Login to the AWC environment and open the Author workspace. 
- Click on the Explorer tile.  
- Click on Add – select the object type listed in the **“Vm3QualifyProductLine”** preference (e.g.: Product EBOM). Make sure to select ‘Enable Variant Matrix’ as “True” if the object type is Product EBOM or its subtype. Add it. 
![Image](./image_2.png)

 
- Open the created or existing object / Product Line. 
- For the Product EBOM:  
  - Navigate to the Content Page 
  - Click on the Details toggle. 
  - The Variant Matrix Tab should be visible. (Refer to the below image.) 
![Image](./image_3.png)


Fig.: Variant Matrix command visible on opening the Product Line  
**Note:** It is not required for the Product Line object to have a complete BOM structure for validation. A basic object suffices for confirming Variant Matrix functionality. 
 
 
### Troubleshooting: 
a. If any issue is faced like the Variant Matrix Tab is not visible on opening the Product Line, check if the following preferences which are automatically set to these default values during package implementation are configured correctly with the respective values. 
 
| Preference Name         | Value                  |
|------------------------|------------------------|
| Vm3QualifyProductLine  | Fnd0EBOMRootRevision    |
| Vm3QualifyModule       | Fnd0EBOMRootRevision    |
| Vm3QualifyVariant      | Part Revision          |

 
Steps:
- Log in to the AWC environment using a DBA user account. 
- From Admin Workspace, open the Preferences. 
- Search for each preference listed above. 
- Confirm that the value matches exactly. 
**Note:** Do not modify the preferences unless explicitly required by a specific configuration or support directive. These values are set as part of the deployment package. 
Customers have flexibility to change the type for Product Line as per their requirement. For Product Line other than Product EBOM, its value should be updated in the first two preferences. 
 
In the source code, check if there’s latest Variant Matrix code and if it is compatible with the respective version. This can be verified by checking the version specified in the “kit.json” file located at “/`<tenant_D>`-`F`/`<tenant_D>`-`<EnvType>`/deploy /aws2/stage/src/variantMatrix/kit,json”. 

![Image](./image_4.png)

Fig.: kit.json present inside variantMatrix src code 
