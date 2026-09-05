# Shutdown & Restart Workload Automation - Implementation Complete

## Overview
Successfully implemented a complete shutdown & restart workload automation service that integrates with Ansible Tower workflow templates. The system allows admins to trigger shutdown/restart workflows for TcX containerized workloads with proper approval workflows.

## Files Created/Modified

### Backend Files

#### Created:
1. **`backend/utils/ansibleShutdownRestartTrigger.js`** (NEW)
   - `buildShutdownRestartSurvey()` - Constructs survey parameters from environment data
   - `buildShutdownRestartExtraVars()` - Builds extra_vars with pipeline versions
   - `getWorkloadTypes()` - Returns 10 available workload types

#### Modified:
2. **`backend/modules/environment.module.js`**
   - Added `shutdownRestartJobId` (String)
   - Added `oldShutdownRestartJobId` (Array of Strings)
   - Added `workloadStatus` (Enum: Running/Stopped/Pending/Unknown)
   - Added `lastWorkloadAction` (Enum: Shutdown/Restart/null)
   - Added `lastWorkloadType` (String)
   - Added `lastWorkloadTimestamp` (Date)

3. **`backend/controller/ansibleTowerJob.controllers.js`**
   - Imported shutdown/restart utility functions
   - Added `triggerShutdownRestartWorkflow()` controller
   - Added `getAvailableWorkloadTypes()` controller

4. **`backend/routes/ansibleTower.routes.js`**
   - Added `POST /ansible/shutdown-restart/:envId` (Admin only)
   - Added `GET /ansible/workload-types` (Authenticated users)

5. **`backend/.env`**
   - Added `SHUTDOWN_RESTART_TEMPLATE` configuration
   - Added `TENANT_NAMESPACE=tcx-deploy`
   - Added `STREAM_ID=dev`
   - Added `DEFAULT_PIPELINE_VERSION=main`
   - Added `DEFAULT_TCXCLI_VERSION=latest`
   - Added `VAULT_TOKEN` configuration

### Frontend Files

#### Created:
6. **`frontend/src/components/ShutdownRestartModal/ShutdownRestartModal.jsx`** (NEW)
   - Modal component with workload type dropdown (10 options)
   - Action radio buttons (Shutdown/Restart)
   - Optional Pipeline Version and TcxCli Version inputs
   - Form validation and error handling
   - Integration with backend API

7. **`frontend/src/components/ShutdownRestartModal/ShutdownRestartModal.css`** (NEW)
   - Professional modal styling with animations
   - Responsive design
   - Gradient header and button styles
   - Form controls styling

#### Modified:
8. **`frontend/src/api/ansibleTowerJob.js`**
   - Added `triggerShutdownRestartWorkflow(envId, workflowParams)`
   - Added `getWorkloadTypes()`

9. **`frontend/src/components/EnvDialogBox/EnvDialogBox.jsx`**
   - Imported `ShutdownRestartModal` component
   - Added state management for modal and workflow messages
   - Added `handleWorkflowSuccess()` callback
   - Added `getWorkloadStatusBadge()` helper function
   - Display shutdown/restart job ID with Ansible Tower link
   - Display workload status badge
   - Display last workload action with timestamp
   - Added "Manage Workloads" button in modal footer
   - Integrated modal with open/close handlers

