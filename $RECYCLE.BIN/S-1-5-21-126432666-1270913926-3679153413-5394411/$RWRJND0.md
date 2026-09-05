### Checking for Success

#### Checking for Success 
Once you have created the environments and have connected them together for multi-site usage,
 you will need to check that you can, in fact, send objects from one site to the other. 
 To do this you will need a user. Please read the rest of the cookbook for information regarding 
 the addition of users. You can use the instructions in our User On-Boarding section or the Comprehensive Onboarding Script: TCX User Creation, SAM, and LDAP Integration of the documentation. However, using any existing 
 LDAP and/or SAM users is preferable.  

You will need to execute the following: 

#### Command-line Share and Publish 
First you will need to log into AW. Use the URL you created in pipeline automation details.
Once you log in select the Explorer
Select Add New and search for item, select item and then follow the wizard to create an item

  ![Image](./ItemCreation2.png)

  For this next step, you will use the same command executable as in the Proxy User Configuration section of this document. You will also need to do this in your EC2 environment (unless you are using Azure and in this case you will need to use its command line application).

** Example: **
In EC2 – Command prompt from tc-adminutil  use the three dots and select exec shell

sudo su - tcx_user
. tcc set_context cutcx001 prd

tcc exec ‘data_share -u=infodba -pf=/apps/tc/security/default_infodba.pwf -g=dba -f=send  -site=site2 
-item_id=MyItem01 -f=send -item_id=MyItem -site=site2

Validate that you get a successful send and then repeat for your site2, sending an item to site1.

#### Active Workspace share and publish 

For this, you will again need to use the same user as above and log into the AW using the URL you created in the pipeline. 
Log into AW, following the instructions above and create an item. Once your item is created, select it, select where used in the right hand panel and then select the item (not the item revision). Once selected use the three dots and select share then share with sites.

![Image](./ShareWithSites.png)

 Fill in the wizard with your destination site name and your option set. Hit share. 
 ![Image](./SharePanel.png)

On site 2, log in and search for your item to be sure it made it to the other site. 

![Image](./Search.png)

For Publish, you will do the same steps as above but instead of Share with Sites you will select Publish. 

![Image](./Publish.png)

On site 2 you will then do an Advanced Search and choose Remote Search. Once you find your item you will recieve from site. Validate that these steps occur with out error. 

![Image](./RemoteSearchRecieve.png)