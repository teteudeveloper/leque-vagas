"use server";

import { revalidatePath } from "next/cache";
import { buscarEmpresa, guardarEmpresa } from "@/lib/api";
import { comErros, falhaAoSalvar } from "@/lib/acoes";
import { EsquemaDaEmpresa } from "@/lib/esquemas";
import { camposDe, porCampo, valoresDe } from "@/lib/formulario";
import type { Estado } from "@/lib/tipos";

// O slug chega "pré-preenchido" pelo .bind() no formulário, não pelo FormData.
export async function salvarEmpresa(
  slug: string,
  _estadoAnterior: Estado,
  dados: FormData,
): Promise<Estado> {
  const valores = valoresDe(dados);

  const analise = EsquemaDaEmpresa.safeParse(camposDe(dados));
  if (!analise.success) {
    return comErros(porCampo(analise.error), valores, "Confira os campos destacados.");
  }

  try {
    // Só empresas que já existem (no catálogo ou no banco) podem ser editadas.
    if (!(await buscarEmpresa(slug))) {
      return comErros({}, valores, "Essa empresa não está cadastrada.");
    }
    await guardarEmpresa({ slug, ...analise.data });
  } catch (erro) {
    return falhaAoSalvar("salvar empresa", erro, valores);
  }

  // O nome da empresa aparece nas listas e nos detalhes das vagas também.
  revalidatePath("/", "layout");

  return {
    ok: true,
    erros: {},
    valores: analise.data,
    mensagem: "Perfil atualizado. As alterações já aparecem no perfil e nas vagas da empresa.",
  };
}
