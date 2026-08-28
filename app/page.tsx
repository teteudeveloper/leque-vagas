import Link from "next/link";
export default function Home() {
  return (
    <section className="max-w-3xl py-24 sm:py-32">
      <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.12em] text-violet-700">
        Tecnologia para novos começos
      </p>
      <h1 className="mb-6 text-5xl font-black leading-[1.05] tracking-tight text-slate-900 sm:text-7xl">
        Encontre seu próximo passo.
      </h1>
      <p className="max-w-xl text-lg leading-relaxed text-slate-600">
        O Leque de Vagas reúne oportunidades de tecnologia acolhedoras para pessoas em transição de
        carreira.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          className="inline-flex rounded-lg bg-violet-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-violet-700"
          href="/vagas"
        >
          Ver vagas
        </Link>
        <Link
          className="inline-flex rounded-lg bg-violet-50 px-6 py-3 font-semibold text-violet-700 transition-colors hover:bg-violet-100"
          href="/sobre"
        >
          Sobre o projeto
        </Link>
      </div>
    </section>
  );
}
