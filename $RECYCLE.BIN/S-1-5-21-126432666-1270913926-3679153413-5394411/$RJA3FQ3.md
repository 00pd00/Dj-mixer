### Dependency on Geolus

Teamcenter Shape Search has a dependency on Geolus properly being installed and running for the search to work. Without Geolus, Shape Search will not work. The proper install process for Shape Search requires setting values in the TcX deploy, then installing Geolus, then configuring Active Workspace preferences.

To reiterate the order of operations for install are:

**1. Install Teamcenter with Shape Search Application Selected**

**2. [TCX Configuration for GTS](https://geolusxdocs.code.siemens.io/geolusxdocumentation/docs/Documentation/Tenant%20Onboarding/Pre-Requisties/TCX%20Configuration%20for%20GTS/Azure/TCX%20Configuration%20for%20GTS/)**

**3. [ Install Geolus](https://geolusxdocs.code.siemens.io/geolusxdocumentation/docs/Introduction%20and%20Scope)**  

**4. Configure Active Workspace preferences GeolusServer and geolusClientId**  

The last step(4) will assume you already know the following from the Geolus install:

- **Geolus Public Endpoint**  
- **Geolus Application Id**  

