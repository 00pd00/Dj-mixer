# Steps for CApS Team

**Responsibility: Siemens CApS team performs these steps prior to pipeline execution.**

The customer must confirm they have purchased the Microsoft M365 E-XX bundle containing the Office Online Server product.
Confirmation can be provided by email.

CApS Team Configuration Steps:

1. Configure Pipeline Parameters:
    
    a. Specify teamcenterx==6.0.0.rc88 for the TcXCliRequirement  
    ![Image](./images/tcxcli_input.png)

    b. Specify TCOOVIEWER-XT in the TeamcenterProductIDList section of the Ansible inputs

    c. Specify oo1officeonlineviewer in the TeamcenterPackageIDList section of the Ansible inputs
    ![Image](./images/ansible_inputs.png)

    d. Specify the following domain options in the Ansible inputs (The values shown are examples only):
    ![Image](./images/ad_ansible_inputs.png)

2. Deploy Integration Components:
    
    Execute deployment pipeline with TcOOWeb configuration. This will:
    - Create an EC2 instance/VM, configure it to be able to join the domain specified in the Anisble inputs, install the Microsoft Office Online Server on it and write a script to it for configuring the Microsoft Office Online server after the domain join has been done.
    - Create an authenticating load balancer that handles all traffic to the Microsoft Office Online Server
    - Create a certificate for the load balancer
    - Deploy TcOOWeb microservice components
    - Configure network connectivity
    - Set up monitoring and logging

3. Post-Deployment Manual Steps:

    - Run CApS Ansible job to join a Windows instance to their domain

    - Once the domain join has completed login to the Windows MOOS EC2 instance as a domain user

    - Execute the C:\Temp\new-moos-config.ps1 script using the "Run with Administrator Privileges" option.

4. Verify Deployment:
    
    After deployment, perform initial verification:
    - Check TcOOWeb microservice alive link
      Go to \<Active workspace Gateway URL\>/tc/micro/tcooweb/v1/wopi/alive
      ![Image](./images/wopi_check.png)

    - Test Microsoft Office Online Server connectivity
      Go to https://\<tenantID\>-moos.testplmcloudsolutions.com/hosting/discovery 
      ![Image](./images/discovery_url.png)

    - Verify Teamcenter Preference MsOosNeedAuthOnALB is set
      Login to \<Active workspace Gateway URL\> as a user with Active Admin role
      ![Image](./images/aw_active_admin.png)

    - Click on the Preferences tile after choosing the Active Admin role
      ![Image](./images/preferences_tile.png)

    - Filter for MsOosNeedAuthOnALB
      ![Image](./images/preference_filtered.png)

    - Verify the Preference has a Value of 1
      ![Image](./images/preference_value.png)

    - If the preference is missing, click the elipses and select New --> New Preference
      ![Image](./images/add_pref.png)

    - Fill in the following information and Save
      Name: MsOosNeedAuthOnALB
      Product Area: Active Workspace
      Description: a meaning description
      Protection Scope: Site
      Type: String
      Values: 1

5. Document Configuration:
    
    Create deployment documentation:
    - Record all Ansible inputs
    - Update runbook with environment-specific details


Important Security Notes:

⚠️ **Client Secret Handling:**
- Never log or expose client secrets in plain text
- Rotate secrets according to security policies
- Use secure channels for receiving secrets from customers

⚠️ **Access Control:**
- Limit access to deployment pipelines to authorized CApS personnel
- Use least-privilege principle for service accounts
- Audit all configuration changes
- Maintain separation of duties


Next Steps:

After successful deployment by CApS team:
1. CApS team performs validation steps
2. Customer team performs validation steps
3. Monitoring and alerting
4. Schedule regular maintenance windows
