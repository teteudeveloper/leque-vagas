import Link from "next/link";
import { vagas } from "@/data/vagas";
export default async function VagasParecidas({ area, id }: { area: string; id: string }) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const parecidas = vagas.filter((vaga) => vaga.area === area && vaga.id !== id);
  return (
    <section className="parecidas">
      <h2>Vagas parecidas</h2>
      {parecidas.length ? (
        <ul>
          {parecidas.map((vaga) => (
            <li key={vaga.id}>
              <Link href={`/vagas/${vaga.id}`}>{vaga.titulo}</Link>
              <small>
                {vaga.empresa} · {vaga.local}
              </small>
            </li>
          ))}
        </ul>
      ) : (
        <p>Ainda não encontramos outra vaga nesta área.</p>
      )}
    </section>
  );
}
