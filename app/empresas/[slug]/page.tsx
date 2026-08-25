import Link from "next/link";
import { notFound } from "next/navigation";
import { vagas } from "@/data/vagas";
export default async function Empresa({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const vagasDaEmpresa = vagas.filter((vaga) => vaga.empresaSlug === slug);
  if (!vagasDaEmpresa.length) notFound();
  const empresa = vagasDaEmpresa[0].empresa;
  return (
    <section>
      <Link className="voltar-link" href="/vagas">
        ← Todas as vagas
      </Link>
      <p className="eyebrow">Empresa</p>
      <h1>{empresa}</h1>
      <p className="subtitulo">{vagasDaEmpresa.length} oportunidades abertas</p>
      <ul className="lista-vagas">
        {vagasDaEmpresa.map((vaga) => (
          <li key={vaga.id}>
            <Link href={`/vagas/${vaga.id}`}>
              <span>
                <strong>{vaga.titulo}</strong>
                <small>
                  {vaga.area} · {vaga.local}
                </small>
              </span>
              <span className="seta">→</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
