import 'dotenv/config'; // Loads environment variables from .env file
import { STSClient, AssumeRoleCommand } from "@aws-sdk/client-sts"; // Import AWS SDK
import fs from 'fs';
import path from 'path';

class AWSCredentialManager {
    constructor() {
        // Always use base credentials from the stored values (not current environment)
        // This ensures password display flow always uses base credentials, not temporary ones
        const baseCredentials = this.getBaseCredentials();
        this.initialAccessKeyId = baseCredentials.accessKeyId;
        this.initialSecretAccessKey = baseCredentials.secretAccessKey;
        this.awsRegion = process.env.AWS_REGION || 'us-east-1'; // Default to us-east-1 if not specified
        this.roleIAMArn = process.env.ROLE_IAM_ARN;
        this.roleOperationArn = process.env.ROLE_OPERATION_ARN;

        // Validate that all necessary environment variables are set
        if (!this.initialAccessKeyId || !this.initialSecretAccessKey) {
            throw new Error("AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY must be set in the .env file.");
        }
        if (!this.roleIAMArn) {
            throw new Error("ROLE_IAM_ARN must be set in the .env file.");
        }
        if (!this.roleOperationArn) {
            throw new Error("ROLE_OPERATION_ARN must be set in the .env file.");
        }

        // Configure the AWS SDK with the initial credentials
        // This STS client will be used for the first role assumption (IAM)
        this.stsClient = new STSClient({
            region: this.awsRegion,
            credentials: {
                accessKeyId: this.initialAccessKeyId,
                secretAccessKey: this.initialSecretAccessKey
            }
        });
    }

    /**
     * Get base AWS credentials from .env file (not from current environment variables)
     * This ensures we always use the original credentials, not temporary ones set by terminal
     * @returns {Object} Base credentials with accessKeyId and secretAccessKey
     */
    getBaseCredentials() {
        try {
            // Read .env file directly to get base credentials
            const envPath = path.resolve('.env');
            const envContent = fs.readFileSync(envPath, 'utf8');
            
            const envVars = {};
            envContent.split('\n').forEach(line => {
                const [key, ...valueParts] = line.split('=');
                if (key && valueParts.length > 0) {
                    envVars[key.trim()] = valueParts.join('=').trim();
                }
            });
            
            return {
                accessKeyId: envVars.AWS_ACCESS_KEY_ID,
                secretAccessKey: envVars.AWS_SECRET_ACCESS_KEY
            };
        } catch (error) {
            console.error('Failed to read base credentials from .env file:', error.message);
            // Fallback to current environment if .env read fails
            return {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
            };
        }
    }

    /**
     * Assumes an IAM role and returns temporary credentials.
     * @param {string} roleArn - The ARN of the role to assume.
     * @param {object | null} sourceCredentials - Optional. The credentials (AccessKeyId, SecretAccessKey, SessionToken)
     *                                            to use for assuming this role. If null, uses the initial credentials
     *                                            configured in the constructor.
     * @param {string} sessionName - A unique identifier for the assumed role session.
     * @returns {Promise<object>} - A promise that resolves with the temporary credentials object.
     *                               The object will contain AccessKeyId, SecretAccessKey, SessionToken, and Expiration.
     */
    async assumeRole(roleArn, sourceCredentials, sessionName) {
        const params = {
            RoleArn: roleArn,
            RoleSessionName: sessionName,
            DurationSeconds: 3000 // 50min session duration
        };

        return new Promise((resolve, reject) => {
            let stsClient = this.stsClient; // Default to the initial STS client

            // If sourceCredentials are provided, create a new STS client using them.
            // This is crucial for chaining role assumptions.
            if (sourceCredentials) {
                console.log(`Attempting to assume role ${roleArn} using provided source credentials...`);
                stsClient = new STSClient({
                    region: this.awsRegion,
                    credentials: {
                        accessKeyId: sourceCredentials.AccessKeyId,
                        secretAccessKey: sourceCredentials.SecretAccessKey,
                        sessionToken: sourceCredentials.SessionToken
                    }
                });
            } else {
                console.log(`Attempting to assume role ${roleArn} using initial credentials...`);
            }

            const command = new AssumeRoleCommand(params);
            stsClient.send(command)
                .then(data => {
                    console.log(`Successfully assumed role ${roleArn}.`);
                    resolve(data.Credentials);
                })
                .catch(err => {
                    console.error(`Error assuming role ${roleArn}:`, err.name, err.message);
                    reject(err);
                });
        });
    }

