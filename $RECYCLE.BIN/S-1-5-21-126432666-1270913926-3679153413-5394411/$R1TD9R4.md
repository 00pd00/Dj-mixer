## Post Deploy Configuration Instructions

The Rhapsody Connector plugin contains the `Rhapsodyintegration.properties` file located at `\plugins\RhapsodyTCIntPlugin\conf` folder. The user needs to provide values for the mandatory variables as stated below.

```
TC_SERVER_URL= https://tcxmbse9.testplmcloudsolutions.com/tc
AWC_WEBLOGIC_HOST_URL=https://tcxmbse9.testplmcloudsolutions.com/awc?ah=true
TC_SSO_APP_ID=tcxaw
TC_SSO_SESSION_FLAG=true
TC_SSO_LOGIN_URL=https://tcxmbse9.testplmcloudsolutions.com/awc/loginservice/sa
TRANSPORT=tccs
IS_TCCS=true
```

> **Note:** Values mentioned are for example purposes, and actual values are to be substituted as per the environment blueprint.

![Image](./image_3.png)

![Image](./image_4.png)

User has to provide `%FMS_HOME%\lib` for `Libpath` variable in `rhapsody.ini` file as shown below in order to pop up TcX login window.

![Image](./image_5.png)