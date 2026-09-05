module.exports = {
  apps: [
    {
      name: 'terminalServer',
      script: './terminalServer.js',  // Fixed path - since config is in backend/
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      max_restarts: 3,
      min_uptime: '30s',         // Increased from 10s to 30s
      restart_delay: 10000,      // Increased from 5s to 10s
      max_memory_restart: '500M',
      watch: false,
      kill_timeout: 10000,       // Increased from 5s to 10s
      listen_timeout: 15000,     // Increased from 8s to 15s
      
      // Add restart conditions
      exp_backoff_restart_delay: 100,  // Exponential backoff
      ignore_watch: ["node_modules", "logs"], // Don't watch these
      
      // Only restart on unexpected exits, not clean shutdowns
      stop_exit_codes: [0],      // Don't restart on clean exit (code 0)
      
      env: {
        NODE_ENV: 'production',
        PM2_SERVE_PATH: './backend',
        PM2_SERVE_PORT: 8080
      },
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      error_file: './logs/terminalServer-error.log',
      out_file: './logs/terminalServer-out.log',
      log_file: './logs/terminalServer-combined.log',
      merge_logs: true
    }
  ]
};