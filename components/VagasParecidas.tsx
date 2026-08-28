import Link from "next/link";
import { vagas } from "@/data/vagas";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
export default async function VagasParecidas({ area, id }: { area: string; id: string }) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const parecidas = vagas.filter((vaga) => vaga.area === area && vaga.id !== id);
  return (
    <Card>
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
