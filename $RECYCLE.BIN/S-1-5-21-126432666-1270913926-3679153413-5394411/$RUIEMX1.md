## Offline data share between On-prem and TcX

### TcX Deployment  
Deploy  “TC10408-XT” Multisite product ID to enable the AWC client commands. As part this Product Id, below features will get installed

        a.	multisite (Multisite Integration (1000544))
        b.	multisite_client  (Multisite Integration Client (1000907) )

### Site definition

Adding on-prem site definition in TcX, and vice versa.
Using tcc command to run site_util. 
To modify existing TcX site name: (default site name by pipeline is IMC---xxx which is not human readable.) 
The customer will need to provide you with information about there systems including site id's and site names. 
If a customer requires specific control access, that will need to be handled by CApS team and customer through AM Rules. 

site_util -f=modify -site_id=-1689205668 -site_name=TcXSite -ods=y -http=y -node_name=https://mulst620.testplmcloudsolutions.com/tc

To create the on-prem site definition on TcX

site_util -f=create -site_id=-1689205701 -site_name=OnPrem 

Then update the attribute of on-prem site definition.

site_util -f=modify -site_id=-1689205701 -ods=y -http=y -node_name=https://yourOnPremDomainName/tc

### Test Case 1: Export data from on-prem to TcX

Offline data share from On-prem to TcX

a.	Offline export the data from On-Prem to TcX

    1.  Offline export the data in On-prem site to TcX.
    2.  From on-prem perform tools -> Export Object using RAC.
    3.  From on-prem using command line, data_share utility. help will provide more details.
     Example:
     data_share -u=xxx -p=xxx -f=offline_export -site=TcX -item_id=item0001 -dir=outputFolder
     4. Zip the exported data as 7z file extension.

b.	Offline import the data into TcX

Login to TcX AWC client 

Select Home folder and select the Receive from file.

    ![Image](./RecieveFromSite.png)

    
Select the exported 7zip file from Receive from Site dialog and click on Receive. 

![Image](./RecChooseFile.png)

![Image](./RecieveMsg.png)

Imported object will be pasted under Selected folder

![Image](./ItemRecieved.png)

### Test Case 2: Export data from TcX to on-prem

Offline export from TcX to On-Prem
1. Offline export the data from TcX to On-prem
2. Offline export the data TcX to On-prem site Login to TcX AWC client
3. Select required object to be exported
4. Select Share with Sites command 
5. Select the Site
6. Select Exported file (Offline) option and provide the name of the file

![Image](./ShareMenu.png)

![Image](./OfflineExport.png)

Exported data will be downloaded as zip file to the local m/c

Offline import the data from into On-prem
        
        1. Unzip the TcX site offline exported data 
        
        2. Use the data_sahare offline import command to import the data
        
        3. Data_share -f=offline_import -dir=ImportFolder
        
        Or using RAC, tools ->import object

