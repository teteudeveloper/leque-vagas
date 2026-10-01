import type { Metadata } from "next";
import { listarEmpresas } from "@/lib/api";
import FormularioDeVaga from "./formulario";

export const metadata: Metadata = { title: "Publicar vaga · Leque de Vagas" };

export default async function PublicarVaga() {
  const empresas = await listarEmpresas();

  return (
    <section>
      <div className="cabecalho-pagina">
        <div>
          <p className="eyebrow">Nova oportunidade</p>
          <h1>Publicar uma vaga</h1>
        </div>
      </div>
      <FormularioDeVaga empresas={empresas} />
    </section>
  );
}
