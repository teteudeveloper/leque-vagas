"use client";
export default function ErrorVaga({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="flex min-h-96 flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-black tracking-tight text-slate-900">
        Não conseguimos carregar esta vaga
      </h1>
      <p className="mt-3 text-slate-600">Algo inesperado aconteceu. Tente novamente.</p>
      <button
        className="mt-5 inline-flex rounded-lg bg-violet-600 px-5 py-3 font-semibold text-white hover:bg-violet-700"
        onClick={() => reset()}
      >
        Tentar novamente
      </button>
    </section>
  );
}
