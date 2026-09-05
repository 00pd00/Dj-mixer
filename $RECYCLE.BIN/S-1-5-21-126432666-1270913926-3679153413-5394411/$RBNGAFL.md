## Deployment steps


SMW supports a silent installation mode. Refer to the SMW installation guide for the procedure. The following describes installation through the SMW installer.

Start the provided SMW installer. The first page provides a link to the EULA. The user must review it then click on 'I agree' to proceed to the next page.

![Image](./image_2.png)



The second page asks for the location of the license server.
This is required whichever mode you're intending to use for SMW, and whatever the license you're using.

This page also offers options to create a desktop shortcut (only for Windows 10 or below) or create a start menu shortcut.

![Image](./image_3.png)



Desktop Shortcuts no longer exist in Windows 11.
They have been replaced by 'pinned applications', which are not supported by the SMW installer technology.
However, users can easily add SMW to the Windows 11 'pinned applications' by doing a right-click on the file [installation_folder]\capella\SMW.exe and selecting 'Pin to start menu'.

The third page prompts for the version of Teamcenter that SMW will be integrated with.
The user must select either 'standalone', 'Teamcenter n-1' or 'Teamcenter n' depending on which version will be accessed. The screenshot below displays an example for SMW 2412.

A client SMW installation can only be compatible with one Teamcenter version at a time.
![Image](./image_4.png)



Finally, the installation directory for SMW must be selected.
Please note that the installation directory must be empty. Never install SMW on a pre-existing SMW installation as it may have unforeseen side-effects.

The user must have write access to the installation directory.
![Image](./image_5.png)



Once the installation completes, SMW will be installed in the selected location.
