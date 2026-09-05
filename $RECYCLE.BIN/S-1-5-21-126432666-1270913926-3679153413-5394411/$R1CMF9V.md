## Patch and Validate Dispatcher Machine

After completing the upgrade and post-deploy steps, the Dispatcher Windows EC2 machine must be patched to ensure that Dispatchers can work correctly.

Prerequisite: Login to the Windows EC2 and ensure that NX is still installed on the machine. If the installation no longer exists, follow [NX Installation](../../010_Tenant%20Onboarding/040_Teamcenter%20Dispatcher%20and%20Translators/070_NX%20Installation.md) to re-install
### Edit NX Dispatcher Configuration Files

Execute the following steps to re-configure Teamcenter Dispatcher Integration with NX:

[Edit translator.xml](../../010_Tenant%20Onboarding/040_Teamcenter%20Dispatcher%20and%20Translators/080_Edit%20translator.xml.md#edit-translatorxml)

[Edit nxtransdirect.bat](../../010_Tenant%20Onboarding/040_Teamcenter%20Dispatcher%20and%20Translators/090_Edit%20nxtransdirect.bat.md#edit-nxtransdirectbat)

If the Dispatcher is not functioning after an update, check whether there are two Dispatcher services - one from the previous release and another from the current release. Set the previous release service startup type to Manual, then stop the service. Use only the current release Dispatcher service.