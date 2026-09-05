import { ClientSecretCredential } from "@azure/identity";
import { SecretClient } from "@azure/keyvault-secrets";
import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs";

const execAsync = promisify(exec);

/**
 * Azure Credentials Manager
 * Handles Azure Service Principal authentication, token management, and Key Vault access
 */
class AzureCredsManager {
  constructor() {
    this.credential = null;
    this.accessToken = null;
    this.tokenExpiresOn = null;
    this.isAuthenticated = false;
    this.secretClient = null;
    
    // Service Principal credentials (will be loaded from secure storage)
    this.clientId = null;
    this.clientSecret = null;
    this.tenantId = null;
    
    // Configuration
    this.keyVaultUrl = null;
    this.subscriptionId = null;
    
    // Token refresh settings
    this.refreshBufferMinutes = 5; // Refresh 5 minutes before expiry
    this.refreshInterval = null;
  }

  /**
   * Initialize Azure credentials from environment or secure storage
   */
  async initialize(config) {
    try {
      console.log("[Azure Creds] Initializing Azure Credentials Manager...");
      
      // Load credentials from config or environment
      this.clientId = config.clientId || process.env.AZURE_CLIENT_ID;
      this.clientSecret = config.clientSecret || process.env.AZURE_CLIENT_SECRET;
      this.tenantId = config.tenantId || process.env.AZURE_TENANT_ID;
      this.keyVaultUrl = config.keyVaultUrl || process.env.AZURE_KEY_VAULT_URL;
      this.subscriptionId = config.subscriptionId || process.env.AZURE_SUBSCRIPTION_ID;
      
      if (!this.clientId || !this.clientSecret || !this.tenantId) {
        throw new Error("Missing required Azure credentials: clientId, clientSecret, or tenantId");
      }
      
      console.log("[Azure Creds] Credentials loaded successfully");
      console.log(`[Azure Creds] Tenant ID: ${this.tenantId}`);
      console.log(`[Azure Creds] Client ID: ${this.clientId}`);
      
      // Create credential object
      this.credential = new ClientSecretCredential(
        this.tenantId,
        this.clientId,
        this.clientSecret
      );
      
      // Initialize Key Vault client if URL provided
      if (this.keyVaultUrl) {
        this.secretClient = new SecretClient(this.keyVaultUrl, this.credential);
        console.log(`[Azure Creds] Key Vault client initialized: ${this.keyVaultUrl}`);
      }
      
      console.log("[Azure Creds] Azure Credentials Manager initialized successfully");
      return true;
      
    } catch (error) {
      console.error("[Azure Creds] Failed to initialize:", error.message);
      throw error;
    }
  }

  /**
   * Authenticate using Azure CLI (az login with service principal)
   */
  async authenticateWithCLI() {
    try {
      console.log("[Azure Creds] Authenticating with Azure CLI...");
      
      // Check if Azure CLI is installed
      try {
        await execAsync("az --version");
      } catch (error) {
        throw new Error("Azure CLI is not installed. Please install it first.");
      }
      
      // Login with service principal
      const loginCommand = `az login --service-principal --username ${this.clientId} --password "${this.clientSecret}" --tenant ${this.tenantId}`;
      
      console.log("[Azure Creds] Executing az login...");
      const { stdout, stderr } = await execAsync(loginCommand);
      
      if (stderr && !stderr.includes("WARNING")) {
        console.warn("[Azure Creds] CLI login warning:", stderr);
      }
      
      console.log("[Azure Creds] ✓ Azure CLI authentication successful");
      
      // Get account information
      const accountInfo = await this.getAccountInfo();
      console.log(`[Azure Creds] Logged in as: ${accountInfo.user?.name || 'Service Principal'}`);
      console.log(`[Azure Creds] Subscription: ${accountInfo.name} (${accountInfo.id})`);
      
      this.isAuthenticated = true;
      
      return accountInfo;
      
    } catch (error) {
      console.error("[Azure Creds] CLI authentication failed:", error.message);
      throw new Error(`Azure CLI authentication failed: ${error.message}`);
    }
  }

  /**
   * Get Azure account information
   */
  async getAccountInfo() {
    try {
      const { stdout } = await execAsync("az account show");
      return JSON.parse(stdout);
    } catch (error) {
      console.error("[Azure Creds] Failed to get account info:", error.message);
      throw error;
    }
  }

  /**
   * Get access token using Azure SDK (for API calls)
   */
  async getAccessToken(scopes = ["https://management.azure.com/.default"]) {
    try {
      console.log("[Azure Creds] Getting access token...");
      
      if (!this.credential) {
        throw new Error("Credential not initialized. Call initialize() first.");
      }
      
      const tokenResponse = await this.credential.getToken(scopes);
      
      this.accessToken = tokenResponse.token;
      this.tokenExpiresOn = tokenResponse.expiresOnTimestamp;
      
      const expiryDate = new Date(this.tokenExpiresOn);
      console.log(`[Azure Creds] ✓ Access token obtained, expires at: ${expiryDate.toISOString()}`);
      
      // Start token refresh monitoring
      this.startTokenRefreshMonitoring();
      
      return this.accessToken;
      
    } catch (error) {
      console.error("[Azure Creds] Failed to get access token:", error.message);
      throw error;
    }
  }

