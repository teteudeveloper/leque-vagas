import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Building2, Users } from "lucide-react";
import BotaoCopiarLink from "@/components/compartilhados/BotaoCopiarLink";
import { Sobretitulo } from "@/components/compartilhados/CabecalhoDaPagina";
import { buttonVariants } from "@/components/ui/button";
import DescricaoDaVaga from "@/components/vagas/DescricaoDaVaga";
import EtiquetasDaVaga from "@/components/vagas/EtiquetasDaVaga";
import SobreAEmpresa from "@/components/vagas/SobreAEmpresa";
import VagasParecidas, { VagasParecidasEsqueleto } from "@/components/vagas/VagasParecidas";
import { buscarEmpresa, buscarVaga, contarCandidaturas, listarVagas } from "@/lib/api";
import { plural, resumo } from "@/lib/texto";
import FormularioDeCandidatura from "./formulario";

// Desde o Next 15, params é uma Promise. É por isso que ele leva await.
type Props = { params: Promise<{ id: string }> };

// O Next não tem como adivinhar QUAIS ids existem: a pasta [id] atende
// infinitos endereços. Esta função lista os que já existem no build; os
// publicados depois são montados na primeira visita.
export async function generateStaticParams() {
  const vagas = await listarVagas();
  return vagas.map((vaga) => ({ id: String(vaga.id) }));
}

// O título da aba. Aqui NÃO se chama notFound(): quem decide isso é a página.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const vaga = await buscarVaga(id);
  if (!vaga) return { title: "Vaga não encontrada" };
  return {
    title: `${vaga.titulo} · ${vaga.empresa}`,
    description: resumo(vaga.descricao),
  };
}

export default async function PaginaDaVaga({ params }: Props) {
  const { id } = await params;
  const [vaga, candidaturas] = await Promise.all([buscarVaga(id), contarCandidaturas(id)]);
  // O id que não existe: notFound() interrompe a renderização e entrega o not-found.tsx.
  if (!vaga) notFound();
  const empresa = await buscarEmpresa(vaga.empresaSlug);

  return (
    <article>
      <div className="grid gap-12 lg:grid-cols-[1.4fr_0.8fr] lg:gap-16">
        <div className="min-w-0">
          <Sobretitulo>{vaga.area}</Sobretitulo>
          <h1 className="text-4xl leading-tight font-black tracking-tight text-balance break-words text-slate-900 sm:text-6xl">
            {vaga.titulo}
          </h1>
          <p className="mt-3 text-lg text-slate-500">
            {vaga.empresa} · {vaga.local}
          </p>

          <div className="mt-6">
            <EtiquetasDaVaga vaga={vaga} />
          </div>

          <section aria-labelledby="titulo-sobre-vaga" className="mt-10">
            <h2 id="titulo-sobre-vaga" className="sr-only">
              Sobre a vaga
            </h2>
            <DescricaoDaVaga texto={vaga.descricao} />
          </section>

          {candidaturas !== null && (
            <p className="mt-8 flex items-center gap-2 text-sm text-slate-500">
              <Users aria-hidden="true" className="size-4" />
              {candidaturas === 0
                ? "Nenhuma candidatura registrada até o momento."
                : `${plural(candidaturas, "pessoa já se candidatou", "pessoas já se candidataram")} a esta vaga.`}
            </p>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <BotaoCopiarLink titulo={vaga.titulo} />
            <Link
              className={buttonVariants({ variant: "secondary" })}
              href={`/empresas/${vaga.empresaSlug}`}
            >
              <Building2 aria-hidden="true" className="mr-2 size-4" />
              Ver perfil da empresa
            </Link>
          </div>

          <section
            aria-labelledby="titulo-candidatura"
            className="mt-14 border-t border-slate-200 pt-10"
          >
            <h2
              id="titulo-candidatura"
              className="text-2xl font-black tracking-tight text-slate-900"
            >
              Candidatar-se a esta vaga
            </h2>
            <p className="mt-2 mb-8 text-slate-600">
              {" "}
              Informe seu nome, seu e-mail e as habilidades que você já pratica. Não é preciso criar
              conta. Por ser um projeto acadêmico, a candidatura fica registrada na plataforma, mas
              não é encaminhada a nenhuma empresa. Saiba mais na{" "}
              <Link className="font-semibold text-violet-700 hover:underline" href="/privacidade">
                Política de Privacidade
              </Link>
              .
            </p>
            <FormularioDeCandidatura vagaId={vaga.id} />
          </section>
        </div>

        <aside className="grid h-max gap-6" aria-label="Mais informações">
          {empresa && <SobreAEmpresa empresa={empresa} />}
          <Suspense fallback={<VagasParecidasEsqueleto />}>
            <VagasParecidas area={vaga.area} id={vaga.id} />
          </Suspense>
        </aside>
      </div>
    </article>
  );
}
