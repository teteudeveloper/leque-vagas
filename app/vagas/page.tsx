import { Suspense } from "react";
import type { Metadata } from "next";
import { listarVagas } from "@/lib/api";
import NumerosDoCatalogo from "@/components/NumerosDoCatalogo";
import NumerosEsqueleto from "@/components/NumerosEsqueleto";
import ListaEsqueleto from "@/components/ListaEsqueleto";
import CardDeVaga from "@/components/CardDeVaga";

export const metadata: Metadata = { title: "Vagas", description: "Vagas de tecnologia para quem está migrando de carreira." };

export default function ListaDeVagas() { 
  return (
    <section>
      <div className="cabecalho-pagina">
        <div>
          <p className="eyebrow">Oportunidades</p>
          <h1>Vagas de tecnologia</h1>
        </div>
        <Suspense fallback={<NumerosEsqueleto />}>
          <NumerosDoCatalogo />
        </Suspense>
      </div>
      <Suspense fallback={<ListaEsqueleto />}>
        <ListagemDeVagas />
      </Suspense>
    </section>
  ); 
}

async function ListagemDeVagas() { 
  const vagas = await listarVagas(); 
  return (
    <div className="lista-vagas" style={{ display: 'grid', gap: '1rem', listStyle: 'none', padding: 0 }}>
      {vagas.map((vaga) => (
        <CardDeVaga key={vaga.id} vaga={vaga} />
      ))}
    </div>
  ); 
}
