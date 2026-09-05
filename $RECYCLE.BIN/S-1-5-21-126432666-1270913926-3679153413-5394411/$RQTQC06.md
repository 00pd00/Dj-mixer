# Validation of Successful Deployment

**Responsibility: Customer team with support from Siemens CApS team.**

After completing the deployment, perform the following validation steps to ensure the TcOOWeb integration is functioning correctly.


Validation Checklist:

## 1. Document Adding Validation

Test adding a document capabilities:

**Test Steps:**
1. Navigate to a folder    
   ![Image](./images/newstuff.png)

2. Click the Add button
   ![Image](./images/add_button.png)

3. In the Add file panel filter for "MS WordX"

4. Click the Select File button
   ![Image](./images/add_file.png)

5. Select a DocX file from a source
   ![Image](./images/add_file_selected.png)

6. Click Ok

7. The document will start to open in the Active Workspace embedded viewer

8. As it is opening a pop-up will appear briefly that says "Loading document via Office Online"
   (** Note: ** this pop-up will only happen once per session)
   ![Image](./images/opening_via_officeonline.png)

9. The pop-up will close shortly on its own

10. The document is visible in the embedded viewer
   ![Image](./images/file_opened_in_viewer.png)

✓ **Expected Results:**
- [ ] A new .docx file is added to Teamcenter
- [ ] As the document is being loaded in the embedded viewer a pop-up briefly appears
- [ ] The pop-up briefly shows that the user is being authenticated and then displays "Loading document via Office Online"
- [ ] The pop-up closes on its own
- [ ] Document opens in Active Workspace embedded viewer
- [ ] Document content is visible and formatted correctly
- [ ] Navigation controls are functional
- [ ] Document loads within 10 seconds


## 3. Document Editing Validation

Test document editing capabilities:

**Test Steps:**
1. Select a Word document in TcX
2. Click "Checkout" to enable editing
   ![Image](./images/opening_via_officeonline.png)

4. Make a simple text change
   ![Image](./images/file_checked_out.png)

5. Wait for Saved to appear at the top of the viewer pane
   ![Image](./images/file_saved_with_changes.png)

6. Click "Checkin" to check in the document

7. The updated file will be loaded into the viewer
   ![Image](./images/updated_file_back_in_checkout_state.png)


✓ **Expected Results:**
- [ ] Document opens in edit mode
- [ ] Office ribbon and editing tools are available
- [ ] Changes can be made to the document
- [ ] Checkin operation completes successfully
- [ ] Edits are visible in the document after Checkin completes.



## 4. File Type Support Validation

Test all configured file types:

| File Type | Extension | View Test | Edit Test | Status |
| :-------- | :-------- | :-------- | :-------- | :----- |
| Word | .docx | ☐ | ☐ | |
| Excel | .xlsx | ☐ | ☐ | |
| PowerPoint | .pptx | ☐ | ☐ | |


## 5. Error Handling Validation

Test error scenarios and recovery:

✓ **Test Scenarios:**
- [ ] Open document with insufficient permissions → Proper error message displayed
- [ ] Document checked out by another user → Checked out notification displayed

## 6. Security Validation

Verify security controls are working:

✓ **Access Control:**
- [ ] Users without TcX permissions cannot access documents
- [ ] Document access respects TcX ACLs (Access Control Lists)

✓ **Data Security:**
- [ ] Documents are stored encoded in File Repository Storage location
- [ ] Authentication uses secure OAuth2 flow
- [ ] HTTPS is enforced for all connections


## 7. Logging and Monitoring Validation

Verify logging and monitoring are operational:

✓ **Logging:**
- [ ] TcX server logs capture TcOOWeb events
- [ ] Error logs are created for failures
- [ ] Audit logs track document access

✓ **Monitoring:**
- [ ] Health check endpoints respond correctly
- [ ] Monitoring dashboards show TcOOWeb metrics
- [ ] Alerts are configured for failures


## Validation Sign-off

| Role | Name | Signature | Date |
| :--- | :--- | :-------- | :--- |
| Customer Admin | | | |
| CApS Engineer | | | |
| Security Officer | | | |


## Common Issues and Resolutions

**Issue:** Document fails to open with "Access Denied"
**Resolution:** Check TcX ACLs


## Next Steps

After successful validation:
1. Document validation results
2. Enable monitoring and alerting
3. Schedule regular maintenance (see Maintenance section)