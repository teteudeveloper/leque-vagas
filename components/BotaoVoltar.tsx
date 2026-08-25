"use client";

import { useRouter } from "next/navigation";

export default function BotaoVoltar() {
  const router = useRouter();
  return <button type="button" className="botao-secundario" onClick={() => router.back()}>← Voltar</button>;
}
