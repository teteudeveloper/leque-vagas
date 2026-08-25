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
  return <article className="detalhe-vaga"><Link className="voltar-link" href="/vagas">← Todas as vagas</Link><div className="detalhe-grid"><div><p className="eyebrow">{vaga.area}</p><h1>{vaga.titulo}</h1><p className="empresa">{vaga.empresa} · {vaga.local}</p><p className="descricao">{vaga.descricao}</p><div className="tags"><span>{vaga.senioridade}</span><span>{vaga.local}</span>{vaga.aceitaIniciante && <span>Aceita iniciantes</span>}</div><div className="acoes"><BotaoCopiarLink titulo={vaga.titulo} /><Link className="botao-secundario" href={`/empresas/${vaga.empresaSlug}`}>Ver vagas da empresa</Link></div></div><Suspense fallback={<section className="parecidas"><h2>Vagas parecidas</h2><p>Buscando oportunidades semelhantes...</p></section>}><VagasParecidas area={vaga.area} id={vaga.id} /></Suspense></div></article>;
}