  /**
   * Check if token needs refresh
   */
  needsRefresh() {
    if (!this.tokenExpiresOn) return true;
    
    const now = Date.now();
    const expiryTime = this.tokenExpiresOn;
    const bufferTime = this.refreshBufferMinutes * 60 * 1000; // Convert to milliseconds
    
    return (expiryTime - now) <= bufferTime;
  }

  /**
   * Start monitoring token expiration and auto-refresh
   */
  startTokenRefreshMonitoring() {
    // Clear existing interval if any
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
    
    // Check every minute
    this.refreshInterval = setInterval(async () => {
      if (this.needsRefresh()) {
        console.log("[Azure Creds] Token expiring soon, refreshing...");
        try {
          await this.getAccessToken();
          console.log("[Azure Creds] ✓ Token refreshed successfully");
        } catch (error) {
          console.error("[Azure Creds] Failed to refresh token:", error.message);
        }
      }
    }, 60000); // Check every minute
    
    console.log("[Azure Creds] Token refresh monitoring started");
  }

  /**
   * Stop token refresh monitoring
   */
  stopTokenRefreshMonitoring() {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
      this.refreshInterval = null;
      console.log("[Azure Creds] Token refresh monitoring stopped");
    }
  }

  /**
   * Get secret from Azure Key Vault
   */
  async getSecret(secretName) {
    try {
      console.log(`[Azure Creds] Retrieving secret: ${secretName}`);
      
      if (!this.secretClient) {
        throw new Error("Key Vault client not initialized. Provide keyVaultUrl in config.");
      }
      
      const secret = await this.secretClient.getSecret(secretName);
      
      console.log(`[Azure Creds] ✓ Secret retrieved: ${secretName}`);
      return secret.value;
      
    } catch (error) {
      console.error(`[Azure Creds] Failed to get secret ${secretName}:`, error.message);
      throw error;
    }
  }

  /**
   * Get SSH key from Key Vault and save to temporary file
   */
  async getSSHKey(secretName, outputPath) {
    try {
      console.log(`[Azure Creds] Retrieving SSH key: ${secretName}`);
      
      const sshKey = await this.getSecret(secretName);
      
      // Ensure directory exists
      const dir = outputPath.substring(0, outputPath.lastIndexOf('/'));
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      
      // Write SSH key to file
      fs.writeFileSync(outputPath, sshKey, { mode: 0o600 });
      
      console.log(`[Azure Creds] ✓ SSH key saved to: ${outputPath}`);
      return outputPath;
      
    } catch (error) {
      console.error(`[Azure Creds] Failed to get SSH key:`, error.message);
      throw error;
    }
  }

  /**
   * Validate current authentication status
   */
  async validateAuthentication() {
    try {
      console.log("[Azure Creds] Validating authentication...");
      
      // Try to get account info
      const accountInfo = await this.getAccountInfo();
      
      this.isAuthenticated = true;
      console.log("[Azure Creds] ✓ Authentication is valid");
      
      return {
        isValid: true,
        account: accountInfo
      };
      
    } catch (error) {
      console.error("[Azure Creds] Authentication validation failed:", error.message);
      this.isAuthenticated = false;
      
      return {
        isValid: false,
        error: error.message
      };
    }
  }

  /**
   * Logout from Azure CLI
   */
  async logout() {
    try {
      console.log("[Azure Creds] Logging out from Azure CLI...");
      
      await execAsync("az logout");
      
      this.isAuthenticated = false;
      this.accessToken = null;
      this.tokenExpiresOn = null;
      
      // Stop token refresh monitoring
      this.stopTokenRefreshMonitoring();
      
      console.log("[Azure Creds] ✓ Logged out successfully");
      
    } catch (error) {
      console.error("[Azure Creds] Logout failed:", error.message);
      throw error;
    }
  }

  /**
   * Cleanup resources
   */
  async cleanup() {
    try {
      console.log("[Azure Creds] Cleaning up Azure credentials...");
      
      this.stopTokenRefreshMonitoring();
      
      if (this.isAuthenticated) {
        await this.logout();
      }
      
      this.credential = null;
      this.secretClient = null;
      
      console.log("[Azure Creds] ✓ Cleanup completed");
      
    } catch (error) {
      console.error("[Azure Creds] Cleanup failed:", error.message);
    }
  }
}

// Export singleton instance
const azureCredsManager = new AzureCredsManager();
export default azureCredsManager;