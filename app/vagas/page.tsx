import Link from "next/link";
import { vagas } from "@/data/vagas";
export default function ListaDeVagas() { return <section><div className="cabecalho-pagina"><div><p className="eyebrow">Oportunidades</p><h1>Vagas de tecnologia</h1></div><span className="contador">{vagas.length} oportunidades</span></div><ul className="lista-vagas">{vagas.map((vaga) => <li key={vaga.id}><Link href={`/vagas/${vaga.id}`}><span><strong>{vaga.titulo}</strong><small>{vaga.empresa} · {vaga.area}</small></span><span className="seta">→</span></Link></li>)}</ul></section>; }
