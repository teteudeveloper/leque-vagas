"use client";

import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import EstadoDaPagina from "@/components/compartilhados/EstadoDaPagina";

export default function ErroDaVaga({
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <EstadoDaPagina
      titulo="Não conseguimos carregar esta vaga"
      descricao="Não foi possível carregar as informações desta vaga. Tente novamente em alguns instantes ou consulte as demais vagas abertas."
    >
      <Button onClick={() => retry()}>Tentar novamente</Button>
      <Link className={buttonVariants({ variant: "secondary" })} href="/vagas">
        Ver todas as vagas
      </Link>
    </EstadoDaPagina>
  );
}
