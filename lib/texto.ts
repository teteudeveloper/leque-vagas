// "1 vaga", "2 vagas", "0 vagas".
export function plural(quantidade: number, singular: string, pluralizado: string) {
  return `${quantidade} ${quantidade === 1 ? singular : pluralizado}`;
}

// Corta no fim de uma palavra e acrescenta reticências. Usado nas meta descriptions.
export function resumo(texto: string, limite = 155) {
  const corrido = texto.replace(/\s+/g, " ").trim();
  if (corrido.length <= limite) return corrido;
  return `${corrido.slice(0, limite).replace(/\s+\S*$/, "")}…`;
}
