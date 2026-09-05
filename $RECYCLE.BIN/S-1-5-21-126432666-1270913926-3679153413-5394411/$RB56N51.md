## Validations for Teamcenter X Essentials

For Essentials, some features are enabled through the Simcenter X Advanced (SCXADV) entitlement with the injected SKU TC7009. 
In the Standard (TC7100) and Advanced (TC7101) tiers, some features are directly embedded within the product configurations. 
The following steps describe the process for confirming the correct operational status of Teamcenter Simulation for Simcenter X Advanced users within the Essentials tier.

To validate the installation of Simulation features in Teamcenter X Essentials:
1.	Download and install the Teamcenter Simulation desktop application via the Siemens Software Center.

    ![Desktop App Config](./SSC.png)

2.	Configure the Teamcenter Simulation application to point to the corresponding Teamcenter X Essentials environment

    ![Desktop App Config](./App_Config.png)

3.	Start the application and go to the “Transfer” tab.
4.	Drag and drop a file (a txt file will be fine)

    ![Desktop App Transfer Tab](./App_transfer.png)

5.	Create a new target object; any type will be fine.

    ![Create object dialog](./Create_obj.png)

6.	Verify that the object is created without any errors.
7.	Follow the link from the Teamcenter Simulation application to be directed to the Teamcenter X web interface.

    ![Upload Success](./Upload_success.png)

8.	In the Teamcenter X environment, check that the object is properly visualized and accessible.
9.	This confirms the successful installation of the Teamcenter X Essentials with Simulation.
