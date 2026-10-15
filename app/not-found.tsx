import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import EstadoDaPagina from "@/components/compartilhados/EstadoDaPagina";

export const metadata: Metadata = { title: "Página não encontrada" };

export default function NotFound() {
  return (
    <EstadoDaPagina
      destaque="404"
      titulo="Página não encontrada"
      descricao="O endereço que você tentou acessar não existe ou mudou de lugar."
    >
      <Link className={buttonVariants()} href="/">
        Voltar para o início
      </Link>
      <Link className={buttonVariants({ variant: "secondary" })} href="/vagas">
        Ver vagas
      </Link>
    </EstadoDaPagina>
  );
}
