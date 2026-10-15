import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import EstadoDaPagina from "@/components/compartilhados/EstadoDaPagina";

export default function VagaNaoEncontrada() {
  return (
    <EstadoDaPagina
      titulo="Vaga não encontrada"
      descricao="A vaga pode ter sido arquivada ou o endereço pode estar incorreto."
    >
      <Link className={buttonVariants()} href="/vagas">
        Ver todas as vagas
      </Link>
    </EstadoDaPagina>
  );
}
