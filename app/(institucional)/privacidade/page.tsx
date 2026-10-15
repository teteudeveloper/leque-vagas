import type { Metadata } from "next";
import Link from "next/link";
import AtualizadoEm from "../AtualizadoEm";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Quais dados pessoais o Leque de Vagas coleta, para que servem e por quanto tempo são mantidos.",
};

export default function Privacidade() {
  return (
    <>
      <h1>Política de Privacidade</h1>
      <AtualizadoEm />
      <p>
        Esta política explica, em linguagem direta, quais dados pessoais o Leque de Vagas trata e
        com qual finalidade, em linha com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).
      </p>

      <h2>1. Navegação</h2>
      <p>
        Navegar pela plataforma não exige cadastro. Não usamos cookies de publicidade nem
        ferramentas de rastreamento de terceiros.
      </p>

      <h2>2. Dados coletados na candidatura</h2>
      <ul>
        <li>
          <strong>Nome completo e e-mail</strong>, para identificar a candidatura;
        </li>
        <li>
          <strong>Habilidades selecionadas</strong>, para registrar o perfil informado;
        </li>
        <li>
          <strong>Vaga escolhida, data e hora do envio</strong>, para registrar a candidatura e
          impedir mais de uma candidatura com o mesmo e-mail na mesma vaga.
        </li>
      </ul>

      <h2>3. Como os dados são usados</h2>
      <p>
        Os dados servem exclusivamente para registrar a candidatura. Eles não são enviados à empresa
        responsável pela vaga, não são vendidos nem compartilhados com terceiros e não são usados
        para enviar comunicações. A página da vaga exibe apenas o total de candidaturas, sem nenhum
        dado pessoal.
      </p>

      <h2>4. Armazenamento e exclusão</h2>
      <p>
        As informações ficam em banco de dados de acesso restrito à equipe do projeto e podem ser
        apagadas a qualquer momento, já que se trata de um ambiente acadêmico. A plataforma ainda
        não tem um canal de atendimento próprio: para pedir a exclusão antecipada dos seus dados,
        fale com um dos integrantes da equipe listados na página{" "}
        <Link className="font-semibold text-violet-700 hover:underline" href="/sobre">
          Sobre
        </Link>
        .
      </p>
    </>
  );
}
