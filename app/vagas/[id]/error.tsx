"use client";
export default function ErrorVaga({ reset }: { error: Error & { digest?: string }; reset: () => void }) { return <section className="estado"><h1>Não conseguimos carregar esta vaga</h1><p>Algo inesperado aconteceu. Tente novamente.</p><button className="botao" onClick={() => reset()}>Tentar novamente</button></section>; }
