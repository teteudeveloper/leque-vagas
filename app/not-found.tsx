import Link from "next/link";
export default function NotFound() {
  return (
    <section className="estado">
      <span className="numero">404</span>
      <h1>Página não encontrada</h1>
      <p>O endereço que você tentou acessar não existe.</p>
      <Link className="botao" href="/">
        Voltar para a home
      </Link>
    </section>
  );
}
