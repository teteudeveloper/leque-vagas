import { listarVagas } from "@/lib/api";

// Quem espera é este componente, e o await mora AQUI DENTRO. Se a página
// fizesse o await e passasse o número por prop, ela já teria esperado — e o
// <Suspense> em volta não teria mais nada para fazer.
export default async function NumerosDoCatalogo() {
  const vagas = await listarVagas();
  const iniciantes = vagas.filter((vaga) => vaga.aceitaIniciante).length;

  return (
    <span className="contador">
      {vagas.length} vagas · {iniciantes} aceitam quem está começando
    </span>
  );
}
