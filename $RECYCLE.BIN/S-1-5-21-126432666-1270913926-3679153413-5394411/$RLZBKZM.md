### Cell Onboarding for UTS Integration

To enable metric monitoring, following variable has to be set during cell setup. Currently, it is only enabled for Azure Deployment.

Variable Name | Value | Description|
--------------|-------------|---------|
GLBL_DSS_BASE_URL | dss.us-east-1.sws.siemens.com | DSS URL
GLBL_UTS_BASE_URL | uas.us-east-1.sws.siemens.com | UTS URL
GLBL_UTS_REGION | "us-east-1" | UTS Region


Both DSS and UTS URL has format as follows, `uas.{region}.{env}.com`. Based on this format, you can construct the URL. You can refer to table below for UTS.

Region | Enviroment | Url |
-------|------------|-----|
us-east-1 | preprod | uas.us-east-1.preprod.teamcenterwebservices.com
us-east-1 | prod | uas.us-east-1.sws.siemens.com
germany-west-1 | preprod | uas.germany-west-1.preprod.teamcenterwebservices.com
germany-west-2 | prod | uas.germany-west-1.sws.siemens.com