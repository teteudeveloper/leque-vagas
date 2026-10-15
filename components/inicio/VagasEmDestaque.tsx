import ListaDeVagas from "@/components/vagas/ListaDeVagas";
import { listarVagas } from "@/lib/api";

const QUANTIDADE = 4;

// As mais recentes primeiro (as publicadas pelo site vêm antes do catálogo),
// dando preferência às que aceitam quem está começando.
export default async function VagasEmDestaque() {
  const vagas = await listarVagas();
  const destaque = [
    ...vagas.filter((vaga) => vaga.aceitaIniciante),
    ...vagas.filter((vaga) => !vaga.aceitaIniciante),
  ].slice(0, QUANTIDADE);

  return <ListaDeVagas vagas={destaque} gerenciavel={false} />;
}
