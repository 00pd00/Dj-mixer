import { describe, test, expect } from '@jest/globals';

describe('Terminal Controller - Basic Tests', () => {
  test('should load terminal controller module', async () => {
    const terminalController = await import('../../../controller/terminal.controller.js');
    
    expect(terminalController).toBeDefined();
    expect(terminalController.Envdata).toBeDefined();
    expect(typeof terminalController.Envdata).toBe('function');
  });

  test('should have setSharedEnvData export', async () => {
    const terminalController = await import('../../../controller/terminal.controller.js');
    
    expect(terminalController.setSharedEnvData).toBeDefined();
    expect(typeof terminalController.setSharedEnvData).toBe('function');
  });

  test('should have getSharedEnvData export', async () => {
    const terminalController = await import('../../../controller/terminal.controller.js');
    
    expect(terminalController.getSharedEnvData).toBeDefined();
    expect(typeof terminalController.getSharedEnvData).toBe('function');
  });
});
