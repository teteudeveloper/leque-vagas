"use client";

import { Archive } from "lucide-react";
import { arquivar } from "@/app/vagas/acoes";
import BotaoDeEnviar from "@/components/formularios/BotaoDeEnviar";
import { useFormulario } from "@/components/formularios/useFormulario";

// Só aparece em vagas publicadas pelo site: as do catálogo moram no JSON.
export default function BotaoArquivar({ id, titulo }: { id: string; titulo: string }) {
  const { estado, pendente, envio, formulario } = useFormulario(arquivar);

  return (
    <form {...formulario} className="flex shrink-0 items-center gap-2">
      <input type="hidden" name="id" value={id} />
      {!estado.ok && estado.mensagem && (
        <span key={envio} role="alert" className="text-xs font-medium text-red-600">
          {estado.mensagem}
        </span>
      )}
      <BotaoDeEnviar
        variant="ghost"
        size="sm"
        enviando="Arquivando…"
        pendente={pendente}
        aria-label={`Arquivar a vaga ${titulo}`}
      >
        <Archive aria-hidden="true" className="size-4 sm:mr-1.5" />
        <span className="hidden sm:inline">Arquivar</span>
      </BotaoDeEnviar>
    </form>
  );
}
