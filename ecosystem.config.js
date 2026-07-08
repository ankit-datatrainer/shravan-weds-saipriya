// PM2 process file for running on a Hostinger VPS.
// Usage: pm2 start ecosystem.config.js
module.exports = {
  apps: [
    {
      name: "shravan-weds-saipriya",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000",
      cwd: __dirname,
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],
};