10. **`frontend/src/components/EnvDialogBox/EnvDialogBox.css`**
    - Added `.manage-workloads-btn` styling
    - Orange gradient background (#f59e0b to #d97706)
    - Hover effects and transitions

## Features Implemented

### 1. Workload Types (10 Options)
- Complete Teamcenter deployment
- Teamcenter deployment for applying updates
- Teamcenter deployment for maintenance
- Teamcenter servers and pool manager
- Teamcenter FSC
- All Teamcenter daemons
- Teamcenter FTS indexer
- Initial startup of Indexer, Visualization and daemons
- Teamcenter deployment for password change
- Teamcenter Visualization

### 2. Actions
- **Shutdown**: Stop selected workload
- **Restart**: Restart selected workload

### 3. Version Configuration
- Pipeline Version (optional, defaults to "main")
- TcX CLI Version (optional, defaults to "latest")

### 4. Survey Parameters (Auto-populated)
- `TENANT_ID` - From environment.tenantId
- `ENVIRONMENT_TYPE` - From environment.environmentType
- `WORKLOAD` - User selected from dropdown
- `ACTION` - User selected (Shutdown/Restart)
- `GITLAB_TOKEN` - From environment variable
- `TENANT_NAMESPACE` - From environment variable (default: "tcx-deploy")
- `STREAM_ID` - From environment variable (default: "dev")
- `VAULT_TOKEN` - From environment variable

### 5. Security & Authorization
- Admin-only access via middleware
- Environment status validation (Ready/Failed only)
- Token-based authentication
- User permission checks

### 6. Workflow Tracking
- Job ID stored in environment document
- Historical job IDs tracked in array
- Workload status badge (Running/Stopped/Pending/Unknown)
- Last action and timestamp tracking
- Direct links to Ansible Tower workflow jobs

### 7. UI/UX Features
- Professional modal with gradient design
- Loading states and error handling
- Success/error message display
- Auto-clear messages after 5 seconds
- Opens Ansible Tower job in new tab
- Info message about approval requirement
- Responsive design

## API Endpoints

### POST /api/ansible/shutdown-restart/:envId
**Description**: Trigger shutdown/restart workflow for environment
**Authentication**: Required (Admin only)
**Request Body**:
```json
{
  "workload": "Complete Teamcenter deployment",
  "action": "Shutdown",
  "pipelineVersion": "main",
  "pipelineCliVersion": "latest"
}
```
**Response**:
```json
{
  "success": true,
  "message": "Shutdown workflow triggered successfully. Awaiting admin approval in Ansible Tower.",
  "workflowJobId": "12345",
  "jobUrl": "https://ansible-dev.cloud.teamcenter.com/#/jobs/workflow/12345/output",
  "status": "Pending Approval"
}
```

### GET /api/ansible/workload-types
**Description**: Get available workload types
**Authentication**: Required
**Response**:
```json
{
  "success": true,
  "workloadTypes": [
    "Complete Teamcenter deployment",
    "Teamcenter deployment for applying updates",
    ...
  ]
}
```

## Environment Variables Required

Add these to `backend/.env`:

```env
# Shutdown/Restart Workflow Configuration
SHUTDOWN_RESTART_TEMPLATE=your_shutdown_restart_template_id_here
TENANT_NAMESPACE=tcx-deploy
STREAM_ID=dev
DEFAULT_PIPELINE_VERSION=main
DEFAULT_TCXCLI_VERSION=latest

# Existing required variables (ensure these are set)
GITLAB_TOKEN=your_gitlab_token_here
VAULT_TOKEN=your_vault_token_here
ANSIBLE_TOWER_TOKEN=your_ansible_tower_token_here
```

## How to Use

1. **Admin User**: Navigate to Environment Details modal
2. Click on **"Manage Workloads"** button (orange button next to Start/Stop)
3. Select **Workload Type** from dropdown
4. Choose **Action** (Shutdown or Restart)
5. Optionally override **Pipeline Version** or **TcX CLI Version**
6. Click **"Submit Shutdown Request"** or **"Submit Restart Request"**
7. Workflow is triggered and awaits approval in Ansible Tower
8. Ansible Tower URL opens in new tab
9. Admin approves/rejects in Ansible Tower
10. Upon approval, workflow executes
11. Workflow job ID displayed in Environment Details

## Workflow Approval Process

1. Workflow job created with status "Pending Approval"
2. Workflow approver logs into Ansible Tower
3. Views notification with survey parameters
4. Approves or rejects the workflow
5. If approved: Workflow executes shutdown/restart
6. If rejected: Workflow exits without changes

## Testing Checklist

- [ ] Verify `SHUTDOWN_RESTART_TEMPLATE` ID is set correctly
- [ ] Verify `GITLAB_TOKEN` and `VAULT_TOKEN` are configured
- [ ] Test with Ready environment
- [ ] Test with Failed environment
- [ ] Verify workload types load correctly
- [ ] Test Shutdown action
- [ ] Test Restart action
- [ ] Verify workflow job ID is stored
- [ ] Verify workload status badge displays
- [ ] Verify Ansible Tower link works
- [ ] Test error handling (invalid environment, network errors)
- [ ] Verify admin-only access
- [ ] Test modal close/cancel functionality

## Next Steps (Optional Enhancements)

1. **Polling Integration**: Add workflow job status polling to track approval/completion
2. **Webhook Integration**: Receive Ansible Tower webhooks for auto-status updates
3. **Notification System**: Send email/Slack notifications on workflow approval/completion
4. **Batch Operations**: Allow shutdown/restart of multiple environments simultaneously
5. **Workload Presets**: Add quick-action buttons for common scenarios
6. **Status Verification**: Integrate with Kubernetes/Datadog API to verify actual workload status
7. **Scheduling**: Allow scheduled shutdown/restart (e.g., maintenance windows)
8. **Audit Logging**: Track all workflow trigger events with user details

## Technical Notes

- Uses `slice_workflow_jobs` endpoint (not standard `launch` endpoint)
- `allow_simultaneous: false` prevents concurrent workflows
- `is_sliced_job: true` enables job slicing
- Survey parameters merged into `extra_vars`
- Workload status defaults to "Pending" after trigger
- Old job IDs preserved in history array
- Compatible with existing Ansible Tower infrastructure

## Support

For issues or questions:
1. Check Ansible Tower logs for workflow execution details
2. Verify environment variables are configured correctly
3. Check browser console for frontend errors
4. Check backend logs for API errors
5. Verify Ansible Tower template ID is correct
6. Ensure user has admin permissions

---

**Implementation Date**: November 19, 2025
**Status**: ✅ Complete and Ready for Testing
