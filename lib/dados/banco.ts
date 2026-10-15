import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export { prisma };

// O banco é um complemento do catálogo. Se ele não estiver configurado (um
// preview sem DATABASE_URL) ou cair, as páginas continuam mostrando as vagas
// do JSON em vez de quebrar inteiras.
export const bancoConfigurado = Boolean(process.env.DATABASE_URL);

export async function lerDoBanco<T>(consulta: () => Promise<T>, reserva: T): Promise<T> {
  if (!bancoConfigurado) return reserva;

  try {
    return await consulta();
  } catch (erro) {
    console.error("[banco] leitura falhou, seguindo só com o catálogo:", erro);
    return reserva;
  }
}

// Escritas não têm reserva: sem banco não há onde salvar. A Server Action
// captura este erro e mostra uma mensagem amigável no formulário.
export class BancoIndisponivel extends Error {
  constructor() {
    super("DATABASE_URL não configurada.");
    this.name = "BancoIndisponivel";
  }
}

export function exigirBanco() {
  if (!bancoConfigurado) throw new BancoIndisponivel();
}

// P2002: violação de chave única (ex.: mesma pessoa se candidatando duas vezes).
export function violouUnicidade(erro: unknown): boolean {
  return erro instanceof Prisma.PrismaClientKnownRequestError && erro.code === "P2002";
}
