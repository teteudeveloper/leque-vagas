import type { ReactNode } from "react";
import { CircleAlert, CircleCheck } from "lucide-react";
import { cn } from "@/lib/utils";

// A mensagem geral do formulário (sucesso ou falha), anunciada a leitores de tela.
export default function AvisoDoFormulario({
  tipo,
  children,
  className,
}: {
  tipo: "sucesso" | "erro";
  children: ReactNode;
  className?: string;
}) {
  const Icone = tipo === "sucesso" ? CircleCheck : CircleAlert;

  return (
    <div
      role={tipo === "erro" ? "alert" : "status"}
      className={cn(
        "flex items-start gap-3 rounded-xl border px-4 py-3 text-sm",
        tipo === "sucesso"
          ? "border-emerald-200 bg-emerald-50 text-emerald-900"
          : "border-red-200 bg-red-50 text-red-900",
        className,
      )}
    >
      <Icone aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
      <div className="grid gap-1">{children}</div>
    </div>
  );
}
