import { WebSocketServer } from "ws";
import { Client } from "ssh2";
import { spawn } from "child_process";
import TCXSecretsManager from "./SecretReader.js";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import net from 'net';  // Add this import

const __dirname = path.dirname(fileURLToPath(import.meta.url));

class TerminalServer {
    constructor(config) {
        this.config = {
            wsPort: config.wsPort || 3000,
            sshPort: config.sshPort || 2022,
            tenantId: config.tenantId,
            envType: config.envType,
            awsAccountId: config.awsAccountId
        };
        this.secretsManager = new TCXSecretsManager(
            this.config.tenantId,
            this.config.envType,
            this.config.awsAccountId
        );
    }

    async startPortForwarding(instanceId, region = "us-east-1") {
    const awsCommand = process.platform === 'win32' ? 'aws.exe' : 'aws';
    const args = [
        "ssm",
        "start-session",
        "--target", instanceId,
        "--document-name", "AWS-StartPortForwardingSession",
        "--parameters", `portNumber=["22"],localPortNumber=["${this.config.sshPort}"]`,
        "--region", region
    ];

    console.log(`[SSM] Starting port forwarding for ${instanceId} on localhost:${this.config.sshPort}...`);
    
    try {
        // Check if session-manager-plugin is installed
        const checkPlugin = spawn('session-manager-plugin', ['--version']);
        await new Promise((resolve, reject) => {
            checkPlugin.on('error', (error) => {
                reject(new Error('AWS Session Manager Plugin is not installed. Please install it first.'));
            });
            checkPlugin.on('close', (code) => {
                if (code === 0) resolve();
                else reject(new Error('AWS Session Manager Plugin check failed'));
            });
        });

        const ssmProcess = spawn(awsCommand, args, { 
            stdio: "inherit",
            shell: process.platform === 'win32',
            env: {
                ...process.env,
                AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
                AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
                AWS_SESSION_TOKEN: process.env.AWS_SESSION_TOKEN,
                AWS_DEFAULT_REGION: region
            }
        });

        // Wait for port to be available
        await new Promise((resolve) => {
            const checkPort = () => {
                const tester = net.createServer()
                    .once('error', (err) => {
                        if (err.code === 'EADDRINUSE') {
                            resolve(); // Port is in use, which means SSM is ready
                        }
                        setTimeout(checkPort, 1000);
                    })
                    .once('listening', () => {
                        tester.once('close', () => setTimeout(checkPort, 1000)).close();
                    })
                    .listen(this.config.sshPort);
            };
            checkPort();
        });

        ssmProcess.on("error", (error) => {
            console.error("[SSM] Process error:", error);
            throw error;
        });

        ssmProcess.on("close", (code) => {
            console.log(`[SSM] process exited with code ${code}`);
        });

        return ssmProcess;
    } catch (error) {
        console.error("[SSM] Failed to start process:", error);
        throw error;
    }
}

    async initializeWebSocketServer() {
        const wss = new WebSocketServer({ port: this.config.wsPort });
        console.log(`WebSocket server started on port ${this.config.wsPort}`);

        try {
            const sshKey = await this.secretsManager.getSecrets(
                'tcx/automation/servers/keypair',
                'ec2_keypair',
                true
            );

            wss.on("connection", (ws) => {
                console.log("New client connected");
                this.handleWebSocketConnection(ws, sshKey);
            });

            wss.on("error", (error) => {
                console.error("WebSocket server error:", error);
                throw error;
            });
        } catch (error) {
            console.error("Failed to initialize WebSocket server:", error);
            throw error;
        }
    }

    async handleWebSocketConnection(ws, sshKeyPath) {
        const conn = new Client();

        try {
            const privateKey = fs.readFileSync(sshKeyPath, 'utf8').trim();
            
            if (!privateKey.startsWith('-----BEGIN')) {
                throw new Error('Invalid SSH key format. Must be in PEM format.');
            }

            conn.on("ready", () => {
                console.log("SSH connection established");
                ws.send("SSH connected\n");

                conn.shell((err, stream) => {
                    if (err) {
                        ws.send(`Shell error: ${err.message}`);
                        return;
                    }

                    stream.on("data", (data) => {
                        if (ws.readyState === WebSocket.OPEN) {
                            ws.send(data.toString());
                        }
                    });

                    stream.on("error", (err) => {
                        console.error("Stream error:", err);
                        ws.send(`Stream error: ${err.message}\n`);
                    });

                    ws.on("message", (msg) => {
                        if (stream.writable) {
                            stream.write(msg + "\n");
                        }
                    });

                    ws.on("close", () => {
                        stream.end();
                        conn.end();
                    });
                });
            });

            conn.on("error", (err) => {
                console.error("SSH connection error:", err);
                ws.send(`SSH connection error: ${err.message}\n`);
                ws.close();
            });

            conn.connect({
                host: "127.0.0.1",
                port: this.config.sshPort,
                username: "ec2-user",
                privateKey: privateKey,
                algorithms: {
                    kex: [
                        'ecdh-sha2-nistp256',
                        'ecdh-sha2-nistp384',
                        'ecdh-sha2-nistp521',
                        'diffie-hellman-group-exchange-sha256',
                        'diffie-hellman-group14-sha1'
                    ],
                    serverHostKey: [
                        'ssh-rsa',
                        'ecdsa-sha2-nistp256',
                        'ecdsa-sha2-nistp384',
                        'ecdsa-sha2-nistp521'
                    ]
                }
            });

        } catch (error) {
            console.error("SSH setup error:", error);
            ws.send(`SSH setup error: ${error.message}\n`);
            ws.close();
        }
    }

    async start(instanceId) {
        try {
            const ssmProcess = await this.startPortForwarding(instanceId);
            
            await new Promise(resolve => setTimeout(resolve, 2000));

            await this.initializeWebSocketServer();

            return {
                ssmProcess,
                cleanup: () => {
                    try {
                        ssmProcess.kill();
                        console.log("Cleanup completed successfully");
                    } catch (error) {
                        console.error("Cleanup failed:", error);
                    }
                }
            };
        } catch (error) {
            console.error("Failed to start terminal server:", error);
            throw error;
        }
    }
}

export default TerminalServer;