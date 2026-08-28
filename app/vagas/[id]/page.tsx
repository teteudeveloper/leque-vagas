import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { vagas } from "@/data/vagas";
import BotaoCopiarLink from "@/components/BotaoCopiarLink";
import VagasParecidas from "@/components/VagasParecidas";

export const dynamic = "force-dynamic";

export default async function PaginaDaVaga({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const vaga = vagas.find((item) => item.id === id);
  console.log(`[servidor] Renderizando a vaga ${id}`);
  if (!vaga) notFound();
  return (
    <article className="py-8 pb-24">
      <Link className="mb-12 inline-block font-bold text-violet-700 hover:underline" href="/vagas">
        ← Todas as vagas
      </Link>
      <div className="grid gap-12 lg:grid-cols-[1.4fr_0.8fr] lg:gap-16">
        <div>
          <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.12em] text-violet-700">
            {vaga.area}
          </p>
          <h1 className="text-4xl font-black leading-tight tracking-tight text-slate-900 sm:text-6xl">
            {vaga.titulo}
          </h1>
          <p className="text-lg text-slate-500">
            {vaga.empresa} · {vaga.local}
          </p>
          <p className="my-9 max-w-2xl text-xl leading-relaxed text-slate-700">{vaga.descricao}</p>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-bold text-violet-700">
              {vaga.senioridade}
            </span>
            <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-bold text-violet-700">
              {vaga.local}
            </span>
            {vaga.aceitaIniciante && (
              <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-bold text-violet-700">
                Aceita iniciantes
              </span>
            )}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <BotaoCopiarLink titulo={vaga.titulo} />
            <Link
              className="inline-flex rounded-lg bg-violet-50 px-4 py-3 text-sm font-semibold text-violet-700 hover:bg-violet-100"
              href={`/empresas/${vaga.empresaSlug}`}
            >
              Ver vagas da empresa
            </Link>
          </div>
        </div>
        <Suspense
          fallback={
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900">Vagas parecidas</h2>
              <p className="text-sm text-slate-500">Buscando oportunidades semelhantes...</p>
            </section>
          }
        >
          <VagasParecidas area={vaga.area} id={vaga.id} />
        </Suspense>
      </div>
    </article>
  );
}
