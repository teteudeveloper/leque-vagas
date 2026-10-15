"use server";

import { revalidatePath } from "next/cache";
import { buscarVaga, guardarCandidatura, type ResultadoDaCandidatura } from "@/lib/api";
import { comErros, falhaAoSalvar } from "@/lib/acoes";
import { EsquemaDaCandidatura } from "@/lib/esquemas";
import { camposDe, porCampo, valoresDe } from "@/lib/formulario";
import type { Estado } from "@/lib/tipos";

export async function enviarCandidatura(_estadoAnterior: Estado, dados: FormData): Promise<Estado> {
  const valores = valoresDe(dados);

  const analise = EsquemaDaCandidatura.safeParse({
    ...camposDe(dados),
    habilidades: dados.getAll("habilidades"),
  });
  if (!analise.success) {
    return comErros(porCampo(analise.error), valores, "Confira os campos destacados.");
  }

  // A vaga pode estar no banco ou no JSON do catálogo: buscarVaga olha os dois.
  let titulo: string;
  let resultado: ResultadoDaCandidatura;
  try {
    const vaga = await buscarVaga(analise.data.vagaId);
    if (!vaga) return comErros({}, valores, "Esta vaga não está mais disponível.");
    titulo = vaga.titulo;
    resultado = await guardarCandidatura(analise.data);
  } catch (erro) {
    return falhaAoSalvar("candidatura", erro, valores);
  }

  if (resultado === "repetida") {
    return comErros(
      { email: "Este e-mail já foi usado em uma candidatura para esta vaga." },
      valores,
      "Já existe uma candidatura para esta vaga com o e-mail informado.",
    );
  }

  revalidatePath(`/vagas/${analise.data.vagaId}`);

  return {
    ok: true,
    erros: {},
    valores: {},
    mensagem: `Sua candidatura para a vaga “${titulo}” foi registrada.`,
  };
}
