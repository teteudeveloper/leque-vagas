"use client";

import Link from "next/link";
import AvisoDoFormulario from "@/components/formularios/AvisoDoFormulario";
import BotaoDeEnviar from "@/components/formularios/BotaoDeEnviar";
import { useFormulario } from "@/components/formularios/useFormulario";
import Campo from "@/components/formularios/Campo";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Empresa } from "@/lib/tipos";
import { salvarEmpresa } from "./acoes";

export default function FormularioDaEmpresa({ empresa }: { empresa: Empresa }) {
  const acaoComSlug = salvarEmpresa.bind(null, empresa.slug);
  const { estado, pendente, envio, formulario } = useFormulario(acaoComSlug);
  const { erros, valores } = estado;

  return (
    <form {...formulario} className="grid max-w-2xl gap-6">
      {estado.mensagem && (
        <AvisoDoFormulario key={envio} tipo={estado.ok ? "sucesso" : "erro"}>
          <span>
            {estado.mensagem}{" "}
            {estado.ok && (
              <Link className="font-semibold underline" href={`/empresas/${empresa.slug}`}>
                Ver o perfil
              </Link>
            )}
          </span>
        </AvisoDoFormulario>
      )}

      <Campo nome="nome" rotulo="Nome da empresa" erro={erros.nome}>
        {(controle) => (
          <Input
            {...controle}
            autoComplete="organization"
            maxLength={80}
            defaultValue={valores.nome ?? empresa.nome}
          />
        )}
      </Campo>

      <Campo
        nome="site"
        rotulo="Site da empresa"
        erro={erros.site}
        dica="Endereço completo, com https://"
      >
        {(controle) => (
          <Input
            {...controle}
            type="url"
            inputMode="url"
            autoComplete="url"
            placeholder="https://"
            defaultValue={valores.site ?? empresa.site}
          />
        )}
      </Campo>

      <Campo
        nome="sobre"
        rotulo="Sobre a empresa"
        erro={erros.sobre}
        dica="Entre 40 e 600 caracteres."
      >
        {(controle) => (
          <Textarea
            {...controle}
            rows={5}
            maxLength={600}
            defaultValue={valores.sobre ?? empresa.sobre}
          />
        )}
      </Campo>

      <div className="flex flex-wrap gap-3">
        <BotaoDeEnviar enviando="Salvando…" pendente={pendente}>
          Salvar alterações
        </BotaoDeEnviar>
        <Link className={buttonVariants({ variant: "ghost" })} href={`/empresas/${empresa.slug}`}>
          Cancelar
        </Link>
      </div>
    </form>
  );
}
