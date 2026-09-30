"use server";

import { EsquemaDaCandidatura } from "@/lib/esquemas";
import { porCampo, valoresDe } from "@/lib/formulario";
import { buscarVaga, guardarCandidatura } from "@/lib/api";
import type { Estado } from "@/lib/tipos";

import { prisma } from "@/lib/prisma";

export async function enviarCandidatura(
  estadoAnterior: Estado,
  dados: FormData,
): Promise<Estado> {
  const valores = valoresDe(dados);

  const analise = EsquemaDaCandidatura.safeParse(Object.fromEntries(dados));
  if (!analise.success) {
    return { ok: false, erros: porCampo(analise.error), valores };
  }

  const habilidades = dados.getAll("habilidades").map(String);

  if (habilidades.length === 0) {
    return { ok: false, erros: { habilidades: "Escolha ao menos uma habilidade." }, valores };
  }

  const vaga = await prisma.vaga.findUnique({ where: { id: analise.data.vagaId } });
  if (!vaga) {
    return { ok: false, erros: { vagaId: "Essa vaga não está mais disponível." }, valores };
  }

  await prisma.candidatura.create({ data: {
    nome: analise.data.nome,
    email: analise.data.email,
    vagaId: analise.data.vagaId
  } });

  return { ok: true, erros: {}, valores: {}, mensagem: "Candidatura enviada!" };
}
