// O fallback dos números. Mesma classe, mesma altura, mesmo lugar — para o
// cabeçalho não se mexer no instante em que o número chega.
export default function NumerosEsqueleto() {
  return (
    <span className="contador esqueleto" aria-hidden="true">
      &nbsp;
    </span>
  );
}
