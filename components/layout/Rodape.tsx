import Link from "next/link";
import { EQUIPE } from "@/lib/constantes";

const COLUNAS = [
  {
    titulo: "Para pessoas candidatas",
    links: [
      { href: "/vagas", rotulo: "Vagas abertas" },
      { href: "/#como-funciona", rotulo: "Como funciona" },
    ],
  },
  {
    titulo: "Para empresas",
    links: [{ href: "/vagas/nova", rotulo: "Publicar uma vaga" }],
  },
  {
    titulo: "Institucional",
    links: [
      { href: "/sobre", rotulo: "Sobre o projeto" },
      { href: "/termos", rotulo: "Termos de Uso" },
      { href: "/privacidade", rotulo: "Política de Privacidade" },
    ],
  },
] as const;

export default function Rodape() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white text-sm text-slate-500">
      <div className="mx-auto grid w-[min(1080px,calc(100%-2.5rem))] gap-10 py-12 sm:grid-cols-[1.5fr_repeat(3,1fr)]">
        <div className="max-w-xs">
          <p className="text-base font-extrabold text-violet-700">Leque de Vagas</p>
          <p className="mt-2 leading-relaxed">
            Vagas de tecnologia para quem está começando, com requisitos claros e candidatura
            simples, sem cadastro.
          </p>
        </div>
        {COLUNAS.map((coluna) => (
          <nav key={coluna.titulo} aria-label={coluna.titulo}>
            <p className="mb-3 font-bold text-slate-900">{coluna.titulo}</p>
            <ul className="space-y-2">
              {coluna.links.map((link) => (
                <li key={link.rotulo}>
                  <Link className="hover:text-violet-700" href={link.href}>
                    {link.rotulo}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-slate-100">
        <p className="mx-auto w-[min(1080px,calc(100%-2.5rem))] py-5 text-xs leading-relaxed">
          © {new Date().getFullYear()} Leque de Vagas · Projeto acadêmico desenvolvido por{" "}
          {EQUIPE.slice(0, -1).join(", ")} e {EQUIPE.at(-1)}. Vagas e empresas do catálogo são
          fictícias.
        </p>
      </div>
    </footer>
  );
}
