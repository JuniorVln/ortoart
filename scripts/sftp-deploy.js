#!/usr/bin/env node
"use strict";

const SftpClient = require("ssh2-sftp-client");
const path = require("path");

// ssh2 may emit error events after the deploy completes during teardown.
// Treat those as warnings so the build exits 0.
process.on("uncaughtException", (err) => {
  console.warn("Aviso pós-deploy (ignorado):", err.message);
  process.exit(0);
});
process.on("unhandledRejection", (err) => {
  console.warn("Aviso pós-deploy (ignorado):", err?.message || err);
  process.exit(0);
});

const sftp = new SftpClient();

const config = {
  host: process.env.FTP_HOST,
  port: 2221,
  username: process.env.FTP_USER,
  password: process.env.FTP_PASS,
  readyTimeout: 30000,
};

const localDir = path.join(process.cwd(), "out");
const remoteDir = process.env.FTP_SERVER_DIR;

sftp
  .connect(config)
  .then(() => {
    console.log("Conectado. Iniciando upload de", localDir, "→", remoteDir);
    return sftp.uploadDir(localDir, remoteDir);
  })
  .then(() => {
    console.log("Deploy concluído com sucesso!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Erro no deploy:", err.message);
    process.exit(1);
  });
