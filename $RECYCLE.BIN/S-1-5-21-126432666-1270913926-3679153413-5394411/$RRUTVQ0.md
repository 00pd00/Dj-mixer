
Admin data includes stylesheets, workflow handlers, ACLs, values of OOTB preferences, localized values, and AW Client UI configuration. The admin data is usually packaged as a zip file with a sample folder structure shown below:

![Image](./image_336.png)

Admin data used to be deployed manually using a shell script that invokes one or more command-line utilities to add the admin data—mainly to avoid downtime for the deployment when these changes are applied through DC.  
As indicated earlier, the existing manual tasks associated with admin data must be brought into the scope of DC deployment. The following sub-sections provide details on how to get admin data changes into a DC package, which can then be applied through the deploy automation pipeline.

## Merging admin data to existing BMIDE project for datamodel changes

If a BMIDE project exists for data model and schema changes, it is expected that admin data changes are combined into this project, so both datamodel and admin data can be deployed with a single software package as per instructions given below:

### Prerequisites:
- TcX Personalization BMIDE project  
- TcX Personalization non-BMIDE/admin data changes in zip format (e.g. Non_Bmide_changes.7z)  

### Steps to merge admin data changes into BMIDE:
1. Import the TcX Personalization BMIDE project into BMIDE client.  
2. Follow the instructions in the TDOC to enable the admin data processing: [Enable admin data in an existing project](https://internal.docs.sw.siemens.com/en-US/doc/282219420/PL20240523460057788.plm00071/xid2307961).
3. Follow the instructions in the TDOC to merge your admin data: [Add admin data to project](https://internal.docs.sw.siemens.com/en-US/doc/282219420/PL20240523460057788.plm00071/xid2307960).  
4. Copy the commands specified in the existing script file (e.g., `import_non_bmide_changes.sh`) into `Project Files/admindata/install_<package-id>.default` of your BMIDE template project.  
5. Adjust the syntax of the commands in the above file so that they correctly point to the data files in `<package-id>/install/admindata`.  
    - Example: Replace all the occurrences of `${STAGE_DIR}` with `${TC_INSTALL_DIR}/<package-id>/admindata`.  
6. Generate the software package with a new version.  
7. To deploy the software package using DC, please follow the instructions specified in below sections:
    - Deploying personalization in existing environment (e.g., Dev) : [Applying personalization to an existing deployment](../Applying%20Personalization/Applying%20personalization%20to%20an%20existing%20deployment/AWS/Applying%20personalization%20to%20an%20existing%20deployment).
    - Fresh deployment with personalization (e.g., Pre-prod, Prod) : [Applying personalization to a new deployment](../Applying%20Personalization/Applying%20personalization%20to%20a%20new%20deployment/AWS/Applying%20personalization%20to%20a%20new%20deployment).

## Create a standalone software package for admin data

If the personalization includes only admin data, but not data model changes, then the admin data changes can be added into a separate software package with instructions given below.

### Steps to create a standalone software package:
1. Create an admin data project from BMIDE.  
2. Follow the instructions in the TDOC to merge your admin data: [Add admin data to project](https://internal.docs.sw.siemens.com/en-US/doc/282219420/PL20240523460057788.plm00071/xid2307960).  
3. Copy the commands specified in the existing script file (e.g., `import_non_bmide_changes.sh`) into `Project Files/admindata/install_<package-id>.default` of your BMIDE template project.  
4. Adjust the syntax of the commands in the above file so that they correctly point to the data files in `<package-id>/install/admindata`.  
    - Example: Replace all the occurrences of `${STAGE_DIR}` with `${TC_INSTALL_DIR}/<package-id>/admindata`.  
5. Generate the software package with a new version.  
6. To deploy the software package using DC, please follow the instructions specified in below sections:
    - Deploying personalization in existing environment (e.g., Dev) : [Applying personalization to an existing deployment](../Applying%20Personalization/Applying%20personalization%20to%20an%20existing%20deployment/AWS/Applying%20personalization%20to%20an%20existing%20deployment).
    - Fresh deployment with personalization (e.g., Pre-prod, Prod) : [Applying personalization to a new deployment](../Applying%20Personalization/Applying%20personalization%20to%20a%20new%20deployment/AWS/Applying%20personalization%20to%20a%20new%20deployment).
