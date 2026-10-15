// Só os tipos. Nenhum dado. Este arquivo não sabe de onde a vaga vem —
// e é por isso que ele continua valendo quando a fonte trocar de endereço.

export type Vaga = {
  id: string;
  titulo: string;
  empresa: string;
  empresaSlug: string;
  area: string;
  senioridade: string;
  local: string;
  aceitaIniciante: boolean;
  descricao: string;
};

// De onde a vaga veio: do catálogo (JSON) ou publicada pelo site (banco).
// Só as do site podem ser arquivadas.
export type OrigemDaVaga = "catalogo" | "site";

export type VagaListada = Vaga & { origem: OrigemDaVaga };

export type Empresa = {
  slug: string;
  nome: string;
  sobre: string;
  site: string;
};

export type Candidatura = {
  vagaId: string;
  nome: string;
  email: string;
  habilidades: string[];
};

// O "estado" que toda Server Action de formulário devolve para o useActionState.
export type Estado = {
  ok: boolean;
  erros: Record<string, string>;
  valores: Record<string, string>;
  mensagem?: string;
};

export const ESTADO_INICIAL: Estado = { ok: false, erros: {}, valores: {} };
