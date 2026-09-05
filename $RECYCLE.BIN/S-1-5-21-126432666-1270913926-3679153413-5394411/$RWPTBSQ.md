<!-- ### Teamcenter X Enterprise Cloud Account (ECA) Setup

For production environments, the Purchase team creates the Entitlement and the Enterprise Cloud Account (ECA) is created in the process. The ECA ID is then communicated to the CAPS team via the SAP Order form.  
The creation of the ECA will automatically create a new Customer SAM account from which the SAMAuth and DSS keys needed by the provisioning script will be generated.

#### Teamcenter X SKU Details as a Prerequisite for ECA Creation

SKU (Stock Keeping Unit) refers to a unique identifier assigned to a product or service to facilitate tracking and management in inventory, sales, and fulfillment processes. In the context of Teamcenter X, SKUs represent specific product configurations, tiers, or solutions. Each SKU corresponds to a particular offering and includes details such as product name and tier.  
- Pre-production  

| **SKU**       | **Product**                                                        | **Product Tier**                      |
|---------------|--------------------------------------------------------------------|---------------------------------------|
| TC7003-XT    | Teamcenter X                                                        | Author                                |
| TC10102-XT   | Teamcenter X                                                        | Consumer                              |
| TC7100        | Teamcenter X Standard                                              | Author                                |
| TC7102        | Teamcenter X Standard                                              | Consumer                              |
| TC7101        | Teamcenter X Advanced                                              | Author                                |
| TC7103        | Teamcenter X Advanced                                              | Consumer                              |
| TC7108        | Solid Works Integration for Teamcenter X Standard                  |                                       |
| TC7109        | Creo Integration for Teamcenter X Standard                         |                                       |
| TC7110        | AutoCAD Integration for Teamcenter X Standard                      |                                       |
| TC7111        | Inventor Integration for Teamcenter X                              |                                       |
| TC7118        | Solid Works Integration for Teamcenter X Advanced                  |                                       |
| TC7201        | Integration for Mentor PADs for Teamcenter X Advanced              | AddOn Dependencies for TC7101, TC7103 |
| TC7202        | EDA Library Manager Mentor PADs for Teamcenter X Advanced          | AddOn Dependencies for TC7101, TC7103 |
| TC7203        | Integration for Altium Design for Teamcenter X Advanced            | AddOn Dependencies for TC7101, TC7103 |
| TC7209        | Creo Integration for Teamcenter X Advanced                         |                                       |
| TC7210        | AutoCAD Integration for Teamcenter X Advanced                      |                                       |
| TC7211        | Inventor Integration for Teamcenter X Advanced                     |                                       |

**Industry Solution SKU's:**  

| **SKU**         | **Product**     | **Industry Solution**                                             |
|-----------------|-----------------|-------------------------------------------------------------------|
| TC032025-XT     | Teamcenter X    | Teamcenter PLM for Machine Builders X3                           |
| TC032027-XT     | Teamcenter X    | Teamcenter PLM for Machine Builders X5                           |
| TC032031-XT     | Teamcenter X    | Teamcenter PLM for Medical Devices X3                            |
| TC032034-XT     | Teamcenter X    | Teamcenter PLM for Medical Devices X5                            |
| TC032035-XT     | Teamcenter X    | Medical Device Labeling and UDI Solution                         |
| TC032043-XT     | Teamcenter X    | Teamcenter PLM for Component Manufacturers X3                    |
| TC032045-XT     | Teamcenter X    | Teamcenter PLM for Component Manufacturers X5                    |
| TC032050-XT     | Teamcenter X    | Teamcenter Semiconductor Lifecycle Management Foundation         |
| TC032051-XT     | Teamcenter X    | Teamcenter Semiconductor Lifecycle Management IC Design          |
| TC032053-XT     | Teamcenter X    | Teamcenter Semiconductor Lifecycle Management IC Mfg             |
| TC032056-XT     | Teamcenter X    | Teamcenter Semiconductor Lifecycle Management NPI NTI            |


- Dryrun  

