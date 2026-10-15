import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { listarVagas } from "@/lib/api";

const LIMITE = 4;

// A espera é de verdade: o await da busca mora aqui dentro, e é por isso que o
// <Suspense> da página de detalhe consegue cercar este componente.
export default async function VagasParecidas({ area, id }: { area: string; id: string }) {
  const vagas = await listarVagas();
  const parecidas = vagas.filter((vaga) => vaga.area === area && vaga.id !== id).slice(0, LIMITE);

  return (
    <Card className="h-max">
      <CardHeader>
        <CardTitle>Vagas parecidas</CardTitle>
      </CardHeader>
      <CardContent>
        {parecidas.length ? (
          <ul className="divide-y divide-violet-100">
            {parecidas.map((vaga) => (
              <li className="py-3 first:pt-0 last:pb-0" key={vaga.id}>
                <Link
                  className="font-semibold text-violet-700 hover:underline"
                  href={`/vagas/${vaga.id}`}
                >
                  {vaga.titulo}
                </Link>
                <small className="block text-slate-500">
                  {vaga.empresa} · {vaga.local}
                </small>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-slate-500">Ainda não encontramos outra vaga nesta área.</p>
        )}
      </CardContent>
    </Card>
  );
}

export function VagasParecidasEsqueleto() {
  return (
    <Card className="h-max" aria-busy="true">
      <CardHeader>
        <CardTitle>Vagas parecidas</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <span className="sr-only">Buscando oportunidades semelhantes…</span>
        {[1, 2].map((item) => (
          <div key={item} className="grid gap-2" aria-hidden="true">
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
