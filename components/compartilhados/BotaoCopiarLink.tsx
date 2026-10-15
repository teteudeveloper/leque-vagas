"use client";

import { useEffect, useState } from "react";
import { Check, CircleAlert, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type Situacao = "ocioso" | "copiado" | "erro";

const TEXTO: Record<Situacao, string> = {
  ocioso: "Copiar link da vaga",
  copiado: "Link copiado",
  erro: "Não foi possível copiar",
};

// Copia o endereço da página atual. Usa a Clipboard API e, se ela não existir
// (navegador antigo ou página fora de HTTPS), cai para o execCommand.
export default function BotaoCopiarLink({ titulo }: { titulo: string }) {
  const [situacao, setSituacao] = useState<Situacao>("ocioso");

  useEffect(() => {
    if (situacao === "ocioso") return;
    const timer = setTimeout(() => setSituacao("ocioso"), 2500);
    return () => clearTimeout(timer);
  }, [situacao]);

  async function copiarLink() {
    const url = window.location.href;
    let copiou = false;
    try {
      await navigator.clipboard.writeText(url);
      copiou = true;
    } catch {
      try {
        const area = document.createElement("textarea");
        area.value = url;
        area.setAttribute("readonly", "");
        area.style.position = "fixed";
        area.style.opacity = "0";
        document.body.appendChild(area);
        area.select();
        copiou = document.execCommand("copy");
        area.remove();
      } catch {
        copiou = false;
      }
    }
    setSituacao(copiou ? "copiado" : "erro");
  }

  const Icone = situacao === "copiado" ? Check : situacao === "erro" ? CircleAlert : Link2;

  return (
    <>
      <Button variant="secondary" onClick={copiarLink}>
        <Icone aria-hidden="true" className="mr-2 size-4" />
        {TEXTO[situacao]}
      </Button>
      <span role="status" className="sr-only">
        {situacao === "copiado" && `Link de “${titulo}” copiado.`}
        {situacao === "erro" && "Não foi possível copiar o link."}
      </span>
    </>
  );
}
