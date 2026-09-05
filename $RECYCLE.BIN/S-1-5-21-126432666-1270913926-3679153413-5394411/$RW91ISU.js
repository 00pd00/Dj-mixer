import 'dotenv/config';
import TerminalServer from './TerminalServer.js';

const config = {
    wsPort: 3000,
    sshPort: 2022,
    tenantId: "0xbhu1pn",
    envType: "prd",
    awsAccountId: "482926177591"
};

const server = new TerminalServer(config);
const instanceId = "i-0620698911742aee1";

server.start(instanceId).then(({ cleanup }) => {
    console.log("Terminal server started successfully");
    process.on('SIGINT', () => {
        cleanup();
        process.exit();
    });
}).catch(error => {
    console.error("Failed to start server:", error);
    process.exit(1);
});