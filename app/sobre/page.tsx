import type { Metadata } from "next";
import Link from "next/link";
import { Sobretitulo } from "@/components/compartilhados/CabecalhoDaPagina";
import { buttonVariants } from "@/components/ui/button";
import { EQUIPE } from "@/lib/constantes";
import { PRINCIPIOS } from "@/lib/conteudo";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "Conheça a missão do Leque de Vagas, os compromissos da plataforma e a equipe responsável pelo projeto.",
};

export default function Sobre() {
  return (
    <article className="py-20 sm:py-24">
      <div className="max-w-2xl">
        <Sobretitulo>Sobre o Leque de Vagas</Sobretitulo>
        <h1 className="mb-8 text-4xl font-black tracking-tight text-slate-900 sm:text-6xl">
          A primeira vaga em tecnologia não deveria exigir experiência anterior.
        </h1>
        <div className="space-y-5 text-lg leading-relaxed text-slate-600">
          <p>
            Muita gente estuda programação, dados ou design por meses e esbarra no mesmo obstáculo:
            vagas “júnior” que pedem anos de experiência. O Leque de Vagas existe para encurtar essa
            distância, reunindo em um só lugar vagas que informam com clareza quando aceitam quem
            está começando.
          </p>
          <p>
            Para quem procura, cada vaga informa área, senioridade, formato de trabalho e se aceita
            iniciantes, e a candidatura é feita na própria página, sem cadastro. Para quem contrata,
            um formato de anúncio padronizado, com os mesmos campos obrigatórios para todas as
            empresas, o que torna as vagas comparáveis entre si.
          </p>
        </div>
      </div>

      <section aria-labelledby="titulo-compromissos" className="mt-20">
        <Sobretitulo>Compromissos</Sobretitulo>
        <h2
          id="titulo-compromissos"
          className="mb-8 text-3xl font-black tracking-tight text-slate-900"
        >
          O que você encontra em toda vaga
        </h2>
        <ul className="grid gap-4 sm:grid-cols-3">
          {PRINCIPIOS.map((principio) => (
            <li
              key={principio.titulo}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h3 className="mb-2 font-bold text-slate-900">{principio.titulo}</h3>
              <p className="text-sm leading-relaxed text-slate-600">{principio.texto}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="titulo-equipe" className="mt-20 max-w-3xl">
        <Sobretitulo>Equipe</Sobretitulo>
        <h2 id="titulo-equipe" className="mb-4 text-3xl font-black tracking-tight text-slate-900">
          Quem desenvolve a plataforma
        </h2>
        <p className="mb-8 max-w-2xl text-lg leading-relaxed text-slate-600">
          O Leque de Vagas é um projeto acadêmico construído com Next.js, React, TypeScript e
          PostgreSQL, desenvolvido em equipe ao longo da disciplina de desenvolvimento web.
        </p>
        <ul className="grid gap-3 sm:grid-cols-2">
          {EQUIPE.map((pessoa) => (
            <li
              key={pessoa}
              className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white px-5 py-4"
            >
              <span
                aria-hidden="true"
                className="flex size-10 shrink-0 items-center justify-center rounded-full bg-violet-50 text-sm font-black text-violet-700"
              >
                {iniciais(pessoa)}
              </span>
              <span className="font-semibold text-slate-800">{pessoa}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-20 flex flex-wrap gap-3">
        <Link className={buttonVariants({ size: "lg" })} href="/vagas">
          Explorar vagas
        </Link>
        <Link className={buttonVariants({ variant: "secondary", size: "lg" })} href="/vagas/nova">
          Publicar uma vaga
        </Link>
      </div>
    </article>
  );
}

function iniciais(nome: string) {
  const partes = nome.split(" ");
  return `${partes[0][0]}${partes.at(-1)?.[0] ?? ""}`;
}
