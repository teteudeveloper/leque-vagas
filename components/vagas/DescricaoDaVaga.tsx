// A descrição é texto livre (vem do JSON ou do formulário). Este componente dá
// estrutura a ela sem aceitar HTML: blocos separados por linha em branco viram
// parágrafos, linhas começando com "- " viram lista, e uma linha curta
// terminada em ":" vira subtítulo.
export default function DescricaoDaVaga({ texto }: { texto: string }) {
  const blocos = texto
    .replace(/\r\n/g, "\n")
    .split(/\n\s*\n/)
    .map((bloco) => bloco.trim())
    .filter(Boolean);

  return (
    <div className="max-w-2xl space-y-4 text-lg leading-relaxed text-slate-700">
      {blocos.map((bloco, indice) => {
        const linhas = bloco.split("\n").map((linha) => linha.trim());
        const [primeira, ...resto] = linhas;
        const subtitulo = primeira.endsWith(":") && primeira.length <= 60 ? primeira : null;
        const corpo = subtitulo ? resto : linhas;
        const ehLista = corpo.length > 0 && corpo.every((linha) => linha.startsWith("- "));

        return (
          <div key={indice}>
            {subtitulo && (
              <h3 className="mt-8 mb-2 text-base font-bold text-slate-900">
                {subtitulo.slice(0, -1)}
              </h3>
            )}
            {ehLista ? (
              <ul className="list-disc space-y-1.5 pl-6 marker:text-violet-600">
                {corpo.map((linha) => (
                  <li key={linha}>{linha.slice(2)}</li>
                ))}
              </ul>
            ) : (
              corpo.length > 0 && <p className="whitespace-pre-line">{corpo.join("\n")}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
