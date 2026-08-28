export const metadata = { title: "Sobre mim" };
export default function Sobre() {
  return (
    <article className="max-w-2xl py-20 sm:py-24">
      <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.12em] text-violet-700">
        Aula 01
      </p>
      <h1 className="mb-8 text-4xl font-black tracking-tight text-slate-900 sm:text-6xl">
        Sobre o projeto
      </h1>
      <p className="mb-5 text-lg leading-relaxed text-slate-600">
        Este projeto foi criado por uma pessoa estudante que está construindo sua jornada em
        tecnologia e quer aprender Next.js na prática.
      </p>
      <p className="text-lg leading-relaxed text-slate-600">
        O semestre será uma oportunidade para transformar conhecimento em um produto útil, acessível
        e feito em equipe.
      </p>
    </article>
  );
}
