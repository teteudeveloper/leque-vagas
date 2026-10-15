import { cache } from "react";
import { empresasDoCatalogo, vagasDoCatalogo } from "@/lib/dados/catalogo";
import {
  bancoConfigurado,
  exigirBanco,
  lerDoBanco,
  prisma,
  violouUnicidade,
} from "@/lib/dados/banco";
import type { Candidatura, Empresa, Vaga, VagaListada } from "@/lib/tipos";

// A única porta de entrada para os dados. Nenhuma página sabe se uma vaga veio
// do JSON do catálogo ou do banco: elas só chamam as funções daqui.
//
// As leituras usam cache() do React: dentro de uma mesma renderização,
// generateMetadata, a página e os componentes filhos compartilham a mesma
// consulta. Fora da renderização (Server Actions), cache() não guarda nada,
// então quem acabou de gravar sempre lê dados novos.

// ---------------------------------------------------------------- empresas

export const listarEmpresas = cache(async (): Promise<Empresa[]> => {
  const [catalogo, editadas] = await Promise.all([
    empresasDoCatalogo(),
    lerDoBanco(() => prisma.empresa.findMany(), []),
  ]);

  // A empresa editada pelo site vence a do JSON.
  const porSlug = new Map<string, Empresa>();
  for (const empresa of catalogo) porSlug.set(empresa.slug, empresa);
  for (const { slug, nome, sobre, site } of editadas)
    porSlug.set(slug, { slug, nome, sobre, site });

  return [...porSlug.values()].sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
});

export async function buscarEmpresa(slug: string): Promise<Empresa | undefined> {
  const empresas = await listarEmpresas();
  return empresas.find((empresa) => empresa.slug === slug);
}

export async function guardarEmpresa(empresa: Empresa) {
  exigirBanco();
  const { slug, ...dados } = empresa;
  await prisma.empresa.upsert({ where: { slug }, update: dados, create: empresa });
}

// ------------------------------------------------------------------- vagas

export const listarVagas = cache(async (): Promise<VagaListada[]> => {
  const [catalogo, criadas, nomeAtual] = await Promise.all([
    vagasDoCatalogo(),
    lerDoBanco(
      () => prisma.vaga.findMany({ where: { arquivada: false }, orderBy: { criadaEm: "desc" } }),
      [],
    ),
    nomesDasEmpresas(),
  ]);

  return [
    ...criadas.map((vaga) => ({
      ...paraVaga(vaga),
      empresa: nomeAtual(vaga),
      origem: "site" as const,
    })),
    ...catalogo.map((vaga) => ({ ...vaga, empresa: nomeAtual(vaga), origem: "catalogo" as const })),
  ];
});

// Diferente da listagem, aqui uma falha do banco NÃO vira "vaga não existe":
// o erro sobe, o error.tsx aparece e o cache mantém a versão anterior da
// página, em vez de guardar um 404 falso para uma vaga que existe.
export const buscarVaga = cache(async (id: string): Promise<VagaListada | undefined> => {
  const [catalogo, nomeAtual] = await Promise.all([vagasDoCatalogo(), nomesDasEmpresas()]);

  const doCatalogo = catalogo.find((vaga) => vaga.id === id);
  if (doCatalogo) return { ...doCatalogo, empresa: nomeAtual(doCatalogo), origem: "catalogo" };

  if (!bancoConfigurado) return undefined;
  const registro = await prisma.vaga.findFirst({ where: { id, arquivada: false } });
  if (!registro) return undefined;
  return { ...paraVaga(registro), empresa: nomeAtual(registro), origem: "site" };
});

export async function guardarVaga(vaga: Omit<Vaga, "id">): Promise<string> {
  exigirBanco();
  const criada = await prisma.vaga.create({ data: vaga, select: { id: true } });
  return criada.id;
}

// Só vagas publicadas pelo site podem ser arquivadas: as do catálogo moram no
// JSON. Devolve false quando não havia o que arquivar.
export async function arquivarVaga(id: string): Promise<boolean> {
  exigirBanco();
  const { count } = await prisma.vaga.updateMany({
    where: { id, arquivada: false },
    data: { arquivada: true },
  });
  return count > 0;
}

// ----------------------------------------------------------- candidaturas

// null quando o banco não está disponível: a página simplesmente não mostra o número.
export function contarCandidaturas(vagaId: string): Promise<number | null> {
  return lerDoBanco(() => prisma.candidatura.count({ where: { vagaId } }), null);
}

export type ResultadoDaCandidatura = "enviada" | "repetida";

export async function guardarCandidatura(
  candidatura: Candidatura,
): Promise<ResultadoDaCandidatura> {
  exigirBanco();
  try {
    await prisma.candidatura.create({ data: candidatura });
    return "enviada";
  } catch (erro) {
    if (violouUnicidade(erro)) return "repetida";
    throw erro;
  }
}

// ------------------------------------------------------------------ apoio

// O nome exibido numa vaga acompanha o perfil da empresa, mesmo depois de editado.
async function nomesDasEmpresas() {
  const empresas = await listarEmpresas();
  const nomes = new Map(empresas.map((empresa) => [empresa.slug, empresa.nome]));
  return (vaga: Vaga) => nomes.get(vaga.empresaSlug) ?? vaga.empresa;
}

// O registro do banco tem campos de controle (criadaEm, arquivada) que não
// fazem parte de uma Vaga. Copiar campo a campo evita vazá-los para a página.
function paraVaga(registro: Vaga): Vaga {
  const { id, titulo, empresa, empresaSlug, area, senioridade, local, aceitaIniciante, descricao } =
    registro;
  return { id, titulo, empresa, empresaSlug, area, senioridade, local, aceitaIniciante, descricao };
}
