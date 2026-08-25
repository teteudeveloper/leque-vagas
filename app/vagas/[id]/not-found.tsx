import Link from "next/link";
export default function VagaNaoEncontrada() { return <section className="estado"><h1>Essa vaga não existe</h1><p>Talvez ela tenha sido encerrada ou o endereço esteja incorreto.</p><Link className="botao" href="/vagas">Ver todas as vagas</Link></section>; }
