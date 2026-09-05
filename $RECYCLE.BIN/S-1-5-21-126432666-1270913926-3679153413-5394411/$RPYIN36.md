# Validation Steps for Battery Solutions

**Applicable Product IDs:** TC032063-XT, TC032064-XT

**Pre-requisites:**
For X5, following are prerequisite product IDs

- TC030505-XT TC Integrated Material Management (IMM)
- TC030101-XT Requirements Manager User
- TC030202-XT Teamcenter Test and Verification Management

This guide provides post-deployment validation steps for Battery Solutions in Teamcenter X.

---

## Smoke Tests

### Create Battery BOM

1. Log in to Active Workspace (AW) as **Battery Engineer**.
2. Click New → Add.
3. In the Type filter, select **Battery Pack**.
4. Set property values **Battery Type** on create panel and click on **Add**.
5. Open the object in **Content** view.
6. Create a tree structure as follows -
   - Battery Pack
     - Battery Module
       - Battery Cell
         - Electrode
           - Formula material
           - Battery part
         - Formula material
         - Battery part
     - Battery part
7. Submit **Battery Pack** to "**BOM Release Process**" workflow.
   ![Image](./image_150_001.png)

---

### Create Requirements and parameters

1. Log in to Active Workspace (AW) as **Battery Engineer**.
2. Click New → Add.
3. In the Type filter, select **Requirement**.
4. Open it in **Contents** view.
5. Set secondary work area to **Details** view.
6. Navigate to **Parameters** page, add few parameters.

---

### Create Design of experiment

1. Log in to Active Workspace (AW) as **Battery Engineer**.
2. Click New → Add.
3. In the Type filter, select **Battery Cell** object , add the required details and click on **Add**.
4. Open the object in **Details** view
5. Click on **New** → **Create Experiment Design** from right wall command. Select checkbox **Open on create** and click on **Create**.
6. Go to **Contents** view. Edit the properties "**Subject**" and "**Study area**" on **Overview** page.
7. Add **Requirement** object created in above test in the **Requirements** table on **Overview** page.
   - **Validation**
     - Validate the **State** property is read only and set to **Authoring**.
     - Validate that the parameters from **Requirement** object are populated in the parameters table of **Experiment Design**.
8. Click on Add → Child and add a **Study** object as child.
   - **Validation:** Validate that it inherits requirements and parameters from parent DoE.
9. Set the parameter measurements.
   - **Validation:** Validate that the result column gets populated appropriately (Pass/Fail).
10. Edit the property **Execution** for Study object to "In Progress".
    - **Validation:** Validate the state property is read only and set to "Authoring".

![Image](./image_150_002.png)

![Image](./image_150_003.png)
