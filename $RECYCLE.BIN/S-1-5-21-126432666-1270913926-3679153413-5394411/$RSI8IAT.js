import { jest } from '@jest/globals';
import { gitlabWebhookHandler } from '../controller/gitLabWebhook.controllers.js';
import Environment from '../modules/environment.module.js';
import EnvironmentExtension from '../modules/environmentextension.module.js';
import AnsibleTrigger from '../modules/ansibletrigger.module.js';
import { addBusinessHours } from '../utils/pipelineStatusUpdate.js';

// Mock all dependencies
jest.mock('../modules/environment.module.js');
jest.mock('../modules/environmentextension.module.js');
jest.mock('../modules/ansibletrigger.module.js');
jest.mock('../utils/EmailBody.js');
jest.mock('../utils/jwtDecoderUtils.js');
jest.mock('../utils/gitlabEventsHelper.js');
jest.mock('../utils/scheduleDestroyReminders.js');
jest.mock('../utils/handleCreateManifestBranch.js');
jest.mock('../utils/pipelineStatusUpdate.js');

describe('GitLab Webhook Controller Tests', () => {
  let req, res;

  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();
    
    // Setup request and response mocks
    req = {
      body: {},
      headers: { 'user-agent': 'test-agent' }
    };
    
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    };
  });

  describe('Environment Approval Webhook', () => {
    test('should handle environment approval successfully', async () => {
      // Mock environment data
      const mockEnvironment = {
        _id: 'env123',
        tenantId: 'tenant123',
        environmentType: 'dev',
        status: 'Requested',
        requestedBy: 'user@test.com',
        gitlabIssueId: 101,
        tcxManifestVersion: 'v1.0',
        ansibleInputVars: { SELECTED_KITS: [] },
        parentManifestVersion: null,
        save: jest.fn().mockResolvedValue(true)
      };

      // Mock webhook payload
      req.body = {
        object_kind: 'issue',
        object_attributes: { iid: 101 },
        labels: [{ title: 'environment::approved' }],
        user: { username: 'approver', name: 'Test Approver' },
        pipelineStage: 'deploy'
      };

      // Setup mocks
      Environment.findOne.mockResolvedValue(mockEnvironment);
      AnsibleTrigger.prototype.save = jest.fn().mockResolvedValue(true);

      await gitlabWebhookHandler(req, res);

      // Assertions
      expect(Environment.findOne).toHaveBeenCalledWith({ gitlabIssueId: 101 });
      expect(mockEnvironment.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Environment status updated',
        status: 'Approved'
      });
    });

    test('should return 404 when environment not found', async () => {
      req.body = {
        object_kind: 'issue',
        object_attributes: { iid: 999 },
        labels: [{ title: 'environment::approved' }]
      };

      Environment.findOne.mockResolvedValue(null);

      await gitlabWebhookHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Environment not found'
      });
    });

    test('should ignore non-issue events', async () => {
      req.body = {
        object_kind: 'merge_request',
        object_attributes: { iid: 101 }
      };

      await gitlabWebhookHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith('Ignored');
    });
  });

  describe('Extension Request Webhook', () => {
    test('should handle extension approval with business hours calculation', async () => {
      // Mock extension environment
      const mockExtensionEnv = {
        _id: 'ext123',
        tenantId: 'tenant123',
        environmentType: 'dev',
        envExtRequestStatus: 'Requested',
        envExtRequestedBy: 'user@test.com',
        envRequestForTime: 24,
        gitlabIssueId: 201,
        save: jest.fn().mockResolvedValue(true),
        toObject: jest.fn().mockReturnValue({
          _id: 'ext123',
          tenantId: 'tenant123',
          environmentType: 'dev'
        })
      };

      // Mock main environment
      const mockMainEnvironment = {
        _id: 'env123',
        tenantId: 'tenant123',
        destroyScheduledOn: new Date('2024-10-10T10:00:00Z'),
        tcxVersion: 'v1.0',
        destroyAfterDays: 72,
        save: jest.fn().mockResolvedValue(true)
      };

      // Mock webhook payload for extension approval
      req.body = {
        object_kind: 'issue',
        object_attributes: { iid: 201 },
        labels: [{ title: 'type:: extension_request' }, { title: 'status::approved' }],
        user: { username: 'approver', name: 'Test Approver' }
      };

      // Setup mocks
      EnvironmentExtension.findOne.mockResolvedValue(mockExtensionEnv);
      Environment.findOne.mockResolvedValue(mockMainEnvironment);
      addBusinessHours.mockReturnValue(new Date('2024-10-11T10:00:00Z'));

      await gitlabWebhookHandler(req, res);

      // Assertions
      expect(EnvironmentExtension.findOne).toHaveBeenCalledWith({ gitlabIssueId: 201 });
      expect(Environment.findOne).toHaveBeenCalledWith({ tenantId: 'tenant123' });
      expect(addBusinessHours).toHaveBeenCalledWith(
        mockMainEnvironment.destroyScheduledOn,
        24
      );
      expect(mockMainEnvironment.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
    });

    test('should handle extension rejection', async () => {
      const mockExtensionEnv = {
        _id: 'ext123',
        tenantId: 'tenant123',
        environmentType: 'dev',
        envExtRequestStatus: 'Requested',
        envExtRequestedBy: 'user@test.com',
        gitlabIssueId: 202,
        save: jest.fn().mockResolvedValue(true),
        toObject: jest.fn().mockReturnValue({
          _id: 'ext123',
          tenantId: 'tenant123'
        })
      };

      req.body = {
        object_kind: 'issue',
        object_attributes: { iid: 202 },
        labels: [{ title: 'type:: extension_request' }, { title: 'status::rejected' }],
        user: { username: 'rejector', name: 'Test Rejector' }
      };

      EnvironmentExtension.findOne.mockResolvedValue(mockExtensionEnv);
      Environment.findOne.mockResolvedValue({
        tcxVersion: 'v1.0',
        destroyAfterDays: 72
      });

      await gitlabWebhookHandler(req, res);

      expect(mockExtensionEnv.envExtRequestStatus).toBe('Rejected');
      expect(mockExtensionEnv.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
    });

    test('should return 404 when extension environment not found', async () => {
      req.body = {
        object_kind: 'issue',
        object_attributes: { iid: 999 },
        labels: [{ title: 'type:: extension_request' }, { title: 'status::approved' }]
      };

      EnvironmentExtension.findOne.mockResolvedValue(null);

      await gitlabWebhookHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Extension environment not found'
      });
    });
  });

  describe('Business Hours Extension Logic', () => {
    test('should handle invalid extension time gracefully', async () => {
      const mockExtensionEnv = {
        _id: 'ext123',
        tenantId: 'tenant123',
        envExtRequestStatus: 'Requested',
        envRequestForTime: 'invalid', // Invalid time
        gitlabIssueId: 203,
        save: jest.fn().mockResolvedValue(true),
        toObject: jest.fn().mockReturnValue({})
      };

      const mockMainEnvironment = {
        _id: 'env123',
        tenantId: 'tenant123',
        destroyScheduledOn: new Date('2024-10-10T10:00:00Z'),
        save: jest.fn().mockResolvedValue(true)
      };

      req.body = {
        object_kind: 'issue',
        object_attributes: { iid: 203 },
        labels: [{ title: 'type:: extension_request' }, { title: 'status::approved' }],
        user: { username: 'approver' }
      };

      // Setup mocks
      EnvironmentExtension.findOne.mockResolvedValue(mockExtensionEnv);
      Environment.findOne.mockResolvedValue(mockMainEnvironment);

      // Console.error spy to check error logging
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      await gitlabWebhookHandler(req, res);

      // Should log error but not crash
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('[Extension Approval] Invalid extension time')
      );
      expect(mockMainEnvironment.save).not.toHaveBeenCalled();

      consoleSpy.mockRestore();
    });

    test('should handle missing environment for extension', async () => {
      const mockExtensionEnv = {
        _id: 'ext123',
        tenantId: 'nonexistent-tenant',
        envExtRequestStatus: 'Requested',
        envRequestForTime: 24,
        gitlabIssueId: 204,
        save: jest.fn().mockResolvedValue(true),
        toObject: jest.fn().mockReturnValue({})
      };

      req.body = {
        object_kind: 'issue',
        object_attributes: { iid: 204 },
        labels: [{ title: 'type:: extension_request' }, { title: 'status::approved' }],
        user: { username: 'approver' }
      };

      EnvironmentExtension.findOne.mockResolvedValue(mockExtensionEnv);
      Environment.findOne.mockResolvedValue(null); // No environment found

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      await gitlabWebhookHandler(req, res);

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('[Extension Approval] Environment not found')
      );

      consoleSpy.mockRestore();
    });
  });

  describe('Error Handling', () => {
    test('should handle database errors gracefully', async () => {
      req.body = {
        object_kind: 'issue',
        object_attributes: { iid: 101 },
        labels: [{ title: 'environment::approved' }]
      };

      Environment.findOne.mockRejectedValue(new Error('Database connection failed'));

      await gitlabWebhookHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Database connection failed'
      });
    });

    test('should handle Ansible trigger errors', async () => {
      const mockEnvironment = {
        _id: 'env123',
        status: 'Requested',
        requestedBy: 'user@test.com',
        gitlabIssueId: 101,
        tcxManifestVersion: 'v1.0',
        ansibleInputVars: { SELECTED_KITS: [] },
        parentManifestVersion: null,
        save: jest.fn().mockResolvedValue(true)
      };

      req.body = {
        object_kind: 'issue',
        object_attributes: { iid: 101 },
        labels: [{ title: 'environment::approved' }],
        pipelineStage: 'deploy'
      };

      Environment.findOne.mockResolvedValue(mockEnvironment);
      AnsibleTrigger.prototype.save = jest.fn().mockRejectedValue(
        new Error('Ansible connection failed')
      );

      await gitlabWebhookHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Environment status updated but failed to trigger Ansible Tower job',
        details: 'Ansible connection failed'
      });
    });
  });
});

// Test runner configuration
describe('Test Configuration', () => {
  test('should have all required mocks', () => {
    expect(Environment).toBeDefined();
    expect(EnvironmentExtension).toBeDefined();
    expect(AnsibleTrigger).toBeDefined();
    expect(addBusinessHours).toBeDefined();
  });
});