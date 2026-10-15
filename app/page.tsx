import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Sobretitulo } from "@/components/compartilhados/CabecalhoDaPagina";
import NumerosDaPlataforma, {
  NumerosDaPlataformaEsqueleto,
} from "@/components/inicio/NumerosDaPlataforma";
import VagasEmDestaque from "@/components/inicio/VagasEmDestaque";
import { buttonVariants } from "@/components/ui/button";
import ListaEsqueleto from "@/components/vagas/ListaEsqueleto";
import { PASSOS, PRINCIPIOS } from "@/lib/conteudo";
import { cn } from "@/lib/utils";

export default function Inicio() {
  return (
    <>
      <section className="max-w-3xl pt-24 pb-16 sm:pt-32">
        <Sobretitulo>Empregabilidade em tecnologia</Sobretitulo>
        <h1 className="mb-6 text-5xl leading-[1.05] font-black tracking-tight text-balance text-slate-900 sm:text-6xl">
          Vagas de tecnologia para quem está mudando de carreira.
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-slate-600">
          O Leque de Vagas reúne vagas de tecnologia abertas a pessoas em transição de carreira.
          Cada vaga informa senioridade, formato de trabalho e se aceita iniciantes, e a candidatura
          é feita na própria página, sem criar conta.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link className={buttonVariants({ size: "lg" })} href="/vagas">
            Explorar vagas
          </Link>
          <Link className={buttonVariants({ variant: "secondary", size: "lg" })} href="/vagas/nova">
            Publicar uma vaga
          </Link>
        </div>
      </section>

      <section aria-label="A plataforma em números" className="pb-20">
        <Suspense fallback={<NumerosDaPlataformaEsqueleto />}>
          <NumerosDaPlataforma />
        </Suspense>
      </section>

      <section aria-labelledby="titulo-destaques" className="pb-20">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <Sobretitulo>Oportunidades</Sobretitulo>
            <h2
              id="titulo-destaques"
              className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl"
            >
              Vagas recentes, com prioridade para iniciantes
            </h2>
          </div>
          <Link
            className="inline-flex items-center gap-1.5 font-bold text-violet-700 hover:underline"
            href="/vagas"
          >
            Ver todas as vagas
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
        <Suspense fallback={<ListaEsqueleto />}>
          <VagasEmDestaque />
        </Suspense>
      </section>

      <section
        id="como-funciona"
        aria-labelledby="titulo-como-funciona"
        className="scroll-mt-8 pb-20"
      >
        <Sobretitulo>Como funciona</Sobretitulo>
        <h2
          id="titulo-como-funciona"
          className="mb-8 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl"
        >
          Da busca à candidatura em três passos
        </h2>
        <ol className="grid gap-6 sm:grid-cols-3">
          {PASSOS.map((passo, indice) => (
            <li key={passo.titulo} className="border-t-2 border-violet-600 pt-5">
              <span className="text-sm font-black text-violet-700">
                {String(indice + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 mb-2 text-lg font-bold text-slate-900">{passo.titulo}</h3>
              <p className="leading-relaxed text-slate-600">{passo.texto}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="titulo-principios" className="pb-20">
        <Sobretitulo>Nossos compromissos</Sobretitulo>
        <h2
          id="titulo-principios"
          className="mb-8 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl"
        >
          Transparência para quem procura e para quem contrata
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

      <section
        aria-labelledby="titulo-empresas"
        className="mb-24 flex flex-col items-start justify-between gap-6 rounded-2xl bg-violet-700 px-8 py-10 text-white sm:flex-row sm:items-center"
      >
        <div className="max-w-xl">
          <h2 id="titulo-empresas" className="text-2xl font-black tracking-tight sm:text-3xl">
            Sua empresa abre espaço para iniciantes?
          </h2>
          <p className="mt-2 leading-relaxed text-violet-100">
            Publique a vaga em poucos minutos, informe se ela aceita quem está começando e deixe
            claro o que o time espera de quem vai ocupá-la.
          </p>
        </div>
        <Link
          className={cn(
            buttonVariants({ size: "lg" }),
            "bg-white text-violet-700 hover:bg-violet-50",
          )}
          href="/vagas/nova"
        >
          Publicar uma vaga
        </Link>
      </section>
    </>
  );
}
