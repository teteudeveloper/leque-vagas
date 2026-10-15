import Link from "next/link";
import CardDeVaga from "@/components/vagas/CardDeVaga";
import type { VagaListada } from "@/lib/tipos";

export default function ListaDeVagas({
  vagas,
  detalhe,
  gerenciavel,
  vazio = "Não há vagas abertas no momento.",
}: {
  vagas: VagaListada[];
  detalhe?: "empresa" | "local";
  // false esconde o botão de arquivar (ex.: vitrine da página inicial).
  gerenciavel?: boolean;
  vazio?: string;
}) {
  if (!vagas.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 px-6 py-12 text-center text-slate-600">
        <p>{vazio}</p>
        <Link
          className="mt-3 inline-block font-semibold text-violet-700 hover:underline"
          href="/vagas/nova"
        >
          Publicar uma vaga
        </Link>
      </div>
    );
  }

  return (
    <ul className="m-0 list-none p-0">
      {vagas.map((vaga) => (
        <CardDeVaga key={vaga.id} vaga={vaga} detalhe={detalhe} gerenciavel={gerenciavel} />
      ))}
    </ul>
  );
}
