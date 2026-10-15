import type { Metadata } from "next";
import Link from "next/link";
import AtualizadoEm from "../AtualizadoEm";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description: "Condições de uso do Leque de Vagas para pessoas candidatas e empresas.",
};

export default function Termos() {
  return (
    <>
      <h1>Termos de Uso</h1>
      <AtualizadoEm />
      <p>
        Estes termos regulam o uso do Leque de Vagas por pessoas candidatas e por empresas que
        publicam oportunidades. Ao navegar, publicar uma vaga ou enviar uma candidatura, você
        concorda com as condições abaixo.
      </p>

      <h2>1. Natureza do serviço</h2>
      <p>
        O Leque de Vagas é um <strong>projeto acadêmico</strong>. As empresas e vagas do catálogo
        são fictícias e servem para demonstrar o funcionamento da plataforma. Nenhuma candidatura
        enviada aqui é encaminhada a um processo seletivo real.
      </p>

      <h2>2. Publicação de vagas e perfis</h2>
      <p>
        Publicar vagas e editar perfis de empresa não exige login, e a plataforma não verifica a
        identidade de quem faz essas alterações. Por isso, nenhuma vaga ou perfil deve ser entendido
        como comunicação oficial da empresa citada. Quem publica uma vaga ou edita um perfil se
        compromete a:
      </p>
      <ul>
        <li>descrever a oportunidade com informações verdadeiras e linguagem respeitosa;</li>
        <li>não incluir dados pessoais de terceiros, links maliciosos ou conteúdo ofensivo;</li>
        <li>
          não usar a plataforma para divulgar cursos ou serviços pagos, nem para cobrar valores de
          pessoas candidatas.
        </li>
      </ul>
      <p>Vagas que descumpram estas regras podem ser arquivadas a qualquer momento.</p>

      <h2>3. Candidaturas</h2>
      <p>
        É permitida uma única candidatura por e-mail em cada vaga. Para testar a plataforma,
        recomendamos usar um endereço de teste. Os dados enviados seguem a{" "}
        <Link className="font-semibold text-violet-700 hover:underline" href="/privacidade">
          Política de Privacidade
        </Link>
        .
      </p>

      <h2>4. Disponibilidade</h2>
      <p>
        Por se tratar de um ambiente de estudo, o serviço pode ficar indisponível, ter seu
        funcionamento alterado ou ter seus dados apagados sem aviso prévio.
      </p>
    </>
  );
}
