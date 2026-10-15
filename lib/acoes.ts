import type { Estado } from "@/lib/tipos";

// Pedaços repetidos das Server Actions de formulário.

export function comErros(
  erros: Record<string, string>,
  valores: Record<string, string>,
  mensagem?: string,
): Estado {
  return { ok: false, erros, valores, mensagem };
}

// Banco fora do ar ou sem configuração: a pessoa não perde o que digitou.
export function falhaAoSalvar(contexto: string, erro: unknown, valores: Record<string, string>) {
  console.error(`[${contexto}]`, erro);
  return comErros(
    {},
    valores,
    "Não conseguimos salvar agora. Tente novamente em alguns instantes.",
  );
}
