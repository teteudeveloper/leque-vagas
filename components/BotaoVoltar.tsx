"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
export default function BotaoVoltar() {
  const router = useRouter();
  return (
    <Button variant="secondary" size="sm" onClick={() => router.back()}>
      ← Voltar
    </Button>
  );
}