| **SKU**       | **Product**                                                        | **Product Tier**                             |
|---------------|---------------------------------------------------------------------|-----------------------------------------------|
| TC7003-DR     | Teamcenter X                                                       | Author                                        |
| TC10102-DR    | Teamcenter X                                                       | Consumer                                      |
| TC7100-DR     | Teamcenter X Standard                                              | Author                                        |
| TC7102-DR     | Teamcenter X Standard                                              | Consumer                                      |
| TC7101-DR     | Teamcenter X Advanced                                              | Author                                        |
| TC7103-DR     | Teamcenter X Advanced                                              | Consumer                                      |
| TC7108-DR     | Solid Works Integration for Teamcenter X Standard                  |                                               |
| TC7109        | Creo Integration for Teamcenter X Standard                         |                                               |
| TC7110        | AutoCAD Integration for Teamcenter X Standard                      |                                               |
| TC7111        | Inventor Integration for Teamcenter X                              |                                               |
| TC7118-DR     | Solid Works Integration for Teamcenter X Advanced                 |                                               |
| TC7201-DR     | Integration for Mentor PADs for Teamcenter X Advanced             | AddOn Dependencies for TC7101-DR, TC7103-DR   |
| TC7202-DR     | EDA Library Manager Mentor PADs for Teamcenter X Advanced         | AddOn Dependencies for TC7101-DR, TC7103-DR   |
| TC7203-DR     | Integration for Altium Design for Teamcenter X Advanced           | AddOn Dependencies for TC7101-DR, TC7103-DR   |
| TC7209        | Creo Integration for Teamcenter X Advanced                        |                                               |
| TC7210        | AutoCAD Integration for Teamcenter X Advanced                     |                                               |
| TC7211        | Inventor Integration for Teamcenter X Advanced                    |                                               |
| NXX35100     | Designcenter NX X Design VBL 100 pack            |  This product has dependency to the DesignCenter primary tier products   |

**Industry Solution SKU's:**  

| **SKU**         | **Product**    | **Industry Solution**                                           |
|-----------------|----------------|------------------------------------------------------------------|
| TC032025-DR     | Teamcenter X   | Teamcenter PLM for Machine Builders X3                          |
| TC032027-DR     | Teamcenter X   | Teamcenter PLM for Machine Builders X5                          |
| TC032031-DR     | Teamcenter X   | Teamcenter PLM for Medical Devices X3                           |
| TC032034-DR     | Teamcenter X   | Teamcenter PLM for Medical Devices X5                           |
| TC032035-DR     | Teamcenter X   | Medical Device Labeling and UDI Solution                        |
| TC032043-DR     | Teamcenter X   | Teamcenter PLM for Component Manufacturers X3                   |
| TC032045-DR     | Teamcenter X   | Teamcenter PLM for Component Manufacturers X5                   |
| TC032050-DR     | Teamcenter X   | Teamcenter Semiconductor Lifecycle Management Foundation        |
| TC032051-DR     | Teamcenter X   | Teamcenter Semiconductor Lifecycle Management IC Design         |
| TC032053-DR     | Teamcenter X   | Teamcenter Semiconductor Lifecycle Management IC Mfg            |
| TC032056-DR     | Teamcenter X   | Teamcenter Semiconductor Lifecycle Management NPI NTI           |


- Production  

| **SKU**        | **Product**                                               | **Product Tier**                                 |
|----------------|-----------------------------------------------------------|--------------------------------------------------|
| TC7003-XT      | Teamcenter X                                              | Author                                           |
| TC10102-XT     | Teamcenter X                                              | Consumer                                         |
| TC7100         | Teamcenter X Standard                                     | Author                                           |
| TC7102         | Teamcenter X Standard                                     | Consumer                                         |
| TC7101         | Teamcenter X Advanced                                     | Author                                           |
| TC7103         | Teamcenter X Advanced                                     | Consumer                                         |
| TC7108         | Solid Works Integration for Teamcenter X Standard         |                                                  |
| TC7109         | Creo Integration for Teamcenter X Standard                |                                                  |
| TC7110         | AutoCAD Integration for Teamcenter X Standard             |                                                  |
| TC7111         | Inventor Integration for Teamcenter X                     |                                                  |
| TC7118         | Solid Works Integration for Teamcenter X Advanced         |                                                  |
| TC7201         | Integration for Mentor PADs for Teamcenter X Advanced     | AddOn Dependencies for TC7101, TC7103            |
| TC7202         | EDA Library Manager Mentor PADs for Teamcenter X Advanced | AddOn Dependencies for TC7101, TC7103            |
| TC7203         | Integration for Altium Design for Teamcenter X Advanced   | AddOn Dependencies for TC7101, TC7103            |
| TC7209         | Creo Integration for Teamcenter X Advanced                |                                                  |
| TC7210         | AutoCAD Integration for Teamcenter X Advanced             |                                                  |
| TC7211         | Inventor Integration for Teamcenter X Advanced            |                                                  |
| NXX35100       | Designcenter NX X Design VBL 100 pack                     | This product has dependency to the DesignCenter primary tier products   |

