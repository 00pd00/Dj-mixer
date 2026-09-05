### Set Values during install

During the deployment of Teamcenter the Shape Search application must be selected.

During the configuration step the value for isGeolusService is to: **true**  

In TcX environments the value for isGeolusService is always set to true. This can be checked later to confrim proper install.


### **The following are only set if Geolus was installed before Teamcenter was installed. However in fresh install environments these values will be left blank and filled out later during the Post Geolus Install Preference Setting Step.**

If Geolus was previously installed the value for geolusClientId is set to the Geolus application ID.

If Geolus was previously installed the value for GeolusServer is set to the Geolus public endpoint.