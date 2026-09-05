## Configure SolidWorks or SolidWorks Enterprise Integration on the Client

### Onboard Target Users to SolidWorks via Admin Console

1. ECA for a given tenant must contain entitlements for TC7005 (Essentials) and TC7008 (SolidWorks)
2. When adding users to Essentials via Admin Console, the SolidWorks add-on must be selected:

   ![Image](./image_424.png)


### Install SolidWorks or SolidWorks Enterprise Integration

Prerequisite: One of the following SolidWorks installations must be installed on the client machine.  Assuming SolidWorks Integration version 2412:
​​
![Image](./image_425.png)


1. After the user has been entitled to SW, login to Siemens Software Center.
2. Download/Install the SolidWorks Client Integration.

### Install Corresponding JT Translator for SolidWorks

![Image](./image_426.png)


Navigate to https://support.sw.siemens.com/en-US/product/296685992/downloads and install the JT Translator version that matches the SW version installed on the client machine.

The translator must be installed on the client machine in the following location:
C:\Program Files\Siemens\JTTranslators\SolidworksJT

Kits can be found under JT Translator for SolidWorks sub-section in Major Releases Tab:

![Image](./image_427.png)


​​
