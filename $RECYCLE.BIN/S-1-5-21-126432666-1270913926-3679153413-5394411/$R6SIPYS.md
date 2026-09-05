# Provisioning Teamcenter Teams Broker App

## Purpose 

The purpose of this document is to help CApS team execute the steps to onboard and offboard a customer. 

## Provisioning the Customer Tenant

### Add an entry in the control plane manager database for the new tenant onboarding

**Who**: CApS

**Required Access**: Read/write in the production control plane manager database.

### Pre-requisites:
1. CApS team members should have SPLM user accounts.
2. Customer Azure Tenant ID and customer Teamcenter Admin email id are available to CApS through the SNOW ticket.
3. Access to storage account mentioned in below steps should be provided to CApS team person. If not provided, please reach out to Mahesh Nijampurkar.

**Steps**:

1. Navigate to Azure Portal (https://portal.azure.com) and login with SPLM user account (e.g. user_id@splm.siemens.com).
2. Go to the resource group **rg-teamsapp-prod-b3dc**.
3. Open the Storage Account called **stctrlteamsappprodbq**.
4. Navigate to the table called **controlplaneDB**.
![Image](./001_img_controlplaneDB.png) 
5. Add a new entry by clicking the button **Add entity**:
> Fill in only the following fields:  
>> I. **PartitionKey**: new Tenant ID to onboard.  
>> II. **RowKey**: new Tenant ID to onboard.  
>> III. **AdministratorEmail**:  _unique_email_ of the administrator who will initiate the onboarding process. 
![Image](./002_img_add_entity.png) 
6. Click Insert to add the entity.
7. The other fields will be filled in automatically by the onboarding procedure. 