"use client";

import { Button } from "@/components/ui/button";
import EstadoDaPagina from "@/components/compartilhados/EstadoDaPagina";

// Rede de segurança para qualquer rota sem error.tsx próprio.
export default function ErroGeral({
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <EstadoDaPagina
      titulo="Não conseguimos carregar esta página"
      descricao="Ocorreu uma falha ao processar sua solicitação. Tente novamente em alguns instantes."
    >
      <Button onClick={() => retry()}>Tentar novamente</Button>
    </EstadoDaPagina>
  );
}
