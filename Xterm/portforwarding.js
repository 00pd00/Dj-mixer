// portForward.js
const { spawn } = require("child_process");

function startPortForward(instanceId, region = "us-east-1") {
  const args = [
    "ssm",
    "start-session",
    "--target", instanceId,
    "--document-name", "AWS-StartPortForwardingSession",
    "--parameters", `portNumber=["22"],localPortNumber=["2022"]`,
    "--region", region
  ];

  console.log(`[SSM] Starting port forwarding for ${instanceId} on localhost:2022...`);
  const ssmProcess = spawn("aws", args, { stdio: "inherit" });

  ssmProcess.on("close", (code) => {
    console.log(`[SSM] process exited with code ${code}`);
  });

  ssmProcess.on("error", (err) => {
    console.error(`[SSM] failed to start: ${err.message}`);
  });
}

// Example usage:
startPortForward("i-0620698911742aee1"); // replace with your EC2 instance ID
