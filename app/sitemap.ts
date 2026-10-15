import type { MetadataRoute } from "next";
import { listarEmpresas, listarVagas } from "@/lib/api";
import { SITE } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [vagas, empresas] = await Promise.all([listarVagas(), listarEmpresas()]);
  const fixas = ["", "/vagas", "/vagas/nova", "/sobre", "/termos", "/privacidade"];

  return [
    ...fixas.map((caminho) => ({ url: `${SITE.url}${caminho}` })),
    ...vagas.map((vaga) => ({ url: `${SITE.url}/vagas/${vaga.id}` })),
    ...empresas.map((empresa) => ({ url: `${SITE.url}/empresas/${empresa.slug}` })),
  ];
}
