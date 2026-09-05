# Rotation of Static Access Keys for Digital Reality Viewer Application


**For SAM 2.0:**

[LCS-1321907 - PLACEHOLDER - Rotation of Static Access Keys for Digital Reality Viewer Application with SAM 2.0](https://mypolarion.industrysoftware.automation.siemens.com/polarion/#/project/Teamcenter/workitem?id=LCS-1321907)

**For SAM 1.0:**

SAM 1.0 will invalidate the static access keys after x years, hence the Caps user should rotate the Static Access Keys before it expires.

- Generate new Static Access Keys for the same account. Ensure the required policies was included, refer to [Generate the dedicated Service User and Static Access Keys for Digital Reality Viewer Application](../010_Pre-Deployment/000_Pre-Deployment.md#generate-the-dedicated-service-user-and-static-access-keys-for-digital-reality-viewer-application)
- Update Vault to adopt this new Static Access Keys, by re-run the tcx pipeline with the new Static Access Keys as input, refer to [Required Values for Tenant Stack Deployment](../010_Pre-Deployment/000_Pre-Deployment.md#required-values-for-tenant-stack-deployment)







