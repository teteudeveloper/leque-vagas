import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buscarEmpresa } from "@/lib/api";
import FormularioDaEmpresa from "./formulario";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const empresa = await buscarEmpresa(slug);
  if (!empresa) return { title: "Empresa não encontrada" };
  return { title: `Editar ${empresa.nome} · Leque de Vagas` };
}

export default async function EditarEmpresa({ params }: Props) {
  const { slug } = await params;
  const empresa = await buscarEmpresa(slug);
  if (!empresa) notFound();

  return (
    <section>
      <div className="cabecalho-pagina">
        <div>
          <p className="eyebrow">Configurações</p>
          <h1>Editar perfil da empresa</h1>
        </div>
      </div>
      <FormularioDaEmpresa empresa={empresa} />
    </section>
  );
}
