# Configure Additional Imports

The Configure Additional Imports feature allows you to add supplementary parameters to your environment configuration beyond standard settings. To access this feature, navigate to the Request Environment page and click "Show Advanced Configuration" to expand the advanced section. Scroll down to the "Additional Import Parameters" section and click the "Configure Additional Imports" button. A modal dialog will appear with a pre-filled YAML template showing all available parameter types including additional software packages, TXP ACCP endpoints, TXP XCS endpoints, and host configurations.

You can fill in only the sections you need for your specific requirements, such as custom software installations with version and kit file locations for both Linux (lnx64) and Windows (wntx64) platforms. The template also supports service endpoint configurations for adhoc, dim, xrs, notification, scs, and dss services, along with custom host settings for DSSHost, SamHost, and SamAuthHost. Additionally, you can specify Teamcenter package IDs to add more products to your environment.

Once you've configured your parameters, click the "Add to Configuration" button to apply the changes. The imported parameters are merged with your existing advanced configuration, meaning your current settings are preserved while new values are added. Products specified in the import are added to your existing product selection rather than replacing them, and your main form settings remain unchanged. The Advanced Configuration section expands automatically if not already open, allowing you to review all the merged parameters before submitting your environment request.

**Note:** The Advanced Configuration option provides the ability to customize your TCX environment using custom pipeline inputs. This functionality should be utilized with caution and is intended for users who are familiar with the implications of such configurations.

---

**Document Version**: 1.0.0  
**Last Updated**: November 20, 2025  
**Maintained By**: TCX Onboarding Portal Development Team