**Industry Solution SKU's:**  

| **SKU**         | **Product**    | **Industry Solution**                                           |
|-----------------|----------------|------------------------------------------------------------------|
| TC032025-XT     | Teamcenter X   | Teamcenter PLM for Machine Builders X3                          |
| TC032027-XT     | Teamcenter X   | Teamcenter PLM for Machine Builders X5                          |
| TC032031-XT     | Teamcenter X   | Teamcenter PLM for Medical Devices X3                           |
| TC032034-XT     | Teamcenter X   | Teamcenter PLM for Medical Devices X5                           |
| TC032035-XT     | Teamcenter X   | Medical Device Labeling and UDI Solution                        |
| TC032043-XT     | Teamcenter X   | Teamcenter PLM for Component Manufacturers X3                   |
| TC032045-XT     | Teamcenter X   | Teamcenter PLM for Component Manufacturers X5                   |
| TC032050-XT     | Teamcenter X   | Teamcenter Semiconductor Lifecycle Management Foundation        |
| TC032051-XT     | Teamcenter X   | Teamcenter Semiconductor Lifecycle Management IC Design         |
| TC032053-XT     | Teamcenter X   | Teamcenter Semiconductor Lifecycle Management IC Mfg            |
| TC032056-XT     | Teamcenter X   | Teamcenter Semiconductor Lifecycle Management NPI NTI           |



#### How to get more details on the ECA and Customer SAM Account using lio portal

When an order is placed in SAP for bundled Teamcenter Share and Teamcenter X from the customer, a SAM account is already created with the entitlement for Teamcenter Share. This account is the same as the Teamcenter X customer SAM account. Do not raise any request for a new customer account.  
The CAPS team will get the email once ECA is created with entitlement. In the LioPortal the CAPS team will get the required information about this account like customer ID.  
If the CAPS team does not have access to LioPortal then drop a mail to the email IDs mentioned on the LioPortal. It takes around a day to get access to LioPortal.  
After successful login, the LioPortal looks like:  
![LioPortal](./image_132.png)  

User can click on Search and get the required tenant info by searching ECA account id.  
![Search Tenant Info](./image_133.png)  

This portal also gives you information about how many applications the customer has the entitlement.  

**For development testing purposes only**, the Enterprise Cloud Account input can be created through the following steps:  
Go to Entitlement Express portal and create a product entitlement.

![Entitlement Express](./image_134.png)  