    /**
     * Performs a chained role assumption:
     * 1. Assumes ROLE_IAM using the initial credentials from the .env file.
     * 2. Uses the temporary credentials obtained from ROLE_IAM to assume ROLE_OPERATION.
     * 3. Returns the temporary credentials for ROLE_OPERATION.
     * @returns {Promise<object>} - A promise that resolves with the final temporary credentials
     *                               from ROLE_OPERATION in a dictionary/object format.
     */
    async getChainedRoleCredentials() {
        try {
            // Generate a unique session name for the first role assumption
            const sessionNameIAM = `RoleIAMSession-${Date.now()}`;
            console.log(`\n--- Step 1: Assuming Role IAM (${this.roleIAMArn}) ---`);
            // const credentialsIAM = await this.assumeRole(this.roleIAMArn, null, sessionNameIAM);
            const credentialsIAM = {
        "AccessKeyId": "ASIAXA4FEVU32L3OMFZJ",
        "SecretAccessKey": "AI57LsI8cBbziPMTSxT/EfAvM/1h4x7toPs5YRx+",
        "SessionToken": "IQoJb3JpZ2luX2VjEJr//////////wEaCXVzLWVhc3QtMSJGMEQCICjjFtHd7NzgMBsOSjY+pJmwaUlwp6HwvVMreJTtuD/DAiAyaQyTDsRoAQfouNCyTl8NeJbH6nGCyDXcEQlwJvHN0yqbAghjEAEaDDQ4MjkyNjE3NzU5MSIMo+Fhc/kFlSNHU71TKvgB+C4xdXn63E1+qf519DQ1SompqtgLYDf2qvW9Tt74St9Ffwq+JU6FveQeiD54AY3PN4USWE7ieVMZbAHCfDsIvqBS7H4ge2dKuZEZXyPRUqfud8AHKr+ihfXfwMoavPrWQwmw7ZybIKzbbR9bBxBB31dwnVNIwYEXxWNDLuRsia7D+Ifzh2N1n3H4OBN4g3zUCJ4fOLjoRQCmS4tj2EV9r1Z7KWfdq9EKp+YtKeFOvqDdiJ7sNPc7Cc1nPgyv5aOVeGqIpjduUPWo0WPZxj+FxtgKaDlAjeujbBprb9abNWvSWwJwcM+WrDfmG6NZdAEBeXW4yR0rhcUw9YrWzAY6ngEIbrQiYkMSuqkRouUH4iESqCpXUzkEcupfYo3t2dtlXp5TEXW/bKKBDMGqJARHvShfIJIMWoVAdaP6H8MtPbhsyIpMos2EDi/QAOvJ7KNZGuU0ui28AeO0pZ7V/zvrejLQZMnVhXnY7Dy/fAYx5WjFYLKcDdetgZiesJzu0xV601thzelPjQ4v3NYJRcWqKgRt+dNmO5TLyv3mv8vCiQ==",
        "Expiration": "2026-02-18T10:25:09+00:00"
    }

            if (!credentialsIAM) {
                throw new Error("Failed to obtain credentials for ROLE_IAM.");
            }

            // Generate a unique session name for the second role assumption
            const sessionNameOperation = `RoleOperationSession-${Date.now()}`;
            console.log(`\n--- Step 2: Assuming Role Operation (${this.roleOperationArn}) using Role IAM credentials ---`);
            const credentialsOperation = await this.assumeRole(this.roleOperationArn, credentialsIAM, sessionNameOperation);

            if (!credentialsOperation) {
                throw new Error("Failed to obtain credentials for ROLE_OPERATION.");
            }

            console.log("\n--- Chained Role Assumption Successful ---");
            // Return the final credentials in a dictionary/object format
            return {
                AccessKeyId: credentialsOperation.AccessKeyId,
                SecretAccessKey: credentialsOperation.SecretAccessKey,
                SessionToken: credentialsOperation.SessionToken,
                Expiration: credentialsOperation.Expiration // Expiration is a Date object
            };

        } catch (error) {
            console.error("\nError during chained role assumption process:", error.message);
            throw error; // Re-throw the error for the caller to handle
        }
    }
}

export default AWSCredentialManager; // Export the class using ES Modules