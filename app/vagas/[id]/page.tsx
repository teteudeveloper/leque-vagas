import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { listarVagas, buscarVaga } from "@/lib/api";
import BotaoCopiarLink from "@/components/BotaoCopiarLink";
import VagasParecidas from "@/components/VagasParecidas";
import FormularioDeCandidatura from "./formulario";

// Desde o Next 15, params é uma Promise. É por isso que ele leva await.
type Props = { params: Promise<{ id: string }> };

// O Next não tem como adivinhar QUAIS ids existem — a pasta [id] atende
// infinitos endereços. Esta função conta. Ela roda uma vez, no build.
// A chave tem que se chamar `id`, igual à pasta, e o valor tem que ser texto.
export async function generateStaticParams() {
  const vagas = await listarVagas();
  return vagas.map((vaga) => ({ id: String(vaga.id) }));
}

// O título da aba. Aqui NÃO se chama notFound(): quem decide isso é a página.
// O layout completa com o template "%s | Leque de Vagas".
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const vaga = await buscarVaga(id);
  if (!vaga) return { title: "Vaga não encontrada" };
  return { title: `${vaga.titulo} · ${vaga.empresa}`, description: vaga.descricao.slice(0, 150) };
}

export default async function PaginaDaVaga({ params }: Props) {
  const { id } = await params;
  const vaga = await buscarVaga(id);
  // O id que não existe: notFound() interrompe a renderização e entrega o not-found.tsx.
  if (!vaga) notFound();
  return (
    <article className="detalhe-vaga">
      <Link className="voltar-link" href="/vagas">← Todas as vagas</Link>
      <div className="detalhe-grid">
        <div>
          <p className="eyebrow">{vaga.area}</p>
          <h1>{vaga.titulo}</h1>
          <p className="empresa">{vaga.empresa} · {vaga.local}</p>
          <p className="descricao">{vaga.descricao}</p>
          <div className="tags">
            <span>{vaga.senioridade}</span>
            <span>{vaga.local}</span>
            {vaga.aceitaIniciante && <span>Aceita iniciantes</span>}
          </div>
          <div className="acoes">
            <BotaoCopiarLink titulo={vaga.titulo} />
            <Link className="botao-secundario" href={`/empresas/${vaga.empresaSlug}`}>Ver vagas da empresa</Link>
          </div>
          <section className="candidatura-section" style={{ marginTop: '2rem', borderTop: '1px solid var(--border)', paddingTop: '2rem' }}>
            <h2>Candidatar-se a esta vaga</h2>
            <FormularioDeCandidatura vaga={vaga} />
          </section>
        </div>
        <Suspense fallback={<section className="parecidas"><h2>Vagas parecidas</h2><p>Buscando oportunidades semelhantes...</p></section>}>
          <VagasParecidas area={vaga.area} id={vaga.id} />
        </Suspense>
      </div>
    </article>
  );
}
