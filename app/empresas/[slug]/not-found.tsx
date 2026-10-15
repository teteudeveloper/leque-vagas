import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import EstadoDaPagina from "@/components/compartilhados/EstadoDaPagina";

export const metadata: Metadata = { title: "Empresa não encontrada" };

export default function EmpresaNaoEncontrada() {
  return (
    <EstadoDaPagina
      titulo="Empresa não encontrada"
      descricao="Não há empresa cadastrada neste endereço. Confira o link ou acesse o perfil pela página de uma das vagas."
    >
      <Link className={buttonVariants()} href="/vagas">
        Ver todas as vagas
      </Link>
    </EstadoDaPagina>
  );
}
