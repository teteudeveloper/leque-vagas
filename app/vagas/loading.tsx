export default function LoadingVagas() {
  return (
    <section className="flex min-h-96 flex-col items-center justify-center text-slate-500">
      <div
        className="mb-4 h-9 w-9 animate-spin rounded-full border-4 border-slate-200 border-t-violet-600"
        aria-hidden="true"
      />
      <p>Preparando as vagas...</p>
    </section>
  );
}
