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

export type Empresa = {
  slug: string;
  nome: string;
  sobre: string;
  site: string;
};
