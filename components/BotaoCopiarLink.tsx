"use client";
import type { MouseEvent } from "react";
import { Button } from "@/components/ui/button";
export default function BotaoCopiarLink({ titulo }: { titulo: string }) {
  async function copiarLink(event: MouseEvent<HTMLButtonElement>) {
    const botao = event.currentTarget;
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const area = document.createElement("textarea");
      area.value = url;
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      area.remove();
    }
    botao.textContent = `Link de “${titulo}” copiado!`;
  }
  return (
    <Button variant="secondary" onClick={copiarLink}>
      Copiar link da vaga
    </Button>
  );
}
