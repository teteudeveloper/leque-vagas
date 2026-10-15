import empresasLocais from "@/dados/empresas.json";
import vagasLocais from "@/dados/vagas.json";
import type { Empresa, Vaga } from "@/lib/tipos";

// O catálogo: vagas e empresas publicadas como JSON na pasta dados/ do
// repositório e lidas pela rede. Quando a API própria ficar pronta, muda só
// a variável DADOS_URL.
const FONTE =
  process.env.DADOS_URL ??
  "https://raw.githubusercontent.com/teteudeveloper/leque-vagas/homolog/dados";

// O raw.githubusercontent.com já responde com max-age=300. Revalidar mais
// rápido que isso só geraria mais pedidos, não dados mais novos.
const CACHE_VAGAS = { next: { revalidate: 300, tags: ["vagas"] } };
const CACHE_EMPRESAS = { next: { revalidate: 3600, tags: ["empresas"] } };

// Se a fonte remota falhar (rede, 404, limite do GitHub), o site usa a cópia
// dos JSON que vai junto com o deploy, em vez de quebrar a página inteira.
async function buscarJson<T>(arquivo: string, cache: RequestInit, reserva: T): Promise<T> {
  try {
    const resposta = await fetch(`${FONTE}/${arquivo}`, cache);
    // Sem esta conferência, um 404 do GitHub devolve HTML e o erro vira
    // "Unexpected token '<'", que não diz nada sobre o problema real.
    if (!resposta.ok) throw new Error(`${arquivo} respondeu ${resposta.status}`);
    return (await resposta.json()) as T;
  } catch (erro) {
    console.error(`[catalogo] usando a cópia local de ${arquivo}:`, erro);
    return reserva;
  }
}

export function vagasDoCatalogo(): Promise<Vaga[]> {
  return buscarJson("vagas.json", CACHE_VAGAS, vagasLocais as Vaga[]);
}

export function empresasDoCatalogo(): Promise<Empresa[]> {
  return buscarJson("empresas.json", CACHE_EMPRESAS, empresasLocais as Empresa[]);
}
