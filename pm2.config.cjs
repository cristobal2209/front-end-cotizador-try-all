module.exports = {
  apps: [
    {
      name: "front-end-cotizador-try-all",
      script: "index.html",
      cwd: __dirname,
      args: ["--mode", "production"],
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
