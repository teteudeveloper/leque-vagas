import type { ReactNode } from "react";

// Tela centralizada para 404, erros e listas vazias.
export default function EstadoDaPagina({
  destaque,
  titulo,
  descricao,
  children,
}: {
  destaque?: ReactNode;
  titulo: string;
  descricao: string;
  children?: ReactNode;
}) {
  return (
    <section className="flex min-h-96 flex-col items-center justify-center py-16 text-center">
      {destaque && (
        <span className="mb-5 text-8xl leading-none font-black text-violet-700">{destaque}</span>
      )}
      <h1 className="text-3xl font-black tracking-tight text-balance text-slate-900 sm:text-4xl">
        {titulo}
      </h1>
      <p className="mt-3 max-w-md text-pretty text-slate-600">{descricao}</p>
      {children && <div className="mt-6 flex flex-wrap justify-center gap-3">{children}</div>}
    </section>
  );
}