Fill the form:  
- Select Entitlement Type as **Subscription**.  
- Select Product SKU as "TC7003-XT" for Author and "TC10102-XT" for Consumer or any other required SKU from list for pre-prod only.[Teamcenter X SKU Details as a Prerequisite for ECA Creation](../../../Documentation/Tenant%20Onboarding/Pre-Reqs/Enterprise%20Cloud%20Account%20Setup#teamcenter-x-sku-details-as-a-prerequisite-for-eca-creation)  
- Select Product Version as "1.0".  
- Select the start date and expiry date of the subscription.  
- Select Quantity as per your requirement from dropdown.  
- For the field "Enterprise Cloud Account Id", click on "Lookup" and click "Create" if you need to create a new Enterprise Cloud account, otherwise select an existing account from the list against which the entitlement can be created. Note down the account id. This is to be used as the "EnterpriseCloudAccountId" input parameter.  
- Leave the rest of the inputs as it is and click on Create.  

Once the entitlement is created, you will see a popup:  
"Form received. Please check the result section for activation code."  
![Activation Code](./image_135.png)  

Go to License Insight Operations LIO portal and search for the created entitlement in order to find the corresponding customer SAM account created.  
![LIO Portal Search](./image_136.png)  

Click on Search and specify the Enterprise Cloud Account id from the previous step.  
Click Send. You should see the specific entitlement listed.  
The column named "Tenant Id" and "ECA id" are important. These are the input parameters `TenantSamAccountId` and `EnterpriseCloudAccountId` respectively required in the later steps.  
**Note:** Please do not create too many Enterprise Cloud accounts unless absolutely necessary. Kindly reuse your existing accounts.   -->


# Teamcenter X Enterprise Cloud Account (ECA) Setup Guide

This guide provides step-by-step instructions for setting up a Teamcenter X Enterprise Cloud Account (ECA) in production environments. The procedures are designed for both end users and technical operators, ensuring a clear workflow from SKU selection to entitlement validation.

---

**Quick Start Summary**

 1. Confirm SKUs required for your Teamcenter X environment.
 2. The Purchase team initiates entitlement creation, which generates the ECA and Customer SAM account automatically.
 3. Use the SAP Order form to share the ECA ID with the CAPS team.
 4. Validate entitlement and account details through the Lio Portal.

---

## Introduction and Setup Overview

In production setups, your organization’s Purchase team creates the necessary Entitlement. This process automatically generates an Enterprise Cloud Account (ECA). The ECA ID is then communicated to the CAPS team using the SAP Order form.

**Key Workflow:**
- ECA creation also creates a new Customer SAM account.
- The provisioning script uses keys (SAMAuth, DSS) generated from this Customer SAM account.

## SKU Details and Product Selection

SKU (Stock Keeping Unit) uniquely identifies products or services within Teamcenter X, specifying product configuration, tier, and solution. Select the appropriate SKU for your environment using the tables below.

### Pre-production SKUs

| **SKU**        | **Product**                                       | **Product Tier**                       |
|----------------|---------------------------------------------------|----------------------------------------|
| TC7003-XT      | Teamcenter X                                      | Author                                 |
| TC10102-XT     | Teamcenter X                                      | Consumer                               |
| TC7100         | Teamcenter X Standard                             | Author                                 |
| TC7102         | Teamcenter X Standard                             | Consumer                               |
| TC7101         | Teamcenter X Advanced                             | Author                                 |
| TC7103         | Teamcenter X Advanced                             | Consumer                               |
| TC7108         | Solid Works Integration for Teamcenter X Standard |                                        |
| TC7118         | Solid Works Integration for Teamcenter X Advanced |                                        |
| TC7201         | Mentor PADs Integration (Advanced)                | AddOn Dependencies for TC7101, TC7103  |
| TC7202         | EDA Library Manager (Advanced)                    | AddOn Dependencies for TC7101, TC7103  |
| TC7203         | Altium Design Integration (Advanced)              | AddOn Dependencies for TC7101, TC7103  |

#### Industry Solution SKUs for pre-production

| **SKU**         | **Product**      | **Industry Solution**                                      |
|-----------------|------------------|------------------------------------------------------------|
| TC032025-XT     | Teamcenter X     | PLM for Machine Builders X3                                |
| TC032027-XT     | Teamcenter X     | PLM for Machine Builders X5                                |
| TC032031-XT     | Teamcenter X     | PLM for Medical Devices X3                                 |
| TC032034-XT     | Teamcenter X     | PLM for Medical Devices X5                                 |
| TC032035-XT     | Teamcenter X     | Medical Device Labeling and UDI Solution                   |
| TC032043-XT     | Teamcenter X     | PLM for Component Manufacturers X3                         |
| TC032045-XT     | Teamcenter X     | PLM for Component Manufacturers X5                         |
| TC032050-XT     | Teamcenter X     | Semiconductor Lifecycle Mgmt Foundation                    |
| TC032051-XT     | Teamcenter X     | Semiconductor Lifecycle Mgmt IC Design                     |
| TC032053-XT     | Teamcenter X     | Semiconductor Lifecycle Mgmt IC Mfg                        |
| TC032056-XT     | Teamcenter X     | Semiconductor Lifecycle Mgmt NPI NTI                       |

### Dryrun SKUs

| **SKU**      | **Product**                                       | **Product Tier**                             |
|--------------|---------------------------------------------------|----------------------------------------------|
| TC7003-DR    | Teamcenter X                                      | Author                                       |
| TC10102-DR   | Teamcenter X                                      | Consumer                                     |
| TC7100-DR    | Teamcenter X Standard                             | Author                                       |
| TC7102-DR    | Teamcenter X Standard                             | Consumer                                     |
| TC7101-DR    | Teamcenter X Advanced                             | Author                                       |
| TC7103-DR    | Teamcenter X Advanced                             | Consumer                                     |
| TC7108-DR    | Solid Works Integration for Teamcenter X Standard |                                              |
| TC7118-DR    | Solid Works Integration for Teamcenter X Advanced |                                              |
| TC7201-DR    | Mentor PADs Integration (Advanced)                | AddOn Dependencies for TC7101-DR, TC7103-DR  |
| TC7202-DR    | EDA Library Manager (Advanced)                    | AddOn Dependencies for TC7101-DR, TC7103-DR  |
| TC7203-DR    | Altium Design Integration (Advanced)              | AddOn Dependencies for TC7101-DR, TC7103-DR  |
| NXX35100     | Designcenter NX X Design VBL 100 pack            |  This product has dependency to the DesignCenter primary tier products   |
| TC30600-XT   | Teamcenter Integration for NX            |  |

#### Industry Solution SKUs for dryrun

| **SKU**         | **Product**      | **Industry Solution**                                 |
|-----------------|------------------|-------------------------------------------------------|
| TC032025-DR     | Teamcenter X     | PLM for Machine Builders X3                           |
| TC032027-DR     | Teamcenter X     | PLM for Machine Builders X5                           |
| TC032031-DR     | Teamcenter X     | PLM for Medical Devices X3                            |
| TC032034-DR     | Teamcenter X     | PLM for Medical Devices X5                            |
| TC032035-DR     | Teamcenter X     | Medical Device Labeling and UDI Solution              |
| TC032043-DR     | Teamcenter X     | PLM for Component Manufacturers X3                    |
| TC032045-DR     | Teamcenter X     | PLM for Component Manufacturers X5                    |
| TC032050-DR     | Teamcenter X     | Semiconductor Lifecycle Mgmt Foundation               |
| TC032051-DR     | Teamcenter X     | Semiconductor Lifecycle Mgmt IC Design                |
| TC032053-DR     | Teamcenter X     | Semiconductor Lifecycle Mgmt IC Mfg                   |
| TC032056-DR     | Teamcenter X     | Semiconductor Lifecycle Mgmt NPI NTI                  |

### Production SKUs

| **SKU**      | **Product**                                       | **Product Tier**                             |
|--------------|---------------------------------------------------|----------------------------------------------|
| TC7003-XT    | Teamcenter X                                      | Author                                       |
| TC10102-XT   | Teamcenter X                                      | Consumer                                     |
| TC7100       | Teamcenter X Standard                             | Author                                       |
| TC7102       | Teamcenter X Standard                             | Consumer                                     |
| TC7101       | Teamcenter X Advanced                             | Author                                       |
| TC7103       | Teamcenter X Advanced                             | Consumer                                     |
| TC7108       | Solid Works Integration for Teamcenter X Standard |                                              |
| TC7118       | Solid Works Integration for Teamcenter X Advanced |                                              |
| TC7201       | Mentor PADs Integration (Advanced)                | AddOn Dependencies for TC7101, TC7103        |
| TC7202       | EDA Library Manager (Advanced)                    | AddOn Dependencies for TC7101, TC7103        |
| TC7203       | Altium Design Integration (Advanced)              | AddOn Dependencies for TC7101, TC7103        |
| NXX35100     | Designcenter NX X Design VBL 100 pack            |  This product has dependency to the DesignCenter primary tier products   |
| TC30600-XT   | Teamcenter Integration for NX           |  |

#### Industry Solution SKUs for production

| **SKU**         | **Product**      | **Industry Solution**                                 |
|-----------------|------------------|-------------------------------------------------------|
| TC032025-XT     | Teamcenter X     | PLM for Machine Builders X3                           |
| TC032027-XT     | Teamcenter X     | PLM for Machine Builders X5                           |
| TC032031-XT     | Teamcenter X     | PLM for Medical Devices X3                            |
| TC032034-XT     | Teamcenter X     | PLM for Medical Devices X5                            |
| TC032035-XT     | Teamcenter X     | Medical Device Labeling and UDI Solution              |
| TC032043-XT     | Teamcenter X     | PLM for Component Manufacturers X3                    |
| TC032045-XT     | Teamcenter X     | PLM for Component Manufacturers X5                    |
| TC032050-XT     | Teamcenter X     | Semiconductor Lifecycle Mgmt Foundation               |
| TC032051-XT     | Teamcenter X     | Semiconductor Lifecycle Mgmt IC Design                |
| TC032053-XT     | Teamcenter X     | Semiconductor Lifecycle Mgmt IC Mfg                   |
| TC032056-XT     | Teamcenter X     | Semiconductor Lifecycle Mgmt NPI NTI                  |

---

## Accessing ECA and Customer SAM Account Details

When an SAP order is placed for bundled Teamcenter Share and Teamcenter X, the Customer SAM account is automatically created and linked to Teamcenter Share entitlement.

**Important Steps:**

1. No need to request a new customer account; it is already set up during SAP order placement.
2. The CAPS team receives an email once the ECA is created with its entitlement.
3. To view account details:
    - Access the LioPortal to retrieve information such as Customer ID.  
      ![LioPortal](./image_132.png) 
    - Use the "Search" function with the ECA Account ID to display tenant info.  
      ![Search Tenant Info](./image_133.png) 

4. The portal shows the number of applications the customer is entitled to.

---

## One-time ECA enablement before provisioning SAM 2.0-based TcX environments

> **Note**
> 
> Ignore this section if don't intend to provision a SAM 2.0-based TcX environment.

Once a fresh ECA is created for a customer, it has to be enabled by selecting the right FDS region.

The process to be followed is almost exactly same as described [here](../060_Enable%20Xcelerator%20Admin%20Console%20for%20Teamcenter%20X/010_Enable%20Admin%20console%20to%20assign%20users.md), but when calling the [Managed Product API endpoint](../060_Enable%20Xcelerator%20Admin%20Console%20for%20Teamcenter%20X/010_Enable%20Admin%20console%20to%20assign%20users.md#3-call-post-v1managed-productinfo) the parameter `isConfigurationComplete` should be set to `false`. 

> **Warning**
>
> Ensure that `isConfigurationComplete` is not set to `true`, as doing so will enable Admin Console access for the customer, which is not intended at this point.


## Development Testing Setup

For development and testing, you may manually create an Enterprise Cloud Account input:

1. Go to the [Entitlement Express portal](https://entitlement-express.prod.bas.sws.siemens.com/create).
2. Create a product entitlement by filling out the form as follows:  
   
   ![Entitlement Express](./image_134.png) 

   - **Entitlement Type:** Select **Subscription**
   - **Product SKU:** Choose "TC7003-XT" (Author), "TC10102-XT" (Consumer), or refer to [SKU Details](#sku-details-and-product-selection)
   - **Start/Expiry Date:** Enter the required subscription period
   - **Quantity:** Provide the necessary value in the field below.
   - **Enterprise Cloud Account Id:** Click **Lookup**; select to **Create** a new ECA or choose an existing account. Note the generated account id (required for the EnterpriseCloudAccountId parameter)
   - Leave other fields unchanged and click **Create**

3. After submission, a popup confirms receipt:  
   _"Form received. Please check the result section for activation code."_  
   ![Activation Code](./image_135.png) 

4. Next, open the License Insight Operations (LIO) portal and search for the entitlement created.  
   ![LIO Portal Search](./image_136.png)

5. Enter the ECA id, click **Send**. Review your entitlements:

   - **Tenant Id** and **ECA Id** are required input parameters for further provisioning steps (`TenantSamAccountId`, `EnterpriseCloudAccountId`).

> **Note**
> 
> Access the Production LIO Portal using the link below - [LIO Portal](https://lio.bas.sws.siemens.com/)

---

## Troubleshooting and Validation

### Validation Steps

- **Access Check:** Confirm you can log in to LioPortal after entitlement creation. If access is missing, request access via the portal's contact options and allow up to one business day.
- **SKU Assignment:** Ensure all selected SKUs match your intended product tier and solution before requesting entitlement.
- **Account Reuse:** Before creating a new ECA, verify if an existing account can be used to avoid unnecessary duplication.

### Common Issues

| Issue                                   | Resolution/Action                                             |
|------------------------------------------|--------------------------------------------------------------|
| Unable to locate ECA or Tenant info      | Ensure correct ECA Account ID is used in LioPortal Search    |
| Access to LioPortal denied               | Send access request to the support email listed in LioPortal |
| Incorrect SKU in entitlement             | Delete the test entitlement and recreate with the correct SKU|

---

> **Note**  
> Do not create more than necessary Enterprise Cloud Accounts. Always attempt to reuse existing accounts to maintain organizational clarity.

---

## Warnings and Notes

> **Warning**
>
> Creating unnecessary Enterprise Cloud Accounts can complicate account management and increase administrative overhead. Only create new ECAs when existing accounts do not meet specific entitlement requirements.

> **Note**
>
> The Customer SAM Account created by the SAP order is valid for both Teamcenter Share and Teamcenter X. Do not duplicate customer accounts.
