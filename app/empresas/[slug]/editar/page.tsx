import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import CabecalhoDaPagina from "@/components/compartilhados/CabecalhoDaPagina";
import { buscarEmpresa } from "@/lib/api";
import FormularioDaEmpresa from "./formulario";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const empresa = await buscarEmpresa(slug);
  if (!empresa) return { title: "Empresa não encontrada" };
  return { title: `Editar ${empresa.nome}`, robots: { index: false } };
}

export default async function EditarEmpresa({ params }: Props) {
  const { slug } = await params;
  const empresa = await buscarEmpresa(slug);
  if (!empresa) notFound();

  return (
    <section className="py-12 pb-24">
      <Link
        className="mb-12 inline-flex items-center gap-1.5 font-bold text-violet-700 hover:underline"
        href={`/empresas/${empresa.slug}`}
      >
        <ArrowLeft aria-hidden="true" className="size-4" />
        Voltar para {empresa.nome}
      </Link>
      <CabecalhoDaPagina
        sobretitulo="Perfil da empresa"
        titulo={`Editar ${empresa.nome}`}
        descricao="As alterações são publicadas assim que você salva e aparecem no perfil e nas vagas da empresa. Todos os campos são obrigatórios."
      />
      <FormularioDaEmpresa empresa={empresa} />
    </section>
  );
}
