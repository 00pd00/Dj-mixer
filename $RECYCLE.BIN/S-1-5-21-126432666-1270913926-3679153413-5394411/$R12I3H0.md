# Validation Steps for Machine Builders

**Applicable Product IDs:** TC032025-XT, TC032027-XT

This guide provides step-by-step validation steps for Machine Builder deployments, including tests for object creation, workflow submission, preferences, and BOM cloning.

For TC032027-XT, following is prerequisite product ID

- TC030101-XT - Requirements Manager User
---

## Deploy Tests

### Create Machine

1. Login to the TCX environment through AW as a MyOrg.Engineering user.
2. Click **New → Add**.
3. In the Type filter, select **Industrial Machine**.
4. Enter the serial number and name, then click **Add**.  
   - **Validation:** Ensure the object is created.
5. In the **Machine Specifications** section, select an existing specification document.
6. Submit it to the workflow "**Machine Builder Requirement Specification Release Process**".
   - **Validation:** Ensure it is submitted and a signoff task appears in the user's Inbox.

---

### Create Installation Assembly

1. Login to the TCX environment through AW as a MyOrg.Engineering user.
2. Click **New → Add**.
3. In the Type filter, select **Installation Assembly**.
4. Enter the ID and name, then click **Add**.  
   - **Validation:** Ensure the object is created.
5. Submit it to the workflow "**Machine Builder IA Release Process**".
   - **Validation:** Ensure a signoff task is assigned after submission.

---

### Saved Queries

1. Login to the TCX environment through AW as a MyOrg.Engineering user.
2. Click **Advanced Search**.
3. Validate the search query "**Machine Builder - Order**" is available.
   - **Validation:** The query should include fields such as Order Number, Order version, etc.

---

### Preferences

1. Log in to AW as a **DBA** user.
2. Open **Preferences** and validate:

    - Existence of **Ord0OrderManagementEnabled**
      - **Validation:** Value is `true`
    - Existence of **IMS_default_requirementspec_type_for_machine**
      - **Validation:** Value is `RequirementSpec`
    - Existence of **IMS_workspace_landingpage_reports**
      - **Validation:** Value includes:
        ```
        TCIMS_9_00_ADV_RECENT_RPT_01:{"ID":"TCIMS_9_00_ADV_RECENT_RPT_01"}
        TCIMS_9_00_SUM_RPT_19:{"ID":"TCIMS_9_00_SUM_RPT_19"}
        TCIMS_9_00_SUM_RPT_14:{"ID":"TCIMS_9_00_SUM_RPT_14"}
        TCIMS_9_00_SUM_RPT_15:{"ID":"TCIMS_9_00_SUM_RPT_15"}
        TCIMS_9_00_SUM_RPT_16:{"ID":"TCIMS_9_00_SUM_RPT_16"}
        TCIMS_9_00_SUM_RPT_17:{"ID":"TCIMS_9_00_SUM_RPT_17"}
        TCIMS_9_00_SUM_RPT_18:{"ID":"TCIMS_9_00_SUM_RPT_18"}.
        ```
    - Existence of **AWC_Ord0Order.CREATERENDERING**
      - **Validation:** Value is `Ord0OrderCreate`

---

## Functionality

### BOM Clone

1. Login to the TCX environment through AW as a MyOrg.Engineering user.
2. Click **New → Add**. Select **Module** from the Type filter.
3. Enter required details and create the object.
4. Open the Module and go to **Contents**.
5. Add an **Installation Assembly** as a child.
6. Add a **Design** object as child to the Installation Assembly.
7. Add a **Part** as child to the Design object.
8. Select the **Module** object. Click the **Duplicate** command.
9. In the duplicates window:
    - **Validation:** The Module and Installation Assembly have the "**Save As**" action selected by default.
    - The action column for Part and Design objects is blank.

   ![Image](./image_361.png)