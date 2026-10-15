import type { ZodError } from "zod";

// Transforma os problemas do Zod em { campo: "primeira mensagem" }.
export function porCampo(erro: ZodError): Record<string, string> {
  const erros: Record<string, string> = {};

  for (const problema of erro.issues) {
    const campo = String(problema.path[0] ?? "_");
    if (!erros[campo]) erros[campo] = problema.message;
  }

  return erros;
}

// Guarda o que a pessoa digitou para devolver ao formulário quando há erro.
// Campos repetidos (checkboxes com o mesmo name) viram uma lista separada por vírgula.
export function valoresDe(dados: FormData): Record<string, string> {
  const valores: Record<string, string> = {};

  for (const chave of new Set(dados.keys())) {
    if (chave.startsWith("$ACTION")) continue;
    const textos = dados.getAll(chave).filter((valor) => typeof valor === "string");
    valores[chave] = textos.join(",");
  }

  return valores;
}

// Os campos simples do formulário, prontos para o safeParse do Zod.
export function camposDe(dados: FormData): Record<string, string> {
  const campos: Record<string, string> = {};

  for (const [chave, valor] of dados.entries()) {
    if (typeof valor === "string" && !chave.startsWith("$ACTION")) campos[chave] = valor;
  }

  return campos;
}
