#!/usr/bin/env node
"use strict";

const SftpClient = require("ssh2-sftp-client");
const path = require("path");

const sftp = new SftpClient();

const config = {
  host: process.env.FTP_HOST,
  port: 2221,
  username: process.env.FTP_USER,
  password: process.env.FTP_PASS,
  readyTimeout: 20000,
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
    return sftp.end();
  })
  .catch((err) => {
    console.error("Erro no deploy:", err.message);
    process.exit(1);
  });
