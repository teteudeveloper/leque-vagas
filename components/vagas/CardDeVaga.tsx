import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BotaoArquivar from "@/components/vagas/BotaoArquivar";
import type { VagaListada } from "@/lib/tipos";

// Uma linha da lista de vagas. O "detalhe" decide o que aparece embaixo do
// título: na lista geral, a empresa; na página da empresa, o local.
export default function CardDeVaga({
  vaga,
  detalhe = "empresa",
  gerenciavel = true,
}: {
  vaga: VagaListada;
  detalhe?: "empresa" | "local";
  gerenciavel?: boolean;
}) {
  const subtitulo =
    detalhe === "empresa"
      ? `${vaga.empresa} · ${vaga.area} · ${vaga.local}`
      : `${vaga.area} · ${vaga.senioridade} · ${vaga.local}`;

  return (
    <li className="flex items-center gap-3 border-t border-slate-200 last:border-b">
      <Link
        className="group flex min-w-0 flex-1 items-center justify-between gap-5 px-1 py-5"
        href={`/vagas/${vaga.id}`}
      >
        <span className="min-w-0">
          <strong className="block font-bold text-slate-900 group-hover:text-violet-700">
            {vaga.titulo}
          </strong>
          <small className="block text-sm text-slate-500">{subtitulo}</small>
        </span>
        <span className="flex shrink-0 items-center gap-3">
          {vaga.aceitaIniciante && (
            <span className="hidden rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700 sm:inline">
              Aceita iniciantes
            </span>
          )}
          <ArrowRight
            aria-hidden="true"
            className="size-5 text-violet-700 transition-transform group-hover:translate-x-1"
          />
        </span>
      </Link>
      {gerenciavel && vaga.origem === "site" && <BotaoArquivar id={vaga.id} titulo={vaga.titulo} />}
    </li>
  );
}
