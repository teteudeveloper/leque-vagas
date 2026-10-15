"use client";

import AvisoDoFormulario from "@/components/formularios/AvisoDoFormulario";
import BotaoDeEnviar from "@/components/formularios/BotaoDeEnviar";
import { useFormulario } from "@/components/formularios/useFormulario";
import Campo from "@/components/formularios/Campo";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { AREAS, SENIORIDADES } from "@/lib/constantes";
import type { Empresa } from "@/lib/tipos";
import { criarVaga } from "./acoes";

export default function FormularioDeVaga({ empresas }: { empresas: Empresa[] }) {
  const { estado, pendente, envio, formulario } = useFormulario(criarVaga);
  const { erros, valores } = estado;

  return (
    <form {...formulario} className="grid max-w-2xl gap-6">
      {estado.mensagem && (
        <AvisoDoFormulario key={envio} tipo="erro">
          {estado.mensagem}
        </AvisoDoFormulario>
      )}

      <Campo
        nome="titulo"
        rotulo="Título da vaga"
        erro={erros.titulo}
        dica="Ex.: Pessoa Desenvolvedora Front-end Júnior"
      >
        {(controle) => <Input {...controle} maxLength={120} defaultValue={valores.titulo} />}
      </Campo>

      <Campo nome="empresaSlug" rotulo="Empresa" erro={erros.empresaSlug}>
        {(controle) => (
          <Select {...controle} defaultValue={valores.empresaSlug ?? ""}>
            <option value="">Escolha a empresa…</option>
            {empresas.map((empresa) => (
              <option key={empresa.slug} value={empresa.slug}>
                {empresa.nome}
              </option>
            ))}
          </Select>
        )}
      </Campo>

      <div className="grid gap-6 sm:grid-cols-2">
        <Campo nome="area" rotulo="Área" erro={erros.area}>
          {(controle) => (
            <Select {...controle} defaultValue={valores.area ?? ""}>
              <option value="">Escolha a área…</option>
              {AREAS.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </Select>
          )}
        </Campo>

        <Campo nome="senioridade" rotulo="Senioridade" erro={erros.senioridade}>
          {(controle) => (
            <Select {...controle} defaultValue={valores.senioridade ?? ""}>
              <option value="">Escolha a senioridade…</option>
              {SENIORIDADES.map((senioridade) => (
                <option key={senioridade} value={senioridade}>
                  {senioridade}
                </option>
              ))}
            </Select>
          )}
        </Campo>
      </div>

      <Campo
        nome="local"
        rotulo="Formato e local"
        erro={erros.local}
        dica="Ex.: Remoto; Híbrido · Recife; Presencial · São Paulo"
      >
        {(controle) => <Input {...controle} maxLength={80} defaultValue={valores.local} />}
      </Campo>

      <Campo
        nome="descricao"
        rotulo="Descrição"
        erro={erros.descricao}
        dica="Entre 80 e 2.000 caracteres. Separe os blocos com uma linha em branco, comece itens de lista com “- ” e termine subtítulos com “:”."
      >
        {(controle) => (
          <Textarea
            {...controle}
            rows={10}
            maxLength={2000}
            placeholder={
              "Apresente o time e o contexto da vaga.\n\nO que você vai fazer:\n- Primeira atividade\n- Segunda atividade\n\nO que esperamos:\n- Primeiro requisito"
            }
            defaultValue={valores.descricao}
          />
        )}
      </Campo>

      <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 has-checked:border-violet-300 has-checked:bg-violet-50/60">
        <input
          type="checkbox"
          name="aceitaIniciante"
          defaultChecked={valores.aceitaIniciante === "on"}
          className="mt-1 size-4 accent-violet-600"
        />
        <span>
          <span className="block font-semibold text-slate-800">Aceita iniciantes</span>
          <span className="block text-sm text-slate-500">
            Marque se a vaga é aberta a pessoas em transição de carreira ou sem experiência
            anterior.
          </span>
        </span>
      </label>

      <div>
        <BotaoDeEnviar size="lg" enviando="Publicando…" pendente={pendente}>
          Publicar vaga
        </BotaoDeEnviar>
      </div>
    </form>
  );
}
