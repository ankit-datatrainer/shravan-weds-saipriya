// PM2 process file for running on a Hostinger VPS.
// Usage: pm2 start ecosystem.config.js
//
// Port 3002 is used deliberately: another app on this VPS
// (wealth-app) already runs on 3001, so this stays clear of it.
// Each app gets its own PM2 process name and port; Nginx then routes
// by subdomain (server_name) to the right port. Neither app touches
// the other's PM2 process or port.
module.exports = {
  apps: [
    {
      name: "shravan-weds-saipriya",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3002",
      cwd: __dirname,
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: 3002,
      },
    },
  ],
};
