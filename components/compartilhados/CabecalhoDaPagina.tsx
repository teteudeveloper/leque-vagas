import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// O par "sobretítulo + título" que abre quase toda página do site.
export function Sobretitulo({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "mb-3 text-xs font-extrabold tracking-[0.12em] text-violet-700 uppercase",
        className,
      )}
    >
      {children}
    </p>
  );
}

export default function CabecalhoDaPagina({
  sobretitulo,
  titulo,
  descricao,
  acao,
}: {
  sobretitulo: ReactNode;
  titulo: ReactNode;
  descricao?: ReactNode;
  acao?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
      <div className="max-w-2xl">
        <Sobretitulo>{sobretitulo}</Sobretitulo>
        <h1 className="text-4xl font-black tracking-tight break-words text-slate-900 sm:text-6xl">
          {titulo}
        </h1>
        {descricao && <p className="mt-4 text-lg leading-relaxed text-slate-600">{descricao}</p>}
      </div>
      {acao}
    </div>
  );
}
