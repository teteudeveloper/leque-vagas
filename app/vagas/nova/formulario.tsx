"use client";

import { useActionState } from "react";
import { criarVaga } from "./acoes";
import BotaoDeEnviar from "@/components/BotaoDeEnviar";
import { ESTADO_INICIAL } from "@/lib/tipos";
import type { Empresa } from "@/lib/tipos";

export default function FormularioDeVaga({ empresas }: { empresas: Empresa[] }) {
  const [estado, acaoDoForm] = useActionState(criarVaga, ESTADO_INICIAL);

  return (
    <form action={acaoDoForm} className="form-nova-vaga">
      <label>
        Título
        <input name="titulo" defaultValue={estado.valores.titulo} />
      </label>
      {estado.erros.titulo && <p className="erro">{estado.erros.titulo}</p>}

      <label>
        Empresa
        <select name="empresaSlug" defaultValue={estado.valores.empresaSlug ?? ""}>
          <option value="">Escolha…</option>
          {empresas.map((e) => (
            <option key={e.slug} value={e.slug}>{e.nome}</option>
          ))}
        </select>
      </label>
      {estado.erros.empresaSlug && <p className="erro">{estado.erros.empresaSlug}</p>}

      <label>
        Área
        <select name="area" defaultValue={estado.valores.area ?? ""}>
          <option value="">Escolha…</option>
          <option value="Front-end">Front-end</option>
          <option value="Back-end">Back-end</option>
          <option value="Full-stack">Full-stack</option>
          <option value="Mobile">Mobile</option>
          <option value="Dados">Dados</option>
          <option value="QA">QA</option>
          <option value="Design">Design</option>
          <option value="Produto">Produto</option>
        </select>
      </label>
      {estado.erros.area && <p className="erro">{estado.erros.area}</p>}
      
      <label>
        Senioridade
        <select name="senioridade" defaultValue={estado.valores.senioridade ?? ""}>
          <option value="">Escolha…</option>
          <option value="Júnior">Júnior</option>
          <option value="Pleno">Pleno</option>
          <option value="Sênior">Sênior</option>
          <option value="Estágio">Estágio</option>
        </select>
      </label>
      {estado.erros.senioridade && <p className="erro">{estado.erros.senioridade}</p>}

      <label>
        Local
        <input name="local" defaultValue={estado.valores.local} />
      </label>
      {estado.erros.local && <p className="erro">{estado.erros.local}</p>}

      <label>
        Descrição
        <textarea name="descricao" defaultValue={estado.valores.descricao} />
      </label>
      {estado.erros.descricao && <p className="erro">{estado.erros.descricao}</p>}

      <label className="checkbox">
        <input type="checkbox" name="aceitaIniciante" defaultChecked={estado.valores.aceitaIniciante === "on"} />
        Aceita quem está começando
      </label>

      <BotaoDeEnviar enviando="Publicando…">Publicar vaga</BotaoDeEnviar>
    </form>
  );
}
