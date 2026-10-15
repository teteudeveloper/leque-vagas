"use client";

import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { jaNavegouNoSite } from "@/components/compartilhados/historico";
import { Button } from "@/components/ui/button";

// Volta no histórico só quando a página anterior é do próprio site. Quem chegou
// por um link externo vai para a lista de vagas (ou para o início, se já estiver nela).
export default function BotaoVoltar({ destinoPadrao = "/vagas" }: { destinoPadrao?: string }) {
  const router = useRouter();
  const caminho = usePathname();

  function voltar() {
    if (jaNavegouNoSite()) router.back();
    else router.push(caminho === destinoPadrao ? "/" : destinoPadrao);
  }

  return (
    <Button variant="secondary" size="sm" onClick={voltar}>
      <ArrowLeft aria-hidden="true" className="mr-1.5 size-4" />
      Voltar
    </Button>
  );
}
