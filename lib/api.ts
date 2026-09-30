import { prisma } from "@/lib/prisma";
import type { Vaga, Empresa, Candidatura } from "@/lib/tipos";

const FONTE = "https://raw.githubusercontent.com/teteudeveloper/leque-vagas/homolog/dados";
const CACHE_VAGAS = { next: { revalidate: 300, tags: ["vagas"] } };
const CACHE_EMPRESAS = { next: { revalidate: 3600, tags: ["empresas"] } };

async function buscarVagasPublicadas(): Promise<Vaga[]> {
  const resposta = await fetch(`${FONTE}/vagas.json`, CACHE_VAGAS);
  if (!resposta.ok) {
    throw new Error(`vagas.json respondeu ${resposta.status}`);
  }
  return resposta.json();
}

export async function listarVagas(): Promise<Vaga[]> {
  const publicadas = await buscarVagasPublicadas();

  const criadas = await prisma.vaga.findMany({
    where: { arquivada: false },
    orderBy: { criadaEm: "desc" },
  });

  return [...criadas, ...publicadas];
}

export async function buscarVaga(id: string): Promise<Vaga | undefined> {
  const vagas = await listarVagas();
  return vagas.find((vaga) => vaga.id === id);
}

async function buscarEmpresasPublicadas(): Promise<Empresa[]> {
  const resposta = await fetch(`${FONTE}/empresas.json`, CACHE_EMPRESAS);
  if (!resposta.ok) {
    throw new Error(`empresas.json respondeu ${resposta.status}`);
  }
  return resposta.json();
}

export async function listarEmpresas(): Promise<Empresa[]> {
  const publicadas = await buscarEmpresasPublicadas();
  return publicadas;
}

export async function buscarEmpresa(slug: string): Promise<Empresa | undefined> {
  const editada = await prisma.empresa.findUnique({ where: { slug } });
  if (editada) return editada;

  const publicadas = await listarEmpresas();
  return publicadas.find((empresa) => empresa.slug === slug);
}

export async function guardarVaga(vaga: Vaga) {
  await prisma.vaga.create({ data: vaga });
}

export async function arquivarVaga(id: string) {
  await prisma.vaga.update({
    where: { id },
    data:  { arquivada: true },
  });
}

export async function guardarCandidatura(candidatura: Candidatura) {
  // A candidatura é criada direto no acoes.ts, mas vou manter esta função para caso precisem
}

export async function guardarEmpresa(empresa: Empresa) {
  // O upsert é feito direto no acoes.ts
}
