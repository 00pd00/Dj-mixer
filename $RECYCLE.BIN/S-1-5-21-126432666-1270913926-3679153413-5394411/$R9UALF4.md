# Apply Security Updates to the Microsoft Office Online Server

**Responsibility - The Siemens CApS team should check for new security updates to the Microsoft Office Online server**


Overview:

As needed, Microsoft will release a security update to the Microsoft Office Online server. These are normally released on the second Tuesday of the month. 


Steps to check for a new security update:

1. Go to [Microsoft Update Catalog](https://www.catalog.update.microsoft.com/Search.aspx?q=Office+Online+Server) and look for recent items with a Classification of "Security Updates" for Products "Office Online Server" or "SharePoint Server 2019/Office Online Server"


2. Download the most recent security update


3. Install the update following the instructions at [Apply software updates to Office Online Server](https://learn.microsoft.com/en-us/officeonlineserver/apply-software-updates-to-office-online-server). 


Important Note:

⚠️ **Follow Microsoft's Documentation for patching:**
- Never run the executable to install the update without following the steps given at [Apply software updates to Office Online Server](https://learn.microsoft.com/en-us/officeonlineserver/apply-software-updates-to-office-online-server). 

Next Steps:

After applying a security update:
Perform validation testing

** Note: ** If the KB information is updated in the tcx-pipeline-tenant code and the new KB executable added to the S3 Kits bucket, then running the pipeline again will install the new security update.