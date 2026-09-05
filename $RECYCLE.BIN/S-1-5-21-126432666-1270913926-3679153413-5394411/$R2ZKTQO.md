# Below are the installation instructions to install “FMS_HOME” and “Teamcenter Security Agent”

"Teamcenter_Connection_Manager.exe"(For TC-X 2412 Container version) can be downloaded from Siemens Software Centre and installed OR URL as below

""(For TC-X 2412 Container version) can be downloaded from Siemens Software Centre and installed OR URL as below

Create a “tcx_config” folder and put “” file in this folder
In same folder hierarchy, place “Teamcenter_Connection_Manager.exe” installer as shown in image below
![Image](./image_2.png)


Run “Teamcenter_Connection_Manager.exe” to start installation. You can choose by default settings as shown in images below.
![Image](./image_3.png)


![Image](./image_4.png)


![Image](./image_5.png)


![Image](./image_6.png)


![Image](./image_7.png)


Once installation is completed, update “fcc.xml” under “tccs” folder and add following line. ” C:\temp” as mentioned below can be any folder location on Capital-X host for which User has the access
![Image](./image_8.png)


Add “FSC URL” in the “address” field in following line in fcc.xml file. This value will be provided by TC-X team.
![Image](./image_9.png)

    
![Image](./image_10.png)

    
