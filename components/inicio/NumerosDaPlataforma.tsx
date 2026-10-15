import { Skeleton } from "@/components/ui/skeleton";
import { listarEmpresas, listarVagas } from "@/lib/api";

// Números calculados a partir dos dados reais da plataforma, nunca fixos no texto.
export default async function NumerosDaPlataforma() {
  const [vagas, empresas] = await Promise.all([listarVagas(), listarEmpresas()]);
  const iniciantes = vagas.filter((vaga) => vaga.aceitaIniciante).length;
  const areas = new Set(vagas.map((vaga) => vaga.area)).size;

  return (
    <Grade
      itens={[
        { valor: vagas.length, rotulo: vagas.length === 1 ? "vaga aberta" : "vagas abertas" },
        {
          valor: iniciantes,
          rotulo: iniciantes === 1 ? "aceita iniciantes" : "aceitam iniciantes",
        },
        {
          valor: empresas.length,
          rotulo: empresas.length === 1 ? "empresa contratando" : "empresas contratando",
        },
        { valor: areas, rotulo: areas === 1 ? "área de atuação" : "áreas de atuação" },
      ]}
    />
  );
}

function Grade({ itens }: { itens: { valor: number; rotulo: string }[] }) {
  return (
    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 sm:grid-cols-4">
      {itens.map((item) => (
        <div key={item.rotulo} className="flex flex-col-reverse gap-1 bg-white px-6 py-5">
          <dt className="text-sm text-slate-500">{item.rotulo}</dt>
          <dd className="text-3xl font-black tracking-tight text-violet-700">{item.valor}</dd>
        </div>
      ))}
    </dl>
  );
}

export function NumerosDaPlataformaEsqueleto() {
  return (
    <div
      aria-hidden="true"
      className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 sm:grid-cols-4"
    >
      {[1, 2, 3, 4].map((item) => (
        <div key={item} className="grid gap-2 bg-white px-6 py-5">
          <Skeleton className="h-8 w-12" />
          <Skeleton className="h-4 w-24" />
        </div>
      ))}
    </div>
  );
}
