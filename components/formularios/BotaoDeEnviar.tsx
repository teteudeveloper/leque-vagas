"use client";

import { useFormStatus } from "react-dom";
import { LoaderCircle } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";

// Fica desabilitado e troca o texto enquanto a Server Action do <form> pai roda.
// useFormStatus cobre forms com action direta; `pendente` cobre os que usam useFormulario.
export default function BotaoDeEnviar({
  children,
  enviando = "Enviando…",
  pendente = false,
  ...props
}: Omit<ButtonProps, "type"> & { enviando?: string; pendente?: boolean }) {
  const pending = useFormStatus().pending || pendente;

  return (
    <Button type="submit" disabled={pending} aria-busy={pending} {...props}>
      {pending && <LoaderCircle aria-hidden="true" className="mr-2 size-4 animate-spin" />}
      {pending ? enviando : children}
    </Button>
  );
}
