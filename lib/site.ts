// Endereço público do site, usado em metadados, sitemap e robots.
// Ordem: variável explícita → domínio de produção da Vercel → URL do deploy → local.
function urlDoSite(): string {
  const explicita = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicita) return explicita.replace(/\/$/, "");

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`;

  return "http://localhost:3000";
}

export const SITE = {
  nome: "Leque de Vagas",
  descricao:
    "Vagas de tecnologia para pessoas em transição de carreira, com requisitos claros, formato de trabalho informado e candidatura simples, sem cadastro.",
  url: urlDoSite(),
} as const;
