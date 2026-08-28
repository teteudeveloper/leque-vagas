import Link from "next/link";
export default function VagaNaoEncontrada() {
  return (
    <section className="flex min-h-96 flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-black tracking-tight text-slate-900">Essa vaga não existe</h1>
      <p className="mt-3 text-slate-600">
        Talvez ela tenha sido encerrada ou o endereço esteja incorreto.
      </p>
      <Link
        className="mt-5 inline-flex rounded-lg bg-violet-600 px-5 py-3 font-semibold text-white hover:bg-violet-700"
        href="/vagas"
      >
        Ver todas as vagas
      </Link>
    </section>
  );
}
