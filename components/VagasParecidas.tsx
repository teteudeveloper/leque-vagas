import Link from "next/link";
import { listarVagas } from "@/lib/api";
// A espera agora é de verdade: o await da busca mora aqui dentro, e é por isso
// que o <Suspense> da página de detalhe consegue cercar este componente.
export default async function VagasParecidas({ area, id }: { area: string; id: string }) { const vagas = await listarVagas(); const parecidas = vagas.filter((vaga) => vaga.area === area && vaga.id !== id); return <section className="parecidas"><h2>Vagas parecidas</h2>{parecidas.length ? <ul>{parecidas.map((vaga) => <li key={vaga.id}><Link href={`/vagas/${vaga.id}`}>{vaga.titulo}</Link><small>{vaga.empresa} · {vaga.local}</small></li>)}</ul> : <p>Ainda não encontramos outra vaga nesta área.</p>}</section>; }
