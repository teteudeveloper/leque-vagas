"use client";

import { useEffect, useRef } from "react";
import AvisoDoFormulario from "@/components/formularios/AvisoDoFormulario";
import BotaoDeEnviar from "@/components/formularios/BotaoDeEnviar";
import { useFormulario } from "@/components/formularios/useFormulario";
import Campo, { MensagemDeErro } from "@/components/formularios/Campo";
import { Input } from "@/components/ui/input";
import { HABILIDADES } from "@/lib/constantes";
import { enviarCandidatura } from "./acoes";

export default function FormularioDeCandidatura({ vagaId }: { vagaId: string }) {
  const { estado, pendente, envio, formulario } = useFormulario(enviarCandidatura);
  const sucesso = useRef<HTMLDivElement>(null);

  // O formulário some depois do envio: o foco vai para a mensagem de sucesso
  // em vez de cair no início da página.
  useEffect(() => {
    if (estado.ok) sucesso.current?.focus();
  }, [estado.ok]);

  if (estado.ok) {
    return (
      <div ref={sucesso} tabIndex={-1} className="outline-none">
        <AvisoDoFormulario tipo="sucesso">
          <strong className="font-bold">Candidatura registrada</strong>
          <span>{estado.mensagem}</span>
        </AvisoDoFormulario>
      </div>
    );
  }

  const marcadas = new Set(estado.valores.habilidades?.split(",") ?? []);
  const erroHabilidades = estado.erros.habilidades;

  return (
    <form {...formulario} className="grid max-w-xl gap-6">
      <input type="hidden" name="vagaId" value={vagaId} />

      {estado.mensagem && (
        <AvisoDoFormulario key={envio} tipo="erro">
          {estado.mensagem}
        </AvisoDoFormulario>
      )}

      <Campo nome="nome" rotulo="Nome completo" erro={estado.erros.nome}>
        {(controle) => (
          <Input {...controle} autoComplete="name" defaultValue={estado.valores.nome} />
        )}
      </Campo>

      <Campo
        nome="email"
        rotulo="E-mail"
        erro={estado.erros.email}
        dica="Usado apenas para identificar a sua candidatura."
      >
        {(controle) => (
          <Input
            {...controle}
            type="email"
            inputMode="email"
            autoComplete="email"
            defaultValue={estado.valores.email}
          />
        )}
      </Campo>

      <fieldset
        className="grid gap-3"
        aria-describedby={erroHabilidades ? "campo-habilidades-erro" : undefined}
      >
        <legend className="mb-3 text-sm font-semibold text-slate-800">
          Habilidades que você já pratica
        </legend>
        <div className="flex flex-wrap gap-2">
          {HABILIDADES.map((habilidade) => (
            <label
              key={habilidade}
              className="flex cursor-pointer items-center gap-2 rounded-full border border-slate-300 bg-white px-3.5 py-1.5 text-sm font-medium text-slate-700 transition-colors select-none hover:border-violet-400 has-checked:border-violet-600 has-checked:bg-violet-50 has-checked:text-violet-800 has-focus-visible:ring-2 has-focus-visible:ring-violet-500"
            >
              <input
                type="checkbox"
                name="habilidades"
                value={habilidade}
                defaultChecked={marcadas.has(habilidade)}
                className="size-4 accent-violet-600 focus-visible:outline-none"
              />
              {habilidade}
            </label>
          ))}
        </div>
        {erroHabilidades && (
          <MensagemDeErro id="campo-habilidades-erro">{erroHabilidades}</MensagemDeErro>
        )}
      </fieldset>

      <div>
        <BotaoDeEnviar pendente={pendente}>Enviar candidatura</BotaoDeEnviar>
      </div>
    </form>
  );
}
