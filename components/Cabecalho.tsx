import MenuLink from "@/components/MenuLink";
import Link from "next/link";

export default function Cabecalho() {
  return (
    <header className="cabecalho">
      <div className="container cabecalho-conteudo">
        <Link className="marca" href="/">
          Leque de Vagas
        </Link>
        <nav aria-label="Navegação principal">
          <MenuLink href="/">Início</MenuLink>
          <MenuLink href="/vagas">Vagas</MenuLink>
          <MenuLink href="/termos">Termos</MenuLink>
          <MenuLink href="/privacidade">Privacidade</MenuLink>
        </nav>
      </div>
    </header>
  );
}
