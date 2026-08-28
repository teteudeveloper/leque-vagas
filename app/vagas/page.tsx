import Link from "next/link";
import { vagas } from "@/data/vagas";
export default function ListaDeVagas() {
  return (
    <section>
      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.12em] text-violet-700">
            Oportunidades
          </p>
          <h1 className="mb-0 text-4xl font-black tracking-tight text-slate-900 sm:text-6xl">
            Vagas de tecnologia
          </h1>
        </div>
        <span className="rounded-full bg-violet-50 px-3 py-1 text-sm font-bold text-violet-700">
          {vagas.length} oportunidades
        </span>
      </div>
      <ul className="m-0 list-none p-0">
        {vagas.map((vaga) => (
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
                  {vaga.empresa} · {vaga.area}
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
