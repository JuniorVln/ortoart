#!/bin/bash
set -e

echo "Iniciando deploy via SFTP..."

lftp \
  -e "set sftp:auto-confirm yes; mirror -R --delete ./out/ $FTP_SERVER_DIR; bye" \
  sftp://$FTP_USER:$FTP_PASS@$FTP_HOST:2221

echo "Deploy concluído com sucesso!"
