## MS Office Integration preference setup for TCx

**Applicable Product IDs**: TC7003-XT, TC7100, TC7101 
 
1. Login to the TcX environment through AW as a dba priviledged user.
2. Create ActiveWorkspaceHosting.Office.URL preference.
3. Steps for creating preference as below: 

    Name ->ActiveWorkspaceHosting.Office.URL 

    Product Area ->General 

    Description -> Enables Active Workspace in Hosted mode on Office Client 

    Protection Scope ->Site 

    Environment ->Not Selected 

    Type ->String 

    Multiple Values ->No 

    Value -> `<Environment AWC URL>` 

    e.g. https://titans28.testplmcloudsolutions.com/awc   

4. Save preference.
