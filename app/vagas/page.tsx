import { Suspense } from "react";
import type { Metadata } from "next";
import CabecalhoDaPagina from "@/components/compartilhados/CabecalhoDaPagina";
import ListaDeVagas from "@/components/vagas/ListaDeVagas";
import ListaEsqueleto from "@/components/vagas/ListaEsqueleto";
import NumerosDoCatalogo from "@/components/vagas/NumerosDoCatalogo";
import NumerosEsqueleto from "@/components/vagas/NumerosEsqueleto";
import { listarVagas } from "@/lib/api";

export const metadata: Metadata = {
  title: "Vagas",
  description:
    "Vagas abertas em desenvolvimento, dados, qualidade e design, com destaque para as que aceitam pessoas iniciantes.",
};

// A página não é async: o título chega na hora, e quem busca são os filhos,
// cada um no seu <Suspense>, para um bloco não segurar o outro.
export default function PaginaDeVagas() {
  return (
    <section>
      <CabecalhoDaPagina
        sobretitulo="Oportunidades"
        titulo="Vagas de tecnologia"
        descricao="Posições em desenvolvimento, dados, qualidade e design. O selo “Aceita iniciantes” indica as vagas abertas a quem está mudando de carreira."
        acao={
          <Suspense fallback={<NumerosEsqueleto />}>
            <NumerosDoCatalogo />
          </Suspense>
        }
      />
      <Suspense fallback={<ListaEsqueleto />}>
        <Listagem />
      </Suspense>
    </section>
  );
}

async function Listagem() {
  const vagas = await listarVagas();
  return <ListaDeVagas vagas={vagas} />;
}
