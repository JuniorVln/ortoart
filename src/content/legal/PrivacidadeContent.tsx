import Link from "next/link";

function DataTable({
  title,
  rows,
}: {
  title: string;
  rows: { data: string; purpose: string; legal: string }[];
}) {
  return (
    <div className="legal-table-wrap">
      <p className="font-semibold text-[#0D1F3C]">{title}</p>
      <table>
        <thead>
          <tr>
            <th>Dado(s) pessoal(is)</th>
            <th>Finalidade</th>
            <th>Base legal (LGPD)</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.data}>
              <td>{row.data}</td>
              <td>{row.purpose}</td>
              <td>{row.legal}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function PrivacidadeContent() {
  return (
    <>
      <p>
        <strong>Seja bem-vindo(a)!</strong>
      </p>
      <p>
        Esta Política de Privacidade do Site da Ortoart é um acordo legal entre você,
        pessoa natural, doravante denominado(a) de <strong>USUÁRIO</strong>, e a{" "}
        <strong>ORTOART MATERIAIS CIRÚRGICOS LTDA</strong>, inscrita no CNPJ/ME nº
        09.530.330/0001-63, com sede na Avenida Winston Churchill, nº 1.824, conjunto 208,
        bairro Capão Raso, Curitiba/PR, CEP 81.130-000, endereço eletrônico{" "}
        <a href="mailto:contato@ortoart.com.br">contato@ortoart.com.br</a>, responsável
        por este sítio eletrônico (https://ortoart.com.br/).
      </p>

      <h2>1. Introdução</h2>
      <p>
        Nós, da ORTOART, respeitamos a sua privacidade em relação a qualquer informação sua.
        Solicitamos informações pessoais apenas quando realmente precisamos delas, realizando
        a coleta por meios justos e legais e com o seu conhecimento.
      </p>
      <p>
        Esta Política tem o objetivo de cientificar como seus dados pessoais são utilizados
        pela ORTOART em razão do uso do sítio eletrônico.
      </p>

      <h2>2. Definições importantes</h2>
      <p>
        Para fins deste documento e de acordo com a Lei Geral de Proteção de Dados Pessoais
        (LGPD — Lei nº 13.709/2018), consideram-se, entre outros:
      </p>
      <ul>
        <li>
          <strong>Dados pessoais:</strong> informações relativas a pessoa natural identificada
          ou identificável.
        </li>
        <li>
          <strong>Tratamento:</strong> toda operação realizada com dados pessoais, como
          coleta, utilização, armazenamento, eliminação e compartilhamento.
        </li>
        <li>
          <strong>Titular:</strong> pessoa natural a quem se referem os dados pessoais.
        </li>
        <li>
          <strong>Controlador:</strong> pessoa a quem competem as decisões referentes ao
          tratamento de dados pessoais.
        </li>
        <li>
          <strong>Operador:</strong> pessoa que realiza o tratamento em nome do controlador.
        </li>
        <li>
          <strong>Encarregado:</strong> canal de comunicação entre controlador, titulares e a
          Autoridade Nacional de Proteção de Dados (ANPD).
        </li>
      </ul>

      <h2>3. Quando esta política se aplica?</h2>
      <p>
        A presente Política regula o tratamento de dados fornecidos pelo USUÁRIO em razão da
        utilização do site da ORTOART, observando a Constituição Federal, a LGPD e legislações
        correlatas.
      </p>
      <p>
        Ao fornecer dados pessoais a partir do site, o USUÁRIO adere integralmente a esta
        Política, entendendo e aceitando todas as condições aqui estabelecidas.
      </p>
      <p>
        O uso das funcionalidades também está condicionado à adesão aos{" "}
        <Link href="/termos-de-uso/">Termos de Uso</Link> e, quando aplicável, à{" "}
        <Link href="/politica-de-cookies/">Política de Cookies</Link>.
      </p>

      <h2>4. Quais dados são coletados e como são utilizados?</h2>
      <p>
        O site tem por objetivo divulgar informações relativas aos serviços prestados pela
        ORTOART. A ORTOART poderá tratar dados pessoais principalmente nas seguintes
        situações:
      </p>

      <DataTable
        title="Navegação no site"
        rows={[
          {
            data: "Dados do dispositivo, cookies, pixels de rastreamento, dados da sessão (páginas visitadas etc.).",
            purpose: "Cumprir obrigação legal (Marco Civil da Internet).",
            legal: "Cumprimento de obrigação legal ou regulatória",
          },
          {
            data: "Dados de navegação e comportamento.",
            purpose: "Promover melhorias, personalizar o site e/ou direcionar mensagens.",
            legal: "Legítimo interesse",
          },
          {
            data: "Preferências de cookies e navegação.",
            purpose: "Melhorar a experiência de navegação.",
            legal: "Consentimento",
          },
        ]}
      />

      <DataTable
        title="Formulário de contato"
        rows={[
          {
            data: "Nome, e-mail, telefone, área de interesse e mensagem.",
            purpose: "Responder solicitações e prestar atendimento.",
            legal: "Legítimo interesse / Execução de procedimentos preliminares",
          },
        ]}
      />

      <p>
        O USUÁRIO está ciente de que a não disponibilização de alguns dados pode obstar o
        acesso a funcionalidades ou ao retorno de contato solicitado.
      </p>
      <p>
        A ORTOART pode incluir links que direcionem o USUÁRIO a sites de terceiros, ocasião
        em que recomenda a leitura das políticas de privacidade aplicáveis a esses ambientes.
      </p>

      <h2>5. Quem são os responsáveis pela proteção dos dados?</h2>
      <p>
        Em regra, a ORTOART atua como controladora dos dados pessoais tratados neste site.
      </p>
      <p>
        A ORTOART indica como encarregada pelo tratamento de dados pessoais a assessoria
        Moreno Moro Advogados, representada por Tailane Moreno Delgado Moro, responsável por
        atuar como canal de comunicação entre a ORTOART, os titulares e a ANPD.
      </p>
      <p>
        Contato da encarregada:{" "}
        <a href="mailto:lgpd@ortoart.com.br">lgpd@ortoart.com.br</a> ou correspondência
        postal à Moreno Moro Advogados, Rua Padre Anchieta, nº 2.050, sala 2.306, bairro
        Bigorrilho, Curitiba/PR, CEP 80.730-001.
      </p>

      <h2>6. Obrigações da OrtoArt e dos operadores</h2>
      <p>
        A ORTOART fornecerá seus serviços dentro dos padrões de qualidade e segurança
        aplicáveis, utilizando pessoal qualificado e adotando medidas técnicas e
        administrativas de proteção.
      </p>
      <p>
        A ORTOART manterá registro das operações de tratamento de dados pessoais que realizar,
        conforme exigido pela legislação.
      </p>

      <h2>7. Quais são os meus direitos?</h2>
      <p>
        Na forma do artigo 18 da LGPD, o USUÁRIO, na qualidade de titular, pode solicitar:
      </p>
      <ul>
        <li>confirmação da existência de tratamento;</li>
        <li>acesso aos dados;</li>
        <li>correção de dados incompletos, inexatos ou desatualizados;</li>
        <li>
          anonimização, bloqueio ou eliminação de dados desnecessários ou tratados em
          desconformidade;
        </li>
        <li>portabilidade dos dados, quando aplicável;</li>
        <li>eliminação dos dados tratados com base no consentimento, quando cabível;</li>
        <li>informação sobre compartilhamentos realizados;</li>
        <li>informação sobre a possibilidade de não consentir e suas consequências;</li>
        <li>revogação do consentimento, quando esta for a base legal utilizada.</li>
      </ul>
      <p>
        Os direitos serão exercidos mediante requerimento expresso do USUÁRIO à ORTOART e
        serão atendidos em até 30 (trinta) dias, salvo prazo legal diverso.
      </p>

      <h2>8. Medidas de segurança</h2>
      <p>
        A ORTOART adota medidas de segurança técnicas e administrativas aptas a proteger os
        dados pessoais contra acessos não autorizados e situações acidentais ou ilícitas de
        destruição, perda, alteração ou comunicação inadequada.
      </p>
      <p>
        A ORTOART comunicará à ANPD e ao titular a ocorrência de incidente de segurança que
        possa acarretar risco ou dano relevante, nos termos da LGPD.
      </p>

      <h2>9. Por quanto tempo os dados serão tratados?</h2>
      <p>
        A ORTOART manterá os dados pessoais armazenados pelo tempo necessário para atender às
        finalidades do tratamento, respeitados os prazos legais de retenção e o exercício
        regular de direitos.
      </p>

      <h2>10. Disposições finais</h2>
      <p>
        O USUÁRIO confirma a veracidade dos dados informados, sob pena de responsabilização
        civil e penal.
      </p>
      <p>
        A ORTOART se reserva o direito de modificar esta Política a qualquer tempo,
        mantendo a versão atualizada disponível neste site.
      </p>
      <p>
        Esta Política será regida pelas leis brasileiras, elegendo-se o foro da Comarca de
        Curitiba/PR para dirimir quaisquer dúvidas.
      </p>

      <h2>11. Dúvidas? Fale conosco</h2>
      <p>
        Para exercer seus direitos ou esclarecer dúvidas sobre esta Política, entre em
        contato com a encarregada pelo e-mail{" "}
        <a href="mailto:lgpd@ortoart.com.br">lgpd@ortoart.com.br</a> ou pelos canais
        indicados na seção 5 deste documento.
      </p>
    </>
  );
}
