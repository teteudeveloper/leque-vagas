"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { buscarEmpresa, guardarVaga } from "@/lib/api";
import { comErros, falhaAoSalvar } from "@/lib/acoes";
import { EsquemaDaVaga } from "@/lib/esquemas";
import { camposDe, porCampo, valoresDe } from "@/lib/formulario";
import type { Estado } from "@/lib/tipos";

export async function criarVaga(_estadoAnterior: Estado, dados: FormData): Promise<Estado> {
  const valores = valoresDe(dados);

  const analise = EsquemaDaVaga.safeParse(camposDe(dados));
  if (!analise.success) {
    return comErros(porCampo(analise.error), valores, "Confira os campos destacados.");
  }

  const { empresaSlug, ...vaga } = analise.data;

  let id: string;
  try {
    const empresa = await buscarEmpresa(empresaSlug);
    if (!empresa) {
      return comErros(
        { empresaSlug: "Essa empresa não está cadastrada." },
        valores,
        "Confira os campos destacados.",
      );
    }
    id = await guardarVaga({ ...vaga, empresaSlug, empresa: empresa.nome });
  } catch (erro) {
    return falhaAoSalvar("criar vaga", erro, valores);
  }

  revalidatePath("/vagas", "layout");
  revalidatePath("/sitemap.xml");
  revalidatePath(`/empresas/${empresaSlug}`);

  // redirect() lança um erro especial de propósito: fica FORA do try/catch.
  redirect(`/vagas/${id}`);
}
