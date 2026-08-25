export type Vaga = { id: string; titulo: string; empresa: string; empresaSlug: string; area: string; senioridade: string; local: string; aceitaIniciante: boolean; descricao: string };

export const vagas: Vaga[] = [
  { id: "1", titulo: "Pessoa Desenvolvedora Front-end Júnior", empresa: "Aurora Tech", empresaSlug: "aurora-tech", area: "Front-end", senioridade: "Júnior", local: "Remoto", aceitaIniciante: true, descricao: "Trabalhar com React e Next.js num time de produto." },
  { id: "2", titulo: "Pessoa Analista de Dados", empresa: "Aurora Tech", empresaSlug: "aurora-tech", area: "Dados", senioridade: "Pleno", local: "Híbrido · Recife", aceitaIniciante: true, descricao: "Transformar dados de produto em decisões claras para o negócio." },
  { id: "3", titulo: "Pessoa Desenvolvedora Back-end", empresa: "Nuvem Norte", empresaSlug: "nuvem-norte", area: "Back-end", senioridade: "Júnior", local: "Remoto", aceitaIniciante: true, descricao: "Construir APIs em Node.js com acompanhamento de pessoas experientes." },
  { id: "4", titulo: "Pessoa Engenheira de QA", empresa: "Nuvem Norte", empresaSlug: "nuvem-norte", area: "Qualidade", senioridade: "Pleno", local: "Híbrido · Fortaleza", aceitaIniciante: false, descricao: "Criar cenários de teste e ajudar o time a entregar software confiável." },
  { id: "5", titulo: "Pessoa Desenvolvedora Mobile", empresa: "Maré Digital", empresaSlug: "mare-digital", area: "Mobile", senioridade: "Júnior", local: "Remoto", aceitaIniciante: true, descricao: "Participar da evolução de um aplicativo usado por milhares de pessoas." },
  { id: "6", titulo: "Pessoa Product Designer", empresa: "Maré Digital", empresaSlug: "mare-digital", area: "Design", senioridade: "Pleno", local: "Remoto", aceitaIniciante: false, descricao: "Desenhar experiências acessíveis em parceria com produto e engenharia." },
];
