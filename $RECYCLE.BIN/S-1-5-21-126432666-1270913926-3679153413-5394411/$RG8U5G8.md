# Inputs required for pipeline execution:

The client credentials - including Client ID, Client Secret, Tenant ID, and Enterprise App Name are received from the Customer Azure Admin team (as part of the '010_Azure Application Registration' step) and will be used as input for pipeline execution.

**Responsibility: CApS team's responsibility to securely acquire and integrate the following essential parameters into the TcX pipeline:**

TcTeamcenterReportServiceInput:
1. TCREPAppClientSecret (Client Secret of your Azure Application)

2. TCREPAppClientId (Client ID of your Azure Application)

3. TCREPAppTenantId (Tenant ID of your Azure Application)

4. TCREPEnterpriseAppName (Enterprise App Name/Display Name of your Azure Application)


**Enter inputs in Ansible as shown in below image:**

![alt text](Ansible_inputs-latest.png)