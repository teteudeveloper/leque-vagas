"use server";

import { revalidatePath } from "next/cache";
import { falhaAoSalvar } from "@/lib/acoes";
import { arquivarVaga, buscarVaga } from "@/lib/api";
import { EsquemaDeArquivar } from "@/lib/esquemas";
import { camposDe } from "@/lib/formulario";
import { ESTADO_INICIAL, type Estado } from "@/lib/tipos";

export async function arquivar(_estadoAnterior: Estado, dados: FormData): Promise<Estado> {
  const analise = EsquemaDeArquivar.safeParse(camposDe(dados));
  if (!analise.success) return { ...ESTADO_INICIAL, mensagem: "Vaga não informada." };

  const { id } = analise.data;
  try {
    const vaga = await buscarVaga(id);
    // false = já estava arquivada (ou é do catálogo): só revalidamos e seguimos.
    await arquivarVaga(id);
    if (vaga) revalidatePath(`/empresas/${vaga.empresaSlug}`);
  } catch (erro) {
    return {
      ...falhaAoSalvar("arquivar", erro, {}),
      mensagem: "Não foi possível arquivar agora.",
    };
  }

  // "layout" revalida a lista, os detalhes e as "Vagas parecidas" de todas as vagas.
  revalidatePath("/vagas", "layout");
  revalidatePath("/sitemap.xml");
  return { ...ESTADO_INICIAL, ok: true };
}
