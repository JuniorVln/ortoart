#!/bin/bash
set -e

# Install lftp if not available (Netlify build environment may not have it)
if ! command -v lftp &> /dev/null; then
  echo "Instalando lftp..."
  apt-get update -qq 2>&1 || true
  apt-get install -y -q lftp
fi

echo "Iniciando deploy via SFTP..."

lftp \
  -e "set sftp:auto-confirm yes; mirror -R --delete ./out/ $FTP_SERVER_DIR; bye" \
  sftp://$FTP_USER:$FTP_PASS@$FTP_HOST:2221

echo "Deploy concluído com sucesso!"
