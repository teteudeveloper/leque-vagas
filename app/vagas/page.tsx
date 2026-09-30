import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { listarVagas } from "@/lib/api";
import NumerosDoCatalogo from "@/components/NumerosDoCatalogo";
import NumerosEsqueleto from "@/components/NumerosEsqueleto";
import ListaEsqueleto from "@/components/ListaEsqueleto";

// Rota sem [param]: o título não depende de dado, então basta um objeto.
export const metadata: Metadata = { title: "Vagas", description: "Vagas de tecnologia para quem está migrando de carreira." };

// Repare: a página NÃO é async. Se fosse, ela esperaria a busca antes de
// mandar qualquer coisa, e nem o <h1> chegaria cedo. Quem busca são os
// filhos, cada um dentro do seu <Suspense> — um bloco não segura o outro.
export default function ListaDeVagas() { return <section><div className="cabecalho-pagina"><div><p className="eyebrow">Oportunidades</p><h1>Vagas de tecnologia</h1></div><Suspense fallback={<NumerosEsqueleto />}><NumerosDoCatalogo /></Suspense></div><Suspense fallback={<ListaEsqueleto />}><ListagemDeVagas /></Suspense></section>; }

// O await que saiu da página mora aqui. É este componente que espera —
// e por isso é ele que o <Suspense> de cima consegue cercar.
async function ListagemDeVagas() { const vagas = await listarVagas(); return <ul className="lista-vagas">{vagas.map((vaga) => <li key={vaga.id}><Link href={`/vagas/${vaga.id}`}><span><strong>{vaga.titulo}</strong><small>{vaga.empresa} · {vaga.area}</small></span><span className="seta">→</span></Link></li>)}</ul>; }
