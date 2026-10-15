// Listas fechadas usadas pelos formulários E pela validação. Ficam num lugar só
// para o <select> e o Zod nunca discordarem sobre o que é uma opção válida.

export const AREAS = [
  "Front-end",
  "Back-end",
  "Full-stack",
  "Mobile",
  "Dados",
  "Qualidade",
  "Design",
  "Produto",
] as const;

export const SENIORIDADES = ["Estágio", "Júnior", "Pleno", "Sênior"] as const;

export const HABILIDADES = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Node.js",
  "SQL",
  "Git",
] as const;

export const NAVEGACAO = [
  { href: "/", rotulo: "Início" },
  { href: "/vagas", rotulo: "Vagas" },
  { href: "/vagas/nova", rotulo: "Publicar vaga" },
  { href: "/sobre", rotulo: "Sobre" },
] as const;

export const EQUIPE = [
  "Matheus Ramalho",
  "Caio Graciano Nobrega",
  "Rodolfo Santiago",
  "João Victor Andrade",
] as const;
