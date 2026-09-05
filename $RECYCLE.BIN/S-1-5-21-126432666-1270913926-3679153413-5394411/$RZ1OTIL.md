# Validation of Successful Deployment

**Responsibility: Customer team with support from Siemens CApS team.**

After completing the deployment and post-deployment configurations, perform the following validation steps to ensure the TcOOSPE integration is functioning correctly.


Validation Checklist:

## 1. Azure Application Validation

Verify Azure application is properly configured:

✓ **App Registration:**
- [ ] Application is registered in Azure AD
- [ ] Client ID and Tenant ID are documented
- [ ] Client Secret is valid and stored securely
- [ ] All redirect URIs are configured correctly

✓ **API Permissions:**
- [ ] Microsoft Graph permissions are granted
- [ ] SharePoint permissions are granted
- [ ] Admin consent is provided for all permissions
- [ ] Permission status shows green checkmarks


## 2. SharePoint Embedded Validation

Verify SharePoint Embedded container is accessible:

✓ **Container Configuration:**
- [ ] Container is created and accessible
- [ ] Container Type is registered
- [ ] Application has owner permissions on container
- [ ] Storage quota is configured appropriately

✓ **Container Connectivity Test:**
```bash
# Use Microsoft Graph Explorer or PowerShell to verify container access
GET https://graph.microsoft.com/v1.0/storage/fileStorage/containers/{container-id}
```
Expected: HTTP 200 response with container details


## 3. Authentication Flow Validation

Test the complete authentication workflow:

**Test Steps:**
1. Log out of Teamcenter Active Workspace
2. Log back in with a test user account
3. Navigate to a Word/Excel/PowerPoint document
4. Click to open the document
5. Observe authentication flow

✓ **Expected Results:**
- [ ] User is redirected to Microsoft login (if not already authenticated)
- [ ] Microsoft consent screen appears (first time only)
- [ ] User is redirected back to TcX
- [ ] Document opens in Office Online viewer


## 5. Document Viewing Validation

Test document viewing capabilities:

**Test Steps:**
1. Select a Word document (.docx) in TcX
2. Click "View" or "Open"
3. Document should open in Office Online viewer

✓ **Expected Results:**
- [ ] Document opens in embedded Office Online viewer
- [ ] Document content is visible and formatted correctly
- [ ] Navigation controls are functional
- [ ] Document loads within 10 seconds


## 6. Document Editing Validation

Test document editing capabilities:

**Test Steps:**
1. Select a Word document in TcX
2. Check out the document (if required)
3. Click "Edit" to open in Office Online
4. Make a simple text change
5. Save the document
6. Check in the document (if required)

✓ **Expected Results:**
- [ ] Document opens in edit mode
- [ ] Office ribbon and editing tools are available
- [ ] Changes can be made to the document
- [ ] Save operation completes successfully
- [ ] New version is created in Teamcenter (if configured)



## 7. File Type Support Validation

Test all configured file types:

| File Type | Extension | View Test | Edit Test | Status |
| :-------- | :-------- | :-------- | :-------- | :----- |
| Word | .docx | ☐ | ☐ | |
| Word Legacy | .doc | ☐ | ☐ | |
| Excel | .xlsx | ☐ | ☐ | |
| Excel Legacy | .xls | ☐ | ☐ | |
| PowerPoint | .pptx | ☐ | ☐ | |
| PowerPoint Legacy | .ppt | ☐ | ☐ | |


## 9. Error Handling Validation

Test error scenarios and recovery:

✓ **Test Scenarios:**
- [ ] Open document with insufficient permissions → Proper error message displayed
- [ ] Open document while offline → Appropriate offline message shown
- [ ] Authentication token expiration → Auto-refresh or login prompt
- [ ] Document locked by another user → Lock notification displayed


## 10. Performance Validation

Measure integration performance:

| Metric | Target | Actual | Status |
| :----- | :----- | :----- | :----- |
| Document open time (< 1 MB) | < 5 seconds | | ☐ |
| Document open time (1-10 MB) | < 10 seconds | | ☐ |
| Authentication time | < 3 seconds | | ☐ |
| Save operation time | < 5 seconds | | ☐ |
| Co-authoring sync latency | < 2 seconds | | ☐ |


## 11. Security Validation

Verify security controls are working:

✓ **Access Control:**
- [ ] Users without TcX permissions cannot access documents
- [ ] Users without Azure app assignment cannot authenticate
- [ ] Users without M365 license see appropriate message
- [ ] Document access respects TcX ACLs (Access Control Lists)

✓ **Data Security:**
- [ ] Documents are stored encrypted in SharePoint Embedded
- [ ] Authentication uses secure OAuth2 flow
- [ ] Client secrets are not exposed in browser
- [ ] HTTPS is enforced for all connections


## 12. Logging and Monitoring Validation

Verify logging and monitoring are operational:

✓ **Logging:**
- [ ] TcX server logs capture TcOOSPE events
- [ ] Azure AD sign-in logs show authentication events
- [ ] Error logs are created for failures
- [ ] Audit logs track document access

✓ **Monitoring:**
- [ ] Health check endpoints respond correctly
- [ ] Monitoring dashboards show TcOOSPE metrics
- [ ] Alerts are configured for failures


## Validation Sign-off

| Role | Name | Signature | Date |
| :--- | :--- | :-------- | :--- |
| Customer Admin | | | |
| CApS Engineer | | | |
| Security Officer | | | |


## Common Issues and Resolutions

**Issue:** "AADSTS50011: The redirect URI does not match"
**Resolution:** Verify redirect URIs in Azure match exactly with TcX configuration

**Issue:** Document fails to open with "Access Denied"
**Resolution:** Check SharePoint Embedded container permissions and TcX ACLs

**Issue:** Co-authoring not working
**Resolution:** Verify M365 licenses and TcOOSPE_Enable_CoAuthoring preference

**Issue:** Slow document loading
**Resolution:** Check network connectivity between TcX and SharePoint Embedded, verify container is in same region

**Issue:** Save fails with timeout
**Resolution:** Check SharePoint Embedded service status, verify network connectivity, check storage quota


## Next Steps

After successful validation:
1. Document validation results
2. Provide user training on Office Online features
3. Enable monitoring and alerting
4. Schedule regular maintenance (see Maintenance section)
5. Plan for client secret rotation
