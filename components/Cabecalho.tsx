import Link from "next/link";
import MenuLink from "@/components/MenuLink";

export default function Cabecalho() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex min-h-20 w-[min(1080px,calc(100%-2.5rem))] flex-col items-start justify-between gap-3 sm:flex-row sm:items-center sm:gap-6">
        <Link className="text-xl font-extrabold text-violet-700" href="/">
          Leque de Vagas
        </Link>
        <nav
          aria-label="Navegação principal"
          className="flex w-full gap-4 overflow-x-auto text-sm text-slate-600 sm:w-auto sm:gap-6"
        >
          <MenuLink href="/">Início</MenuLink>
          <MenuLink href="/vagas">Vagas</MenuLink>
          <MenuLink href="/termos">Termos</MenuLink>
          <MenuLink href="/privacidade">Privacidade</MenuLink>
        </nav>
      </div>
    </header>
  );
}
