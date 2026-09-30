import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { listarEmpresas, buscarEmpresa, listarVagas } from "@/lib/api";

type Props = { params: Promise<{ slug: string }> };

// A pasta é [slug], então a chave é `slug`. Mesma regra da página de vaga.
export async function generateStaticParams() {
  const empresas = await listarEmpresas();
  return empresas.map((empresa) => ({ slug: empresa.slug }));
}

// Cada empresa com o seu título de aba. O layout completa com "| Leque de Vagas".
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const empresa = await buscarEmpresa(slug);
  if (!empresa) return { title: "Empresa não encontrada" };
  return { title: empresa.nome, description: empresa.sobre.slice(0, 150) };
}

export default async function Empresa({ params }: Props) {
  const { slug } = await params;
  // As duas buscas não dependem uma da outra, então acontecem AO MESMO TEMPO.
  // Dois await em linhas separadas seriam uma espera atrás da outra.
  const [empresa, vagas] = await Promise.all([buscarEmpresa(slug), listarVagas()]);
  if (!empresa) notFound();
  // O filtro acontece no servidor: o navegador recebe só as vagas desta empresa.
  const vagasDaEmpresa = vagas.filter((vaga) => vaga.empresaSlug === empresa.slug);
  return <section><Link className="voltar-link" href="/vagas">← Todas as vagas</Link><p className="eyebrow">Empresa</p><h1>{empresa.nome}</h1><p className="subtitulo">{vagasDaEmpresa.length} oportunidades abertas</p><ul className="lista-vagas">{vagasDaEmpresa.map((vaga) => <li key={vaga.id}><Link href={`/vagas/${vaga.id}`}><span><strong>{vaga.titulo}</strong><small>{vaga.area} · {vaga.local}</small></span><span className="seta">→</span></Link></li>)}</ul></section>;
}
