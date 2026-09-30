// Agora há uma rede no caminho, e o carregamento passa a ter trabalho.
// A regra: o esqueleto tem mais ou menos a altura do conteúdo real, com as
// mesmas classes da página de detalhe, para nada pular quando o dado chega.
export default function CarregandoVaga() {
  return (
    <article className="detalhe-vaga" aria-busy="true">
      <div className="barra-esqueleto voltar" />
      <div className="detalhe-grid">
        <div>
          <div className="barra-esqueleto eyebrow-esqueleto" />
          <div className="barra-esqueleto titulo" />
          <div className="barra-esqueleto titulo curta" />
          <div className="barra-esqueleto" />
          <div className="barra-esqueleto texto" />
          <div className="barra-esqueleto texto curta" />
          <div className="tags">
            <div className="barra-esqueleto pilula" />
            <div className="barra-esqueleto pilula" />
          </div>
        </div>
        <div className="parecidas cartao-esqueleto" />
      </div>
    </article>
  );
}
