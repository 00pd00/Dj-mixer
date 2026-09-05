# Post-Deployment

## Test Suite Execution

Execute the following test suites based on your deployed product:

| Product ID | Product Name | Test Suite |
|------------|--------------|------------|
| TC032021-XT | Service Engineer | [Service Engineering Tests](../050_Tests/TC032021_ServiceEngineering-tests.md) |
| TC032023-XT | Service Asset Management | [Service Events Tests](../050_Tests/TC032023_ServiceEvents-tests.md) |
| TC032026-XT | Service Planner | [Service Plan Tests](../050_Tests/TC032026_ServicePlan-tests.md) |
| TC031201-XT | As Built Management | [As-Built Tests](../050_Tests/TC031201-XT_AsBuilt-tests.md) |
| TC032020-XT | Service Technician Access | [SWI Tests](../050_Tests/TC032020-XT_SWI-tests.md) |

## Required Configuration

### Service Engineer Role Setup

**Important**: Configure the Service Engineer role properly:

1. **Login** into active workspace using dba role. eg - tcxadmin
   - Select workspace as "Active Admin". Navigate to "organization" App. Refer below images for this.

   ![dba role selection](../media/image3_3.png)

   ![navigate to organization app](../media/image3_4.png)

2. **Remove** the "Service Engineer" role if its present within root level "Engineering" role

   ![Service Engineer Role Hierarchy](../media/image3_1.png)


3. **Include** "Service Engineer" role under the following hierarchy:
   - MyOrg → Engineering → Service Engineer

   ![Service Engineer Role Hierarchy](../media/image3.png)

      Refer below step for more details on how to include "Service Engineer" role within "MyOrg → Engineering → Service Engineer". If its already present as per above image then below step is not required.
      
      Search "Service Engineer" role and using "Add" button include it at "MyOrg → Engineering → Service Engineer".
      
      ![Service Engineer Role Hierarchy](../media/image3_2.png)


*Figure: Proper Service Engineer Role Configuration*

This configuration is essential for proper access control and functionality.
