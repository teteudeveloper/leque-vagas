"use client";

import { useActionState } from "react";
import { enviarCandidatura } from "./acoes";
import BotaoDeEnviar from "@/components/BotaoDeEnviar";
import { ESTADO_INICIAL } from "@/lib/tipos";

export default function FormularioDeCandidatura({ vaga }: { vaga: { id: string; empresa: string } }) {
  const [estado, acaoDoForm] = useActionState(enviarCandidatura, ESTADO_INICIAL);

  if (estado.ok) {
    return (
      <div className="ok" role="status">
        <h3>Candidatura enviada</h3>
        <p>A {vaga.empresa} vai receber o seu contato.</p>
      </div>
    );
  }

  return (
    <form action={acaoDoForm} className="form-nova-vaga">
      <input type="hidden" name="vagaId" value={vaga.id} />

      <label>
        Nome completo
        <input name="nome" defaultValue={estado.valores.nome} />
      </label>
      {estado.erros.nome && <p className="erro">{estado.erros.nome}</p>}

      <label>
        E-mail
        <input name="email" type="email" defaultValue={estado.valores.email} />
      </label>
      {estado.erros.email && <p className="erro">{estado.erros.email}</p>}

      <fieldset>
        <legend>Habilidades</legend>
        {["HTML", "CSS", "JavaScript", "React", "SQL"].map((h) => (
          <label key={h} className="checkbox">
            <input type="checkbox" name="habilidades" value={h} /> {h}
          </label>
        ))}
      </fieldset>
      {estado.erros.habilidades && <p className="erro">{estado.erros.habilidades}</p>}

      <BotaoDeEnviar>Enviar candidatura</BotaoDeEnviar>
      {estado.mensagem && <p className="erro">{estado.mensagem}</p>}
    </form>
  );
}
