import { WebSocketServer } from "ws";
import { Client } from "ssh2";
import fs from "fs";
import TCXSecretsManager from "./SecretReader.js";

const wss = new WebSocketServer({ port: 3000 });


const TENANT_ID = "0xbhu1pn";
const ENV_TYPE = "prd";
const AWS_ACCOUNT_ID = "482926177591";
const reader = new TCXSecretsManager(TENANT_ID, ENV_TYPE, AWS_ACCOUNT_ID);
let secret = await reader.getSecrets('tcx/automation/servers/keypair', "ec2_keypair", true);
console.log(secret);


wss.on("connection", (ws) => {
  console.log("WebSocket client connected");

  const conn = new Client();

  conn
    .on("ready", () => {
      console.log("SSH connection established to localhost:2022");
      ws.send("SSH connected\n");

      conn.shell((err, stream) => {
        if (err) return ws.send("Shell error: " + err.message);

        // Forward SSH output to WebSocket
        stream.on("data", (data) => ws.send(data.toString()));

        // Forward WebSocket input to SSH
        ws.on("message", (msg) => {
          stream.write(msg + "\n");
        });

        ws.on("close", () => {
          stream.end();
          conn.end();
        });
      });
    })
    .connect({
      host: "127.0.0.1",
      port: 2022,
        username: "ec2-user",
      privateKey: fs.readFileSync(secret), // Your private key file
    });
});
