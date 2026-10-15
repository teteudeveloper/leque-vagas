import { Sobretitulo } from "@/components/compartilhados/CabecalhoDaPagina";

// Moldura dos documentos institucionais (termos e privacidade): mesma largura
// de leitura e a mesma tipografia para títulos, parágrafos e listas.
export default function InstitucionalLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <article className="max-w-2xl py-20 sm:py-24">
      <Sobretitulo>Institucional</Sobretitulo>
      <div className="space-y-5 text-lg leading-relaxed text-slate-600 [&_h1]:mb-3 [&_h1]:text-4xl [&_h1]:font-black [&_h1]:tracking-tight [&_h1]:text-slate-900 sm:[&_h1]:text-6xl [&_h2]:mt-12 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-slate-900 [&_li]:pl-1 [&_strong]:text-slate-800 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">
        {children}
      </div>
    </article>
  );
}
