// O fallback da lista. Cada item tem a altura de uma linha real da
// .lista-vagas, para a página não pular quando as vagas chegarem.
// Três itens bastam — ninguém olha o esqueleto tempo suficiente para contar.
export default function ListaEsqueleto() {
  return (
    <ul className="lista-vagas esqueleto" aria-hidden="true">
      {[1, 2, 3].map((item) => (
        <li key={item}>
          <div className="barra-esqueleto" />
          <div className="barra-esqueleto curta" />
        </li>
      ))}
    </ul>
  );
}
