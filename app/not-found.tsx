import Link from "next/link";
export default function NotFound() {
  return (
    <section className="flex min-h-96 flex-col items-center justify-center text-center">
      <span className="text-8xl font-black leading-none text-violet-700">404</span>
      <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-900">
        Página não encontrada
      </h1>
      <p className="text-slate-600">O endereço que você tentou acessar não existe.</p>
      <Link
        className="mt-5 inline-flex rounded-lg bg-violet-600 px-5 py-3 font-semibold text-white hover:bg-violet-700"
        href="/"
      >
        Voltar para a home
      </Link>
    </section>
  );
}
