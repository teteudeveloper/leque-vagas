import Link from "next/link";
import { notFound } from "next/navigation";
import { vagas } from "@/data/vagas";
export default async function Empresa({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const vagasDaEmpresa = vagas.filter((vaga) => vaga.empresaSlug === slug);
  if (!vagasDaEmpresa.length) notFound();
  const empresa = vagasDaEmpresa[0].empresa;
  return (
    <section className="py-12 pb-24">
      <Link className="mb-12 inline-block font-bold text-violet-700 hover:underline" href="/vagas">
        ← Todas as vagas
      </Link>
      <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.12em] text-violet-700">
        Empresa
      </p>
      <h1 className="text-5xl font-black tracking-tight text-slate-900">{empresa}</h1>
      <p className="mb-8 text-slate-500">{vagasDaEmpresa.length} oportunidades abertas</p>
      <ul className="m-0 list-none p-0">
        {vagasDaEmpresa.map((vaga) => (
          <li className="border-t border-slate-200 last:border-b" key={vaga.id}>
            <Link
              className="group flex items-center justify-between gap-5 px-1 py-5"
              href={`/vagas/${vaga.id}`}
            >
              <span>
                <strong className="block font-bold text-slate-900 group-hover:text-violet-700">
                  {vaga.titulo}
                </strong>
                <small className="block text-slate-500">
                  {vaga.area} · {vaga.local}
                </small>
              </span>
              <span className="text-xl text-violet-700">→</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
