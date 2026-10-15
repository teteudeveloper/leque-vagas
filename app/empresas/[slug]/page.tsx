import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Pencil } from "lucide-react";
import { Sobretitulo } from "@/components/compartilhados/CabecalhoDaPagina";
import { buttonVariants } from "@/components/ui/button";
import ListaDeVagas from "@/components/vagas/ListaDeVagas";
import { buscarEmpresa, listarEmpresas, listarVagas } from "@/lib/api";
import { plural, resumo } from "@/lib/texto";

type Props = { params: Promise<{ slug: string }> };

// A pasta é [slug], então a chave é `slug`. Mesma regra da página de vaga.
export async function generateStaticParams() {
  const empresas = await listarEmpresas();
  return empresas.map((empresa) => ({ slug: empresa.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const empresa = await buscarEmpresa(slug);
  if (!empresa) return { title: "Empresa não encontrada" };
  return { title: empresa.nome, description: resumo(empresa.sobre) };
}

export default async function PaginaDaEmpresa({ params }: Props) {
  const { slug } = await params;
  // As duas buscas não dependem uma da outra, então acontecem AO MESMO TEMPO.
  const [empresa, vagas] = await Promise.all([buscarEmpresa(slug), listarVagas()]);
  if (!empresa) notFound();

  // O filtro acontece no servidor: o navegador recebe só as vagas desta empresa.
  const vagasDaEmpresa = vagas.filter((vaga) => vaga.empresaSlug === empresa.slug);

  return (
    <section className="py-12 pb-24">
      <Link
        className="mb-12 inline-flex items-center gap-1.5 font-bold text-violet-700 hover:underline"
        href="/vagas"
      >
        <ArrowLeft aria-hidden="true" className="size-4" />
        Todas as vagas
      </Link>

      <div className="mb-10 flex flex-col items-start justify-between gap-6 sm:flex-row">
        <div className="max-w-2xl">
          <Sobretitulo>Empresa</Sobretitulo>
          <h1 className="text-4xl leading-tight font-black tracking-tight text-balance break-words text-slate-900 sm:text-6xl">
            {empresa.nome}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">{empresa.sobre}</p>
          <a
            className="mt-4 inline-flex items-center gap-1.5 font-semibold text-violet-700 hover:underline"
            href={empresa.site}
            target="_blank"
            rel="noopener noreferrer"
          >
            {empresa.site.replace(/^https?:\/\//, "").replace(/\/$/, "")}
            <ExternalLink aria-hidden="true" className="size-4" />
            <span className="sr-only">(abre em nova aba)</span>
          </a>
        </div>
        <Link
          className={buttonVariants({ variant: "secondary" })}
          href={`/empresas/${empresa.slug}/editar`}
        >
          <Pencil aria-hidden="true" className="mr-2 size-4" />
          Editar perfil
        </Link>
      </div>

      <h2 className="mb-4 text-xl font-bold text-slate-900">
        {plural(vagasDaEmpresa.length, "vaga aberta", "vagas abertas")}
      </h2>
      <ListaDeVagas
        vagas={vagasDaEmpresa}
        detalhe="local"
        vazio={`${empresa.nome} não tem vagas abertas no momento.`}
      />
    </section>
  );
}
