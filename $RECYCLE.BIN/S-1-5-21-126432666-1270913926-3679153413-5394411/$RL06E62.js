// ecosystem.config.js or PM2 config
{
  "name": "terminalServer",
  "script": "./terminalServer.js", 
  "instances": 1,
  "exec_mode": "fork",
  "autorestart": true,
  "max_restarts": 3,           // Limit restarts
  "min_uptime": "10s",         // Must run for 10s to be considered successful
  "restart_delay": 5000,       // Wait 5s between restarts
  "max_memory_restart": "500M",
  "watch": false,
  "kill_timeout": 5000,        // Give process time to cleanup
  "listen_timeout": 8000,      // Wait for process to be ready
  "log_date_format": "YYYY-MM-DD HH:mm:ss Z"
}