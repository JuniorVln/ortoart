# Página: Contato

**URL:** `/contato`
**Objetivo:** Facilitar ao máximo o primeiro contato do visitante — seja ele médico, hospital, plano de saúde ou paciente.

---

## Seções

### 1. Headline da Página
- Título: *"Estamos prontos para atender você"*
- Subtítulo: ex. *"Fale com a nossa equipe e descubra como a OrtoArt pode apoiar o seu próximo procedimento"*

---

### 2. Layout da Página
Dividido em duas colunas no desktop:
- **Coluna esquerda:** Formulário
- **Coluna direita:** Dados de contato + mapa

---

### 3. Formulário de Contato / Orçamento
Campos obrigatórios:
- Nome completo
- E-mail
- Telefone / WhatsApp
- Área de interesse: `[ ] Coluna` `[ ] Medicina Esportiva` `[ ] Outro`
- Mensagem (textarea)
- Botão "Enviar mensagem"

Comportamento: envio por e-mail para contato@ortoart.com.br + mensagem de confirmação na tela.

**Pendência:** Confirmar e-mail de destino e se há sistema de CRM para receber os leads.

---

### 4. Dados de Contato Direto
- Telefone: (+55) 41 3151-5454
- E-mail: contato@ortoart.com.br
- Horário de atendimento: Segunda a Sexta, das 9h às 17h
- WhatsApp: *(número a fornecer)* — botão direto abre conversa

**Pendência:** Número de WhatsApp a confirmar com o cliente.

---

### 5. Mapa Google Maps
- Mapa integrado (embed) com o pin da empresa
- Endereço: Av. Winston Churchill 1824, sala 208, Pinheirinho, Curitiba – PR
- Link "Como chegar" que abre Google Maps no navegador/app

---

### 6. WhatsApp em Destaque
- Botão verde "Chamar no WhatsApp" com ícone
- Mensagem pré-preenchida sugerida: *"Olá! Vim pelo site e gostaria de saber mais sobre os materiais da OrtoArt."*

---

## Componentes Globais presentes nesta página
- Header com menu
- WhatsApp flutuante (mesmo com o botão na página, mantém consistência)
- Footer completo
- Banner de cookies

---

## Observações de desenvolvimento
- O formulário também pode ser incorporado em outras páginas (Coluna, Medicina Esportiva) como CTA inline
- Validar campos de e-mail e telefone no front-end antes do envio
- Adicionar proteção anti-spam (reCAPTCHA ou honeypot)
- Página de sucesso ou mensagem inline após envio confirmado
