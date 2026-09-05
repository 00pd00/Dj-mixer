# Validate Sustainability Feature

‘Calculate Impacts’ command in Teamcenter is dependent on multiple services, make sure below listed services are up and running before using sustainability feature.  
- AIG services 
- Dispatcher is configured with Async service.
- LCA provider service
- Teamcenter Subscription manager service
- User is logged in into Teamcenter with Sustainability specific Role

Test connection between LCA provider and AIG
 - Log into Admin UI GS
 - Select "Manage OAuth2 outbound connections for EA systems" script
 - From Action to Excute drop down select "Get Access Token" and Select Identity Provider to Use "t4sustIP" then Run script
 - The output should return token as follows
 ![Image](./AccessToken.png)

AIG Installation test
 - Run "Installation Verification Test-Set" script
 - Should Pass all test