import { listarVagas } from "@/lib/api";
import { plural } from "@/lib/texto";

// Busca sozinho, dentro do próprio <Suspense>, para não segurar o título da página.
export default async function NumerosDoCatalogo() {
  const vagas = await listarVagas();
  const iniciantes = vagas.filter((vaga) => vaga.aceitaIniciante).length;

  return (
    <span className="rounded-full bg-violet-50 px-3 py-1 text-sm font-bold text-violet-700">
      {plural(vagas.length, "vaga", "vagas")} ·{" "}
      {iniciantes === 1 ? "1 aceita" : `${iniciantes} aceitam`} quem está começando
    </span>
  );
}
