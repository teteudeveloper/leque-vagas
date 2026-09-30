import type { Vaga, Empresa, Candidatura } from "@/lib/tipos";

// A URL mora aqui, e só aqui. Quando a fonte trocar — a API do Spring Boot,
// um banco, o que for — é ESTA linha que muda, e nenhuma página fica sabendo.
// Aponta para a branch homolog porque é nela que este desafio é integrado.
const FONTE = "https://raw.githubusercontent.com/teteudeveloper/leque-vagas/homolog/dados";

// 300 segundos (5 minutos): o próprio raw.githubusercontent.com já responde
// com Cache-Control: max-age=300, então revalidar mais rápido do que isso não
// traria dado mais novo — só mais pedidos. Para quem procura vaga, 5 minutos
// de atraso não mudam nada, e o site não bate no GitHub a cada visita.
const CACHE_VAGAS = { next: { revalidate: 300, tags: ["vagas"] } };

// 3600 segundos (1 hora): o nome e o "sobre" de uma empresa mudam muito
// menos que uma vaga. Usar o mesmo número para os dois seria não ter feito
// a pergunta "quão fresco esse dado precisa estar?".
const CACHE_EMPRESAS = { next: { revalidate: 3600, tags: ["empresas"] } };

// ─── O DEPÓSITO ────────────────────────────────────────────────────────
const criadas: Vaga[] = [];
const arquivadas = new Set<string>();
const candidaturas: Candidatura[] = [];
const editadas = new Map<string, Empresa>();

// ─── LEITURA ───────────────────────────────────────────────────────────
async function buscarVagasPublicadas(): Promise<Vaga[]> {
  const resposta = await fetch(`${FONTE}/vagas.json`, CACHE_VAGAS);
  if (!resposta.ok) {
    throw new Error(`vagas.json respondeu ${resposta.status}`);
  }
  return resposta.json();
}

export async function listarVagas(): Promise<Vaga[]> {
  const publicadas = await buscarVagasPublicadas();

  return [...criadas, ...publicadas]
    .filter((vaga) => !arquivadas.has(vaga.id));
}

// Buscar UMA vaga é buscar todas e achar. As chamadas usam o MESMO fetch,
// com a mesma URL e as mesmas opções — o Next junta tudo num pedido só
// dentro do mesmo request (request memoization).
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
  return publicadas.map((e) => editadas.get(e.slug) ?? e);
}

export async function buscarEmpresa(slug: string): Promise<Empresa | undefined> {
  const empresas = await listarEmpresas();
  return empresas.find((empresa) => empresa.slug === slug);
}

// ─── ESCRITA ───────────────────────────────────────────────────────────
export function guardarVaga(vaga: Vaga) {
  criadas.unshift(vaga);
}

export function arquivarVaga(id: string) {
  arquivadas.add(id);
}

export function guardarCandidatura(candidatura: Candidatura) {
  candidaturas.push(candidatura);
}

export function guardarEmpresa(empresa: Empresa) {
  editadas.set(empresa.slug, empresa);
}
