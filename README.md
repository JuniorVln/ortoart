# OrtoArt

Site institucional da OrtoArt Materiais Cirurgicos Ltda. em Next.js 16 com React 19.

## Estrutura

- `src/`: aplicacao principal do site da OrtoArt
- `downloads/synthorix/`: mirror local do site de referencia usado como base visual e estrutural
- `planejamento/`: escopo e estrutura das paginas
- `old/`: conteudo extraido do site antigo para migracao
- `Branding/`: materiais de marca
- `tools/`: scripts de apoio, incluindo o gerador do mirror

## Comandos

Execute tudo a partir da raiz do projeto:

```bash
npm run dev
npm run build
npm run lint
```

O app sobe em `http://localhost:3000`.

## Referencia clonada

Para visualizar o mirror estatico do site-base localmente:

```bash
python -m http.server 4173 --bind 127.0.0.1 --directory downloads/synthorix
```

Depois abra:

`http://127.0.0.1:4173/pages/index.html`

## Observacoes

- O app Next.js agora vive na raiz do repositorio; a pasta `site/` foi removida da estrutura ativa.
- O mirror baixado fica separado em `downloads/synthorix` para servir como referencia durante a implementacao.
