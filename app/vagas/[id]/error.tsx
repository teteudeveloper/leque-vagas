"use client";
export default function ErrorVaga({ reset }: { error: Error & { digest?: string }; reset: () => void }) { return <section className="estado"><h1>Não conseguimos carregar esta vaga</h1><p>A conexão com a nossa fonte de dados falhou. Isso costuma ser momentâneo.</p><button className="botao" type="button" onClick={() => reset()}>Tentar novamente</button></section>; }
